import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  Compass,
  RotateCcw,
  Box,
  Play,
  Pause,
  Sparkles,
  Scissors,
  Eye,
  X,
} from 'lucide-react';
import { ViewCube } from './ViewCube';
import { AccentId, getAccentConfig } from '../utils/accentTheme';
import { DisplayOptions, HighlightTarget, SolidDimensions, SolidRotation, ThemeMode } from '../types';

interface Viewport3DProps {
  geometry: THREE.BufferGeometry;
  dimensions: SolidDimensions;
  rotation: SolidRotation;
  theme: ThemeMode;
  displayOptions: DisplayOptions;
  onResetRotation: () => void;
  onUpdateDisplayOptions: (opts: DisplayOptions) => void;
  accentId?: AccentId;
  hoveredTarget?: HighlightTarget;
  onHoverTarget?: (target: HighlightTarget) => void;
}

export const Viewport3D: React.FC<Viewport3DProps> = ({
  geometry,
  dimensions,
  rotation,
  theme,
  displayOptions,
  onResetRotation,
  onUpdateDisplayOptions,
  accentId = 'mono',
  hoveredTarget,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const savedCamPosRef = useRef<THREE.Vector3 | null>(null);
  const savedTargetRef = useRef<THREE.Vector3 | null>(null);
  const isUserDraggingRef = useRef<boolean>(false);
  const prevGeometryRef = useRef<THREE.BufferGeometry | null>(null);

  const [cameraMode, setCameraMode] = useState<'isometric' | 'front' | 'top' | 'side' | 'free'>('isometric');
  const [isUnfoldPlaying, setIsUnfoldPlaying] = useState<boolean>(false);
  const [cameraMatrix, setCameraMatrix] = useState<number[]>([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ]);

  // v3.6.0 Studio Toolbar & Section Cut state
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [isXRay, setIsXRay] = useState<boolean>(false);
  const [isAutoSpin, setIsAutoSpin] = useState<boolean>(false);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [sectionCutOpen, setSectionCutOpen] = useState<boolean>(false);
  const [sectionAxis, setSectionAxis] = useState<'off' | 'x' | 'y' | 'z'>('off');
  const [sectionFlip, setSectionFlip] = useState<boolean>(false);
  const [sectionOffsetPct, setSectionOffsetPct] = useState<number>(0);

  const isDark = theme === 'blueprint';

  // Animation of the Unfold Glass Box
  useEffect(() => {
    if (!isUnfoldPlaying) return;
    const interval = setInterval(() => {
      onUpdateDisplayOptions({
        ...displayOptions,
        unfoldProgress: (displayOptions.unfoldProgress + 2) % 102,
      });
    }, 40);
    return () => clearInterval(interval);
  }, [isUnfoldPlaying, displayOptions, onUpdateDisplayOptions]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Renderer with high shadow fidelity and tone mapping
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark ? 1.15 : 1.05;
    renderer.localClippingEnabled = true;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isDark ? 0x0a0a0c : 0xf4f5f7);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      2500
    );
    const isoDist = 185;
    if (savedCamPosRef.current) {
      camera.position.copy(savedCamPosRef.current);
    } else {
      camera.position.set(isoDist, isoDist * 0.85, isoDist * 1.15);
    }
    cameraRef.current = camera;

    // Orbit Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 750;
    controls.minDistance = 50;
    if (savedTargetRef.current) {
      controls.target.copy(savedTargetRef.current);
    } else {
      controls.target.set(0, 0, 0);
    }
    camera.lookAt(controls.target);
    const onControlStart = () => {
      isUserDraggingRef.current = true;
    };
    const onControlEnd = () => {
      isUserDraggingRef.current = false;
    };
    controls.addEventListener('start', onControlStart);
    controls.addEventListener('end', onControlEnd);
    controlsRef.current = controls;

    // 4-Point CAD Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x94a3b8 : 0xffffff,
      isDark ? 0.8 : 0.95
    );
    scene.add(ambientLight);

    // 1. Key Light (Soft Warm Studio Key)
    const keyLight = new THREE.DirectionalLight(0xfffaed, isDark ? 1.6 : 1.3);
    keyLight.position.set(160, 240, 180);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // 2. Fill Light (Cool Sky Blue)
    const fillLight = new THREE.DirectionalLight(isDark ? 0xe4e4e7 : 0xffffff, isDark ? 0.85 : 0.65);
    fillLight.position.set(-180, 120, -140);
    scene.add(fillLight);

    // 3. Rim / Specular Edge Light
    const rimLight = new THREE.DirectionalLight(isDark ? 0xa1a1aa : 0xe4e4e7, isDark ? 0.75 : 0.5);
    rimLight.position.set(0, -120, -220);
    scene.add(rimLight);

    // 4. Top Softbox
    const topLight = new THREE.DirectionalLight(0xffffff, 0.5);
    topLight.position.set(0, 300, 0);
    scene.add(topLight);

    // Drafting Table Ground Grid
    const maxDim = Math.max(dimensions.height, dimensions.width, dimensions.length);
    const gridY = -maxDim * 0.78;
    const gridHelper = new THREE.GridHelper(
      240,
      24,
      isDark ? 0x52525b : 0x71717a,
      isDark ? 0x1c1c21 : 0xd4d4d8
    );
    gridHelper.position.y = gridY;
    gridHelper.visible = displayOptions.show3DGrid;
    scene.add(gridHelper);

    // Soft Ambient Contact Shadow Underneath Solid
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext('2d');
    if (shadowCtx) {
      const gradient = shadowCtx.createRadialGradient(64, 64, 10, 64, 64, 64);
      gradient.addColorStop(0, isDark ? 'rgba(0, 0, 0, 0.75)' : 'rgba(15, 23, 42, 0.5)');
      gradient.addColorStop(0.5, isDark ? 'rgba(0, 0, 0, 0.35)' : 'rgba(15, 23, 42, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      shadowCtx.fillStyle = gradient;
      shadowCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const contactShadowGeom = new THREE.PlaneGeometry(maxDim * 1.8, maxDim * 1.8);
    const contactShadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const contactShadow = new THREE.Mesh(contactShadowGeom, contactShadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = gridY + 0.5;
    scene.add(contactShadow);

    // Coordinate Axes Triad (Red=X, Green=Y, Blue=Z)
    const axesHelper = new THREE.AxesHelper(70);
    axesHelper.visible = displayOptions.show3DAxes;
    axesHelper.position.set(-75, gridY + 2, -75);
    scene.add(axesHelper);

    // ==========================================
    // GLASS BOX & UNFOLDING PROJECTION PLANES
    // ==========================================
    const boxSize = 140;
    const unfoldRatio = displayOptions.unfoldProgress / 100;

    const glassBoxGroup = new THREE.Group();
    glassBoxGroup.visible = displayOptions.show3DPlanes;

    // 1. Vertical Plane (V.P.) - Fixed at the rear
    const vpMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: isDark ? 0.18 : 0.12,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 1.5,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const vpGeom = new THREE.PlaneGeometry(boxSize, boxSize);
    const vpMesh = new THREE.Mesh(vpGeom, vpMat);
    vpMesh.position.set(0, 0, -boxSize / 2);
    glassBoxGroup.add(vpMesh);

    const vpEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(vpGeom),
      new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 })
    );
    vpEdges.position.copy(vpMesh.position);
    glassBoxGroup.add(vpEdges);

    // 2. Horizontal Plane (H.P.) - Hinged at bottom-back X-Y line
    const hpMat = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: isDark ? 0.18 : 0.12,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 1.5,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const hpGeom = new THREE.PlaneGeometry(boxSize, boxSize);

    const hpPivot = new THREE.Group();
    hpPivot.position.set(0, -boxSize / 2, -boxSize / 2);

    const hpMesh = new THREE.Mesh(hpGeom, hpMat);
    hpMesh.rotation.x = Math.PI / 2;
    hpMesh.position.set(0, 0, boxSize / 2);
    hpPivot.add(hpMesh);

    const hpEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(hpGeom),
      new THREE.LineBasicMaterial({ color: 0x10b981, linewidth: 2 })
    );
    hpEdges.position.copy(hpMesh.position);
    hpEdges.rotation.copy(hpMesh.rotation);
    hpPivot.add(hpEdges);

    hpPivot.rotation.x = unfoldRatio * (Math.PI / 2);
    glassBoxGroup.add(hpPivot);

    // 3. Right Profile Plane (R.P.P.) - Hinged along vertical X1-Y1 line
    const ppMat = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: isDark ? 0.18 : 0.12,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 1.5,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const ppGeom = new THREE.PlaneGeometry(boxSize, boxSize);

    const ppPivot = new THREE.Group();
    ppPivot.position.set(boxSize / 2, 0, -boxSize / 2);

    const ppMesh = new THREE.Mesh(ppGeom, ppMat);
    ppMesh.rotation.y = Math.PI / 2;
    ppMesh.position.set(0, 0, boxSize / 2);
    ppPivot.add(ppMesh);

    const ppEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(ppGeom),
      new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 2 })
    );
    ppEdges.position.copy(ppMesh.position);
    ppEdges.rotation.copy(ppMesh.rotation);
    ppPivot.add(ppEdges);

    ppPivot.rotation.y = unfoldRatio * (Math.PI / 2);
    glassBoxGroup.add(ppPivot);

    scene.add(glassBoxGroup);

    // ==========================================
    // OBSERVER SIGHT ARROWS (EYES)
    // ==========================================
    const sightGroup = new THREE.Group();
    sightGroup.visible = displayOptions.showSightArrows;

    const createSightArrow = (
      origin: THREE.Vector3,
      dir: THREE.Vector3,
      color: number
    ) => {
      const arrowHelper = new THREE.ArrowHelper(dir, origin, 45, color, 12, 7);
      sightGroup.add(arrowHelper);
    };

    createSightArrow(
      new THREE.Vector3(0, 0, maxDim + 55),
      new THREE.Vector3(0, 0, -1),
      0x38bdf8
    );
    createSightArrow(
      new THREE.Vector3(0, maxDim + 55, 0),
      new THREE.Vector3(0, -1, 0),
      0x10b981
    );
    createSightArrow(
      new THREE.Vector3(-maxDim - 55, 0, 0),
      new THREE.Vector3(1, 0, 0),
      0xf59e0b
    );

    scene.add(sightGroup);

    // ==========================================
    // SOLID MESH WITH SUPERB CAD MATERIALS
    // ==========================================
    const solidGroup = new THREE.Group();
    solidGroup.rotation.set(
      THREE.MathUtils.degToRad(rotation.x),
      THREE.MathUtils.degToRad(rotation.y),
      THREE.MathUtils.degToRad(rotation.z),
      'XYZ'
    );
    scene.add(solidGroup);

    let solidMaterial: THREE.Material;

    if (displayOptions.renderStyle === 'aluminum') {
      // 1. Brushed Aerospace Aluminum
      solidMaterial = new THREE.MeshStandardMaterial({
        color: isDark ? 0xc8d5e0 : 0xe2e8f0,
        metalness: 0.9,
        roughness: 0.22,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      });
    } else if (displayOptions.renderStyle === 'steel') {
      // 2. Machined Tool Steel
      solidMaterial = new THREE.MeshStandardMaterial({
        color: isDark ? 0x64748b : 0x94a3b8,
        metalness: 0.85,
        roughness: 0.32,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      });
    } else if (displayOptions.renderStyle === 'anodized') {
      // 3. Anodized Electric Cobalt
      solidMaterial = new THREE.MeshStandardMaterial({
        color: isDark ? 0x0284c7 : 0x0369a1,
        metalness: 0.75,
        roughness: 0.25,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      });
    } else if (displayOptions.renderStyle === 'glass') {
      // 4. Optical Smoked Resin / Polycarbonate
      solidMaterial = new THREE.MeshPhysicalMaterial({
        color: isDark ? 0x38bdf8 : 0x0284c7,
        metalness: 0.05,
        roughness: 0.1,
        transmission: 0.85,
        thickness: 2.5,
        transparent: true,
        opacity: 0.7,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      });
    } else {
      // 5. High-Precision Polymer (Delrin White / Matte CAD)
      solidMaterial = new THREE.MeshStandardMaterial({
        color: isDark ? 0x1e293b : 0xf1f5f9,
        metalness: 0.15,
        roughness: 0.38,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      });
    }

    // Studio Toolbar Wireframe & X-Ray Overrides
    if (isWireframe) {
      (solidMaterial as THREE.MeshStandardMaterial).wireframe = true;
    }
    if (isXRay) {
      solidMaterial.transparent = true;
      solidMaterial.opacity = 0.35;
      solidMaterial.depthWrite = false;
    }

    // Synced accent color for Section Cut & 3D Highlighting
    const accentColorHex = accentId === 'mono' ? (isDark ? '#38bdf8' : '#0284c7') : getAccentConfig(accentId).hex;
    const accentThreeColor = new THREE.Color(accentColorHex);

    // Disposable Section Cut Plane & Hatching Geometries
    let cutPlaneGeom: THREE.PlaneGeometry | null = null;
    let cutPlaneMat: THREE.MeshBasicMaterial | null = null;
    let hatchGeom: THREE.BufferGeometry | null = null;
    let hatchMat: THREE.LineBasicMaterial | null = null;
    let activeClipPlanes: THREE.Plane[] = [];

    if (sectionAxis !== 'off') {
      geometry.computeBoundingBox();
      const bbox = geometry.boundingBox || new THREE.Box3(
        new THREE.Vector3(-dimensions.length / 2, 0, -dimensions.width / 2),
        new THREE.Vector3(dimensions.length / 2, dimensions.height, dimensions.width / 2)
      );
      const minVal = sectionAxis === 'x' ? bbox.min.x : sectionAxis === 'y' ? bbox.min.y : bbox.min.z;
      const maxVal = sectionAxis === 'x' ? bbox.max.x : sectionAxis === 'y' ? bbox.max.y : bbox.max.z;
      const centerVal = (minVal + maxVal) / 2;
      const halfSpan = (maxVal - minVal) / 2 || 30;
      const offsetVal = centerVal + (sectionOffsetPct / 100) * halfSpan;

      let normal = new THREE.Vector3(0, 0, 1);
      let planeCenter = new THREE.Vector3(0, 0, 0);

      if (sectionAxis === 'x') {
        normal = new THREE.Vector3(sectionFlip ? 1 : -1, 0, 0);
        planeCenter = new THREE.Vector3(offsetVal, (bbox.min.y + bbox.max.y) / 2, (bbox.min.z + bbox.max.z) / 2);
      } else if (sectionAxis === 'y') {
        normal = new THREE.Vector3(0, sectionFlip ? 1 : -1, 0);
        planeCenter = new THREE.Vector3((bbox.min.x + bbox.max.x) / 2, offsetVal, (bbox.min.z + bbox.max.z) / 2);
      } else if (sectionAxis === 'z') {
        normal = new THREE.Vector3(0, 0, sectionFlip ? 1 : -1);
        planeCenter = new THREE.Vector3((bbox.min.x + bbox.max.x) / 2, (bbox.min.y + bbox.max.y) / 2, offsetVal);
      }

      const clipPlane = new THREE.Plane();
      clipPlane.setFromNormalAndCoplanarPoint(normal, planeCenter);
      activeClipPlanes = [clipPlane];
      solidMaterial.clippingPlanes = activeClipPlanes;
      solidMaterial.clipShadows = true;
      solidMaterial.side = THREE.DoubleSide;

      // Glowing Translucent Cutting Plane Visualizer
      const cutPlaneSize = Math.max(dimensions.length, dimensions.width, dimensions.height) * 1.5;
      cutPlaneGeom = new THREE.PlaneGeometry(cutPlaneSize, cutPlaneSize);
      cutPlaneMat = new THREE.MeshBasicMaterial({
        color: accentThreeColor,
        transparent: true,
        opacity: 0.16,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const cutPlaneMesh = new THREE.Mesh(cutPlaneGeom, cutPlaneMat);
      cutPlaneMesh.position.copy(planeCenter);
      if (sectionAxis === 'x') {
        cutPlaneMesh.rotation.y = Math.PI / 2;
      } else if (sectionAxis === 'y') {
        cutPlaneMesh.rotation.x = Math.PI / 2;
      }
      solidGroup.add(cutPlaneMesh);

      // 45-degree CAD Section Hatch Lines on Cutting Plane
      const hatchPoints: THREE.Vector3[] = [];
      const step = cutPlaneSize / 12;
      for (let i = -cutPlaneSize / 2; i <= cutPlaneSize / 2; i += step) {
        hatchPoints.push(new THREE.Vector3(i, -cutPlaneSize / 2, 0));
        hatchPoints.push(new THREE.Vector3(i + cutPlaneSize / 2, cutPlaneSize / 2, 0));
      }
      hatchGeom = new THREE.BufferGeometry().setFromPoints(hatchPoints);
      hatchMat = new THREE.LineBasicMaterial({
        color: accentThreeColor,
        transparent: true,
        opacity: 0.48,
      });
      const hatchLines = new THREE.LineSegments(hatchGeom, hatchMat);
      hatchLines.position.copy(planeCenter);
      hatchLines.rotation.copy(cutPlaneMesh.rotation);
      solidGroup.add(hatchLines);
    }

    const solidMesh = new THREE.Mesh(geometry, solidMaterial);
    solidMesh.castShadow = true;
    solidMesh.receiveShadow = true;
    solidGroup.add(solidMesh);

    // Visible Edge Lines (Razor Sharp Engineering Line Type A)
    const edgesGeom = new THREE.EdgesGeometry(geometry, 24);
    const edgesMaterial = new THREE.LineBasicMaterial({
      color: isDark ? 0xf4f4f6 : 0x0d0d10,
      linewidth: 2,
      clippingPlanes: activeClipPlanes,
    });
    const edgeLines = new THREE.LineSegments(edgesGeom, edgesMaterial);
    solidGroup.add(edgeLines);

    // Hidden Lines in 3D View
    if (displayOptions.showHiddenLines) {
      const hiddenGeom = edgesGeom.clone();
      const dashedMat = new THREE.LineDashedMaterial({
        color: isDark ? 0x71717a : 0x9ca3af,
        dashSize: 3,
        gapSize: 2,
        depthFunc: THREE.GreaterDepth,
        depthWrite: false,
        clippingPlanes: activeClipPlanes,
      });
      const hiddenLines = new THREE.LineSegments(hiddenGeom, dashedMat);
      hiddenLines.computeLineDistances();
      solidGroup.add(hiddenLines);
    }

    // Synchronized 2D <-> 3D Hover Highlighting Group
    const highlightGroup = new THREE.Group();
    scene.add(highlightGroup);

    let barGeom: THREE.BufferGeometry | null = null;
    let barMat: THREE.LineBasicMaterial | null = null;

    if (hoveredTarget === 'fv') {
      const fvArrow = new THREE.ArrowHelper(
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(0, dimensions.height / 2, maxDim + 50),
        42,
        0x38bdf8,
        14,
        8
      );
      highlightGroup.add(fvArrow);
    } else if (hoveredTarget === 'tv') {
      const tvArrow = new THREE.ArrowHelper(
        new THREE.Vector3(0, -1, 0),
        new THREE.Vector3(0, maxDim + 50, 0),
        42,
        0x10b981,
        14,
        8
      );
      highlightGroup.add(tvArrow);
    } else if (hoveredTarget === 'sv') {
      const svDir = displayOptions.sideViewMode === 'right' ? new THREE.Vector3(-1, 0, 0) : new THREE.Vector3(1, 0, 0);
      const svOrigin = displayOptions.sideViewMode === 'right'
        ? new THREE.Vector3(maxDim + 50, dimensions.height / 2, 0)
        : new THREE.Vector3(-maxDim - 50, dimensions.height / 2, 0);
      const svArrow = new THREE.ArrowHelper(
        svDir,
        svOrigin,
        42,
        0xf59e0b,
        14,
        8
      );
      highlightGroup.add(svArrow);
    } else if (hoveredTarget === 'length' || hoveredTarget === 'width' || hoveredTarget === 'height') {
      geometry.computeBoundingBox();
      const bbox = geometry.boundingBox || new THREE.Box3(
        new THREE.Vector3(-dimensions.length / 2, 0, -dimensions.width / 2),
        new THREE.Vector3(dimensions.length / 2, dimensions.height, dimensions.width / 2)
      );
      const p1 = new THREE.Vector3();
      const p2 = new THREE.Vector3();
      if (hoveredTarget === 'length') {
        p1.set(bbox.min.x, bbox.min.y - 4, bbox.max.z + 4);
        p2.set(bbox.max.x, bbox.min.y - 4, bbox.max.z + 4);
      } else if (hoveredTarget === 'height') {
        p1.set(bbox.max.x + 4, bbox.min.y, bbox.max.z + 4);
        p2.set(bbox.max.x + 4, bbox.max.y, bbox.max.z + 4);
      } else if (hoveredTarget === 'width') {
        p1.set(bbox.max.x + 4, bbox.min.y - 4, bbox.min.z);
        p2.set(bbox.max.x + 4, bbox.min.y - 4, bbox.max.z);
      }
      barGeom = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      barMat = new THREE.LineBasicMaterial({
        color: accentThreeColor,
        linewidth: 3,
      });
      const barLine = new THREE.Line(barGeom, barMat);
      highlightGroup.add(barLine);
    }

    if (isExploded) {
      glassBoxGroup.scale.set(1.22, 1.22, 1.22);
      sightGroup.scale.set(1.22, 1.22, 1.22);
    }

    // Animation Loop with Solid Switch Spring Transition & Auto-Spin
    const shouldAnimateScale = prevGeometryRef.current !== geometry;
    prevGeometryRef.current = geometry;
    const solidAnimStartTime = performance.now();
    let animId: number;
    let lastMatrixUpdate = 0;

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);

      // Smooth Solid-Switch Transition Scale (0.92 -> 1.0) only on solid change
      if (shouldAnimateScale) {
        const elapsed = performance.now() - solidAnimStartTime;
        const progress = Math.min(1, Math.max(0, elapsed / 260));
        const smoothScale = 0.92 + 0.08 * (1 - Math.pow(1 - progress, 3));
        solidGroup.scale.set(smoothScale, smoothScale, smoothScale);
      }

      // Auto-Spin 3D Solid when user is not dragging
      if (isAutoSpin && !isUserDraggingRef.current) {
        solidGroup.rotation.y += 0.008;
      }

      controls.update();
      renderer.render(scene, camera);

      // Throttled ViewCube sync
      if (time - lastMatrixUpdate > 30) {
        setCameraMatrix(Array.from(camera.matrixWorldInverse.elements));
        lastMatrixUpdate = time;
      }
    };
    animate(0);

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    return () => {
      savedCamPosRef.current = camera.position.clone();
      savedTargetRef.current = controls.target.clone();
      controls.removeEventListener('start', onControlStart);
      controls.removeEventListener('end', onControlEnd);
      resizeObserver.disconnect();
      cancelAnimationFrame(animId);
      renderer.dispose();
      solidMaterial.dispose();
      edgesMaterial.dispose();
      edgesGeom.dispose();
      vpMat.dispose();
      hpMat.dispose();
      ppMat.dispose();
      contactShadowMat.dispose();
      contactShadowGeom.dispose();
      shadowTexture.dispose();
      controls.dispose();
      cutPlaneGeom?.dispose();
      cutPlaneMat?.dispose();
      hatchGeom?.dispose();
      hatchMat?.dispose();
      barGeom?.dispose();
      barMat?.dispose();
    };
  }, [
    geometry,
    dimensions,
    rotation,
    theme,
    displayOptions,
    isDark,
    isWireframe,
    isXRay,
    isAutoSpin,
    isExploded,
    sectionAxis,
    sectionFlip,
    sectionOffsetPct,
    accentId,
    hoveredTarget,
  ]);

  const setCameraPreset = (preset: 'isometric' | 'front' | 'top' | 'side' | 'back' | 'right' | 'left' | 'bottom' | 'reset') => {
    const controls = controlsRef.current;
    const camera = cameraRef.current;
    if (!controls || !camera) return;

    const dist = 190;
    switch (preset) {
      case 'isometric':
        camera.position.set(dist * 0.9, dist * 0.85, dist * 1.15);
        camera.up.set(0, 1, 0);
        setCameraMode('isometric');
        break;
      case 'front':
        camera.position.set(0, 0, dist * 1.35);
        camera.up.set(0, 1, 0);
        setCameraMode('front');
        break;
      case 'top':
        camera.position.set(0, dist * 1.35, 0);
        camera.up.set(0, 0, -1);
        setCameraMode('top');
        break;
      case 'side':
      case 'left':
        camera.position.set(-dist * 1.35, 0, 0);
        camera.up.set(0, 1, 0);
        setCameraMode('side');
        break;
      case 'right':
        camera.position.set(dist * 1.35, 0, 0);
        camera.up.set(0, 1, 0);
        setCameraMode('free');
        break;
      case 'back':
        camera.position.set(0, 0, -dist * 1.35);
        camera.up.set(0, 1, 0);
        setCameraMode('free');
        break;
      case 'bottom':
        camera.position.set(0, -dist * 1.35, 0);
        camera.up.set(0, 0, 1);
        setCameraMode('free');
        break;
      case 'reset':
        camera.position.set(dist * 0.9, dist * 0.85, dist * 1.15);
        camera.up.set(0, 1, 0);
        onResetRotation();
        setCameraMode('isometric');
        break;
    }
    controls.target.set(0, 0, 0);
    controls.update();
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none overflow-hidden rounded-[24px] border ${
        isDark
          ? 'bg-[#0a0a0c] border-white/10 text-[#f4f4f6]'
          : 'bg-[#f4f5f7] border-black/10 text-[#0d0d10]'
      }`}
    >
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* Top Header Pill */}
      <div className="absolute top-3.5 left-4 z-10 flex items-center gap-2">
        <div className="px-3.5 py-1.5 rounded-full glass-pill flex items-center gap-2 text-[11px] font-semibold tracking-[-0.01em]">
          <Box className="w-3.5 h-3.5 opacity-80" />
          <span>3D Studio • First Quadrant</span>
        </div>
      </div>

      {/* 3D CAD ViewCube (Top Right) */}
      <div className="absolute top-4 right-4 z-20">
        <ViewCube
          cameraMatrix={cameraMatrix}
          onSelectView={(view) => {
            if (view === 'isometric') setCameraPreset('isometric');
            else if (view === 'front') setCameraPreset('front');
            else if (view === 'top') setCameraPreset('top');
            else if (view === 'left') setCameraPreset('left');
            else if (view === 'right') setCameraPreset('right');
            else if (view === 'back') setCameraPreset('back');
            else if (view === 'bottom') setCameraPreset('bottom');
          }}
          theme={theme}
        />
      </div>

      {/* Quick Camera Preset Pill Bar (Top Center) */}
      <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 p-1 rounded-full glass-pill shadow-lg">
        <button
          onClick={() => setCameraPreset('isometric')}
          title="Isometric View"
          className={`px-3 py-1.5 text-[11px] font-medium rounded-full flex items-center gap-1 transition-all cursor-pointer ${
            cameraMode === 'isometric'
              ? 'glass-pill-active font-semibold'
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Iso</span>
        </button>

        <button
          onClick={() => setCameraPreset('front')}
          title="Direct Front View (VP)"
          className={`px-2.5 py-1.5 text-[11px] font-medium rounded-full transition-all cursor-pointer ${
            cameraMode === 'front'
              ? 'glass-pill-active font-semibold'
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          FV
        </button>

        <button
          onClick={() => setCameraPreset('top')}
          title="Direct Top View (HP)"
          className={`px-2.5 py-1.5 text-[11px] font-medium rounded-full transition-all cursor-pointer ${
            cameraMode === 'top'
              ? 'glass-pill-active font-semibold'
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          TV
        </button>

        <button
          onClick={() => setCameraPreset('side')}
          title="Direct Left Side View (RPP)"
          className={`px-2.5 py-1.5 text-[11px] font-medium rounded-full transition-all cursor-pointer ${
            cameraMode === 'side'
              ? 'glass-pill-active font-semibold'
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          LHSV
        </button>

        <div className="w-[1px] h-4 bg-current opacity-15 mx-0.5" />

        <button
          onClick={() => setCameraPreset('reset')}
          title="Reset Camera & Orientation"
          className="px-2.5 py-1.5 text-[11px] font-medium rounded-full opacity-70 hover:opacity-100 flex items-center gap-1 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Glass Box Folding Controller Bar */}
      <div className="absolute bottom-16 left-4 right-4 z-10 px-4 py-2.5 rounded-[20px] glass-card flex items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsUnfoldPlaying(!isUnfoldPlaying)}
            className="px-3.5 py-1.5 rounded-full glass-pill-active text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
          >
            {isUnfoldPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isUnfoldPlaying ? 'Pause' : 'Unfold Planes'}</span>
          </button>

          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-semibold tracking-[-0.01em] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 opacity-75" />
              Glass Box Rotation
            </span>
            <span className="text-[10px] opacity-55">
              Unfold HP &amp; RPP into 2D orthographic sheet
            </span>
          </div>
        </div>

        {/* Unfold Progress Slider */}
        <div className="flex items-center gap-2.5 flex-1 max-w-[220px]">
          <span className="text-[10px] font-medium opacity-55">3D</span>
          <input
            type="range"
            min="0"
            max="100"
            value={displayOptions.unfoldProgress}
            onChange={(e) => {
              setIsUnfoldPlaying(false);
              onUpdateDisplayOptions({
                ...displayOptions,
                show3DPlanes: true,
                unfoldProgress: Number(e.target.value),
              });
            }}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-current/15"
          />
          <span className="text-[10px] font-medium opacity-55">2D</span>
          <span className="text-[11px] font-semibold w-9 text-right tabular-nums">
            {displayOptions.unfoldProgress}%
          </span>
        </div>
      </div>

      {/* Floating Section Cut Control Popover */}
      {sectionCutOpen && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 w-[300px] p-3.5 rounded-2xl glass-card shadow-2xl border border-current/15 animate-panel-pop space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-tight flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5" />
              Section Cut Plane
            </span>
            <button
              type="button"
              onClick={() => setSectionCutOpen(false)}
              className="p-1 rounded-full opacity-60 hover:opacity-100 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Axis Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl glass-pill text-[11px] font-semibold">
            {(['off', 'x', 'y', 'z'] as const).map((axis) => (
              <button
                key={axis}
                type="button"
                onClick={() => setSectionAxis(axis)}
                className={`flex-1 py-1 rounded-lg uppercase transition-all cursor-pointer ${
                  sectionAxis === axis ? 'glass-pill-active' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {axis}
              </button>
            ))}
          </div>

          {sectionAxis !== 'off' && (
            <>
              {/* Flip Direction */}
              <div className="flex items-center justify-between text-xs">
                <span className="opacity-75">Flip Normal</span>
                <button
                  type="button"
                  onClick={() => setSectionFlip((prev) => !prev)}
                  className="px-2.5 py-1 rounded-lg glass-pill text-[10px] font-semibold cursor-pointer"
                >
                  {sectionFlip ? 'Inverted (-)' : 'Normal (+)'}
                </button>
              </div>

              {/* Offset Slider */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="opacity-75">Slice Coordinate</span>
                  <span className="font-semibold tabular-nums">{sectionOffsetPct}%</span>
                </div>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={sectionOffsetPct}
                  onChange={(e) => setSectionOffsetPct(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-current/15"
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* Axis Triad Legend (Bottom Left) */}
      <div className="absolute bottom-3 left-4 z-10 px-3 py-1.5 rounded-full glass-pill text-[11px] flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
          <span className="font-medium">X</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          <span className="font-medium">Y</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-sky-500 inline-block" />
          <span className="font-medium">Z</span>
        </div>
      </div>

      {/* Floating Bottom CAD Studio Toolbar (Centered) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1 rounded-full glass-pill shadow-xl">
        <button
          type="button"
          onClick={() => setIsWireframe((prev) => !prev)}
          title="Toggle Wireframe"
          className={`px-3 py-1.5 text-[11px] font-medium rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
            isWireframe ? 'glass-pill-active font-semibold' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <Box className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Wireframe</span>
        </button>

        <button
          type="button"
          onClick={() => setIsXRay((prev) => !prev)}
          title="Toggle X-Ray Glass"
          className={`px-3 py-1.5 text-[11px] font-medium rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
            isXRay ? 'glass-pill-active font-semibold' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">X-Ray</span>
        </button>

        <button
          type="button"
          onClick={() => setIsAutoSpin((prev) => !prev)}
          title="Auto-Spin 3D Solid"
          className={`px-3 py-1.5 text-[11px] font-medium rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
            isAutoSpin ? 'glass-pill-active font-semibold' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <RotateCcw className={`w-3.5 h-3.5 ${isAutoSpin ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Auto-Spin</span>
        </button>

        <button
          type="button"
          onClick={() => setIsExploded((prev) => !prev)}
          title="Explode Projection Planes"
          className={`px-3 py-1.5 text-[11px] font-medium rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
            isExploded ? 'glass-pill-active font-semibold' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Explode</span>
        </button>

        <button
          type="button"
          onClick={() => setSectionCutOpen((prev) => !prev)}
          title="Section Cut Plane"
          className={`px-3 py-1.5 text-[11px] font-medium rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
            sectionAxis !== 'off' || sectionCutOpen ? 'glass-pill-active font-semibold' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <Scissors className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Section Cut</span>
        </button>

        <div className="w-[1px] h-4 bg-current opacity-15 mx-0.5" />

        <button
          type="button"
          onClick={() => setCameraPreset('reset')}
          title="Reset Camera & Isometric View"
          className="px-2.5 py-1.5 text-[11px] font-medium rounded-full opacity-70 hover:opacity-100 flex items-center gap-1 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset ISO</span>
        </button>
      </div>

      {/* Real-time Orientation Readout */}
      <div className="absolute bottom-3 right-4 z-10 px-3.5 py-1.5 rounded-full glass-pill text-[11px] tabular-nums">
        <span className="opacity-55">Angle: </span>
        <span className="font-semibold">X {rotation.x}°</span>
        <span className="opacity-35 mx-1.5">•</span>
        <span className="font-semibold">Y {rotation.y}°</span>
        <span className="opacity-35 mx-1.5">•</span>
        <span className="font-semibold">Z {rotation.z}°</span>
      </div>
    </div>
  );
};
