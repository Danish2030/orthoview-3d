import React from 'react';
import { ArrowUpRight, Lock, Sun, Moon, Box, Layers, Compass, Sparkles } from 'lucide-react';
import { ThemeMode, UserProfile } from '../types';

interface LandingPageProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  user: UserProfile | null;
  onOpenAuth: (context?: string) => void;
  onEnterDashboard: () => void;
  onOpenStudio: () => void;
  onOpenTheory: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  theme,
  onToggleTheme,
  user,
  onOpenAuth,
  onEnterDashboard,
  onOpenStudio,
  onOpenTheory,
}) => {
  const isDark = theme === 'blueprint';

  const handleAskQuestionClick = () => {
    if (user) {
      onEnterDashboard();
    } else {
      onOpenAuth('Sign in to ask Engineering Graphics questions and unlock your personalized projection dashboard.');
    }
  };

  return (
    <div
      className={`min-h-screen w-full overflow-y-auto select-none transition-colors duration-300 ${
        isDark ? 'bg-[#0a0a0c] text-[#f4f4f6]' : 'bg-[#eceef0] text-[#0d0d10]'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-5 sm:py-8 space-y-6">
        {/* MAIN ARCHITECTURAL FRAME (Image 1 Aesthetic) */}
        <section className="rounded-[28px] sm:rounded-[34px] overflow-hidden shadow-[0_32px_90px_rgba(0,0,0,0.22)] border border-black/10 dark:border-white/10">
          {/* Upper Monochrome Sculptural Hero */}
          <div className="relative min-h-[540px] sm:min-h-[600px] bg-[#0b0b0d] text-white flex flex-col justify-between overflow-hidden">
            {/* Monochrome Flowing Wave & Matte Sphere Artwork */}
            <svg
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              viewBox="0 0 1440 760"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="bgGlow" cx="50%" cy="32%" r="62%">
                  <stop offset="0%" stopColor="#d4d4d8" stopOpacity="0.42" />
                  <stop offset="48%" stopColor="#3f3f46" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#09090b" stopOpacity="1" />
                </radialGradient>
                <radialGradient id="sphereGrad" cx="44%" cy="34%" r="60%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="52%" stopColor="#d4d4d8" />
                  <stop offset="86%" stopColor="#71717a" />
                  <stop offset="100%" stopColor="#27272a" />
                </radialGradient>
                <linearGradient id="ribbonLight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
                  <stop offset="45%" stopColor="#a1a1aa" stopOpacity="0.26" />
                  <stop offset="100%" stopColor="#09090b" stopOpacity="0.92" />
                </linearGradient>
                <linearGradient id="ribbonDark" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#e4e4e7" stopOpacity="0.48" />
                  <stop offset="50%" stopColor="#52525b" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#09090b" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              <rect width="1440" height="760" fill="#0b0b0d" />
              <rect width="1440" height="760" fill="url(#bgGlow)" />

              {/* Soft Background Ribbons */}
              <path
                d="M-80,470 C240,210 560,640 940,290 C1140,110 1320,160 1520,310 L1520,760 L-80,760 Z"
                fill="url(#ribbonDark)"
              />
              {/* Central Sculptural Matte Sphere */}
              <circle cx="720" cy="300" r="185" fill="url(#sphereGrad)" opacity="0.95" />

              {/* Parametric Contour Lines Sweeping Across Sphere */}
              {Array.from({ length: 16 }).map((_, i) => {
                const offset = i * 11;
                return (
                  <path
                    key={i}
                    d={`M-120,${390 + offset} C260,${190 + offset * 0.7} 540,${610 - offset * 0.4} 930,${360 + offset * 0.6} C1160,${210 + offset * 0.5} 1310,${290 + offset} 1560,${420 + offset}`}
                    fill="none"
                    stroke="rgba(255,255,255,0.22)"
                    strokeWidth={i % 3 === 0 ? '1.2' : '0.65'}
                  />
                );
              })}

              {/* Foreground Sweeping Silk Ribbon */}
              <path
                d="M-60,550 C310,330 620,690 1010,430 C1210,300 1360,360 1520,470 L1520,760 L-60,760 Z"
                fill="url(#ribbonLight)"
                opacity="0.72"
              />
              <rect y="540" width="1440" height="220" fill="url(#bgGlow)" opacity="0.35" />
              <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#09090b" stopOpacity="0" />
                <stop offset="100%" stopColor="#09090b" stopOpacity="0.94" />
              </linearGradient>
              <rect y="400" width="1440" height="360" fill="url(#bottomFade)" />
            </svg>

            {/* Minimal Top Navigation Bar */}
            <header className="relative z-10 px-6 sm:px-10 pt-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center">
                  <Box className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-semibold tracking-[-0.02em]">OrthoView3D</span>
              </div>

              <nav className="hidden md:flex items-center gap-7 text-xs text-white/70 font-medium">
                <button onClick={onOpenStudio} className="hover:text-white transition-colors cursor-pointer">
                  3D Studio
                </button>
                <button onClick={handleAskQuestionClick} className="hover:text-white transition-colors cursor-pointer">
                  Question Solver
                </button>
                <button onClick={onOpenTheory} className="hover:text-white transition-colors cursor-pointer">
                  ISO 128 Standard
                </button>
                <button
                  onClick={() => (user ? onEnterDashboard() : onOpenAuth('Sign in to view your personalized workspace.'))}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Workspace
                </button>
              </nav>

              <div className="flex items-center gap-2">
                <button
                  onClick={onToggleTheme}
                  title="Toggle Dark / Light Mode"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md text-white transition-colors cursor-pointer"
                >
                  {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                </button>

                {user ? (
                  <button
                    onClick={onEnterDashboard}
                    className="px-4 py-2 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Open Dashboard</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => onOpenAuth()}
                    className="px-4 py-2 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Lock className="w-3 h-3" />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </header>

            {/* Centerpiece Editorial Copy & Pill CTAs */}
            <div className="relative z-10 px-6 sm:px-10 pb-10 pt-24 sm:pt-32">
              <div className="max-w-2xl space-y-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/60 font-medium">
                  Precision Engineering Graphics • ISO 128 First-Angle
                </p>
                <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.035em] leading-[1.08] text-white">
                  3D Solids to Accurate Orthographic Projections.
                </h1>
                <p className="text-sm text-white/70 max-w-xl leading-relaxed">
                  Enter exact dimensions per view or submit any Engineering Graphics problem statement to generate mathematically accurate Front, Top, and Left-Hand Side drawings.
                </p>
              </div>

              {/* Clean Monochrome Pill Actions (matching Image 1 lower hero row) */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleAskQuestionClick}
                  className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{user ? 'Open Personalized Dashboard' : 'Sign In to Ask & View Questions'}</span>
                </button>
                <button
                  onClick={onOpenStudio}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md text-white text-xs font-medium transition-all cursor-pointer"
                >
                  Preview 3D CAD Studio
                </button>
                <button
                  onClick={onOpenTheory}
                  className="px-5 py-2.5 rounded-full bg-transparent hover:bg-white/10 border border-white/20 text-white/85 text-xs font-medium transition-all cursor-pointer"
                >
                  ISO First-Angle Guide
                </button>
              </div>
            </div>
          </div>

          {/* Lower Crisp Off-White Architectural Spec Strip (matching Image 1 bottom strip) */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-12 border-t ${
              isDark
                ? 'bg-[#121215] border-white/10 text-[#f4f4f6]'
                : 'bg-[#f7f7f8] border-black/10 text-[#0d0d10]'
            }`}
          >
            <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-black/10 dark:divide-white/10">
              {[
                {
                  title: 'First-Angle ISO',
                  subtitle: 'BIS SP:46 Compliant',
                  desc: 'Synchronized Front, Top, and Left-Hand Side projections with 45° miter transfer.',
                },
                {
                  title: 'View Dimensions',
                  subtitle: 'L × W × H Sync',
                  desc: 'Type millimeter values directly for every view with real-time 3D and 2D updates.',
                },
                {
                  title: 'Question Solver',
                  subtitle: 'Sign In Required',
                  desc: 'Submit textbook problems to automatically configure solids, inclinations, and sheets.',
                },
                {
                  title: 'High-Res Export',
                  subtitle: 'Drawing Sheet PNG',
                  desc: 'Export clean orthographic sheets with hidden lines, projectors, and title blocks.',
                },
              ].map((item) => (
                <div key={item.title} className="p-5 sm:p-6 space-y-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-current" />
                    <span className="w-2 h-2 rounded-full bg-current opacity-25" />
                    <span className="text-[11px] font-semibold ml-1 tracking-[-0.01em]">{item.title}</span>
                  </div>
                  <div className="text-xs font-medium opacity-85">{item.subtitle}</div>
                  <p className="text-[11px] leading-relaxed opacity-55">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Right Dark Swirl Preview Card (Image 1 bottom-right module) */}
            <div className="lg:col-span-3 p-4 sm:p-5 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-black/10 dark:border-white/10">
              <button
                onClick={handleAskQuestionClick}
                className="w-full h-full min-h-[112px] rounded-2xl bg-[#0b0b0d] text-white p-4 relative overflow-hidden flex flex-col justify-between text-left group cursor-pointer border border-white/10"
              >
                <div
                  className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full opacity-45 group-hover:scale-110 transition-transform duration-500"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(255,255,255,0.75) 0%, rgba(161,161,170,0.2) 45%, transparent 70%)',
                  }}
                />
                <div className="relative z-10 flex items-center justify-between text-[11px] text-white/65">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Member Access
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div className="relative z-10">
                  <div className="text-sm font-semibold tracking-[-0.02em]">
                    {user ? `Welcome, ${user.name.split(' ')[0]}` : 'Sign In to Workspace'}
                  </div>
                  <div className="text-[11px] text-white/60 mt-0.5">
                    Personalized dashboard &amp; Q&amp;A solver
                  </div>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Minimal Footer Spec Line */}
        <footer className="px-2 pb-4 flex flex-wrap items-center justify-between gap-3 text-[11px] opacity-55">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              OrthoView3D v2.0
            </span>
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              9 Parametric Engineering Solids
            </span>
          </div>
          <span>Designed for Engineering Graphics &amp; CAD Visualization</span>
        </footer>
      </div>
    </div>
  );
};
