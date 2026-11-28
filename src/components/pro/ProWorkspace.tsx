import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Layers,
  Settings,
  Download,
  Printer,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Home,
  Grid,
  TrendingUp,
  Columns,
  Cpu,
  Compass,
  FileSpreadsheet,
  Check,
  X,
  FileCode,
  FileText,
  Undo2,
  Redo2,
} from 'lucide-react';
import {
  ProProjectState,
  ProModuleId,
  CadLayerId,
  DEFAULT_CAD_LAYERS,
  ThemeMode,
} from '../../types';
import { AccentId, ACCENT_THEMES } from '../../utils/accentTheme';
import {
  exportProjectAsDxf,
  exportGfcSvgSheetFile,
  exportBoqAsCsv,
  printGfcSheet,
} from '../../utils/proExport';
import { ErrorBoundary } from '../ErrorBoundary';
import { DEFAULT_PRO_PROJECT } from '../../types/pro';
import { FloorPlanStudio } from './FloorPlanStudio';
import { ColumnGridStudio } from './ColumnGridStudio';
import { StaircaseStudio } from './StaircaseStudio';
import { ElevationSectionStudio } from './ElevationSectionStudio';
import { MepOverlayStudio } from './MepOverlayStudio';
import { SitePlanFarStudio } from './SitePlanFarStudio';
import { BoqScheduleStudio } from './BoqScheduleStudio';

export interface ProWorkspaceProps {
  project: ProProjectState;
  onUpdateProject: (next: ProProjectState) => void;
  initialModule?: ProModuleId;
  theme: ThemeMode;
  onToggleTheme: () => void;
  accentId: AccentId;
  onSelectAccent: (id: AccentId) => void;
  onBackToProDashboard: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
}

const PRO_MODULE_TABS: { id: ProModuleId; label: string; shortLabel: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'floor-plan', label: '1. Floor Plan', shortLabel: 'Plan', icon: Home },
  { id: 'column-grid', label: '2. Column Grid', shortLabel: 'Columns', icon: Grid },
  { id: 'staircase', label: '3. Staircase', shortLabel: 'Stair', icon: TrendingUp },
  { id: 'elevation-section', label: '4. Elevation & Section', shortLabel: 'Section', icon: Columns },
  { id: 'mep-overlay', label: '5. MEP Services', shortLabel: 'MEP', icon: Cpu },
  { id: 'site-far', label: '6. Site & FAR', shortLabel: 'Site', icon: Compass },
  { id: 'boq-schedule', label: '7. BOQ & Schedules', shortLabel: 'BOQ', icon: FileSpreadsheet },
];

export const ProWorkspace: React.FC<ProWorkspaceProps> = ({
  project,
  onUpdateProject,
  initialModule = 'floor-plan',
  theme,
  onToggleTheme,
  accentId,
  onSelectAccent,
  onBackToProDashboard,
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
}) => {
  const isDark = theme === 'blueprint';
  const [activeModule, setActiveModule] = useState<ProModuleId>(initialModule);
  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(false);
  const [isSheetSettingsOpen, setIsSheetSettingsOpen] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  useEffect(() => {
    setActiveModule(initialModule);
  }, [initialModule]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target?.isContentEditable) {
        return;
      }
      const isMod = e.ctrlKey || e.metaKey;
      if (!isMod) return;
      const key = e.key.toLowerCase();
      if (key === 'z' && !e.shiftKey) {
        if (canUndo && onUndo) {
          e.preventDefault();
          onUndo();
        }
      } else if (key === 'y' || (key === 'z' && e.shiftKey)) {
        if (canRedo && onRedo) {
          e.preventDefault();
          onRedo();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canUndo, canRedo, onUndo, onRedo]);

  const activeLayers = project.activeLayerIds || ['A-WALL', 'A-DOOR', 'S-COLS', 'E-LITE', 'P-PIPE', 'M-HVAC', 'A-DIMS'];

  const handleToggleLayer = (layerId: CadLayerId) => {
    const nextLayers: CadLayerId[] = activeLayers.includes(layerId)
      ? activeLayers.filter((l: CadLayerId) => l !== layerId)
      : [...activeLayers, layerId];
    onUpdateProject({ ...project, activeLayerIds: nextLayers });
  };

  const handleToggleUnit = () => {
    const nextUnit = project.unitSystem === 'metric' ? 'imperial' : 'metric';
    onUpdateProject({ ...project, unitSystem: nextUnit });
  };

  const latestRevision = project.gfcMeta.revisions[project.gfcMeta.revisions.length - 1]?.rev || 'R1';

  return (
    <div
      className={`w-screen h-screen flex flex-col overflow-hidden font-sans select-none transition-colors duration-300 ${
        isDark ? 'dark mono-canvas-dark text-[#f4f4f6]' : 'mono-canvas-light text-[#0d0d10]'
      }`}
    >
      {/* Top Header Rail */}
      <header
        className={`h-14 px-3 sm:px-5 shrink-0 flex items-center justify-between border-b relative z-30 ${
          isDark ? 'border-white/10 bg-black/40' : 'border-black/10 bg-white/70'
        } backdrop-blur-md`}
      >
        {/* Left: Back & Project Title */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onBackToProDashboard}
            className={`p-1.5 sm:p-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium ${
              isDark ? 'hover:bg-white/10 text-white/80' : 'hover:bg-black/5 text-black/80'
            }`}
            title="Return to Pro Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Pro Hub</span>
          </button>

          <div className="h-5 w-[1px] bg-current/15" />

          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-tight truncate max-w-[130px] sm:max-w-[200px]">
              {project.gfcMeta.projectTitle}
            </span>
            <span className="text-[10px] opacity-50 font-mono tracking-wider">
              {project.gfcMeta.drawingNo} • REV {latestRevision}
            </span>
          </div>
        </div>

        {/* Center: Module Switcher Tabs (Scrollable on small screens) */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto px-2 py-1 scrollbar-none">
          {PRO_MODULE_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeModule === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveModule(tab.id)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'glass-pill-active shadow-sm'
                    : isDark
                    ? 'text-white/60 hover:text-white hover:bg-white/5'
                    : 'text-black/60 hover:text-black hover:bg-black/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{tab.label}</span>
                <span className="md:hidden">{tab.shortLabel}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Controls & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Undo / Redo Controls (Ctrl+Z / Ctrl+Y) */}
          {(onUndo || onRedo) && (
            <div className={`flex items-center rounded-xl border p-0.5 ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-black/10 bg-black/[0.03]'}`}>
              <button
                type="button"
                onClick={onUndo}
                disabled={!canUndo}
                title="Undo (Ctrl+Z)"
                className={`p-1.5 rounded-lg transition-colors ${
                  canUndo
                    ? isDark
                      ? 'hover:bg-white/10 cursor-pointer'
                      : 'hover:bg-black/10 cursor-pointer'
                    : 'opacity-30 cursor-not-allowed'
                }`}
              >
                <Undo2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onRedo}
                disabled={!canRedo}
                title="Redo (Ctrl+Y)"
                className={`p-1.5 rounded-lg transition-colors ${
                  canRedo
                    ? isDark
                      ? 'hover:bg-white/10 cursor-pointer'
                      : 'hover:bg-black/10 cursor-pointer'
                    : 'opacity-30 cursor-not-allowed'
                }`}
              >
                <Redo2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Unit Toggle Button (High Contrast in Dark & Light Modes) */}
          <button
            type="button"
            onClick={handleToggleUnit}
            className={`px-2.5 py-1 rounded-full text-[11px] font-mono uppercase font-semibold transition-colors cursor-pointer border ${
              project.unitSystem === 'metric'
                ? isDark
                  ? 'border-sky-500/35 bg-sky-500/15 text-sky-300'
                  : 'border-sky-600/35 bg-sky-500/15 text-sky-800'
                : isDark
                  ? 'border-amber-500/35 bg-amber-500/15 text-amber-300'
                  : 'border-amber-600/35 bg-amber-500/15 text-amber-800'
            }`}
            title={`Active: ${project.unitSystem === 'metric' ? 'Metric (mm / m²)' : 'Imperial (ft-in / sq.ft)'} — Click to switch`}
          >
            {project.unitSystem === 'metric' ? 'METRIC' : 'IMPERIAL'}
          </button>

          {/* CAD Layers Popover Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsLayerMenuOpen(!isLayerMenuOpen);
                setIsExportMenuOpen(false);
                setIsSheetSettingsOpen(false);
              }}
              className={`p-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer border ${
                isLayerMenuOpen
                  ? 'glass-pill-active'
                  : isDark
                  ? 'border-white/10 hover:bg-white/10'
                  : 'border-black/10 hover:bg-black/5'
              }`}
              title="Toggle CAD Layers"
            >
              <Layers className="w-4 h-4" />
              <span className="hidden xl:inline text-[11px] font-mono">
                {activeLayers.length}/7
              </span>
            </button>

            {/* Layer Popover Dropdown */}
            {isLayerMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-64 rounded-2xl p-3 border shadow-2xl z-50 glass-modal ${
                  isDark ? 'border-white/15' : 'border-black/15'
                }`}
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-current/10">
                  <span className="text-xs font-semibold">AutoCAD Layers</span>
                  <span className="text-[10px] font-mono opacity-50">AIA / BIS</span>
                </div>
                <div className="space-y-1">
                  {DEFAULT_CAD_LAYERS.map((layer) => {
                    const isVisible = activeLayers.includes(layer.id);
                    return (
                      <button
                        key={layer.id}
                        type="button"
                        onClick={() => handleToggleLayer(layer.id)}
                        className={`w-full px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          isVisible
                            ? isDark
                              ? 'bg-white/10 text-white'
                              : 'bg-black/5 text-black'
                            : 'opacity-40 hover:opacity-75'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: layer.color }}
                          />
                          <span className="font-mono text-[11px]">{layer.label}</span>
                        </div>
                        {isVisible ? (
                          <Eye className="w-3.5 h-3.5 opacity-75" />
                        ) : (
                          <EyeOff className="w-3.5 h-3.5 opacity-40" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sheet & Title Block Setup Trigger */}
          <button
            type="button"
            onClick={() => {
              setIsSheetSettingsOpen(true);
              setIsLayerMenuOpen(false);
              setIsExportMenuOpen(false);
            }}
            className={`p-2 rounded-xl transition-colors cursor-pointer border ${
              isDark ? 'border-white/10 hover:bg-white/10' : 'border-black/10 hover:bg-black/5'
            }`}
            title="GFC Sheet & Title Block Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Accent Switcher (Compact dots) */}
          <div className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-full glass-pill">
            {ACCENT_THEMES.map((acc) => (
              <button
                key={acc.id}
                type="button"
                onClick={() => onSelectAccent(acc.id)}
                title={acc.label}
                className={`w-3 h-3 rounded-full ${acc.dotClass} transition-transform cursor-pointer ${
                  accentId === acc.id ? 'ring-2 ring-offset-1 ring-current scale-110' : 'opacity-40 hover:opacity-100'
                }`}
              />
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className={`p-2 rounded-xl transition-colors cursor-pointer border ${
              isDark ? 'border-white/10 hover:bg-white/10' : 'border-black/10 hover:bg-black/5'
            }`}
            title="Toggle Blueprint / Paper Mode"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Export Menu Dropdown Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsExportMenuOpen(!isExportMenuOpen);
                setIsLayerMenuOpen(false);
                setIsSheetSettingsOpen(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-[#0d0d10] text-white hover:bg-zinc-800'}`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>

            {/* Export Options Menu */}
            {isExportMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-56 rounded-2xl p-2 border shadow-2xl z-50 glass-modal ${
                  isDark ? 'border-white/15' : 'border-black/15'
                }`}
              >
                <div className="px-2.5 py-1 text-[10px] font-mono opacity-50 uppercase tracking-wider">
                  Deliverables &amp; Formats
                </div>
                <button
                  type="button"
                  onClick={() => {
                    exportProjectAsDxf(project);
                    setIsExportMenuOpen(false);
                  }}
                  className={`w-full px-2.5 py-2 rounded-xl text-left text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                    isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
                  }`}
                >
                  <FileCode className="w-4 h-4 text-sky-400" />
                  <div>
                    <div className="font-semibold">AutoCAD .DXF</div>
                    <div className="text-[10px] opacity-60">Layered R12 Drawing</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    exportGfcSvgSheetFile(project, activeModule);
                    setIsExportMenuOpen(false);
                  }}
                  className={`w-full px-2.5 py-2 rounded-xl text-left text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                    isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
                  }`}
                >
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-semibold">GFC Drawing Sheet (.SVG)</div>
                    <div className="text-[10px] opacity-60">Print-ready with title block</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    exportBoqAsCsv(project);
                    setIsExportMenuOpen(false);
                  }}
                  className={`w-full px-2.5 py-2 rounded-xl text-left text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                    isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
                  }`}
                >
                  <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="font-semibold">BOQ &amp; Schedules (.CSV)</div>
                    <div className="text-[10px] opacity-60">Takeoff &amp; joinery schedule</div>
                  </div>
                </button>

                <div className="my-1 border-t border-current/10" />

                <button
                  type="button"
                  onClick={() => {
                    printGfcSheet(project, activeModule);
                    setIsExportMenuOpen(false);
                  }}
                  className={`w-full px-2.5 py-2 rounded-xl text-left text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                    isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
                  }`}
                >
                  <Printer className="w-4 h-4 text-purple-400" />
                  <div>
                    <div className="font-semibold">Print GFC Sheet</div>
                    <div className="text-[10px] opacity-60">1:1 scale browser print</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Scrollable Module Switcher Strip */}
      <nav className="flex lg:hidden items-center gap-1.5 overflow-x-auto px-3 py-2 border-b border-current/10 glass-panel scrollbar-none shrink-0 z-30">
        {PRO_MODULE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeModule === tab.id;
          return (
            <button
              key={`mob-${tab.id}`}
              type="button"
              onClick={() => setActiveModule(tab.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? 'glass-pill-active shadow-sm'
                  : isDark
                  ? 'text-white/65 hover:text-white hover:bg-white/5'
                  : 'text-black/65 hover:text-black hover:bg-black/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.shortLabel}</span>
            </button>
          );
        })}
      </nav>

      {/* Click-outside backdrop for open Layer/Export dropdowns */}
      {(isLayerMenuOpen || isExportMenuOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setIsLayerMenuOpen(false);
            setIsExportMenuOpen(false);
          }}
        />
      )}

      {/* Main Studio Viewport */}
      <main id="pro-active-stage" className="flex-1 overflow-hidden relative">
        <ErrorBoundary
          key={activeModule}
          moduleName={PRO_MODULE_TABS.find((t) => t.id === activeModule)?.label || 'Pro Studio'}
          onResetData={() => onUpdateProject(DEFAULT_PRO_PROJECT)}
        >
        {activeModule === 'floor-plan' && (
          <FloorPlanStudio
            project={project}
            onUpdateProject={onUpdateProject}
            theme={theme}
            accentId={accentId}
            activeLayers={activeLayers}
          />
        )}

        {activeModule === 'column-grid' && (
          <ColumnGridStudio
            project={project}
            onUpdateProject={onUpdateProject}
            theme={theme}
            accentId={accentId}
            activeLayers={activeLayers}
          />
        )}

        {activeModule === 'staircase' && (
          <StaircaseStudio
            project={project}
            onUpdateProject={onUpdateProject}
            theme={theme}
            accentId={accentId}
            activeLayers={activeLayers}
          />
        )}

        {activeModule === 'elevation-section' && (
          <ElevationSectionStudio
            project={project}
            onUpdateProject={onUpdateProject}
            theme={theme}
            accentId={accentId}
            activeLayers={activeLayers}
          />
        )}

        {activeModule === 'mep-overlay' && (
          <MepOverlayStudio
            project={project}
            onUpdateProject={onUpdateProject}
            theme={theme}
            accentId={accentId}
            activeLayers={activeLayers}
          />
        )}

        {activeModule === 'site-far' && (
          <SitePlanFarStudio
            project={project}
            onUpdateProject={onUpdateProject}
            theme={theme}
            accentId={accentId}
            activeLayers={activeLayers}
          />
        )}

        {activeModule === 'boq-schedule' && (
          <BoqScheduleStudio
            project={project}
            onUpdateProject={onUpdateProject}
            theme={theme}
            accentId={accentId}
            activeLayers={activeLayers}
          />
        )}
        </ErrorBoundary>
      </main>

      {/* GFC Title Block & Sheet Setup Modal */}
      {isSheetSettingsOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsSheetSettingsOpen(false)}
        >
          <div
            className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl glass-modal space-y-4 ${
              isDark ? 'border-white/15' : 'border-black/15'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-current/10">
              <div>
                <h3 className="text-base font-semibold">GFC Sheet &amp; Title Block Setup</h3>
                <p className="text-xs opacity-60">Parameters displayed on official drawing title blocks and revision tables</p>
              </div>
              <button
                type="button"
                onClick={() => setIsSheetSettingsOpen(false)}
                className="p-1.5 rounded-full hover:bg-current/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] font-mono opacity-60">Project Title</label>
                <input
                  type="text"
                  value={project.gfcMeta.projectTitle}
                  onChange={(e) =>
                    onUpdateProject({
                      ...project,
                      gfcMeta: { ...project.gfcMeta, projectTitle: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono opacity-60">Drawing Number</label>
                <input
                  type="text"
                  value={project.gfcMeta.drawingNo}
                  onChange={(e) =>
                    onUpdateProject({
                      ...project,
                      gfcMeta: { ...project.gfcMeta, drawingNo: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono opacity-60">Client Name</label>
                <input
                  type="text"
                  value={project.gfcMeta.clientName}
                  onChange={(e) =>
                    onUpdateProject({
                      ...project,
                      gfcMeta: { ...project.gfcMeta, clientName: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono opacity-60">Architect / Engineer</label>
                <input
                  type="text"
                  value={project.gfcMeta.architectName}
                  onChange={(e) =>
                    onUpdateProject({
                      ...project,
                      gfcMeta: { ...project.gfcMeta, architectName: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono opacity-60">Contractor / Builder</label>
                <input
                  type="text"
                  value={project.gfcMeta.contractorName}
                  onChange={(e) =>
                    onUpdateProject({
                      ...project,
                      gfcMeta: { ...project.gfcMeta, contractorName: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono opacity-60">Sheet Size</label>
                <select
                  value={project.gfcMeta.sheetSize}
                  onChange={(e) =>
                    onUpdateProject({
                      ...project,
                      gfcMeta: { ...project.gfcMeta, sheetSize: e.target.value as 'A1' | 'A2' | 'A3' },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                >
                  <option value="A1">ISO A1 (841 × 594 mm)</option>
                  <option value="A2">ISO A2 (594 × 420 mm)</option>
                  <option value="A3">ISO A3 (420 × 297 mm)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono opacity-60">Revision Tag</label>
                <input
                  type="text"
                  value={latestRevision}
                  onChange={(e) => {
                    const revs = [...project.gfcMeta.revisions];
                    if (revs.length > 0) {
                      revs[revs.length - 1] = { ...revs[revs.length - 1], rev: e.target.value };
                    } else {
                      revs.push({ rev: e.target.value, date: new Date().toLocaleDateString('en-GB'), description: 'GFC Release', status: 'GFC' });
                    }
                    onUpdateProject({
                      ...project,
                      gfcMeta: { ...project.gfcMeta, revisions: revs },
                    });
                  }}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono opacity-60">North Rotation (°)</label>
                <input
                  type="number"
                  value={project.gfcMeta.northAngle}
                  onChange={(e) =>
                    onUpdateProject({
                      ...project,
                      gfcMeta: { ...project.gfcMeta, northAngle: Number(e.target.value) || 0 },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs font-mono"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-current/10 flex justify-end">
              <button
                type="button"
                onClick={() => setIsSheetSettingsOpen(false)}
                className="px-5 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save &amp; Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProWorkspace;
