import React, { useState, useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  Sliders,
  CheckCircle2,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react';
import { CadLayerId, ProProjectState, StaircaseConfig } from '../../types/pro';
import { ThemeMode } from '../../types';
import { AccentId, getAccentConfig } from '../../utils/accentTheme';

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
  accentId,
}) => {
  const isDark = theme === 'blueprint';
  const stair = project.staircase;
  const [viewMode, setViewMode] = useState<'2d' | 'section' | '3d'>('2d');
  const [zoom, setZoom] = useState<number>(1);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const accentHex = accentId === 'mono' ? (isDark ? '#38bdf8' : '#0284c7') : getAccentConfig(accentId).hex;

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
    const totalStaircaseLength = goingFlight1 + L; // exact shaft length: flight going + mid-landing
    const totalStaircaseWidth = 2 * W + 100; // 100mm well space

    const comfortMetric = 2 * actualRiser + T; // 600 - 650 mm
    const comfortPass = comfortMetric >= 590 && comfortMetric <= 660;

    const pitchRad = Math.atan(actualRiser / T);
    const pitchDeg = (pitchRad * 180) / Math.PI;

    // Headroom check: minimum vertical clearance to floor slab above
    const midLandingHeight = risersFlight1 * actualRiser;
    const headroomMm = Math.max(0, Math.round(H - stair.waistSlabMm - actualRiser * 2));
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


  const planVbW = (calc.totalStaircaseLength + 1200) / zoom;
  const planVbH = (calc.totalStaircaseWidth + 1300) / zoom;
  const planVbX = (calc.totalStaircaseLength / 2) - planVbW / 2;
  const planVbY = (calc.totalStaircaseWidth / 2) - planVbH / 2;

  const secTotalX = calc.goingFlight1 + stair.landingWidthMm;
  const secVbW = (secTotalX + 2000) / zoom;
  const secVbH = (stair.floorHeightMm + 1900) / zoom;
  const secVbX = secTotalX / 2 - secVbW / 2 + 250;
  const secVbY = (3200 - stair.floorHeightMm / 2) - secVbH / 2 - 150;

  return (
    <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden relative">
      {/* Center Drafting Stage */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Controls */}
        <div className="px-4 pt-3 pb-2 z-20 flex flex-wrap items-center justify-between gap-2 border-b border-current/10 bg-current/[0.02]">
          <div className="flex flex-wrap items-center gap-2">
            <div className="p-1 rounded-full glass-pill flex items-center gap-1 text-[11px] font-semibold shadow-sm">
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                calc.comfortPass
                  ? isDark
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                    : 'bg-emerald-500/15 border-emerald-600/30 text-emerald-700'
                  : isDark
                    ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                    : 'bg-amber-500/15 border-amber-600/30 text-amber-700'
              }`}
            >
              {calc.comfortPass ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
              <span>2R + T = {Math.round(calc.comfortMetric)} mm</span>
            </div>

            {hoveredStep !== null && viewMode === '2d' && (
              <div className="px-3 py-1 rounded-full glass-pill text-[11px] font-mono font-semibold">
                Step #{hoveredStep} • EL +{((hoveredStep * calc.actualRiser) / 1000).toFixed(2)}m
              </div>
            )}
          </div>

          {viewMode !== '3d' && (
            <div className="flex items-center gap-1 p-1 rounded-full glass-pill text-[11px]">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.6, Number((z - 0.15).toFixed(2))))}
                title="Zoom Out"
                className="p-1.5 rounded-full hover:bg-current/10 cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-1.5 font-mono text-[10px] tabular-nums">{Math.round(zoom * 100)}%</span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(2.2, Number((z + 0.15).toFixed(2))))}
                title="Zoom In"
                className="p-1.5 rounded-full hover:bg-current/10 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoom(1)}
                title="Reset Fit"
                className="p-1.5 rounded-full hover:bg-current/10 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Canvases */}
        <div className="flex-1 flex items-center justify-center h-full p-4 overflow-hidden">
          {/* 2D Plan View SVG */}
          {viewMode === '2d' && (
            <svg
              viewBox={`${planVbX} ${planVbY} ${planVbW} ${planVbH}`}
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-full max-h-[82vh]"
            >
              {/* Outer Staircase Shaft Wall (Flush with Going + Mid-Landing) */}
              <rect
                x="0"
                y="0"
                width={calc.totalStaircaseLength}
                height={calc.totalStaircaseWidth}
                fill={isDark ? '#141418' : '#ffffff'}
                stroke={isDark ? '#e4e4e7' : '#0f172a'}
                strokeWidth="55"
              />

              {/* Central Stairwell Divider / Newel Wall */}
              <rect
                x="0"
                y={stair.flightWidthMm}
                width={calc.goingFlight1}
                height="100"
                fill={isDark ? '#3f3f46' : '#64748b'}
              />

              {/* Flight 1 Steps (Interactive Hover) */}
              {Array.from({ length: calc.treadsFlight1 }).map((_, i) => {
                const stepNum = i + 1;
                const isHov = hoveredStep === stepNum;
                return (
                  <g
                    key={`step1-${i}`}
                    onMouseEnter={() => setHoveredStep(stepNum)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className="cursor-pointer"
                  >
                    <rect
                      x={i * stair.treadMm}
                      y="0"
                      width={stair.treadMm}
                      height={stair.flightWidthMm}
                      fill={isHov ? accentHex : 'transparent'}
                      fillOpacity={isHov ? 0.18 : 0}
                    />
                    <line
                      x1={(i + 1) * stair.treadMm}
                      y1="0"
                      x2={(i + 1) * stair.treadMm}
                      y2={stair.flightWidthMm}
                      stroke={isDark ? '#e4e4e7' : '#0f172a'}
                      strokeWidth="18"
                    />
                    <text
                      x={i * stair.treadMm + stair.treadMm / 2}
                      y="135"
                      fontSize="95"
                      fontWeight="600"
                      textAnchor="middle"
                      fill={isDark ? '#a1a1aa' : '#475569'}
                    >
                      {stepNum}
                    </text>
                  </g>
                );
              })}

              {/* Flight 1 UP Walkline Arrow + Pill Label */}
              <line
                x1="150"
                y1={stair.flightWidthMm * 0.56}
                x2={calc.goingFlight1 - 120}
                y2={stair.flightWidthMm * 0.56}
                stroke={accentHex}
                strokeWidth="26"
              />
              <circle cx="150" cy={stair.flightWidthMm * 0.56} r="42" fill={accentHex} />
              <polygon
                points={`${calc.goingFlight1 - 50},${stair.flightWidthMm * 0.56} ${calc.goingFlight1 - 165},${stair.flightWidthMm * 0.56 - 52} ${calc.goingFlight1 - 165},${stair.flightWidthMm * 0.56 + 52}`}
                fill={accentHex}
              />
              <rect
                x={calc.goingFlight1 * 0.28}
                y={stair.flightWidthMm * 0.56 - 145}
                width="820"
                height="125"
                rx="24"
                fill={isDark ? '#09090b' : '#ffffff'}
                stroke={accentHex}
                strokeWidth="14"
              />
              <text
                x={calc.goingFlight1 * 0.28 + 410}
                y={stair.flightWidthMm * 0.56 - 55}
                fontSize="88"
                fontWeight="700"
                textAnchor="middle"
                fill={accentHex}
              >
                UP • FLIGHT 1
              </text>

              {/* Mid-Landing Slab (Fills exact right side cleanly, rotated label fits inside) */}
              <rect
                x={calc.goingFlight1}
                y="0"
                width={stair.landingWidthMm}
                height={calc.totalStaircaseWidth}
                fill={isDark ? '#232329' : '#e2e8f0'}
                stroke={isDark ? '#e4e4e7' : '#0f172a'}
                strokeWidth="26"
              />
              <g transform={`translate(${calc.goingFlight1 + stair.landingWidthMm / 2}, ${calc.totalStaircaseWidth / 2}) rotate(-90)`}>
                <text
                  x="0"
                  y="-45"
                  fontSize="110"
                  fontWeight="800"
                  textAnchor="middle"
                  fill={isDark ? '#f4f4f6' : '#0f172a'}
                >
                  MID-LANDING
                </text>
                <text
                  x="0"
                  y="95"
                  fontSize="105"
                  fontWeight="700"
                  textAnchor="middle"
                  fill={accentHex}
                >
                  EL +{(calc.midLandingHeight / 1000).toFixed(2)} m
                </text>
              </g>

              {/* Turn Arrow inside Mid-Landing */}
              <path
                d={`M ${calc.goingFlight1 + stair.landingWidthMm * 0.22} ${stair.flightWidthMm * 0.56} Q ${calc.goingFlight1 + stair.landingWidthMm * 0.42} ${calc.totalStaircaseWidth / 2} ${calc.goingFlight1 + stair.landingWidthMm * 0.22} ${stair.flightWidthMm + 100 + stair.flightWidthMm * 0.44}`}
                fill="none"
                stroke={accentHex}
                strokeWidth="22"
                strokeDasharray="45 25"
              />

              {/* Flight 2 Steps (Interactive Hover) */}
              {Array.from({ length: calc.treadsFlight2 }).map((_, i) => {
                const stepNum = calc.risersFlight1 + i + 1;
                const xLeft = calc.goingFlight1 - (i + 1) * stair.treadMm;
                const isHov = hoveredStep === stepNum;
                return (
                  <g
                    key={`step2-${i}`}
                    onMouseEnter={() => setHoveredStep(stepNum)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className="cursor-pointer"
                  >
                    <rect
                      x={xLeft}
                      y={stair.flightWidthMm + 100}
                      width={stair.treadMm}
                      height={stair.flightWidthMm}
                      fill={isHov ? accentHex : 'transparent'}
                      fillOpacity={isHov ? 0.18 : 0}
                    />
                    <line
                      x1={xLeft}
                      y1={stair.flightWidthMm + 100}
                      x2={xLeft}
                      y2={calc.totalStaircaseWidth}
                      stroke={isDark ? '#e4e4e7' : '#0f172a'}
                      strokeWidth="18"
                    />
                    <text
                      x={xLeft + stair.treadMm / 2}
                      y={calc.totalStaircaseWidth - 65}
                      fontSize="95"
                      fontWeight="600"
                      textAnchor="middle"
                      fill={isDark ? '#a1a1aa' : '#475569'}
                    >
                      {stepNum}
                    </text>
                  </g>
                );
              })}

              {/* Flight 2 Return Walkline Arrow (Going Left to Upper Floor) */}
              <line
                x1={calc.goingFlight1 - 120}
                y1={stair.flightWidthMm + 100 + stair.flightWidthMm * 0.44}
                x2="150"
                y2={stair.flightWidthMm + 100 + stair.flightWidthMm * 0.44}
                stroke={accentHex}
                strokeWidth="26"
              />
              <polygon
                points={`65,${stair.flightWidthMm + 100 + stair.flightWidthMm * 0.44} 180,${stair.flightWidthMm + 100 + stair.flightWidthMm * 0.44 - 52} 180,${stair.flightWidthMm + 100 + stair.flightWidthMm * 0.44 + 52}`}
                fill={accentHex}
              />
              <rect
                x={calc.goingFlight1 * 0.28}
                y={stair.flightWidthMm + 100 + stair.flightWidthMm * 0.44 + 35}
                width="860"
                height="125"
                rx="24"
                fill={isDark ? '#09090b' : '#ffffff'}
                stroke={accentHex}
                strokeWidth="14"
              />
              <text
                x={calc.goingFlight1 * 0.28 + 430}
                y={stair.flightWidthMm + 100 + stair.flightWidthMm * 0.44 + 125}
                fontSize="88"
                fontWeight="700"
                textAnchor="middle"
                fill={accentHex}
              >
                FLIGHT 2 • TO UPPER
              </text>

              {/* Standard Architectural Cut-Line Break across Flight 2 */}
              <line
                x1={calc.goingFlight1 * 0.42}
                y1={stair.flightWidthMm + 80}
                x2={calc.goingFlight1 * 0.58}
                y2={calc.totalStaircaseWidth + 20}
                stroke={isDark ? '#f4f4f6' : '#0f172a'}
                strokeWidth="20"
                strokeDasharray="80 35"
              />

              {/* Overall Dimension Chains (Top: Going + Landing, Left: Shaft Width) */}
              <g fill={isDark ? '#cbd5e1' : '#334155'} stroke={isDark ? '#64748b' : '#64748b'} strokeWidth="14">
                {/* Going dimension */}
                <line x1="0" y1="-220" x2={calc.goingFlight1} y2="-220" />
                <line x1="0" y1="-280" x2="0" y2="-140" />
                <line x1={calc.goingFlight1} y1="-280" x2={calc.goingFlight1} y2="-140" />
                <text x={calc.goingFlight1 / 2} y="-270" fontSize="105" fontWeight="700" textAnchor="middle" stroke="none">
                  GOING: {calc.goingFlight1} mm ({calc.treadsFlight1}T × {stair.treadMm})
                </text>

                {/* Landing dimension */}
                <line x1={calc.goingFlight1} y1="-220" x2={calc.totalStaircaseLength} y2="-220" />
                <line x1={calc.totalStaircaseLength} y1="-280" x2={calc.totalStaircaseLength} y2="-140" />
                <text x={calc.goingFlight1 + stair.landingWidthMm / 2} y="-270" fontSize="105" fontWeight="700" textAnchor="middle" stroke="none">
                  LANDING: {stair.landingWidthMm}
                </text>

                {/* Overall bottom length */}
                <line x1="0" y1={calc.totalStaircaseWidth + 240} x2={calc.totalStaircaseLength} y2={calc.totalStaircaseWidth + 240} />
                <line x1="0" y1={calc.totalStaircaseWidth + 160} x2="0" y2={calc.totalStaircaseWidth + 300} />
                <line x1={calc.totalStaircaseLength} y1={calc.totalStaircaseWidth + 160} x2={calc.totalStaircaseLength} y2={calc.totalStaircaseWidth + 300} />
                <text x={calc.totalStaircaseLength / 2} y={calc.totalStaircaseWidth + 380} fontSize="110" fontWeight="800" textAnchor="middle" stroke="none">
                  TOTAL SHAFT LENGTH: {(calc.totalStaircaseLength / 1000).toFixed(2)} m • WIDTH: {(calc.totalStaircaseWidth / 1000).toFixed(2)} m
                </text>
              </g>
            </svg>
          )}

          {/* Longitudinal Vertical Section SVG (Complete 2-Flight Dog-Legged Profile) */}
          {viewMode === 'section' && (
            <svg
              viewBox={`${secVbX} ${secVbY} ${secVbW} ${secVbH}`}
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-full max-h-[82vh]"
            >
              {/* Ground / Plinth Floor Slab */}
              <rect
                x="-350"
                y="3200"
                width={secTotalX + 900}
                height="160"
                fill={isDark ? '#27272a' : '#cbd5e1'}
                stroke={isDark ? '#e4e4e7' : '#0f172a'}
                strokeWidth="22"
              />
              <text x="-300" y="3490" fontSize="110" fill={isDark ? '#94a3b8' : '#334155'} fontWeight="700">
                FINISHED FLOOR LEVEL (FFL ±0.00 m)
              </text>

              {/* Upper Floor Slab */}
              <rect
                x="-350"
                y={3200 - stair.floorHeightMm}
                width="450"
                height={stair.waistSlabMm}
                fill={isDark ? '#27272a' : '#cbd5e1'}
                stroke={isDark ? '#e4e4e7' : '#0f172a'}
                strokeWidth="22"
              />

              {/* Flight 1 Inclined Waist Slab + Mid-Landing Slab */}
              <polygon
                points={`0,3200 ${calc.goingFlight1},${3200 - calc.midLandingHeight} ${secTotalX},${3200 - calc.midLandingHeight} ${secTotalX},${3200 - calc.midLandingHeight + stair.waistSlabMm} ${calc.goingFlight1},${3200 - calc.midLandingHeight + stair.waistSlabMm} 0,${3200 + stair.waistSlabMm}`}
                fill={isDark ? 'rgba(56, 189, 248, 0.16)' : 'rgba(2, 132, 199, 0.14)'}
                stroke={accentHex}
                strokeWidth="24"
              />

              {/* Flight 1 Steps Profile */}
              {Array.from({ length: calc.risersFlight1 }).map((_, i) => (
                <path
                  key={`sec-f1-${i}`}
                  d={`M ${i * stair.treadMm} ${3200 - i * calc.actualRiser} L ${i * stair.treadMm} ${3200 - (i + 1) * calc.actualRiser} L ${(i + 1) * stair.treadMm} ${3200 - (i + 1) * calc.actualRiser}`}
                  fill="none"
                  stroke={isDark ? '#f4f4f6' : '#0f172a'}
                  strokeWidth="28"
                />
              ))}

              {/* Flight 2 Returning Waist Slab (Mid-Landing back up to Upper Floor) */}
              <polygon
                points={`${calc.goingFlight1},${3200 - calc.midLandingHeight} 0,${3200 - stair.floorHeightMm} 0,${3200 - stair.floorHeightMm + stair.waistSlabMm} ${calc.goingFlight1},${3200 - calc.midLandingHeight + stair.waistSlabMm}`}
                fill={isDark ? 'rgba(161, 161, 170, 0.12)' : 'rgba(100, 116, 139, 0.12)'}
                stroke={isDark ? '#94a3b8' : '#475569'}
                strokeWidth="20"
                strokeDasharray="60 30"
              />

              {/* Flight 2 Steps Profile (Dashed background elevation) */}
              {Array.from({ length: calc.risersFlight2 }).map((_, i) => (
                <path
                  key={`sec-f2-${i}`}
                  d={`M ${calc.goingFlight1 - i * stair.treadMm} ${3200 - calc.midLandingHeight - i * calc.actualRiser} L ${calc.goingFlight1 - i * stair.treadMm} ${3200 - calc.midLandingHeight - (i + 1) * calc.actualRiser} L ${calc.goingFlight1 - (i + 1) * stair.treadMm} ${3200 - calc.midLandingHeight - (i + 1) * calc.actualRiser}`}
                  fill="none"
                  stroke={isDark ? '#94a3b8' : '#64748b'}
                  strokeWidth="20"
                  strokeDasharray="45 25"
                />
              ))}

              {/* Handrails (900 mm above nosing line) */}
              <line
                x1="0"
                y1={3200 - 900}
                x2={calc.goingFlight1}
                y2={3200 - calc.midLandingHeight - 900}
                stroke="#f59e0b"
                strokeWidth="28"
              />
              <line
                x1={calc.goingFlight1}
                y1={3200 - calc.midLandingHeight - 900}
                x2={secTotalX}
                y2={3200 - calc.midLandingHeight - 900}
                stroke="#f59e0b"
                strokeWidth="28"
              />

              {/* Level Reference Lines & Markers */}
              <line
                x1={secTotalX}
                y1={3200 - calc.midLandingHeight}
                x2={secTotalX + 900}
                y2={3200 - calc.midLandingHeight}
                stroke={accentHex}
                strokeWidth="18"
                strokeDasharray="45 25"
              />
              <text x={secTotalX + 80} y={3200 - calc.midLandingHeight - 40} fontSize="105" fontWeight="800" fill={accentHex}>
                MID-LANDING (+{(calc.midLandingHeight / 1000).toFixed(2)} m)
              </text>

              <line
                x1="0"
                y1={3200 - stair.floorHeightMm}
                x2={secTotalX + 900}
                y2={3200 - stair.floorHeightMm}
                stroke="#ef4444"
                strokeWidth="18"
                strokeDasharray="45 25"
              />
              <text x={secTotalX + 80} y={3200 - stair.floorHeightMm - 40} fontSize="105" fontWeight="800" fill="#ef4444">
                UPPER FLOOR (+{(stair.floorHeightMm / 1000).toFixed(2)} m)
              </text>

              {/* Slope Angle & Waist Slab Callout */}
              <text x={calc.goingFlight1 * 0.45} y={3200 - calc.midLandingHeight * 0.35 + 260} fontSize="100" fontWeight="700" fill={accentHex}>
                Pitch {calc.pitchDeg.toFixed(1)}° • Waist {stair.waistSlabMm} mm
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