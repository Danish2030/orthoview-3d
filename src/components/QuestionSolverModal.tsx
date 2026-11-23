import React, { useMemo, useState } from 'react';
import {
  X,
  Wand2,
  CheckCircle2,
  AlertCircle,
  Download,
  ExternalLink,
  Sparkles,
  Send,
} from 'lucide-react';
import { SolidDimensions, SolidRotation, SolidType, ThemeMode } from '../types';
import { parseEngineeringQuestion, SAMPLE_QUESTIONS } from '../utils/questionParser';

interface QuestionSolverModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  onApplySolution: (params: {
    solidType: SolidType;
    dimensions: SolidDimensions;
    rotation: SolidRotation;
    exportAfter?: boolean;
  }) => void;
}

const REPO_ISSUES_BASE = ['https:/', 'github.com', 'Danish2030', 'orthoview-3d', 'issues', 'new'].join('/');

export const QuestionSolverModal: React.FC<QuestionSolverModalProps> = ({
  isOpen,
  onClose,
  theme,
  onApplySolution,
}) => {
  const [question, setQuestion] = useState<string>(SAMPLE_QUESTIONS[0].text);
  const isDark = theme === 'blueprint';

  const parsed = useMemo(() => {
    if (!question.trim()) return null;
    return parseEngineeringQuestion(question);
  }, [question]);

  if (!isOpen) return null;

  const handleGenerate = (exportAfter = false) => {
    if (!parsed) return;
    onApplySolution({
      solidType: parsed.solidType,
      dimensions: parsed.dimensions,
      rotation: parsed.rotation,
      exportAfter,
    });
    onClose();
  };

  const issueParams = new URLSearchParams({
    title: 'Custom Drawing Request',
    body: `### Engineering Graphics Question\n${
      question.trim() || '(Describe your problem or paste dimensions here)'
    }\n\n### Requested Views\n- Front View (FV)\n- Top View (TV)\n- Left-Hand Side View (LHSV)\n`,
  });
  const githubIssueUrl = `${REPO_ISSUES_BASE}?${issueParams.toString()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-md select-text">
      <div
        className={`w-full max-w-2xl rounded-3xl glass-modal overflow-hidden flex flex-col max-h-[90vh] ${
          isDark ? 'text-[#f3f2fa]' : 'text-[#141326]'
        }`}
      >
        {/* Header */}
        <div
          className={`px-5 py-4 border-b flex items-center justify-between ${
            isDark ? 'border-white/10 bg-white/[0.03]' : 'border-indigo-950/10 bg-white/40'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-500/40 flex items-center justify-center">
              <Wand2 className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight">
                Question-to-Drawing Solver
              </h2>
              <p className="text-[11px] text-slate-400">
                Paste any Engineering Graphics question to generate accurate ISO First-Angle projections
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-200 text-slate-600'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Sample Questions */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              Try a Sample Question
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_QUESTIONS.map((sample) => (
                <button
                  key={sample.label}
                  onClick={() => setQuestion(sample.text)}
                  className={`px-2.5 py-1 text-[11px] rounded-md border transition-colors ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 hover:border-violet-500/60 text-slate-300'
                      : 'bg-slate-100 border-slate-300 hover:border-violet-500 text-slate-700'
                  }`}
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Enter Your Engineering Graphics Question
            </label>
            <textarea
              rows={3}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. A hexagonal prism of base 40mm and height 75mm rests on HP, inclined at 30 degrees to HP..."
              className={`w-full rounded-lg border p-3 text-xs focus:outline-none focus:ring-2 focus:ring-violet-500/60 resize-none ${
                isDark
                  ? 'bg-slate-950 border-slate-700 text-slate-100 placeholder-slate-500'
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          {/* Live Parsed Preview */}
          {parsed && (
            <div
              className={`rounded-lg border p-3.5 space-y-2.5 ${
                isDark
                  ? 'bg-slate-900/70 border-slate-800'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  {parsed.confidence === 'low' ? (
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  )}
                  <span>Detected CAD Specification</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded uppercase font-semibold ${
                    parsed.confidence === 'high'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : parsed.confidence === 'medium'
                      ? 'bg-sky-500/20 text-sky-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {parsed.confidence} match
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div
                  className={`p-2 rounded border ${
                    isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="text-[10px] text-slate-400">Solid</div>
                  <div className="font-bold text-sky-400 truncate" title={parsed.solidName}>
                    {parsed.solidName}
                  </div>
                </div>
                <div
                  className={`p-2 rounded border ${
                    isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="text-[10px] text-slate-400">Dimensions (L×W×H)</div>
                  <div className="font-bold text-emerald-400">
                    {parsed.dimensions.length} × {parsed.dimensions.width} × {parsed.dimensions.height} mm
                  </div>
                </div>
                <div
                  className={`p-2 rounded border ${
                    isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="text-[10px] text-slate-400">Inclination (X/Y/Z)</div>
                  <div className="font-bold text-amber-400">
                    {parsed.rotation.x}° / {parsed.rotation.y}° / {parsed.rotation.z}°
                  </div>
                </div>
              </div>

              <ul className="text-[11px] text-slate-400 space-y-0.5 list-disc list-inside">
                {parsed.notes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Custom Request Fallback */}
          <div
            className={`rounded-lg border p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
              isDark
                ? 'bg-violet-950/20 border-violet-800/40'
                : 'bg-violet-50 border-violet-200'
            }`}
          >
            <div className="text-[11px]">
              <div className="font-bold text-violet-400">
                Have a custom or complex textbook part?
              </div>
              <div className="text-slate-400">
                Send us your exact question on GitHub and we will add or prepare the accurate CAD projection.
              </div>
            </div>
            <a
              href={githubIssueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-3 py-1.5 text-[11px] font-semibold rounded-lg border border-violet-500/50 bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-3 h-3" />
              Send Question
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          className={`px-5 py-3.5 border-t flex flex-wrap items-center justify-end gap-2 ${
            isDark ? 'border-white/10 bg-white/[0.03]' : 'border-indigo-950/10 bg-white/40'
          }`}
        >
          <button
            onClick={onClose}
            className={`px-3 py-1.5 text-xs rounded-lg border ${
              isDark
                ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                : 'border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={() => handleGenerate(false)}
            disabled={!parsed}
            className="px-4 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 text-white shadow-[0_6px_22px_rgba(124,58,237,0.38)] flex items-center gap-1.5 disabled:opacity-50 transition-all"
          >
            <Wand2 className="w-3.5 h-3.5" />
            Generate Accurate Drawing
          </button>
          <button
            onClick={() => handleGenerate(true)}
            disabled={!parsed}
            className="px-4 py-1.5 text-xs font-bold rounded-full glass-pill-active text-violet-950 dark:text-white flex items-center gap-1.5 disabled:opacity-50 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Generate &amp; Save PNG
          </button>
        </div>
      </div>
    </div>
  );
};
