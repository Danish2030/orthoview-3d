import React, { useRef, useState } from 'react';
import {
  X,
  Upload,
  Sparkles,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  Sliders,
  ChevronDown,
  ChevronUp,
  Wand2,
  Server,
  Layers,
} from 'lucide-react';
import {
  CompositePartSpec,
  SideViewMode,
  SolidDimensions,
  SolidType,
  ThemeMode,
  UniversalPartBlueprint,
} from '../types';
import {
  analyzeIsometricImage,
  ImageCadExtraction,
  OFFLINE_IMAGE_PRESETS,
  parseQuickPhotoDimensions,
} from '../utils/imageToCad';

interface ImageSolverModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  onApplyImageSolution: (params: {
    partName: string;
    solidType: SolidType;
    dimensions: SolidDimensions;
    sideViewMode: SideViewMode;
    compositeSpec?: CompositePartSpec;
    universalBlueprint?: UniversalPartBlueprint;
  }) => void;
}

export const ImageSolverModal: React.FC<ImageSolverModalProps> = ({
  isOpen,
  onClose,
  theme,
  onApplyImageSolution,
}) => {
  const isDark = theme === 'blueprint';
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [quickDimsText, setQuickDimsText] = useState<string>('');
  const [extraction, setExtraction] = useState<ImageCadExtraction>(OFFLINE_IMAGE_PRESETS[0]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Advanced Self-Host / Key Settings Drawer
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [customProxyUrl, setCustomProxyUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('orthoview-proxy-url') || '';
    } catch {
      return '';
    }
  });
  const [apiKey, setApiKey] = useState<string>(() => {
    try {
      return localStorage.getItem('orthoview-gemini-key') || '';
    } catch {
      return '';
    }
  });

  if (!isOpen) return null;

  const handleSaveKey = (val: string) => {
    setApiKey(val);
    try {
      if (val.trim()) {
        localStorage.setItem('orthoview-gemini-key', val.trim());
      } else {
        localStorage.removeItem('orthoview-gemini-key');
      }
    } catch {
      // ignore
    }
  };

  const handleSaveProxy = (val: string) => {
    setCustomProxyUrl(val);
    try {
      if (val.trim()) {
        localStorage.setItem('orthoview-proxy-url', val.trim());
      } else {
        localStorage.removeItem('orthoview-proxy-url');
      }
    } catch {
      // ignore
    }
  };

  const runAnalysis = async (dataUrl: string, hint?: string) => {
    setIsAnalyzing(true);
    setError(null);
    setStatusMessage('Analyzing drawing geometry & dimensions...');
    try {
      const result = await analyzeIsometricImage(dataUrl, {
        userHint: hint,
        apiKey: apiKey.trim() || undefined,
        proxyUrl: customProxyUrl.trim() || undefined,
      });
      setExtraction(result);
      setStatusMessage(
        result.source === 'serverless-proxy' || result.source === 'gemini-vision'
          ? 'CAD AI detected geometry & dimensions! Ready to generate.'
          : result.source === 'ocr-inference'
          ? 'On-image dimensions detected via OCR! Ready to generate.'
          : 'Dimensions parsed! Ready to generate.'
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const dataUrl = reader.result;
        setImagePreview(dataUrl);
        // Instant 1-step automatic analysis!
        runAnalysis(dataUrl, quickDimsText);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleQuickApplyText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickDimsText.trim()) return;
    const updated = parseQuickPhotoDimensions(quickDimsText, extraction);
    setExtraction(updated);
    setStatusMessage(updated.summary);
  };

  const updateSpecField = <K extends keyof CompositePartSpec>(
    key: K,
    val: CompositePartSpec[K]
  ) => {
    const nextSpec = { ...extraction.compositeSpec, [key]: val };
    setExtraction({
      ...extraction,
      solidType: extraction.universalBlueprint ? extraction.solidType : 'custom-composite',
      compositeSpec: nextSpec,
      dimensions: {
        length: nextSpec.baseLength,
        width: nextSpec.baseWidth,
        height: nextSpec.totalHeight,
      },
    });
  };

  const handleApply = () => {
    onApplyImageSolution({
      partName: extraction.partName,
      solidType: extraction.solidType,
      dimensions: extraction.dimensions,
      sideViewMode: extraction.sideViewMode,
      compositeSpec: extraction.compositeSpec,
      universalBlueprint: extraction.universalBlueprint,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md select-text">
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
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-[-0.01em]">
                Photo-to-CAD Drawing Builder (Universal 1-Step)
              </h2>
              <p className="text-[11px] opacity-60">
                Upload any engineering drawing photo to automatically extract 3D solids and generate AutoCAD sheets
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
        <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
          {/* Main 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Column: Image Upload & Dropzone */}
            <div className="lg:col-span-5 flex flex-col gap-2">
              <div className="text-[11px] font-semibold uppercase tracking-wider opacity-60">
                1. Upload Question Photo
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div
                onClick={() => !isAnalyzing && fileInputRef.current?.click()}
                className={`w-full min-h-[220px] rounded-2xl border border-dashed border-current/25 glass-card flex flex-col items-center justify-center gap-2 overflow-hidden relative cursor-pointer transition-all ${
                  isAnalyzing ? 'pointer-events-none opacity-80' : 'hover:border-current/40'
                }`}
              >
                {imagePreview ? (
                  <div className="w-full h-full relative flex items-center justify-center p-2">
                    <img
                      src={imagePreview}
                      alt="Uploaded engineering diagram"
                      className="max-h-60 max-w-full object-contain rounded-xl"
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-2 text-white p-4 text-center">
                        <Loader2 className="w-7 h-7 animate-spin text-blue-400" />
                        <span className="text-xs font-semibold">Extracting 3D Geometry...</span>
                        <span className="text-[10px] opacity-75">
                          Detecting contours, slots, bosses &amp; dimensions
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="w-11 h-11 rounded-2xl bg-current/5 border border-current/10 flex items-center justify-center">
                      <Upload className="w-5 h-5 opacity-70" />
                    </div>
                    <span className="text-xs font-semibold">Click to Upload Drawing Photo</span>
                    <span className="text-[10px] opacity-55 px-6 text-center">
                      PNG, JPG, or WebP. Auto-detects dimensions and 3D primitives
                    </span>
                  </>
                )}
              </div>

              {imagePreview && !isAnalyzing && (
                <div className="flex items-center justify-between text-[11px]">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="opacity-65 hover:opacity-100 underline cursor-pointer"
                  >
                    Change photo
                  </button>
                  <button
                    type="button"
                    onClick={() => runAnalysis(imagePreview, quickDimsText)}
                    className="opacity-75 hover:opacity-100 flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Sparkles className="w-3 h-3 text-blue-400" />
                    <span>Re-scan</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Detected Geometry & Plain-English Quick Edits */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider opacity-60">
                2. Detected CAD Blueprint
              </div>

              {/* Extraction Summary Card */}
              <div className="p-4 rounded-2xl glass-card space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xs font-bold tracking-tight">{extraction.partName}</h3>
                    <p className="text-[11px] opacity-70 mt-0.5 leading-relaxed">
                      {extraction.summary}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0 uppercase tracking-wider ${
                      extraction.source === 'serverless-proxy' || extraction.source === 'gemini-vision'
                        ? 'bg-blue-500/15 text-blue-500 dark:text-blue-300 border border-blue-500/30'
                        : extraction.source === 'ocr-inference'
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30'
                        : 'bg-current/10 opacity-70'
                    }`}
                  >
                    {extraction.source}
                  </span>
                </div>

                {extraction.callouts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {extraction.callouts.map((c, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-lg bg-current/5 border border-current/10 opacity-80"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                {extraction.universalBlueprint && (
                  <div className="text-[10px] opacity-65 flex items-center gap-1.5 pt-1 border-t border-current/10">
                    <Layers className="w-3 h-3" />
                    <span>
                      True CSG 3D Solid ({extraction.universalBlueprint.operations.length} boolean operations)
                    </span>
                  </div>
                )}
              </div>

              {/* Quick-Type Override */}
              <form
                onSubmit={handleQuickApplyText}
                className="p-3 rounded-2xl glass-card space-y-1.5"
              >
                <div className="text-[11px] font-semibold flex items-center gap-1.5">
                  <Wand2 className="w-3.5 h-3.5 opacity-75" />
                  <span>Manual Dimension Override (Optional)</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={quickDimsText}
                    onChange={(e) => setQuickDimsText(e.target.value)}
                    placeholder="e.g. 140x50x50, boss 64, hole 40 deep 24, slot 30"
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl glass-input"
                  />
                  <button
                    type="submit"
                    disabled={!quickDimsText.trim()}
                    className="px-3.5 py-1.5 rounded-xl glass-pill-active text-[11px] font-semibold disabled:opacity-40 cursor-pointer shrink-0"
                  >
                    Apply
                  </button>
                </div>
              </form>
            </div>
          </div>

          {error && (
            <div className="px-3.5 py-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-500 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {statusMessage && !error && (
            <div className="px-3.5 py-2.5 rounded-2xl glass-card text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 opacity-80 shrink-0 text-emerald-500" />
              <span className="opacity-85">{statusMessage}</span>
            </div>
          )}

          {/* Step 3: Exact Parametric Dimension Controls */}
          <div className="p-4 rounded-2xl glass-card space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-semibold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 opacity-80" />
                <span>3. Exact Parameter Dimensions (mm)</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="opacity-55">Side View:</span>
                <button
                  type="button"
                  onClick={() => setExtraction({ ...extraction, sideViewMode: 'left' })}
                  className={`px-2.5 py-0.5 rounded-full cursor-pointer ${
                    extraction.sideViewMode === 'left'
                      ? 'glass-pill-active font-semibold'
                      : 'glass-pill opacity-70'
                  }`}
                >
                  LHSV
                </button>
                <button
                  type="button"
                  onClick={() => setExtraction({ ...extraction, sideViewMode: 'right' })}
                  className={`px-2.5 py-0.5 rounded-full cursor-pointer ${
                    extraction.sideViewMode === 'right'
                      ? 'glass-pill-active font-semibold'
                      : 'glass-pill opacity-70'
                  }`}
                >
                  RHSV
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-[11px]">
              {[
                { k: 'baseLength' as const, label: 'Length (L)' },
                { k: 'baseWidth' as const, label: 'Width (W)' },
                { k: 'totalHeight' as const, label: 'Total Height (H)' },
                { k: 'baseThickness' as const, label: 'Base Thickness' },
                { k: 'bossDiameter' as const, label: 'Boss Ø / Size' },
                { k: 'holeDiameter' as const, label: 'Hole Ø' },
                { k: 'holeDepth' as const, label: 'Hole Depth' },
                { k: 'slotDepth' as const, label: 'Slot Depth' },
                { k: 'slotWidth' as const, label: 'Slot Width' },
              ].map((f) => (
                <label key={f.k} className="space-y-0.5">
                  <span className="text-[10px] opacity-55 block">{f.label}</span>
                  <input
                    type="number"
                    value={extraction.compositeSpec[f.k]}
                    onChange={(e) =>
                      updateSpecField(f.k, Math.max(0, Number(e.target.value) || 0))
                    }
                    className="w-full px-2.5 py-1.5 text-xs rounded-xl glass-input tabular-nums"
                  />
                </label>
              ))}

              <label className="space-y-0.5">
                <span className="text-[10px] opacity-55 block">Center Boss</span>
                <select
                  value={extraction.compositeSpec.bossShape}
                  onChange={(e) =>
                    updateSpecField(
                      'bossShape',
                      e.target.value as CompositePartSpec['bossShape']
                    )
                  }
                  className="w-full px-2.5 py-1.5 text-xs rounded-xl glass-input"
                >
                  <option value="cylinder">Cylinder</option>
                  <option value="box">Rectangular</option>
                  <option value="none">None</option>
                </select>
              </label>
            </div>

            <div className="flex flex-wrap gap-5 pt-1 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={extraction.compositeSpec.hasEndSlots}
                  onChange={(e) => updateSpecField('hasEndSlots', e.target.checked)}
                />
                <span>Include End U-Slots</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={extraction.compositeSpec.hasHole}
                  onChange={(e) => updateSpecField('hasHole', e.target.checked)}
                />
                <span>Include Central Hole</span>
              </label>
            </div>
          </div>

          {/* Collapsible Advanced Settings (Self-Host Endpoint / Custom API Key) */}
          <div className="rounded-2xl border border-current/10 overflow-hidden">
            <button
              type="button"
              onClick={() => setShowAdvanced((v) => !v)}
              className="w-full px-4 py-2.5 text-[11px] font-medium opacity-70 hover:opacity-100 flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5" />
                <span>Advanced / Self-Host Settings (Optional Custom Proxy or Gemini Key)</span>
              </span>
              {showAdvanced ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            {showAdvanced && (
              <div className="px-4 pb-4 pt-2 space-y-3 border-t border-current/10 text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] opacity-60 block">
                    Custom Cloudflare Worker / Serverless Proxy URL:
                  </label>
                  <input
                    type="url"
                    value={customProxyUrl}
                    onChange={(e) => handleSaveProxy(e.target.value)}
                    placeholder="https://your-worker.yourname.workers.dev/analyze"
                    className="w-full px-3 py-1.5 text-xs rounded-xl glass-input"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] opacity-60 block">
                    Direct Gemini API Key (stored locally in browser):
                  </label>
                  <div className="relative">
                    <KeyRound className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => handleSaveKey(e.target.value)}
                      placeholder="AIzaSy..."
                      className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl glass-input"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className={`px-6 py-3.5 border-t flex items-center justify-between gap-2 ${
            isDark ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-white/40'
          }`}
        >
          <span className="text-[11px] opacity-55 hidden sm:inline">
            Generates Front, Side, Top &amp; Isometric Views + College Title Block
          </span>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs rounded-full glass-pill cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={isAnalyzing}
              className="px-5 py-2 text-xs font-semibold rounded-full glass-pill-active flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Generate Accurate AutoCAD Sheet</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
