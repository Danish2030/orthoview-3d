import React, { useState } from 'react';
import {
  ArrowLeftRight,
  ArrowUpRight,
  Box,
  Check,
  Download,
  FileCode2,
  Layers,
  Scan,
  Sliders,
  Sparkles,
  Wand2,
} from 'lucide-react';
import { SolidType } from '../types';

interface LandingInteractiveShowcaseProps {
  isDark: boolean;
  accentHex: string;
  onPlayClick?: () => void;
  onOpenStudio: () => void;
  onOpenImageSolver: () => void;
  onSelectSolidAndOpen: (type: SolidType) => void;
}

const EXAM_DECK: {
  id: string;
  title: string;
  tag: string;
  dims: string;
  solidType: SolidType;
  summary: string;
}[] = [
  {
    id: 'ex-1',
    title: 'Stepped T-Block (R10 Groove)',
    tag: 'LHSV • R10 Groove',
    dims: '40 × 50 × 30 mm',
    solidType: 'stepped-t-block',
    summary: 'Rear semi-cylindrical vertical groove with 20 mm stepped front tongue.',
  },
  {
    id: 'ex-2',
    title: 'Slotted Cylinder Bracket',
    tag: 'Blind Bore Ø40×24',
    dims: '140 × 50 × 50 mm',
    solidType: 'slotted-cylinder-bracket',
    summary: 'Forked base plate (T=10) with 30 mm end slots & central Ø64 boss.',
  },
  {
    id: 'ex-3',
    title: 'Machined Bracket (Q9)',
    tag: 'RHSV • Stepped Slot',
    dims: '100 × 64 × 75 mm',
    solidType: 'machined-bracket',
    summary: 'Exam-standard Right-Hand Side View bracket with internal hidden cuts.',
  },
  {
    id: 'ex-4',
    title: 'Tapered Slotted Block (Q10)',
    tag: 'LHSV • Tapered',
    dims: '86 × 34 × 56 mm',
    solidType: 'ribbed-block',
    summary: 'Symmetrical angled profile with central machined recess.',
  },
  {
    id: 'ex-5',
    title: 'Counterbore Cylinder',
    tag: 'Concentric Bores',
    dims: 'Ø55 × 60 mm',
    solidType: 'counterbore',
    summary: 'Turned cylindrical block with stepped internal counterbore.',
  },
];

export const LandingInteractiveShowcase: React.FC<LandingInteractiveShowcaseProps> = ({
  isDark,
  accentHex,
  onPlayClick,
  onOpenStudio,
  onOpenImageSolver,
  onSelectSolidAndOpen,
}) => {
  // 1. Before / After Photo-to-CAD Drag Slider
  const [splitPct, setSplitPct] = useState(52);

  // 2. 1st-Angle vs 3rd-Angle Live Flip
  const [angleMode, setAngleMode] = useState<'first' | 'third'>('first');

  // 3. Exploded CSG Layer Slider
  const [explodePct, setExplodePct] = useState(65);

  // 4. Type-to-Morph Mini Sandbox
  const [sandboxLength, setSandboxLength] = useState(80);
  const [sandboxHasHole, setSandboxHasHole] = useState(true);
  const [sandboxTilt, setSandboxTilt] = useState(0);
  const [sandboxPrompt, setSandboxPrompt] = useState('Stepped block 80mm with Ø40 bore');

  // 5. Interactive Export Layer Inspector
  const [exportFormat, setExportFormat] = useState<'DXF' | 'SVG' | 'PDF' | 'STL'>('DXF');
  const [layers, setLayers] = useState({
    OUTLINE: true,
    HIDDEN: true,
    CENTER: true,
    DIM: true,
  });

  const toggleLayer = (key: keyof typeof layers) => {
    onPlayClick?.();
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const applyChip = (label: string, action: () => void) => {
    onPlayClick?.();
    action();
    setSandboxPrompt(label);
  };

  const cardClass = `rounded-[26px] border p-5 sm:p-6 transition-all duration-300 ${
    isDark
      ? 'bg-[#111114]/90 border-white/10 hover:border-white/20 text-[#f4f4f6]'
      : 'bg-white/85 border-black/10 hover:border-black/20 text-[#0d0d10]'
  }`;

  const strokeMain = isDark ? '#f4f4f6' : '#0d0d10';

  return (
    <div className="space-y-6">
      {/* SECTION 1: 3-Step Animated Pipeline ("Scan → Model → Export") */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            step: '01',
            title: 'Scan Any Textbook Photo',
            desc: 'Drop an exam isometric drawing—our Cloud Vision + offline OCR pipeline extracts exact millimeter dimensions.',
            icon: <Scan className="w-4 h-4" style={{ color: accentHex }} />,
            badge: '1-Step Vision',
            visual: (
              <div className="relative h-20 rounded-2xl bg-black/5 dark:bg-white/[0.04] border border-current/10 overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 120 54" className="w-28 h-14">
                  <polygon points="60,8 92,22 92,42 60,52 28,42 28,22" fill="none" stroke="currentColor" strokeOpacity="0.65" strokeWidth="1.2" />
                  <polyline points="28,22 60,34 92,22" fill="none" stroke={accentHex} strokeWidth="1.3" />
                  <line x1="60" y1="34" x2="60" y2="52" stroke={accentHex} strokeWidth="1.3" />
                </svg>
                <div
                  className="absolute inset-x-0 top-0 h-0.5 animate-scan-beam"
                  style={{ backgroundColor: accentHex, boxShadow: `0 0 12px ${accentHex}` }}
                />
              </div>
            ),
          },
          {
            step: '02',
            title: 'True 3D Boolean CSG',
            desc: 'Additive bosses, ribs, and subtractive holes/grooves assemble into a watertight 3D mesh on the fly.',
            icon: <Box className="w-4 h-4" style={{ color: accentHex }} />,
            badge: 'three-bvh-csg',
            visual: (
              <div className="h-20 rounded-2xl bg-black/5 dark:bg-white/[0.04] border border-current/10 flex items-center justify-center gap-2 text-[10px] font-mono">
                <span className="px-2 py-1 rounded-lg border border-current/20">+ BASE</span>
                <span className="opacity-50">→</span>
                <span className="px-2 py-1 rounded-lg border" style={{ borderColor: accentHex, color: accentHex }}>
                  + BOSS
                </span>
                <span className="opacity-50">→</span>
                <span className="px-2 py-1 rounded-lg border border-rose-400/50 text-rose-400">- Ø40</span>
              </div>
            ),
          },
          {
            step: '03',
            title: 'AutoCAD 4-View Export',
            desc: 'Generate synchronized Front, Top, and Side views with hidden lines, custom line colors, and title blocks.',
            icon: <Download className="w-4 h-4" style={{ color: accentHex }} />,
            badge: 'DXF • SVG • PDF',
            visual: (
              <div className="h-20 rounded-2xl bg-black/5 dark:bg-white/[0.04] border border-current/10 flex items-center justify-center gap-1.5">
                {['.DXF', '.PDF', '.SVG', '.PNG', '.STL'].map((ext) => (
                  <span
                    key={ext}
                    className="px-2 py-1 rounded-lg text-[10px] font-mono font-semibold border border-current/15"
                  >
                    {ext}
                  </span>
                ))}
              </div>
            ),
          },
        ].map((item) => (
          <div key={item.step} className={`${cardClass} flex flex-col justify-between space-y-4 hover:-translate-y-0.5`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono opacity-45">{item.step}</span>
                {item.icon}
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full border border-current/15 opacity-70">
                {item.badge}
              </span>
            </div>
            {item.visual}
            <div>
              <h3 className="text-sm font-semibold tracking-[-0.01em]">{item.title}</h3>
              <p className="text-xs opacity-65 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* SECTION 2: Before / After Photo → AutoCAD Slider + 1st vs 3rd Angle Live Flip */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Before / After Photo-to-CAD Drag Comparison */}
        <div className={`lg:col-span-7 ${cardClass} flex flex-col justify-between space-y-4`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-[10px] uppercase tracking-wider opacity-55 font-semibold">
                Interactive Before / After
              </div>
              <h3 className="text-base font-semibold tracking-[-0.02em]">
                Textbook Photo → 4-View AutoCAD Sheet
              </h3>
            </div>
            <button
              type="button"
              onClick={() => {
                onPlayClick?.();
                onOpenImageSolver();
              }}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold border border-current/15 hover:bg-current/10 flex items-center gap-1 cursor-pointer"
            >
              <span>Try Photo-to-CAD</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Split-Screen Visual */}
          <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-current/15 select-none">
            {/* RIGHT LAYER (Full AutoCAD Vector Sheet) */}
            <div className="absolute inset-0 bg-[#0b0d12] text-white p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[9px] font-mono text-white/55">
                <span>AUTOCAD 4-VIEW SHEET • ISO 128</span>
                <span style={{ color: accentHex }}>SCALE 1:1 • MM</span>
              </div>
              <svg viewBox="0 0 360 155" className="w-full h-40">
                {/* Quadrant dividers */}
                <line x1="180" y1="6" x2="180" y2="148" stroke="rgba(255,255,255,0.22)" strokeDasharray="3 3" />
                <line x1="12" y1="82" x2="348" y2="82" stroke="rgba(255,255,255,0.22)" strokeDasharray="3 3" />
                {/* 45 deg miter line */}
                <line x1="180" y1="82" x2="250" y2="148" stroke={accentHex} strokeOpacity="0.45" strokeDasharray="4 2" />
                {/* Front View (Top-Left) */}
                <rect x="52" y="22" width="96" height="46" fill="none" stroke={accentHex} strokeWidth="1.6" />
                <rect x="76" y="42" width="48" height="26" fill="none" stroke="#ffffff" strokeWidth="1.3" />
                <line x1="88" y1="22" x2="88" y2="68" stroke="#38bdf8" strokeDasharray="4 3" strokeWidth="1.1" />
                <line x1="112" y1="22" x2="112" y2="68" stroke="#38bdf8" strokeDasharray="4 3" strokeWidth="1.1" />
                <text x="52" y="16" fill="#9ca3af" fontSize="8" fontFamily="monospace">FRONT VIEW (FV)</text>
                {/* Top View (Bottom-Left) */}
                <rect x="52" y="96" width="96" height="42" fill="none" stroke={accentHex} strokeWidth="1.6" />
                <path d="M88,96 A12,12 0 0,0 112,96" fill="none" stroke="#34d399" strokeWidth="1.5" />
                <text x="52" y="150" fill="#9ca3af" fontSize="8" fontFamily="monospace">TOP VIEW (TV) • R10</text>
                {/* Left-Hand Side View (Top-Right) */}
                <path d="M214,22 L248,22 L248,46 L276,46 L276,68 L214,68 Z" fill="none" stroke={accentHex} strokeWidth="1.6" />
                <line x1="230" y1="22" x2="230" y2="68" stroke="#38bdf8" strokeDasharray="4 3" strokeWidth="1.1" />
                <text x="214" y="16" fill="#9ca3af" fontSize="8" fontFamily="monospace">LHSV</text>
              </svg>
              <div className="flex items-center justify-between text-[9px] font-mono text-white/50 border-t border-white/10 pt-1.5">
                <span>TITLE: STEPPED T-BLOCK (40×50×30)</span>
                <span>1ST ANGLE</span>
              </div>
            </div>

            {/* LEFT LAYER (Clipped Textbook Isometric Photo) */}
            <div
              className="absolute inset-0 bg-[#f1efe8] text-[#18181b] p-4 flex flex-col justify-between"
              style={{ clipPath: `inset(0 ${100 - splitPct}% 0 0)` }}
            >
              <div className="flex items-center justify-between text-[9px] font-mono text-zinc-600">
                <span>RAW TEXTBOOK PHOTO INPUT</span>
                <span>FIG. 14.8</span>
              </div>
              <svg viewBox="0 0 360 155" className="w-full h-40">
                <g transform="translate(88, 18)">
                  <polygon points="90,10 150,38 150,92 90,120 30,92 30,38" fill="#e5e2d8" stroke="#27272a" strokeWidth="1.5" />
                  <polyline points="30,38 90,66 150,38" fill="none" stroke="#27272a" strokeWidth="1.5" />
                  <line x1="90" y1="66" x2="90" y2="120" stroke="#27272a" strokeWidth="1.5" />
                  <ellipse cx="90" cy="36" rx="18" ry="8" fill="#d4d0c5" stroke="#27272a" strokeWidth="1.3" />
                  <text x="158" y="68" fill="#3f3f46" fontSize="10" fontFamily="monospace">H=30</text>
                  <text x="118" y="122" fill="#3f3f46" fontSize="10" fontFamily="monospace">L=40</text>
                  <text x="2" y="114" fill="#3f3f46" fontSize="10" fontFamily="monospace">W=50</text>
                </g>
              </svg>
              <div className="text-[9px] font-mono text-zinc-500">
                Drag slider to reveal AutoCAD vector output →
              </div>
            </div>

            {/* Vertical Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 pointer-events-none"
              style={{ left: `${splitPct}%`, backgroundColor: accentHex }}
            >
              <div
                className="w-7 h-7 rounded-full -ml-3.5 top-1/2 -translate-y-1/2 relative flex items-center justify-center text-black shadow-lg"
                style={{ backgroundColor: accentHex }}
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Transparent Range Input for Smooth Touch + Mouse Drag */}
            <input
              type="range"
              min={8}
              max={92}
              value={splitPct}
              onChange={(e) => setSplitPct(Number(e.target.value))}
              aria-label="Drag to compare textbook photo and AutoCAD output"
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
            />
          </div>
        </div>

        {/* 1st-Angle vs 3rd-Angle Live Flip Widget */}
        <div className={`lg:col-span-5 ${cardClass} flex flex-col justify-between space-y-4`}>
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-[10px] uppercase tracking-wider opacity-55 font-semibold">
                Projection Standard
              </div>
              <h3 className="text-base font-semibold tracking-[-0.02em]">
                1st-Angle vs. 3rd-Angle Flip
              </h3>
            </div>
            <div className="flex items-center gap-1 p-0.5 rounded-full border border-current/15">
              {(['first', 'third'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    onPlayClick?.();
                    setAngleMode(m);
                  }}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all cursor-pointer ${
                    angleMode === m
                      ? isDark
                        ? 'bg-white text-black'
                        : 'bg-[#0d0d10] text-white'
                      : 'opacity-65 hover:opacity-100'
                  }`}
                >
                  {m === 'first' ? '1st ISO' : '3rd ANSI'}
                </button>
              ))}
            </div>
          </div>

          {/* Animated Quadrant Layout */}
          <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl border border-current/10 bg-black/[0.03] dark:bg-white/[0.03]">
            {angleMode === 'first' ? (
              <>
                <div className="rounded-xl p-3 border text-center space-y-1 transition-all" style={{ borderColor: accentHex }}>
                  <div className="text-[10px] font-mono opacity-60">TOP-LEFT</div>
                  <div className="text-xs font-semibold">Front View (FV)</div>
                </div>
                <div className="rounded-xl p-3 border border-current/15 text-center space-y-1 transition-all">
                  <div className="text-[10px] font-mono opacity-60">TOP-RIGHT</div>
                  <div className="text-xs font-semibold">Left Side (LHSV)</div>
                </div>
                <div className="rounded-xl p-3 border border-current/15 text-center space-y-1 transition-all">
                  <div className="text-[10px] font-mono opacity-60">BOTTOM-LEFT</div>
                  <div className="text-xs font-semibold">Top View (TV)</div>
                </div>
                <div className="rounded-xl p-3 border border-dashed border-current/15 text-center flex flex-col items-center justify-center opacity-70">
                  <div className="text-[10px] font-mono">45° Miter</div>
                  <div className="text-[9px] opacity-70">ISO Projection</div>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-xl p-3 border border-current/15 text-center space-y-1 transition-all">
                  <div className="text-[10px] font-mono opacity-60">TOP-LEFT</div>
                  <div className="text-xs font-semibold">Top View (TV)</div>
                </div>
                <div className="rounded-xl p-3 border border-dashed border-current/15 text-center flex flex-col items-center justify-center opacity-70">
                  <div className="text-[10px] font-mono">45° Miter</div>
                  <div className="text-[9px] opacity-70">ANSI Projection</div>
                </div>
                <div className="rounded-xl p-3 border text-center space-y-1 transition-all" style={{ borderColor: accentHex }}>
                  <div className="text-[10px] font-mono opacity-60">BOTTOM-LEFT</div>
                  <div className="text-xs font-semibold">Front View (FV)</div>
                </div>
                <div className="rounded-xl p-3 border border-current/15 text-center space-y-1 transition-all">
                  <div className="text-[10px] font-mono opacity-60">BOTTOM-RIGHT</div>
                  <div className="text-xs font-semibold">Right Side (RHSV)</div>
                </div>
              </>
            )}
          </div>

          <p className="text-[11px] opacity-65 leading-relaxed">
            {angleMode === 'first'
              ? 'ISO 128 / BIS SP:46 (KTU syllabus standard): Object sits between observer and plane — Top View drops below Front View, LHSV sits on the right.'
              : 'ANSI / ASME Third-Angle: Plane sits between observer and object — Top View sits above Front View, RHSV sits on the right.'}
          </p>
        </div>
      </section>

      {/* SECTION 3: Exploded CSG Layers + Live Type-to-Morph Mini Sandbox + Export Layer Inspector */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* A. Exploded CSG Layer Inspector */}
        <div className={`${cardClass} flex flex-col justify-between space-y-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4" style={{ color: accentHex }} />
              <h3 className="text-sm font-semibold">Exploded CSG Tree</h3>
            </div>
            <span className="text-[10px] font-mono opacity-65 tabular-nums">{explodePct}%</span>
          </div>

          <div className="h-44 rounded-2xl border border-current/10 bg-black/[0.03] dark:bg-white/[0.03] flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 220 150" className="w-full h-full">
              {/* Layer 3: Subtract Bore (top) */}
              <g transform={`translate(0, ${-explodePct * 0.24})`}>
                <ellipse cx="110" cy="48" rx="18" ry="7" fill="none" stroke="#f43f5e" strokeDasharray="3 2" strokeWidth="1.4" />
                <line x1="92" y1="48" x2="92" y2="66" stroke="#f43f5e" strokeDasharray="3 2" strokeWidth="1.2" />
                <line x1="128" y1="48" x2="128" y2="66" stroke="#f43f5e" strokeDasharray="3 2" strokeWidth="1.2" />
                <text x="142" y="54" fill="#f43f5e" fontSize="8" fontFamily="monospace">SUB Ø40</text>
              </g>

              {/* Layer 2: Add Boss (middle) */}
              <g transform={`translate(0, ${-explodePct * 0.06})`}>
                <ellipse cx="110" cy="72" rx="30" ry="11" fill="none" stroke={accentHex} strokeWidth="1.5" />
                <line x1="80" y1="72" x2="80" y2="94" stroke={accentHex} strokeWidth="1.4" />
                <line x1="140" y1="72" x2="140" y2="94" stroke={accentHex} strokeWidth="1.4" />
                <path d="M80 94 A30 11 0 0 0 140 94" fill="none" stroke={accentHex} strokeWidth="1.4" />
                <text x="148" y="84" fill={accentHex} fontSize="8" fontFamily="monospace">ADD Ø64</text>
              </g>

              {/* Layer 1: Add Base Plate (bottom) */}
              <g transform={`translate(0, ${explodePct * 0.2})`}>
                <polygon points="110,88 175,104 110,120 45,104" fill="none" stroke={strokeMain} strokeWidth="1.4" />
                <polyline points="45,104 45,114 110,130 175,114 175,104" fill="none" stroke={strokeMain} strokeOpacity="0.65" strokeWidth="1.2" />
                <text x="146" y="132" fill={strokeMain} opacity="0.65" fontSize="8" fontFamily="monospace">ADD BASE</text>
              </g>
            </svg>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] opacity-60">
              <span>Unified Solid</span>
              <span>Exploded Primitives</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={explodePct}
              onChange={(e) => setExplodePct(Number(e.target.value))}
              className="w-full h-1.5 cursor-pointer"
            />
          </div>
        </div>

        {/* B. Live Type-to-Morph Mini Sandbox */}
        <div className={`${cardClass} flex flex-col justify-between space-y-3.5`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wand2 className="w-4 h-4" style={{ color: accentHex }} />
              <h3 className="text-sm font-semibold">Live Type-to-Morph</h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-current/15 opacity-70">
              Instant
            </span>
          </div>

          <div className="h-32 rounded-2xl border border-current/10 bg-black/[0.03] dark:bg-white/[0.03] flex items-center justify-center">
            <svg viewBox="0 0 220 110" className="w-full h-full">
              <g transform={`translate(110, 56) rotate(${sandboxTilt})`}>
                <rect
                  x={-sandboxLength * 0.65}
                  y={-28}
                  width={sandboxLength * 1.3}
                  height={56}
                  rx="2"
                  fill="none"
                  stroke={accentHex}
                  strokeWidth="1.8"
                  className="transition-all duration-300"
                />
                <rect
                  x={-sandboxLength * 0.65}
                  y={-28}
                  width={sandboxLength * 0.45}
                  height={24}
                  fill="none"
                  stroke={strokeMain}
                  strokeOpacity="0.6"
                  strokeWidth="1.2"
                />
                {sandboxHasHole && (
                  <>
                    <circle cx={sandboxLength * 0.18} cy={4} r="13" fill="none" stroke="#38bdf8" strokeWidth="1.4" />
                    <line x1={sandboxLength * 0.18 - 17} y1={4} x2={sandboxLength * 0.18 + 17} y2={4} stroke="#38bdf8" strokeDasharray="3 2" strokeWidth="0.9" />
                    <line x1={sandboxLength * 0.18} y1={-13} x2={sandboxLength * 0.18} y2={21} stroke="#38bdf8" strokeDasharray="3 2" strokeWidth="0.9" />
                  </>
                )}
              </g>
              <text x="12" y="102" fill={strokeMain} opacity="0.6" fontSize="8.5" fontFamily="monospace">
                L={sandboxLength}mm • {sandboxHasHole ? 'Ø40 Bore' : 'Solid'} • Tilt {sandboxTilt}°
              </text>
            </svg>
          </div>

          <div className="text-[11px] font-mono px-3 py-1.5 rounded-xl border border-current/15 opacity-80 truncate">
            {sandboxPrompt}
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => applyChip('Lengthen block to 110 mm', () => setSandboxLength((l) => (l === 110 ? 75 : 110)))}
              className="px-2.5 py-1 rounded-full text-[10px] border border-current/15 hover:bg-current/10 cursor-pointer"
            >
              L: {sandboxLength === 110 ? '75' : '110'}
            </button>
            <button
              type="button"
              onClick={() => applyChip(sandboxHasHole ? 'Remove central Ø40 hole' : 'Add central Ø40 through-bore', () => setSandboxHasHole((h) => !h))}
              className="px-2.5 py-1 rounded-full text-[10px] border border-current/15 hover:bg-current/10 cursor-pointer"
            >
              {sandboxHasHole ? 'No Hole' : '+ Ø40 Hole'}
            </button>
            <button
              type="button"
              onClick={() => applyChip('Incline plane by 25° to HP', () => setSandboxTilt((t) => (t === 0 ? -18 : 0)))}
              className="px-2.5 py-1 rounded-full text-[10px] border border-current/15 hover:bg-current/10 cursor-pointer"
            >
              {sandboxTilt === 0 ? '25° Tilt' : 'Reset 0°'}
            </button>
            <button
              type="button"
              onClick={() => {
                onPlayClick?.();
                onOpenStudio();
              }}
              className="ml-auto px-2.5 py-1 rounded-full text-[10px] font-semibold cursor-pointer"
              style={{ backgroundColor: accentHex, color: '#09090b' }}
            >
              Full Studio →
            </button>
          </div>
        </div>

        {/* C. Interactive Export Layer Inspector */}
        <div className={`${cardClass} flex flex-col justify-between space-y-3.5`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode2 className="w-4 h-4" style={{ color: accentHex }} />
              <h3 className="text-sm font-semibold">Export Layer Inspector</h3>
            </div>
            <div className="flex items-center gap-1">
              {(['DXF', 'SVG', 'PDF', 'STL'] as const).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => {
                    onPlayClick?.();
                    setExportFormat(fmt);
                  }}
                  className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-semibold cursor-pointer transition-colors ${
                    exportFormat === fmt
                      ? isDark
                        ? 'bg-white text-black'
                        : 'bg-[#0d0d10] text-white'
                      : 'opacity-55 hover:opacity-100'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Live Layer Preview SVG */}
          <div className="h-32 rounded-2xl border border-current/10 bg-[#0b0d12] flex items-center justify-center p-2">
            <svg viewBox="0 0 220 100" className="w-full h-full">
              {layers.OUTLINE && (
                <path d="M55,22 L165,22 L165,76 L55,76 Z" fill="none" stroke="#ffffff" strokeWidth="1.8" />
              )}
              {layers.HIDDEN && (
                <>
                  <line x1="88" y1="22" x2="88" y2="76" stroke="#38bdf8" strokeDasharray="4 3" strokeWidth="1.3" />
                  <line x1="132" y1="22" x2="132" y2="76" stroke="#38bdf8" strokeDasharray="4 3" strokeWidth="1.3" />
                </>
              )}
              {layers.CENTER && (
                <line x1="110" y1="12" x2="110" y2="86" stroke="#34d399" strokeDasharray="8 3 2 3" strokeWidth="1.1" />
              )}
              {layers.DIM && (
                <g stroke="#fbbf24" strokeWidth="0.9" fill="#fbbf24">
                  <line x1="55" y1="88" x2="165" y2="88" />
                  <line x1="55" y1="78" x2="55" y2="92" />
                  <line x1="165" y1="78" x2="165" y2="92" />
                  <text x="98" y="85" fontSize="8" fontFamily="monospace" stroke="none">
                    140 mm
                  </text>
                </g>
              )}
              <text x="10" y="14" fill="#9ca3af" fontSize="7.5" fontFamily="monospace">
                FORMAT: .{exportFormat}
              </text>
            </svg>
          </div>

          {/* Clickable AutoCAD Layer Pills */}
          <div className="grid grid-cols-2 gap-1.5">
            {(
              [
                { key: 'OUTLINE', color: '#ffffff' },
                { key: 'HIDDEN', color: '#38bdf8' },
                { key: 'CENTER', color: '#34d399' },
                { key: 'DIM', color: '#fbbf24' },
              ] as const
            ).map((l) => (
              <button
                key={l.key}
                type="button"
                onClick={() => toggleLayer(l.key)}
                className={`px-2.5 py-1.5 rounded-xl border text-[10px] font-mono flex items-center justify-between cursor-pointer transition-all ${
                  layers[l.key] ? 'border-current/25 opacity-100' : 'border-current/10 opacity-40'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                  {l.key}
                </span>
                {layers[l.key] && <Check className="w-3 h-3" />}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: 1-Tap Exam Question Deck (Swipeable Carousel) */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <div>
            <div className="text-[10px] uppercase tracking-wider opacity-55 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" style={{ color: accentHex }} />
              1-Tap Exam Question Deck
            </div>
            <h2 className="text-lg font-semibold tracking-[-0.02em]">
              Launch Pre-Configured University Solids Instantly
            </h2>
          </div>
          <span className="text-[11px] opacity-55 flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5" />
            Tap any card to open in 3D Studio
          </span>
        </div>

        <div className="flex gap-3.5 overflow-x-auto pb-2 custom-scrollbar snap-x snap-mandatory">
          {EXAM_DECK.map((q) => (
            <button
              key={q.id}
              type="button"
              onClick={() => {
                onPlayClick?.();
                onSelectSolidAndOpen(q.solidType);
              }}
              className={`snap-start min-w-[260px] max-w-[280px] shrink-0 rounded-[22px] border p-4 text-left flex flex-col justify-between space-y-3 transition-all hover:-translate-y-0.5 cursor-pointer ${
                isDark
                  ? 'bg-[#111114] border-white/10 hover:border-white/25'
                  : 'bg-white/90 border-black/10 hover:border-black/25'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full border"
                  style={{ borderColor: accentHex + '66', color: accentHex }}
                >
                  {q.tag}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-55" />
              </div>

              <div>
                <div className="text-sm font-semibold tracking-[-0.01em]">{q.title}</div>
                <div className="text-[11px] font-mono opacity-60 mt-0.5">{q.dims}</div>
                <p className="text-[11px] opacity-65 mt-2 leading-relaxed">{q.summary}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
