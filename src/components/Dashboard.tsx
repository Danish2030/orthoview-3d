import React, { useEffect, useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Home,
  Box,
  Wand2,
  FileText,
  BookOpen,
  Sparkles,
  LogOut,
  Search,
  Sun,
  Moon,
  ArrowUpRight,
  Send,
  Calendar,
  Sliders,
  Ruler,
  Layers,
  Download,
  Trash2,
  Command,
  X,
  CheckCircle2,
  Zap,
  ChevronRight,
} from 'lucide-react';
import {
  SavedQuestionRecord,
  SolidDimensions,
  SolidType,
  StudioModule,
  ThemeMode,
  UserProfile,
} from '../types';
import { SOLID_PRESETS } from '../utils/geometryGenerators';
import { InteractiveOrb } from './InteractiveOrb';
import { InteractiveMasteryMeter } from './InteractiveMasteryMeter';
import { HeroProjectionStage } from './HeroProjectionStage';
import { LandingInteractiveShowcase } from './LandingInteractiveShowcase';

type AccentId = 'mono' | 'cyan' | 'emerald' | 'amber';

interface AccentConfig {
  id: AccentId;
  label: string;
  hex: string;
  glow: string;
  dotClass: string;
}

const ACCENT_THEMES: AccentConfig[] = [
  {
    id: 'mono',
    label: 'Pure Mono',
    hex: '#e4e4e7',
    glow: 'rgba(255, 255, 255, 0.22)',
    dotClass: 'bg-zinc-400',
  },
  {
    id: 'cyan',
    label: 'Blueprint Cyan',
    hex: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.28)',
    dotClass: 'bg-sky-400',
  },
  {
    id: 'emerald',
    label: 'AutoCAD Emerald',
    hex: '#34d399',
    glow: 'rgba(52, 211, 153, 0.28)',
    dotClass: 'bg-emerald-400',
  },
  {
    id: 'amber',
    label: 'Amber Technical',
    hex: '#fbbf24',
    glow: 'rgba(251, 191, 36, 0.26)',
    dotClass: 'bg-amber-400',
  },
];

interface DailyChallengeItem {
  id: string;
  prompt: string;
  solidHint: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

const DAILY_CHALLENGES: DailyChallengeItem[] = [
  {
    id: 'dc-1',
    prompt: 'In First-Angle Projection (ISO 128), where is the Left-Hand Side View (LHSV) drawn?',
    solidHint: 'First-Angle Quadrant Rule',
    options: ['Left of Front View', 'Right of Front View', 'Below Top View'],
    correctIdx: 1,
    explanation: 'In First-Angle Projection, the object sits between observer and plane, so LHSV projects onto the right of FV.',
  },
  {
    id: 'dc-2',
    prompt: 'A Stepped T-Block has a vertical R10 semi-cylindrical groove on the rear wall. How does the arc appear in the Top View?',
    solidHint: 'Stepped T-Block (40×50×30)',
    options: ['Two straight dashed lines', 'A true semi-circular arc (R10)', 'An elliptical curve'],
    correctIdx: 1,
    explanation: 'Because the groove axis is vertical (perpendicular to HP), its true circular shape appears directly in the Top View.',
  },
  {
    id: 'dc-3',
    prompt: 'In an orthographic sheet, how is an internal blind hole (Ø40 × 24 deep) represented in the Front View?',
    solidHint: 'Slotted Cylinder Bracket',
    options: ['Thin continuous lines', 'Short-dash hidden lines', 'Chain thin centerlines only'],
    correctIdx: 1,
    explanation: 'Internal unseen contours like blind bores are drawn using uniform short-dashed ISO hidden lines.',
  },
  {
    id: 'dc-4',
    prompt: 'When a straight line is inclined to both HP (θ) and VP (φ), what is always true about its Front & Top View lengths?',
    solidHint: 'Projection of Lines',
    options: ['Both are shorter than True Length', 'One equals True Length', 'Both exceed True Length'],
    correctIdx: 0,
    explanation: 'Inclination to both reference planes foreshortens both the elevation and plan relative to True Length.',
  },
];

interface DashboardProps {
  user: UserProfile;
  theme: ThemeMode;
  onToggleTheme: () => void;
  currentSolid: SolidType;
  dimensions: SolidDimensions;
  savedQuestions: SavedQuestionRecord[];
  onSignOut: () => void;
  onGoHome: () => void;
  onOpenStudio: (mod?: StudioModule) => void;
  onOpenSolverModal: () => void;
  onOpenTheory: () => void;
  onOpenQuiz: () => void;
  onLoadRecord: (record: SavedQuestionRecord) => void;
  onDeleteRecord?: (id: string) => void;
  onQuickSolveQuestion: (question: string) => void;
  onSelectSolidAndOpen?: (type: SolidType) => void;
  onOpenExport?: () => void;
}

const MiniWireframeBadge: React.FC<{ solidType: SolidType; module?: StudioModule; accentHex: string }> = ({
  solidType,
  module,
  accentHex,
}) => {
  if (module === 'lines') {
    return (
      <svg viewBox="0 0 28 28" className="w-7 h-7 shrink-0">
        <line x1="3" y1="14" x2="25" y2="14" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
        <line x1="6" y1="11" x2="22" y2="5" stroke={accentHex} strokeWidth="1.7" strokeLinecap="round" />
        <line x1="6" y1="17" x2="22" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (module === 'planometric') {
    return (
      <svg viewBox="0 0 28 28" className="w-7 h-7 shrink-0">
        <polygon points="14,4 24,10 14,16 4,10" fill="none" stroke={accentHex} strokeWidth="1.4" />
        <polygon points="14,12 24,18 14,24 4,18" fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.2" />
      </svg>
    );
  }
  if (solidType === 'slotted-cylinder-bracket' || solidType === 'counterbore' || solidType === 'cylinder-hole') {
    return (
      <svg viewBox="0 0 28 28" className="w-7 h-7 shrink-0">
        <ellipse cx="14" cy="9" rx="7" ry="3.2" fill="none" stroke={accentHex} strokeWidth="1.4" />
        <line x1="7" y1="9" x2="7" y2="19" stroke="currentColor" strokeWidth="1.3" />
        <line x1="21" y1="9" x2="21" y2="19" stroke="currentColor" strokeWidth="1.3" />
        <path d="M7 19 A7 3.2 0 0 0 21 19" fill="none" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 28 28" className="w-7 h-7 shrink-0">
      <polygon points="14,4 23,9 23,19 14,24 5,19 5,9" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <polyline points="5,9 14,14 23,9" fill="none" stroke={accentHex} strokeWidth="1.4" />
      <line x1="14" y1="14" x2="14" y2="24" stroke={accentHex} strokeWidth="1.4" />
    </svg>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  theme,
  onToggleTheme,
  currentSolid,
  dimensions,
  savedQuestions,
  onSignOut,
  onGoHome,
  onOpenStudio,
  onOpenSolverModal,
  onOpenTheory,
  onOpenQuiz,
  onLoadRecord,
  onDeleteRecord,
  onQuickSolveQuestion,
  onSelectSolidAndOpen,
  onOpenExport,
}) => {
  const isDark = theme === 'blueprint';
  const [activeTab, setActiveTab] = useState<'overview' | 'lab'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickQuestion, setQuickQuestion] = useState('');

  // Liquid-Glass Accent Theme (persisted)
  const [accentId, setAccentId] = useState<AccentId>(() => {
    try {
      const saved = localStorage.getItem('orthoview-accent') as AccentId | null;
      if (saved && ACCENT_THEMES.some((a) => a.id === saved)) return saved;
    } catch {
      // ignore
    }
    return 'mono';
  });

  const activeAccent = useMemo(
    () => ACCENT_THEMES.find((a) => a.id === accentId) || ACCENT_THEMES[0],
    [accentId]
  );

  const handleSelectAccent = (id: AccentId) => {
    setAccentId(id);
    try {
      localStorage.setItem('orthoview-accent', id);
    } catch {
      // ignore
    }
  };

  // Daily "Spot the View" Challenge state (persisted bonus)
  const [solvedChallengeIds, setSolvedChallengeIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('orthoview-daily-solved');
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentChallenge = DAILY_CHALLENGES[challengeIdx % DAILY_CHALLENGES.length];
  const isCurrentCorrect = selectedOption === currentChallenge.correctIdx;

  const handleAnswerChallenge = (optIdx: number) => {
    setSelectedOption(optIdx);
    if (optIdx === currentChallenge.correctIdx) {
      if (!solvedChallengeIds.includes(currentChallenge.id)) {
        const next = [...solvedChallengeIds, currentChallenge.id];
        setSolvedChallengeIds(next);
        try {
          localStorage.setItem('orthoview-daily-solved', JSON.stringify(next));
        } catch {
          // ignore
        }
      }
      try {
        confetti({ particleCount: 38, spread: 58, origin: { y: 0.72 } });
      } catch {
        // ignore
      }
    }
  };

  const handleNextChallenge = () => {
    setSelectedOption(null);
    setChallengeIdx((prev) => (prev + 1) % DAILY_CHALLENGES.length);
  };

  // Command Palette (Ctrl+K / Cmd+K)
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState('');

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const paletteItems = useMemo(() => {
    const q = paletteQuery.trim().toLowerCase();
    const actions: { id: string; group: string; title: string; subtitle: string; run: () => void }[] = [
      {
        id: 'act-studio',
        group: 'Quick Actions',
        title: 'Launch 3D Orthographic Studio',
        subtitle: 'Interactive 3D solid & First-Angle 2D sheet',
        run: () => onOpenStudio('orthographic'),
      },
      {
        id: 'act-lines',
        group: 'Quick Actions',
        title: 'Line Projection Solver',
        subtitle: 'True length, θ/φ inclinations & traces',
        run: () => onOpenStudio('lines'),
      },
      {
        id: 'act-planes',
        group: 'Quick Actions',
        title: 'Planometric Studio',
        subtitle: 'Planes inclined to HP & VP',
        run: () => onOpenStudio('planometric'),
      },
      ...(onOpenExport
        ? [
            {
              id: 'act-export',
              group: 'Quick Actions',
              title: 'Export AutoCAD Sheet (PNG / PDF / SVG / DXF)',
              subtitle: 'Customize line colors, title block & dividers',
              run: onOpenExport,
            },
          ]
        : []),
      {
        id: 'act-theme',
        group: 'Quick Actions',
        title: isDark ? 'Switch to Light Paper Mode' : 'Switch to Dark Blueprint Mode',
        subtitle: 'Toggle liquid-glass canvas theme',
        run: onToggleTheme,
      },
    ];

    const solids = SOLID_PRESETS.map((p) => ({
      id: `solid-${p.id}`,
      group: 'Solids Library',
      title: p.name,
      subtitle: `${p.defaultDimensions.length}×${p.defaultDimensions.width}×${p.defaultDimensions.height} mm • ${p.category}`,
      run: () => {
        if (onSelectSolidAndOpen) {
          onSelectSolidAndOpen(p.id);
        } else {
          onOpenStudio('orthographic');
        }
      },
    }));

    const combined = [...actions, ...solids];
    if (!q) return combined.slice(0, 10);
    return combined.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
    );
  }, [paletteQuery, isDark, onOpenStudio, onOpenExport, onToggleTheme, onSelectSolidAndOpen]);

  const activePreset = SOLID_PRESETS.find((p) => p.id === currentSolid) || SOLID_PRESETS[0];

  const filteredRecords = savedQuestions.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInlineSolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickQuestion.trim()) return;
    onQuickSolveQuestion(quickQuestion.trim());
    setQuickQuestion('');
  };

  const todayLabel = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const effectiveAccentHex = accentId === 'mono' ? (isDark ? '#f4f4f6' : '#0d0d10') : activeAccent.hex;

  return (
    <div
      className={`min-h-screen w-full overflow-y-auto p-3 sm:p-5 pb-24 lg:pb-5 select-none transition-colors duration-300 ${
        isDark ? 'mono-canvas-dark text-[#f4f4f6]' : 'mono-canvas-light text-[#0d0d10]'
      }`}
    >
      {/* Main Frosted Glass Application Shell */}
      <div
        className={`max-w-[1440px] mx-auto min-h-[calc(100vh-2.5rem)] rounded-[28px] sm:rounded-[30px] border glass-panel shadow-[0_24px_70px_rgba(0,0,0,0.12)] flex flex-col lg:flex-row overflow-hidden ${
          isDark ? 'border-white/10' : 'border-black/10'
        }`}
      >
        {/* LEFT VERTICAL RAIL SIDEBAR */}
        <aside
          className={`w-full lg:w-60 shrink-0 p-4 sm:p-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r ${
            isDark ? 'border-white/10 bg-white/[0.02]' : 'border-black/[0.07] bg-white/55'
          }`}
        >
          <div className="space-y-5">
            {/* Brand + Mobile Quick Controls */}
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={onGoHome}
                className="flex items-center gap-2.5 px-1.5 py-1 text-left group cursor-pointer"
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                    isDark ? 'bg-white text-black' : 'bg-[#0d0d10] text-white'
                  }`}
                >
                  <Box className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold tracking-[-0.02em]">OrthoView3D</div>
                  <div className="text-[10px] opacity-55">CAD Studio v3.6</div>
                </div>
              </button>

              {/* Compact Accent Switcher on Mobile Header */}
              <div className="flex lg:hidden items-center gap-1.5">
                {ACCENT_THEMES.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleSelectAccent(acc.id)}
                    title={acc.label}
                    className={`w-4 h-4 rounded-full ${acc.dotClass} transition-transform cursor-pointer ${
                      accentId === acc.id ? 'ring-2 ring-offset-2 ring-current scale-110' : 'opacity-55 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="hidden sm:grid sm:grid-cols-4 lg:grid-cols-1 gap-1.5 text-xs font-medium">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3.5 py-2.5 rounded-full flex items-center gap-2.5 transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'glass-pill-active'
                    : isDark
                      ? 'text-zinc-400 hover:bg-white/10 hover:text-white'
                      : 'text-zinc-600 hover:bg-black/5 hover:text-black'
                }`}
              >
                <Home className="w-4 h-4 shrink-0" />
                <span className="truncate">Overview</span>
              </button>
              <button
                onClick={() => setActiveTab('lab')}
                className={`px-3.5 py-2.5 rounded-full flex items-center gap-2.5 transition-colors cursor-pointer ${
                  activeTab === 'lab'
                    ? 'glass-pill-active'
                    : isDark
                      ? 'text-zinc-400 hover:bg-white/10 hover:text-white'
                      : 'text-zinc-600 hover:bg-black/5 hover:text-black'
                }`}
              >
                <Zap className="w-4 h-4 shrink-0" />
                <span className="truncate">Interactive Lab</span>
              </button>
              <button
                onClick={() => onOpenStudio('orthographic')}
                className={`px-3.5 py-2.5 rounded-full flex items-center gap-2.5 transition-colors cursor-pointer ${
                  isDark ? 'text-zinc-400 hover:bg-white/10 hover:text-white' : 'text-zinc-600 hover:bg-black/5 hover:text-black'
                }`}
              >
                <Sliders className="w-4 h-4 shrink-0" />
                <span className="truncate">Solids &amp; Ortho</span>
              </button>
              <button
                onClick={() => onOpenStudio('lines')}
                className={`px-3.5 py-2.5 rounded-full flex items-center gap-2.5 transition-colors cursor-pointer ${
                  isDark ? 'text-zinc-400 hover:bg-white/10 hover:text-white' : 'text-zinc-600 hover:bg-black/5 hover:text-black'
                }`}
              >
                <Ruler className="w-4 h-4 shrink-0" />
                <span className="truncate">Line Solver</span>
              </button>
              <button
                onClick={() => onOpenStudio('planometric')}
                className={`px-3.5 py-2.5 rounded-full flex items-center gap-2.5 transition-colors cursor-pointer ${
                  isDark ? 'text-zinc-400 hover:bg-white/10 hover:text-white' : 'text-zinc-600 hover:bg-black/5 hover:text-black'
                }`}
              >
                <Layers className="w-4 h-4 shrink-0" />
                <span className="truncate">Planometric</span>
              </button>
              <button
                onClick={onOpenSolverModal}
                className={`px-3.5 py-2.5 rounded-full flex items-center gap-2.5 transition-colors cursor-pointer ${
                  isDark ? 'text-zinc-400 hover:bg-white/10 hover:text-white' : 'text-zinc-600 hover:bg-black/5 hover:text-black'
                }`}
              >
                <Wand2 className="w-4 h-4 shrink-0" />
                <span className="truncate">Ask Question</span>
              </button>
              <button
                onClick={onOpenTheory}
                className={`px-3.5 py-2.5 rounded-full flex items-center gap-2.5 transition-colors cursor-pointer ${
                  isDark ? 'text-zinc-400 hover:bg-white/10 hover:text-white' : 'text-zinc-600 hover:bg-black/5 hover:text-black'
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span className="truncate">ISO Theory</span>
              </button>
              <button
                onClick={onOpenQuiz}
                className={`px-3.5 py-2.5 rounded-full flex items-center gap-2.5 transition-colors cursor-pointer ${
                  isDark ? 'text-zinc-400 hover:bg-white/10 hover:text-white' : 'text-zinc-600 hover:bg-black/5 hover:text-black'
                }`}
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span className="truncate">Practice Quiz</span>
              </button>
            </nav>
          </div>

          {/* Personalized User Profile Footer */}
          <div className="hidden sm:flex pt-5 mt-5 border-t border-black/10 dark:border-white/10 items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                  isDark ? 'bg-white text-black' : 'bg-[#0d0d10] text-white'
                }`}
              >
                {user.initials}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold truncate">{user.name}</div>
                <div className="text-[10px] opacity-55 truncate">{user.branch}</div>
              </div>
            </div>
            <button
              onClick={onSignOut}
              title="Sign Out"
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isDark ? 'hover:bg-white/10 text-zinc-400' : 'hover:bg-black/5 text-zinc-500'
              }`}
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>

        {/* MAIN PERSONALIZED BENTO CONTENT */}
        <main className="flex-1 p-4 sm:p-7 space-y-5 overflow-y-auto">
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em]">
                Workspace
              </h1>
              <p className="text-xs opacity-60 mt-0.5">
                Welcome back, {user.name} • {todayLabel}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Liquid-Glass Accent Switcher (Desktop) */}
              <div
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full glass-pill"
                title="Liquid-Glass Accent Theme"
              >
                {ACCENT_THEMES.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleSelectAccent(acc.id)}
                    title={acc.label}
                    className={`w-3.5 h-3.5 rounded-full ${acc.dotClass} transition-transform cursor-pointer ${
                      accentId === acc.id
                        ? 'ring-2 ring-offset-1 ring-current scale-110'
                        : 'opacity-50 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>

              {/* Command Palette Trigger (Ctrl+K) */}
              <button
                type="button"
                onClick={() => setIsPaletteOpen(true)}
                className="px-3 py-2 rounded-full glass-pill flex items-center gap-2 text-xs cursor-pointer"
                title="Quick Command Palette (Ctrl + K)"
              >
                <Command className="w-3.5 h-3.5 opacity-70" />
                <span className="hidden sm:inline opacity-75">Quick Jump</span>
                <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-current/10 text-[10px] font-mono opacity-75">
                  Ctrl K
                </kbd>
              </button>

              {/* Studio Quick Launch Pill */}
              <button
                onClick={() => onOpenStudio('orthographic')}
                className="pl-1.5 pr-3.5 py-1.5 rounded-full glass-pill flex items-center gap-2 text-xs font-medium cursor-pointer"
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-white text-black' : 'bg-[#0d0d10] text-white'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                </span>
                <span>3D Studio</span>
              </button>

              {/* Search Pill */}
              <div className="relative hidden sm:block">
                <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter saved..."
                  className="pl-9 pr-4 py-2 text-xs rounded-full glass-input w-40 sm:w-44"
                />
              </div>

              {/* Dark / Light Mode Toggle Pill */}
              <button
                onClick={onToggleTheme}
                title="Switch Dark / Light Mode"
                className="p-2.5 rounded-full glass-pill cursor-pointer"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Quick Ask Circle Button */}
              <button
                onClick={onOpenSolverModal}
                title="Open Question Solver"
                className={`p-2.5 rounded-full cursor-pointer transition-colors ${
                  isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-[#0d0d10] text-white hover:bg-zinc-800'
                }`}
              >
                <Wand2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Workspace Sub-Tab Switcher (Overview vs Interactive CAD Lab) */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1 p-1 rounded-full glass-pill">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'overview' ? 'glass-pill-active' : 'opacity-65 hover:opacity-100'
                }`}
              >
                Workspace Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('lab')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'lab' ? 'glass-pill-active' : 'opacity-65 hover:opacity-100'
                }`}
              >
                <Zap className="w-3.5 h-3.5" style={{ color: activeTab === 'lab' ? undefined : effectiveAccentHex }} />
                <span>Interactive CAD Lab</span>
              </button>
            </div>
          </div>

          {activeTab === 'lab' ? (
            <div className="space-y-6">
              <div className="rounded-[26px] bg-[#0a0a0d] text-white p-5 sm:p-6 border border-white/10">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/55">
                      Live 3D-to-2D Projection Unfold &amp; X-Ray Loupe
                    </div>
                    <h2 className="text-lg font-semibold tracking-[-0.02em]">
                      Interactive Projection Plane Simulator
                    </h2>
                  </div>
                </div>
                <HeroProjectionStage
                  accentHex={activeAccent.hex}
                  accentGlow={activeAccent.glow}
                  onLaunchSolid={onSelectSolidAndOpen}
                />
              </div>

              <LandingInteractiveShowcase
                isDark={isDark}
                accentHex={effectiveAccentHex}
                onOpenStudio={() => onOpenStudio('orthographic')}
                onSelectSolidAndOpen={onSelectSolidAndOpen || (() => onOpenStudio('orthographic'))}
              />
            </div>
          ) : (
            <>
          {/* TOP BENTO ROW (3 Columns) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
            {/* 1. Recent Drawings Timeline Card with Live Wireframe Thumbnails */}
            <section className="xl:col-span-5 rounded-[24px] glass-card p-5 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium opacity-75">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Recent Projection Sessions</span>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded-full border border-current/15 opacity-70">
                  1st Angle ISO
                </span>
              </div>

              <div className="space-y-2.5 py-0.5">
                {filteredRecords.slice(0, 4).map((rec) => (
                  <div
                    key={rec.id}
                    className={`group rounded-2xl p-2.5 border flex items-center justify-between gap-2.5 transition-all ${
                      isDark
                        ? 'border-white/10 bg-white/[0.03] hover:bg-white/[0.07]'
                        : 'border-black/10 bg-white/75 hover:bg-white'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => onLoadRecord(rec)}
                      className="flex items-center gap-2.5 min-w-0 flex-1 text-left cursor-pointer"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                          isDark ? 'bg-black/40 border-white/10' : 'bg-black/[0.04] border-black/10'
                        }`}
                      >
                        <MiniWireframeBadge
                          solidType={rec.solidType}
                          module={rec.module}
                          accentHex={effectiveAccentHex}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold truncate">{rec.title}</div>
                        <div className="text-[10px] opacity-60 tabular-nums mt-0.5">
                          {rec.dimensions.length}×{rec.dimensions.width}×{rec.dimensions.height} mm •{' '}
                          {rec.createdAt}
                        </div>
                      </div>
                    </button>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onLoadRecord(rec)}
                        title="Open in 3D Studio"
                        className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                          isDark ? 'hover:bg-white/15' : 'hover:bg-black/10'
                        }`}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                      {onOpenExport && (
                        <button
                          type="button"
                          onClick={() => {
                            onLoadRecord(rec);
                            onOpenExport();
                          }}
                          title="Quick Export Sheet"
                          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                            isDark ? 'hover:bg-white/15' : 'hover:bg-black/10'
                          }`}
                        >
                          <Download className="w-3.5 h-3.5 opacity-75" />
                        </button>
                      )}
                      {onDeleteRecord && (
                        <button
                          type="button"
                          onClick={() => onDeleteRecord(rec.id)}
                          title="Delete saved session"
                          className="p-1.5 rounded-full hover:bg-rose-500/15 hover:text-rose-400 transition-colors cursor-pointer opacity-60 hover:opacity-100"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-current/10 flex items-center justify-between text-[11px] opacity-55">
                <span>Tap any wireframe card to open</span>
                <span>{savedQuestions.length} saved</span>
              </div>
            </section>

            {/* 2. Interactive Segmented Mastery Meter Card */}
            <section className="xl:col-span-3 rounded-[24px] glass-card p-5">
              <InteractiveMasteryMeter
                savedQuestions={savedQuestions}
                challengeBonusPct={solvedChallengeIds.length * 2.5}
                accentHex={effectiveAccentHex}
                isDark={isDark}
                onOpenStudio={onOpenStudio}
                onOpenQuiz={onOpenQuiz}
              />
            </section>

            {/* 3. Interactive 360° CAD Sphere Card (Obsidian Contrast) */}
            <section className="xl:col-span-4 rounded-[24px] bg-[#0a0a0c] text-white p-5 relative overflow-hidden flex flex-col justify-between border border-white/10 min-h-[300px]">
              <div
                className="absolute inset-0 pointer-events-none opacity-80 transition-all duration-500"
                style={{
                  background: `radial-gradient(circle at 52% 45%, ${activeAccent.glow} 0%, rgba(161,161,170,0.06) 36%, transparent 68%)`,
                }}
              />
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-medium text-white/80 flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5" style={{ color: activeAccent.hex }} />
                  Interactive 360° CAD Sphere
                </span>
                <button
                  onClick={() => onOpenStudio('orthographic')}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Studio</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>

              {/* True Free-Rotation 3D Sphere */}
              <InteractiveOrb
                accentHex={activeAccent.hex}
                accentGlow={activeAccent.glow}
                solidLabel={activePreset.name}
              />

              <div className="relative z-10 flex items-center justify-between gap-2 pt-2.5 border-t border-white/10">
                <div className="min-w-0">
                  <div className="text-xs font-semibold truncate">{activePreset.name}</div>
                  <div className="text-[11px] text-white/55 tabular-nums">
                    {dimensions.length} × {dimensions.width} × {dimensions.height} mm • Drag to orbit
                  </div>
                </div>
                <div className="text-[10px] text-white/60 shrink-0">2× tap = ISO</div>
              </div>
            </section>
          </div>

          {/* BOTTOM BENTO ROW (2 Columns) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
            {/* 4. 60-Second "Spot the View" Daily Challenge Card */}
            <section className="xl:col-span-5 rounded-[24px] glass-card p-5 flex flex-col justify-between space-y-3.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <Zap className="w-4 h-4" style={{ color: effectiveAccentHex }} />
                  <span>Spot the View — Daily Challenge</span>
                </div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full border border-current/15 opacity-75 tabular-nums">
                  +{solvedChallengeIds.length * 2.5}% Mastery
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="text-[10px] uppercase tracking-wider opacity-55 font-semibold">
                  {currentChallenge.solidHint}
                </div>
                <p className="text-xs font-medium leading-relaxed">{currentChallenge.prompt}</p>

                <div className="space-y-1.5">
                  {currentChallenge.options.map((opt, idx) => {
                    const isPicked = selectedOption === idx;
                    const isAnswer = idx === currentChallenge.correctIdx;
                    let btnStyle = isDark
                      ? 'border-white/10 bg-white/[0.03] hover:bg-white/[0.09]'
                      : 'border-black/10 bg-white/80 hover:bg-white';

                    if (selectedOption !== null) {
                      if (isAnswer) {
                        btnStyle = 'border-emerald-500/60 bg-emerald-500/15 text-emerald-500 dark:text-emerald-300';
                      } else if (isPicked) {
                        btnStyle = 'border-rose-500/60 bg-rose-500/15 text-rose-500 dark:text-rose-300';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleAnswerChallenge(idx)}
                        className={`w-full px-3.5 py-2 rounded-2xl border text-left text-xs flex items-center justify-between gap-2 transition-all cursor-pointer ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {selectedOption !== null && isAnswer && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {selectedOption !== null && (
                  <div className="pt-1 flex items-center justify-between gap-2">
                    <p className="text-[11px] opacity-75 leading-snug">
                      {isCurrentCorrect ? 'Spot on! ' : 'Not quite — '}
                      {currentChallenge.explanation}
                    </p>
                    <button
                      type="button"
                      onClick={handleNextChallenge}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1 shrink-0 cursor-pointer ${
                        isDark ? 'bg-white text-black' : 'bg-[#0d0d10] text-white'
                      }`}
                    >
                      <span>Next</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* 5. Obsidian Contrast Quick Question-to-CAD Solver */}
            <section className="xl:col-span-7 rounded-[24px] bg-[#0a0a0c] text-white p-5 sm:p-6 relative overflow-hidden border border-white/10 flex flex-col justify-between space-y-5">
              <div
                className="absolute inset-0 pointer-events-none opacity-45"
                style={{
                  background: `radial-gradient(ellipse 70% 60% at 85% 90%, ${activeAccent.glow} 0%, transparent 65%)`,
                }}
              />

              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold tracking-[-0.02em]">
                    Ask an Engineering Graphics Question
                  </div>
                  <div className="text-[11px] text-white/55 mt-0.5">
                    Type your problem statement below to generate the exact 3D model &amp; First-Angle 2D sheet
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div>
                    <div className="text-[10px] text-white/50">Solids</div>
                    <div className="font-semibold tabular-nums">{SOLID_PRESETS.length}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-white/50">Solved</div>
                    <div className="font-semibold tabular-nums">{savedQuestions.length}</div>
                  </div>
                </div>
              </div>

              {/* Inline Question Composer */}
              <form onSubmit={handleInlineSolve} className="relative z-10 flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  value={quickQuestion}
                  onChange={(e) => setQuickQuestion(e.target.value)}
                  placeholder="e.g. Hexagonal prism of base 40mm and height 75mm inclined at 30 degrees to HP..."
                  className="flex-1 px-4 py-3 rounded-full bg-white/[0.08] border border-white/15 text-xs text-white placeholder-white/45 focus:outline-none focus:border-white/40"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Solve &amp; Draw</span>
                </button>
              </form>

              {/* Sample Prompts */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  {[
                    'Square pyramid base 50mm height 70mm',
                    'Stepped L-block 80x45x60mm',
                    'Hollow cylinder diameter 55mm height 65mm',
                  ].map((sample) => (
                    <button
                      key={sample}
                      type="button"
                      onClick={() => setQuickQuestion(sample)}
                      className="px-3 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 text-[10px] text-white/75 transition-colors cursor-pointer"
                    >
                      {sample}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={onOpenSolverModal}
                  className="text-[11px] text-white/65 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3 h-3" />
                  <span>Exam Bank</span>
                </button>
              </div>
            </section>
          </div>
            </>
          )}
        </main>
      </div>

      {/* MOBILE STICKY BOTTOM NAVIGATION DOCK (< lg) */}
      <nav
        className={`lg:hidden fixed bottom-3 left-3 right-3 z-40 rounded-2xl border glass-modal px-2 py-1.5 flex items-center justify-around shadow-2xl ${
          isDark ? 'border-white/15' : 'border-black/15'
        }`}
      >
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-semibold cursor-pointer"
          style={{ color: activeTab === 'overview' ? effectiveAccentHex : undefined }}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('lab')}
          className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-semibold cursor-pointer"
          style={{ color: activeTab === 'lab' ? effectiveAccentHex : undefined }}
        >
          <Zap className="w-4 h-4" />
          <span>CAD Lab</span>
        </button>
        <button
          type="button"
          onClick={() => onOpenStudio('orthographic')}
          className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] opacity-75 hover:opacity-100 cursor-pointer"
        >
          <Box className="w-4 h-4" />
          <span>3D Studio</span>
        </button>
        {onOpenExport && (
          <button
            type="button"
            onClick={onOpenExport}
            className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] opacity-75 hover:opacity-100 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        )}
        <button
          type="button"
          onClick={() => setIsPaletteOpen(true)}
          className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] opacity-75 hover:opacity-100 cursor-pointer"
        >
          <Search className="w-4 h-4" />
          <span>Jump</span>
        </button>
      </nav>

      {/* COMMAND PALETTE MODAL (Ctrl + K) */}
      {isPaletteOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4"
          onClick={() => setIsPaletteOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl glass-modal overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-current/10">
              <Search className="w-4 h-4 opacity-55 shrink-0" />
              <input
                type="text"
                autoFocus
                value={paletteQuery}
                onChange={(e) => setPaletteQuery(e.target.value)}
                placeholder="Jump to any solid, solver, or export..."
                className="flex-1 bg-transparent text-sm focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsPaletteOpen(false)}
                className="p-1 rounded-full hover:bg-current/10 cursor-pointer"
              >
                <X className="w-4 h-4 opacity-65" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {paletteItems.length === 0 ? (
                <div className="py-8 text-center text-xs opacity-55">
                  No matching solids or commands.
                </div>
              ) : (
                paletteItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setIsPaletteOpen(false);
                      setPaletteQuery('');
                      item.run();
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-2xl text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                      isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate">{item.title}</div>
                      <div className="text-[10px] opacity-60 truncate">{item.subtitle}</div>
                    </div>
                    <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-current/15 opacity-60 shrink-0">
                      {item.group}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
