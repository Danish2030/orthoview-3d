import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';

export type OrbViewMode = 'wireframe' | 'solid' | 'planes';

interface InteractiveOrbProps {
  accentHex: string;
  accentGlow: string;
  solidLabel: string;
}

const ISO_PITCH = 35.264;
const ISO_YAW = 45;

export const InteractiveOrb: React.FC<InteractiveOrbProps> = ({
  accentHex,
  accentGlow,
  solidLabel,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hudRef = useRef<HTMLSpanElement | null>(null);
  const [viewMode, setViewMode] = useState<OrbViewMode>('wireframe');
  const [isDragging, setIsDragging] = useState(false);

  const stateRef = useRef({
    yaw: (ISO_YAW * Math.PI) / 180,
    pitch: (ISO_PITCH * Math.PI) / 180,
    vyaw: 0,
    vpitch: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
    lastInteraction: 0,
    snapTarget: null as { yaw: number; pitch: number } | null,
    mode: 'wireframe' as OrbViewMode,
    accentHex,
    accentGlow,
    width: 240,
    height: 180,
    visible: true,
  });

  useEffect(() => {
    stateRef.current.mode = viewMode;
  }, [viewMode]);

  useEffect(() => {
    stateRef.current.accentHex = accentHex;
    stateRef.current.accentGlow = accentGlow;
  }, [accentHex, accentGlow]);

  const snapToIsometric = () => {
    stateRef.current.vyaw = 0;
    stateRef.current.vpitch = 0;
    stateRef.current.snapTarget = {
      yaw: (ISO_YAW * Math.PI) / 180,
      pitch: (ISO_PITCH * Math.PI) / 180,
    };
    stateRef.current.lastInteraction = performance.now();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const s = stateRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 2);

    const syncSize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(180, Math.floor(rect.width));
      const h = Math.max(160, Math.floor(rect.height));
      s.width = w;
      s.height = h;
      const bw = Math.floor(w * dpr);
      const bh = Math.floor(h * dpr);
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
    };
    syncSize();

    const ro = new ResizeObserver(syncSize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        s.visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    let rafId = 0;
    let lastTime = performance.now();
    let lastHudText = '';

    const project = (x: number, y: number, z: number, yaw: number, pitch: number, cx: number, cy: number, radius: number) => {
      const cyaw = Math.cos(yaw);
      const syaw = Math.sin(yaw);
      const cpitch = Math.cos(pitch);
      const spitch = Math.sin(pitch);

      const x1 = x * cyaw - z * syaw;
      const z1 = x * syaw + z * cyaw;
      const y2 = y * cpitch - z1 * spitch;
      const z2 = y * spitch + z1 * cpitch;

      const persp = 3.2 / (3.2 - z2 * 0.65);
      return {
        sx: cx + x1 * radius * persp,
        sy: cy - y2 * radius * persp,
        z: z2,
      };
    };

    const drawRing3D = (
      points: [number, number, number][],
      yaw: number,
      pitch: number,
      cx: number,
      cy: number,
      radius: number,
      frontStroke: string,
      backStroke: string,
      lineWidth: number,
      dashedBack: boolean
    ) => {
      const projected = points.map(([x, y, z]) => project(x, y, z, yaw, pitch, cx, cy, radius));
      for (let i = 0; i < projected.length - 1; i++) {
        const a = projected[i];
        const b = projected[i + 1];
        const avgZ = (a.z + b.z) * 0.5;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        if (avgZ >= 0) {
          ctx.setLineDash([]);
          ctx.strokeStyle = frontStroke;
          ctx.lineWidth = lineWidth;
        } else {
          ctx.setLineDash(dashedBack ? [3, 3] : []);
          ctx.strokeStyle = backStroke;
          ctx.lineWidth = Math.max(0.7, lineWidth * 0.72);
        }
        ctx.stroke();
      }
      ctx.setLineDash([]);
    };

    const render = (now: number) => {
      rafId = requestAnimationFrame(render);
      if (!s.visible || document.hidden) {
        lastTime = now;
        return;
      }

      // Frame-rate independent delta (runs identically smooth at 60Hz, 120Hz, 165Hz)
      const dt = Math.min(32, now - lastTime) / 16.6667;
      lastTime = now;

      const width = s.width;
      const height = s.height;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      if (s.snapTarget) {
        const lerp = 1 - Math.pow(0.86, dt);
        s.yaw += (s.snapTarget.yaw - s.yaw) * lerp;
        s.pitch += (s.snapTarget.pitch - s.pitch) * lerp;
        if (Math.abs(s.snapTarget.yaw - s.yaw) < 0.004 && Math.abs(s.snapTarget.pitch - s.pitch) < 0.004) {
          s.yaw = s.snapTarget.yaw;
          s.pitch = s.snapTarget.pitch;
          s.snapTarget = null;
        }
      } else if (!s.dragging) {
        s.yaw += s.vyaw * dt;
        s.pitch += s.vpitch * dt;
        const damp = Math.pow(0.94, dt);
        s.vyaw *= damp;
        s.vpitch *= damp;

        if (Math.abs(s.vyaw) < 0.0005 && Math.abs(s.vpitch) < 0.0005 && now - s.lastInteraction > 2600) {
          s.yaw += 0.0042 * dt;
        }
      }

      const maxPitch = (82 * Math.PI) / 180;
      if (s.pitch > maxPitch) {
        s.pitch = maxPitch;
        s.vpitch *= -0.3;
      } else if (s.pitch < -maxPitch) {
        s.pitch = -maxPitch;
        s.vpitch *= -0.3;
      }

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.36;

      const bgGlow = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius * 1.4);
      bgGlow.addColorStop(0, s.accentGlow);
      bgGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = bgGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      if (s.mode === 'planes') {
        const planePtsHP: [number, number, number][] = [
          [-1.28, 0, -1.28], [1.28, 0, -1.28], [1.28, 0, 1.28], [-1.28, 0, 1.28],
        ];
        const planePtsVP: [number, number, number][] = [
          [-1.28, -1.28, 0], [1.28, -1.28, 0], [1.28, 1.28, 0], [-1.28, 1.28, 0],
        ];
        const drawQuad = (pts: [number, number, number][], fill: string, stroke: string, label: string) => {
          const p = pts.map(([x, y, z]) => project(x, y, z, s.yaw, s.pitch, cx, cy, radius));
          ctx.beginPath();
          ctx.moveTo(p[0].sx, p[0].sy);
          for (let i = 1; i < p.length; i++) ctx.lineTo(p[i].sx, p[i].sy);
          ctx.closePath();
          ctx.fillStyle = fill;
          ctx.fill();
          ctx.strokeStyle = stroke;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.fillStyle = stroke;
          ctx.font = '600 9px ui-monospace, SFMono-Regular, Menlo, monospace';
          ctx.fillText(label, p[1].sx - 14, p[1].sy + 12);
        };
        drawQuad(planePtsHP, 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.28)', 'HP');
        drawQuad(planePtsVP, 'rgba(255,255,255,0.04)', s.accentHex + '88', 'VP');
      }

      if (s.mode === 'solid') {
        const hlX = cx - Math.sin(s.yaw) * radius * 0.28 - radius * 0.24;
        const hlY = cy - Math.sin(s.pitch) * radius * 0.22 - radius * 0.28;
        const sphereGrad = ctx.createRadialGradient(hlX, hlY, radius * 0.08, cx, cy, radius * 1.05);
        sphereGrad.addColorStop(0, '#ffffff');
        sphereGrad.addColorStop(0.32, '#a1a1aa');
        sphereGrad.addColorStop(0.75, '#1c1c21');
        sphereGrad.addColorStop(1, '#09090b');
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = sphereGrad;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.26)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      } else {
        const coreGrad = ctx.createRadialGradient(cx - radius * 0.25, cy - radius * 0.25, radius * 0.1, cx, cy, radius);
        coreGrad.addColorStop(0, 'rgba(255,255,255,0.12)');
        coreGrad.addColorStop(0.7, 'rgba(24,24,27,0.45)');
        coreGrad.addColorStop(1, 'rgba(9,9,11,0.75)');
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();
      }

      const segs = 32;
      const latAngles = s.mode === 'solid' ? [-35, 0, 35] : [-60, -30, 0, 30, 60];
      for (const deg of latAngles) {
        const phi = (deg * Math.PI) / 180;
        const r = Math.cos(phi);
        const y = Math.sin(phi);
        const pts: [number, number, number][] = [];
        for (let i = 0; i <= segs; i++) {
          const theta = (i / segs) * Math.PI * 2;
          pts.push([r * Math.cos(theta), y, r * Math.sin(theta)]);
        }
        const isEq = deg === 0;
        drawRing3D(
          pts, s.yaw, s.pitch, cx, cy, radius,
          isEq ? s.accentHex : 'rgba(255,255,255,0.52)',
          isEq ? s.accentHex + '44' : 'rgba(255,255,255,0.16)',
          isEq ? 1.55 : 0.9,
          s.mode === 'solid' || isEq
        );
      }

      const lonCount = s.mode === 'solid' ? 3 : 6;
      for (let m = 0; m < lonCount; m++) {
        const theta = (m / lonCount) * Math.PI;
        const pts: [number, number, number][] = [];
        for (let i = 0; i <= segs; i++) {
          const phi = (i / segs) * Math.PI * 2;
          pts.push([Math.cos(phi) * Math.cos(theta), Math.sin(phi), Math.cos(phi) * Math.sin(theta)]);
        }
        const isPrime = m === 0;
        drawRing3D(
          pts, s.yaw, s.pitch, cx, cy, radius,
          isPrime ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.34)',
          'rgba(255,255,255,0.12)',
          isPrime ? 1.2 : 0.85,
          s.mode === 'solid'
        );
      }

      const origin = project(0, 0, 0, s.yaw, s.pitch, cx, cy, radius);
      const axisDefs: { vec: [number, number, number]; label: string; color: string }[] = [
        { vec: [1.32, 0, 0], label: 'X', color: '#f87171' },
        { vec: [0, 1.32, 0], label: 'Y', color: '#4ade80' },
        { vec: [0, 0, 1.32], label: 'Z', color: '#60a5fa' },
      ];
      for (const ax of axisDefs) {
        const tip = project(ax.vec[0], ax.vec[1], ax.vec[2], s.yaw, s.pitch, cx, cy, radius);
        ctx.beginPath();
        ctx.moveTo(origin.sx, origin.sy);
        ctx.lineTo(tip.sx, tip.sy);
        ctx.strokeStyle = ax.color + 'aa';
        ctx.lineWidth = 1.1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(tip.sx, tip.sy, 2.3, 0, Math.PI * 2);
        ctx.fillStyle = ax.color;
        ctx.fill();
        ctx.fillStyle = ax.color;
        ctx.font = '700 9px ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.fillText(ax.label, tip.sx + 4, tip.sy + 3);
      }

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.28)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Update angle HUD directly via DOM ref (ZERO React re-renders!)
      if (hudRef.current) {
        const alphaDeg = Math.round((s.pitch * 180) / Math.PI);
        const betaDeg = (((Math.round((s.yaw * 180) / Math.PI) % 360) + 360) % 360);
        const nextText = `α ${alphaDeg}° • β ${betaDeg}°`;
        if (nextText !== lastHudText) {
          lastHudText = nextText;
          hudRef.current.textContent = nextText;
        }
      }
    };

    rafId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const s = stateRef.current;
    s.dragging = true;
    s.snapTarget = null;
    s.vyaw = 0;
    s.vpitch = 0;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    s.lastInteraction = performance.now();
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const s = stateRef.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    const dy = e.clientY - s.lastY;
    s.lastX = e.clientX;
    s.lastY = e.clientY;

    const sens = 0.011;
    s.yaw += dx * sens;
    s.pitch += dy * sens;
    s.vyaw = dx * sens * 0.7;
    s.vpitch = dy * sens * 0.7;
    s.lastInteraction = performance.now();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    stateRef.current.dragging = false;
    stateRef.current.lastInteraction = performance.now();
    setIsDragging(false);
  };

  const modes: { id: OrbViewMode; label: string }[] = [
    { id: 'wireframe', label: 'Wireframe' },
    { id: 'solid', label: 'Solid' },
    { id: 'planes', label: 'VP/HP' },
  ];

  return (
    <div className="relative z-10 flex flex-col items-center justify-center my-1">
      <div className="flex items-center gap-1 p-0.5 rounded-full bg-white/[0.07] border border-white/10 mb-1.5">
        {modes.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setViewMode(m.id)}
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium transition-all cursor-pointer ${
              viewMode === m.id ? 'bg-white text-black shadow-sm' : 'text-white/65 hover:text-white'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="relative w-full h-44 sm:h-48 flex items-center justify-center gpu-layer">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onDoubleClick={snapToIsometric}
          aria-label={`Interactive 360 degree CAD sphere for ${solidLabel}. Drag to rotate, double tap to reset to isometric.`}
          className={`w-full h-full touch-none select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        />
      </div>

      <div className="flex items-center gap-2 mt-1">
        <span
          ref={hudRef}
          className="px-2.5 py-0.5 rounded-full bg-white/[0.08] border border-white/10 text-[10px] font-mono text-white/80 tabular-nums"
        >
          α 35° • β 45°
        </span>
        <button
          type="button"
          onClick={snapToIsometric}
          title="Snap back to Isometric (35° / 45°)"
          className="px-2 py-0.5 rounded-full bg-white/[0.06] hover:bg-white/[0.16] border border-white/10 text-[10px] text-white/70 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-2.5 h-2.5" />
          <span>ISO</span>
        </button>
      </div>
    </div>
  );
};
