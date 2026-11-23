import React, { useState } from 'react';
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
  onQuickSolveQuestion: (question: string) => void;
}

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
  onQuickSolveQuestion,
}) => {
  const isDark = theme === 'blueprint';
  const [searchQuery, setSearchQuery] = useState('');
  const [quickQuestion, setQuickQuestion] = useState('');

  const activePreset = SOLID_PRESETS.find((p) => p.id === currentSolid) || SOLID_PRESETS[0];

  const filteredRecords = savedQuestions.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const masteryPct = Math.min(98.5, 54.0 + savedQuestions.length * 4.5).toFixed(1);

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

  return (
    <div
      className={`min-h-screen w-full overflow-y-auto p-3 sm:p-5 select-none transition-colors duration-300 ${
        isDark ? 'mono-canvas-dark text-[#f4f4f6]' : 'mono-canvas-light text-[#0d0d10]'
      }`}
    >
      {/* Main Frosted Glass Application Shell (Image 2 Layout) */}
      <div
        className={`max-w-[1440px] mx-auto min-h-[calc(100vh-2.5rem)] rounded-[30px] border glass-panel shadow-[0_24px_70px_rgba(0,0,0,0.12)] flex flex-col lg:flex-row overflow-hidden ${
          isDark ? 'border-white/10' : 'border-black/10'
        }`}
      >
        {/* LEFT VERTICAL RAIL SIDEBAR */}
        <aside
          className={`w-full lg:w-60 shrink-0 p-4 sm:p-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r ${
            isDark ? 'border-white/10 bg-white/[0.02]' : 'border-black/[0.07] bg-white/55'
          }`}
        >
          <div className="space-y-6">
            {/* Brand */}
            <button
              onClick={onGoHome}
              className="flex items-center gap-2.5 px-2 py-1 text-left group cursor-pointer"
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  isDark ? 'bg-white text-black' : 'bg-[#0d0d10] text-white'
                }`}
              >
                <Box className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold tracking-[-0.02em]">OrthoView3D</div>
                <div className="text-[10px] opacity-55">CAD Studio</div>
              </div>
            </button>

            {/* Navigation Items */}
            <nav className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-1 gap-1.5 text-xs font-medium">
              <button className="px-3.5 py-2.5 rounded-full glass-pill-active flex items-center gap-2.5 cursor-pointer">
                <Home className="w-4 h-4 shrink-0" />
                <span className="truncate">Overview</span>
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
          <div className="pt-5 mt-5 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-2">
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
              {/* Studio Quick Launch Pill */}
              <button
                onClick={() => onOpenStudio('orthographic')}
                className="pl-1.5 pr-4 py-1.5 rounded-full glass-pill flex items-center gap-2 text-xs font-medium cursor-pointer"
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-white text-black' : 'bg-[#0d0d10] text-white'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                </span>
                <span>Launch 3D Studio</span>
              </button>

              {/* Search Pill */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions..."
                  className="pl-9 pr-4 py-2 text-xs rounded-full glass-input w-44 sm:w-52"
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

          {/* TOP BENTO ROW (3 Columns matching Image 2) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
            {/* 1. Recent Drawings Timeline Card */}
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

              <div className="space-y-3 py-1">
                {filteredRecords.slice(0, 4).map((rec, idx) => {
                  const widths = ['w-[84%]', 'w-[72%] ml-auto', 'w-[90%]', 'w-[76%] ml-6'];
                  return (
                    <button
                      key={rec.id}
                      onClick={() => onLoadRecord(rec)}
                      className="w-full text-left group cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-[11px] opacity-60 mb-1">
                        <span className="truncate font-medium">{rec.title}</span>
                        <span className="tabular-nums shrink-0 ml-2">{rec.createdAt}</span>
                      </div>
                      <div
                        className={`${widths[idx % widths.length]} px-3.5 py-2 rounded-full flex items-center justify-between text-[11px] font-medium transition-transform group-hover:scale-[1.01] ${
                          isDark
                            ? 'bg-white text-black'
                            : 'bg-[#0d0d10] text-white'
                        }`}
                      >
                        <span className="truncate">
                          {rec.dimensions.length}×{rec.dimensions.width}×{rec.dimensions.height} mm
                        </span>
                        <span className="opacity-75 shrink-0 ml-2 tabular-nums">
                          {rec.rotation.x}°/{rec.rotation.y}°
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-current/10 flex items-center justify-between text-[11px] opacity-55">
                <span>Click any bar to load in 3D Studio</span>
                <span>{savedQuestions.length} saved</span>
              </div>
            </section>

            {/* 2. Progress & Accuracy Metric Card */}
            <section className="xl:col-span-3 rounded-[24px] glass-card p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="text-xs font-medium opacity-70">Drawing Mastery</div>
                <div className="text-3xl font-semibold tracking-[-0.03em] mt-1 tabular-nums">
                  {masteryPct}%
                </div>
                <div className="text-[11px] opacity-50 mt-0.5">Engineering Graphics readiness</div>
              </div>

              {/* Minimalist Spline Chart */}
              <svg viewBox="0 0 220 74" className="w-full h-20 overflow-visible">
                <path
                  d="M0,56 C30,48 45,22 78,28 C110,34 128,10 162,20 C186,27 202,16 220,12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M0,64 C35,60 65,42 105,46 C142,50 175,32 220,38"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeOpacity="0.28"
                  strokeDasharray="3 3"
                />
                <circle cx="162" cy="20" r="3.5" fill="currentColor" />
              </svg>

              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 opacity-75">
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    Available Solids
                  </span>
                  <span className="font-semibold tabular-nums">{SOLID_PRESETS.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 opacity-75">
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                    Questions Solved
                  </span>
                  <span className="font-semibold tabular-nums">{savedQuestions.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 opacity-75">
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-25" />
                    Projection Views
                  </span>
                  <span className="font-semibold tabular-nums">FV • TV • LHSV</span>
                </div>
              </div>
            </section>

            {/* 3. Obsidian Contrast Preview Card (Top-Right Jet Black Card in Image 2) */}
            <section className="xl:col-span-4 rounded-[24px] bg-[#0a0a0c] text-white p-5 relative overflow-hidden flex flex-col justify-between border border-white/10 min-h-[250px]">
              <div
                className="absolute inset-0 pointer-events-none opacity-75"
                style={{
                  background:
                    'radial-gradient(circle at 52% 45%, rgba(255,255,255,0.22) 0%, rgba(161,161,170,0.08) 32%, transparent 65%)',
                }}
              />
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-medium text-white/75 flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5" />
                  Active Solid Preview
                </span>
                <button
                  onClick={() => onOpenStudio('orthographic')}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Open</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>

              {/* Sculptural Monochrome Orb Centerpiece */}
              <div className="relative z-10 my-4 flex items-center justify-center">
                <div
                  className="w-28 h-28 rounded-full border border-white/20 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.16)]"
                  style={{
                    background:
                      'radial-gradient(circle at 38% 32%, #ffffff 0%, #a1a1aa 45%, #18181b 85%, #09090b 100%)',
                  }}
                >
                  <div className="w-20 h-20 rounded-full border border-white/25" />
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between gap-2 pt-3 border-t border-white/10">
                <div className="min-w-0">
                  <div className="text-xs font-semibold truncate">{activePreset.name}</div>
                  <div className="text-[11px] text-white/55 tabular-nums">
                    {dimensions.length} × {dimensions.width} × {dimensions.height} mm
                  </div>
                </div>
                <div className="text-[11px] text-white/70 shrink-0">{user.name}</div>
              </div>
            </section>
          </div>

          {/* BOTTOM BENTO ROW (2 Columns matching Image 2) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
            {/* 4. Saved Sheets & Questions List (Bottom-Left Card) */}
            <section className="xl:col-span-4 rounded-[24px] glass-card p-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <FileText className="w-4 h-4 opacity-75" />
                  <span>Your Solved Questions</span>
                </div>
                <button
                  onClick={onOpenSolverModal}
                  className="text-[11px] opacity-65 hover:opacity-100 underline cursor-pointer"
                >
                  + New
                </button>
              </div>

              <div className="space-y-2">
                {filteredRecords.slice(0, 4).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onLoadRecord(item)}
                    className={`w-full px-3.5 py-2.5 rounded-full border text-left flex items-center justify-between gap-2 text-xs transition-all cursor-pointer ${
                      isDark
                        ? 'border-white/10 bg-white/[0.03] hover:bg-white/[0.08]'
                        : 'border-black/10 bg-white/80 hover:bg-white'
                    }`}
                  >
                    <span className="truncate font-medium">{item.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-55 shrink-0" />
                  </button>
                ))}
              </div>
            </section>

            {/* 5. Obsidian Contrast Quick Question-to-CAD Solver (Bottom-Right Jet Black Card) */}
            <section className="xl:col-span-8 rounded-[24px] bg-[#0a0a0c] text-white p-5 sm:p-6 relative overflow-hidden border border-white/10 flex flex-col justify-between space-y-5">
              <div
                className="absolute inset-0 pointer-events-none opacity-45"
                style={{
                  background:
                    'radial-gradient(ellipse 70% 60% at 85% 90%, rgba(255,255,255,0.18) 0%, transparent 65%)',
                }}
              />

              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold tracking-[-0.02em]">
                    Ask an Engineering Graphics Question
                  </div>
                  <div className="text-[11px] text-white/55 mt-0.5">
                    Type your problem statement below to generate the exact 3D model and First-Angle 2D sheet
                  </div>
                </div>

                <div className="flex items-center gap-5 text-xs">
                  <div>
                    <div className="text-[10px] text-white/50">Solids</div>
                    <div className="font-semibold tabular-nums">{SOLID_PRESETS.length}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-white/50">Solved</div>
                    <div className="font-semibold tabular-nums">{savedQuestions.length}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-white/50">Standard</div>
                    <div className="font-semibold">ISO 128</div>
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

              {/* Minimalist Bar Chart Footer (Echoing Image 2 bottom-right graphic) */}
              <div className="relative z-10 flex items-end justify-between gap-4 pt-2 border-t border-white/10">
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

                <div className="hidden sm:flex items-end gap-1.5 h-10 shrink-0">
                  {[35, 55, 42, 72, 60, 88, 100].map((h, i) => (
                    <span
                      key={i}
                      style={{ height: `${h}%` }}
                      className="w-2 rounded-full bg-white/80"
                    />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};
