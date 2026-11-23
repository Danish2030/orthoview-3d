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
  BookMarked,
  ArrowUpRight,
} from 'lucide-react';
import {
  LineProblemParams,
  PlanometricParams,
  SideViewMode,
  SolidDimensions,
  SolidRotation,
  SolidType,
  StudioModule,
  ThemeMode,
} from '../types';
import { parseEngineeringQuestion, SAMPLE_QUESTIONS } from '../utils/questionParser';
import { EXAM_BANK_24EST1004C, ExamBankQuestion } from '../utils/examBank';

interface QuestionSolverModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  onApplySolution: (params: {
    targetModule: StudioModule;
    solidType: SolidType;
    dimensions: SolidDimensions;
    rotation: SolidRotation;
    sideViewMode?: SideViewMode;
    lineParams?: LineProblemParams;
    planometricParams?: PlanometricParams;
    questionText?: string;
    phase2Note?: string;
    exportAfter?: boolean;
  }) => void;
}

const REPO_ISSUES = 'https://github.com/Danish2030/orthoview-3d/issues/new';

export const QuestionSolverModal: React.FC<QuestionSolverModalProps> = ({
  isOpen,
  onClose,
  theme,
  onApplySolution,
}) => {
  const [activeTab, setActiveTab] = useState<'exam' | 'custom'>('exam');
  const [question, setQuestion] = useState<string>(SAMPLE_QUESTIONS[0].text);
  const isDark = theme === 'blueprint';

  const parsed = useMemo(() => {
    if (!question.trim()) return null;
    return parseEngineeringQuestion(question);
  }, [question]);

  if (!isOpen) return null;

  const handleGenerateCustom = (exportAfter = false) => {
    if (!parsed) return;
    onApplySolution({
      targetModule: parsed.targetModule,
      solidType: parsed.solidType,
      dimensions: parsed.dimensions,
      rotation: parsed.rotation,
      sideViewMode: parsed.sideViewMode,
      lineParams: parsed.lineParams,
      planometricParams: parsed.planometricParams,
      questionText: question.trim(),
      exportAfter,
    });
    onClose();
  };

  const handleLoadExamQuestion = (q: ExamBankQuestion) => {
    onApplySolution({
      targetModule: q.targetModule,
      solidType: q.solidType || 'l-block',
      dimensions: q.dimensions || { length: 60, width: 40, height: 50 },
      rotation: q.rotation || { x: 0, y: 0, z: 0 },
      sideViewMode: q.sideViewMode || 'left',
      lineParams: q.lineParams,
      planometricParams: q.planometricParams,
      questionText: `${q.qNo}: ${q.title}`,
      phase2Note: q.phase2Note,
    });
    onClose();
  };

  const issueParams = new URLSearchParams({
    title: 'Custom Drawing Request',
    body: `### Engineering Graphics Question\n${
      question.trim() || '(Describe your problem or paste dimensions here)'
    }`,
  });
  const githubIssueUrl = `${REPO_ISSUES}?${issueParams.toString()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md select-text">
      <div
        className={`w-full max-w-3xl rounded-[28px] glass-modal overflow-hidden flex flex-col max-h-[90vh] ${
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
              <Wand2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-[-0.01em]">
                Question Solver &amp; 24EST1004-C Exam Bank
              </h2>
              <p className="text-[11px] opacity-60">
                Load any of the 10 B.Tech exam questions or paste your own problem statement
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

        {/* Mode Switcher */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-2 p-1 rounded-full glass-card text-xs font-medium">
            <button
              onClick={() => setActiveTab('exam')}
              className={`py-2 rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'exam' ? 'glass-pill-active font-semibold' : 'opacity-65 hover:opacity-100'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" />
              <span>24EST1004-C Exam Bank (10)</span>
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`py-2 rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'custom' ? 'glass-pill-active font-semibold' : 'opacity-65 hover:opacity-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Custom Question</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
          {activeTab === 'exam' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EXAM_BANK_24EST1004C.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleLoadExamQuestion(q)}
                  className="p-4 rounded-2xl glass-card text-left flex flex-col justify-between gap-2.5 group cursor-pointer"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-current/10">
                        {q.moduleLabel} • {q.qNo}
                      </span>
                      <span className="text-[10px] opacity-60 flex items-center gap-1">
                        {q.targetModule === 'lines'
                          ? 'Line Solver'
                          : q.targetModule === 'planometric'
                          ? 'Planometric'
                          : q.sideViewMode === 'right'
                          ? 'Ortho + RHSV'
                          : 'Ortho 3D'}
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                    <div className="text-xs font-semibold tracking-[-0.01em]">{q.title}</div>
                    <p className="text-[11px] opacity-60 line-clamp-2 leading-relaxed">
                      {q.statement}
                    </p>
                  </div>
                  {q.phase2Note && (
                    <div className="text-[10px] opacity-55 pt-1.5 border-t border-current/10">
                      Base solid ready • Full Phase 2 tools in v3.2
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <>
              <div className="space-y-1.5">
                <div className="text-[11px] font-semibold opacity-60 uppercase tracking-wider">
                  Quick Sample Prompts
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SAMPLE_QUESTIONS.map((sample) => (
                    <button
                      key={sample.label}
                      onClick={() => setQuestion(sample.text)}
                      className="px-3 py-1 text-[11px] rounded-full glass-pill cursor-pointer"
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold opacity-60 uppercase tracking-wider block">
                  Paste Your Engineering Graphics Question
                </label>
                <textarea
                  rows={3}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g. A line AB 60 mm long has one end in HP and 30 mm in front of VP, inclined 30° to HP and 45° to VP..."
                  className="w-full rounded-2xl p-3.5 text-xs glass-input resize-none"
                />
              </div>

              {parsed && (
                <div className="rounded-2xl glass-card p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      {parsed.confidence === 'low' ? (
                        <AlertCircle className="w-4 h-4 opacity-70" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 opacity-85" />
                      )}
                      <span>Auto-Routed Studio Specification</span>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-current/10 uppercase font-semibold">
                      {parsed.targetModule}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-current/5">
                      <div className="text-[10px] opacity-55">Target / Solid</div>
                      <div className="font-semibold truncate">{parsed.solidName}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-current/5">
                      <div className="text-[10px] opacity-55">Parameters (mm)</div>
                      <div className="font-semibold tabular-nums">
                        {parsed.dimensions.length} × {parsed.dimensions.width} × {parsed.dimensions.height}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-current/5">
                      <div className="text-[10px] opacity-55">Angles (HP / VP)</div>
                      <div className="font-semibold tabular-nums">
                        {parsed.rotation.x}° / {parsed.rotation.y}°
                      </div>
                    </div>
                  </div>

                  <ul className="text-[11px] opacity-65 space-y-0.5 list-disc list-inside">
                    {parsed.notes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-2xl glass-card p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-[11px]">
                  <div className="font-semibold">Need a custom textbook part added?</div>
                  <div className="opacity-60">
                    Submit your question directly to the GitHub repository issues queue.
                  </div>
                </div>
                <a
                  href={githubIssueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-3.5 py-1.5 text-[11px] font-semibold rounded-full glass-pill flex items-center gap-1.5"
                >
                  <Send className="w-3 h-3" />
                  Send Question
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {activeTab === 'custom' && (
          <div
            className={`px-6 py-3.5 border-t flex flex-wrap items-center justify-end gap-2 ${
              isDark ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-white/40'
            }`}
          >
            <button onClick={onClose} className="px-4 py-2 text-xs rounded-full glass-pill cursor-pointer">
              Cancel
            </button>
            <button
              onClick={() => handleGenerateCustom(false)}
              disabled={!parsed}
              className="px-4 py-2 text-xs font-semibold rounded-full glass-pill-active flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              <Wand2 className="w-3.5 h-3.5" />
              Solve &amp; Open Studio
            </button>
            {parsed?.targetModule === 'orthographic' && (
              <button
                onClick={() => handleGenerateCustom(true)}
                disabled={!parsed}
                className="px-4 py-2 text-xs font-semibold rounded-full glass-pill flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Generate &amp; Save PNG
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
