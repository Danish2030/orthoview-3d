import React, { useState } from 'react';
import {
  Download,
  BookOpen,
  Sun,
  Moon,
  Box,
  Sparkles,
  Share2,
  Check,
  Github,
  Wand2,
  LayoutDashboard,
  Lock,
  Ruler,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';
import { SolidDimensions, StudioModule, ThemeMode, UserProfile } from '../types';

interface HeaderProps {
  activeModule: StudioModule;
  onSelectModule: (mod: StudioModule) => void;
  solidName: string;
  dimensions: SolidDimensions;
  theme: ThemeMode;
  user: UserProfile | null;
  onBackToDashboard: () => void;
  onGoHome: () => void;
  onToggleTheme: () => void;
  onOpenTheory: () => void;
  onOpenQuiz: () => void;
  onOpenSolver: () => void;
  onOpenImageSolver: () => void;
  onExportSheet: () => void;
  isExporting: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeModule,
  onSelectModule,
  solidName,
  dimensions,
  theme,
  user,
  onBackToDashboard,
  onGoHome,
  onToggleTheme,
  onOpenTheory,
  onOpenQuiz,
  onOpenSolver,
  onOpenImageSolver,
  onExportSheet,
  isExporting,
}) => {
  const isDark = theme === 'blueprint';
  const [copied, setCopied] = useState(false);

  const handleShareLink = () => {
    const shareUrl =
      window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
        ? 'https://danish2030.github.io/orthoview-3d/'
        : window.location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2200);
        })
        .catch(() => {
          prompt('Copy live application link:', shareUrl);
        });
    } else {
      prompt('Copy live application link:', shareUrl);
    }
  };

  return (
    <header
      className={`h-16 px-4 sm:px-5 border-b glass-panel flex items-center justify-between gap-2 select-none transition-all duration-300 z-40 ${
        isDark ? 'text-[#f4f4f6]' : 'text-[#0d0d10]'
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          onClick={onBackToDashboard}
          className="px-3 py-1.5 rounded-full glass-pill text-xs font-medium flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          {user ? <LayoutDashboard className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{user ? 'Dashboard' : 'Sign In'}</span>
        </button>

        <button onClick={onGoHome} className="hidden xl:flex items-center gap-2 cursor-pointer">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              isDark ? 'bg-white text-black' : 'bg-[#0d0d10] text-white'
            }`}
          >
            <Box className="w-4 h-4" />
          </div>
          <span className="font-semibold text-sm tracking-[-0.02em]">OrthoView3D</span>
        </button>

        {/* Module Switcher */}
        <div
          className={`flex items-center p-1 rounded-full border text-[11px] font-medium ${
            isDark ? 'bg-white/[0.04] border-white/10' : 'bg-black/[0.04] border-black/10'
          }`}
        >
          <button
            onClick={() => onSelectModule('orthographic')}
            className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-all cursor-pointer ${
              activeModule === 'orthographic' ? 'glass-pill-active font-semibold' : 'opacity-65 hover:opacity-100'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Solids</span>
          </button>
          <button
            onClick={() => onSelectModule('lines')}
            className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-all cursor-pointer ${
              activeModule === 'lines' ? 'glass-pill-active font-semibold' : 'opacity-65 hover:opacity-100'
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Lines</span>
          </button>
          <button
            onClick={() => onSelectModule('planometric')}
            className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-all cursor-pointer ${
              activeModule === 'planometric' ? 'glass-pill-active font-semibold' : 'opacity-65 hover:opacity-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Planometric</span>
          </button>
        </div>

        {activeModule === 'orthographic' && (
          <div className="hidden 2xl:flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill text-xs">
            <span className="font-medium truncate max-w-[160px]">{solidName}</span>
            <span className="opacity-35">•</span>
            <span className="tabular-nums text-[11px] opacity-75">
              {dimensions.length}×{dimensions.width}×{dimensions.height} mm
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onOpenImageSolver}
          className="px-3 py-2 text-xs font-medium rounded-full glass-pill flex items-center gap-1.5 transition-all cursor-pointer"
          title="Upload Isometric Question Photo"
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Image → CAD</span>
        </button>

        <button
          onClick={onOpenSolver}
          className="px-3.5 py-2 text-xs font-semibold rounded-full glass-pill-active flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Exam Bank &amp; Solver</span>
        </button>

        <button
          onClick={onOpenTheory}
          className="hidden lg:flex px-3 py-2 text-xs font-medium rounded-full glass-pill items-center gap-1.5 cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 opacity-80" />
          <span>Theory</span>
        </button>

        <button
          onClick={onOpenQuiz}
          className="hidden lg:flex px-3 py-2 text-xs font-medium rounded-full glass-pill items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 opacity-80" />
          <span>Quiz</span>
        </button>

        <button
          onClick={onToggleTheme}
          title="Switch Dark / Light Mode"
          className="p-2 rounded-full glass-pill cursor-pointer"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <button
          onClick={handleShareLink}
          title="Copy Live Link"
          className="hidden sm:flex p-2 rounded-full glass-pill items-center justify-center cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
        </button>

        <a
          href="https://github.com/Danish2030/orthoview-3d"
          target="_blank"
          rel="noopener noreferrer"
          title="View on GitHub"
          className="hidden sm:flex p-2 rounded-full glass-pill items-center justify-center"
        >
          <Github className="w-4 h-4" />
        </a>

        {activeModule === 'orthographic' && (
          <button
            onClick={onExportSheet}
            disabled={isExporting}
            className={`px-3.5 py-2 text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer ${
              isDark
                ? 'bg-white text-black hover:bg-zinc-200'
                : 'bg-[#0d0d10] text-white hover:bg-zinc-800'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Export / DWG'}</span>
          </button>
        )}
      </div>
    </header>
  );
};
