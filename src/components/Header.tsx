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
  Lock
} from 'lucide-react';
import { SolidDimensions, ThemeMode, UserProfile } from '../types';

interface HeaderProps {
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
  onExportSheet: () => void;
  isExporting: boolean;
}

export const Header: React.FC<HeaderProps> = ({
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
      className={`h-16 px-4 sm:px-5 border-b glass-panel flex items-center justify-between select-none transition-all duration-300 z-40 ${
        isDark ? 'text-[#f4f4f6]' : 'text-[#0d0d10]'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onBackToDashboard}
          className="px-3 py-1.5 rounded-full glass-pill text-xs font-medium flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          {user ? <LayoutDashboard className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{user ? 'Dashboard' : 'Sign In'}</span>
        </button>

        <button onClick={onGoHome} className="flex items-center gap-2 cursor-pointer">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              isDark ? 'bg-white text-black' : 'bg-[#0d0d10] text-white'
            }`}
          >
            <Box className="w-4 h-4" />
          </div>
          <span className="font-semibold text-sm tracking-[-0.02em] hidden md:inline">
            OrthoView3D
          </span>
        </button>

        <div className="hidden xl:flex items-center gap-2 ml-1 px-3 py-1.5 rounded-full glass-pill text-xs">
          <span className="font-medium truncate max-w-[180px]">{solidName}</span>
          <span className="opacity-35">•</span>
          <span className="tabular-nums text-[11px] opacity-75">
            {dimensions.length} × {dimensions.width} × {dimensions.height} mm
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onOpenSolver}
          className="px-3.5 py-2 text-xs font-semibold rounded-full glass-pill-active flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ask Question</span>
        </button>

        <button
          onClick={onOpenTheory}
          className="px-3 py-2 text-xs font-medium rounded-full glass-pill flex items-center gap-1.5 cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 opacity-80" />
          <span className="hidden md:inline">Theory</span>
        </button>

        <button
          onClick={onOpenQuiz}
          className="px-3 py-2 text-xs font-medium rounded-full glass-pill flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 opacity-80" />
          <span className="hidden md:inline">Quiz</span>
        </button>

        <div
          className={`flex items-center p-1 rounded-full border ${
            isDark ? 'bg-white/[0.04] border-white/10' : 'bg-black/[0.04] border-black/10'
          }`}
        >
          <button
            onClick={() => !isDark && onToggleTheme()}
            title="Dark Mode"
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 transition-all cursor-pointer ${
              isDark ? 'bg-white text-black font-semibold' : 'opacity-60 hover:opacity-100'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Dark</span>
          </button>
          <button
            onClick={() => isDark && onToggleTheme()}
            title="Light Mode"
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 transition-all cursor-pointer ${
              !isDark ? 'bg-[#0d0d10] text-white font-semibold' : 'opacity-60 hover:opacity-100'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Light</span>
          </button>
        </div>

        <button
          onClick={handleShareLink}
          title="Copy Live Link"
          className="p-2 rounded-full glass-pill flex items-center justify-center cursor-pointer"
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

        <button
          onClick={onExportSheet}
          disabled={isExporting}
          className={`px-4 py-2 text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer ${
            isDark
              ? 'bg-white text-black hover:bg-zinc-200'
              : 'bg-[#0d0d10] text-white hover:bg-zinc-800'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Export PNG'}</span>
        </button>
      </div>
    </header>
  );
};
