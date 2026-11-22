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
  Github
} from 'lucide-react';
import { SolidDimensions, ThemeMode } from '../types';

interface HeaderProps {
  solidName: string;
  dimensions: SolidDimensions;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenTheory: () => void;
  onOpenQuiz: () => void;
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
  onExportSheet,
  isExporting,
}) => {
  const isDark = theme === 'blueprint';
  const [copied, setCopied] = useState(false);

  const handleShareLink = () => {
    const shareUrl = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
      ? 'https://danish2030.github.io/OrthoView3D/'
      : window.location.href;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }).catch(() => {
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
      className={`h-14 px-4 border-b flex items-center justify-between select-none transition-colors duration-200 z-40 ${
        isDark
          ? 'bg-[#0b0f19] border-slate-800 text-slate-100'
          : 'bg-white border-slate-200 text-slate-800'
      }`}
    >
      {/* Brand & CAD Workstation Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-sky-500/20">
            <Box className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight font-mono">
                Ortho<span className="text-sky-400">View</span>3D
              </span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded border uppercase font-semibold ${
                  isDark
                    ? 'bg-sky-950/80 text-sky-400 border-sky-800/80'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}
              >
                1st Angle Proj
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono -mt-0.5 hidden sm:block">
              Engineering Graphics & Design • ISO 128 / BIS SP:46:2003
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 ml-4 pl-4 border-l border-slate-700/60">
          <span className="text-xs font-mono text-slate-400">Solid:</span>
          <span className="text-xs font-mono font-bold text-sky-400">{solidName}</span>
          <span className="text-[11px] font-mono text-slate-500">
            ({dimensions.length}×{dimensions.width}×{dimensions.height}mm)
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Theory Modal Trigger */}
        <button
          onClick={onOpenTheory}
          className={`px-3 py-1.5 text-xs font-mono rounded-lg border flex items-center gap-1.5 transition-all ${
            isDark
              ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700 hover:border-sky-500/50'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">1st Angle</span> Theory
        </button>

        {/* Practice Quiz Trigger */}
        <button
          onClick={onOpenQuiz}
          className={`px-3 py-1.5 text-xs font-mono rounded-lg border flex items-center gap-1.5 transition-all ${
            isDark
              ? 'bg-amber-950/30 hover:bg-amber-950/60 text-amber-300 border-amber-800/50'
              : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Practice</span> Quiz
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          title={isDark ? 'Switch to Drawing Sheet Theme (Light)' : 'Switch to CAD Blueprint Theme (Dark)'}
          className={`p-2 rounded-lg border transition-all ${
            isDark
              ? 'bg-slate-900 hover:bg-slate-800 text-amber-400 border-slate-700'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
          }`}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Download Project ZIP Button */}
        <button
          onClick={handleDownloadZip}
          title="Download Complete Source Code as ZIP"
          className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg border flex items-center gap-1.5 transition-all ${
            isDark
              ? 'bg-emerald-950/40 hover:bg-emerald-950/70 text-emerald-300 border-emerald-700/60 shadow-sm'
              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
          }`}
        >
          <Archive className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden md:inline">Download</span> ZIP
        </button>

        {/* Share Live Online Link */}
        <button
          onClick={handleShareLink}
          title="Copy Live Online Application Link"
          className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg border flex items-center gap-1.5 transition-all ${
            copied
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/60'
              : isDark
              ? 'bg-sky-950/40 hover:bg-sky-950/70 text-sky-300 border-sky-800/60'
              : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border-sky-200'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-sky-400" />}
          <span>{copied ? 'Link Copied!' : 'Share Live Link'}</span>
        </button>

        {/* GitHub Repository Link */}
        <a
          href="https://github.com/Danish2030/OrthoView3D"
          target="_blank"
          rel="noopener noreferrer"
          title="View on GitHub"
          className={`p-2 rounded-lg border transition-all flex items-center justify-center ${
            isDark
              ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-black border-slate-300'
          }`}
        >
          <Github className="w-4 h-4" />
        </a>

        {/* Export Sheet Button */}
        <button
          onClick={onExportSheet}
          disabled={isExporting}
          className="px-3.5 py-1.5 text-xs font-mono font-bold rounded-lg bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 shadow-md shadow-sky-500/20 flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isExporting ? 'Exporting...' : 'Export Sheet (PNG)'}</span>
        </button>
      </div>
    </header>
  );
};
