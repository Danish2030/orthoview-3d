import React, { useState, useMemo } from 'react';
import {
  Sliders,
  Scissors,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react';
import { BuildingLevels, CadLayerId, ProProjectState } from '../../types/pro';
import { ThemeMode } from '../../types';
import { AccentId, getAccentConfig } from '../../utils/accentTheme';
import { formatLength } from '../../utils/proUnits';

interface ElevationSectionStudioProps {
  project: ProProjectState;
  onUpdateProject: (next: ProProjectState) => void;
  theme: ThemeMode;
  accentId: AccentId;
  activeLayers: CadLayerId[];
}

export const ElevationSectionStudio: React.FC<ElevationSectionStudioProps> = ({
  project,
  onUpdateProject,
  theme,
  accentId,
}) => {
  const isDark = theme === 'blueprint';
  const levels = project.buildingLevels;
  const [viewMode, setViewMode] = useState<'front' | 'rear' | 'side' | 'section'>('front');
  const [zoom, setZoom] = useState<number>(1);
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);
  const accentHex = accentId === 'mono' ? (isDark ? '#38bdf8' : '#0284c7') : getAccentConfig(accentId).hex;

  // Compute building bounds from rooms
  const { totalWidthMm, totalDepthMm } = useMemo(() => {
    let minx = Infinity;
    let miny = Infinity;
    let maxx = -Infinity;
    let maxy = -Infinity;

    for (const r of project.rooms) {
      minx = Math.min(minx, r.x);
      miny = Math.min(miny, r.y);
      maxx = Math.max(maxx, r.x + r.width);
      maxy = Math.max(maxy, r.y + r.depth);
    }

    return {
      totalWidthMm: maxx - (minx === Infinity ? 0 : minx),
      totalDepthMm: maxy - (miny === Infinity ? 0 : miny),
    };
  }, [project.rooms]);

  const handleUpdateLevels = (updated: BuildingLevels) => {
    onUpdateProject({ ...project, buildingLevels: updated });
  };

  const spanMm = viewMode === 'side' ? totalDepthMm : totalWidthMm;
  const plinth = levels.plinthHeightMm;
  const floorH = levels.floorHeightMm;
  const slabT = levels.slabThicknessMm;
  const parapet = levels.parapetHeightMm;
  const totalHeightAboveGl = plinth + levels.numFloors * (floorH + slabT) + parapet;


  const baseVbX = -3800;
  const baseVbY = -(totalHeightAboveGl + 950);
  const baseVbW = spanMm + 5600;
  const baseVbH = totalHeightAboveGl + 2150;
  const vbW = baseVbW / zoom;
  const vbH = baseVbH / zoom;
  const vbX = (baseVbX + baseVbW / 2) - vbW / 2;
  const vbY = (baseVbY + baseVbH / 2) - vbH / 2;

  const roofTopY = -(plinth + levels.numFloors * (floorH + slabT));

  const levelMarkers = [
    { label: 'GROUND LEVEL (GL)', y: 0, val: '±0.00 m' },
    { label: 'PLINTH LEVEL (PL)', y: -plinth, val: `+${(plinth / 1000).toFixed(2)} m` },
    { label: 'SILL LEVEL', y: -(plinth + levels.sillLevelMm), val: `+${((plinth + levels.sillLevelMm) / 1000).toFixed(2)} m` },
    { label: 'LINTEL LEVEL', y: -(plinth + levels.lintelLevelMm), val: `+${((plinth + levels.lintelLevelMm) / 1000).toFixed(2)} m` },
    { label: 'ROOF SLAB LEVEL', y: roofTopY, val: `+${(Math.abs(roofTopY) / 1000).toFixed(2)} m` },
    { label: 'PARAPET TOP', y: -totalHeightAboveGl, val: `+${(totalHeightAboveGl / 1000).toFixed(2)} m` },
  ];

  return (
    <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden relative">
      {/* Center Drafting Stage */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Mode Selector Bar (Dedicated Header Strip — Never Overlaps Drawing) */}
        <div className="px-4 pt-3 pb-2 z-20 flex flex-wrap items-center justify-between gap-2 border-b border-current/10 bg-current/[0.02]">
          <div className="flex flex-wrap items-center gap-2">
            <div className="p-1 rounded-full glass-pill flex items-center gap-1 text-[11px] font-semibold shadow-sm">
              {(['front', 'rear', 'side', 'section'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === mode ? 'glass-pill-active' : 'opacity-65 hover:opacity-100'
                  }`}
                >
                  {mode === 'section' && <Scissors className="w-3 h-3 text-rose-500" />}
                  <span>
                    {mode === 'front'
                      ? 'Front Elevation'
                      : mode === 'rear'
                        ? 'Rear Elevation'
                        : mode === 'side'
                          ? 'Side Elevation'
                          : 'Cross-Section A-A'}
                  </span>
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill text-[11px] font-semibold">
              <span className="opacity-65">Total Height:</span>
              <span style={{ color: accentHex }} className="font-bold tabular-nums">
                {formatLength(totalHeightAboveGl, project.unitSystem)}
              </span>
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

        {/* Elevation / Section SVG Canvas (Full Height Visible!) */}
        <div className="flex-1 flex items-center justify-center h-full p-4 overflow-hidden">
          <svg
            viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full max-h-[82vh]"
          >
            <defs>
              {/* 1. Brickwork Hatch */}
              <pattern id="elevBrick" width="360" height="180" patternUnits="userSpaceOnUse">
                <rect width="360" height="180" fill="none" stroke="#64748b" strokeWidth="14" strokeOpacity="0.45" />
                <line x1="180" y1="0" x2="180" y2="180" stroke="#64748b" strokeWidth="14" strokeOpacity="0.45" />
              </pattern>

              {/* 2. Concrete Hatch */}
              <pattern id="concreteHatch" width="240" height="240" patternUnits="userSpaceOnUse">
                <polygon points="35,45 48,68 22,68" fill={isDark ? '#94a3b8' : '#334155'} opacity="0.45" />
                <polygon points="165,135 178,158 152,158" fill={isDark ? '#94a3b8' : '#334155'} opacity="0.45" />
                <circle cx="110" cy="190" r="8" fill={isDark ? '#94a3b8' : '#334155'} opacity="0.4" />
                <circle cx="200" cy="60" r="7" fill={isDark ? '#94a3b8' : '#334155'} opacity="0.4" />
              </pattern>

              {/* 3. Earth Fill Hatch below Ground Level */}
              <pattern id="earthHatch" width="280" height="280" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="280" y2="0" stroke="#64748b" strokeWidth="22" strokeOpacity="0.35" />
                <line x1="0" y1="140" x2="280" y2="140" stroke="#64748b" strokeWidth="18" strokeOpacity="0.3" strokeDasharray="35 30" />
              </pattern>
            </defs>

            {/* Natural Ground Level (GL) & Earth Fill */}
            <rect x="-1200" y="0" width={spanMm + 2400} height="850" fill="url(#earthHatch)" />
            <line x1="-1200" y1="0" x2={spanMm + 1200} y2="0" stroke={isDark ? '#94a3b8' : '#334155'} strokeWidth="45" />

            {/* Section Footings below GL (visible in Cross-Section A-A) */}
            {viewMode === 'section' && (
              <g>
                {[0, spanMm * 0.55, spanMm - 230].map((fx, idx) => (
                  <g key={`ftg-${idx}`}>
                    <rect
                      x={fx - 260}
                      y="320"
                      width="750"
                      height="240"
                      fill="url(#concreteHatch)"
                      stroke={isDark ? '#e4e4e7' : '#0f172a'}
                      strokeWidth="30"
                    />
                    <rect
                      x={fx}
                      y="0"
                      width="230"
                      height="320"
                      fill={isDark ? '#27272a' : '#cbd5e1'}
                      stroke={isDark ? '#e4e4e7' : '#0f172a'}
                      strokeWidth="28"
                    />
                  </g>
                ))}
              </g>
            )}

            {/* Plinth Masonry */}
            <rect
              x="0"
              y={-plinth}
              width={spanMm}
              height={plinth}
              fill={isDark ? '#27272a' : '#cbd5e1'}
              stroke={isDark ? '#e4e4e7' : '#0f172a'}
              strokeWidth="40"
            />

            {/* Entrance Plinth Steps on Front Elevation */}
            {viewMode === 'front' && (
              <g>
                <rect x={spanMm * 0.4 - 120} y={-plinth * 0.66} width="1440" height={plinth * 0.33} fill={isDark ? '#3f3f46' : '#e2e8f0'} stroke={isDark ? '#e4e4e7' : '#0f172a'} strokeWidth="25" />
                <rect x={spanMm * 0.4 - 220} y={-plinth * 0.33} width="1640" height={plinth * 0.33} fill={isDark ? '#3f3f46' : '#f1f5f9'} stroke={isDark ? '#e4e4e7' : '#0f172a'} strokeWidth="25" />
              </g>
            )}

            {/* Main Building Floors */}
            {Array.from({ length: levels.numFloors }).map((_, floorIdx) => {
              const floorBaseY = -(plinth + floorIdx * (floorH + slabT));
              const floorTopY = floorBaseY - floorH;
              const slabTopY = floorTopY - slabT;

              return (
                <g key={`floor-${floorIdx}`}>
                  {/* Exterior Wall / Cut Wall */}
                  <rect
                    x="0"
                    y={floorTopY}
                    width={spanMm}
                    height={floorH}
                    fill={viewMode === 'section' ? (isDark ? '#141418' : '#ffffff') : isDark ? '#18181b' : '#ffffff'}
                    stroke={isDark ? '#e4e4e7' : '#0f172a'}
                    strokeWidth="45"
                  />

                  {/* Elevation Openings (Doors, Windows with Mullions & Sunshades) */}
                  {viewMode !== 'section' && (
                    <g>
                      {floorIdx === 0 && viewMode === 'front' && (
                        <g>
                          {/* Main Door Frame & Panels */}
                          <rect
                            x={spanMm * 0.4}
                            y={floorBaseY - 2100}
                            width="1200"
                            height="2100"
                            fill="#f59e0b"
                            fillOpacity="0.14"
                            stroke="#d97706"
                            strokeWidth="36"
                          />
                          <line x1={spanMm * 0.4 + 600} y1={floorBaseY - 2100} x2={spanMm * 0.4 + 600} y2={floorBaseY} stroke="#d97706" strokeWidth="22" />
                          <circle cx={spanMm * 0.4 + 520} cy={floorBaseY - 1050} r="32" fill="#d97706" />
                          <circle cx={spanMm * 0.4 + 680} cy={floorBaseY - 1050} r="32" fill="#d97706" />
                          {/* Door Chajja / Lintel Hood */}
                          <rect x={spanMm * 0.4 - 160} y={floorBaseY - 2240} width="1520" height="120" fill={isDark ? '#3f3f46' : '#cbd5e1'} stroke={isDark ? '#e4e4e7' : '#0f172a'} strokeWidth="24" />
                        </g>
                      )}

                      {/* Left & Right Glazed Windows with Mullions & Chajja */}
                      {[
                        { wx: spanMm * 0.12, ww: 1500 },
                        { wx: spanMm * 0.72, ww: 1500 },
                      ].map((win, wi) => {
                        const wy = floorBaseY - levels.lintelLevelMm;
                        const wh = Math.max(600, levels.lintelLevelMm - levels.sillLevelMm);
                        return (
                          <g key={`win-${floorIdx}-${wi}`}>
                            <rect
                              x={win.wx}
                              y={wy}
                              width={win.ww}
                              height={wh}
                              fill={accentHex}
                              fillOpacity="0.16"
                              stroke={accentHex}
                              strokeWidth="34"
                            />
                            {/* Mullions */}
                            <line x1={win.wx + win.ww / 3} y1={wy} x2={win.wx + win.ww / 3} y2={wy + wh} stroke={accentHex} strokeWidth="18" />
                            <line x1={win.wx + (win.ww * 2) / 3} y1={wy} x2={win.wx + (win.ww * 2) / 3} y2={wy + wh} stroke={accentHex} strokeWidth="18" />
                            <line x1={win.wx} y1={wy + wh / 2} x2={win.wx + win.ww} y2={wy + wh / 2} stroke={accentHex} strokeWidth="16" />
                            {/* Chajja Sunshade */}
                            <rect x={win.wx - 150} y={wy - 110} width={win.ww + 300} height="100" fill={isDark ? '#3f3f46' : '#cbd5e1'} stroke={isDark ? '#e4e4e7' : '#0f172a'} strokeWidth="22" />
                            {/* Sill projection */}
                            <rect x={win.wx - 60} y={wy + wh} width={win.ww + 120} height="75" fill={isDark ? '#3f3f46' : '#cbd5e1'} stroke={isDark ? '#e4e4e7' : '#0f172a'} strokeWidth="20" />
                          </g>
                        );
                      })}
                    </g>
                  )}

                  {/* Cut-through Walls & Room Labels on Cross-Section A-A */}
                  {viewMode === 'section' && (
                    <g>
                      {/* Left & Right Cut Exterior Brick Walls (230mm) */}
                      <rect x="0" y={floorTopY} width="230" height={floorH} fill="url(#elevBrick)" stroke={isDark ? '#e4e4e7' : '#0f172a'} strokeWidth="32" />
                      <rect x={spanMm - 230} y={floorTopY} width="230" height={floorH} fill="url(#elevBrick)" stroke={isDark ? '#e4e4e7' : '#0f172a'} strokeWidth="32" />
                      {/* Internal Partition Wall */}
                      <rect x={spanMm * 0.55} y={floorTopY} width="150" height={floorH} fill="url(#elevBrick)" stroke={isDark ? '#e4e4e7' : '#0f172a'} strokeWidth="28" />
                      {/* Interior Door Cut */}
                      <rect x={spanMm * 0.55} y={floorBaseY - 2100} width="150" height="2100" fill={isDark ? '#09090b' : '#ffffff'} stroke="#d97706" strokeWidth="26" />
                      {/* Room Callouts */}
                      <text x={spanMm * 0.28} y={floorTopY + floorH * 0.52} fontSize="150" fontWeight="700" textAnchor="middle" fill={isDark ? '#94a3b8' : '#475569'}>
                        LIVING / HALL (F{floorIdx + 1})
                      </text>
                      <text x={spanMm * 0.77} y={floorTopY + floorH * 0.52} fontSize="150" fontWeight="700" textAnchor="middle" fill={isDark ? '#94a3b8' : '#475569'}>
                        BEDROOM (F{floorIdx + 1})
                      </text>
                    </g>
                  )}

                  {/* RCC Roof Slab with Chajja Projection */}
                  <rect
                    x="-350"
                    y={slabTopY}
                    width={spanMm + 700}
                    height={slabT}
                    fill="url(#concreteHatch)"
                    stroke={isDark ? '#e4e4e7' : '#0f172a'}
                    strokeWidth="36"
                  />
                </g>
              );
            })}

            {/* Parapet Wall & Coping */}
            <rect
              x="0"
              y={-totalHeightAboveGl}
              width={spanMm}
              height={parapet}
              fill={isDark ? '#27272a' : '#e2e8f0'}
              stroke={isDark ? '#e4e4e7' : '#0f172a'}
              strokeWidth="40"
            />
            <rect
              x="-80"
              y={-totalHeightAboveGl - 80}
              width={spanMm + 160}
              height="80"
              fill={isDark ? '#3f3f46' : '#cbd5e1'}
              stroke={isDark ? '#e4e4e7' : '#0f172a'}
              strokeWidth="26"
            />

            {/* Overall Width Dimension on Top */}
            <g stroke={isDark ? '#94a3b8' : '#475569'} fill={isDark ? '#e2e8f0' : '#0f172a'} strokeWidth="22">
              <line x1="0" y1={-totalHeightAboveGl - 420} x2={spanMm} y2={-totalHeightAboveGl - 420} />
              <line x1="0" y1={-totalHeightAboveGl - 520} x2="0" y2={-totalHeightAboveGl - 320} />
              <line x1={spanMm} y1={-totalHeightAboveGl - 520} x2={spanMm} y2={-totalHeightAboveGl - 320} />
              <text x={spanMm / 2} y={-totalHeightAboveGl - 490} fontSize="155" fontWeight="800" textAnchor="middle" stroke="none">
                BUILDING SPAN: {formatLength(spanMm, project.unitSystem)}
              </text>
            </g>

            {/* Standard Architectural Level Markers (Left Side — Fully Inside ViewBox & High Contrast) */}
            {levelMarkers.map((lvl, idx) => {
              const isHov = hoveredLevel === lvl.label;
              return (
                <g
                  key={`lvl-${idx}`}
                  transform={`translate(-550, ${lvl.y})`}
                  onMouseEnter={() => setHoveredLevel(lvl.label)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  className="cursor-pointer"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2={spanMm + 1250}
                    y2="0"
                    stroke={isHov ? accentHex : '#94a3b8'}
                    strokeWidth={isHov ? '28' : '16'}
                    strokeDasharray="55 35"
                    opacity={isHov ? 0.95 : 0.55}
                  />
                  <polygon points="0,0 -95,-45 -95,45" fill={isHov ? accentHex : isDark ? '#e4e4e7' : '#0f172a'} />
                  <circle
                    cx="-185"
                    cy="0"
                    r="82"
                    fill={isDark ? '#09090b' : '#ffffff'}
                    stroke={isHov ? accentHex : isDark ? '#e4e4e7' : '#0f172a'}
                    strokeWidth="22"
                  />
                  <text x="-185" y="30" fontSize="92" fontWeight="800" textAnchor="middle" fill={isDark ? '#f4f4f6' : '#0f172a'}>
                    {idx + 1}
                  </text>
                  <text x="-300" y="-18" fontSize="125" fontWeight="700" textAnchor="end" fill={isDark ? '#f4f4f6' : '#0f172a'}>
                    {lvl.label}
                  </text>
                  <text x="-300" y="118" fontSize="135" fontWeight="800" textAnchor="end" fill={accentHex}>
                    RL {lvl.val}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Right Building Levels Inspector */}
      <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-current/10 glass-panel p-4 flex flex-col gap-4 overflow-y-auto shrink-0 custom-scrollbar">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[var(--accent-hex)]" />
            <span className="font-semibold text-sm">Level Heights</span>
          </div>
          <span className="text-[10px] opacity-60 font-mono">IS 962 CAD</span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="space-y-1">
            <label className="text-[11px] opacity-60">Number of Storeys</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleUpdateLevels({ ...levels, numFloors: 1 })}
                className={`py-1.5 rounded-xl border text-center font-semibold cursor-pointer ${
                  levels.numFloors === 1 ? 'glass-pill-active border-[var(--accent-hex)]' : 'border-current/15 opacity-60'
                }`}
              >
                G Only (Single)
              </button>
              <button
                type="button"
                onClick={() => handleUpdateLevels({ ...levels, numFloors: 2 })}
                className={`py-1.5 rounded-xl border text-center font-semibold cursor-pointer ${
                  levels.numFloors === 2 ? 'glass-pill-active border-[var(--accent-hex)]' : 'border-current/15 opacity-60'
                }`}
              >
                G + 1 (Two Storey)
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] opacity-60">Plinth Height above GL (mm)</label>
            <input
              type="number"
              step="50"
              value={levels.plinthHeightMm}
              onChange={(e) => handleUpdateLevels({ ...levels, plinthHeightMm: Math.max(300, Number(e.target.value)) })}
              className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] opacity-60">Floor-to-Ceiling Clear Height (mm)</label>
            <input
              type="number"
              step="100"
              value={levels.floorHeightMm}
              onChange={(e) => handleUpdateLevels({ ...levels, floorHeightMm: Math.max(2400, Number(e.target.value)) })}
              className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[11px] opacity-60">Sill Level mm</label>
              <input
                type="number"
                step="50"
                value={levels.sillLevelMm}
                onChange={(e) => handleUpdateLevels({ ...levels, sillLevelMm: Math.max(600, Number(e.target.value)) })}
                className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] opacity-60">Lintel Level mm</label>
              <input
                type="number"
                step="50"
                value={levels.lintelLevelMm}
                onChange={(e) => handleUpdateLevels({ ...levels, lintelLevelMm: Math.max(1800, Number(e.target.value)) })}
                className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[11px] opacity-60">Roof Slab mm</label>
              <input
                type="number"
                step="25"
                value={levels.slabThicknessMm}
                onChange={(e) => handleUpdateLevels({ ...levels, slabThicknessMm: Math.max(100, Number(e.target.value)) })}
                className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] opacity-60">Parapet mm</label>
              <input
                type="number"
                step="50"
                value={levels.parapetHeightMm}
                onChange={(e) => handleUpdateLevels({ ...levels, parapetHeightMm: Math.max(600, Number(e.target.value)) })}
                className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
              />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};