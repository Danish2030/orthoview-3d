import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, Trophy, RotateCcw, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ThemeMode } from '../types';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'In ISO First-Angle Projection, where is the Top View (Plan) drawn on the drawing sheet?',
    options: [
      'Directly BELOW the Front View, on the Horizontal Plane (H.P.)',
      'Directly ABOVE the Front View, on the Vertical Plane (V.P.)',
      'To the right of the Front View, on the Profile Plane (P.P.)',
      'At any arbitrary position as long as dimensions are noted',
    ],
    correctIndex: 0,
    explanation:
      'In First-Angle projection, the observer looks from above, projecting down onto H.P. When H.P. rotates 90° clockwise down, Top View appears directly BELOW the Front View.',
  },
  {
    id: 2,
    question: 'When drawing a First-Angle projection, which side view is placed to the RIGHT of the Front View?',
    options: [
      'Left-Hand Side View (LHSV)',
      'Right-Hand Side View (RHSV)',
      'Bottom View (Inverted Plan)',
      'Axonometric Isometric View',
    ],
    correctIndex: 0,
    explanation:
      'Looking from the left, rays pass through the object and project onto the Right Profile Plane (R.P.P.). When R.P.P. is unfolded to the right, LHSV appears to the RIGHT of Front View.',
  },
  {
    id: 3,
    question: 'What is the spatial relationship between Observer, Object, and Projection Plane in First-Angle?',
    options: [
      'Observer → Object → Plane (Object is between observer and plane)',
      'Observer → Plane → Object (Plane is between observer and object)',
      'Plane → Observer → Object',
      'Object → Observer → Plane',
    ],
    correctIndex: 0,
    explanation:
      'In First-Angle, the object is placed in the First Quadrant between the observer and the plane of projection.',
  },
  {
    id: 4,
    question: 'Why are 2nd-Angle and 4th-Angle projections never utilized in engineering drawing practice?',
    options: [
      'Rotating H.P. by 90° causes Front View and Top View to overlap, creating unreadable clutter',
      'They do not support millimeter or metric dimensioning systems',
      'Computer-aided design software cannot compute negative quadrant coordinates',
      'They require 4 orthogonal projection planes instead of 3',
    ],
    correctIndex: 0,
    explanation:
      'In both 2nd and 4th quadrants, rotating H.P. 90° clockwise brings H.P. and V.P. into the same plane on the same side of the X-Y line, causing views to overlap completely.',
  },
  {
    id: 5,
    question: 'According to BIS SP:46 / ISO standards, what line type must represent hidden features and interior edges?',
    options: [
      'Dashed medium line (Type F)',
      'Continuous thick line (Type A)',
      'Long dash-dotted thin line (Type G)',
      'Wavy freehand line (Type C)',
    ],
    correctIndex: 0,
    explanation:
      'Dashed lines (Type F, medium thickness ~0.3mm) represent hidden outlines and occluded edges behind solid faces.',
  },
  {
    id: 6,
    question: 'In the official ISO First-Angle Projection symbol, which element appears on the RIGHT side?',
    options: [
      'Concentric circles with center crosshairs (representing cone view from smaller end)',
      'Truncated cone trapezoid with smaller end on the left',
      'A shaded equilateral triangle',
      'Two concentric squares with diagonal alignment lines',
    ],
    correctIndex: 0,
    explanation:
      'In First-Angle, observer looks at the frustum cone from its smaller left end; the concentric circles projection is drawn on the RIGHT side.',
  },
];

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, theme }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  if (!isOpen) return null;

  const isDark = theme === 'blueprint';
  const q = QUESTIONS[currentIdx];
  const userAns = selectedAnswers[q.id];
  const isAnswered = userAns !== undefined;

  const handleSelectOption = (optIdx: number) => {
    if (isAnswered) return;
    const newAnswers = { ...selectedAnswers, [q.id]: optIdx };
    setSelectedAnswers(newAnswers);

    // If last question answered, trigger results & check score
    if (Object.keys(newAnswers).length === QUESTIONS.length) {
      const score = QUESTIONS.filter((item) => newAnswers[item.id] === item.correctIndex).length;
      if (score >= 4) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  };

  const calculateScore = () => {
    return QUESTIONS.filter((item) => selectedAnswers[item.id] === item.correctIndex).length;
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-2xl rounded-2xl border shadow-2xl flex flex-col overflow-hidden font-sans ${
          isDark
            ? 'bg-[#0f172a] border-slate-700 text-slate-200'
            : 'bg-white border-slate-300 text-slate-800'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isDark ? 'border-slate-800 bg-[#131c31]' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold font-mono tracking-tight text-slate-100">
                B.TECH ENGINEERING GRAPHICS QUIZ
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                First-Angle Projection & Technical Drawing Conventions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Body */}
        <div className="p-6 overflow-y-auto max-h-[75vh] space-y-5 custom-scrollbar">
          {!showResults ? (
            <>
              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>
                    Question {currentIdx + 1} of {QUESTIONS.length}
                  </span>
                  <span>
                    Answered: {Object.keys(selectedAnswers).length} / {QUESTIONS.length}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-sky-400 transition-all duration-300"
                    style={{
                      width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div
                className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider mb-1">
                  Question #{q.id}
                </div>
                <h3 className="text-sm font-semibold leading-relaxed text-slate-100">{q.question}</h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {q.options.map((option, idx) => {
                  let optStyle = isDark
                    ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-300'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700';

                  if (isAnswered) {
                    if (idx === q.correctIndex) {
                      optStyle = isDark
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-semibold'
                        : 'bg-emerald-50 border-emerald-500 text-emerald-800 font-semibold';
                    } else if (idx === userAns) {
                      optStyle = isDark
                        ? 'bg-red-950/40 border-red-500 text-red-300'
                        : 'bg-red-50 border-red-500 text-red-800';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${optStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center font-mono text-[10px] shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>

                      {isAnswered && idx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {isAnswered && idx === userAns && idx !== q.correctIndex && (
                        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation (Shown upon answering) */}
              {isAnswered && (
                <div
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed animate-in fade-in ${
                    userAns === q.correctIndex
                      ? isDark
                        ? 'bg-emerald-950/20 border-emerald-800/50 text-emerald-300'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : isDark
                      ? 'bg-amber-950/20 border-amber-800/50 text-amber-300'
                      : 'bg-amber-50 border-amber-200 text-amber-800'
                  }`}
                >
                  <div className="font-bold font-mono uppercase mb-1 flex items-center gap-1.5">
                    {userAns === q.correctIndex ? '✓ Correct Answer!' : '✗ Explanation:'}
                  </div>
                  <div>{q.explanation}</div>
                </div>
              )}

              {/* Navigation controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono text-slate-400 hover:text-white disabled:opacity-30"
                >
                  Previous
                </button>

                {currentIdx < QUESTIONS.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx((prev) => Math.min(QUESTIONS.length - 1, prev + 1))}
                    className="px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowResults(true)}
                    className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1"
                  >
                    <span>View Score Card</span>
                    <Trophy className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </>
          ) : (
            /* Results Screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
                <Trophy className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold font-mono text-slate-100">QUIZ COMPLETE!</h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  You scored {calculateScore()} out of {QUESTIONS.length} points
                </p>
              </div>

              <div
                className={`p-4 rounded-xl border inline-block min-w-[280px] font-mono ${
                  calculateScore() >= 4
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                    : 'bg-amber-950/30 border-amber-500/40 text-amber-300'
                }`}
              >
                <div className="text-2xl font-bold">
                  {Math.round((calculateScore() / QUESTIONS.length) * 100)}%
                </div>
                <div className="text-xs mt-1">
                  {calculateScore() === 6
                    ? 'Outstanding! University Gold Medal Grade.'
                    : calculateScore() >= 4
                    ? 'Well Done! Clear grasp of First-Angle Projections.'
                    : 'Review the First-Angle Theory Guide and try again!'}
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2 rounded-lg border border-slate-700 text-xs font-mono text-slate-300 hover:bg-slate-800 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs font-mono"
                >
                  Close & Return
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
