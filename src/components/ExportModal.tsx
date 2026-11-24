import React, { useMemo, useState } from 'react';
import * as THREE from 'three';
import {
  X,
  Download,
  FileImage,
  FileText,
  FileCode2,
  Box,
  Cpu,
  CheckCircle2,
  Info,
  SlidersHorizontal,
  Check,
  Palette,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  SideViewMode,
  SolidDimensions,
  SolidRotation,
  ThemeMode,
  QuadrantDividerStyle,
  TitleBlockFieldsConfig,
  TitleBlockMeta,
  TitleBlockOptions,
  LineColorPalette,
  DEFAULT_LINE_COLORS,
  LINE_COLOR_PRESETS,
} from '../types';
import {
  buildAutoCADSheetSVG,
  ExportFormat,
  exportSheetInFormat,
} from '../utils/exportDrawingSheet';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  geometry: THREE.BufferGeometry;
  solidName: string;
  dimensions: SolidDimensions;
  rotation: SolidRotation;
  sideViewMode: SideViewMode;
  titleBlockMeta: TitleBlockMeta;
  titleBlockOptions: TitleBlockOptions;
  onUpdateTitleBlockMeta: (meta: TitleBlockMeta) => void;
  onUpdateTitleBlockOptions: (opts: TitleBlockOptions) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  theme,
  geometry,
  solidName,
  dimensions,
  rotation,
  sideViewMode,
  titleBlockMeta,
  titleBlockOptions,
  onUpdateTitleBlockMeta,
  onUpdateTitleBlockOptions,
}) => {
  const isDark = theme === 'blueprint';
  const [busyFormat, setBusyFormat] = useState<ExportFormat | null>(null);
  const [downloadedFormat, setDownloadedFormat] = useState<ExportFormat | null>(null);

  const previewSvg = useMemo(() => {
    if (!isOpen) return '';
    return buildAutoCADSheetSVG({
      geometry,
      solidName,
      dimensions,
      rotation,
      sideViewMode,
      titleBlockMeta,
      titleBlockOptions,
    });
  }, [isOpen, geometry, solidName, dimensions, rotation, sideViewMode, titleBlockMeta, titleBlockOptions]);

  if (!isOpen) return null;

  const handleDownload = async (format: ExportFormat) => {
    setBusyFormat(format);
    try {
      await exportSheetInFormat(format, {
        geometry,
        solidName,
        dimensions,
        rotation,
        sideViewMode,
        titleBlockMeta,
        titleBlockOptions,
      });
      setDownloadedFormat(format);
      setTimeout(() => setDownloadedFormat(null), 2200);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setBusyFormat(null);
    }
  };

  const handleToggleTitleBlock = (enabled: boolean) => {
    onUpdateTitleBlockOptions({
      ...titleBlockOptions,
      enabled,
    });
  };

  const handleDividerStyleChange = (dividerStyle: QuadrantDividerStyle) => {
    onUpdateTitleBlockOptions({
      ...titleBlockOptions,
      dividerStyle,
    });
  };

  const activeDividerStyle: QuadrantDividerStyle = titleBlockOptions.dividerStyle ?? 'dotted';

  const [showColorPicker, setShowColorPicker] = useState<boolean>(true);

  const activeColors: LineColorPalette = useMemo(() => {
    return { ...DEFAULT_LINE_COLORS, ...(titleBlockOptions.lineColors || {}) };
  }, [titleBlockOptions.lineColors]);

  const handleApplyPresetColors = (presetColors: LineColorPalette) => {
    onUpdateTitleBlockOptions({
      ...titleBlockOptions,
      lineColors: presetColors,
    });
  };

  const handleColorChange = (key: keyof LineColorPalette, value: string) => {
    onUpdateTitleBlockOptions({
      ...titleBlockOptions,
      lineColors: {
        ...activeColors,
        [key]: value,
      },
    });
  };

  const QUICK_PALETTE_DOTS = ['#000000', '#dc2626', '#2563eb', '#16a34a', '#7c3aed'];

  const COLOR_CATEGORIES: { key: keyof LineColorPalette; label: string; desc: string }[] = [
    { key: 'visible', label: 'Visible Outlines', desc: 'Solid feature outlines (FV, SV, TV)' },
    { key: 'hidden', label: 'Hidden Lines', desc: 'Dashed interior & occluded edges' },
    { key: 'centerline', label: 'Centerlines', desc: 'Dash-dot symmetry & hole axes' },
    { key: 'dimensions', label: 'Dimensions & Text', desc: 'Dimension lines, arrows, callouts & numbers' },
    { key: 'isometric', label: 'Isometric View', desc: 'Quadrant 4 3D pictorial outline' },
    { key: 'border', label: 'Border & Title Block', desc: 'A3 sheet border rect & College Title Block' },
    { key: 'dividers', label: 'Quadrant Dividers', desc: 'Central crosshair lines separating quadrants' },
  ];

  const handleToggleField = (field: keyof TitleBlockFieldsConfig) => {
    onUpdateTitleBlockOptions({
      ...titleBlockOptions,
      fields: {
        ...titleBlockOptions.fields,
        [field]: !titleBlockOptions.fields[field],
      },
    });
  };

  const handleMetaChange = (key: keyof TitleBlockMeta, val: string) => {
    onUpdateTitleBlockMeta({
      ...titleBlockMeta,
      [key]: val,
    });
  };

  const fieldChips: { key: keyof TitleBlockFieldsConfig; label: string }[] = [
    { key: 'name', label: 'Name' },
    { key: 'title', label: 'Title' },
    { key: 'className', label: 'Class' },
    { key: 'rollNo', label: 'Roll No.' },
    { key: 'dwgNo', label: 'Dwg. No.' },
    { key: 'date', label: 'Date' },
    { key: 'scale', label: 'Scale' },
    { key: 'grade', label: 'Grade' },
    { key: 'valuedBy', label: 'Valued By' },
    { key: 'projectionSymbol', label: '1st-Angle Symbol' },
  ];

  const formats: {
    id: ExportFormat;
    badge: string;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    recommended?: boolean;
  }[] = [
    {
      id: 'png',
      badge: '.PNG',
      title: 'AutoCAD White Lab Sheet (High-Res)',
      subtitle: '2400×1697 px crisp white paper, black ink vector lines, 4 views + Title Block',
      icon: <FileImage className="w-4 h-4" />,
      recommended: true,
    },
    {
      id: 'dxf',
      badge: '.DXF → DWG',
      title: 'AutoCAD Native Vector CAD (DXF)',
      subtitle: 'Opens directly in AutoCAD & Fusion 360 with VISIBLE, HIDDEN & TITLEBLOCK layers',
      icon: <Cpu className="w-4 h-4" />,
      recommended: true,
    },
    {
      id: 'pdf',
      badge: '.PDF',
      title: 'Print-Ready A3 Landscape Sheet',
      subtitle: 'Vector A3 sheet formatted for college record submission and printing',
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: 'svg',
      badge: '.SVG',
      title: 'Scalable Vector Drawing (SVG)',
      subtitle: 'Infinite-zoom vector lines for reports, slides, or Illustrator',
      icon: <FileCode2 className="w-4 h-4" />,
    },
    {
      id: 'stl',
      badge: '.STL',
      title: '3D Solid Mesh (STL)',
      subtitle: 'Export the 3D solid for AutoCAD 3D, Blender, SolidWorks, or 3D printing',
      icon: <Box className="w-4 h-4" />,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-md select-text">
      <div
        className={`w-full max-w-5xl rounded-[28px] glass-modal overflow-hidden flex flex-col max-h-[94vh] ${
          isDark ? 'text-[#f4f4f6]' : 'text-[#0d0d10]'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between shrink-0 ${
            isDark ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-white/40'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-current/10 border border-current/15 flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-[-0.01em]">
                Export AutoCAD Drawing Sheet &amp; CAD Formats
              </h2>
              <p className="text-[11px] opacity-60">
                Customize your lab title block, preview the live A3 sheet, and download in vector CAD formats
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-current/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-y-auto custom-scrollbar">
          {/* Left: Live Pure White AutoCAD Output Preview */}
          <div className="lg:col-span-6 space-y-2.5 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-wider opacity-60">
                Live AutoCAD Sheet Preview (A3 Vector)
              </div>
              <span className="text-[10px] opacity-50 font-mono">1400×990 px</span>
            </div>
            <div
              className="w-full rounded-2xl border border-black/15 bg-white p-2 shadow-inner overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: previewSvg.replace('<svg ', '<svg style="width:100%;height:auto;display:block;" '),
              }}
            />
            <div className="p-3 rounded-2xl glass-card text-[11px] opacity-75 flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5 opacity-75" />
              <span>
                <strong>Need a .DWG file?</strong> Download <strong>.DXF</strong> (Autodesk&apos;s open CAD format). It opens directly in AutoCAD with complete 2D layers—just hit <em>File → Save As → .dwg</em>.
              </span>
            </div>
          </div>

          {/* Right: Title Block Setup & Download Formats */}
          <div className="lg:col-span-6 space-y-4 flex flex-col">
            {/* Quadrant Divider Line Style Selector */}
            <div className="p-3.5 rounded-2xl glass-card border border-current/10 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 opacity-75" />
                <div>
                  <span className="text-xs font-semibold block">Quadrant Divider Lines</span>
                  <span className="text-[10px] opacity-55">Line style separating the 4 drawing views</span>
                </div>
              </div>
              <div className="flex items-center rounded-xl bg-current/10 p-0.5 border border-current/10">
                {(
                  [
                    { id: 'dotted' as QuadrantDividerStyle, label: 'Dotted ····' },
                    { id: 'solid' as QuadrantDividerStyle, label: 'Solid Line ───' },
                    { id: 'none' as QuadrantDividerStyle, label: 'None' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleDividerStyleChange(opt.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                      activeDividerStyle === opt.id
                        ? 'bg-white text-black shadow-sm font-semibold dark:bg-white dark:text-black'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Line Colors & Palette Customizer */}
            <div className="p-3.5 rounded-2xl glass-card border border-current/10 space-y-3">
              <div
                className="flex items-center justify-between cursor-pointer select-none"
                onClick={() => setShowColorPicker(!showColorPicker)}
              >
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 opacity-75" />
                  <div>
                    <span className="text-xs font-semibold block">Line Colors &amp; Palette</span>
                    <span className="text-[10px] opacity-55">Customize per-line colors for AutoCAD SVG &amp; DXF layers</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="p-1 rounded-lg opacity-60 hover:opacity-100 transition-opacity"
                >
                  {showColorPicker ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {showColorPicker && (
                <div className="space-y-3 pt-1 border-t border-current/10">
                  {/* 1-Click Color Presets */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider opacity-60 block">
                      1-Click Presets
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {LINE_COLOR_PRESETS.map((preset) => {
                        const isSelected =
                          activeColors.visible === preset.colors.visible &&
                          activeColors.hidden === preset.colors.hidden &&
                          activeColors.centerline === preset.colors.centerline &&
                          activeColors.dimensions === preset.colors.dimensions;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => handleApplyPresetColors(preset.colors)}
                            className={`px-2.5 py-1.5 rounded-xl text-left border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-current/15 border-current/30 font-semibold shadow-sm'
                                : 'border-current/10 bg-current/5 opacity-75 hover:opacity-100'
                            }`}
                          >
                            <span className="text-[11px] block truncate font-medium">{preset.name}</span>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.colors.visible }} />
                              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.colors.hidden }} />
                              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.colors.centerline }} />
                              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.colors.dimensions }} />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Per-Line Custom Color Pickers */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider opacity-60 block">
                      Per-Line Color Palette
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {COLOR_CATEGORIES.map((cat) => (
                        <div
                          key={cat.key}
                          className="p-2 rounded-xl bg-current/[0.03] border border-current/10 flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <span className="text-[11px] font-medium block truncate">{cat.label}</span>
                            <span className="text-[9px] opacity-50 block truncate font-mono">{activeColors[cat.key]}</span>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            {/* Color picker input swatch */}
                            <label className="relative cursor-pointer">
                              <input
                                type="color"
                                value={activeColors[cat.key]}
                                onChange={(e) => handleColorChange(cat.key, e.target.value)}
                                className="w-5 h-5 rounded-full cursor-pointer p-0 bg-transparent opacity-0 absolute inset-0 z-10"
                              />
                              <div
                                className="w-5 h-5 rounded-full border border-black/25 shadow-sm"
                                style={{ backgroundColor: activeColors[cat.key] }}
                              />
                            </label>
                            {/* 5 quick palette dots */}
                            <div className="flex items-center gap-0.5 ml-1">
                              {QUICK_PALETTE_DOTS.map((c) => (
                                <button
                                  key={c}
                                  type="button"
                                  onClick={() => handleColorChange(cat.key, c)}
                                  style={{ backgroundColor: c }}
                                  className={`w-3.5 h-3.5 rounded-full border transition-transform cursor-pointer ${
                                    activeColors[cat.key].toLowerCase() === c.toLowerCase()
                                      ? 'scale-125 border-current ring-1 ring-current'
                                      : 'border-black/25 opacity-70 hover:opacity-100 hover:scale-110'
                                  }`}
                                  title={c}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Title Block Configuration Box */}
            <div className="p-4 rounded-2xl glass-card border border-current/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 opacity-75" />
                  <span className="text-xs font-semibold">Bottom Title Block Box</span>
                </div>
                <div className="flex items-center rounded-xl bg-current/10 p-0.5 border border-current/10">
                  <button
                    type="button"
                    onClick={() => handleToggleTitleBlock(true)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                      titleBlockOptions.enabled
                        ? 'bg-white text-black shadow-sm font-semibold dark:bg-white dark:text-black'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    Include (Yes)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleTitleBlock(false)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                      !titleBlockOptions.enabled
                        ? 'bg-white text-black shadow-sm font-semibold dark:bg-white dark:text-black'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    Omit (No)
                  </button>
                </div>
              </div>

              {titleBlockOptions.enabled ? (
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider opacity-60 block mb-1.5">
                      Included Detail Chips (Click to Toggle)
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {fieldChips.map(({ key, label }) => {
                        const active = titleBlockOptions.fields[key];
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => handleToggleField(key)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] border transition-all flex items-center gap-1 cursor-pointer ${
                              active
                                ? 'bg-current/15 text-current border-current/25 font-semibold'
                                : 'opacity-40 hover:opacity-75 border-current/10'
                            }`}
                          >
                            {active && <Check className="w-3 h-3 stroke-[3]" />}
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Input Fields Grid */}
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider opacity-60 block mb-1.5">
                      Student &amp; College Details
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {titleBlockOptions.fields.name && (
                        <div>
                          <span className="text-[10px] opacity-60 block mb-0.5">Name</span>
                          <input
                            type="text"
                            value={titleBlockMeta.name}
                            onChange={(e) => handleMetaChange('name', e.target.value)}
                            placeholder="Student Name"
                            className="w-full px-2.5 py-1.5 rounded-xl border border-current/15 bg-black/5 dark:bg-white/5 focus:outline-none focus:ring-1 focus:ring-current text-xs"
                          />
                        </div>
                      )}

                      {titleBlockOptions.fields.rollNo && (
                        <div>
                          <span className="text-[10px] opacity-60 block mb-0.5">Roll No.</span>
                          <input
                            type="text"
                            value={titleBlockMeta.rollNo}
                            onChange={(e) => handleMetaChange('rollNo', e.target.value)}
                            placeholder="Roll No."
                            className="w-full px-2.5 py-1.5 rounded-xl border border-current/15 bg-black/5 dark:bg-white/5 focus:outline-none focus:ring-1 focus:ring-current text-xs"
                          />
                        </div>
                      )}

                      {titleBlockOptions.fields.className && (
                        <div>
                          <span className="text-[10px] opacity-60 block mb-0.5">Class / Branch</span>
                          <input
                            type="text"
                            value={titleBlockMeta.className}
                            onChange={(e) => handleMetaChange('className', e.target.value)}
                            placeholder="S1 ME / RBA"
                            className="w-full px-2.5 py-1.5 rounded-xl border border-current/15 bg-black/5 dark:bg-white/5 focus:outline-none focus:ring-1 focus:ring-current text-xs"
                          />
                        </div>
                      )}

                      {titleBlockOptions.fields.dwgNo && (
                        <div>
                          <span className="text-[10px] opacity-60 block mb-0.5">Dwg. No.</span>
                          <input
                            type="text"
                            value={titleBlockMeta.dwgNo}
                            onChange={(e) => handleMetaChange('dwgNo', e.target.value)}
                            placeholder="EXP-01"
                            className="w-full px-2.5 py-1.5 rounded-xl border border-current/15 bg-black/5 dark:bg-white/5 focus:outline-none focus:ring-1 focus:ring-current text-xs"
                          />
                        </div>
                      )}

                      {titleBlockOptions.fields.date && (
                        <div>
                          <span className="text-[10px] opacity-60 block mb-0.5">Date</span>
                          <input
                            type="text"
                            value={titleBlockMeta.date}
                            onChange={(e) => handleMetaChange('date', e.target.value)}
                            placeholder="DD/MM/YYYY"
                            className="w-full px-2.5 py-1.5 rounded-xl border border-current/15 bg-black/5 dark:bg-white/5 focus:outline-none focus:ring-1 focus:ring-current text-xs"
                          />
                        </div>
                      )}

                      {titleBlockOptions.fields.scale && (
                        <div>
                          <span className="text-[10px] opacity-60 block mb-0.5">Scale</span>
                          <input
                            type="text"
                            value={titleBlockMeta.scale}
                            onChange={(e) => handleMetaChange('scale', e.target.value)}
                            placeholder="1:1"
                            className="w-full px-2.5 py-1.5 rounded-xl border border-current/15 bg-black/5 dark:bg-white/5 focus:outline-none focus:ring-1 focus:ring-current text-xs"
                          />
                        </div>
                      )}

                      {titleBlockOptions.fields.grade && (
                        <div>
                          <span className="text-[10px] opacity-60 block mb-0.5">Grade (Optional)</span>
                          <input
                            type="text"
                            value={titleBlockMeta.grade}
                            onChange={(e) => handleMetaChange('grade', e.target.value)}
                            placeholder="A+"
                            className="w-full px-2.5 py-1.5 rounded-xl border border-current/15 bg-black/5 dark:bg-white/5 focus:outline-none focus:ring-1 focus:ring-current text-xs"
                          />
                        </div>
                      )}

                      {titleBlockOptions.fields.valuedBy && (
                        <div>
                          <span className="text-[10px] opacity-60 block mb-0.5">Valued By</span>
                          <input
                            type="text"
                            value={titleBlockMeta.valuedBy}
                            onChange={(e) => handleMetaChange('valuedBy', e.target.value)}
                            placeholder="Faculty Signature"
                            className="w-full px-2.5 py-1.5 rounded-xl border border-current/15 bg-black/5 dark:bg-white/5 focus:outline-none focus:ring-1 focus:ring-current text-xs"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-2 text-[11px] opacity-65 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>
                    Title Block box is omitted. Quadrant 4 Isometric View is expanded and centered.
                  </span>
                </div>
              )}
            </div>

            {/* Choose Download Format */}
            <div className="space-y-2">
              <div className="text-[11px] font-semibold uppercase tracking-wider opacity-60">
                Choose Download Format
              </div>
              <div className="space-y-2">
                {formats.map((fmt) => {
                  const isBusy = busyFormat === fmt.id;
                  const isDone = downloadedFormat === fmt.id;
                  return (
                    <button
                      key={fmt.id}
                      type="button"
                      disabled={busyFormat !== null}
                      onClick={() => handleDownload(fmt.id)}
                      className="w-full p-3 rounded-2xl glass-card text-left flex items-center justify-between gap-3 group cursor-pointer disabled:opacity-60"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-current/10 flex items-center justify-center shrink-0 mt-0.5">
                          {fmt.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-semibold">{fmt.title}</span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-current/10 tabular-nums">
                              {fmt.badge}
                            </span>
                          </div>
                          <p className="text-[11px] opacity-60 mt-0.5 leading-snug">{fmt.subtitle}</p>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {isDone ? (
                          <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-500 text-[11px] font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Saved
                          </span>
                        ) : (
                          <span className="px-3 py-1.5 rounded-full glass-pill-active text-[11px] font-semibold flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {isBusy ? '...' : 'Save'}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
