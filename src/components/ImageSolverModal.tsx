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
} from 'lucide-react';
import { CompositePartSpec, SideViewMode, SolidDimensions, SolidType, ThemeMode } from '../types';
import {
  analyzeIsometricImageWithGemini,
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
    compositeSpec: CompositePartSpec;
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
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Optional Advanced AI Vision (hidden by default so normal users never see API key friction)
  const [showAdvancedAI, setShowAdvancedAI] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>(() => {
    try {
      return localStorage.getItem('orthoview-gemini-key') || '';
    } catch {
      return '';
    }
  });
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImagePreview(reader.result);
        setStatusMessage(
          'Photo loaded! Match the closest shape on the right, adjust any dimensions you see on your photo, and tap Generate.'
        );
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

  const handleAnalyzeWithAI = async () => {
    if (!imagePreview) {
      setError('Upload a photo first to run AI Vision.');
      return;
    }
    if (!apiKey.trim()) {
      setError('Paste a Google AI Studio key to use optional AI auto-scan, or just use the free controls above.');
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeIsometricImageWithGemini(apiKey, imagePreview, quickDimsText);
      setExtraction(result);
      setStatusMessage('AI Vision extracted all dimensions! Verify below and click Generate.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const updateSpecField = <K extends keyof CompositePartSpec>(key: K, val: CompositePartSpec[K]) => {
    const nextSpec = { ...extraction.compositeSpec, [key]: val };
    setExtraction({
      ...extraction,
      solidType: 'custom-composite',
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
                Photo-to-CAD Drawing Builder (No API Key Needed)
              </h2>
              <p className="text-[11px] opacity-60">
                Upload your question photo as a side-by-side reference, pick the closest shape, and generate the AutoCAD 4-view sheet
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
          {/* Side-by-Side Photo Reference + Shape Picker */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left: Uploaded Question Photo Reference */}
            <div className="lg:col-span-5 flex flex-col gap-2">
              <div className="text-[11px] font-semibold uppercase tracking-wider opacity-60">
                1. Your Question Photo (Optional)
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex-1 min-h-[190px] rounded-2xl border border-dashed border-current/25 glass-card flex flex-col items-center justify-center gap-2 overflow-hidden relative cursor-pointer"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Uploaded isometric problem"
                    className="w-full h-full max-h-56 object-contain p-2"
                  />
                ) : (
                  <>
                    <Upload className="w-6 h-6 opacity-60" />
                    <span className="text-xs font-semibold">Tap to Upload Question Photo</span>
                    <span className="text-[10px] opacity-55 px-5 text-center">
                      Keeps your textbook diagram right here so you can copy dimensions easily
                    </span>
                  </>
                )}
              </button>
              {imagePreview && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[11px] opacity-65 hover:opacity-100 underline self-start cursor-pointer"
                >
                  Change photo
                </button>
              )}
            </div>

            {/* Right: 1-Tap Shape Templates + Plain-English Quick Dimensions */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-3">
              <div className="space-y-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider opacity-60">
                  2. Pick Closest Shape (Works 100% Free &amp; Offline)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {OFFLINE_IMAGE_PRESETS.map((preset) => {
                    const selected = extraction.partName === preset.partName;
                    return (
                      <button
                        key={preset.partName}
                        type="button"
                        onClick={() => {
                          setExtraction(preset);
                          setStatusMessage(`Loaded "${preset.partName}" — tweak any dimensions below or click Generate.`);
                          setError(null);
                        }}
                        className={`p-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                          selected ? 'glass-pill-active font-semibold' : 'glass-card opacity-85 hover:opacity-100'
                        }`}
                      >
                        <div className="text-xs font-semibold truncate">{preset.partName}</div>
                        <div className="text-[10px] opacity-70 truncate mt-0.5">
                          {preset.callouts.join(' • ')}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Plain-English Quick Dimensions Input */}
              <form onSubmit={handleQuickApplyText} className="p-3 rounded-2xl glass-card space-y-2">
                <div className="text-[11px] font-semibold flex items-center gap-1.5">
                  <Wand2 className="w-3.5 h-3.5 opacity-75" />
                  <span>Quick-Type Numbers from Photo (Optional)</span>
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

          {statusMessage && (
            <div className="px-3.5 py-2.5 rounded-2xl glass-card text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 opacity-80 shrink-0" />
              <span className="opacity-85">{statusMessage}</span>
            </div>
          )}

          {/* Step 3: Clean Editable Dimensions Grid */}
          <div className="p-4 rounded-2xl glass-card space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-semibold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 opacity-80" />
                <span>3. Fine-Tune Exact Dimensions (mm)</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="opacity-55">Side View:</span>
                <button
                  type="button"
                  onClick={() => setExtraction({ ...extraction, sideViewMode: 'left' })}
                  className={`px-2.5 py-0.5 rounded-full cursor-pointer ${
                    extraction.sideViewMode === 'left' ? 'glass-pill-active font-semibold' : 'glass-pill opacity-70'
                  }`}
                >
                  LHSV
                </button>
                <button
                  type="button"
                  onClick={() => setExtraction({ ...extraction, sideViewMode: 'right' })}
                  className={`px-2.5 py-0.5 rounded-full cursor-pointer ${
                    extraction.sideViewMode === 'right' ? 'glass-pill-active font-semibold' : 'glass-pill opacity-70'
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
                    onChange={(e) => updateSpecField(f.k, Math.max(0, Number(e.target.value) || 0))}
                    className="w-full px-2.5 py-1.5 text-xs rounded-xl glass-input tabular-nums"
                  />
                </label>
              ))}

              <label className="space-y-0.5">
                <span className="text-[10px] opacity-55 block">Center Boss</span>
                <select
                  value={extraction.compositeSpec.bossShape}
                  onChange={(e) =>
                    updateSpecField('bossShape', e.target.value as CompositePartSpec['bossShape'])
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

          {/* Collapsible Optional Advanced AI Vision Drawer (Hidden by Default) */}
          <div className="rounded-2xl border border-current/10 overflow-hidden">
            <button
              type="button"
              onClick={() => setShowAdvancedAI((v) => !v)}
              className="w-full px-4 py-2.5 text-[11px] font-medium opacity-70 hover:opacity-100 flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Advanced (Optional): Auto-scan photo using your own Gemini Vision key</span>
              </span>
              {showAdvancedAI ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showAdvancedAI && (
              <div className="px-4 pb-4 pt-1 space-y-2.5 border-t border-current/10">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <KeyRound className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => handleSaveKey(e.target.value)}
                      placeholder="Paste optional Google AI Studio key (stored locally in your browser)"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl glass-input"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAnalyzeWithAI}
                    disabled={isAnalyzing}
                    className="px-4 py-2 rounded-xl glass-pill-active text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer shrink-0"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Scanning...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Auto-Scan Photo</span>
                      </>
                    )}
                  </button>
                </div>

                {error && (
                  <div className="text-[11px] text-rose-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
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
            <button onClick={onClose} className="px-4 py-2 text-xs rounded-full glass-pill cursor-pointer">
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-5 py-2 text-xs font-semibold rounded-full glass-pill-active flex items-center gap-1.5 cursor-pointer"
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
