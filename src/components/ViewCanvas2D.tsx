import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SolidDimensions, SolidRotation, ThemeMode } from '../types';

interface ViewCanvas2DProps {
  viewType: 'front' | 'top' | 'leftSide';
  geometry: THREE.BufferGeometry;
  dimensions: SolidDimensions;
  rotation: SolidRotation;
  theme: ThemeMode;
  showHiddenLines: boolean;
  showDimensions: boolean;
  showCenterLines: boolean;
  label: string;
  sublabel: string;
  planeName: string;
  quadrant: string;
  dimensionsSummary: string;
  onCanvasReady?: (type: 'front' | 'top' | 'leftSide', canvas: HTMLCanvasElement) => void;
}

export const ViewCanvas2D: React.FC<ViewCanvas2DProps> = ({
  viewType,
  geometry,
  dimensions,
  rotation,
  theme,
  showHiddenLines,
  showDimensions,
  showCenterLines,
  label,
  sublabel,
  planeName,
  quadrant,
  dimensionsSummary,
  onCanvasReady,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    if (onCanvasReady) {
      onCanvasReady(viewType, canvas);
    }

    const isDark = theme === 'blueprint';
    const bgColor = isDark ? 0x0c1222 : 0xf8fafc;
    const meshFaceColor = isDark ? 0x111a2e : 0xffffff;
    const visibleEdgeColor = isDark ? 0x38bdf8 : 0x0f172a;
    const hiddenEdgeColor = isDark ? 0xf59e0b : 0x64748b;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(bgColor, 1);

    // Scene
    const scene = new THREE.Scene();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.9 : 1.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, isDark ? 0.4 : 0.2);
    dirLight.position.set(50, 100, 100);
    scene.add(dirLight);

    // Group for the solid with applied rotation
    const solidGroup = new THREE.Group();
    solidGroup.rotation.set(
      THREE.MathUtils.degToRad(rotation.x),
      THREE.MathUtils.degToRad(rotation.y),
      THREE.MathUtils.degToRad(rotation.z),
      'XYZ'
    );
    scene.add(solidGroup);

    // 1. Shaded Solid Mesh
    const meshMaterial = new THREE.MeshStandardMaterial({
      color: meshFaceColor,
      roughness: 0.6,
      metalness: 0.1,
      polygonOffset: true,
      polygonOffsetFactor: 1.5,
      polygonOffsetUnits: 1.5,
      depthTest: true,
      depthWrite: true,
    });
    const solidMesh = new THREE.Mesh(geometry, meshMaterial);
    solidMesh.renderOrder = 0;
    solidGroup.add(solidMesh);

    // 2. Visible Edges (Solid Lines)
    const edgesGeom = new THREE.EdgesGeometry(geometry, 20);
    const visibleLineMat = new THREE.LineBasicMaterial({
      color: visibleEdgeColor,
      linewidth: 2,
      depthTest: true,
      depthWrite: true,
      depthFunc: THREE.LessEqualDepth,
    });
    const visibleEdges = new THREE.LineSegments(edgesGeom, visibleLineMat);
    visibleEdges.renderOrder = 1;
    solidGroup.add(visibleEdges);

    // 3. Hidden Edges (Dashed Lines)
    if (showHiddenLines) {
      const hiddenGeom = edgesGeom.clone();
      const dashedLineMat = new THREE.LineDashedMaterial({
        color: hiddenEdgeColor,
        dashSize: 2.2,
        gapSize: 1.5,
        scale: 1,
        depthTest: true,
        depthWrite: false,
        depthFunc: THREE.GreaterDepth,
      });
      const hiddenEdges = new THREE.LineSegments(hiddenGeom, dashedLineMat);
      hiddenEdges.computeLineDistances();
      hiddenEdges.renderOrder = 2;
      solidGroup.add(hiddenEdges);
    }

    // 4. Center Lines (BIS Type G: Long Dash - Dot - Long Dash)
    if (showCenterLines) {
      const centerMat = new THREE.LineDashedMaterial({
        color: isDark ? 0xef4444 : 0xdc2626,
        dashSize: 6,
        gapSize: 2,
        scale: 1,
      });
      const centerGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -60, 0),
        new THREE.Vector3(0, 60, 0),
        new THREE.Vector3(-60, 0, 0),
        new THREE.Vector3(60, 0, 0),
      ]);
      const centerLines = new THREE.LineSegments(centerGeom, centerMat);
      centerLines.computeLineDistances();
      solidGroup.add(centerLines);
    }

    // Camera setup for Orthographic Views
    const frustumSize = 135;
    const aspect = container.clientWidth / container.clientHeight;
    let camera: THREE.OrthographicCamera;
    const camDistance = 300;

    if (viewType === 'front') {
      camera = new THREE.OrthographicCamera(
        (-frustumSize * aspect) / 2,
        (frustumSize * aspect) / 2,
        frustumSize / 2,
        -frustumSize / 2,
        1,
        1000
      );
      camera.position.set(0, 0, camDistance);
      camera.up.set(0, 1, 0);
      camera.lookAt(0, 0, 0);
    } else if (viewType === 'top') {
      camera = new THREE.OrthographicCamera(
        (-frustumSize * aspect) / 2,
        (frustumSize * aspect) / 2,
        frustumSize / 2,
        -frustumSize / 2,
        1,
        1000
      );
      camera.position.set(0, camDistance, 0);
      camera.up.set(0, 0, -1);
      camera.lookAt(0, 0, 0);
    } else {
      camera = new THREE.OrthographicCamera(
        (frustumSize * aspect) / 2,
        (-frustumSize * aspect) / 2,
        frustumSize / 2,
        -frustumSize / 2,
        1,
        1000
      );
      camera.position.set(-camDistance, 0, 0);
      camera.up.set(0, 1, 0);
      camera.lookAt(0, 0, 0);
    }

    camera.updateProjectionMatrix();

    // Render
    const render = () => {
      renderer.render(scene, camera);
    };
    render();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;

      const newAspect = w / h;
      if (viewType === 'leftSide') {
        camera.left = (frustumSize * newAspect) / 2;
        camera.right = (-frustumSize * newAspect) / 2;
      } else {
        camera.left = (-frustumSize * newAspect) / 2;
        camera.right = (frustumSize * newAspect) / 2;
      }
      camera.top = frustumSize / 2;
      camera.bottom = -frustumSize / 2;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
      render();
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      renderer.dispose();
      meshMaterial.dispose();
      visibleLineMat.dispose();
      edgesGeom.dispose();
    };
  }, [viewType, geometry, dimensions, rotation, theme, showHiddenLines, showCenterLines, onCanvasReady]);

  const isDark = theme === 'blueprint';

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden transition-colors duration-200 ${
        isDark ? 'bg-[#0c1222]' : 'bg-[#f8fafc]'
      }`}
    >
      {/* Millimeter Engineering Graph Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: isDark
            ? `radial-gradient(circle, rgba(56, 189, 248, 0.15) 1px, transparent 1px),
               linear-gradient(to right, rgba(56, 189, 248, 0.05) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(56, 189, 248, 0.05) 1px, transparent 1px)`
            : `radial-gradient(circle, rgba(100, 116, 139, 0.2) 1px, transparent 1px),
               linear-gradient(to right, rgba(148, 163, 184, 0.1) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(148, 163, 184, 0.1) 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
        }}
      />

      <canvas ref={canvasRef} className="w-full h-full block relative z-0" />

      {/* Engineering View Header & Quadrant Tag */}
      <div className="absolute top-2 left-3 z-10 pointer-events-none flex flex-col">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-mono font-bold tracking-wider px-2 py-0.5 rounded border ${
              isDark
                ? 'bg-sky-950/80 text-sky-300 border-sky-800/80 shadow-[0_0_10px_rgba(56,189,248,0.2)]'
                : 'bg-slate-100 text-slate-800 border-slate-300'
            }`}
          >
            {label}
          </span>
          <span
            className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
              isDark ? 'bg-slate-800/80 text-slate-400' : 'bg-slate-200/80 text-slate-600'
            }`}
          >
            {planeName}
          </span>
        </div>
        <span
          className={`text-[10px] font-mono mt-0.5 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {sublabel} • {dimensionsSummary}
        </span>
      </div>

      {/* Aligned Engineering Dimension Callouts Overlay */}
      {showDimensions && (
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
          {viewType === 'front' && (
            <>
              {/* Length L Dimension Line (Bottom) */}
              <div className="absolute bottom-6 flex items-center gap-1 font-mono text-[10px] text-red-400 font-bold">
                <span className="w-2 h-[1px] bg-red-400" />
                <span>◄── L = {dimensions.length} mm ──►</span>
                <span className="w-2 h-[1px] bg-red-400" />
              </div>
              {/* Height H Dimension Line (Right) */}
              <div className="absolute right-6 flex flex-col items-center gap-1 font-mono text-[10px] text-emerald-400 font-bold rotate-90">
                <span>◄── H = {dimensions.height} mm ──►</span>
              </div>
            </>
          )}

          {viewType === 'top' && (
            <>
              {/* Length L Dimension Line */}
              <div className="absolute bottom-6 flex items-center gap-1 font-mono text-[10px] text-red-400 font-bold">
                <span>◄── L = {dimensions.length} mm ──►</span>
              </div>
              {/* Width W Dimension Line */}
              <div className="absolute left-6 flex flex-col items-center gap-1 font-mono text-[10px] text-blue-400 font-bold -rotate-90">
                <span>◄── W = {dimensions.width} mm ──►</span>
              </div>
            </>
          )}

          {viewType === 'leftSide' && (
            <>
              {/* Width W Dimension Line (Bottom) */}
              <div className="absolute bottom-6 flex items-center gap-1 font-mono text-[10px] text-blue-400 font-bold">
                <span>◄── W = {dimensions.width} mm ──►</span>
              </div>
              {/* Height H Dimension Line */}
              <div className="absolute right-6 flex flex-col items-center gap-1 font-mono text-[10px] text-emerald-400 font-bold rotate-90">
                <span>◄── H = {dimensions.height} mm ──►</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Faint Center Crosshair */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div
          className={`w-4 h-[1px] ${
            isDark ? 'bg-sky-500/30' : 'bg-slate-400/40'
          }`}
        />
        <div
          className={`h-4 w-[1px] absolute ${
            isDark ? 'bg-sky-500/30' : 'bg-slate-400/40'
          }`}
        />
      </div>

      {/* Quadrant Indicator Badge */}
      <div className="absolute bottom-2 right-3 pointer-events-none">
        <span
          className={`text-[9px] font-mono tracking-widest uppercase ${
            isDark ? 'text-slate-500' : 'text-slate-400'
          }`}
        >
          {quadrant}
        </span>
      </div>
    </div>
  );
};
