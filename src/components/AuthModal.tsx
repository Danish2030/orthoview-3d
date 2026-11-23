import React, { useState } from 'react';
import { X, ArrowRight, Lock, User, Mail, GraduationCap } from 'lucide-react';
import { ThemeMode, UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  onAuthenticated: (user: UserProfile) => void;
  contextMessage?: string;
}

function makeInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'OV';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  theme,
  onAuthenticated,
  contextMessage,
}) => {
  const isDark = theme === 'blueprint';
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('B.Tech Engineering');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setError('Enter a valid email address to continue.');
      return;
    }
    if (password.trim().length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }

    const derivedName =
      name.trim() ||
      cleanEmail
        .split('@')[0]
        .replace(/[._-]+/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

    const profile: UserProfile = {
      name: derivedName,
      email: cleanEmail,
      branch: branch.trim() || 'B.Tech Engineering',
      initials: makeInitials(derivedName),
    };
    setError('');
    onAuthenticated(profile);
    onClose();
  };

  const handleDemoSignIn = () => {
    const profile: UserProfile = {
      name: 'Danish Jubily',
      email: 'danish@orthoview3d.studio',
      branch: 'B.Tech Engineering',
      initials: 'DJ',
    };
    onAuthenticated(profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md select-text">
      <div
        className={`w-full max-w-md rounded-[28px] overflow-hidden border shadow-2xl ${
          isDark
            ? 'bg-[#111114]/95 border-white/15 text-[#f4f4f6]'
            : 'bg-white/95 border-black/10 text-[#0d0d10]'
        }`}
      >
        <div className="p-6 sm:p-7 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border border-current/15 opacity-75 mb-3">
                <Lock className="w-3 h-3" />
                <span>OrthoView3D Account</span>
              </div>
              <h2 className="text-xl font-semibold tracking-[-0.025em]">
                {mode === 'signin' ? 'Sign in to your workspace' : 'Create your studio profile'}
              </h2>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {contextMessage ||
                  'Access the Question-to-Drawing Solver, saved projection sheets, and your personalized dashboard.'}
              </p>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isDark ? 'hover:bg-white/10 text-zinc-400' : 'hover:bg-black/5 text-zinc-500'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div
            className={`grid grid-cols-2 p-1 rounded-full border text-xs font-medium ${
              isDark ? 'bg-white/[0.04] border-white/10' : 'bg-black/[0.04] border-black/10'
            }`}
          >
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`py-2 rounded-full transition-all cursor-pointer ${
                mode === 'signin'
                  ? isDark
                    ? 'bg-white text-black font-semibold'
                    : 'bg-black text-white font-semibold'
                  : 'opacity-65 hover:opacity-100'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`py-2 rounded-full transition-all cursor-pointer ${
                mode === 'signup'
                  ? isDark
                    ? 'bg-white text-black font-semibold'
                    : 'bg-black text-white font-semibold'
                  : 'opacity-65 hover:opacity-100'
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="text-[11px] font-medium opacity-75">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-45" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Danish Jubily"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-2xl glass-input"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[11px] font-medium opacity-75">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-45" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@college.edu"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-2xl glass-input"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="text-[11px] font-medium opacity-75">Engineering Branch</label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-45" />
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="e.g. Electronics & Communication"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-2xl glass-input"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[11px] font-medium opacity-75">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-45" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-2xl glass-input"
                />
              </div>
            </div>

            {error && <div className="text-[11px] text-rose-500 font-medium">{error}</div>}

            <button
              type="submit"
              className={`w-full py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isDark
                  ? 'bg-white text-black hover:bg-zinc-200'
                  : 'bg-[#0d0d10] text-white hover:bg-zinc-800'
              }`}
            >
              <span>{mode === 'signin' ? 'Sign In & Open Dashboard' : 'Create Profile & Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="relative flex items-center py-1">
            <div className="flex-grow border-t border-current/10" />
            <span className="px-3 text-[10px] uppercase tracking-widest opacity-45">or</span>
            <div className="flex-grow border-t border-current/10" />
          </div>

          <button
            type="button"
            onClick={handleDemoSignIn}
            className="w-full py-2.5 rounded-full text-xs font-medium glass-pill flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Quick Preview with Demo Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};
