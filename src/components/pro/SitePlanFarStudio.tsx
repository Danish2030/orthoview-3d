import React, { useMemo } from 'react';
import {
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Sliders,
} from 'lucide-react';
import { CadLayerId, ProProjectState, SitePlotParams } from '../../types/pro';
import { ThemeMode } from '../../types';
import { AccentId, getAccentConfig } from '../../utils/accentTheme';
import { formatLength, formatPlotArea } from '../../utils/proUnits';

interface SitePlanFarStudioProps {
  project: ProProjectState;
  onUpdateProject: (next: ProProjectState) => void;
  theme: ThemeMode;
  accentId: AccentId;
  activeLayers: CadLayerId[];
}

export const SitePlanFarStudio: React.FC<SitePlanFarStudioProps> = ({
  project,
  onUpdateProject,
  theme,
  accentId,
}) => {
  const isDark = theme === 'blueprint';
  const site = project.sitePlot;

  const handleUpdate = (updated: SitePlotParams) => {
    onUpdateProject({ ...project, sitePlot: updated });
  };

  // Calculations
  const calc = useMemo(() => {
    const pW = site.plotWidthMm;
    const pD = site.plotDepthMm;
    const plotAreaSqM = (pW * pD) / 1000000;

    // Buildable envelope
    const bW = Math.max(0, pW - site.setbackLeftMm - site.setbackRightMm);
    const bD = Math.max(0, pD - site.setbackFrontMm - site.setbackRearMm);
    const buildableFootprintSqM = (bW * bD) / 1000000;

    const groundCoveragePct = plotAreaSqM > 0 ? (buildableFootprintSqM / plotAreaSqM) * 100 : 0;
    const totalBuiltUpSqM = buildableFootprintSqM * site.proposedFloors;
    const achievedFar = plotAreaSqM > 0 ? totalBuiltUpSqM / plotAreaSqM : 0;

    const farCompliant = achievedFar <= site.maxPermissibleFar;
    const coverageCompliant = groundCoveragePct <= site.maxGroundCoveragePct;

    return {
      pW,
      pD,
      bW,
      bD,
      plotAreaSqM,
      buildableFootprintSqM,
      groundCoveragePct,
      totalBuiltUpSqM,
      achievedFar,
      farCompliant,
      coverageCompliant,
    };
  }, [site]);

  const [zoom, setZoom] = useState<number>(1);
  const accentHex = accentId === 'mono' ? (isDark ? '#38bdf8' : '#0284c7') : getAccentConfig(accentId).hex;
  const plotFormatted = formatPlotArea(calc.plotAreaSqM, project.unitSystem);


  const roadGap = 900;
  const roadTopY = -(site.roadWidthMm + roadGap);
  const roadCenterY = -(site.roadWidthMm / 2 + roadGap);

  const baseVbX = -4600;
  const baseVbY = roadTopY - 1400;
  const baseVbW = site.plotWidthMm + 9200;
  const baseVbH = site.plotDepthMm + Math.abs(roadTopY) + 3400;
  const vbW = baseVbW / zoom;
  const vbH = baseVbH / zoom;
  const vbX = (baseVbX + baseVbW / 2) - vbW / 2;
  const vbY = (baseVbY + baseVbH / 2) - vbH / 2;

  // Proposed building block centered inside buildable envelope
  const proposedW = Math.min(calc.bW * 0.84, Math.max(3000, calc.bW - 1200));
  const proposedD = Math.min(calc.bD * 0.78, Math.max(3000, calc.bD - 1400));
  const proposedX = site.setbackLeftMm + (calc.bW - proposedW) / 2;
  const proposedY = site.setbackFrontMm + (calc.bD - proposedD) / 2;

  return (
    <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden relative">
      {/* Center Stage: Site Plan SVG */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Compliance Bar (Dedicated Strip — No Overlap) */}
        <div className="px-4 pt-3 pb-2 z-20 flex flex-wrap items-center justify-between gap-2 border-b border-current/10 bg-current/[0.02]">
          <div className="flex flex-wrap items-center gap-2">
            {/* Plot Area Badge */}
            <div className="px-3.5 py-1.5 rounded-full glass-pill text-[11px] font-semibold flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span className="opacity-70">Plot:</span>
              <span style={{ color: accentHex }} className="font-bold tabular-nums">{plotFormatted.primary}</span>
              <span className="opacity-65 font-normal">({plotFormatted.cents})</span>
            </div>

            {/* FAR Status Pill */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                calc.farCompliant
                  ? isDark
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                    : 'bg-emerald-500/15 border-emerald-600/30 text-emerald-700'
                  : isDark
                    ? 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                    : 'bg-rose-500/15 border-rose-600/30 text-rose-700'
              }`}
            >
              {calc.farCompliant ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
              <span>FAR: {calc.achievedFar.toFixed(2)} / {site.maxPermissibleFar.toFixed(2)} Permissible</span>
            </div>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-full glass-pill text-[11px]">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.65, Number((z - 0.15).toFixed(2))))}
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
        </div>

        {/* Site Plan Canvas */}
        <div className="flex-1 flex items-center justify-center h-full p-4 overflow-hidden">
          <svg
            viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full max-h-[82vh]"
          >
            {/* Abutting Public Road on Front */}
            <g>
              <rect
                x="-3200"
                y={roadTopY}
                width={site.plotWidthMm + 6400}
                height={site.roadWidthMm}
                fill={isDark ? '#1c1c22' : '#dbe3ec'}
                stroke={isDark ? '#52525b' : '#64748b'}
                strokeWidth="45"
              />
              {/* Road Kerb / Footpath lines */}
              <line x1="-3200" y1={roadTopY + 550} x2={site.plotWidthMm + 3200} y2={roadTopY + 550} stroke={isDark ? '#52525b' : '#94a3b8'} strokeWidth="22" />
              <line x1="-3200" y1={-roadGap - 550} x2={site.plotWidthMm + 3200} y2={-roadGap - 550} stroke={isDark ? '#52525b' : '#94a3b8'} strokeWidth="22" />

              {/* FIXED Horizontal Road Centerline (Both y1 and y2 at roadCenterY) */}
              <line
                x1="-3200"
                y1={roadCenterY}
                x2={site.plotWidthMm + 3200}
                y2={roadCenterY}
                stroke="#f59e0b"
                strokeWidth="65"
                strokeDasharray="360 220"
              />
              <rect
                x={site.plotWidthMm / 2 - 4200}
                y={roadCenterY - 260}
                width="8400"
                height="500"
                rx="120"
                fill={isDark ? '#09090b' : '#ffffff'}
                fillOpacity="0.92"
                stroke={isDark ? '#3f3f46' : '#cbd5e1'}
                strokeWidth="25"
              />
              <text
                x={site.plotWidthMm / 2}
                y={roadCenterY + 80}
                fontSize="270"
                fontWeight="800"
                textAnchor="middle"
                fill={isDark ? '#f4f4f6' : '#0f172a'}
              >
                ABUTTING PUBLIC ROAD ({formatLength(site.roadWidthMm, project.unitSystem)} WIDE)
              </text>
            </g>

            {/* Crisp Dual-Tone North Compass Rose (Clear of Road, High Contrast) */}
            <g transform={`translate(${site.plotWidthMm + 2300}, 1500) rotate(${site.northAngleDeg})`}>
              <circle cx="0" cy="0" r="850" fill={isDark ? '#141418' : '#ffffff'} stroke={isDark ? '#e4e4e7' : '#0f172a'} strokeWidth="45" />
              <circle cx="0" cy="0" r="680" fill="none" stroke={isDark ? '#52525b' : '#cbd5e1'} strokeWidth="18" strokeDasharray="60 40" />
              <polygon points="0,-620 260,340 0,160" fill={accentHex} />
              <polygon points="0,-620 -260,340 0,160" fill={isDark ? '#e4e4e7' : '#0f172a'} />
              <text x="0" y="-960" fontSize="340" fontWeight="900" textAnchor="middle" fill={isDark ? '#f4f4f6' : '#0f172a'}>
                N
              </text>
            </g>

            {/* Main Gate Entry Arrow from Road */}
            <g>
              <line x1={site.plotWidthMm * 0.25} y1={-roadGap} x2={site.plotWidthMm * 0.25} y2="650" stroke={accentHex} strokeWidth="55" />
              <polygon points={`${site.plotWidthMm * 0.25},820 ${site.plotWidthMm * 0.25 - 180},460 ${site.plotWidthMm * 0.25 + 180},460`} fill={accentHex} />
              <text x={site.plotWidthMm * 0.25 + 260} y="420" fontSize="220" fontWeight="800" fill={accentHex}>
                ENTRY GATE
              </text>
            </g>

            {/* Plot Boundary (Red Solid) */}
            <rect
              x="0"
              y="0"
              width={site.plotWidthMm}
              height={site.plotDepthMm}
              fill={isDark ? '#141418' : '#ffffff'}
              stroke="#ef4444"
              strokeWidth="85"
            />

            {/* Buildable Envelope (Setback Dashed Box) */}
            <rect
              x={site.setbackLeftMm}
              y={site.setbackFrontMm}
              width={calc.bW}
              height={calc.bD}
              fill={isDark ? 'rgba(56, 189, 248, 0.12)' : 'rgba(2, 132, 199, 0.08)'}
              stroke={accentHex}
              strokeWidth="55"
              strokeDasharray="220 120"
            />

            {/* Proposed Building Block Preview inside Buildable Envelope */}
            {proposedW > 0 && proposedD > 0 && (
              <rect
                x={proposedX}
                y={proposedY}
                width={proposedW}
                height={proposedD}
                fill={isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)'}
                stroke={isDark ? '#94a3b8' : '#475569'}
                strokeWidth="35"
              />
            )}

            {/* Centered High-Contrast Buildable Footprint Readout */}
            <g transform={`translate(${site.setbackLeftMm + calc.bW / 2}, ${site.setbackFrontMm + calc.bD / 2})`} textAnchor="middle">
              <text y="-160" fontSize="340" fontWeight="900" fill={isDark ? '#f4f4f6' : '#0f172a'}>
                MAX BUILDABLE FOOTPRINT
              </text>
              <text y="210" fontSize="290" fontWeight="700" fill={isDark ? '#cbd5e1' : '#334155'}>
                {formatLength(calc.bW, project.unitSystem)} × {formatLength(calc.bD, project.unitSystem)}
              </text>
              <text y="560" fontSize="260" fontWeight="800" fill={accentHex}>
                {calc.buildableFootprintSqM.toFixed(1)} m² ({calc.groundCoveragePct.toFixed(1)}% Ground Coverage)
              </text>
            </g>

            {/* Setback Dimension Callouts (High Contrast) */}
            <g stroke={isDark ? '#94a3b8' : '#475569'} fill={isDark ? '#e2e8f0' : '#1e293b'} strokeWidth="32">
              {/* Front Setback */}
              <line x1={site.plotWidthMm / 2} y1="0" x2={site.plotWidthMm / 2} y2={site.setbackFrontMm} />
              <text x={site.plotWidthMm / 2 + 160} y={site.setbackFrontMm / 2 + 70} fontSize="220" fontWeight="700" stroke="none">
                Front: {formatLength(site.setbackFrontMm, project.unitSystem)}
              </text>

              {/* Rear Setback */}
              <line x1={site.plotWidthMm / 2} y1={site.plotDepthMm - site.setbackRearMm} x2={site.plotWidthMm / 2} y2={site.plotDepthMm} />
              <text x={site.plotWidthMm / 2 + 160} y={site.plotDepthMm - site.setbackRearMm / 2 + 70} fontSize="220" fontWeight="700" stroke="none">
                Rear: {formatLength(site.setbackRearMm, project.unitSystem)}
              </text>

              {/* Left Setback */}
              <line x1="0" y1={site.plotDepthMm / 2} x2={site.setbackLeftMm} y2={site.plotDepthMm / 2} />
              <text x={site.setbackLeftMm / 2} y={site.plotDepthMm / 2 - 120} fontSize="210" textAnchor="middle" fontWeight="700" stroke="none">
                {formatLength(site.setbackLeftMm, project.unitSystem)}
              </text>

              {/* Right Setback */}
              <line x1={site.plotWidthMm - site.setbackRightMm} y1={site.plotDepthMm / 2} x2={site.plotWidthMm} y2={site.plotDepthMm / 2} />
              <text x={site.plotWidthMm - site.setbackRightMm / 2} y={site.plotDepthMm / 2 - 120} fontSize="210" textAnchor="middle" fontWeight="700" stroke="none">
                {formatLength(site.setbackRightMm, project.unitSystem)}
              </text>
            </g>

            {/* Plot Overall Dimension Lines */}
            <g stroke="#ef4444" fill="#ef4444" strokeWidth="42">
              <line x1="0" y1="-360" x2={site.plotWidthMm} y2="-360" />
              <line x1="0" y1="-520" x2="0" y2="-200" />
              <line x1={site.plotWidthMm} y1="-520" x2={site.plotWidthMm} y2="-200" />
              <text x={site.plotWidthMm / 2} y="-480" fontSize="270" fontWeight="800" textAnchor="middle" stroke="none">
                PLOT WIDTH: {formatLength(site.plotWidthMm, project.unitSystem)}
              </text>

              <line x1="-600" y1="0" x2="-600" y2={site.plotDepthMm} />
              <line x1="-760" y1="0" x2="-440" y2="0" />
              <line x1="-760" y1={site.plotDepthMm} x2="-440" y2={site.plotDepthMm} />
              <text x="-820" y={site.plotDepthMm / 2} fontSize="270" fontWeight="800" textAnchor="end" stroke="none">
                PLOT DEPTH: {formatLength(site.plotDepthMm, project.unitSystem)}
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Right Parametric Setback & FAR Inspector */}
      <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-current/10 glass-panel p-4 flex flex-col gap-4 overflow-y-auto shrink-0 custom-scrollbar">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[var(--accent-hex)]" />
            <span className="font-semibold text-sm">Site &amp; Setbacks</span>
          </div>
          <span className="text-[10px] opacity-60 font-mono">Bylaws 2026</span>
        </div>

        {/* Plot Dimensions */}
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[11px] opacity-60">Plot Width (mm)</label>
              <input
                type="number"
                step="500"
                value={site.plotWidthMm}
                onChange={(e) => handleUpdate({ ...site, plotWidthMm: Math.max(5000, Number(e.target.value)) })}
                className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] opacity-60">Plot Depth (mm)</label>
              <input
                type="number"
                step="500"
                value={site.plotDepthMm}
                onChange={(e) => handleUpdate({ ...site, plotDepthMm: Math.max(5000, Number(e.target.value)) })}
                className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] opacity-60">Road Width (mm)</label>
            <input
              type="number"
              step="500"
              value={site.roadWidthMm}
              onChange={(e) => handleUpdate({ ...site, roadWidthMm: Math.max(3000, Number(e.target.value)) })}
              className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
            />
          </div>

          {/* Mandatory Setbacks */}
          <div className="pt-2 border-t border-current/10 space-y-2">
            <span className="font-semibold text-xs text-[var(--accent-hex)]">Mandatory Setbacks</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] opacity-60">Front (Road) mm</label>
                <input
                  type="number"
                  step="250"
                  value={site.setbackFrontMm}
                  onChange={(e) => handleUpdate({ ...site, setbackFrontMm: Math.max(1000, Number(e.target.value)) })}
                  className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] opacity-60">Rear mm</label>
                <input
                  type="number"
                  step="250"
                  value={site.setbackRearMm}
                  onChange={(e) => handleUpdate({ ...site, setbackRearMm: Math.max(1000, Number(e.target.value)) })}
                  className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] opacity-60">Left Side mm</label>
                <input
                  type="number"
                  step="250"
                  value={site.setbackLeftMm}
                  onChange={(e) => handleUpdate({ ...site, setbackLeftMm: Math.max(1000, Number(e.target.value)) })}
                  className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] opacity-60">Right Side mm</label>
                <input
                  type="number"
                  step="250"
                  value={site.setbackRightMm}
                  onChange={(e) => handleUpdate({ ...site, setbackRightMm: Math.max(1000, Number(e.target.value)) })}
                  className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
                />
              </div>
            </div>
          </div>

          {/* FAR Limits */}
          <div className="pt-2 border-t border-current/10 space-y-2">
            <span className="font-semibold text-xs text-[var(--accent-hex)]">Bylaw Permissible Limits</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] opacity-60">Max FAR Index</label>
                <input
                  type="number"
                  step="0.1"
                  value={site.maxPermissibleFar}
                  onChange={(e) => handleUpdate({ ...site, maxPermissibleFar: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] opacity-60">Max Coverage %</label>
                <input
                  type="number"
                  step="5"
                  value={site.maxGroundCoveragePct}
                  onChange={(e) => handleUpdate({ ...site, maxGroundCoveragePct: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
                />
              </div>
            </div>
          </div>

          {/* Compliance Report Card */}
          <div className="pt-3 border-t border-current/10 space-y-2">
            <span className="font-semibold text-xs text-[var(--accent-hex)]">Compliance Report</span>
            <div className="p-3 rounded-2xl glass-card space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="opacity-75">Max Ground Coverage:</span>
                <span className={`font-mono font-bold ${calc.coverageCompliant ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {calc.groundCoveragePct.toFixed(1)}% (Max {site.maxGroundCoveragePct}%)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="opacity-75">Total Built-Up Area:</span>
                <span className="font-mono font-bold">{calc.totalBuiltUpSqM.toFixed(1)} m²</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-current/10 font-bold">
                <span>Achieved FAR:</span>
                <span className={`font-mono ${calc.farCompliant ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {calc.achievedFar.toFixed(2)} {calc.farCompliant ? '✓ Pass' : '⚠ Exceeds'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};