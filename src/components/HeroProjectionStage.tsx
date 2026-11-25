import React, { useEffect, useRef, useState } from 'react';
import { Eye, RotateCcw, ScanLine } from 'lucide-react';
import { SolidType } from '../types';

export type HeroSolidKey = 'stepped-t-block' | 'slotted-cylinder-bracket' | 'hex-prism';

interface HeroProjectionStageProps {
  accentHex: string;
  accentGlow: string;
  onPlayClick?: () => void;
  onLaunchSolid?: (type: SolidType) => void;
}

const SOLID_OPTIONS: { key: HeroSolidKey; label: string; solidType: SolidType; dims: string }[] = [
  { key: 'stepped-t-block', label: 'Stepped T-Block', solidType: 'stepped-t-block', dims: '40 × 50 × 30 mm • R10 Groove' },
  { key: 'slotted-cylinder-bracket', label: 'Slotted Cylinder', solidType: 'slotted-cylinder-bracket', dims: '140 × 50 × 50 mm • Ø40×24' },
  { key: 'hex-prism', label: 'Hex Prism', solidType: 'hexagonal-prism', dims: '40 × 40 × 70 mm • 6 Faces' },
];

type Vec3 = [number, number, number];
interface EdgeDef {
  a: Vec3;
  b: Vec3;
  hidden?: boolean;
  accent?: boolean;
}

function getSolidEdges(key: HeroSolidKey): EdgeDef[] {
  const edges: EdgeDef[] = [];
  const addBox = (cx: number, cy: number, cz: number, dx: number, dy: number, dz: number, hidden = false, accent = false) => {
    const x0 = cx - dx / 2, x1 = cx + dx / 2;
    const y0 = cy - dy / 2, y1 = cy + dy / 2;
    const z0 = cz - dz / 2, z1 = cz + dz / 2;
    const v: Vec3[] = [
      [x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
      [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1],
    ];
    const pairs = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
    ];
    for (const [i, j] of pairs) {
      edges.push({ a: v[i], b: v[j], hidden, accent });
    }
  };

  const addRing = (cx: number, cy: number, cz: number, r: number, segs: number, hidden = false, accent = false) => {
    for (let i = 0; i < segs; i++) {
      const t0 = (i / segs) * Math.PI * 2;
      const t1 = ((i + 1) / segs) * Math.PI * 2;
      edges.push({
        a: [cx + r * Math.cos(t0), cy, cz + r * Math.sin(t0)],
        b: [cx + r * Math.cos(t1), cy, cz + r * Math.sin(t1)],
        hidden,
        accent,
      });
    }
  };

  if (key === 'stepped-t-block') {
    // Base tongue + tall rear wall + internal R10 groove hidden bore
    addBox(0, -0.35, 0.2, 0.9, 0.35, 0.95);
    addBox(0, 0.15, -0.25, 1.35, 0.85, 0.45);
    // R10 semi-cylindrical rear groove (hidden/accent)
    addRing(0, 0.56, -0.45, 0.28, 16, true, true);
    addRing(0, -0.25, -0.45, 0.28, 16, true, true);
    edges.push({ a: [-0.28, -0.25, -0.45], b: [-0.28, 0.56, -0.45], hidden: true, accent: true });
    edges.push({ a: [0.28, -0.25, -0.45], b: [0.28, 0.56, -0.45], hidden: true, accent: true });
  } else if (key === 'slotted-cylinder-bracket') {
    // Forked base plate
    addBox(0, -0.42, 0, 1.65, 0.24, 0.75);
    // Central Ø64 cylindrical boss
    addRing(0, 0.55, 0, 0.46, 20, false, true);
    addRing(0, -0.3, 0, 0.46, 20, false, false);
    for (let k = 0; k < 4; k++) {
      const ang = (k / 4) * Math.PI * 2 + Math.PI / 4;
      edges.push({
        a: [0.46 * Math.cos(ang), -0.3, 0.46 * Math.sin(ang)],
        b: [0.46 * Math.cos(ang), 0.55, 0.46 * Math.sin(ang)],
      });
    }
    // Internal Ø40 x 24 blind hole (hidden)
    addRing(0, 0.55, 0, 0.26, 16, true, true);
    addRing(0, 0.08, 0, 0.26, 16, true, true);
    edges.push({ a: [-0.26, 0.08, 0], b: [-0.26, 0.55, 0], hidden: true, accent: true });
    edges.push({ a: [0.26, 0.08, 0], b: [0.26, 0.55, 0], hidden: true, accent: true });
  } else {
    // Hexagonal prism + internal axial hole
    const r = 0.62;
    const h = 0.65;
    for (let i = 0; i < 6; i++) {
      const t0 = (i / 6) * Math.PI * 2;
      const t1 = ((i + 1) / 6) * Math.PI * 2;
      const x0 = r * Math.cos(t0), z0 = r * Math.sin(t0);
      const x1 = r * Math.cos(t1), z1 = r * Math.sin(t1);
      edges.push({ a: [x0, h, z0], b: [x1, h, z1], accent: true });
      edges.push({ a: [x0, -h, z0], b: [x1, -h, z1] });
      edges.push({ a: [x0, -h, z0], b: [x0, h, z0] });
    }
    addRing(0, h, 0, 0.25, 16, true, true);
    addRing(0, -h, 0, 0.25, 16, true, true);
    edges.push({ a: [0, -h * 1.15, 0], b: [0, h * 1.15, 0], hidden: true, accent: true });
  }
  return edges;
}

export const HeroProjectionStage: React.FC<HeroProjectionStageProps> = ({
  accentHex,
  accentGlow,
  onPlayClick,
  onLaunchSolid,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [solidKey, setSolidKey] = useState<HeroSolidKey>('stepped-t-block');
  const [unfold, setUnfold] = useState<number>(38);
  const [xrayActive, setXrayActive] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [angleHud, setAngleHud] = useState({ pitch: 35, yaw: 45 });

  const stateRef = useRef({
    yaw: (45 * Math.PI) / 180,
    pitch: (35.264 * Math.PI) / 180,
    vyaw: 0,
    vpitch: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
    lastInteract: 0,
    pointerX: 0.5,
    pointerY: 0.5,
    unfold: 0.38,
    xray: false,
    solidKey: 'stepped-t-block' as HeroSolidKey,
    accentHex,
    accentGlow,
    mountTime: performance.now(),
  });

  useEffect(() => {
    stateRef.current.unfold = unfold / 100;
  }, [unfold]);

  useEffect(() => {
    stateRef.current.xray = xrayActive;
  }, [xrayActive]);

  useEffect(() => {
    stateRef.current.solidKey = solidKey;
    stateRef.current.mountTime = performance.now();
  }, [solidKey]);

  useEffect(() => {
    stateRef.current.accentHex = accentHex;
    stateRef.current.accentGlow = accentGlow;
  }, [accentHex, accentGlow]);

  const resetIso = () => {
    onPlayClick?.();
    stateRef.current.yaw = (45 * Math.PI) / 180;
    stateRef.current.pitch = (35.264 * Math.PI) / 180;
    stateRef.current.vyaw = 0;
    stateRef.current.vpitch = 0;
    stateRef.current.lastInteract = performance.now();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let lastHud = 0;

    const proj = (v: Vec3, yaw: number, pitch: number, cx: number, cy: number, scale: number) => {
      const cyw = Math.cos(yaw), syw = Math.sin(yaw);
      const cph = Math.cos(pitch), sph = Math.sin(pitch);
      const x1 = v[0] * cyw - v[2] * syw;
      const z1 = v[0] * syw + v[2] * cyw;
      const y2 = v[1] * cph - z1 * sph;
      const z2 = v[1] * sph + z1 * cph;
      const p = 3.8 / (3.8 - z2 * 0.55);
      return { x: cx + x1 * scale * p, y: cy - y2 * scale * p, z: z2 };
    };

    const draw = (now: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(240, Math.floor(rect.width));
      const h = Math.max(240, Math.floor(rect.height));
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const s = stateRef.current;
      if (!s.dragging) {
        s.yaw += s.vyaw;
        s.pitch += s.vpitch;
        s.vyaw *= 0.93;
        s.vpitch *= 0.93;
        if (Math.abs(s.vyaw) < 0.0005 && now - s.lastInteract > 2400) {
          s.yaw += 0.004;
        }
      }
      const maxP = (78 * Math.PI) / 180;
      s.pitch = Math.max(-maxP, Math.min(maxP, s.pitch));

      const cx = w * 0.5;
      const cy = h * 0.5;
      const scale = Math.min(w, h) * 0.24;
      const edges = getSolidEdges(s.solidKey);
      const drawProgress = Math.min(1, (now - s.mountTime) / 950);

      // Ambient accent glow
      const glow = ctx.createRadialGradient(cx, cy, scale * 0.2, cx, cy, scale * 2.2);
      glow.addColorStop(0, s.accentGlow);
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, scale * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Draw translucent VP (back Z=-1.15) & HP (bottom Y=-0.95) planes unfolding
      const u = s.unfold;
      const planePush = 0.85 + u * 0.55;
      const drawPlane = (pts: Vec3[], fill: string, stroke: string, label: string) => {
        const pp = pts.map((pt) => proj(pt, s.yaw, s.pitch, cx, cy, scale));
        ctx.beginPath();
        ctx.moveTo(pp[0].x, pp[0].y);
        for (let i = 1; i < pp.length; i++) ctx.lineTo(pp[i].x, pp[i].y);
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = stroke;
        ctx.font = '600 9px ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.fillText(label, pp[0].x + 6, pp[0].y + 12);
      };

      if (u > 0.04) {
        // Vertical Plane (Front View projection plane)
        drawPlane(
          [
            [-1.35, 1.05, -planePush],
            [1.35, 1.05, -planePush],
            [1.35, -0.95, -planePush],
            [-1.35, -0.95, -planePush],
          ],
          'rgba(255,255,255,0.035)',
          s.accentHex + '66',
          'VP (FV)'
        );
        // Horizontal Plane (Top View projection plane)
        drawPlane(
          [
            [-1.35, -planePush * 0.85, -1.15],
            [1.35, -planePush * 0.85, -1.15],
            [1.35, -planePush * 0.85, 1.15],
            [-1.35, -planePush * 0.85, 1.15],
          ],
          'rgba(255,255,255,0.025)',
          'rgba(255,255,255,0.28)',
          'HP (TV)'
        );

        // Draw flattened Front View projection on VP and Top View on HP
        const visibleCount = Math.floor(edges.length * drawProgress);
        for (let i = 0; i < visibleCount; i++) {
          const e = edges[i];
          // Front view projected onto Z = -planePush
          const fvA = proj([e.a[0], e.a[1], -planePush], s.yaw, s.pitch, cx, cy, scale);
          const fvB = proj([e.b[0], e.b[1], -planePush], s.yaw, s.pitch, cx, cy, scale);
          ctx.beginPath();
          ctx.moveTo(fvA.x, fvA.y);
          ctx.lineTo(fvB.x, fvB.y);
          ctx.setLineDash(e.hidden ? [3, 3] : []);
          ctx.strokeStyle = e.hidden ? s.accentHex + '77' : s.accentHex + 'cc';
          ctx.lineWidth = 1.05;
          ctx.stroke();

          // Top view projected onto Y = -planePush * 0.85
          const tvA = proj([e.a[0], -planePush * 0.85, e.a[2]], s.yaw, s.pitch, cx, cy, scale);
          const tvB = proj([e.b[0], -planePush * 0.85, e.b[2]], s.yaw, s.pitch, cx, cy, scale);
          ctx.beginPath();
          ctx.moveTo(tvA.x, tvA.y);
          ctx.lineTo(tvB.x, tvB.y);
          ctx.setLineDash(e.hidden ? [3, 3] : []);
          ctx.strokeStyle = e.hidden ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.62)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Subtle projection rays from key corners when unfolded > 25%
        if (u > 0.25) {
          ctx.setLineDash([2, 4]);
          ctx.strokeStyle = 'rgba(255,255,255,0.18)';
          ctx.lineWidth = 0.75;
          for (let i = 0; i < Math.min(6, edges.length); i += 2) {
            const pt = edges[i].a;
            const p3d = proj(pt, s.yaw, s.pitch, cx, cy, scale);
            const pfv = proj([pt[0], pt[1], -planePush], s.yaw, s.pitch, cx, cy, scale);
            const ptv = proj([pt[0], -planePush * 0.85, pt[2]], s.yaw, s.pitch, cx, cy, scale);
            ctx.beginPath();
            ctx.moveTo(p3d.x, p3d.y);
            ctx.lineTo(pfv.x, pfv.y);
            ctx.moveTo(p3d.x, p3d.y);
            ctx.lineTo(ptv.x, ptv.y);
            ctx.stroke();
          }
        }
        ctx.setLineDash([]);
      }

      // Draw main 3D solid edges (plotter entrance)
      const count = Math.max(1, Math.floor(edges.length * drawProgress));
      const loupeX = s.pointerX * w;
      const loupeY = s.pointerY * h;
      const loupeR = 62;

      for (let i = 0; i < count; i++) {
        const e = edges[i];
        const pa = proj(e.a, s.yaw, s.pitch, cx, cy, scale);
        const pb = proj(e.b, s.yaw, s.pitch, cx, cy, scale);
        const midX = (pa.x + pb.x) * 0.5;
        const midY = (pa.y + pb.y) * 0.5;
        const insideLoupe = s.xray && Math.hypot(midX - loupeX, midY - loupeY) <= loupeR;

        if (e.hidden && !s.xray && u < 0.15) continue;

        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        if (e.hidden) {
          ctx.setLineDash([4, 3]);
          ctx.strokeStyle = insideLoupe ? '#38bdf8' : s.accentHex + 'aa';
          ctx.lineWidth = insideLoupe ? 1.85 : 1.1;
        } else {
          ctx.setLineDash([]);
          ctx.strokeStyle = insideLoupe
            ? 'rgba(255,255,255,0.28)'
            : e.accent
              ? s.accentHex
              : 'rgba(255,255,255,0.9)';
          ctx.lineWidth = e.accent ? 1.7 : 1.35;
        }
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Draw Blueprint X-Ray Loupe overlay when active
      if (s.xray) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(loupeX, loupeY, loupeR, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.10)';
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Crosshair inside loupe
        ctx.beginPath();
        ctx.moveTo(loupeX - 10, loupeY);
        ctx.lineTo(loupeX + 10, loupeY);
        ctx.moveTo(loupeX, loupeY - 10);
        ctx.lineTo(loupeX, loupeY + 10);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.lineWidth = 0.9;
        ctx.stroke();

        ctx.fillStyle = '#38bdf8';
        ctx.font = '700 8px ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.fillText('X-RAY HIDDEN LINES', loupeX - 42, loupeY - loupeR - 6);
        ctx.restore();
      }

      if (now - lastHud > 75) {
        lastHud = now;
        const pDeg = Math.round((s.pitch * 180) / Math.PI);
        const yDeg = (((Math.round((s.yaw * 180) / Math.PI) % 360) + 360) % 360);
        setAngleHud((prev) => (prev.pitch === pDeg && prev.yaw === yDeg ? prev : { pitch: pDeg, yaw: yDeg }));
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const activeSolidMeta = SOLID_OPTIONS.find((s) => s.key === solidKey) || SOLID_OPTIONS[0];

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = e.currentTarget.getBoundingClientRect();
    const s = stateRef.current;
    s.pointerX = (e.clientX - rect.left) / rect.width;
    s.pointerY = (e.clientY - rect.top) / rect.height;
    if (!s.xray) {
      s.dragging = true;
      s.vyaw = 0;
      s.vpitch = 0;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
      setIsDragging(true);
    }
    s.lastInteract = performance.now();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const s = stateRef.current;
    s.pointerX = Math.max(0.08, Math.min(0.92, (e.clientX - rect.left) / rect.width));
    s.pointerY = Math.max(0.08, Math.min(0.92, (e.clientY - rect.top) / rect.height));
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    const dy = e.clientY - s.lastY;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    s.yaw += dx * 0.011;
    s.pitch += dy * 0.011;
    s.vyaw = dx * 0.007;
    s.vpitch = dy * 0.007;
    s.lastInteract = performance.now();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    stateRef.current.dragging = false;
    setIsDragging(false);
  };

  return (
    <div className="rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-xl p-4 sm:p-5 flex flex-col justify-between space-y-3 relative overflow-hidden">
      {/* Top Bar: 3-Tap Mini Solid Switcher + X-Ray Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1 p-0.5 rounded-full bg-white/[0.07] border border-white/10">
          {SOLID_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => {
                onPlayClick?.();
                setSolidKey(opt.key);
              }}
              className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all cursor-pointer ${
                solidKey === opt.key ? 'bg-white text-black shadow-sm' : 'text-white/70 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            onPlayClick?.();
            setXrayActive((prev) => !prev);
          }}
          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 border transition-all cursor-pointer ${
            xrayActive
              ? 'bg-sky-400/20 border-sky-400/60 text-sky-300'
              : 'bg-white/[0.06] border-white/15 text-white/75 hover:text-white'
          }`}
          title="Toggle Blueprint X-Ray Loupe to inspect internal hidden lines"
        >
          <Eye className="w-3 h-3" />
          <span>{xrayActive ? 'X-Ray ON' : 'X-Ray Loupe'}</span>
        </button>
      </div>

      {/* Live 3D Projection Unfold Canvas */}
      <div className="relative w-full h-64 sm:h-72 rounded-2xl bg-black/40 border border-white/10 overflow-hidden">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onDoubleClick={resetIso}
          className={`w-full h-full touch-none select-none ${
            xrayActive ? 'cursor-crosshair' : isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        />

        {/* Corner HUD Badges */}
        <div className="absolute top-2.5 left-3 flex items-center gap-1.5 pointer-events-none">
          <span className="px-2 py-0.5 rounded-full bg-black/60 border border-white/15 text-[9px] font-mono text-white/80 tabular-nums">
            α {angleHud.pitch}° • β {angleHud.yaw}°
          </span>
        </div>

        <button
          type="button"
          onClick={resetIso}
          title="Reset to True Isometric"
          className="absolute top-2.5 right-3 px-2 py-0.5 rounded-full bg-black/60 hover:bg-white/15 border border-white/15 text-[9px] font-mono text-white/75 flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-2.5 h-2.5" />
          <span>ISO</span>
        </button>

        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] text-white/60 pointer-events-none">
          <span className="truncate">{activeSolidMeta.dims}</span>
          <span className="shrink-0 font-mono">
            {xrayActive ? 'Move lens over solid' : 'Drag to orbit'}
          </span>
        </div>
      </div>

      {/* Interactive Unfold Planes Slider + Open in Studio */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5 text-white/80 font-medium">
            <ScanLine className="w-3.5 h-3.5" style={{ color: accentHex }} />
            Unfold VP / HP Projection Planes
          </span>
          <span className="font-mono text-white/70 tabular-nums">{unfold}%</span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={100}
            value={unfold}
            onChange={(e) => setUnfold(Number(e.target.value))}
            className="flex-1 h-1.5 rounded-lg cursor-pointer"
          />
          {onLaunchSolid && (
            <button
              type="button"
              onClick={() => {
                onPlayClick?.();
                onLaunchSolid(activeSolidMeta.solidType);
              }}
              className="px-3 py-1 rounded-full bg-white text-black hover:bg-zinc-200 text-[10px] font-semibold shrink-0 cursor-pointer transition-colors"
            >
              Open Part
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
