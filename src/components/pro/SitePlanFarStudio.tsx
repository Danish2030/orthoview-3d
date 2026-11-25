import React, { useMemo } from 'react';
import {
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Sliders,
} from 'lucide-react';
import { CadLayerId, ProProjectState, SitePlotParams } from '../../types/pro';
import { ThemeMode } from '../../types';
import { AccentId } from '../../utils/accentTheme';
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

  const plotFormatted = formatPlotArea(calc.plotAreaSqM, project.unitSystem);

  return (
    <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden relative">
      {/* Center Stage: Site Plan SVG */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Compliance Bar */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          {/* Plot Area Badge */}
          <div className="px-3.5 py-1.5 rounded-full glass-pill text-[11px] font-semibold flex items-center gap-2 shadow-lg">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            <span>Plot Area:</span>
            <span className="font-bold text-[var(--accent-hex)]">{plotFormatted.primary}</span>
            <span className="opacity-40 font-normal">({plotFormatted.cents})</span>
          </div>

          {/* FAR Status Pill */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold shadow-md border ${
              calc.farCompliant
                ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/25 text-rose-400'
            }`}
          >
            {calc.farCompliant ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
            <span>FAR: {calc.achievedFar.toFixed(2)} / {site.maxPermissibleFar.toFixed(2)} Permissible</span>
          </div>
        </div>

        {/* Site Plan Canvas */}
        <div className="flex-1 flex items-center justify-center h-full p-4 overflow-hidden">
          <svg
            viewBox={`-4000 -6000 ${site.plotWidthMm + 8000} ${site.plotDepthMm + 10000}`}
            className="w-full h-full max-h-[88vh]"
          >
            {/* North Arrow Symbol */}
            <g transform={`translate(${site.plotWidthMm + 1800}, -3500) rotate(${site.northAngleDeg})`}>
              <circle cx="0" cy="0" r="450" fill="none" stroke="currentColor" strokeWidth="40" opacity="0.6" />
              <polygon points="0,-400 180,280 0,160 -180,280" fill="var(--accent-hex)" />
              <text x="0" y="-500" fontSize="180" fontWeight="bold" textAnchor="middle" fill="currentColor">
                NORTH
              </text>
            </g>

            {/* Abutting Road on Front */}
            <g opacity="0.85">
              <rect
                x="-3000"
                y={-site.roadWidthMm - 800}
                width={site.plotWidthMm + 6000}
                height={site.roadWidthMm}
                fill={isDark ? '#1c1c21' : '#e2e8f0'}
                stroke="#64748b"
                strokeWidth="40"
              />
              {/* Road Centerline */}
              <line
                x1="-3000"
                y1={-site.roadWidthMm / 2 - 800}
                x2={site.plotWidthMm + 3000}
                y2={site.roadWidthMm / 2 - 800}
                stroke="#fbbf24"
                strokeWidth="50"
                strokeDasharray="200 150"
              />
              <text
                x={site.plotWidthMm / 2}
                y={-site.roadWidthMm / 2 - 650}
                fontSize="240"
                fontWeight="bold"
                textAnchor="middle"
                fill="currentColor"
              >
                ABUTTING PUBLIC ROAD ({formatLength(site.roadWidthMm, project.unitSystem)} WIDE)
              </text>
            </g>

            {/* Plot Boundary (Red / Solid) */}
            <rect
              x="0"
              y="0"
              width={site.plotWidthMm}
              height={site.plotDepthMm}
              fill={isDark ? '#18181b' : '#f8fafc'}
              stroke="#ef4444"
              strokeWidth="70"
            />

            {/* Setback Lines (Dashed Green) */}
            <rect
              x={site.setbackLeftMm}
              y={site.setbackFrontMm}
              width={calc.bW}
              height={calc.bD}
              fill="rgba(56, 189, 248, 0.12)"
              stroke="#38bdf8"
              strokeWidth="45"
              strokeDasharray="160 100"
            />

            {/* Shaded Buildable Envelope */}
            <g transform={`translate(${site.setbackLeftMm + calc.bW / 2}, ${site.setbackFrontMm + calc.bD / 2})`} textAnchor="middle">
              <text y="-80" fontSize="300" fontWeight="bold" fill="var(--accent-hex)">
                MAX BUILDABLE FOOTPRINT
              </text>
              <text y="240" fontSize="220" fontWeight="600" opacity="0.8" fill="currentColor">
                {formatLength(calc.bW, project.unitSystem)} × {formatLength(calc.bD, project.unitSystem)}
              </text>
              <text y="520" fontSize="190" fontWeight="bold" fill="#38bdf8">
                Footprint: {calc.buildableFootprintSqM.toFixed(1)} m² ({calc.groundCoveragePct.toFixed(1)}% Coverage)
              </text>
            </g>

            {/* Setback Dimension Callouts */}
            {/* Front Setback */}
            <g opacity="0.85">
              <line x1={site.plotWidthMm / 2} y1="0" x2={site.plotWidthMm / 2} y2={site.setbackFrontMm} stroke="#94a3b8" strokeWidth="30" />
              <text x={site.plotWidthMm / 2 + 100} y={site.setbackFrontMm / 2 + 50} fontSize="180" fill="#94a3b8" fontWeight="bold">
                Front: {formatLength(site.setbackFrontMm, project.unitSystem)}
              </text>

              {/* Rear Setback */}
              <line x1={site.plotWidthMm / 2} y1={site.plotDepthMm - site.setbackRearMm} x2={site.plotWidthMm / 2} y2={site.plotDepthMm} stroke="#94a3b8" strokeWidth="30" />
              <text x={site.plotWidthMm / 2 + 100} y={site.plotDepthMm - site.setbackRearMm / 2 + 50} fontSize="180" fill="#94a3b8" fontWeight="bold">
                Rear: {formatLength(site.setbackRearMm, project.unitSystem)}
              </text>

              {/* Left Setback */}
              <line x1="0" y1={site.plotDepthMm / 2} x2={site.setbackLeftMm} y2={site.plotDepthMm / 2} stroke="#94a3b8" strokeWidth="30" />
              <text x={site.setbackLeftMm / 2} y={site.plotDepthMm / 2 - 80} fontSize="180" textAnchor="middle" fill="#94a3b8" fontWeight="bold">
                Left: {formatLength(site.setbackLeftMm, project.unitSystem)}
              </text>

              {/* Right Setback */}
              <line x1={site.plotWidthMm - site.setbackRightMm} y1={site.plotDepthMm / 2} x2={site.plotWidthMm} y2={site.plotDepthMm / 2} stroke="#94a3b8" strokeWidth="30" />
              <text x={site.plotWidthMm - site.setbackRightMm / 2} y={site.plotDepthMm / 2 - 80} fontSize="180" textAnchor="middle" fill="#94a3b8" fontWeight="bold">
                Right: {formatLength(site.setbackRightMm, project.unitSystem)}
              </text>
            </g>

            {/* Plot Overall Dimension Lines */}
            <g opacity="0.75">
              {/* Width top */}
              <line x1="0" y1="-300" x2={site.plotWidthMm} y2="-300" stroke="#ef4444" strokeWidth="40" />
              <text x={site.plotWidthMm / 2} y="-450" fontSize="240" fontWeight="bold" textAnchor="middle" fill="#ef4444">
                PLOT WIDTH: {formatLength(site.plotWidthMm, project.unitSystem)}
              </text>
              {/* Depth left */}
              <line x1="-500" y1="0" x2="-500" y2={site.plotDepthMm} stroke="#ef4444" strokeWidth="40" />
              <text x="-650" y={site.plotDepthMm / 2} fontSize="240" fontWeight="bold" textAnchor="end" fill="#ef4444">
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
