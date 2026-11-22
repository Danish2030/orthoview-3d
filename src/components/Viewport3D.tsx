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
} from 'lucide-react';
import { ViewCube } from './ViewCube';
import { DisplayOptions, SolidDimensions, SolidRotation, ThemeMode } from '../types';

interface Viewport3DProps {
  geometry: THREE.BufferGeometry;
  dimensions: SolidDimensions;
  rotation: SolidRotation;
  theme: ThemeMode;
  displayOptions: DisplayOptions;
  onResetRotation: () => void;
  onUpdateDisplayOptions: (opts: DisplayOptions) => void;
}

export const Viewport3D: React.FC<Viewport3DProps> = ({
  geometry,
  dimensions,
  rotation,
  theme,
  displayOptions,
  onResetRotation,
  onUpdateDisplayOptions,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const [cameraMode, setCameraMode] = useState<'isometric' | 'front' | 'top' | 'side' | 'free'>('isometric');
  const [isUnfoldPlaying, setIsUnfoldPlaying] = useState<boolean>(false);
  const [cameraMatrix, setCameraMatrix] = useState<number[]>([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ]);

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

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isDark ? 0x070b14 : 0xedf2f7);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      2500
    );
    const isoDist = 185;
    camera.position.set(isoDist, isoDist * 0.85, isoDist * 1.15);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Orbit Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 750;
    controls.minDistance = 50;
    controls.target.set(0, 0, 0);
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
    const fillLight = new THREE.DirectionalLight(isDark ? 0x38bdf8 : 0x93c5fd, isDark ? 0.9 : 0.6);
    fillLight.position.set(-180, 120, -140);
    scene.add(fillLight);

    // 3. Rim / Specular Edge Light
    const rimLight = new THREE.DirectionalLight(isDark ? 0xf59e0b : 0xfde68a, isDark ? 0.8 : 0.5);
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
      isDark ? 0x38bdf8 : 0x2563eb,
      isDark ? 0x1e293b : 0xcbd5e1
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

    const solidMesh = new THREE.Mesh(geometry, solidMaterial);
    solidMesh.castShadow = true;
    solidMesh.receiveShadow = true;
    solidGroup.add(solidMesh);

    // Visible Edge Lines (Razor Sharp Engineering Line Type A)
    const edgesGeom = new THREE.EdgesGeometry(geometry, 24);
    const edgesMaterial = new THREE.LineBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x0f172a,
      linewidth: 2,
    });
    const edgeLines = new THREE.LineSegments(edgesGeom, edgesMaterial);
    solidGroup.add(edgeLines);

    // Hidden Lines in 3D View
    if (displayOptions.showHiddenLines) {
      const hiddenGeom = edgesGeom.clone();
      const dashedMat = new THREE.LineDashedMaterial({
        color: isDark ? 0xf59e0b : 0x94a3b8,
        dashSize: 3,
        gapSize: 2,
        depthFunc: THREE.GreaterDepth,
        depthWrite: false,
      });
      const hiddenLines = new THREE.LineSegments(hiddenGeom, dashedMat);
      hiddenLines.computeLineDistances();
      solidGroup.add(hiddenLines);
    }

    // Animation Loop
    let animId: number;
    let lastMatrixUpdate = 0;

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);
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
    };
  }, [geometry, dimensions, rotation, theme, displayOptions, isDark]);

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
      className={`relative w-full h-full select-none overflow-hidden ${
        isDark ? 'bg-[#070b14]' : 'bg-[#edf2f7]'
      }`}
    >
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* Top Header Badge */}
      <div className="absolute top-3 left-4 z-10 flex items-center gap-2">
        <div
          className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-mono font-semibold backdrop-blur shadow-lg ${
            isDark
              ? 'bg-slate-900/90 text-sky-400 border-sky-500/30 shadow-[0_0_15px_rgba(56,189,248,0.15)]'
              : 'bg-white/95 text-slate-800 border-slate-300'
          }`}
        >
          <Box className="w-4 h-4 text-sky-400" />
          <span>3D SPACE (FIRST QUADRANT)</span>
        </div>
      </div>

      {/* 3D CAD ViewCube (Top Right) */}
      <div className="absolute top-3 right-4 z-20">
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

      {/* Quick Camera Preset Toolbar (Top Center) */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 p-1 rounded-lg border backdrop-blur bg-slate-900/85 border-slate-700/80 text-white shadow-xl">
        <button
          onClick={() => setCameraPreset('isometric')}
          title="Isometric View (Standard 30° CAD perspective)"
          className={`px-2 py-1 text-xs font-mono rounded flex items-center gap-1 transition-all ${
            cameraMode === 'isometric'
              ? 'bg-sky-500 text-slate-950 font-bold shadow'
              : 'hover:bg-slate-800 text-slate-300'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Iso</span>
        </button>

        <button
          onClick={() => setCameraPreset('front')}
          title="Direct Front View (Look along +Z onto VP)"
          className={`px-2 py-1 text-xs font-mono rounded flex items-center gap-1 transition-all ${
            cameraMode === 'front'
              ? 'bg-sky-500 text-slate-950 font-bold shadow'
              : 'hover:bg-slate-800 text-slate-300'
          }`}
        >
          <span className="text-sky-400 font-bold">FV</span>
        </button>

        <button
          onClick={() => setCameraPreset('top')}
          title="Direct Top View (Look down +Y onto HP)"
          className={`px-2 py-1 text-xs font-mono rounded flex items-center gap-1 transition-all ${
            cameraMode === 'top'
              ? 'bg-sky-500 text-slate-950 font-bold shadow'
              : 'hover:bg-slate-800 text-slate-300'
          }`}
        >
          <span className="text-emerald-400 font-bold">TV</span>
        </button>

        <button
          onClick={() => setCameraPreset('side')}
          title="Direct Left Side View (Look from -X onto RPP)"
          className={`px-2 py-1 text-xs font-mono rounded flex items-center gap-1 transition-all ${
            cameraMode === 'side'
              ? 'bg-sky-500 text-slate-950 font-bold shadow'
              : 'hover:bg-slate-800 text-slate-300'
          }`}
        >
          <span className="text-amber-400 font-bold">LHSV</span>
        </button>

        <div className="w-[1px] h-4 bg-slate-700 mx-1" />

        <button
          onClick={() => setCameraPreset('reset')}
          title="Reset Camera & Orientation"
          className="px-2 py-1 text-xs font-mono rounded hover:bg-slate-800 text-slate-300 flex items-center gap-1 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>Reset</span>
        </button>
      </div>

      {/* Glass Box Folding Controller Bar */}
      <div
        className={`absolute bottom-14 left-4 right-4 z-10 p-3 rounded-xl border backdrop-blur flex items-center justify-between gap-4 shadow-xl transition-all ${
          isDark
            ? 'bg-slate-950/85 border-sky-800/60 text-slate-200'
            : 'bg-white/95 border-slate-300 text-slate-800'
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsUnfoldPlaying(!isUnfoldPlaying)}
            className={`p-2 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5 transition-all ${
              isUnfoldPlaying
                ? 'bg-amber-500 text-slate-950'
                : 'bg-sky-500 hover:bg-sky-400 text-slate-950'
            }`}
          >
            {isUnfoldPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isUnfoldPlaying ? 'Pause' : 'Unfold Planes'}</span>
          </button>

          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-mono font-bold text-sky-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              GLASS BOX ROTATION (HP & RPP)
            </span>
            <span className="text-[10px] text-slate-400">
              Visual proof of why Top View is below FV & LHSV is on the right
            </span>
          </div>
        </div>

        {/* Unfold Progress Slider */}
        <div className="flex items-center gap-3 flex-1 max-w-xs">
          <span className="text-[11px] font-mono font-bold text-slate-400">3D Box</span>
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
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
          />
          <span className="text-[11px] font-mono font-bold text-amber-400">2D Sheet</span>
          <span className="text-xs font-mono font-bold w-10 text-right text-sky-400">
            {displayOptions.unfoldProgress}%
          </span>
        </div>
      </div>

      {/* Axis Triad Legend (Bottom Left) */}
      <div
        className={`absolute bottom-3 left-4 z-10 px-3 py-1.5 rounded-lg border text-[11px] font-mono backdrop-blur flex items-center gap-3 ${
          isDark
            ? 'bg-slate-900/80 border-slate-800 text-slate-300'
            : 'bg-white/90 border-slate-300 text-slate-700 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
          <span className="font-bold">X (Length)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
          <span className="font-bold">Y (Height)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
          <span className="font-bold">Z (Width)</span>
        </div>
      </div>

      {/* Real-time Orientation Readout */}
      <div
        className={`absolute bottom-3 right-4 z-10 px-3 py-1.5 rounded-lg border text-[11px] font-mono backdrop-blur ${
          isDark
            ? 'bg-slate-900/80 border-slate-800 text-slate-400'
            : 'bg-white/90 border-slate-300 text-slate-600 shadow-sm'
        }`}
      >
        <span>Orientation: </span>
        <span className="text-sky-400 font-bold">θx {rotation.x}°</span> •{' '}
        <span className="text-emerald-400 font-bold">θy {rotation.y}°</span> •{' '}
        <span className="text-amber-400 font-bold">θz {rotation.z}°</span>
      </div>
    </div>
  );
};
