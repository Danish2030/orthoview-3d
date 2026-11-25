import React, { useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Lock, Sun, Moon, Box, Compass, Building2 } from 'lucide-react';
import { SolidType, ThemeMode, UserProfile } from '../types';
import { AccentId, ACCENT_THEMES, getSavedAccent, saveAccent } from '../utils/accentTheme';

interface LandingPageProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  user: UserProfile | null;
  onOpenAuth: (context?: string) => void;
  onEnterDashboard: () => void;
  onOpenStudio: () => void;
  onOpenTheory: () => void;
  onSelectSolidAndOpen?: (type: SolidType) => void;
  accentId?: AccentId;
  onSelectAccent?: (id: AccentId) => void;
  onOpenProDashboard?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  theme,
  onToggleTheme,
  user,
  onOpenAuth,
  onEnterDashboard,
  onOpenStudio,
  onOpenTheory,
  accentId: propAccentId,
  onSelectAccent: propOnSelectAccent,
  onOpenProDashboard,
}) => {
  const isDark = theme === 'blueprint';
  const heroRef = useRef<HTMLDivElement | null>(null);
  const coordRef = useRef<HTMLSpanElement | null>(null);

  const [internalAccentId, setInternalAccentId] = useState<AccentId>(getSavedAccent);
  const accentId = propAccentId ?? internalAccentId;

  const activeAccent = useMemo(
    () => ACCENT_THEMES.find((a) => a.id === accentId) || ACCENT_THEMES[0],
    [accentId]
  );

  const handleSelectAccent = (id: AccentId) => {
    saveAccent(id);
    if (propOnSelectAccent) {
      propOnSelectAccent(id);
    } else {
      setInternalAccentId(id);
    }
  };

  // Zero-re-render pointer spotlight via CSS custom properties + DOM ref
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const ry = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    el.style.setProperty('--spot-x', `${(rx * 100).toFixed(1)}%`);
    el.style.setProperty('--spot-y', `${(ry * 100).toFixed(1)}%`);
    if (coordRef.current) {
      coordRef.current.textContent = `X ${(rx * 420).toFixed(0)} • Y ${((1 - ry) * 297).toFixed(0)} MM`;
    }
  };

  const handleEnterClick = () => {
    if (user) {
      onEnterDashboard();
    } else {
      onOpenAuth('Sign in to unlock your CAD Dashboard, Interactive 3D Lab, Photo-to-CAD Scanner, and Exam Deck.');
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-between select-none transition-colors duration-300 ${
        isDark ? 'bg-[#08080a] text-[#f4f4f6]' : 'bg-[#eceef0] text-[#0d0d10]'
      }`}
    >
      <div className="max-w-[1360px] w-full mx-auto px-4 sm:px-8 py-4 sm:py-7 flex-1 flex flex-col justify-center">
        {/* Minimalist Immersive Architectural Frame */}
        <section
          ref={heroRef}
          onPointerMove={handlePointerMove}
          style={{ ['--spot-x' as string]: '50%', ['--spot-y' as string]: '38%' }}
          className="relative min-h-[82vh] rounded-[30px] sm:rounded-[36px] bg-[#0a0a0d] text-white overflow-hidden shadow-[0_32px_90px_rgba(0,0,0,0.28)] border border-white/10 flex flex-col justify-between gpu-layer"
        >
          {/* Subtle Architectural Sphere + Contour Artwork (Lightweight Static SVG) */}
          <svg
            className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-90"
            viewBox="0 0 1440 820"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="minGlow" cx="50%" cy="38%" r="58%">
                <stop offset="0%" stopColor={activeAccent.hex} stopOpacity="0.24" />
                <stop offset="50%" stopColor="#27272a" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#09090b" stopOpacity="1" />
              </radialGradient>
              <radialGradient id="minSphere" cx="42%" cy="32%" r="62%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="48%" stopColor="#a1a1aa" />
                <stop offset="84%" stopColor="#27272a" />
                <stop offset="100%" stopColor="#09090b" />
              </radialGradient>
            </defs>
            <rect width="1440" height="820" fill="#0a0a0d" />
            <rect width="1440" height="820" fill="url(#minGlow)" />
            <circle cx="720" cy="340" r="190" fill="url(#minSphere)" opacity="0.88" />
            <ellipse cx="720" cy="340" rx="285" ry="74" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1" transform="rotate(-14 720 340)" />
            <ellipse cx="720" cy="340" rx="240" ry="110" fill="none" stroke={activeAccent.hex} strokeOpacity="0.22" strokeWidth="1" strokeDasharray="4 6" transform="rotate(18 720 340)" />
            <line x1="0" y1="340" x2="1440" y2="340" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="720" y1="0" x2="720" y2="820" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </svg>

          {/* GPU Cursor Spotlight */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(520px circle at var(--spot-x) var(--spot-y), ${activeAccent.glow}, transparent 65%)`,
            }}
          />

          {/* Subtle A3 Corner Crop Marks */}
          <div className="pointer-events-none hidden sm:block absolute top-5 left-5 w-4 h-4 border-t border-l border-white/25" />
          <div className="pointer-events-none hidden sm:block absolute top-5 right-5 w-4 h-4 border-t border-r border-white/25" />
          <div className="pointer-events-none hidden sm:block absolute bottom-5 left-5 w-4 h-4 border-b border-l border-white/25" />
          <div className="pointer-events-none hidden sm:block absolute bottom-5 right-5 w-4 h-4 border-b border-r border-white/25" />

          {/* Clean Minimal Header */}
          <header className="relative z-10 px-6 sm:px-10 pt-6 sm:pt-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <Box className="w-4 h-4" style={{ color: activeAccent.hex }} />
              </div>
              <span className="text-sm font-semibold tracking-[-0.02em]">VectorDesk</span>
            </div>

            <nav className="hidden md:flex items-center gap-7 text-xs text-white/65 font-medium">
              <button onClick={onOpenStudio} className="hover:text-white transition-colors cursor-pointer">
                3D Studio
              </button>
              {onOpenProDashboard && (
                <button
                  onClick={onOpenProDashboard}
                  className="hover:text-sky-300 text-sky-400 font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Builders CAD</span>
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded-full bg-sky-500/20 text-sky-300 font-bold">
                    PRO
                  </span>
                </button>
              )}
              <button onClick={onOpenTheory} className="hover:text-white transition-colors cursor-pointer">
                ISO 128
              </button>
              <button onClick={handleEnterClick} className="hover:text-white transition-colors cursor-pointer">
                Workspace
              </button>
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/[0.07] border border-white/15">
                {ACCENT_THEMES.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleSelectAccent(acc.id)}
                    title={acc.label}
                    className={`w-2.5 h-2.5 rounded-full ${acc.dotClass} transition-transform cursor-pointer ${
                      accentId === acc.id ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={onToggleTheme}
                title="Switch Dark / Light Mode"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors cursor-pointer"
              >
                {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={handleEnterClick}
                className="px-4 py-2 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {user ? (
                  <>
                    <span>Dashboard</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    <Lock className="w-3 h-3" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </div>
          </header>

          {/* Centerpiece Minimalist Editorial Copy & Dual Stream Cards */}
          <div className="relative z-10 px-6 sm:px-10 py-12 sm:py-16 text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.07] border border-white/15 text-[10px] font-mono uppercase tracking-[0.2em] text-white/75">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeAccent.hex }} />
              Dual-Stream Engineering &amp; Civil CAD Studio
            </div>

            <h1 className="text-4xl sm:text-6xl font-semibold tracking-[-0.04em] leading-[1.04] text-white">
              Precision 3D, Orthographic &amp; Civil CAD.
            </h1>

            <p className="text-sm sm:text-base text-white/65 max-w-xl mx-auto leading-relaxed">
              VectorDesk unites academic B.Tech Engineering Graphics (ISO 128) with a dedicated professional CAD suite for builders, architects, and civil engineers.
            </p>

            {/* Dual Stream Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left pt-2 max-w-2xl mx-auto">
              {/* Card 1: Academic Stream */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 transition-all flex flex-col justify-between space-y-3 group">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-semibold">
                      Academic Stream
                    </span>
                    <span className="text-[10px] opacity-50 font-mono">24EST1004-C</span>
                  </div>
                  <h3 className="text-base font-semibold text-white mt-1 group-hover:text-sky-300 transition-colors">
                    B.Tech Graphics Lab
                  </h3>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">
                    ISO 128 First-Angle projections, Line Solvers, Planometric Solids, CSG Booleans, and Title Block sheet exports.
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleEnterClick}
                    className="px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    <span>Enter Lab</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={onOpenStudio}
                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all cursor-pointer"
                  >
                    3D View
                  </button>
                </div>
              </div>

              {/* Card 2: Professional Stream */}
              <div className="p-4 sm:p-5 rounded-2xl bg-sky-500/[0.08] hover:bg-sky-500/[0.12] border border-sky-500/25 transition-all flex flex-col justify-between space-y-3 group">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                      Professional Stream
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-sky-500/20 text-sky-300 font-bold">
                      NEW v4.0
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white mt-1 group-hover:text-emerald-300 transition-colors">
                    Builders &amp; Civil CAD Hub
                  </h3>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">
                    2D/3D Floor Plans, RCC Column Grids, Dog-Legged Stairs, Elevation/Section, MEP Overlays, FAR &amp; BOQ Schedules.
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={onOpenProDashboard || handleEnterClick}
                    className="px-3.5 py-1.5 rounded-full bg-sky-500 hover:bg-sky-400 text-white dark:text-black text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-sky-500/20"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Launch Pro Hub</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quiet Minimalist Footer Bar */}
          <div className="relative z-10 px-6 sm:px-10 py-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-white/50">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              VECTORDESK v4.0.0
            </span>
            <span ref={coordRef} className="tabular-nums">
              X 210 • Y 148 MM
            </span>
            <span>DXF • SVG • PDF • STL</span>
          </div>
        </section>
      </div>
    </div>
  );
};
