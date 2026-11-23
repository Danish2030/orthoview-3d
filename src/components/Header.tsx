import React, { useState } from 'react';
import {
  Download,
  BookOpen,
  Sun,
  Moon,
  Box,
  Sparkles,
  Archive,
  Share2,
  Check,
  Github,
  Wand2
} from 'lucide-react';
import { SolidDimensions, ThemeMode } from '../types';

interface HeaderProps {
  solidName: string;
  dimensions: SolidDimensions;
  theme: ThemeMode;
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

  const handleDownloadZip = () => {
    const a = document.createElement('a');
    a.href = './orthoview3d-source-code.zip';
    a.download = 'orthoview3d-source-code.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <header
      className={`h-16 px-4 sm:px-5 border-b glass-panel flex items-center justify-between select-none transition-all duration-300 z-40 ${
        isDark ? 'text-[#f3f2fa]' : 'text-[#141326]'
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl glass-pill-active flex items-center justify-center shrink-0">
            <Box className={`w-4 h-4 ${isDark ? 'text-violet-200' : 'text-violet-700'}`} />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[15px] tracking-[-0.02em]">
                OrthoView<span className={isDark ? 'text-violet-300' : 'text-violet-600'}>3D</span>
              </span>
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                  isDark
                    ? 'bg-white/[0.06] text-violet-200/90 border-white/15'
                    : 'bg-violet-500/10 text-violet-700 border-violet-500/20'
                }`}
              >
                1st Angle
              </span>
            </div>
            <div className={`text-[11px] hidden sm:block ${isDark ? 'text-[#9b99b8]' : 'text-[#5c5b74]'}`}>
              Engineering Graphics Studio
            </div>
          </div>
        </div>

        <div
          className={`hidden xl:flex items-center gap-2 ml-2 px-3 py-1.5 rounded-full glass-pill text-xs ${
            isDark ? 'text-[#c9c6e2]' : 'text-[#393756]'
          }`}
        >
          <span className="font-medium truncate max-w-[180px]">{solidName}</span>
          <span className="opacity-35">•</span>
          <span className="tabular-nums text-[11px] opacity-80">
            {dimensions.length} × {dimensions.width} × {dimensions.height} mm
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onOpenSolver}
          className={`px-3.5 py-2 text-xs font-medium rounded-full glass-pill-active flex items-center gap-1.5 transition-all cursor-pointer ${
            isDark ? 'text-violet-100 hover:brightness-110' : 'text-violet-900 hover:brightness-95'
          }`}
        >
          <Wand2 className={`w-3.5 h-3.5 ${isDark ? 'text-violet-200' : 'text-violet-600'}`} />
          <span className="hidden sm:inline">Solve</span> Question
        </button>

        <button
          onClick={onOpenTheory}
          className={`px-3 py-2 text-xs font-medium rounded-full glass-pill flex items-center gap-1.5 cursor-pointer ${
            isDark ? 'text-[#dcdaf0]' : 'text-[#282644]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 opacity-80" />
          <span className="hidden md:inline">Theory</span>
        </button>

        <button
          onClick={onOpenQuiz}
          className={`px-3 py-2 text-xs font-medium rounded-full glass-pill flex items-center gap-1.5 cursor-pointer ${
            isDark ? 'text-[#dcdaf0]' : 'text-[#282644]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 opacity-80" />
          <span className="hidden md:inline">Quiz</span>
        </button>

        <div
          className={`flex items-center p-1 rounded-full border ${
            isDark
              ? 'bg-white/[0.04] border-white/10'
              : 'bg-indigo-950/[0.05] border-indigo-950/10'
          }`}
          role="group"
          aria-label="Theme Switch"
        >
          <button
            onClick={() => !isDark && onToggleTheme()}
            title="Dark Mode (Liquid Glass)"
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 transition-all cursor-pointer ${
              isDark
                ? 'glass-pill-active text-white'
                : 'text-[#5c5b74] hover:text-[#141326]'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Dark</span>
          </button>
          <button
            onClick={() => isDark && onToggleTheme()}
            title="Light Mode (Frosted Glass)"
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 transition-all cursor-pointer ${
              !isDark
                ? 'glass-pill-active text-violet-950'
                : 'text-[#9b99b8] hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Light</span>
          </button>
        </div>

        <button
          onClick={handleShareLink}
          title="Copy Live Link"
          className={`p-2 rounded-full glass-pill flex items-center justify-center cursor-pointer ${
            copied
              ? 'text-emerald-400 border-emerald-400/40'
              : isDark
              ? 'text-[#dcdaf0]'
              : 'text-[#282644]'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
        </button>

        <button
          onClick={handleDownloadZip}
          title="Download Source ZIP"
          className={`hidden sm:flex p-2 rounded-full glass-pill items-center justify-center cursor-pointer ${
            isDark ? 'text-[#dcdaf0]' : 'text-[#282644]'
          }`}
        >
          <Archive className="w-4 h-4" />
        </button>

        <a
          href="https://github.com/Danish2030/orthoview-3d"
          target="_blank"
          rel="noopener noreferrer"
          title="View on GitHub"
          className={`hidden sm:flex p-2 rounded-full glass-pill items-center justify-center ${
            isDark ? 'text-[#dcdaf0]' : 'text-[#282644]'
          }`}
        >
          <Github className="w-4 h-4" />
        </a>

        <button
          onClick={onExportSheet}
          disabled={isExporting}
          className="px-4 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 text-white shadow-[0_6px_22px_rgba(124,58,237,0.38)] flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Export PNG'}</span>
        </button>
      </div>
    </header>
  );
};
