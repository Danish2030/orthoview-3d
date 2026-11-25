import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Lock,
  Sun,
  Moon,
  Box,
  Layers,
  Compass,
  Sparkles,
  Volume2,
  VolumeX,
  Image as ImageIcon,
} from 'lucide-react';
import { SolidType, ThemeMode, UserProfile } from '../types';
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
  { id: 'mono', label: 'Pure Mono', hex: '#e4e4e7', glow: 'rgba(255, 255, 255, 0.22)', dotClass: 'bg-zinc-400' },
  { id: 'cyan', label: 'Blueprint Cyan', hex: '#38bdf8', glow: 'rgba(56, 189, 248, 0.28)', dotClass: 'bg-sky-400' },
  { id: 'emerald', label: 'AutoCAD Emerald', hex: '#34d399', glow: 'rgba(52, 211, 153, 0.28)', dotClass: 'bg-emerald-400' },
  { id: 'amber', label: 'Amber Technical', hex: '#fbbf24', glow: 'rgba(251, 191, 36, 0.26)', dotClass: 'bg-amber-400' },
];

interface LandingPageProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  user: UserProfile | null;
  onOpenAuth: (context?: string) => void;
  onEnterDashboard: () => void;
  onOpenStudio: () => void;
  onOpenTheory: () => void;
  onOpenImageSolver?: () => void;
  onSelectSolidAndOpen?: (type: SolidType) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  theme,
  onToggleTheme,
  user,
  onOpenAuth,
  onEnterDashboard,
  onOpenStudio,
  onOpenTheory,
  onOpenImageSolver,
  onSelectSolidAndOpen,
}) => {
  const isDark = theme === 'blueprint';
  const [accentId, setAccentId] = useState<AccentId>(() => {
    try {
      const saved = localStorage.getItem('orthoview-accent') as AccentId | null;
      if (saved && ACCENT_THEMES.some((a) => a.id === saved)) return saved;
    } catch {
      // ignore
    }
    return 'mono';
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 142.5, y: 88.0 });
  const [spotPos, setSpotPos] = useState<{ x: number; y: number }>({ x: 50, y: 30 });
  const audioCtxRef = useRef<AudioContext | null>(null);

  const activeAccent = useMemo(
    () => ACCENT_THEMES.find((a) => a.id === accentId) || ACCENT_THEMES[0],
    [accentId]
  );

  // Ultra-subtle mechanical CAD click synthesizer (muted by default)
  const playCadClick = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(980, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.028);
      gain.gain.setValueAtTime(0.045, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.032);
    } catch {
      // ignore audio restrictions
    }
  }, [soundEnabled]);

  const handleSelectAccent = (id: AccentId) => {
    playCadClick();
    setAccentId(id);
    try {
      localStorage.setItem('orthoview-accent', id);
    } catch {
      // ignore
    }
  };

  const handleAskQuestionClick = () => {
    playCadClick();
    if (user) {
      onEnterDashboard();
    } else {
      onOpenAuth('Sign in to ask Engineering Graphics questions and unlock your personalized projection dashboard.');
    }
  };

  const handleHeroPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const ry = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setSpotPos({ x: rx * 100, y: ry * 100 });
    setCoords({
      x: Number((rx * 420).toFixed(1)),
      y: Number(((1 - ry) * 297).toFixed(1)),
    });
  };

  const effectiveAccent = accentId === 'mono' ? (isDark ? '#e4e4e7' : '#0d0d10') : activeAccent.hex;

  return (
    <div
      className={`min-h-screen w-full overflow-y-auto select-none transition-colors duration-300 ${
        isDark ? 'bg-[#08080a] text-[#f4f4f6]' : 'bg-[#eceef0] text-[#0d0d10]'
      }`}
    >
      <div className="max-w-[1380px] mx-auto px-3.5 sm:px-8 py-4 sm:py-7 space-y-7">
        {/* MAIN ARCHITECTURAL A3 DRAFTING FRAME */}
        <section
          onPointerMove={handleHeroPointerMove}
          className="rounded-[28px] sm:rounded-[34px] overflow-hidden shadow-[0_32px_90px_rgba(0,0,0,0.24)] border border-black/10 dark:border-white/10"
        >
          {/* Upper Immersive Hero Canvas */}
          <div className="relative bg-[#0a0a0d] text-white flex flex-col justify-between overflow-hidden blueprint-grid">
            {/* Cursor-Reactive Radial Spotlight */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(620px circle at ${spotPos.x}% ${spotPos.y}%, ${activeAccent.glow}, transparent 62%)`,
              }}
            />

            {/* A3 Drawing-Sheet Crop Marks */}
            <div className="pointer-events-none hidden sm:block absolute top-4 left-4 w-5 h-5 border-t border-l border-white/25" />
            <div className="pointer-events-none hidden sm:block absolute top-4 right-4 w-5 h-5 border-t border-r border-white/25" />
            <div className="pointer-events-none hidden sm:block absolute bottom-4 left-4 w-5 h-5 border-b border-l border-white/25" />
            <div className="pointer-events-none hidden sm:block absolute bottom-4 right-4 w-5 h-5 border-b border-r border-white/25" />

            {/* Top Navigation Bar */}
            <header className="relative z-10 px-5 sm:px-10 pt-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center">
                  <Box className="w-4 h-4" style={{ color: activeAccent.hex }} />
                </div>
                <div>
                  <span className="text-sm font-semibold tracking-[-0.02em] block leading-none">OrthoView3D</span>
                  <span className="text-[9px] font-mono text-white/45">A3 • 420×297 MM</span>
                </div>
              </div>

              <nav className="hidden lg:flex items-center gap-7 text-xs text-white/70 font-medium">
                <button onClick={onOpenStudio} className="hover:text-white transition-colors cursor-pointer">
                  3D Studio
                </button>
                {onOpenImageSolver && (
                  <button onClick={onOpenImageSolver} className="hover:text-white transition-colors cursor-pointer">
                    Image → CAD
                  </button>
                )}
                <button onClick={handleAskQuestionClick} className="hover:text-white transition-colors cursor-pointer">
                  Question Solver
                </button>
                <button onClick={onOpenTheory} className="hover:text-white transition-colors cursor-pointer">
                  ISO 128 Standard
                </button>
              </nav>

              <div className="flex items-center gap-2">
                {/* 4-Dot Accent Switcher */}
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/[0.08] border border-white/15">
                  {ACCENT_THEMES.map((acc) => (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => handleSelectAccent(acc.id)}
                      title={acc.label}
                      className={`w-3 h-3 rounded-full ${acc.dotClass} transition-transform cursor-pointer ${
                        accentId === acc.id ? 'ring-2 ring-white scale-110' : 'opacity-55 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>

                {/* Optional Mechanical CAD Sound Toggle */}
                <button
                  type="button"
                  onClick={() => setSoundEnabled((prev) => !prev)}
                  title={soundEnabled ? 'Mute CAD Audio' : 'Enable Mechanical CAD Clicks'}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors cursor-pointer"
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 opacity-65" />}
                </button>

                {/* Dark / Light Theme Toggle */}
                <button
                  onClick={() => {
                    playCadClick();
                    onToggleTheme();
                  }}
                  title="Toggle Dark / Light Mode"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors cursor-pointer"
                >
                  {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                </button>

                {user ? (
                  <button
                    onClick={() => {
                      playCadClick();
                      onEnterDashboard();
                    }}
                    className="px-4 py-2 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Dashboard</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      playCadClick();
                      onOpenAuth();
                    }}
                    className="px-4 py-2 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Lock className="w-3 h-3" />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </header>

            {/* Split Immersive Hero: Copy Left + Live 3D Projection Unfold Stage Right */}
            <div className="relative z-10 px-5 sm:px-10 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.07] border border-white/15 text-[10px] font-mono uppercase tracking-[0.18em] text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeAccent.hex }} />
                  ISO 128 First-Angle • v3.5 CAD Engine
                </div>

                <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.035em] leading-[1.06] text-white">
                  3D Solids to Accurate Orthographic Projections.
                </h1>

                <p className="text-sm text-white/70 max-w-xl leading-relaxed">
                  Orbit live 3D solids, unfold VP/HP projection planes in real time, scan textbook isometric photos, and export production AutoCAD{' '}
                  <span className="text-white font-medium">.DXF, .SVG, .PDF &amp; .STL</span> sheets.
                </p>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <button
                    onClick={handleAskQuestionClick}
                    className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>{user ? 'Open Dashboard' : 'Sign In & Solve'}</span>
                  </button>
                  <button
                    onClick={() => {
                      playCadClick();
                      onOpenStudio();
                    }}
                    className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs font-medium transition-all cursor-pointer"
                  >
                    Launch 3D Studio
                  </button>
                  {onOpenImageSolver && (
                    <button
                      onClick={() => {
                        playCadClick();
                        onOpenImageSolver();
                      }}
                      className="px-4 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/20 text-white/90 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5" style={{ color: activeAccent.hex }} />
                      <span>Photo → CAD</span>
                    </button>
                  )}
                </div>

                {/* Live Cursor / Sheet Coordinate HUD */}
                <div className="pt-2 flex flex-wrap items-center gap-3 text-[10px] font-mono text-white/50 tabular-nums">
                  <span>X: {coords.x.toFixed(1)} mm</span>
                  <span>•</span>
                  <span>Y: {coords.y.toFixed(1)} mm</span>
                  <span>•</span>
                  <span>SCALE 1:1</span>
                </div>
              </div>

              {/* Right Interactive 3D-to-2D Unfold + X-Ray Loupe Stage */}
              <div className="lg:col-span-6">
                <HeroProjectionStage
                  accentHex={activeAccent.hex}
                  accentGlow={activeAccent.glow}
                  onPlayClick={playCadClick}
                  onLaunchSolid={onSelectSolidAndOpen}
                />
              </div>
            </div>

            {/* Floating CAD Spec Status Strip */}
            <div className="relative z-10 border-t border-white/10 bg-black/45 px-5 sm:px-10 py-3 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono tracking-wider text-white/65">
              <span>ISO 128 FIRST-ANGLE</span>
              <span className="hidden sm:inline opacity-35">•</span>
              <span>TRUE HIDDEN-LINE REMOVAL</span>
              <span className="hidden sm:inline opacity-35">•</span>
              <span>AUTOCAD .DXF + .STL EXPORT</span>
              <span className="hidden sm:inline opacity-35">•</span>
              <span>3D BOOLEAN CSG ENGINE</span>
              <span className="hidden sm:inline opacity-35">•</span>
              <span style={{ color: activeAccent.hex }}>PHOTO-TO-CAD VISION</span>
            </div>
          </div>
        </section>

        {/* INTERACTIVE CAD SHOWCASE (Before/After, 1st vs 3rd Angle, CSG Tree, Type-to-Morph, Export Layers, Exam Deck) */}
        <LandingInteractiveShowcase
          isDark={isDark}
          accentHex={effectiveAccent}
          onPlayClick={playCadClick}
          onOpenStudio={onOpenStudio}
          onOpenImageSolver={onOpenImageSolver || onOpenStudio}
          onSelectSolidAndOpen={onSelectSolidAndOpen || (() => onOpenStudio())}
        />

        {/* Member CTA Banner */}
        <section className="rounded-[26px] bg-[#0a0a0c] text-white p-6 sm:p-8 border border-white/10 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div
            className="absolute -right-12 -bottom-12 w-56 h-56 rounded-full opacity-40 pointer-events-none"
            style={{ background: `radial-gradient(circle, ${activeAccent.glow} 0%, transparent 70%)` }}
          />
          <div className="relative z-10 space-y-1">
            <div className="text-[11px] font-mono text-white/60 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" style={{ color: activeAccent.hex }} />
              Ready to draft faster?
            </div>
            <h2 className="text-xl font-semibold tracking-[-0.02em]">
              {user ? `Continue in your workspace, ${user.name.split(' ')[0]}` : 'Unlock Your Personalized CAD Workspace'}
            </h2>
            <p className="text-xs text-white/65">
              Track Drawing Mastery, save projection sessions, and solve university exam sheets in seconds.
            </p>
          </div>
          <button
            onClick={handleAskQuestionClick}
            className="relative z-10 px-5 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors"
          >
            <span>{user ? 'Open Dashboard' : 'Sign In Free'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </section>

        {/* Minimal Footer Spec Line */}
        <footer className="px-2 pb-4 flex flex-wrap items-center justify-between gap-3 text-[11px] opacity-55">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              OrthoView3D v3.5.0
            </span>
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              9 Parametric Solids + Universal CSG
            </span>
          </div>
          <span>Designed for Engineering Graphics &amp; CAD Visualization</span>
        </footer>
      </div>
    </div>
  );
};
