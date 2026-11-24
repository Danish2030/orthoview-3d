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
} from 'lucide-react';
import { CompositePartSpec, SideViewMode, SolidDimensions, SolidType, ThemeMode } from '../types';
import {
  analyzeIsometricImageWithGemini,
  ImageCadExtraction,
  OFFLINE_IMAGE_PRESETS,
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

  const [apiKey, setApiKey] = useState<string>(() => {
    try {
      return localStorage.getItem('orthoview-gemini-key') || '';
    } catch {
      return '';
    }
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [hint, setHint] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [extraction, setExtraction] = useState<ImageCadExtraction | null>(OFFLINE_IMAGE_PRESETS[0]);

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
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!imagePreview) {
      setError('Upload an isometric question photo first.');
      return;
    }
    if (!apiKey.trim()) {
      setError(
        'Enter your free Gemini API key above to run Vision extraction, or load/edit one of the instant presets below.'
      );
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeIsometricImageWithGemini(apiKey, imagePreview, hint);
      setExtraction(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const updateSpecField = <K extends keyof CompositePartSpec>(key: K, val: CompositePartSpec[K]) => {
    if (!extraction) return;
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
    if (!extraction) return;
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
        className={`w-full max-w-3xl rounded-[28px] glass-modal overflow-hidden flex flex-col max-h-[92vh] ${
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
                Image-to-CAD Solver (Photo → AutoCAD 4-View Sheet)
              </h2>
              <p className="text-[11px] opacity-60">
                Upload an isometric question photo to extract exact mm dimensions and render accurate projections
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
          {/* Upload + Vision Key Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Upload Dropzone */}
            <div className="md:col-span-6 space-y-2">
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
                className="w-full h-44 rounded-2xl border border-dashed border-current/25 glass-card flex flex-col items-center justify-center gap-2 overflow-hidden relative cursor-pointer"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Uploaded isometric problem"
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <>
                    <Upload className="w-6 h-6 opacity-60" />
                    <span className="text-xs font-semibold">Upload Question Image</span>
                    <span className="text-[10px] opacity-55 px-4 text-center">
                      Tap to pick a textbook isometric photo (PNG, JPG)
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Gemini Vision BYOK & Analyze */}
            <div className="md:col-span-6 flex flex-col justify-between gap-2.5">
              <div className="p-3.5 rounded-2xl glass-card space-y-2">
                <label className="text-[11px] font-semibold flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 opacity-75" />
                  <span>Gemini Vision API Key (Optional • Stored Locally)</span>
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => handleSaveKey(e.target.value)}
                  placeholder="AIza... (paste free Google AI Studio key)"
                  className="w-full px-3 py-2 text-xs rounded-xl glass-input"
                />
                <input
                  type="text"
                  value={hint}
                  onChange={(e) => setHint(e.target.value)}
                  placeholder="Optional hint (e.g. front view from right, RHSV)"
                  className="w-full px-3 py-1.5 text-[11px] rounded-xl glass-input"
                />
              </div>

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full py-2.5 rounded-full glass-pill-active text-xs font-semibold flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Extracting CAD Dimensions...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Analyze Uploaded Image with Vision</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-2xl border border-rose-500/35 bg-rose-500/10 text-rose-400 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Instant Offline Textbook Presets */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider opacity-60">
              Instant Textbook Presets (Works Without API Key)
            </div>
            <div className="flex flex-wrap gap-2">
              {OFFLINE_IMAGE_PRESETS.map((preset) => (
                <button
                  key={preset.partName}
                  type="button"
                  onClick={() => {
                    setExtraction(preset);
                    setError(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all ${
                    extraction?.partName === preset.partName
                      ? 'glass-pill-active font-semibold'
                      : 'glass-pill opacity-80'
                  }`}
                >
                  {preset.partName}
                </button>
              ))}
            </div>
          </div>

          {/* Extracted / Editable Parametric CAD Features */}
          {extraction && (
            <div className="p-4 rounded-2xl glass-card space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 opacity-80" />
                  <span>{extraction.partName}</span>
                </div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-current/10 uppercase font-semibold">
                  {extraction.source === 'gemini-vision' ? 'Vision Extracted' : 'Parametric CAD Ready'}
                </span>
              </div>

              <p className="text-[11px] opacity-65">{extraction.summary}</p>

              {/* Editable Composite Dimensions Grid */}
              <div className="pt-2 border-t border-current/10 space-y-2">
                <div className="text-[11px] font-semibold opacity-75 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Verify / Edit Extracted Dimensions (mm)</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  {[
                    { k: 'baseLength' as const, label: 'Base Length' },
                    { k: 'baseWidth' as const, label: 'Base Width' },
                    { k: 'baseThickness' as const, label: 'Base Thick' },
                    { k: 'totalHeight' as const, label: 'Total Height' },
                    { k: 'slotDepth' as const, label: 'Slot Depth' },
                    { k: 'slotWidth' as const, label: 'Slot Width' },
                    { k: 'bossDiameter' as const, label: 'Boss Ø / W' },
                    { k: 'holeDiameter' as const, label: 'Hole Ø' },
                    { k: 'holeDepth' as const, label: 'Hole Depth' },
                  ].map((f) => (
                    <label key={f.k} className="space-y-0.5">
                      <span className="text-[10px] opacity-55 block">{f.label}</span>
                      <input
                        type="number"
                        value={extraction.compositeSpec[f.k]}
                        onChange={(e) => updateSpecField(f.k, Math.max(0, Number(e.target.value) || 0))}
                        className="w-full px-2.5 py-1 text-xs rounded-xl glass-input tabular-nums"
                      />
                    </label>
                  ))}

                  <label className="space-y-0.5">
                    <span className="text-[10px] opacity-55 block">Boss Shape</span>
                    <select
                      value={extraction.compositeSpec.bossShape}
                      onChange={(e) =>
                        updateSpecField('bossShape', e.target.value as CompositePartSpec['bossShape'])
                      }
                      className="w-full px-2.5 py-1 text-xs rounded-xl glass-input"
                    >
                      <option value="cylinder">Cylinder</option>
                      <option value="box">Rectangular</option>
                      <option value="none">None</option>
                    </select>
                  </label>
                </div>

                <div className="flex flex-wrap gap-4 pt-1 text-[11px]">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={extraction.compositeSpec.hasEndSlots}
                      onChange={(e) => updateSpecField('hasEndSlots', e.target.checked)}
                    />
                    <span>End U-Slots</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={extraction.compositeSpec.hasHole}
                      onChange={(e) => updateSpecField('hasHole', e.target.checked)}
                    />
                    <span>Central Hole</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`px-6 py-3.5 border-t flex items-center justify-end gap-2 ${
            isDark ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-white/40'
          }`}
        >
          <button onClick={onClose} className="px-4 py-2 text-xs rounded-full glass-pill cursor-pointer">
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={!extraction}
            className="px-5 py-2 text-xs font-semibold rounded-full glass-pill-active flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Generate Accurate AutoCAD Sheet</span>
          </button>
        </div>
      </div>
    </div>
  );
};
