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
} from 'lucide-react';
import { SideViewMode, SolidDimensions, SolidRotation, ThemeMode, TitleBlockMeta } from '../types';
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
    });
  }, [isOpen, geometry, solidName, dimensions, rotation, sideViewMode, titleBlockMeta]);

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
      });
      setDownloadedFormat(format);
      setTimeout(() => setDownloadedFormat(null), 2200);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setBusyFormat(null);
    }
  };

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
      subtitle: '2400×1697 px crisp white paper, black ink lines, 4 views + College Title Block',
      icon: <FileImage className="w-4 h-4" />,
      recommended: true,
    },
    {
      id: 'dxf',
      badge: '.DXF → DWG',
      title: 'AutoCAD Native Vector CAD (DXF)',
      subtitle: 'Opens directly in AutoCAD, LibreCAD & Fusion 360 with editable lines/layers — click Save As .DWG inside AutoCAD',
      icon: <Cpu className="w-4 h-4" />,
      recommended: true,
    },
    {
      id: 'pdf',
      badge: '.PDF',
      title: 'Print-Ready A3 Landscape Sheet',
      subtitle: 'Clean A3 sheet ready for college record submission and printing',
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: 'svg',
      badge: '.SVG',
      title: 'Scalable Vector Drawing (SVG)',
      subtitle: 'Infinite-zoom vector lines for reports, slides, Illustrator, or Figma',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md select-text">
      <div
        className={`w-full max-w-4xl rounded-[28px] glass-modal overflow-hidden flex flex-col max-h-[92vh] ${
          isDark ? 'text-[#f4f4f6]' : 'text-[#0d0d10]'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
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
                Preview your crisp A3 lab output and download in PNG, AutoCAD DXF (for DWG), PDF, SVG, or 3D STL
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
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-y-auto custom-scrollbar">
          {/* Left: Live Pure White AutoCAD Output Preview */}
          <div className="lg:col-span-6 space-y-2.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider opacity-60">
              Live AutoCAD Sheet Preview
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
                <strong>Need a .DWG file?</strong> Download <strong>.DXF</strong> (Autodesk&apos;s official open AutoCAD format). It opens directly in AutoCAD with full 2D layers—just hit <em>File → Save As → .dwg</em>.
              </span>
            </div>
          </div>

          {/* Right: All Available Export Formats */}
          <div className="lg:col-span-6 space-y-2.5">
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
                    className="w-full p-3.5 rounded-2xl glass-card text-left flex items-center justify-between gap-3 group cursor-pointer disabled:opacity-60"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-current/10 flex items-center justify-center shrink-0 mt-0.5">
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
  );
};
