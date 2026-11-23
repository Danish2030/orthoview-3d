import React, { useState } from 'react';
import {
  Box,
  Sliders,
  Rotate3d,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  RotateCcw,
  CornerDownRight,
  SplitSquareVertical,
  Hexagon,
  Pyramid,
  Cone,
  CircleDot,
  Spline,
  Triangle,
  Info,
  Compass,
  SlidersHorizontal,
} from 'lucide-react';
import { SOLID_PRESETS } from '../utils/geometryGenerators';
import { SNAP_ANGLES } from '../utils/projectionMath';
import {
  DisplayOptions,
  RenderStyle,
  SolidDimensions,
  SolidRotation,
  SolidType,
  ThemeMode,
} from '../types';

interface SidebarProps {
  currentSolid: SolidType;
  onSelectSolid: (type: SolidType) => void;
  dimensions: SolidDimensions;
  onUpdateDimensions: (dim: SolidDimensions) => void;
  rotation: SolidRotation;
  onUpdateRotation: (rot: SolidRotation) => void;
  onResetRotation: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  displayOptions: DisplayOptions;
  onUpdateDisplayOptions: (opts: DisplayOptions) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSolid,
  onSelectSolid,
  dimensions,
  onUpdateDimensions,
  rotation,
  onUpdateRotation,
  onResetRotation,
  theme,
  onToggleTheme,
  displayOptions,
  onUpdateDisplayOptions,
  isCollapsed,
  onToggleCollapse,
}) => {
  const [activeTab, setActiveTab] = useState<'solids' | 'dimensions' | 'orientation' | 'display'>('solids');
  const [dimInputMode, setDimInputMode] = useState<'sliders' | 'views'>('views');

  const handleNumericDim = (axis: keyof SolidDimensions, raw: string) => {
    const num = Number(raw);
    if (Number.isNaN(num)) return;
    const clamped = Math.max(10, Math.min(150, num));
    onUpdateDimensions({ ...dimensions, [axis]: clamped });
  };

  const isDark = theme === 'blueprint';

  const getSolidIcon = (iconName: string) => {
    switch (iconName) {
      case 'CornerDownRight':
        return <CornerDownRight className="w-4 h-4 text-[#0d0d10] dark:text-white" />;
      case 'SplitSquareVertical':
        return <SplitSquareVertical className="w-4 h-4 text-[#0d0d10] dark:text-white" />;
      case 'Hexagon':
        return <Hexagon className="w-4 h-4 text-[#0d0d10] dark:text-white" />;
      case 'Pyramid':
        return <Pyramid className="w-4 h-4 text-[#0d0d10] dark:text-white" />;
      case 'Cone':
        return <Cone className="w-4 h-4 text-[#0d0d10] dark:text-white" />;
      case 'CircleDot':
        return <CircleDot className="w-4 h-4 text-[#0d0d10] dark:text-white" />;
      case 'Spline':
        return <Spline className="w-4 h-4 text-[#0d0d10] dark:text-white" />;
      case 'Triangle':
        return <Triangle className="w-4 h-4 text-[#0d0d10] dark:text-white" />;
      default:
        return <Box className="w-4 h-4 text-[#0d0d10] dark:text-white" />;
    }
  };

  if (isCollapsed) {
    return (
      <div
        className={`w-14 h-full flex flex-col items-center py-4 border-r select-none transition-colors duration-200 z-30 ${
          isDark ? 'glass-panel border-white/10 text-[#f4f4f6]' : 'glass-panel border-black/10 text-[#0d0d10]'
        }`}
      >
        <button
          onClick={onToggleCollapse}
          title="Expand Control Panel"
          className={`p-2.5 rounded-lg mb-6 transition-all ${
            isDark ? 'hover:bg-slate-800 text-[#0d0d10] dark:text-white' : 'hover:bg-slate-100 text-blue-600'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              onToggleCollapse();
              setActiveTab('solids');
            }}
            title="Engineering Solids"
            className="p-2 rounded hover:bg-slate-800 text-slate-500 dark:text-[#9b99b8] hover:text-[#0d0d10] dark:text-white"
          >
            <Box className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              onToggleCollapse();
              setActiveTab('dimensions');
            }}
            title="Parametric Dimensions"
            className="p-2 rounded hover:bg-slate-800 text-slate-500 dark:text-[#9b99b8] hover:text-[#0d0d10] dark:text-white"
          >
            <Sliders className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              onToggleCollapse();
              setActiveTab('orientation');
            }}
            title="Orientation & Inclination"
            className="p-2 rounded hover:bg-slate-800 text-slate-500 dark:text-[#9b99b8] hover:text-[#0d0d10] dark:text-white"
          >
            <Rotate3d className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              onToggleCollapse();
              setActiveTab('display');
            }}
            title="Display Options"
            className="p-2 rounded hover:bg-slate-800 text-slate-500 dark:text-[#9b99b8] hover:text-[#0d0d10] dark:text-white"
          >
            <Layers className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-auto">
          <button
            onClick={onToggleTheme}
            title={isDark ? 'Switch to Drawing Sheet (White)' : 'Switch to CAD Blueprint (Dark)'}
            className="p-2.5 rounded-lg opacity-65 hover:bg-slate-800"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <aside
      className={`w-80 h-full flex flex-col border-r select-none transition-colors duration-200 z-30 ${
        isDark ? 'glass-panel border-white/10 text-[#f4f4f6]' : 'glass-panel border-black/10 text-[#0d0d10]'
      }`}
    >
      {/* Sidebar Header */}
      <div className="px-4 py-3.5 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#0d0d10] dark:text-white" />
          <span className="font-bold text-xs tracking-wider uppercase">
            CONTROL PALETTE
          </span>
        </div>
        <button
          onClick={onToggleCollapse}
          title="Collapse Sidebar"
          className="p-1 rounded hover:bg-slate-800 text-slate-500 dark:text-[#9b99b8] hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 border-b border-black/10 dark:border-white/10 p-1 text-[11px]">
        <button
          onClick={() => setActiveTab('solids')}
          className={`py-1.5 rounded-xl transition-all text-center flex flex-col items-center gap-1 ${
            activeTab === 'solids'
              ? isDark
                ? 'glass-pill-active font-semibold'
                : 'glass-pill-active font-semibold'
              : isDark ? 'text-[#9b99b8] hover:text-white' : 'text-[#5c5b74] hover:text-[#141326]'
          }`}
        >
          <Box className="w-3.5 h-3.5" />
          <span>Solids</span>
        </button>

        <button
          onClick={() => setActiveTab('dimensions')}
          className={`py-1.5 rounded-xl transition-all text-center flex flex-col items-center gap-1 ${
            activeTab === 'dimensions'
              ? isDark
                ? 'glass-pill-active font-semibold'
                : 'glass-pill-active font-semibold'
              : isDark ? 'text-[#9b99b8] hover:text-white' : 'text-[#5c5b74] hover:text-[#141326]'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Dimens</span>
        </button>

        <button
          onClick={() => setActiveTab('orientation')}
          className={`py-1.5 rounded-xl transition-all text-center flex flex-col items-center gap-1 ${
            activeTab === 'orientation'
              ? isDark
                ? 'glass-pill-active font-semibold'
                : 'glass-pill-active font-semibold'
              : isDark ? 'text-[#9b99b8] hover:text-white' : 'text-[#5c5b74] hover:text-[#141326]'
          }`}
        >
          <Rotate3d className="w-3.5 h-3.5" />
          <span>Rotate</span>
        </button>

        <button
          onClick={() => setActiveTab('display')}
          className={`py-1.5 rounded-xl transition-all text-center flex flex-col items-center gap-1 ${
            activeTab === 'display'
              ? isDark
                ? 'glass-pill-active font-semibold'
                : 'glass-pill-active font-semibold'
              : isDark ? 'text-[#9b99b8] hover:text-white' : 'text-[#5c5b74] hover:text-[#141326]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Display</span>
        </button>
      </div>

      {/* Tab Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar">
        {/* TAB 1: SOLIDS PRESETS */}
        {activeTab === 'solids' && (
          <div className="space-y-3">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-[#9b99b8] uppercase tracking-wider flex items-center justify-between">
              <span>Standard Engineering Solids</span>
              <span className="text-[10px] text-[#0d0d10] dark:text-white">{SOLID_PRESETS.length} models</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {SOLID_PRESETS.map((preset) => {
                const isSelected = currentSolid === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => onSelectSolid(preset.id)}
                    className={`p-3 rounded-lg border text-left transition-all flex items-start gap-3 ${
                      isSelected
                        ? isDark
                          ? 'bg-sky-950/40 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                          : 'bg-blue-50 border-blue-500 shadow-sm'
                        : isDark
                        ? 'bg-slate-900/60 border-black/10 dark:border-white/10 hover:border-slate-700 hover:bg-slate-800/50'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-md ${
                        isSelected
                          ? isDark
                            ? 'bg-sky-500/20 text-sky-300'
                            : 'bg-blue-100 text-blue-700'
                          : isDark
                          ? 'bg-slate-800 text-slate-500 dark:text-[#9b99b8]'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {getSolidIcon(preset.iconName)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold truncate ${
                            isSelected
                              ? isDark
                                ? 'text-sky-300'
                                : 'text-blue-700'
                              : isDark
                              ? 'text-slate-900 dark:text-[#f3f2fa]'
                              : 'text-slate-800'
                          }`}
                        >
                          {preset.name}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-500 dark:text-[#9b99b8]">
                          {preset.category}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-[#9b99b8] mt-1 line-clamp-2 leading-tight">
                        {preset.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: PARAMETRIC DIMENSIONS */}
        {activeTab === 'dimensions' && (
          <div className="space-y-4">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-[#9b99b8] uppercase tracking-wider flex items-center justify-between">
              <span>Parametric Dimensions</span>
              <span className="text-[10px] opacity-65">All in mm</span>
            </div>

            {/* Mode Switcher: By View vs Sliders */}
            <div className="grid grid-cols-2 gap-1 p-1 rounded-lg glass-card text-[11px]">
              <button
                onClick={() => setDimInputMode('views')}
                className={`py-1.5 rounded-md font-semibold transition-all ${
                  dimInputMode === 'views'
                    ? 'glass-pill-active'
                    : 'text-slate-500 dark:text-[#9b99b8] hover:text-slate-900 dark:text-[#f3f2fa]'
                }`}
              >
                Write by View
              </button>
              <button
                onClick={() => setDimInputMode('sliders')}
                className={`py-1.5 rounded-md font-semibold transition-all ${
                  dimInputMode === 'sliders'
                    ? 'glass-pill-active'
                    : 'text-slate-500 dark:text-[#9b99b8] hover:text-slate-900 dark:text-[#f3f2fa]'
                }`}
              >
                Axis Sliders
              </button>
            </div>

            {dimInputMode === 'views' ? (
              <div className="space-y-3">
                <p className="text-[11px] text-slate-500 dark:text-[#9b99b8] leading-relaxed">
                  Type exact dimensions for each orthographic view (10–150 mm). Shared axes stay synced automatically and render live in the output sheet.
                </p>

                {/* Front View (FV): Length x Height */}
                <div className="p-3.5 rounded-2xl glass-card space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0d0d10] dark:text-white">Front View (FV)</span>
                    <span className="text-[10px] text-slate-500 dark:text-[#9b99b8]">L × H</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="space-y-1">
                      <span className="text-[10px] opacity-75 block">Length (L)</span>
                      <div className="relative">
                        <input
                          type="number"
                          min={10}
                          max={150}
                          value={dimensions.length}
                          onChange={(e) => handleNumericDim('length', e.target.value)}
                          className="w-full px-2.5 py-1.5 pr-8 text-xs rounded-md glass-input tabular-nums"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">mm</span>
                      </div>
                    </label>
                    <label className="space-y-1">
                      <span className="text-[10px] opacity-75 block">Height (H)</span>
                      <div className="relative">
                        <input
                          type="number"
                          min={10}
                          max={150}
                          value={dimensions.height}
                          onChange={(e) => handleNumericDim('height', e.target.value)}
                          className="w-full px-2.5 py-1.5 pr-8 text-xs rounded-md glass-input tabular-nums"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">mm</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Top View (TV): Length x Width */}
                <div className="p-3.5 rounded-2xl glass-card space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0d0d10] dark:text-white">Top View (TV)</span>
                    <span className="text-[10px] text-slate-500 dark:text-[#9b99b8]">L × W</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="space-y-1">
                      <span className="text-[10px] opacity-75 block">Length (L)</span>
                      <div className="relative">
                        <input
                          type="number"
                          min={10}
                          max={150}
                          value={dimensions.length}
                          onChange={(e) => handleNumericDim('length', e.target.value)}
                          className="w-full px-2.5 py-1.5 pr-8 text-xs rounded-md glass-input tabular-nums"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">mm</span>
                      </div>
                    </label>
                    <label className="space-y-1">
                      <span className="text-[10px] opacity-75 block">Width (W)</span>
                      <div className="relative">
                        <input
                          type="number"
                          min={10}
                          max={150}
                          value={dimensions.width}
                          onChange={(e) => handleNumericDim('width', e.target.value)}
                          className="w-full px-2.5 py-1.5 pr-8 text-xs rounded-md glass-input tabular-nums"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">mm</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Left Side View (LHSV): Width x Height */}
                <div className="p-3.5 rounded-2xl glass-card space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0d0d10] dark:text-white">Left Side View (SV)</span>
                    <span className="text-[10px] text-slate-500 dark:text-[#9b99b8]">W × H</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="space-y-1">
                      <span className="text-[10px] opacity-75 block">Width (W)</span>
                      <div className="relative">
                        <input
                          type="number"
                          min={10}
                          max={150}
                          value={dimensions.width}
                          onChange={(e) => handleNumericDim('width', e.target.value)}
                          className="w-full px-2.5 py-1.5 pr-8 text-xs rounded-md glass-input tabular-nums"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">mm</span>
                      </div>
                    </label>
                    <label className="space-y-1">
                      <span className="text-[10px] opacity-75 block">Height (H)</span>
                      <div className="relative">
                        <input
                          type="number"
                          min={10}
                          max={150}
                          value={dimensions.height}
                          onChange={(e) => handleNumericDim('height', e.target.value)}
                          className="w-full px-2.5 py-1.5 pr-8 text-xs rounded-md glass-input tabular-nums"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">mm</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Length (L) */}
                <div className="p-3.5 rounded-2xl glass-card space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold opacity-75 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      Length (L) [X-axis]
                    </span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min={10}
                        max={150}
                        value={dimensions.length}
                        onChange={(e) => handleNumericDim('length', e.target.value)}
                        className="w-16 px-1.5 py-0.5 text-right text-xs font-bold text-[#0d0d10] dark:text-white glass-input rounded-lg tabular-nums"
                      />
                      <span className="text-[10px] text-slate-500 dark:text-[#9b99b8]">mm</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="120"
                    step="2"
                    value={Math.min(120, Math.max(20, dimensions.length))}
                    onChange={(e) =>
                      onUpdateDimensions({ ...dimensions, length: Number(e.target.value) })
                    }
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-zinc-800 dark:accent-white"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>20 mm</span>
                    <span>70 mm</span>
                    <span>120 mm</span>
                  </div>
                </div>

                {/* Width / Depth (W) */}
                <div className="p-3.5 rounded-2xl glass-card space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold opacity-75 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      Width / Depth (W) [Z-axis]
                    </span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min={10}
                        max={150}
                        value={dimensions.width}
                        onChange={(e) => handleNumericDim('width', e.target.value)}
                        className="w-16 px-1.5 py-0.5 text-right text-xs font-bold text-[#0d0d10] dark:text-white glass-input rounded-lg tabular-nums"
                      />
                      <span className="text-[10px] text-slate-500 dark:text-[#9b99b8]">mm</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="120"
                    step="2"
                    value={Math.min(120, Math.max(20, dimensions.width))}
                    onChange={(e) =>
                      onUpdateDimensions({ ...dimensions, width: Number(e.target.value) })
                    }
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-zinc-800 dark:accent-white"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>20 mm</span>
                    <span>70 mm</span>
                    <span>120 mm</span>
                  </div>
                </div>

                {/* Height (H) */}
                <div className="p-3.5 rounded-2xl glass-card space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold opacity-75 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Height (H) [Y-axis]
                    </span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min={10}
                        max={150}
                        value={dimensions.height}
                        onChange={(e) => handleNumericDim('height', e.target.value)}
                        className="w-16 px-1.5 py-0.5 text-right text-xs font-bold text-[#0d0d10] dark:text-white glass-input rounded-lg tabular-nums"
                      />
                      <span className="text-[10px] text-slate-500 dark:text-[#9b99b8]">mm</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="120"
                    step="2"
                    value={Math.min(120, Math.max(20, dimensions.height))}
                    onChange={(e) =>
                      onUpdateDimensions({ ...dimensions, height: Number(e.target.value) })
                    }
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-zinc-800 dark:accent-white"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>20 mm</span>
                    <span>70 mm</span>
                    <span>120 mm</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Dimension Ratios */}
            <div className="pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 dark:text-[#9b99b8]">Quick Presets:</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => onUpdateDimensions({ length: 60, width: 40, height: 50 })}
                  className="px-2 py-1 text-[10px] glass-pill rounded text-slate-700 dark:text-[#d6d4ec]"
                >
                  60×40×50
                </button>
                <button
                  onClick={() => onUpdateDimensions({ length: 50, width: 50, height: 50 })}
                  className="px-2 py-1 text-[10px] glass-pill rounded text-slate-700 dark:text-[#d6d4ec]"
                >
                  Cube 50³
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ORIENTATION / INCLINATION */}
        {activeTab === 'orientation' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-[#9b99b8] uppercase tracking-wider">
              <span>Inclination / Rotation</span>
              <button
                onClick={onResetRotation}
                className="text-[10px] opacity-65 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset (0,0,0)
              </button>
            </div>

            {/* Rotate X */}
            <div className="p-3.5 rounded-2xl glass-card space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold opacity-75">Tilt X (θ to HP)</span>
                <span className="font-bold text-[#0d0d10] dark:text-white">{rotation.x}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={rotation.x}
                onChange={(e) =>
                  onUpdateRotation({ ...rotation, x: Number(e.target.value) })
                }
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-zinc-800 dark:accent-white"
              />
              <div className="flex gap-1 flex-wrap pt-1">
                {SNAP_ANGLES.map((angle) => (
                  <button
                    key={angle}
                    onClick={() => onUpdateRotation({ ...rotation, x: angle })}
                    className={`px-1.5 py-0.5 text-[9px] rounded ${
                      rotation.x === angle
                        ? 'bg-red-500 text-white font-bold'
                        : 'bg-slate-800 text-slate-500 dark:text-[#9b99b8] hover:text-white'
                    }`}
                  >
                    {angle}°
                  </button>
                ))}
              </div>
            </div>

            {/* Rotate Y */}
            <div className="p-3.5 rounded-2xl glass-card space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold opacity-75">Spin Y (Azimuth)</span>
                <span className="font-bold text-[#0d0d10] dark:text-white">{rotation.y}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={rotation.y}
                onChange={(e) =>
                  onUpdateRotation({ ...rotation, y: Number(e.target.value) })
                }
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-zinc-800 dark:accent-white"
              />
              <div className="flex gap-1 flex-wrap pt-1">
                {SNAP_ANGLES.map((angle) => (
                  <button
                    key={angle}
                    onClick={() => onUpdateRotation({ ...rotation, y: angle })}
                    className={`px-1.5 py-0.5 text-[9px] rounded ${
                      rotation.y === angle
                        ? 'bg-emerald-500 text-white font-bold'
                        : 'bg-slate-800 text-slate-500 dark:text-[#9b99b8] hover:text-white'
                    }`}
                  >
                    {angle}°
                  </button>
                ))}
              </div>
            </div>

            {/* Rotate Z */}
            <div className="p-3.5 rounded-2xl glass-card space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold opacity-75">Tilt Z (φ to VP)</span>
                <span className="font-bold text-[#0d0d10] dark:text-white">{rotation.z}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={rotation.z}
                onChange={(e) =>
                  onUpdateRotation({ ...rotation, z: Number(e.target.value) })
                }
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-zinc-800 dark:accent-white"
              />
              <div className="flex gap-1 flex-wrap pt-1">
                {SNAP_ANGLES.map((angle) => (
                  <button
                    key={angle}
                    onClick={() => onUpdateRotation({ ...rotation, z: angle })}
                    className={`px-1.5 py-0.5 text-[9px] rounded ${
                      rotation.z === angle
                        ? 'bg-blue-500 text-white font-bold'
                        : 'bg-slate-800 text-slate-500 dark:text-[#9b99b8] hover:text-white'
                    }`}
                  >
                    {angle}°
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ADVANCED GRAPHICS & PEDAGOGY TOGGLES */}
        {activeTab === 'display' && (
          <div className="space-y-4">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-[#9b99b8] uppercase tracking-wider">
              Drafting & Render Styles
            </div>

            {/* 3D Material / Shading Style */}
            <div className="p-3.5 rounded-2xl glass-card space-y-2">
              <div className="text-xs font-bold text-slate-900 dark:text-[#f3f2fa]">
                3D CAD Material Finish
              </div>
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {(['aluminum', 'steel', 'polymer', 'glass', 'anodized'] as RenderStyle[]).map((style) => (
                  <button
                    key={style}
                    onClick={() =>
                      onUpdateDisplayOptions({ ...displayOptions, renderStyle: style })
                    }
                    className={`py-1.5 px-2 rounded border text-[10px] uppercase font-bold transition-all ${
                      displayOptions.renderStyle === style
                        ? 'bg-sky-500 text-slate-950 border-sky-400 shadow'
                        : 'bg-slate-800 border-slate-700 text-slate-500 dark:text-[#9b99b8] hover:text-white'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Transfer Method: 45° Miter vs Compass Arcs */}
            <div className="p-3.5 rounded-2xl glass-card space-y-2">
              <div className="text-xs font-bold text-slate-900 dark:text-[#f3f2fa]">
                Quadrant 4 Depth Transfer
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() =>
                    onUpdateDisplayOptions({ ...displayOptions, transferMethod: 'miter' })
                  }
                  className={`py-1.5 px-2 rounded border text-xs flex items-center justify-center gap-1.5 transition-all ${
                    displayOptions.transferMethod === 'miter'
                      ? 'bg-sky-950 border-sky-500 text-sky-300 font-bold'
                      : 'bg-slate-800 border-slate-700 text-slate-500 dark:text-[#9b99b8]'
                  }`}
                >
                  <span>45° Miter Line</span>
                </button>
                <button
                  onClick={() =>
                    onUpdateDisplayOptions({ ...displayOptions, transferMethod: 'compass' })
                  }
                  className={`py-1.5 px-2 rounded border text-xs flex items-center justify-center gap-1.5 transition-all ${
                    displayOptions.transferMethod === 'compass'
                      ? 'bg-sky-950 border-sky-500 text-sky-300 font-bold'
                      : 'bg-slate-800 border-slate-700 text-slate-500 dark:text-[#9b99b8]'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Compass Arcs</span>
                </button>
              </div>
            </div>

            {/* Hidden Lines (Dashed) */}
            <div className="p-3.5 rounded-2xl glass-card flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-[#f3f2fa]">
                  Hidden Lines (Dashed)
                </div>
                <div className="text-[10px] text-slate-500 dark:text-[#9b99b8] mt-0.5">
                  Renders occluded edges behind solid faces
                </div>
              </div>
              <input
                type="checkbox"
                checked={displayOptions.showHiddenLines}
                onChange={(e) =>
                  onUpdateDisplayOptions({
                    ...displayOptions,
                    showHiddenLines: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Dimension Callout Lines */}
            <div className="p-3.5 rounded-2xl glass-card flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-[#f3f2fa]">
                  Dimension Lines (L, W, H)
                </div>
                <div className="text-[10px] text-slate-500 dark:text-[#9b99b8] mt-0.5">
                  BIS SP:46 aligned dimension arrows & text
                </div>
              </div>
              <input
                type="checkbox"
                checked={displayOptions.showDimensions}
                onChange={(e) =>
                  onUpdateDisplayOptions({
                    ...displayOptions,
                    showDimensions: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-zinc-800 dark:accent-white cursor-pointer"
              />
            </div>

            {/* Observer Sight Arrows */}
            <div className="p-3.5 rounded-2xl glass-card flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-[#f3f2fa]">
                  Observer Sight Arrows
                </div>
                <div className="text-[10px] text-slate-500 dark:text-[#9b99b8] mt-0.5">
                  Visual sight-rays pointing to FV, TV, LHSV
                </div>
              </div>
              <input
                type="checkbox"
                checked={displayOptions.showSightArrows}
                onChange={(e) =>
                  onUpdateDisplayOptions({
                    ...displayOptions,
                    showSightArrows: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-zinc-800 dark:accent-white cursor-pointer"
              />
            </div>

            {/* Center Lines */}
            <div className="p-3.5 rounded-2xl glass-card flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-[#f3f2fa]">
                  Axis & Center Lines
                </div>
                <div className="text-[10px] text-slate-500 dark:text-[#9b99b8] mt-0.5">
                  BIS Type G dash-dot symmetry axes
                </div>
              </div>
              <input
                type="checkbox"
                checked={displayOptions.showCenterLines}
                onChange={(e) =>
                  onUpdateDisplayOptions({
                    ...displayOptions,
                    showCenterLines: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-zinc-800 dark:accent-white cursor-pointer"
              />
            </div>

            {/* Alignment / Projector Lines */}
            <div className="p-3.5 rounded-2xl glass-card flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-[#f3f2fa]">
                  Alignment Projectors
                </div>
                <div className="text-[10px] text-slate-500 dark:text-[#9b99b8] mt-0.5">
                  Faint rays connecting FV, TV, and LHSV
                </div>
              </div>
              <input
                type="checkbox"
                checked={displayOptions.showProjectors}
                onChange={(e) =>
                  onUpdateDisplayOptions({
                    ...displayOptions,
                    showProjectors: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-zinc-800 dark:accent-white cursor-pointer"
              />
            </div>

            {/* Theme Toggle Button Card */}
            <div className="p-3.5 rounded-2xl glass-card space-y-2">
              <div className="text-xs font-bold text-slate-900 dark:text-[#f3f2fa]">
                Visual Drafting Theme
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => theme !== 'blueprint' && onToggleTheme()}
                  className={`p-2 rounded border text-xs flex items-center justify-center gap-1.5 transition-all ${
                    isDark
                      ? 'glass-pill-active font-semibold'
                      : 'bg-slate-800 border-slate-700 text-slate-500 dark:text-[#9b99b8]'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark Glass</span>
                </button>

                <button
                  onClick={() => theme !== 'paper' && onToggleTheme()}
                  className={`p-2 rounded border text-xs flex items-center justify-center gap-1.5 transition-all ${
                    !isDark
                      ? 'glass-pill-active font-semibold'
                      : 'bg-slate-800 border-slate-700 text-slate-500 dark:text-[#9b99b8]'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light Glass</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info Box */}
      <div className="p-3 border-t border-black/10 dark:border-white/10 text-[10px] text-slate-500 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-[#0d0d10] dark:text-white" />
          <span>BIS SP:46 / ISO 128</span>
        </span>
        <span>v2.1.0 • Studio</span>
      </div>
    </aside>
  );
};
