import React, { useState, useMemo } from 'react';
import {
  Grid,
  Layers,
  Sliders,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react';
import { CadLayerId, ColumnItem, ProProjectState } from '../../types/pro';
import { ThemeMode } from '../../types';
import { AccentId } from '../../utils/accentTheme';
import { formatLength } from '../../utils/proUnits';

interface ColumnGridStudioProps {
  project: ProProjectState;
  onUpdateProject: (next: ProProjectState) => void;
  theme: ThemeMode;
  accentId: AccentId;
  activeLayers: CadLayerId[];
}

export const ColumnGridStudio: React.FC<ColumnGridStudioProps> = ({
  project,
  onUpdateProject,
  theme,
  activeLayers,
}) => {
  const isDark = theme === 'blueprint';
  const grid = project.columnGrid;
  const [selectedColId, setSelectedColId] = useState<string>(grid.columns[0]?.id || '');
  const [detailMode, setDetailMode] = useState<'grid' | 'section' | 'split'>('split');

  const selectedCol = useMemo(
    () => grid.columns.find((c) => c.id === selectedColId) || grid.columns[0],
    [grid.columns, selectedColId]
  );

  // Compute total grid dimensions
  const totalXSpan = useMemo(() => grid.xSpans.reduce((acc, s) => acc + s.spanMm, 0), [grid.xSpans]);
  const totalYSpan = useMemo(() => grid.ySpans.reduce((acc, s) => acc + s.spanMm, 0), [grid.ySpans]);

  // Handle column update
  const handleUpdateCol = (updated: ColumnItem) => {
    const nextCols = grid.columns.map((c) => (c.id === updated.id ? updated : c));
    onUpdateProject({
      ...project,
      columnGrid: { ...grid, columns: nextCols },
    });
  };

  // Rebar / Steel calculation for the selected column
  const rebarSummary = useMemo(() => {
    if (!selectedCol) return { mainSteelKg: 0, stirrupSteelKg: 0, totalSteelKg: 0 };
    // Height = Plinth (600) + Floor Height (3000) + Foundation Depth (1500) = 5100 mm = 5.1 m
    const colHeightM = 5.1;
    // Area of 1 bar = pi * d^2 / 4, weight per meter = d^2 / 162
    const barWeightPerM = (selectedCol.mainBarsDiaMm * selectedCol.mainBarsDiaMm) / 162;
    const mainWeight = colHeightM * selectedCol.mainBarsCount * barWeightPerM;

    // Stirrups perimeter = 2 * (width - 2*40) + 2 * (depth - 2*40) + 200 hook = in meters
    const cover = 40;
    const pM = (2 * (selectedCol.widthMm - 2 * cover) + 2 * (selectedCol.depthMm - 2 * cover) + 150) / 1000;
    const numStirrups = Math.ceil((colHeightM * 1000) / selectedCol.stirrupSpacingMm);
    const stirrupWeightPerM = (selectedCol.stirrupDiaMm * selectedCol.stirrupDiaMm) / 162;
    const stirrupWeight = numStirrups * pM * stirrupWeightPerM;

    return {
      mainSteelKg: mainWeight,
      stirrupSteelKg: stirrupWeight,
      totalSteelKg: mainWeight + stirrupWeight,
    };
  }, [selectedCol]);

  const showCols = activeLayers.includes('S-COLS');
  const showDims = activeLayers.includes('A-DIMS');

  return (
    <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden relative">
      {/* Center Drafting Stage */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Controls */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <div className="p-1 rounded-full glass-pill flex items-center gap-1 text-[11px] font-semibold shadow-lg">
            <button
              onClick={() => setDetailMode('grid')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                detailMode === 'grid' ? 'glass-pill-active' : 'opacity-65 hover:opacity-100'
              }`}
            >
              Structural Grid Plan
            </button>
            <button
              onClick={() => setDetailMode('split')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                detailMode === 'split' ? 'glass-pill-active' : 'opacity-65 hover:opacity-100'
              }`}
            >
              Split View
            </button>
            <button
              onClick={() => setDetailMode('section')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                detailMode === 'section' ? 'glass-pill-active' : 'opacity-65 hover:opacity-100'
              }`}
            >
              RCC Column Section
            </button>
          </div>

          <button
            onClick={() => {
              onUpdateProject({
                ...project,
                columnGrid: { ...grid, showPlinthBeam: !grid.showPlinthBeam },
              });
            }}
            className={`px-3 py-1.5 rounded-full glass-pill text-[11px] font-semibold flex items-center gap-1.5 shadow-md cursor-pointer ${
              grid.showPlinthBeam ? 'text-[var(--accent-hex)]' : 'opacity-60'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Plinth Beams ({grid.beamWidthMm}×{grid.beamDepthMm}mm)</span>
          </button>
        </div>

        {/* Drawing Canvases */}
        <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden">
          {/* Grid Layout View */}
          {(detailMode === 'grid' || detailMode === 'split') && (
            <div
              className={`relative overflow-hidden flex items-center justify-center select-none p-4 ${
                detailMode === 'split' ? 'w-full lg:w-3/5 h-1/2 lg:h-full border-b lg:border-b-0 lg:border-r border-current/10' : 'w-full h-full'
              }`}
            >
              <svg
                viewBox={`-2000 -2000 ${totalXSpan + 4000} ${totalYSpan + 4000}`}
                className="w-full h-full max-h-[90vh]"
              >
                {/* Centerline Grid Lines with Grid Bubbles */}
                {/* X Grid Lines (A, B, C...) */}
                {['A', 'B', 'C'].map((label, idx) => {
                  const gx = idx === 0 ? 0 : idx === 1 ? 4500 : 7700;
                  return (
                    <g key={`x-grid-${label}`}>
                      {/* Grid Line */}
                      <line
                        x1={gx}
                        y1={-1200}
                        x2={gx}
                        y2={totalYSpan + 1200}
                        stroke="#ef4444"
                        strokeWidth="30"
                        strokeDasharray="180 50 50 50"
                        opacity="0.8"
                      />
                      {/* Top Grid Bubble */}
                      <circle cx={gx} cy={-1350} r="280" fill={isDark ? '#09090b' : '#ffffff'} stroke="#ef4444" strokeWidth="40" />
                      <text x={gx} y={-1270} fontSize="240" fontWeight="bold" textAnchor="middle" fill="#ef4444">
                        {label}
                      </text>
                      {/* Bottom Grid Bubble */}
                      <circle cx={gx} cy={totalYSpan + 1350} r="280" fill={isDark ? '#09090b' : '#ffffff'} stroke="#ef4444" strokeWidth="40" />
                      <text x={gx} y={totalYSpan + 1430} fontSize="240" fontWeight="bold" textAnchor="middle" fill="#ef4444">
                        {label}
                      </text>
                    </g>
                  );
                })}

                {/* Y Grid Lines (1, 2, 3, 4...) */}
                {['1', '2', '3', '4'].map((label, idx) => {
                  const gy = idx === 0 ? 0 : idx === 1 ? 1800 : idx === 2 ? 6000 : 9800;
                  return (
                    <g key={`y-grid-${label}`}>
                      {/* Grid Line */}
                      <line
                        x1={-1200}
                        y1={gy}
                        x2={totalXSpan + 1200}
                        y2={gy}
                        stroke="#ef4444"
                        strokeWidth="30"
                        strokeDasharray="180 50 50 50"
                        opacity="0.8"
                      />
                      {/* Left Grid Bubble */}
                      <circle cx={-1350} cy={gy} r="280" fill={isDark ? '#09090b' : '#ffffff'} stroke="#ef4444" strokeWidth="40" />
                      <text x={-1350} y={gy + 80} fontSize="240" fontWeight="bold" textAnchor="middle" fill="#ef4444">
                        {label}
                      </text>
                      {/* Right Grid Bubble */}
                      <circle cx={totalXSpan + 1350} cy={gy} r="280" fill={isDark ? '#09090b' : '#ffffff'} stroke="#ef4444" strokeWidth="40" />
                      <text x={totalXSpan + 1350} y={gy + 80} fontSize="240" fontWeight="bold" textAnchor="middle" fill="#ef4444">
                        {label}
                      </text>
                    </g>
                  );
                })}

                {/* Plinth Beams Network */}
                {grid.showPlinthBeam && (
                  <g opacity="0.6">
                    <line x1={0} y1={0} x2={4500} y2={0} stroke="#38bdf8" strokeWidth={grid.beamWidthMm} />
                    <line x1={0} y1={1800} x2={7700} y2={1800} stroke="#38bdf8" strokeWidth={grid.beamWidthMm} />
                    <line x1={0} y1={6000} x2={7700} y2={6000} stroke="#38bdf8" strokeWidth={grid.beamWidthMm} />
                    <line x1={0} y1={9800} x2={4500} y2={9800} stroke="#38bdf8" strokeWidth={grid.beamWidthMm} />
                    <line x1={0} y1={0} x2={0} y2={9800} stroke="#38bdf8" strokeWidth={grid.beamWidthMm} />
                    <line x1={4500} y1={0} x2={4500} y2={9800} stroke="#38bdf8" strokeWidth={grid.beamWidthMm} />
                    <line x1={7700} y1={1800} x2={7700} y2={6000} stroke="#38bdf8" strokeWidth={grid.beamWidthMm} />
                  </g>
                )}

                {/* Columns & Footings */}
                {showCols &&
                  grid.columns.map((col) => {
                    const isSelected = col.id === selectedColId;
                    return (
                      <g
                        key={col.id}
                        onClick={() => setSelectedColId(col.id)}
                        className="cursor-pointer"
                      >
                        {/* Isolated Footing Outline */}
                        <rect
                          x={col.x - col.footingWidthMm / 2}
                          y={col.y - col.footingLengthMm / 2}
                          width={col.footingWidthMm}
                          height={col.footingLengthMm}
                          fill={isSelected ? 'rgba(239, 68, 68, 0.12)' : 'none'}
                          stroke="#ef4444"
                          strokeWidth="25"
                          strokeDasharray="60 40"
                          opacity="0.7"
                        />

                        {/* Column Pedestal Body */}
                        <rect
                          x={col.x - col.widthMm / 2}
                          y={col.y - col.depthMm / 2}
                          width={col.widthMm}
                          height={col.depthMm}
                          fill={isSelected ? '#ef4444' : isDark ? '#27272a' : '#cbd5e1'}
                          stroke="#ef4444"
                          strokeWidth="40"
                        />

                        {/* Column Tag Label */}
                        <text
                          x={col.x + col.widthMm / 2 + 80}
                          y={col.y - col.depthMm / 2}
                          fontSize="160"
                          fontWeight="bold"
                          fill={isSelected ? '#ef4444' : 'currentColor'}
                        >
                          C{col.id.replace('c', '')} ({col.gridX}-{col.gridY})
                        </text>
                      </g>
                    );
                  })}

                {/* Bay Dimensions Callout (A-DIMS) */}
                {showDims && (
                  <g opacity="0.85">
                    {/* Bay 1: A-B (4500mm) */}
                    <line x1={0} y1={-800} x2={4500} y2={-800} stroke="#94a3b8" strokeWidth="25" />
                    <text x={2250} y={-880} fontSize="180" textAnchor="middle" fill="#94a3b8">
                      {formatLength(4500, project.unitSystem)}
                    </text>
                    {/* Bay 2: B-C (3200mm) */}
                    <line x1={4500} y1={-800} x2={7700} y2={-800} stroke="#94a3b8" strokeWidth="25" />
                    <text x={6100} y={-880} fontSize="180" textAnchor="middle" fill="#94a3b8">
                      {formatLength(3200, project.unitSystem)}
                    </text>
                  </g>
                )}
              </svg>
            </div>
          )}

          {/* RCC Column Cross-Section Detail View */}
          {(detailMode === 'section' || detailMode === 'split') && (
            <div
              className={`relative overflow-hidden flex flex-col items-center justify-center p-6 ${
                detailMode === 'split' ? 'w-full lg:w-2/5 h-1/2 lg:h-full' : 'w-full h-full'
              }`}
            >
              <div className="w-full max-w-sm flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[var(--accent-hex)] uppercase tracking-wider flex items-center gap-1.5">
                  <Grid className="w-3.5 h-3.5" />
                  RCC Cross-Section: Column {selectedCol?.gridX}-{selectedCol?.gridY}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-500/15 text-red-500 font-bold">
                  {selectedCol?.widthMm} × {selectedCol?.depthMm} mm
                </span>
              </div>

              {/* Vector SVG Cross-Section */}
              <svg viewBox="-100 -100 500 700" className="w-64 max-h-[380px]">
                {/* Concrete Boundary */}
                <rect x="0" y="0" width="300" height="500" fill={isDark ? '#1c1c21' : '#f1f5f9'} stroke="#ef4444" strokeWidth="6" />

                {/* Concrete Hatch triangles */}
                <g fill="currentColor" opacity="0.15">
                  <polygon points="50,60 56,70 44,70" />
                  <polygon points="180,120 186,130 174,130" />
                  <polygon points="90,260 96,270 84,270" />
                  <polygon points="210,340 216,350 204,350" />
                  <polygon points="120,440 126,450 114,450" />
                </g>

                {/* Stirrup Link (40mm clear cover) */}
                <rect
                  x="40"
                  y="40"
                  width="220"
                  height="420"
                  rx="10"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="4"
                />

                {/* 135-degree anti-seismic stirrup hooks */}
                <path d="M 60 50 L 40 40 L 75 75" fill="none" stroke="#38bdf8" strokeWidth="4" />

                {/* Main Longitudinal Steel Bars */}
                {/* 8 Bars Configuration */}
                {[
                  { cx: 50, cy: 50 },
                  { cx: 250, cy: 50 },
                  { cx: 50, cy: 250 },
                  { cx: 250, cy: 250 },
                  { cx: 50, cy: 450 },
                  { cx: 250, cy: 450 },
                  { cx: 150, cy: 50 },
                  { cx: 150, cy: 450 },
                ].slice(0, selectedCol?.mainBarsCount || 8).map((bar, i) => (
                  <circle key={`bar-${i}`} cx={bar.cx} cy={bar.cy} r="12" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                ))}

                {/* Callout Annotations */}
                <line x1="250" y1="50" x2="360" y2="30" stroke="#94a3b8" strokeWidth="2" />
                <text x="370" y="34" fontSize="18" fill="#ef4444" fontWeight="bold">
                  {selectedCol?.mainBarsCount} - Ø{selectedCol?.mainBarsDiaMm} mm Fe500
                </text>

                <line x1="260" y1="200" x2="360" y2="200" stroke="#94a3b8" strokeWidth="2" />
                <text x="370" y="204" fontSize="16" fill="#38bdf8" fontWeight="bold">
                  Stirrups Ø{selectedCol?.stirrupDiaMm} @ {selectedCol?.stirrupSpacingMm} c/c
                </text>

                <line x1="0" y1="520" x2="300" y2="520" stroke="#94a3b8" strokeWidth="2" />
                <text x="150" y="540" fontSize="18" textAnchor="middle" fill="#94a3b8">
                  Clear Cover = 40 mm
                </text>
              </svg>

              {/* Steel Weight Summary Card */}
              <div className="w-full max-w-sm mt-3 p-3 rounded-2xl glass-card text-xs space-y-1">
                <div className="flex items-center justify-between text-[11px] opacity-75">
                  <span>Main Bars Weight (L=5.1m):</span>
                  <span className="font-mono font-bold">{rebarSummary.mainSteelKg.toFixed(1)} kg</span>
                </div>
                <div className="flex items-center justify-between text-[11px] opacity-75">
                  <span>Ties / Links Weight:</span>
                  <span className="font-mono font-bold">{rebarSummary.stirrupSteelKg.toFixed(1)} kg</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold pt-1 border-t border-current/10">
                  <span>Total Steel per Column:</span>
                  <span className="text-[var(--accent-hex)] font-mono">{rebarSummary.totalSteelKg.toFixed(1)} kg</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column Parameter Inspector */}
      <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-current/10 glass-panel p-4 flex flex-col gap-4 overflow-y-auto shrink-0 custom-scrollbar">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[var(--accent-hex)]" />
            <span className="font-semibold text-sm">Column Settings</span>
          </div>
          <span className="text-[10px] opacity-60 font-mono">IS 456:2000</span>
        </div>

        {/* Selected Column Dropdown */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium opacity-60">Selected Column ID</label>
          <select
            value={selectedColId}
            onChange={(e) => setSelectedColId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-current/15 bg-transparent text-xs font-semibold cursor-pointer"
          >
            {grid.columns.map((c) => (
              <option key={c.id} value={c.id} className={isDark ? 'bg-zinc-900 text-white' : 'bg-white text-black'}>
                Col {c.gridX}-{c.gridY} ({c.widthMm}×{c.depthMm}mm)
              </option>
            ))}
          </select>
        </div>

        {selectedCol && (
          <div className="space-y-4 text-xs">
            {/* Dimensions Width & Depth */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] opacity-60">Width (X) mm</label>
                <input
                  type="number"
                  step="25"
                  value={selectedCol.widthMm}
                  onChange={(e) => handleUpdateCol({ ...selectedCol, widthMm: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] opacity-60">Depth (Y) mm</label>
                <input
                  type="number"
                  step="25"
                  value={selectedCol.depthMm}
                  onChange={(e) => handleUpdateCol({ ...selectedCol, depthMm: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
                />
              </div>
            </div>

            {/* Footing Dimensions */}
            <div className="pt-2 border-t border-current/10 space-y-2">
              <span className="font-semibold text-xs flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-rose-500" />
                Foundation Pad (IS 456)
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] opacity-60">Pad Width mm</label>
                  <input
                    type="number"
                    step="50"
                    value={selectedCol.footingWidthMm}
                    onChange={(e) => handleUpdateCol({ ...selectedCol, footingWidthMm: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] opacity-60">Pad Length mm</label>
                  <input
                    type="number"
                    step="50"
                    value={selectedCol.footingLengthMm}
                    onChange={(e) => handleUpdateCol({ ...selectedCol, footingLengthMm: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
                  />
                </div>
              </div>
            </div>

            {/* Reinforcement Configuration */}
            <div className="pt-2 border-t border-current/10 space-y-2">
              <span className="font-semibold text-xs flex items-center gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5 text-[var(--accent-hex)]" />
                Reinforcement Steel
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] opacity-60">Bar Count</label>
                  <select
                    value={selectedCol.mainBarsCount}
                    onChange={(e) => handleUpdateCol({ ...selectedCol, mainBarsCount: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent font-semibold cursor-pointer"
                  >
                    <option value="4" className={isDark ? 'bg-zinc-900' : 'bg-white'}>4 nos.</option>
                    <option value="6" className={isDark ? 'bg-zinc-900' : 'bg-white'}>6 nos.</option>
                    <option value="8" className={isDark ? 'bg-zinc-900' : 'bg-white'}>8 nos.</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] opacity-60">Main Bar Dia</label>
                  <select
                    value={selectedCol.mainBarsDiaMm}
                    onChange={(e) => handleUpdateCol({ ...selectedCol, mainBarsDiaMm: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent font-semibold cursor-pointer"
                  >
                    <option value="12" className={isDark ? 'bg-zinc-900' : 'bg-white'}>Ø12 mm</option>
                    <option value="16" className={isDark ? 'bg-zinc-900' : 'bg-white'}>Ø16 mm</option>
                    <option value="20" className={isDark ? 'bg-zinc-900' : 'bg-white'}>Ø20 mm</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="space-y-1">
                  <label className="text-[11px] opacity-60">Stirrup Dia</label>
                  <select
                    value={selectedCol.stirrupDiaMm}
                    onChange={(e) => handleUpdateCol({ ...selectedCol, stirrupDiaMm: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent font-semibold cursor-pointer"
                  >
                    <option value="8" className={isDark ? 'bg-zinc-900' : 'bg-white'}>Ø8 mm</option>
                    <option value="10" className={isDark ? 'bg-zinc-900' : 'bg-white'}>Ø10 mm</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] opacity-60">Spacing c/c</label>
                  <input
                    type="number"
                    step="25"
                    value={selectedCol.stirrupSpacingMm}
                    onChange={(e) => handleUpdateCol({ ...selectedCol, stirrupSpacingMm: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};
