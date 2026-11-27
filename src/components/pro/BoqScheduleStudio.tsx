import React, { useState, useMemo } from 'react';
import {
  Download,
  Printer,
  Sliders,
} from 'lucide-react';
import { BoqSettings, CadLayerId, ProProjectState } from '../../types/pro';
import { ThemeMode } from '../../types';
import { AccentId } from '../../utils/accentTheme';
import { formatArea } from '../../utils/proUnits';
import { exportBoqAsCsv, printGfcSheet, buildGfcSheetSvg } from '../../utils/proExport';

interface BoqScheduleStudioProps {
  project: ProProjectState;
  onUpdateProject: (next: ProProjectState) => void;
  theme: ThemeMode;
  accentId: AccentId;
  activeLayers: CadLayerId[];
}

export const BoqScheduleStudio: React.FC<BoqScheduleStudioProps> = ({
  project,
  onUpdateProject,
  theme,
}) => {
  const isDark = theme === 'blueprint';
  const settings = project.boqSettings;
  const [activeTab, setActiveTab] = useState<'boq' | 'joinery' | 'finishes'>('boq');

  const handleUpdateSettings = (updated: BoqSettings) => {
    onUpdateProject({ ...project, boqSettings: updated });
  };

  // Automated Construction Quantity Takeoff Calculations (Single source of truth)
  const takeoff = useMemo(() => computeBoqTakeoff(project), [project]);

  // Joinery list
  const joineryList = useMemo(() => {
    const map = new Map<string, { width: number; height: number; sill: number; count: number; desc: string }>();

    for (const r of project.rooms) {
      for (const d of r.doors) {
        const prev = map.get(d.tag) || {
          width: d.widthMm,
          height: 2100,
          sill: 0,
          count: 0,
          desc: 'First quality Teak wood frame with 35mm factory flush shutter & brass hardware',
        };
        prev.count++;
        map.set(d.tag, prev);
      }
      for (const w of r.windows) {
        const isVent = w.tag.startsWith('V');
        const prev = map.get(w.tag) || {
          width: w.widthMm,
          height: w.heightMm,
          sill: w.sillMm,
          count: 0,
          desc: isVent
            ? 'Aluminum anodized frame with frosted glass louvers & 150mm exhaust opening'
            : 'UPVC 2.5-track sliding window with stainless steel mosquito mesh & 5mm toughened float glass',
        };
        prev.count++;
        map.set(w.tag, prev);
      }
    }

    return Array.from(map.entries()).map(([tag, data]) => ({ tag, ...data }));
  }, [project.rooms]);

  const handlePrintSheet = () => {
    const dummySvg = `<text x="50" y="50" font-size="6" font-weight="bold">DETAILED BILL OF QUANTITIES &amp; SCHEDULE OF OPENINGS</text>
    <text x="50" y="65" font-size="4">Total Floor Area: ${takeoff.totalFloorAreaSqM.toFixed(1)} m² • Concrete: ${takeoff.totalConcreteCuM.toFixed(1)} m³ • Steel: ${(takeoff.totalSteelKg / 1000).toFixed(2)} MT</text>`;
    const fullSvg = buildGfcSheetSvg(project, dummySvg, 'BILL OF QUANTITIES & JOINERY SCHEDULE');
    printGfcSheet(fullSvg);
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden relative">
      {/* Center Stage: Tables & Schedules */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Header Actions */}
        <div className="p-4 border-b border-current/10 flex items-center justify-between gap-3 bg-current/2">
          {/* Tab Switcher */}
          <div className="p-1 rounded-full glass-pill flex items-center gap-1 text-[11px] font-semibold">
            <button
              onClick={() => setActiveTab('boq')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeTab === 'boq' ? 'glass-pill-active' : 'opacity-65 hover:opacity-100'
              }`}
            >
              Material Takeoff &amp; BOQ
            </button>
            <button
              onClick={() => setActiveTab('joinery')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeTab === 'joinery' ? 'glass-pill-active' : 'opacity-65 hover:opacity-100'
              }`}
            >
              Door &amp; Window Joinery ({joineryList.length} Types)
            </button>
            <button
              onClick={() => setActiveTab('finishes')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeTab === 'finishes' ? 'glass-pill-active' : 'opacity-65 hover:opacity-100'
              }`}
            >
              Room Finish Schedule
            </button>
          </div>

          {/* Export Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportBoqAsCsv(project, takeoff.rows)}
              className="px-3 py-1.5 rounded-full glass-pill text-xs font-semibold flex items-center gap-1.5 hover:text-[var(--accent-hex)] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handlePrintSheet}
              className="px-3.5 py-1.5 rounded-full glass-pill-active text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print GFC Sheet</span>
            </button>
          </div>
        </div>

        {/* Content Table Container */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 custom-scrollbar">
          {/* TAB 1: BOQ TABLE */}
          {activeTab === 'boq' && (
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold tracking-tight">Bill of Quantities (Material Estimate)</h3>
                  <p className="text-xs opacity-60">Computed live from active architectural &amp; structural model</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] opacity-60 block">Estimated Budget</span>
                  <span className="text-lg font-bold font-mono text-[var(--accent-hex)]">
                    ₹{takeoff.grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>


              {/* Visual Cost & Material Breakdown Graphic */}
              <div className="p-4 rounded-2xl border border-current/15 glass-card space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider opacity-70">Cost Distribution Breakdown</span>
                  <span className="font-mono opacity-65">{takeoff.rows.length} Work Packages</span>
                </div>

                {/* Stacked Proportional Cost Bar */}
                <div className="w-full h-4 rounded-full overflow-hidden flex bg-current/10">
                  {takeoff.rows.map((row, idx) => {
                    const pct = takeoff.grandTotal > 0 ? (row.amount / takeoff.grandTotal) * 100 : 0;
                    const palette = ['#38bdf8', '#ef4444', '#f59e0b', '#10b981', '#a855f7', '#ec4899'];
                    return (
                      <div
                        key={`bar-${row.itemNo}`}
                        style={{ width: `${pct}%`, backgroundColor: palette[idx % palette.length] }}
                        title={`${row.desc.slice(0, 32)}: ${pct.toFixed(1)}%`}
                        className="h-full transition-all duration-300"
                      />
                    );
                  })}
                </div>

                {/* Legend Pills with Percentages */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                  {takeoff.rows.map((row, idx) => {
                    const pct = takeoff.grandTotal > 0 ? (row.amount / takeoff.grandTotal) * 100 : 0;
                    const palette = ['#38bdf8', '#ef4444', '#f59e0b', '#10b981', '#a855f7', '#ec4899'];
                    const shortName = row.desc.split(' ')[0] + ' ' + (row.desc.split(' ')[1] || '');
                    return (
                      <div key={`leg-${row.itemNo}`} className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-xl bg-current/[0.03] border border-current/10">
                        <span className="flex items-center gap-1.5 truncate">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: palette[idx % palette.length] }} />
                          <span className="truncate font-medium">{shortName}</span>
                        </span>
                        <span className="font-mono font-bold tabular-nums">{pct.toFixed(0)}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-current/15 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className={isDark ? 'bg-zinc-900/80' : 'bg-slate-100'}>
                    <tr className="border-b border-current/10 text-[11px] font-bold text-slate-500 uppercase">
                      <th className="p-3 w-16">Item</th>
                      <th className="p-3">Description of Work</th>
                      <th className="p-3 w-20 text-center">Unit</th>
                      <th className="p-3 w-24 text-right">Quantity</th>
                      <th className="p-3 w-28 text-right">Rate (₹)</th>
                      <th className="p-3 w-32 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-current/10">
                    {takeoff.rows.map((row) => (
                      <tr key={row.itemNo} className="hover:bg-current/2 transition-colors">
                        <td className="p-3 font-mono font-bold opacity-60">{row.itemNo}</td>
                        <td className="p-3 font-medium leading-relaxed">{row.desc}</td>
                        <td className="p-3 text-center opacity-75">{row.unit}</td>
                        <td className="p-3 text-right font-mono font-bold">{row.qty.toLocaleString('en-IN', { maximumFractionDigits: 1 })}</td>
                        <td className="p-3 text-right font-mono opacity-80">₹{row.rate}</td>
                        <td className="p-3 text-right font-mono font-bold">₹{row.amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                      </tr>
                    ))}
                    <tr className={isDark ? 'bg-zinc-900/50 font-bold' : 'bg-slate-50 font-bold'}>
                      <td colSpan={5} className="p-3 text-right uppercase tracking-wider text-[11px]">
                        Grand Total (Excluding Taxes):
                      </td>
                      <td className="p-3 text-right font-mono text-sm text-[var(--accent-hex)]">
                        ₹{takeoff.grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: JOINERY SCHEDULE */}
          {activeTab === 'joinery' && (
            <div className="max-w-4xl mx-auto space-y-4">
              <div>
                <h3 className="text-base font-bold tracking-tight">Door &amp; Window Joinery Schedule</h3>
                <p className="text-xs opacity-60">Architectural opening dimensions, sill heights, and material specs</p>
              </div>

              <div className="rounded-2xl border border-current/15 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className={isDark ? 'bg-zinc-900/80' : 'bg-slate-100'}>
                    <tr className="border-b border-current/10 text-[11px] font-bold text-slate-500 uppercase">
                      <th className="p-3 w-16">Tag</th>
                      <th className="p-3 w-28">Width × Height</th>
                      <th className="p-3 w-24 text-center">Sill Level</th>
                      <th className="p-3 w-20 text-center">Count</th>
                      <th className="p-3">Specification &amp; Hardware</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-current/10">
                    {joineryList.map((j) => (
                      <tr key={j.tag} className="hover:bg-current/2 transition-colors">
                        <td className="p-3 font-mono font-bold text-[var(--accent-hex)]">{j.tag}</td>
                        <td className="p-3 font-mono font-medium">{j.width} × {j.height} mm</td>
                        <td className="p-3 text-center font-mono opacity-75">{j.sill > 0 ? `+${j.sill} mm` : 'Floor Level (0)'}</td>
                        <td className="p-3 text-center font-bold">{j.count} nos.</td>
                        <td className="p-3 opacity-80 leading-relaxed">{j.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: FINISH SCHEDULE */}
          {activeTab === 'finishes' && (
            <div className="max-w-4xl mx-auto space-y-4">
              <div>
                <h3 className="text-base font-bold tracking-tight">Room Finish Schedule</h3>
                <p className="text-xs opacity-60">Flooring, internal wall finishes, and ceiling specifications per room</p>
              </div>

              <div className="rounded-2xl border border-current/15 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className={isDark ? 'bg-zinc-900/80' : 'bg-slate-100'}>
                    <tr className="border-b border-current/10 text-[11px] font-bold text-slate-500 uppercase">
                      <th className="p-3">Room Name</th>
                      <th className="p-3 w-32">Carpet Area</th>
                      <th className="p-3">Flooring Spec</th>
                      <th className="p-3">Wall Finish</th>
                      <th className="p-3">Ceiling Finish</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-current/10">
                    {project.rooms.map((r) => {
                      const area = ((r.width - 2 * r.wallExtMm) * (r.depth - 2 * r.wallExtMm)) / 1000000;
                      return (
                        <tr key={r.id} className="hover:bg-current/2 transition-colors">
                          <td className="p-3 font-bold">{r.name}</td>
                          <td className="p-3 font-mono text-[var(--accent-hex)] font-bold">{formatArea(area, project.unitSystem)}</td>
                          <td className="p-3 capitalize opacity-85">{r.floorType || 'Vitrified'} tiles (800×800mm)</td>
                          <td className="p-3 opacity-80">Acrylic emulsion over 2 coats cement putty</td>
                          <td className="p-3 opacity-80">Cornice plaster with premium OBD ceiling paint</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Material Rate & Specs Settings Sidebar */}
      <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-current/10 glass-panel p-4 flex flex-col gap-4 overflow-y-auto shrink-0 custom-scrollbar">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[var(--accent-hex)]" />
            <span className="font-semibold text-sm">Rate Analysis</span>
          </div>
          <span className="text-[10px] opacity-60 font-mono">DSR 2026</span>
        </div>

        {/* Rate Controls */}
        <div className="space-y-4 text-xs">
          {/* Brick Type Toggle */}
          <div className="space-y-1">
            <label className="text-[11px] opacity-60">Wall Masonry Material</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleUpdateSettings({ ...settings, brickType: 'clay-brick' })}
                className={`py-1.5 rounded-xl border text-center font-semibold cursor-pointer ${
                  settings.brickType === 'clay-brick' ? 'glass-pill-active border-[var(--accent-hex)]' : 'border-current/15 opacity-60'
                }`}
              >
                Red Clay Bricks
              </button>
              <button
                type="button"
                onClick={() => handleUpdateSettings({ ...settings, brickType: 'aac-block' })}
                className={`py-1.5 rounded-xl border text-center font-semibold cursor-pointer ${
                  settings.brickType === 'aac-block' ? 'glass-pill-active border-[var(--accent-hex)]' : 'border-current/15 opacity-60'
                }`}
              >
                AAC Light Blocks
              </button>
            </div>
          </div>

          {/* Tile Size */}
          <div className="space-y-1">
            <label className="text-[11px] opacity-60">Vitrified Tile Dimension</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleUpdateSettings({ ...settings, tileSizeMm: 600 })}
                className={`py-1.5 rounded-xl border text-center font-semibold cursor-pointer ${
                  settings.tileSizeMm === 600 ? 'glass-pill-active border-[var(--accent-hex)]' : 'border-current/15 opacity-60'
                }`}
              >
                600 × 600 mm
              </button>
              <button
                type="button"
                onClick={() => handleUpdateSettings({ ...settings, tileSizeMm: 800 })}
                className={`py-1.5 rounded-xl border text-center font-semibold cursor-pointer ${
                  settings.tileSizeMm === 800 ? 'glass-pill-active border-[var(--accent-hex)]' : 'border-current/15 opacity-60'
                }`}
              >
                800 × 800 mm
              </button>
            </div>
          </div>

          {/* Steel Rate */}
          <div className="space-y-1">
            <label className="text-[11px] opacity-60">Steel Rate (₹/kg)</label>
            <input
              type="number"
              value={settings.steelRateKg}
              onChange={(e) => handleUpdateSettings({ ...settings, steelRateKg: Number(e.target.value) })}
              className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent font-medium tabular-nums"
            />
          </div>

          {/* Quick Quantity Metric Cards */}
          <div className="pt-2 border-t border-current/10 space-y-2">
            <span className="font-semibold text-xs text-[var(--accent-hex)]">Core Materials Summary</span>
            <div className="p-3 rounded-2xl glass-card space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="opacity-75">Total Concrete Volume:</span>
                <span className="font-mono font-bold">{takeoff.totalConcreteCuM.toFixed(1)} m³</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="opacity-75">TMT Fe500 Reinforcement:</span>
                <span className="font-mono font-bold">{(takeoff.totalSteelKg / 1000).toFixed(2)} MT</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="opacity-75">Wall Masonry Units:</span>
                <span className="font-mono font-bold">{takeoff.brickCount.toLocaleString('en-IN')} units</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="opacity-75">Flooring Tile Count:</span>
                <span className="font-mono font-bold">{takeoff.tileCount} tiles (+10%)</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
