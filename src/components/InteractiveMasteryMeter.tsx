import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Award, CheckCircle2, Lock } from 'lucide-react';
import { SavedQuestionRecord, StudioModule } from '../types';

interface InteractiveMasteryMeterProps {
  savedQuestions: SavedQuestionRecord[];
  challengeBonusPct: number;
  accentHex: string;
  isDark: boolean;
  onOpenStudio: (mod?: StudioModule) => void;
  onOpenQuiz: () => void;
}

interface ModuleSegment {
  id: 'orthographic' | 'lines' | 'planes' | 'exam';
  label: string;
  shortLabel: string;
  pct: number;
  solved: number;
  color: string;
  actionLabel: string;
  onAction: () => void;
}

const RANKS = [
  { id: 'drafter', label: 'Drafter', threshold: 40 },
  { id: 'detailer', label: 'Detailer', threshold: 60 },
  { id: 'specialist', label: 'CAD Specialist', threshold: 80 },
  { id: 'master', label: 'Projection Master', threshold: 95 },
] as const;

export const InteractiveMasteryMeter: React.FC<InteractiveMasteryMeterProps> = ({
  savedQuestions,
  challengeBonusPct,
  accentHex,
  isDark,
  onOpenStudio,
  onOpenQuiz,
}) => {
  const [selectedSegId, setSelectedSegId] = useState<ModuleSegment['id']>('orthographic');
  const [selectedRankId, setSelectedRankId] = useState<string | null>(null);
  const [displayPct, setDisplayPct] = useState(0);

  const totalPct = useMemo(() => {
    const raw = 54.0 + savedQuestions.length * 4.5 + challengeBonusPct;
    return Math.min(99.5, Number(raw.toFixed(1)));
  }, [savedQuestions.length, challengeBonusPct]);

  // Smooth count-up animation on mount / mastery change
  useEffect(() => {
    let raf = 0;
    const start = displayPct;
    const target = totalPct;
    const startTime = performance.now();
    const duration = 650;

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayPct(Number((start + (target - start) * eased).toFixed(1)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [totalPct]);

  const segments: ModuleSegment[] = useMemo(() => {
    const orthoCount = savedQuestions.filter((q) => !q.module || q.module === 'orthographic').length;
    const lineCount = savedQuestions.filter((q) => q.module === 'lines').length;
    const planeCount = savedQuestions.filter((q) => q.module === 'planometric').length;
    const examCount = savedQuestions.filter((q) =>
      q.solidType === 'slotted-cylinder-bracket' ||
      q.solidType === 'stepped-t-block' ||
      q.solidType === 'machined-bracket' ||
      q.solidType === 'ribbed-block'
    ).length;

    return [
      {
        id: 'orthographic',
        label: 'Orthographic Solids',
        shortLabel: 'Ortho',
        pct: Math.min(100, 58 + orthoCount * 11),
        solved: orthoCount,
        color: accentHex,
        actionLabel: 'Open 3D Studio',
        onAction: () => onOpenStudio('orthographic'),
      },
      {
        id: 'lines',
        label: 'Line Projections',
        shortLabel: 'Lines',
        pct: Math.min(100, 46 + lineCount * 16),
        solved: lineCount,
        color: '#38bdf8',
        actionLabel: 'Open Line Solver',
        onAction: () => onOpenStudio('lines'),
      },
      {
        id: 'planes',
        label: 'Planes & Surfaces',
        shortLabel: 'Planes',
        pct: Math.min(100, 42 + planeCount * 16),
        solved: planeCount,
        color: '#a78bfa',
        actionLabel: 'Open Planometric',
        onAction: () => onOpenStudio('planometric'),
      },
      {
        id: 'exam',
        label: 'Exam Machine Parts',
        shortLabel: 'Exams',
        pct: Math.min(100, 50 + examCount * 15 + Math.round(challengeBonusPct * 2)),
        solved: examCount,
        color: '#34d399',
        actionLabel: 'Take Practice Quiz',
        onAction: onOpenQuiz,
      },
    ];
  }, [savedQuestions, challengeBonusPct, accentHex, onOpenStudio, onOpenQuiz]);

  const activeSeg = segments.find((s) => s.id === selectedSegId) || segments[0];

  const currentRank = useMemo(() => {
    let rank: (typeof RANKS)[number] = RANKS[0];
    for (const r of RANKS) {
      if (totalPct >= r.threshold) rank = r;
    }
    return rank;
  }, [totalPct]);

  const inspectedRank = RANKS.find((r) => r.id === selectedRankId) || null;

  // SVG Ring Geometry (5 equal arc slots with clean gaps)
  const size = 148;
  const cx = size / 2;
  const cy = size / 2;
  const r = 56;
  const circumference = 2 * Math.PI * r;
  const gapPx = 8;
  const slotLen = circumference / segments.length - gapPx;

  return (
    <div className="flex flex-col justify-between h-full space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="text-xs font-medium opacity-70">Interactive Mastery</div>
          <div className="text-[10px] opacity-55 mt-0.5 flex items-center gap-1">
            <Award className="w-3 h-3" style={{ color: accentHex }} />
            <span>{currentRank.label}</span>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full border border-current/15 opacity-70">
          Tap arc
        </span>
      </div>

      {/* Segmented Interactive Ring */}
      <div className="relative flex items-center justify-center py-0.5">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-36 h-36 -rotate-90 overflow-visible">
          {segments.map((seg, idx) => {
            const isSelected = seg.id === selectedSegId;
            const slotOffset = -(idx * (circumference / segments.length));
            const filledLen = Math.max(4, slotLen * (seg.pct / 100));

            return (
              <g
                key={seg.id}
                onClick={() => {
                  setSelectedSegId(seg.id);
                  setSelectedRankId(null);
                }}
                onMouseEnter={() => {
                  setSelectedSegId(seg.id);
                  setSelectedRankId(null);
                }}
                className="cursor-pointer transition-opacity"
              >
                {/* Background track */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity={isDark ? 0.12 : 0.1}
                  strokeWidth={isSelected ? 10 : 7}
                  strokeDasharray={`${slotLen} ${circumference - slotLen}`}
                  strokeDashoffset={slotOffset}
                  strokeLinecap="round"
                  className="transition-all duration-200"
                />
                {/* Filled value arc */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke={seg.color}
                  strokeOpacity={isSelected ? 1 : 0.72}
                  strokeWidth={isSelected ? 10.5 : 7}
                  strokeDasharray={`${filledLen} ${circumference - filledLen}`}
                  strokeDashoffset={slotOffset}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </g>
            );
          })}
        </svg>

        {/* Center Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <div className="text-2xl font-bold tracking-[-0.03em] tabular-nums leading-none">
            {displayPct.toFixed(1)}%
          </div>
          <div className="text-[10px] opacity-60 mt-1 max-w-[78px] truncate font-medium">
            {activeSeg.shortLabel}: {activeSeg.pct}%
          </div>
        </div>
      </div>

      {/* Selected Segment Breakdown + Quick Jump */}
      <div
        className={`rounded-2xl p-2.5 border transition-colors ${
          isDark ? 'bg-white/[0.04] border-white/10' : 'bg-black/[0.03] border-black/10'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: activeSeg.color }} />
              <span className="truncate">{activeSeg.label}</span>
            </div>
            <div className="text-[10px] opacity-60 mt-0.5 tabular-nums">
              {activeSeg.pct}% readiness • {activeSeg.solved} logged
            </div>
          </div>
          <button
            type="button"
            onClick={activeSeg.onAction}
            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-0.5 shrink-0 transition-colors cursor-pointer ${
              isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-[#0d0d10] text-white hover:bg-zinc-800'
            }`}
          >
            <span>Jump</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Interactive Rank Milestones */}
      <div className="space-y-1.5">
        <div className="grid grid-cols-4 gap-1">
          {RANKS.map((rank) => {
            const unlocked = totalPct >= rank.threshold;
            const isInspecting = selectedRankId === rank.id;
            return (
              <button
                key={rank.id}
                type="button"
                onClick={() => setSelectedRankId(isInspecting ? null : rank.id)}
                className={`px-1.5 py-1 rounded-xl text-[9px] font-medium border flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
                  isInspecting
                    ? isDark
                      ? 'bg-white text-black border-white'
                      : 'bg-[#0d0d10] text-white border-[#0d0d10]'
                    : unlocked
                      ? isDark
                        ? 'bg-white/[0.07] border-white/15 text-white/90'
                        : 'bg-black/[0.06] border-black/15 text-black/90'
                      : 'opacity-50 border-current/10 hover:opacity-80'
                }`}
              >
                {unlocked ? (
                  <CheckCircle2 className="w-2.5 h-2.5" />
                ) : (
                  <Lock className="w-2.5 h-2.5" />
                )}
                <span className="truncate w-full text-center">{rank.threshold}%</span>
              </button>
            );
          })}
        </div>

        {inspectedRank && (
          <div className="text-[10px] px-2.5 py-1.5 rounded-xl border border-current/10 opacity-80">
            <span className="font-semibold">{inspectedRank.label}:</span>{' '}
            {totalPct >= inspectedRank.threshold
              ? 'Unlocked! Keep solving to hold your streak.'
              : `Solve ~${Math.max(1, Math.ceil((inspectedRank.threshold - totalPct) / 4.5))} more sheet(s) or daily challenges to unlock.`}
          </div>
        )}
      </div>
    </div>
  );
};
