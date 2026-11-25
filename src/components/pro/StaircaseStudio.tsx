import React, { useState, useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  Sliders,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { CadLayerId, ProProjectState, StaircaseConfig } from '../../types/pro';
import { ThemeMode } from '../../types';
import { AccentId } from '../../utils/accentTheme';

interface StaircaseStudioProps {
  project: ProProjectState;
  onUpdateProject: (next: ProProjectState) => void;
  theme: ThemeMode;
  accentId: AccentId;
  activeLayers: CadLayerId[];
}

export const StaircaseStudio: React.FC<StaircaseStudioProps> = ({
  project,
  onUpdateProject,
  theme,
}) => {
  const isDark = theme === 'blueprint';
  const stair = project.staircase;
  const [viewMode, setViewMode] = useState<'2d' | 'section' | '3d'>('2d');

  const canvas3dRef = useRef<HTMLCanvasElement | null>(null);
  const container3dRef = useRef<HTMLDivElement | null>(null);

  // Computed Architectural Stair Calculations
  const calc = useMemo(() => {
    const H = stair.floorHeightMm;
    const R = Math.max(100, stair.riserMm);
    const T = Math.max(200, stair.treadMm);
    const W = stair.flightWidthMm;
    const L = stair.landingWidthMm;

    const totalRisers = Math.round(H / R);
    const actualRiser = H / totalRisers;

    // Dog-legged: 2 equal flights
    const risersFlight1 = Math.ceil(totalRisers / 2);
    const risersFlight2 = totalRisers - risersFlight1;
    const treadsFlight1 = risersFlight1 - 1;
    const treadsFlight2 = risersFlight2 - 1;

    const goingFlight1 = treadsFlight1 * T;
    const totalStaircaseLength = goingFlight1 + L + 600; // room for approach
    const totalStaircaseWidth = 2 * W + 100; // 100mm well space

    const comfortMetric = 2 * actualRiser + T; // 600 - 650 mm
    const comfortPass = comfortMetric >= 590 && comfortMetric <= 660;

    const pitchRad = Math.atan(actualRiser / T);
    const pitchDeg = (pitchRad * 180) / Math.PI;

    // Headroom check: minimum vertical clearance to floor slab above
    const midLandingHeight = risersFlight1 * actualRiser;
    const headroomMm = Math.max(0, H - midLandingHeight);
    const headroomPass = headroomMm >= 2100;

    return {
      totalRisers,
      actualRiser,
      risersFlight1,
      risersFlight2,
      treadsFlight1,
      treadsFlight2,
      goingFlight1,
      totalStaircaseLength,
      totalStaircaseWidth,
      comfortMetric,
      comfortPass,
      pitchDeg,
      headroomMm,
      headroomPass,
      midLandingHeight,
    };
  }, [stair]);

  const handleUpdate = (updated: StaircaseConfig) => {
    onUpdateProject({ ...project, staircase: updated });
  };

  // 3D Three.js Staircase Preview
  useEffect(() => {
    if (viewMode !== '3d') return;
    const canvas = canvas3dRef.current;
    const container = container3dRef.current;
    if (!canvas || !container) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isDark ? 0x09090b : 0xf8fafc);

    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 20000);
    camera.position.set(4500, 3800, 4800);
    camera.lookAt(1500, 1500, 1000);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(1500, 1500, 1000);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.9 : 1.2);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(3000, 6000, 4000);
    scene.add(dirLight);

    const stepMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x334155 : 0xe2e8f0,
      roughness: 0.4,
      metalness: 0.1,
    });
    const handrailMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.2,
      metalness: 0.8,
    });

    const geoms: THREE.BufferGeometry[] = [];
    const meshes: THREE.Mesh[] = [];

    const W = stair.flightWidthMm;
    const T = stair.treadMm;
    const R = calc.actualRiser;

    // Flight 1 Steps
    for (let i = 0; i < calc.risersFlight1; i++) {
      const stepGeom = new THREE.BoxGeometry(T, (i + 1) * R, W);
      geoms.push(stepGeom);
      const stepMesh = new THREE.Mesh(stepGeom, stepMat);
      stepMesh.position.set(i * T + T / 2, ((i + 1) * R) / 2, W / 2);
      scene.add(stepMesh);
      meshes.push(stepMesh);
    }

    // Mid Landing
    const landingGeom = new THREE.BoxGeometry(stair.landingWidthMm, calc.midLandingHeight, 2 * W + 100);
    geoms.push(landingGeom);
    const landingMesh = new THREE.Mesh(landingGeom, stepMat);
    landingMesh.position.set(
      calc.goingFlight1 + stair.landingWidthMm / 2,
      calc.midLandingHeight / 2,
      W + 50
    );
    scene.add(landingMesh);
    meshes.push(landingMesh);

    // Flight 2 Steps (Going backwards in Z direction)
    for (let i = 0; i < calc.risersFlight2; i++) {
      const stepGeom = new THREE.BoxGeometry(T, (i + 1) * R, W);
      geoms.push(stepGeom);
      const stepMesh = new THREE.Mesh(stepGeom, stepMat);
      stepMesh.position.set(
        calc.goingFlight1 - (i * T + T / 2),
        calc.midLandingHeight + ((i + 1) * R) / 2,
        W + 100 + W / 2
      );
      scene.add(stepMesh);
      meshes.push(stepMesh);
    }

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const observer = new ResizeObserver(handleResize);
    observer.observe(container);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      controls.dispose();
      renderer.dispose();
      stepMat.dispose();
      handrailMat.dispose();
      geoms.forEach((g) => g.dispose());
    };
  }, [viewMode, stair, calc, isDark]);

  return (
    <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden relative">
      {/* Center Drafting Stage */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Controls */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <div className="p-1 rounded-full glass-pill flex items-center gap-1 text-[11px] font-semibold shadow-lg">
            <button
              onClick={() => setViewMode('2d')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                viewMode === '2d' ? 'glass-pill-active' : 'opacity-65 hover:opacity-100'
              }`}
            >
              2D Plan View
            </button>
            <button
              onClick={() => setViewMode('section')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                viewMode === 'section' ? 'glass-pill-active' : 'opacity-65 hover:opacity-100'
              }`}
            >
              Longitudinal Section
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                viewMode === '3d' ? 'glass-pill-active' : 'opacity-65 hover:opacity-100'
              }`}
            >
              3D Staircase Model
            </button>
          </div>

          {/* Compliance Check Pill */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold shadow-md border ${
              calc.comfortPass
                ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                : 'bg-amber-500/10 border-amber-500/25 text-amber-400'
            }`}
          >
            {calc.comfortPass ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
            <span>Comfort Rule: 2R + T = {Math.round(calc.comfortMetric)} mm</span>
          </div>
        </div>

        {/* Canvases */}
        <div className="flex-1 flex items-center justify-center h-full p-4 overflow-hidden">
          {/* 2D Plan View SVG */}
          {viewMode === '2d' && (
            <svg
              viewBox={`-500 -500 ${calc.totalStaircaseLength + 1000} ${calc.totalStaircaseWidth + 1000}`}
              className="w-full h-full max-h-[85vh]"
            >
              {/* Outer Staircase Shaft Wall */}
              <rect
                x="0"
                y="0"
                width={calc.totalStaircaseLength}
                height={calc.totalStaircaseWidth}
                fill={isDark ? '#18181b' : '#f8fafc'}
                stroke={isDark ? '#e4e4e7' : '#0f172a'}
                strokeWidth="40"
              />

              {/* Central Well Gap */}
              <line
                x1="0"
                y1={stair.flightWidthMm + 50}
                x2={calc.goingFlight1}
                y2={stair.flightWidthMm + 50}
                stroke="#64748b"
                strokeWidth="100"
              />

              {/* Flight 1 Steps (Up Arrow) */}
              {Array.from({ length: calc.treadsFlight1 }).map((_, i) => (
                <g key={`step1-${i}`}>
                  <line
                    x1={i * stair.treadMm}
                    y1="0"
                    x2={i * stair.treadMm}
                    y2={stair.flightWidthMm}
                    stroke={isDark ? '#e4e4e7' : '#0f172a'}
                    strokeWidth="20"
                  />
                  <text x={i * stair.treadMm + 50} y="150" fontSize="100" fill="currentColor" opacity="0.6">
                    {i + 1}
                  </text>
                </g>
              ))}

              {/* Up Direction Line & Arrow */}
              <line x1="200" y1={stair.flightWidthMm / 2} x2={calc.goingFlight1 - 100} y2={stair.flightWidthMm / 2} stroke="#38bdf8" strokeWidth="25" />
              <polygon points={`${calc.goingFlight1 - 50},${stair.flightWidthMm / 2} ${calc.goingFlight1 - 150},${stair.flightWidthMm / 2 - 40} ${calc.goingFlight1 - 150},${stair.flightWidthMm / 2 + 40}`} fill="#38bdf8" />
              <text x="250" y={stair.flightWidthMm / 2 - 50} fontSize="120" fontWeight="bold" fill="#38bdf8">UP (Flight 1)</text>

              {/* Mid Landing Box */}
              <rect
                x={calc.goingFlight1}
                y="0"
                width={stair.landingWidthMm}
                height={calc.totalStaircaseWidth}
                fill={isDark ? '#27272a' : '#e2e8f0'}
                stroke={isDark ? '#e4e4e7' : '#0f172a'}
                strokeWidth="25"
              />
              <text
                x={calc.goingFlight1 + stair.landingWidthMm / 2}
                y={calc.totalStaircaseWidth / 2}
                fontSize="160"
                fontWeight="bold"
                textAnchor="middle"
                fill="currentColor"
              >
                MID-LANDING (+{(calc.midLandingHeight / 1000).toFixed(2)}m)
              </text>

              {/* Flight 2 Steps */}
              {Array.from({ length: calc.treadsFlight2 }).map((_, i) => (
                <g key={`step2-${i}`}>
                  <line
                    x1={calc.goingFlight1 - i * stair.treadMm}
                    y1={stair.flightWidthMm + 100}
                    x2={calc.goingFlight1 - i * stair.treadMm}
                    y2={calc.totalStaircaseWidth}
                    stroke={isDark ? '#e4e4e7' : '#0f172a'}
                    strokeWidth="20"
                  />
                  <text x={calc.goingFlight1 - i * stair.treadMm - 120} y={calc.totalStaircaseWidth - 80} fontSize="100" fill="currentColor" opacity="0.6">
                    {calc.risersFlight1 + i + 1}
                  </text>
                </g>
              ))}
            </svg>
          )}

          {/* Longitudinal Vertical Section SVG */}
          {viewMode === 'section' && (
            <svg viewBox="-500 -500 5000 4000" className="w-full h-full max-h-[85vh]">
              {/* Ground & Plinth Level */}
              <line x1="-200" y1="3200" x2="4500" y2="3200" stroke="#64748b" strokeWidth="25" strokeDasharray="60 30" />
              <text x="-150" y="3150" fontSize="110" fill="#64748b" fontWeight="bold">PL / FLOOR LEVEL (±0.00)</text>

              {/* Flight 1 Steps Section Profile */}
              {Array.from({ length: calc.risersFlight1 }).map((_, i) => (
                <path
                  key={`sec-step-${i}`}
                  d={`M ${i * stair.treadMm} ${3200 - i * calc.actualRiser} L ${i * stair.treadMm} ${3200 - (i + 1) * calc.actualRiser} L ${(i + 1) * stair.treadMm} ${3200 - (i + 1) * calc.actualRiser}`}
                  fill="none"
                  stroke={isDark ? '#e4e4e7' : '#0f172a'}
                  strokeWidth="30"
                />
              ))}

              {/* Inclined Waist Slab */}
              <polygon
                points={`0,3350 ${calc.goingFlight1},${3350 - calc.midLandingHeight} ${calc.goingFlight1 + stair.landingWidthMm},${3350 - calc.midLandingHeight} ${calc.goingFlight1 + stair.landingWidthMm},${3200 - calc.midLandingHeight} ${calc.goingFlight1},${3200 - calc.midLandingHeight} 0,3200`}
                fill={isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(2, 132, 199, 0.12)'}
                stroke="#38bdf8"
                strokeWidth="30"
              />

              {/* Handrail (900mm above treads) */}
              <line
                x1="0"
                y1={3200 - 900}
                x2={calc.goingFlight1 + stair.landingWidthMm}
                y2={3200 - calc.midLandingHeight - 900}
                stroke="#fbbf24"
                strokeWidth="35"
              />

              {/* Level Markers */}
              <text x={calc.goingFlight1 + stair.landingWidthMm + 80} y={3200 - calc.midLandingHeight} fontSize="120" fontWeight="bold" fill="#38bdf8">
                Landing Level (+{(calc.midLandingHeight / 1000).toFixed(2)}m)
              </text>
              <text x={calc.goingFlight1 + stair.landingWidthMm + 80} y={3200 - stair.floorHeightMm} fontSize="120" fontWeight="bold" fill="#ef4444">
                Upper Floor (+{(stair.floorHeightMm / 1000).toFixed(2)}m)
              </text>
            </svg>
          )}

          {/* 3D Canvas */}
          {viewMode === '3d' && (
            <div ref={container3dRef} className="w-full h-full relative">
              <canvas ref={canvas3dRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
            </div>
          )}
        </div>
      </div>

      {/* Right Parametric Inspector */}
      <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-current/10 glass-panel p-4 flex flex-col gap-4 overflow-y-auto shrink-0 custom-scrollbar">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[var(--accent-hex)]" />
            <span className="font-semibold text-sm">Staircase Geometry</span>
          </div>
          <span className="text-[10px] opacity-60 font-mono">IS 456 / NBC</span>
        </div>

        {/* Staircase Type */}
        <div className="space-y-1">
          <label className="text-[11px] opacity-60">Stair Configuration</label>
          <div className="grid grid-cols-3 gap-1 p-0.5 rounded-xl glass-pill text-[11px] font-semibold text-center">
            <button
              onClick={() => handleUpdate({ ...stair, type: 'dog-legged' })}
              className={`py-1.5 rounded-lg cursor-pointer ${
                stair.type === 'dog-legged' ? 'glass-pill-active' : 'opacity-65'
              }`}
            >
              Dog-Legged
            </button>
            <button
              onClick={() => handleUpdate({ ...stair, type: 'l-shaped' })}
              className={`py-1.5 rounded-lg cursor-pointer ${
                stair.type === 'l-shaped' ? 'glass-pill-active' : 'opacity-65'
              }`}
            >
              L-Shaped
            </button>
            <button
              onClick={() => handleUpdate({ ...stair, type: 'open-well' })}
              className={`py-1.5 rounded-lg cursor-pointer ${
                stair.type === 'open-well' ? 'glass-pill-active' : 'opacity-65'
              }`}
            >
              Open-Well
            </button>
          </div>
        </div>

        {/* Parameters */}
        <div className="space-y-3 text-xs">
          <div className="space-y-1">
            <label className="text-[11px] opacity-60">Floor-to-Floor Height (mm)</label>
            <input
              type="number"
              step="50"
              value={stair.floorHeightMm}
              onChange={(e) => handleUpdate({ ...stair, floorHeightMm: Math.max(2000, Number(e.target.value)) })}
              className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent font-medium tabular-nums"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[11px] opacity-60">Riser R (mm)</label>
              <input
                type="number"
                step="5"
                value={stair.riserMm}
                onChange={(e) => handleUpdate({ ...stair, riserMm: Math.max(100, Number(e.target.value)) })}
                className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] opacity-60">Tread T (mm)</label>
              <input
                type="number"
                step="10"
                value={stair.treadMm}
                onChange={(e) => handleUpdate({ ...stair, treadMm: Math.max(200, Number(e.target.value)) })}
                className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[11px] opacity-60">Flight Width (mm)</label>
              <input
                type="number"
                step="50"
                value={stair.flightWidthMm}
                onChange={(e) => handleUpdate({ ...stair, flightWidthMm: Math.max(600, Number(e.target.value)) })}
                className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] opacity-60">Landing Width (mm)</label>
              <input
                type="number"
                step="50"
                value={stair.landingWidthMm}
                onChange={(e) => handleUpdate({ ...stair, landingWidthMm: Math.max(600, Number(e.target.value)) })}
                className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] opacity-60">Waist Slab Thickness (mm)</label>
            <input
              type="number"
              step="10"
              value={stair.waistSlabMm}
              onChange={(e) => handleUpdate({ ...stair, waistSlabMm: Math.max(100, Number(e.target.value)) })}
              className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
            />
          </div>
        </div>

        {/* Calculated Architectural Readouts */}
        <div className="pt-3 border-t border-current/10 space-y-2 text-xs">
          <span className="font-semibold text-xs text-[var(--accent-hex)]">Calculation Summary</span>
          <div className="p-3 rounded-2xl glass-card space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="opacity-75">Total Steps / Risers:</span>
              <span className="font-bold">{calc.totalRisers} nos. ({calc.risersFlight1} + {calc.risersFlight2})</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="opacity-75">Actual Rise per Step:</span>
              <span className="font-mono font-bold">{calc.actualRiser.toFixed(1)} mm</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="opacity-75">Stair Slope / Pitch:</span>
              <span className="font-mono font-bold">{calc.pitchDeg.toFixed(1)}°</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="opacity-75">Headroom Clearance:</span>
              <span className={`font-mono font-bold ${calc.headroomPass ? 'text-emerald-400' : 'text-amber-400'}`}>
                {Math.round(calc.headroomMm)} mm
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
