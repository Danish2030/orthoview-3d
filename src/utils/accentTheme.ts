export type AccentId = 'mono' | 'cyan' | 'emerald' | 'amber';

export interface AccentConfig {
  id: AccentId;
  label: string;
  hex: string;
  glow: string;
  soft: string;
  dotClass: string;
}

export const ACCENT_THEMES: AccentConfig[] = [
  {
    id: 'mono',
    label: 'Pure Mono',
    hex: '#e4e4e7',
    glow: 'rgba(255, 255, 255, 0.22)',
    soft: 'rgba(255, 255, 255, 0.08)',
    dotClass: 'bg-zinc-400',
  },
  {
    id: 'cyan',
    label: 'Blueprint Cyan',
    hex: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.28)',
    soft: 'rgba(56, 189, 248, 0.12)',
    dotClass: 'bg-sky-400',
  },
  {
    id: 'emerald',
    label: 'AutoCAD Emerald',
    hex: '#34d399',
    glow: 'rgba(52, 211, 153, 0.28)',
    soft: 'rgba(52, 211, 153, 0.12)',
    dotClass: 'bg-emerald-400',
  },
  {
    id: 'amber',
    label: 'Amber Technical',
    hex: '#fbbf24',
    glow: 'rgba(251, 191, 36, 0.28)',
    soft: 'rgba(251, 191, 36, 0.12)',
    dotClass: 'bg-amber-400',
  },
];

export function getSavedAccent(): AccentId {
  try {
    const saved = localStorage.getItem('orthoview-accent') as AccentId | null;
    if (saved && ACCENT_THEMES.some((a) => a.id === saved)) {
      return saved;
    }
  } catch {
    // fallback
  }
  return 'mono';
}

export function saveAccent(id: AccentId): void {
  try {
    localStorage.setItem('orthoview-accent', id);
  } catch {
    // ignore
  }
}

export function getAccentConfig(id: AccentId): AccentConfig {
  return ACCENT_THEMES.find((a) => a.id === id) || ACCENT_THEMES[0];
}
