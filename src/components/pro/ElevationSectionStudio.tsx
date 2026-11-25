import React, { useState, useMemo } from 'react';
import {
  Sliders,
  Scissors,
} from 'lucide-react';
import { BuildingLevels, CadLayerId, ProProjectState } from '../../types/pro';
import { ThemeMode } from '../../types';
import { AccentId } from '../../utils/accentTheme';
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
}) => {
  const isDark = theme === 'blueprint';
  const levels = project.buildingLevels;
  const [viewMode, setViewMode] = useState<'front' | 'rear' | 'side' | 'section'>('front');

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

  return (
    <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden relative">
      {/* Center Drafting Stage */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Mode Selector */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <div className="p-1 rounded-full glass-pill flex items-center gap-1 text-[11px] font-semibold shadow-lg">
            <button
              onClick={() => setViewMode('front')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                viewMode === 'front' ? 'glass-pill-active' : 'opacity-65 hover:opacity-100'
              }`}
            >
              Front Elevation
            </button>
            <button
              onClick={() => setViewMode('rear')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                viewMode === 'rear' ? 'glass-pill-active' : 'opacity-65 hover:opacity-100'
              }`}
            >
              Rear Elevation
            </button>
            <button
              onClick={() => setViewMode('side')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                viewMode === 'side' ? 'glass-pill-active' : 'opacity-65 hover:opacity-100'
              }`}
            >
              Side Elevation
            </button>
            <button
              onClick={() => setViewMode('section')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'section' ? 'glass-pill-active' : 'opacity-65 hover:opacity-100'
              }`}
            >
              <Scissors className="w-3 h-3 text-red-500" />
              <span>Cross-Section A-A</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill text-[11px] font-semibold shadow-md">
            <span className="opacity-60">Total Height:</span>
            <span className="text-[var(--accent-hex)] font-bold">{formatLength(totalHeightAboveGl, project.unitSystem)}</span>
          </div>
        </div>

        {/* Elevation / Section SVG Canvas */}
        <div className="flex-1 flex items-center justify-center h-full p-4 overflow-hidden">
          <svg
            viewBox={`-2000 -1200 ${spanMm + 4000} ${totalHeightAboveGl + 2500}`}
            className="w-full h-full max-h-[85vh]"
          >
            <defs>
              {/* Material Hatch Patterns */}
              {/* 1. Brickwork Hatch */}
              <pattern id="elevBrick" width="400" height="200" patternUnits="userSpaceOnUse">
                <rect width="400" height="200" fill="none" stroke="#64748b" strokeWidth="15" strokeOpacity="0.4" />
                <line x1="200" y1="0" x2="200" y2="200" stroke="#64748b" strokeWidth="15" strokeOpacity="0.4" />
              </pattern>

              {/* 2. Concrete Hatch (Stipple triangles) */}
              <pattern id="concreteHatch" width="300" height="300" patternUnits="userSpaceOnUse">
                <polygon points="40,50 46,60 34,60" fill="currentColor" opacity="0.3" />
                <polygon points="180,140 186,150 174,150" fill="currentColor" opacity="0.3" />
                <circle cx="120" cy="220" r="4" fill="currentColor" opacity="0.3" />
                <circle cx="240" cy="70" r="3" fill="currentColor" opacity="0.3" />
              </pattern>

              {/* 3. Earth Fill Hatch below Ground Level */}
              <pattern id="earthHatch" width="300" height="300" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="300" y2="0" stroke="#64748b" strokeWidth="25" strokeOpacity="0.3" />
                <line x1="0" y1="150" x2="300" y2="150" stroke="#64748b" strokeWidth="25" strokeOpacity="0.3" strokeDasharray="30 30" />
              </pattern>
            </defs>

            {/* Natural Ground Level (GL) & Earth Fill */}
            <rect x="-1500" y="0" width={spanMm + 3000} height="800" fill="url(#earthHatch)" />
            <line x1="-1500" y1="0" x2={spanMm + 1500} y2="0" stroke="#64748b" strokeWidth="40" />

            {/* Plinth Wall */}
            <rect
              x="0"
              y={-plinth}
              width={spanMm}
              height={plinth}
              fill={isDark ? '#27272a' : '#cbd5e1'}
              stroke={isDark ? '#e4e4e7' : '#0f172a'}
              strokeWidth="40"
            />

            {/* Plinth Line Offset */}
            <line x1="-800" y1={-plinth} x2={spanMm + 800} y2={-plinth} stroke="#38bdf8" strokeWidth="30" strokeDasharray="60 30" />

            {/* Main Building Floors */}
            {Array.from({ length: levels.numFloors }).map((_, floorIdx) => {
              const floorBaseY = -(plinth + floorIdx * (floorH + slabT));
              const floorTopY = floorBaseY - floorH;
              const slabTopY = floorTopY - slabT;

              return (
                <g key={`floor-${floorIdx}`}>
                  {/* Floor Exterior Wall / Cut Surface */}
                  <rect
                    x="0"
                    y={floorTopY}
                    width={spanMm}
                    height={floorH}
                    fill={viewMode === 'section' ? 'url(#elevBrick)' : isDark ? '#18181b' : '#f8fafc'}
                    stroke={isDark ? '#e4e4e7' : '#0f172a'}
                    strokeWidth="45"
                  />

                  {/* Windows / Doors on Elevation */}
                  {viewMode !== 'section' && (
                    <g>
                      {/* Main Door / French Window on ground floor */}
                      {floorIdx === 0 && (
                        <rect
                          x={spanMm * 0.4}
                          y={floorBaseY - 2100}
                          width="1200"
                          height="2100"
                          fill="#fbbf24"
                          fillOpacity="0.15"
                          stroke="#fbbf24"
                          strokeWidth="35"
                        />
                      )}
                      {/* Glazed Windows */}
                      <rect
                        x={spanMm * 0.15}
                        y={floorBaseY - levels.lintelLevelMm}
                        width="1500"
                        height={levels.lintelLevelMm - levels.sillLevelMm}
                        fill="#38bdf8"
                        fillOpacity="0.2"
                        stroke="#38bdf8"
                        strokeWidth="35"
                      />
                      <rect
                        x={spanMm * 0.72}
                        y={floorBaseY - levels.lintelLevelMm}
                        width="1400"
                        height={levels.lintelLevelMm - levels.sillLevelMm}
                        fill="#38bdf8"
                        fillOpacity="0.2"
                        stroke="#38bdf8"
                        strokeWidth="35"
                      />
                    </g>
                  )}

                  {/* Cut-through Internal Rooms on Section A-A */}
                  {viewMode === 'section' && (
                    <g>
                      {/* Internal Partition Wall 115mm cut */}
                      <rect
                        x={spanMm * 0.55}
                        y={floorTopY}
                        width="230"
                        height={floorH}
                        fill="url(#elevBrick)"
                        stroke="#0f172a"
                        strokeWidth="35"
                      />
                      {/* Interior Door cut */}
                      <rect
                        x={spanMm * 0.55}
                        y={floorBaseY - 2100}
                        width="230"
                        height="2100"
                        fill={isDark ? '#09090b' : '#ffffff'}
                        stroke="#fbbf24"
                        strokeWidth="30"
                      />
                    </g>
                  )}

                  {/* RCC Roof Slab with Chajja / Sunshade projection */}
                  <rect
                    x="-300"
                    y={slabTopY}
                    width={spanMm + 600}
                    height={slabT}
                    fill="url(#concreteHatch)"
                    stroke={isDark ? '#e4e4e7' : '#0f172a'}
                    strokeWidth="35"
                  />
                </g>
              );
            })}

            {/* Parapet Wall & Coping */}
            <rect
              x="0"
              y={-(plinth + levels.numFloors * (floorH + slabT) + parapet)}
              width={spanMm}
              height={parapet}
              fill={isDark ? '#27272a' : '#e2e8f0'}
              stroke={isDark ? '#e4e4e7' : '#0f172a'}
              strokeWidth="40"
            />
            {/* Coping Stone */}
            <rect
              x="-60"
              y={-(plinth + levels.numFloors * (floorH + slabT) + parapet + 60)}
              width={spanMm + 120}
              height="60"
              fill={isDark ? '#3f3f46' : '#cbd5e1'}
              stroke="#0f172a"
              strokeWidth="25"
            />

            {/* Standard Architectural Level Markers (Left side) */}
            {[
              { label: 'NATURAL GROUND LEVEL (GL)', y: 0, val: '±0.00' },
              { label: 'PLINTH LEVEL (PL)', y: -plinth, val: `+${(plinth / 1000).toFixed(2)}m` },
              { label: 'SILL LEVEL', y: -(plinth + levels.sillLevelMm), val: `+${((plinth + levels.sillLevelMm) / 1000).toFixed(2)}m` },
              { label: 'LINTEL LEVEL', y: -(plinth + levels.lintelLevelMm), val: `+${((plinth + levels.lintelLevelMm) / 1000).toFixed(2)}m` },
              { label: 'ROOF SLAB LEVEL', y: -(plinth + floorH), val: `+${((plinth + floorH) / 1000).toFixed(2)}m` },
              { label: 'PARAPET COPING LEVEL', y: -totalHeightAboveGl, val: `+${(totalHeightAboveGl / 1000).toFixed(2)}m` },
            ].map((lvl, idx) => (
              <g key={`lvl-${idx}`} transform={`translate(-500, ${lvl.y})`}>
                {/* Horizontal reference dash line */}
                <line x1="0" y1="0" x2={spanMm + 1000} y2="0" stroke="#94a3b8" strokeWidth="15" strokeDasharray="40 30" opacity="0.6" />
                {/* Architectural Arrow Marker */}
                <polygon points="0,0 -80,-40 -80,40" fill="#0f172a" stroke="#ffffff" strokeWidth="10" />
                <circle cx="-160" cy="0" r="70" fill={isDark ? '#09090b' : '#ffffff'} stroke="#0f172a" strokeWidth="20" />
                <text x="-160" y="25" fontSize="80" fontWeight="bold" textAnchor="middle" fill="currentColor">
                  {idx + 1}
                </text>
                {/* Level Title & RL Value */}
                <text x="-260" y="-15" fontSize="110" fontWeight="bold" textAnchor="end" fill="currentColor">
                  {lvl.label}
                </text>
                <text x="-260" y="110" fontSize="130" fontWeight="800" textAnchor="end" fill="var(--accent-hex)">
                  RL {lvl.val}
                </text>
              </g>
            ))}
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
