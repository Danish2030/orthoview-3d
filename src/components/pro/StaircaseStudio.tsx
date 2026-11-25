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

  // Computed Architectural Stair Calculations per Stair Type
  const calc = useMemo(() => {
    const H = stair.floorHeightMm;
    const R = Math.max(100, stair.riserMm);
    const T = Math.max(200, stair.treadMm);
    const W = stair.flightWidthMm;
    const L = stair.landingWidthMm;

    const totalRisers = Math.max(8, Math.round(H / R));
    const actualRiser = H / totalRisers;

    let risersFlight1 = Math.ceil(totalRisers / 2);
    let risersMid = 0;
    let risersFlight2 = totalRisers - risersFlight1;

    if (stair.type === 'open-well') {
      risersMid = Math.max(3, Math.min(5, Math.round(totalRisers * 0.22)));
      const rem = totalRisers - risersMid;
      risersFlight1 = Math.ceil(rem / 2);
      risersFlight2 = rem - risersFlight1;
    }

    const treadsFlight1 = Math.max(1, risersFlight1 - 1);
    const treadsMid = stair.type === 'open-well' ? Math.max(1, risersMid - 1) : 0;
    const treadsFlight2 = Math.max(1, risersFlight2 - 1);

    const goingFlight1 = treadsFlight1 * T;
    const goingMid = treadsMid * T;
    const goingFlight2 = treadsFlight2 * T;

    const wellGap = stair.type === 'open-well' ? Math.max(600, goingMid) : 100;

    let totalStaircaseLength = goingFlight1 + L;
    let totalStaircaseWidth = 2 * W + 100;

    if (stair.type === 'l-shaped') {
      totalStaircaseLength = goingFlight1 + W;
      totalStaircaseWidth = W + goingFlight2;
    } else if (stair.type === 'open-well') {
      totalStaircaseLength = Math.max(goingFlight1, goingFlight2) + L;
      totalStaircaseWidth = 2 * W + wellGap;
    }

    const comfortMetric = 2 * actualRiser + T;
    const comfortPass = comfortMetric >= 590 && comfortMetric <= 660;

    const pitchRad = Math.atan(actualRiser / T);
    const pitchDeg = (pitchRad * 180) / Math.PI;

    const midLandingHeight = risersFlight1 * actualRiser;
    const secondLandingHeight = (risersFlight1 + risersMid) * actualRiser;
    const headroomMm = Math.max(0, Math.round(H - stair.waistSlabMm - actualRiser * 2));
    const headroomPass = headroomMm >= 2100;

    return {
      totalRisers,
      actualRiser,
      risersFlight1,
      risersMid,
      risersFlight2,
      treadsFlight1,
      treadsMid,
      treadsFlight2,
      goingFlight1,
      goingMid,
      goingFlight2,
      wellGap,
      totalStaircaseLength,
      totalStaircaseWidth,
      comfortMetric,
      comfortPass,
      pitchDeg,
      headroomMm,
      headroomPass,
      midLandingHeight,
      secondLandingHeight,
    };
  }, [stair]);

  const handleUpdate = (updated: StaircaseConfig) => {
    onUpdateProject({ ...project, staircase: updated });
  };

  // True 3-Type 3D Three.js Staircase Model (Dog-Legged, L-Shaped 90°, Open-Well 3-Flight)
  useEffect(() => {
    if (viewMode !== '3d') return;
    const canvas = canvas3dRef.current;
    const container = container3dRef.current;
    if (!canvas || !container) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isDark ? 0x09090b : 0xf4f6f9);

    const centerX = calc.totalStaircaseLength / 2;
    const centerY = stair.floorHeightMm / 2;
    const centerZ = calc.totalStaircaseWidth / 2;

    const camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 10, 30000);
    camera.position.set(centerX + 3800, stair.floorHeightMm + 2600, centerZ + 4200);
    camera.lookAt(centerX, centerY, centerZ);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.set(centerX, centerY, centerZ);

    // Architectural Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.75 : 1.0);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xfffbeb, 1.35);
    dirLight.position.set(centerX + 4000, 7500, centerZ + 3500);
    dirLight.castShadow = true;
    scene.add(dirLight);
    const fillLight = new THREE.DirectionalLight(0xbae6fd, 0.5);
    fillLight.position.set(-3000, 3000, -3000);
    scene.add(fillLight);

    // Subtle Floor Reference Grid
    const gridHelper = new THREE.GridHelper(12000, 24, isDark ? 0x3f3f46 : 0x94a3b8, isDark ? 0x18181b : 0xe2e8f0);
    gridHelper.position.set(centerX, 0, centerZ);
    scene.add(gridHelper);

    const concreteMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x3f4756 : 0xdbe2ea,
      roughness: 0.65,
      metalness: 0.08,
    });
    const treadMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x52525b : 0xf8fafc,
      roughness: 0.35,
      metalness: 0.12,
    });
    const accentColor = new THREE.Color(accentHex);
    const handrailMat = new THREE.MeshStandardMaterial({
      color: accentColor,
      roughness: 0.25,
      metalness: 0.75,
    });
    const postMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0xa1a1aa : 0x475569,
      roughness: 0.3,
      metalness: 0.7,
    });

    const geoms: THREE.BufferGeometry[] = [];
    const addBox = (w: number, h: number, d: number, x: number, y: number, z: number, mat: THREE.Material) => {
      const g = new THREE.BoxGeometry(w, h, d);
      geoms.push(g);
      const m = new THREE.Mesh(g, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      m.receiveShadow = true;
      scene.add(m);
    };

    const addRailSegment = (p1: THREE.Vector3, p2: THREE.Vector3) => {
      const dir = new THREE.Vector3().subVectors(p2, p1);
      const len = dir.length();
      if (len < 10) return;
      const g = new THREE.CylinderGeometry(24, 24, len, 10);
      geoms.push(g);
      const m = new THREE.Mesh(g, handrailMat);
      m.position.copy(p1).add(p2).multiplyScalar(0.5);
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
      scene.add(m);

      // Vertical balusters at start & end
      [p1, p2].forEach((pt) => {
        const pg = new THREE.CylinderGeometry(16, 16, 900, 8);
        geoms.push(pg);
        const pm = new THREE.Mesh(pg, postMat);
        pm.position.set(pt.x, pt.y - 450, pt.z);
        scene.add(pm);
      });
    };

    const W = stair.flightWidthMm;
    const T = stair.treadMm;
    const R = calc.actualRiser;
    const L = stair.landingWidthMm;
    const slabT = stair.waistSlabMm;

    // Flight 1 (Always starts at X=0, Z=[0..W], ascending along +X)
    for (let i = 0; i < calc.risersFlight1; i++) {
      const stepTopY = (i + 1) * R;
      const blockH = Math.min(stepTopY, slabT + R);
      addBox(T, blockH, W, i * T + T / 2, stepTopY - blockH / 2, W / 2, concreteMat);
      addBox(T + 18, 28, W + 10, i * T + T / 2, stepTopY + 14, W / 2, treadMat);
    }
    addRailSegment(
      new THREE.Vector3(80, R + 900, W - 60),
      new THREE.Vector3(calc.goingFlight1, calc.midLandingHeight + 900, W - 60)
    );

    if (stair.type === 'dog-legged') {
      // Full-width Mid-Landing (180° U-turn)
      addBox(L, slabT, 2 * W + 100, calc.goingFlight1 + L / 2, calc.midLandingHeight - slabT / 2, W + 50, concreteMat);
      addBox(L, 28, 2 * W + 100, calc.goingFlight1 + L / 2, calc.midLandingHeight + 14, W + 50, treadMat);

      // Flight 2 (Returns parallel along -X at Z=[W+100 .. 2W+100])
      for (let i = 0; i < calc.risersFlight2; i++) {
        const stepTopY = calc.midLandingHeight + (i + 1) * R;
        const blockH = slabT + R;
        const sx = calc.goingFlight1 - (i * T + T / 2);
        const sz = W + 100 + W / 2;
        addBox(T, blockH, W, sx, stepTopY - blockH / 2, sz, concreteMat);
        addBox(T + 18, 28, W + 10, sx, stepTopY + 14, sz, treadMat);
      }
      addRailSegment(
        new THREE.Vector3(calc.goingFlight1, calc.midLandingHeight + 900, W + 160),
        new THREE.Vector3(80, stair.floorHeightMm + 900, W + 160)
      );
      addRailSegment(
        new THREE.Vector3(calc.goingFlight1, calc.midLandingHeight + 900, W - 60),
        new THREE.Vector3(calc.goingFlight1, calc.midLandingHeight + 900, W + 160)
      );
    } else if (stair.type === 'l-shaped') {
      // Square Corner Landing (W x W) at X=[goingFlight1 .. goingFlight1+W], Z=[0..W]
      addBox(W, slabT, W, calc.goingFlight1 + W / 2, calc.midLandingHeight - slabT / 2, W / 2, concreteMat);
      addBox(W, 28, W, calc.goingFlight1 + W / 2, calc.midLandingHeight + 14, W / 2, treadMat);

      // Flight 2 turns 90° along +Z at X=[goingFlight1 .. goingFlight1+W], Z=[W .. W+goingFlight2]
      for (let i = 0; i < calc.risersFlight2; i++) {
        const stepTopY = calc.midLandingHeight + (i + 1) * R;
        const blockH = slabT + R;
        const sx = calc.goingFlight1 + W / 2;
        const sz = W + i * T + T / 2;
        addBox(W, blockH, T, sx, stepTopY - blockH / 2, sz, concreteMat);
        addBox(W + 10, 28, T + 18, sx, stepTopY + 14, sz, treadMat);
      }
      // Inner 90° L-turn handrail
      addRailSegment(
        new THREE.Vector3(calc.goingFlight1 + 60, calc.midLandingHeight + 900, W),
        new THREE.Vector3(calc.goingFlight1 + 60, stair.floorHeightMm + 900, W + calc.goingFlight2)
      );
    } else {
      // Open-Well (3-Flight U-Shape with Central Open Atrium)
      const qL = L;
      // Quarter-Landing 1 at top of Flight 1
      addBox(qL, slabT, W, calc.goingFlight1 + qL / 2, calc.midLandingHeight - slabT / 2, W / 2, concreteMat);
      addBox(qL, 28, W, calc.goingFlight1 + qL / 2, calc.midLandingHeight + 14, W / 2, treadMat);

      // Middle Flight (ascending along +Z across the open well)
      for (let i = 0; i < calc.risersMid; i++) {
        const stepTopY = calc.midLandingHeight + (i + 1) * R;
        const blockH = slabT + R;
        const sx = calc.goingFlight1 + qL / 2;
        const sz = W + i * T + T / 2;
        addBox(qL, blockH, T, sx, stepTopY - blockH / 2, sz, concreteMat);
        addBox(qL + 10, 28, T + 18, sx, stepTopY + 14, sz, treadMat);
      }

      // Quarter-Landing 2 at end of Middle Flight
      const z2Start = W + calc.wellGap;
      addBox(qL, slabT, W, calc.goingFlight1 + qL / 2, calc.secondLandingHeight - slabT / 2, z2Start + W / 2, concreteMat);
      addBox(qL, 28, W, calc.goingFlight1 + qL / 2, calc.secondLandingHeight + 14, z2Start + W / 2, treadMat);

      // Flight 3 (Returns along -X on the far side of the open well)
      for (let i = 0; i < calc.risersFlight2; i++) {
        const stepTopY = calc.secondLandingHeight + (i + 1) * R;
        const blockH = slabT + R;
        const sx = calc.goingFlight1 - (i * T + T / 2);
        const sz = z2Start + W / 2;
        addBox(T, blockH, W, sx, stepTopY - blockH / 2, sz, concreteMat);
        addBox(T + 18, 28, W + 10, sx, stepTopY + 14, sz, treadMat);
      }

      // Open-Well Perimeter Handrails
      addRailSegment(
        new THREE.Vector3(calc.goingFlight1 + 60, calc.midLandingHeight + 900, W),
        new THREE.Vector3(calc.goingFlight1 + 60, calc.secondLandingHeight + 900, z2Start)
      );
      addRailSegment(
        new THREE.Vector3(calc.goingFlight1, calc.secondLandingHeight + 900, z2Start + 60),
        new THREE.Vector3(80, stair.floorHeightMm + 900, z2Start + 60)
      );
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
      concreteMat.dispose();
      treadMat.dispose();
      handrailMat.dispose();
      postMat.dispose();
      geoms.forEach((g) => g.dispose());
    };
  }, [viewMode, stair, calc, isDark, accentHex]);

  const planVbW = (calc.totalStaircaseLength + 1400) / zoom;
  const planVbH = (calc.totalStaircaseWidth + 1450) / zoom;
  const planVbX = calc.totalStaircaseLength / 2 - planVbW / 2;
  const planVbY = calc.totalStaircaseWidth / 2 - planVbH / 2;

  const secTotalX = calc.goingFlight1 + (stair.type === 'l-shaped' ? stair.flightWidthMm : stair.landingWidthMm);
  const secVbW = (secTotalX + 2100) / zoom;
  const secVbH = (stair.floorHeightMm + 1900) / zoom;
  const secVbX = secTotalX / 2 - secVbW / 2 + 250;
  const secVbY = 3200 - stair.floorHeightMm / 2 - secVbH / 2 - 150;

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

            <div className="px-2.5 py-1 rounded-full glass-pill text-[10px] font-mono uppercase tracking-wider font-bold">
              {stair.type === 'dog-legged'
                ? 'Dog-Legged (180°)'
                : stair.type === 'l-shaped'
                  ? 'L-Shaped (90° Turn)'
                  : 'Open-Well (3-Flight)'}
            </div>

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
          {/* 2D Plan View SVG — Distinct Geometry for Dog-Legged, L-Shaped, and Open-Well */}
          {viewMode === '2d' && (
            <svg
              viewBox={`${planVbX} ${planVbY} ${planVbW} ${planVbH}`}
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-full max-h-[82vh]"
            >
              {/* === TYPE A: DOG-LEGGED (180° U-TURN) === */}
              {stair.type === 'dog-legged' && (
                <g>
                  <rect
                    x="0"
                    y="0"
                    width={calc.totalStaircaseLength}
                    height={calc.totalStaircaseWidth}
                    fill={isDark ? '#141418' : '#ffffff'}
                    stroke={isDark ? '#e4e4e7' : '#0f172a'}
                    strokeWidth="55"
                  />
                  <rect x="0" y={stair.flightWidthMm} width={calc.goingFlight1} height="100" fill={isDark ? '#3f3f46' : '#64748b'} />

                  {Array.from({ length: calc.treadsFlight1 }).map((_, i) => {
                    const stepNum = i + 1;
                    const isHov = hoveredStep === stepNum;
                    return (
                      <g key={`dl-f1-${i}`} onMouseEnter={() => setHoveredStep(stepNum)} onMouseLeave={() => setHoveredStep(null)} className="cursor-pointer">
                        <rect x={i * stair.treadMm} y="0" width={stair.treadMm} height={stair.flightWidthMm} fill={isHov ? accentHex : 'transparent'} fillOpacity={isHov ? 0.2 : 0} />
                        <line x1={(i + 1) * stair.treadMm} y1="0" x2={(i + 1) * stair.treadMm} y2={stair.flightWidthMm} stroke={isDark ? '#e4e4e7' : '#0f172a'} strokeWidth="18" />
                        <text x={i * stair.treadMm + stair.treadMm / 2} y="135" fontSize="95" fontWeight="600" textAnchor="middle" fill={isDark ? '#a1a1aa' : '#475569'}>
                          {stepNum}
                        </text>
                      </g>
                    );
                  })}

                  <line x1="150" y1={stair.flightWidthMm * 0.56} x2={calc.goingFlight1 - 120} y2={stair.flightWidthMm * 0.56} stroke={accentHex} strokeWidth="26" />
                  <circle cx="150" cy={stair.flightWidthMm * 0.56} r="40" fill={accentHex} />
                  <polygon points={`${calc.goingFlight1 - 50},${stair.flightWidthMm * 0.56} ${calc.goingFlight1 - 165},${stair.flightWidthMm * 0.56 - 50} ${calc.goingFlight1 - 165},${stair.flightWidthMm * 0.56 + 50}`} fill={accentHex} />

                  <rect x={calc.goingFlight1} y="0" width={stair.landingWidthMm} height={calc.totalStaircaseWidth} fill={isDark ? '#232329' : '#e2e8f0'} stroke={isDark ? '#e4e4e7' : '#0f172a'} strokeWidth="26" />
                  <g transform={`translate(${calc.goingFlight1 + stair.landingWidthMm / 2}, ${calc.totalStaircaseWidth / 2}) rotate(-90)`}>
                    <text x="0" y="-45" fontSize="110" fontWeight="800" textAnchor="middle" fill={isDark ? '#f4f4f6' : '#0f172a'}>MID-LANDING</text>
                    <text x="0" y="95" fontSize="105" fontWeight="700" textAnchor="middle" fill={accentHex}>EL +{(calc.midLandingHeight / 1000).toFixed(2)} m</text>
                  </g>

                  {Array.from({ length: calc.treadsFlight2 }).map((_, i) => {
                    const stepNum = calc.risersFlight1 + i + 1;
                    const xLeft = calc.goingFlight1 - (i + 1) * stair.treadMm;
                    const isHov = hoveredStep === stepNum;
                    return (
                      <g key={`dl-f2-${i}`} onMouseEnter={() => setHoveredStep(stepNum)} onMouseLeave={() => setHoveredStep(null)} className="cursor-pointer">
                        <rect x={xLeft} y={stair.flightWidthMm + 100} width={stair.treadMm} height={stair.flightWidthMm} fill={isHov ? accentHex : 'transparent'} fillOpacity={isHov ? 0.2 : 0} />
                        <line x1={xLeft} y1={stair.flightWidthMm + 100} x2={xLeft} y2={calc.totalStaircaseWidth} stroke={isDark ? '#e4e4e7' : '#0f172a'} strokeWidth="18" />
                        <text x={xLeft + stair.treadMm / 2} y={calc.totalStaircaseWidth - 65} fontSize="95" fontWeight="600" textAnchor="middle" fill={isDark ? '#a1a1aa' : '#475569'}>
                          {stepNum}
                        </text>
                      </g>
                    );
                  })}

                  <line x1={calc.goingFlight1 - 120} y1={stair.flightWidthMm + 100 + stair.flightWidthMm * 0.44} x2="150" y2={stair.flightWidthMm + 100 + stair.flightWidthMm * 0.44} stroke={accentHex} strokeWidth="26" />
                  <polygon points={`65,${stair.flightWidthMm + 100 + stair.flightWidthMm * 0.44} 180,${stair.flightWidthMm + 100 + stair.flightWidthMm * 0.44 - 50} 180,${stair.flightWidthMm + 100 + stair.flightWidthMm * 0.44 + 50}`} fill={accentHex} />
                </g>
              )}

              {/* === TYPE B: L-SHAPED (90° QUARTER-TURN) === */}
              {stair.type === 'l-shaped' && (
                <g>
                  {/* L-Shaped Perimeter Shaft Wall */}
                  <path
                    d={`M 0 0 L ${calc.goingFlight1 + stair.flightWidthMm} 0 L ${calc.goingFlight1 + stair.flightWidthMm} ${stair.flightWidthMm + calc.goingFlight2} L ${calc.goingFlight1} ${stair.flightWidthMm + calc.goingFlight2} L ${calc.goingFlight1} ${stair.flightWidthMm} L 0 ${stair.flightWidthMm} Z`}
                    fill={isDark ? '#141418' : '#ffffff'}
                    stroke={isDark ? '#e4e4e7' : '#0f172a'}
                    strokeWidth="55"
                  />

                  {/* Flight 1 Steps (+X) */}
                  {Array.from({ length: calc.treadsFlight1 }).map((_, i) => {
                    const stepNum = i + 1;
                    const isHov = hoveredStep === stepNum;
                    return (
                      <g key={`ls-f1-${i}`} onMouseEnter={() => setHoveredStep(stepNum)} onMouseLeave={() => setHoveredStep(null)} className="cursor-pointer">
                        <rect x={i * stair.treadMm} y="0" width={stair.treadMm} height={stair.flightWidthMm} fill={isHov ? accentHex : 'transparent'} fillOpacity={isHov ? 0.2 : 0} />
                        <line x1={(i + 1) * stair.treadMm} y1="0" x2={(i + 1) * stair.treadMm} y2={stair.flightWidthMm} stroke={isDark ? '#e4e4e7' : '#0f172a'} strokeWidth="18" />
                        <text x={i * stair.treadMm + stair.treadMm / 2} y="140" fontSize="95" fontWeight="600" textAnchor="middle" fill={isDark ? '#a1a1aa' : '#475569'}>
                          {stepNum}
                        </text>
                      </g>
                    );
                  })}

                  {/* Square 90° Quarter-Turn Corner Landing */}
                  <rect
                    x={calc.goingFlight1}
                    y="0"
                    width={stair.flightWidthMm}
                    height={stair.flightWidthMm}
                    fill={isDark ? '#232329' : '#e2e8f0'}
                    stroke={isDark ? '#e4e4e7' : '#0f172a'}
                    strokeWidth="26"
                  />
                  <text x={calc.goingFlight1 + stair.flightWidthMm / 2} y={stair.flightWidthMm / 2 - 40} fontSize="105" fontWeight="800" textAnchor="middle" fill={isDark ? '#f4f4f6' : '#0f172a'}>
                    90° LANDING
                  </text>
                  <text x={calc.goingFlight1 + stair.flightWidthMm / 2} y={stair.flightWidthMm / 2 + 90} fontSize="95" fontWeight="700" textAnchor="middle" fill={accentHex}>
                    +{(calc.midLandingHeight / 1000).toFixed(2)} m
                  </text>

                  {/* Flight 2 Steps (+Y / 90° downward turn) */}
                  {Array.from({ length: calc.treadsFlight2 }).map((_, i) => {
                    const stepNum = calc.risersFlight1 + i + 1;
                    const yTop = stair.flightWidthMm + i * stair.treadMm;
                    const isHov = hoveredStep === stepNum;
                    return (
                      <g key={`ls-f2-${i}`} onMouseEnter={() => setHoveredStep(stepNum)} onMouseLeave={() => setHoveredStep(null)} className="cursor-pointer">
                        <rect x={calc.goingFlight1} y={yTop} width={stair.flightWidthMm} height={stair.treadMm} fill={isHov ? accentHex : 'transparent'} fillOpacity={isHov ? 0.2 : 0} />
                        <line x1={calc.goingFlight1} y1={yTop + stair.treadMm} x2={calc.goingFlight1 + stair.flightWidthMm} y2={yTop + stair.treadMm} stroke={isDark ? '#e4e4e7' : '#0f172a'} strokeWidth="18" />
                        <text x={calc.goingFlight1 + stair.flightWidthMm - 110} y={yTop + stair.treadMm / 2 + 30} fontSize="95" fontWeight="600" textAnchor="middle" fill={isDark ? '#a1a1aa' : '#475569'}>
                          {stepNum}
                        </text>
                      </g>
                    );
                  })}

                  {/* Continuous 90° Walkline Arrow */}
                  <polyline
                    points={`150,${stair.flightWidthMm / 2} ${calc.goingFlight1 + stair.flightWidthMm / 2},${stair.flightWidthMm / 2} ${calc.goingFlight1 + stair.flightWidthMm / 2},${stair.flightWidthMm + calc.goingFlight2 - 140}`}
                    fill="none"
                    stroke={accentHex}
                    strokeWidth="26"
                  />
                  <circle cx="150" cy={stair.flightWidthMm / 2} r="42" fill={accentHex} />
                  <polygon
                    points={`${calc.goingFlight1 + stair.flightWidthMm / 2},${stair.flightWidthMm + calc.goingFlight2 - 50} ${calc.goingFlight1 + stair.flightWidthMm / 2 - 55},${stair.flightWidthMm + calc.goingFlight2 - 175} ${calc.goingFlight1 + stair.flightWidthMm / 2 + 55},${stair.flightWidthMm + calc.goingFlight2 - 175}`}
                    fill={accentHex}
                  />
                </g>
              )}

              {/* === TYPE C: OPEN-WELL (3-FLIGHT U-SHAPE WITH OPEN ATRIUM) === */}
              {stair.type === 'open-well' && (
                <g>
                  <rect
                    x="0"
                    y="0"
                    width={calc.totalStaircaseLength}
                    height={calc.totalStaircaseWidth}
                    fill={isDark ? '#141418' : '#ffffff'}
                    stroke={isDark ? '#e4e4e7' : '#0f172a'}
                    strokeWidth="55"
                  />

                  {/* Central Open-Well Atrium Box */}
                  <rect
                    x="0"
                    y={stair.flightWidthMm}
                    width={calc.goingFlight1}
                    height={calc.wellGap}
                    fill={isDark ? '#09090b' : '#f1f5f9'}
                    stroke={accentHex}
                    strokeWidth="28"
                    strokeDasharray="70 40"
                  />
                  <line x1="0" y1={stair.flightWidthMm} x2={calc.goingFlight1} y2={stair.flightWidthMm + calc.wellGap} stroke={isDark ? '#3f3f46' : '#cbd5e1'} strokeWidth="14" strokeDasharray="50 30" />
                  <line x1={calc.goingFlight1} y1={stair.flightWidthMm} x2="0" y2={stair.flightWidthMm + calc.wellGap} stroke={isDark ? '#3f3f46' : '#cbd5e1'} strokeWidth="14" strokeDasharray="50 30" />
                  <text x={calc.goingFlight1 / 2} y={stair.flightWidthMm + calc.wellGap / 2 + 35} fontSize="125" fontWeight="800" textAnchor="middle" fill={accentHex}>
                    OPEN WELL ATRIUM
                  </text>

                  {/* Flight 1 (+X) */}
                  {Array.from({ length: calc.treadsFlight1 }).map((_, i) => {
                    const stepNum = i + 1;
                    const isHov = hoveredStep === stepNum;
                    return (
                      <g key={`ow-f1-${i}`} onMouseEnter={() => setHoveredStep(stepNum)} onMouseLeave={() => setHoveredStep(null)} className="cursor-pointer">
                        <rect x={i * stair.treadMm} y="0" width={stair.treadMm} height={stair.flightWidthMm} fill={isHov ? accentHex : 'transparent'} fillOpacity={isHov ? 0.2 : 0} />
                        <line x1={(i + 1) * stair.treadMm} y1="0" x2={(i + 1) * stair.treadMm} y2={stair.flightWidthMm} stroke={isDark ? '#e4e4e7' : '#0f172a'} strokeWidth="18" />
                        <text x={i * stair.treadMm + stair.treadMm / 2} y="140" fontSize="95" fontWeight="600" textAnchor="middle" fill={isDark ? '#a1a1aa' : '#475569'}>{stepNum}</text>
                      </g>
                    );
                  })}

                  {/* Quarter-Landing 1 */}
                  <rect x={calc.goingFlight1} y="0" width={stair.landingWidthMm} height={stair.flightWidthMm} fill={isDark ? '#232329' : '#e2e8f0'} stroke={isDark ? '#e4e4e7' : '#0f172a'} strokeWidth="24" />
                  <text x={calc.goingFlight1 + stair.landingWidthMm / 2} y={stair.flightWidthMm / 2 + 30} fontSize="95" fontWeight="800" textAnchor="middle" fill={accentHex}>L1 +{(calc.midLandingHeight / 1000).toFixed(2)}m</text>

                  {/* Middle Flight (Across Open Well along +Y) */}
                  {Array.from({ length: calc.treadsMid }).map((_, i) => {
                    const stepNum = calc.risersFlight1 + i + 1;
                    const yTop = stair.flightWidthMm + i * stair.treadMm;
                    const isHov = hoveredStep === stepNum;
                    return (
                      <g key={`ow-mid-${i}`} onMouseEnter={() => setHoveredStep(stepNum)} onMouseLeave={() => setHoveredStep(null)} className="cursor-pointer">
                        <rect x={calc.goingFlight1} y={yTop} width={stair.landingWidthMm} height={stair.treadMm} fill={isHov ? accentHex : 'transparent'} fillOpacity={isHov ? 0.2 : 0} />
                        <line x1={calc.goingFlight1} y1={yTop + stair.treadMm} x2={calc.totalStaircaseLength} y2={yTop + stair.treadMm} stroke={isDark ? '#e4e4e7' : '#0f172a'} strokeWidth="18" />
                        <text x={calc.totalStaircaseLength - 120} y={yTop + stair.treadMm / 2 + 30} fontSize="95" fontWeight="600" textAnchor="middle" fill={isDark ? '#a1a1aa' : '#475569'}>{stepNum}</text>
                      </g>
                    );
                  })}

                  {/* Quarter-Landing 2 */}
                  <rect x={calc.goingFlight1} y={stair.flightWidthMm + calc.wellGap} width={stair.landingWidthMm} height={stair.flightWidthMm} fill={isDark ? '#232329' : '#e2e8f0'} stroke={isDark ? '#e4e4e7' : '#0f172a'} strokeWidth="24" />
                  <text x={calc.goingFlight1 + stair.landingWidthMm / 2} y={stair.flightWidthMm + calc.wellGap + stair.flightWidthMm / 2 + 30} fontSize="95" fontWeight="800" textAnchor="middle" fill={accentHex}>L2 +{(calc.secondLandingHeight / 1000).toFixed(2)}m</text>

                  {/* Flight 3 (-X return) */}
                  {Array.from({ length: calc.treadsFlight2 }).map((_, i) => {
                    const stepNum = calc.risersFlight1 + calc.risersMid + i + 1;
                    const xLeft = calc.goingFlight1 - (i + 1) * stair.treadMm;
                    const yBase = stair.flightWidthMm + calc.wellGap;
                    const isHov = hoveredStep === stepNum;
                    return (
                      <g key={`ow-f3-${i}`} onMouseEnter={() => setHoveredStep(stepNum)} onMouseLeave={() => setHoveredStep(null)} className="cursor-pointer">
                        <rect x={xLeft} y={yBase} width={stair.treadMm} height={stair.flightWidthMm} fill={isHov ? accentHex : 'transparent'} fillOpacity={isHov ? 0.2 : 0} />
                        <line x1={xLeft} y1={yBase} x2={xLeft} y2={calc.totalStaircaseWidth} stroke={isDark ? '#e4e4e7' : '#0f172a'} strokeWidth="18" />
                        <text x={xLeft + stair.treadMm / 2} y={calc.totalStaircaseWidth - 65} fontSize="95" fontWeight="600" textAnchor="middle" fill={isDark ? '#a1a1aa' : '#475569'}>{stepNum}</text>
                      </g>
                    );
                  })}

                  {/* 3-Flight Walkline Polyline */}
                  <polyline
                    points={`150,${stair.flightWidthMm / 2} ${calc.goingFlight1 + stair.landingWidthMm / 2},${stair.flightWidthMm / 2} ${calc.goingFlight1 + stair.landingWidthMm / 2},${stair.flightWidthMm + calc.wellGap + stair.flightWidthMm / 2} 150,${stair.flightWidthMm + calc.wellGap + stair.flightWidthMm / 2}`}
                    fill="none"
                    stroke={accentHex}
                    strokeWidth="26"
                  />
                  <circle cx="150" cy={stair.flightWidthMm / 2} r="42" fill={accentHex} />
                  <polygon
                    points={`65,${stair.flightWidthMm + calc.wellGap + stair.flightWidthMm / 2} 185,${stair.flightWidthMm + calc.wellGap + stair.flightWidthMm / 2 - 52} 185,${stair.flightWidthMm + calc.wellGap + stair.flightWidthMm / 2 + 52}`}
                    fill={accentHex}
                  />
                </g>
              )}

              {/* Overall Bottom Dimension Chain */}
              <g fill={isDark ? '#cbd5e1' : '#334155'} stroke="#64748b" strokeWidth="14">
                <line x1="0" y1={calc.totalStaircaseWidth + 240} x2={calc.totalStaircaseLength} y2={calc.totalStaircaseWidth + 240} />
                <line x1="0" y1={calc.totalStaircaseWidth + 160} x2="0" y2={calc.totalStaircaseWidth + 300} />
                <line x1={calc.totalStaircaseLength} y1={calc.totalStaircaseWidth + 160} x2={calc.totalStaircaseLength} y2={calc.totalStaircaseWidth + 300} />
                <text x={calc.totalStaircaseLength / 2} y={calc.totalStaircaseWidth + 390} fontSize="110" fontWeight="800" textAnchor="middle" stroke="none">
                  SHAFT FOOTPRINT: {(calc.totalStaircaseLength / 1000).toFixed(2)} m × {(calc.totalStaircaseWidth / 1000).toFixed(2)} m
                </text>
              </g>
            </svg>
          )}

          {/* Longitudinal Vertical Section SVG */}
          {viewMode === 'section' && (
            <svg
              viewBox={`${secVbX} ${secVbY} ${secVbW} ${secVbH}`}
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-full max-h-[82vh]"
            >
              <rect x="-350" y="3200" width={secTotalX + 900} height="160" fill={isDark ? '#27272a' : '#cbd5e1'} stroke={isDark ? '#e4e4e7' : '#0f172a'} strokeWidth="22" />
              <text x="-300" y="3490" fontSize="110" fill={isDark ? '#94a3b8' : '#334155'} fontWeight="700">
                FINISHED FLOOR LEVEL (FFL ±0.00 m)
              </text>

              <rect x="-350" y={3200 - stair.floorHeightMm} width="450" height={stair.waistSlabMm} fill={isDark ? '#27272a' : '#cbd5e1'} stroke={isDark ? '#e4e4e7' : '#0f172a'} strokeWidth="22" />

              {/* Flight 1 Inclined Waist Slab + Landing */}
              <polygon
                points={`0,3200 ${calc.goingFlight1},${3200 - calc.midLandingHeight} ${secTotalX},${3200 - calc.midLandingHeight} ${secTotalX},${3200 - calc.midLandingHeight + stair.waistSlabMm} ${calc.goingFlight1},${3200 - calc.midLandingHeight + stair.waistSlabMm} 0,${3200 + stair.waistSlabMm}`}
                fill={isDark ? 'rgba(56, 189, 248, 0.16)' : 'rgba(2, 132, 199, 0.14)'}
                stroke={accentHex}
                strokeWidth="24"
              />

              {Array.from({ length: calc.risersFlight1 }).map((_, i) => (
                <path
                  key={`sec-f1-${i}`}
                  d={`M ${i * stair.treadMm} ${3200 - i * calc.actualRiser} L ${i * stair.treadMm} ${3200 - (i + 1) * calc.actualRiser} L ${(i + 1) * stair.treadMm} ${3200 - (i + 1) * calc.actualRiser}`}
                  fill="none"
                  stroke={isDark ? '#f4f4f6' : '#0f172a'}
                  strokeWidth="28"
                />
              ))}

              {/* Upper Flight Representation (varies by type) */}
              {stair.type === 'l-shaped' ? (
                <g>
                  {/* 90-deg Flight 2 seen in front elevation rising from corner landing */}
                  {Array.from({ length: calc.risersFlight2 }).map((_, i) => (
                    <rect
                      key={`sec-ls-f2-${i}`}
                      x={calc.goingFlight1}
                      y={3200 - calc.midLandingHeight - (i + 1) * calc.actualRiser}
                      width={stair.flightWidthMm}
                      height={calc.actualRiser}
                      fill={isDark ? 'rgba(148,163,184,0.12)' : 'rgba(100,116,139,0.12)'}
                      stroke={isDark ? '#94a3b8' : '#475569'}
                      strokeWidth="18"
                    />
                  ))}
                  <text x={calc.goingFlight1 + stair.flightWidthMm / 2} y={3200 - calc.midLandingHeight - (stair.floorHeightMm - calc.midLandingHeight) / 2} fontSize="95" fontWeight="700" textAnchor="middle" fill={accentHex}>
                    FLIGHT 2 (90° TURN)
                  </text>
                </g>
              ) : (
                <g>
                  <polygon
                    points={`${calc.goingFlight1},${3200 - (stair.type === 'open-well' ? calc.secondLandingHeight : calc.midLandingHeight)} 0,${3200 - stair.floorHeightMm} 0,${3200 - stair.floorHeightMm + stair.waistSlabMm} ${calc.goingFlight1},${3200 - (stair.type === 'open-well' ? calc.secondLandingHeight : calc.midLandingHeight) + stair.waistSlabMm}`}
                    fill={isDark ? 'rgba(161, 161, 170, 0.12)' : 'rgba(100, 116, 139, 0.12)'}
                    stroke={isDark ? '#94a3b8' : '#475569'}
                    strokeWidth="20"
                    strokeDasharray="60 30"
                  />
                  {Array.from({ length: calc.risersFlight2 }).map((_, i) => {
                    const baseH = stair.type === 'open-well' ? calc.secondLandingHeight : calc.midLandingHeight;
                    return (
                      <path
                        key={`sec-f2-${i}`}
                        d={`M ${calc.goingFlight1 - i * stair.treadMm} ${3200 - baseH - i * calc.actualRiser} L ${calc.goingFlight1 - i * stair.treadMm} ${3200 - baseH - (i + 1) * calc.actualRiser} L ${calc.goingFlight1 - (i + 1) * stair.treadMm} ${3200 - baseH - (i + 1) * calc.actualRiser}`}
                        fill="none"
                        stroke={isDark ? '#94a3b8' : '#64748b'}
                        strokeWidth="20"
                        strokeDasharray="45 25"
                      />
                    );
                  })}
                </g>
              )}

              {/* Handrails */}
              <line x1="0" y1={3200 - 900} x2={calc.goingFlight1} y2={3200 - calc.midLandingHeight - 900} stroke="#f59e0b" strokeWidth="28" />
              <line x1={calc.goingFlight1} y1={3200 - calc.midLandingHeight - 900} x2={secTotalX} y2={3200 - calc.midLandingHeight - 900} stroke="#f59e0b" strokeWidth="28" />

              <line x1={secTotalX} y1={3200 - calc.midLandingHeight} x2={secTotalX + 900} y2={3200 - calc.midLandingHeight} stroke={accentHex} strokeWidth="18" strokeDasharray="45 25" />
              <text x={secTotalX + 80} y={3200 - calc.midLandingHeight - 40} fontSize="105" fontWeight="800" fill={accentHex}>
                LANDING 1 (+{(calc.midLandingHeight / 1000).toFixed(2)} m)
              </text>

              <line x1="0" y1={3200 - stair.floorHeightMm} x2={secTotalX + 900} y2={3200 - stair.floorHeightMm} stroke="#ef4444" strokeWidth="18" strokeDasharray="45 25" />
              <text x={secTotalX + 80} y={3200 - stair.floorHeightMm - 40} fontSize="105" fontWeight="800" fill="#ef4444">
                UPPER FLOOR (+{(stair.floorHeightMm / 1000).toFixed(2)} m)
              </text>
            </svg>
          )}

          {/* 3D Canvas */}
          {viewMode === '3d' && (
            <div ref={container3dRef} className="w-full h-full relative">
              <canvas ref={canvas3dRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
              <div className="absolute bottom-3 left-4 px-3 py-1 rounded-full glass-pill text-[10px] font-mono opacity-80 pointer-events-none">
                Drag to orbit • Scroll to zoom • {stair.type.toUpperCase()} 3D Model
              </div>
            </div>
          )}
        </div>
      </div>

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
              <span className="font-bold">{calc.totalRisers} nos. ({stair.type === 'open-well' ? `${calc.risersFlight1} + ${calc.risersMid} + ${calc.risersFlight2}` : `${calc.risersFlight1} + ${calc.risersFlight2}`})</span>
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