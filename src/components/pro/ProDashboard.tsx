import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Building2,
  Layers,
  FileSpreadsheet,
  Grid,
  Maximize2,
  Wind,
  Compass,
  Download,
  Printer,
  Sun,
  Moon,
  ChevronRight,
  Edit2,
  Check,
} from 'lucide-react';
import { ProModuleId, ProProjectState } from '../../types/pro';
import { ThemeMode, UserProfile } from '../../types';
import { AccentId, ACCENT_THEMES } from '../../utils/accentTheme';
import { formatArea } from '../../utils/proUnits';
import { exportProjectAsDxf, exportGfcSvgSheetFile } from '../../utils/proExport';

interface ProDashboardProps {
  project: ProProjectState;
  onUpdateProject: (next: ProProjectState) => void;
  user?: UserProfile | null;
  theme: ThemeMode;
  onToggleTheme: () => void;
  accentId: AccentId;
  onSelectAccent: (id: AccentId) => void;
  onBackToMainDashboard?: () => void;
  onBackToHome?: () => void;
  onOpenModule: (moduleId: ProModuleId) => void;
}

export const ProDashboard: React.FC<ProDashboardProps> = ({
  project,
  onUpdateProject,
  theme,
  onToggleTheme,
  accentId,
  onSelectAccent,
  onBackToMainDashboard,
  onBackToHome,
  onOpenModule,
}) => {
  const handleBack = onBackToMainDashboard || onBackToHome;
  const isDark = theme === 'blueprint';
  const [isEditingName, setIsEditingName] = useState(false);
  const [projNameInput, setProjNameInput] = useState(project.name);

  // Compute live KPI metrics from project state
  const kpis = useMemo(() => {
    let carpet = 0;
    let minx = Infinity;
    let miny = Infinity;
    let maxx = -Infinity;
    let maxy = -Infinity;

    for (const r of project.rooms) {
      const intW = Math.max(0, r.width - 2 * r.wallExtMm);
      const intD = Math.max(0, r.depth - 2 * r.wallExtMm);
      carpet += (intW * intD) / 1000000;

      minx = Math.min(minx, r.x);
      miny = Math.min(miny, r.y);
      maxx = Math.max(maxx, r.x + r.width);
      maxy = Math.max(maxy, r.y + r.depth);
    }

    const totalWidth = maxx - (minx === Infinity ? 0 : minx);
    const totalDepth = maxy - (miny === Infinity ? 0 : miny);
    const builtUp = (totalWidth * totalDepth) / 1000000;

    // Site / FAR
    const plotAreaSqM = (project.sitePlot.plotWidthMm * project.sitePlot.plotDepthMm) / 1000000;
    const bW = Math.max(0, project.sitePlot.plotWidthMm - project.sitePlot.setbackLeftMm - project.sitePlot.setbackRightMm);
    const bD = Math.max(0, project.sitePlot.plotDepthMm - project.sitePlot.setbackFrontMm - project.sitePlot.setbackRearMm);
    const footprintSqM = (bW * bD) / 1000000;
    const coveragePct = plotAreaSqM > 0 ? (footprintSqM / plotAreaSqM) * 100 : 0;
    const achievedFar = plotAreaSqM > 0 ? (footprintSqM * project.sitePlot.proposedFloors) / plotAreaSqM : 0;

    // Estimated Concrete
    const slabVol = builtUp * ((project.buildingLevels.slabThicknessMm || 125) / 1000);
    const totalConcreteCuM = slabVol + project.columnGrid.columns.length * 1.8;

    const latestRev = project.gfcMeta.revisions[project.gfcMeta.revisions.length - 1] || { rev: 'R2', status: 'GFC' };

    return {
      carpetAreaSqM: carpet,
      builtUpAreaSqM: builtUp,
      plotAreaSqM,
      coveragePct,
      achievedFar,
      totalConcreteCuM,
      latestRev,
    };
  }, [project]);

  const handleSaveProjectName = () => {
    if (projNameInput.trim()) {
      onUpdateProject({ ...project, name: projNameInput.trim() });
    }
    setIsEditingName(false);
  };

  const PRO_MODULE_CARDS: {
    id: ProModuleId;
    title: string;
    badge: string;
    description: string;
    icon: React.ElementType;
    color: string;
  }[] = [
    {
      id: 'floor-plan',
      title: '2D-to-3D Floor Plan Studio',
      badge: 'Interactive CAD',
      description: 'Parametric room layout, wall thicknesses (230/115mm), door swings, window openings & real-time 3D extrusion.',
      icon: Building2,
      color: '#38bdf8',
    },
    {
      id: 'column-grid',
      title: 'Column Grid & RCC Detailing',
      badge: 'IS 456 Structural',
      description: 'Center-line grid bubbles, bay spacing, plinth beams, rebar schedules & automated RCC cross-section detailing.',
      icon: Grid,
      color: '#ef4444',
    },
    {
      id: 'staircase',
      title: 'Staircase Designer',
      badge: 'Vertical Circulation',
      description: 'Dog-legged, L-shaped & Open-well stairs. Auto-checks 2R+T comfort rule, headroom clearance (>2.1m) & waist slab section.',
      icon: Layers,
      color: '#fbbf24',
    },
    {
      id: 'elevation-section',
      title: 'Elevation & Cross-Section',
      badge: 'CAD Material Hatch',
      description: 'Front, Rear, Side Elevations & Section A-A cut. Features standard RL level markers (GL, PL, Sill, Lintel, Roof, Parapet).',
      icon: Maximize2,
      color: '#34d399',
    },
    {
      id: 'mep-overlay',
      title: 'MEP Services Overlay',
      badge: 'BIM Integration',
      description: 'Underlay floor plans with electrical lighting/DB runs, plumbing water supply & drainage slopes (1:60), and HVAC ducts.',
      icon: Wind,
      color: '#a855f7',
    },
    {
      id: 'site-far',
      title: 'Site Plan, Setbacks & FAR',
      badge: 'Municipal Bylaws',
      description: 'Dimensioned site boundaries, road width, front/rear/side setbacks, buildable footprint, Ground Coverage % & FAR index.',
      icon: Compass,
      color: '#f97316',
    },
    {
      id: 'boq-schedule',
      title: 'Live BOQ & Joinery Schedule',
      badge: 'Costing & Takeoff',
      description: 'Instant concrete m³, brick/block counts, plaster area, tile counts, steel tonnage, and tabular Door/Window joinery schedule.',
      icon: FileSpreadsheet,
      color: '#06b6d4',
    },
  ];

  return (
    <div
      className={`min-h-screen w-full flex flex-col font-sans select-none transition-colors duration-300 ${
        isDark ? 'dark bg-[#08080a] text-[#f4f4f6]' : 'bg-[#eceef0] text-[#0d0d10]'
      }`}
    >
      {/* Top Professional Navigation Header */}
      <header className="h-16 px-4 sm:px-8 border-b glass-panel flex items-center justify-between gap-4 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="px-3 py-1.5 rounded-full glass-pill text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer hover:border-current/30"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Main Dashboard</span>
          </button>

          <div className="h-5 w-[1px] bg-current opacity-15" />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white shadow-md">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              {isEditingName ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={projNameInput}
                    onChange={(e) => setProjNameInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveProjectName()}
                    className="px-2 py-0.5 rounded-lg border border-current/25 bg-transparent text-sm font-bold"
                    autoFocus
                  />
                  <button onClick={handleSaveProjectName} className="p-1 rounded-full text-emerald-400 cursor-pointer">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm sm:text-base tracking-tight">{project.name}</span>
                  <button onClick={() => setIsEditingName(true)} className="opacity-40 hover:opacity-100 cursor-pointer">
                    <Edit2 className="w-3 h-3" />
                  </button>
                </div>
              )}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent-hex)] font-mono font-bold">
                PRO BUILDER
              </span>
            </div>
          </div>
        </div>

        {/* Right Settings Strip */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Unit System Toggle (Metric <-> Imperial) */}
          <div className="p-0.5 rounded-full glass-pill flex items-center text-[11px] font-semibold">
            <button
              onClick={() => onUpdateProject({ ...project, unitSystem: 'metric' })}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                project.unitSystem === 'metric' ? 'glass-pill-active' : 'opacity-60 hover:opacity-100'
              }`}
            >
              Metric (m/mm)
            </button>
            <button
              onClick={() => onUpdateProject({ ...project, unitSystem: 'imperial' })}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                project.unitSystem === 'imperial' ? 'glass-pill-active' : 'opacity-60 hover:opacity-100'
              }`}
            >
              Imperial (ft-in)
            </button>
          </div>

          {/* 4-Dot Liquid Accent Switcher */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full glass-pill shadow-inner">
            {ACCENT_THEMES.map((themeCfg) => (
              <button
                key={themeCfg.id}
                type="button"
                onClick={() => onSelectAccent(themeCfg.id)}
                title={themeCfg.label}
                className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${themeCfg.dotClass} ${
                  accentId === themeCfg.id
                    ? 'ring-2 ring-offset-2 ring-current scale-110'
                    : 'opacity-40 hover:opacity-80'
                }`}
              />
            ))}
          </div>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleTheme}
            className="w-8 h-8 rounded-full glass-pill flex items-center justify-center opacity-75 hover:opacity-100 cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar">
        {/* KPI Strip */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl glass-card flex flex-col justify-between">
            <span className="text-[11px] font-semibold opacity-60 uppercase tracking-wider">Built-Up Area</span>
            <div className="mt-2">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--accent-hex)] font-mono">
                {formatArea(kpis.builtUpAreaSqM, project.unitSystem)}
              </span>
              <span className="block text-[10px] opacity-50 mt-0.5">Total plinth footprint</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-card flex flex-col justify-between">
            <span className="text-[11px] font-semibold opacity-60 uppercase tracking-wider">Carpet Area</span>
            <div className="mt-2">
              <span className="text-xl sm:text-2xl font-bold tracking-tight font-mono">
                {formatArea(kpis.carpetAreaSqM, project.unitSystem)}
              </span>
              <span className="block text-[10px] opacity-50 mt-0.5">Internal usable space</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-card flex flex-col justify-between">
            <span className="text-[11px] font-semibold opacity-60 uppercase tracking-wider">Site FAR Index</span>
            <div className="mt-2">
              <span className="text-xl sm:text-2xl font-bold tracking-tight font-mono text-emerald-400">
                {kpis.achievedFar.toFixed(2)}
              </span>
              <span className="block text-[10px] opacity-50 mt-0.5">
                Coverage: {kpis.coveragePct.toFixed(1)}% (Max {project.sitePlot.maxGroundCoveragePct}%)
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-card flex flex-col justify-between">
            <span className="text-[11px] font-semibold opacity-60 uppercase tracking-wider">Est. Concrete</span>
            <div className="mt-2">
              <span className="text-xl sm:text-2xl font-bold tracking-tight font-mono">
                {kpis.totalConcreteCuM.toFixed(1)} m³
              </span>
              <span className="block text-[10px] opacity-50 mt-0.5">Footings + Columns + Slabs</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-card flex flex-col justify-between col-span-2 md:col-span-1">
            <span className="text-[11px] font-semibold opacity-60 uppercase tracking-wider">Release Status</span>
            <div className="mt-2">
              <span className="text-xl sm:text-2xl font-bold tracking-tight font-mono text-rose-400">
                {kpis.latestRev.rev} ({kpis.latestRev.status})
              </span>
              <span className="block text-[10px] opacity-50 mt-0.5">IS / AIA GFC Compliant</span>
            </div>
          </div>
        </section>

        {/* 7 Professional Builders Modules Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">Professional Drawing &amp; Engineering Studios</h2>
              <p className="text-xs opacity-60">Complete architectural, structural, MEP, and estimation suites</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => exportProjectAsDxf(project)}
                className="px-3 py-1.5 rounded-full glass-pill text-xs font-semibold flex items-center gap-1.5 cursor-pointer hover:border-current/30"
              >
                <Download className="w-3.5 h-3.5 text-sky-400" />
                <span>Export .DXF</span>
              </button>
              <button
                onClick={() => exportGfcSvgSheetFile(project, '<text x="100" y="100">GFC SHEET</text>', project.name)}
                className="px-3 py-1.5 rounded-full glass-pill text-xs font-semibold flex items-center gap-1.5 cursor-pointer hover:border-current/30"
              >
                <Printer className="w-3.5 h-3.5 text-emerald-400" />
                <span>GFC Sheet</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRO_MODULE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => onOpenModule(card.id)}
                  className="p-5 rounded-3xl glass-card hover:border-[var(--accent-hex)] transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-sm hover:shadow-xl"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${card.color}20`, color: card.color }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border border-current/15 opacity-75">
                        {card.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-base group-hover:text-[var(--accent-hex)] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs opacity-65 mt-1 leading-relaxed line-clamp-2">
                        {card.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-current/10 flex items-center justify-between text-xs font-semibold text-[var(--accent-hex)]">
                    <span>Launch Studio</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};
