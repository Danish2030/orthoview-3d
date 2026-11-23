import React, { useRef, useState } from 'react';
import { Download, Plus, Trash2, RotateCcw, Layers, Wand2 } from 'lucide-react';
import { PlanometricBlock, PlanometricParams, ThemeMode } from '../types';
import { Q2_DEFAULT_PLANOMETRIC } from '../utils/examBank';
import { parsePlanometricQuestion } from '../utils/questionParser';

interface PlanometricStudioProps {
  params: PlanometricParams;
  onChangeParams: (next: PlanometricParams) => void;
  theme: ThemeMode;
}

const COS45 = Math.SQRT1_2;

export const PlanometricStudio: React.FC<PlanometricStudioProps> = ({
  params,
  onChangeParams,
  theme,
}) => {
  const isDark = theme === 'blueprint';
  const [showHidden, setShowHidden] = useState(true);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [questionText, setQuestionText] = useState('');
  const [parsedFeedback, setParsedFeedback] = useState<string[] | null>(null);

  const handleSolvePlanometric = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    const result = parsePlanometricQuestion(questionText);
    onChangeParams(result.params);
    setParsedFeedback(result.notes);
  };

  const updateBlock = (id: string, field: keyof PlanometricBlock, value: number | string) => {
    onChangeParams({
      ...params,
      blocks: params.blocks.map((b) => (b.id === id ? { ...b, [field]: value } : b)),
    });
  };

  const addBlock = () => {
    const idx = params.blocks.length + 1;
    const newBlock: PlanometricBlock = {
      id: `b-${Date.now()}`,
      label: `Block ${idx}`,
      x: 20,
      y: 10,
      dx: 20,
      dy: 15,
      dz: 15,
    };
    onChangeParams({ ...params, blocks: [...params.blocks, newBlock] });
  };

  const removeBlock = (id: string) => {
    onChangeParams({
      ...params,
      blocks: params.blocks.filter((b) => b.id !== id),
    });
  };

  const handleExportSVG = () => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgRef.current);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OrthoView3D_Planometric_${params.baseX}x${params.baseY}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // True 45°/45° Planometric projection (right angles in plan preserved!)
  const scale = 2.6;
  const cx = 310;
  const cy = 370;

  const proj = (x: number, y: number, z: number) => ({
    sx: cx + (x - y) * COS45 * scale,
    sy: cy - (x + y) * COS45 * scale - z * scale,
  });

  const ptsStr = (pts: { sx: number; sy: number }[]) =>
    pts.map((p) => `${p.sx.toFixed(1)},${p.sy.toFixed(1)}`).join(' ');

  // Painter's depth sort: back-most (largest x+y) drawn first
  const sortedBlocks = [...params.blocks].sort(
    (a, b) => b.x + b.dx / 2 + b.y + b.dy / 2 - (a.x + a.dx / 2 + a.y + a.dy / 2)
  );

  const strokeInk = isDark ? '#f4f4f6' : '#0d0d10';
  const strokeMuted = isDark ? '#71717a' : '#71717a';
  const topFill = isDark ? '#27272c' : '#ffffff';
  const leftFill = isDark ? '#1c1c21' : '#e4e4e7';
  const rightFill = isDark ? '#141418' : '#d4d4d8';
  const baseFill = isDark ? '#111115' : '#f4f4f5';

  // Base plate corners
  const basePts = [
    proj(0, 0, 0),
    proj(params.baseX, 0, 0),
    proj(params.baseX, params.baseY, 0),
    proj(0, params.baseY, 0),
  ];

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 p-3 overflow-hidden h-full">
      {/* Left Control Panel */}
      <aside className="lg:col-span-4 rounded-[24px] glass-panel border p-5 flex flex-col justify-between overflow-y-auto custom-scrollbar space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] opacity-55 font-semibold">
                Module 1 • True Plan 45°/45°
              </div>
              <h2 className="text-lg font-semibold tracking-[-0.02em] mt-0.5">
                Planometric Builder
              </h2>
            </div>
            <button
              onClick={() => onChangeParams(Q2_DEFAULT_PLANOMETRIC)}
              className="px-3 py-1.5 rounded-full glass-pill text-[11px] font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Load Q2</span>
            </button>
          </div>

          {/* Ask a Planometric Question Box */}
          <form onSubmit={handleSolvePlanometric} className="p-3.5 rounded-2xl glass-card space-y-2.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 opacity-80" />
                Ask a Planometric Question
              </span>
              <span className="text-[10px] opacity-55">Auto-Draw</span>
            </div>
            <textarea
              rows={2}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="e.g. Base 120x60 mm with blocks X/Y/Z = 30/30/25 top-left, 40/20/15 bottom-right, 20/20/35 center..."
              className="w-full p-2.5 text-[11px] rounded-xl glass-input resize-none"
            />
            <div className="flex flex-wrap gap-1.5">
              {[
                {
                  label: 'Q2 Exact (100×50)',
                  q: 'Draw planometric view of 100x50 mm base with X/Y/Z = 25/25/25, 20/10/10, and 30/20/20.',
                },
                {
                  label: 'Custom 120×60 (3 Blocks)',
                  q: 'Planometric view of base 120x60 mm with blocks 30/30/25 top-left, 25/20/35 center, and 35/25/18 bottom-right.',
                },
              ].map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setQuestionText(s.q)}
                  className="px-2 py-0.5 rounded-full glass-pill text-[10px] opacity-80 hover:opacity-100 cursor-pointer"
                >
                  {s.label}
                </button>
              ))}
            </div>
            <button
              type="submit"
              disabled={!questionText.trim()}
              className="w-full py-2 rounded-full glass-pill-active text-[11px] font-semibold flex items-center justify-center gap-1.5 disabled:opacity-45 cursor-pointer"
            >
              <Wand2 className="w-3 h-3" />
              <span>Solve &amp; Draw Planometric</span>
            </button>
            {parsedFeedback && (
              <div className="pt-1.5 border-t border-current/10 text-[10px] opacity-70 space-y-0.5">
                {parsedFeedback.map((note, idx) => (
                  <div key={idx}>• {note}</div>
                ))}
              </div>
            )}
          </form>

          {/* Base Plate Dimensions */}
          <div className="p-3.5 rounded-2xl glass-card space-y-2.5">
            <div className="text-xs font-semibold">Base Plate (mm)</div>
            <div className="grid grid-cols-2 gap-2">
              <label className="space-y-1">
                <span className="text-[10px] opacity-60 block">Base X</span>
                <input
                  type="number"
                  min={20}
                  max={180}
                  value={params.baseX}
                  onChange={(e) =>
                    onChangeParams({ ...params, baseX: Math.max(20, Number(e.target.value) || 20) })
                  }
                  className="w-full px-2.5 py-1.5 text-xs rounded-xl glass-input tabular-nums"
                />
              </label>
              <label className="space-y-1">
                <span className="text-[10px] opacity-60 block">Base Y</span>
                <input
                  type="number"
                  min={20}
                  max={120}
                  value={params.baseY}
                  onChange={(e) =>
                    onChangeParams({ ...params, baseY: Math.max(20, Number(e.target.value) || 20) })
                  }
                  className="w-full px-2.5 py-1.5 text-xs rounded-xl glass-input tabular-nums"
                />
              </label>
            </div>
          </div>

          {/* Blocks List */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold">X / Y / Z Blocks ({params.blocks.length})</span>
              <button
                onClick={addBlock}
                className="px-2.5 py-1 rounded-full glass-pill text-[11px] font-medium flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add Block</span>
              </button>
            </div>

            {params.blocks.map((blk) => (
              <div key={blk.id} className="p-3 rounded-2xl glass-card space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={blk.label}
                    onChange={(e) => updateBlock(blk.id, 'label', e.target.value)}
                    className="text-xs font-semibold bg-transparent focus:outline-none w-full"
                  />
                  <button
                    onClick={() => removeBlock(blk.id)}
                    className="p-1 rounded-full opacity-50 hover:opacity-100 cursor-pointer"
                    title="Remove block"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-1.5 text-[10px]">
                  {[
                    { f: 'x' as const, t: 'Pos X' },
                    { f: 'y' as const, t: 'Pos Y' },
                    { f: 'dx' as const, t: 'X' },
                    { f: 'dy' as const, t: 'Y' },
                    { f: 'dz' as const, t: 'Z' },
                  ].map((col) => (
                    <label key={col.f} className="space-y-0.5">
                      <span className="opacity-55 block">{col.t}</span>
                      <input
                        type="number"
                        value={blk[col.f]}
                        onChange={(e) => updateBlock(blk.id, col.f, Number(e.target.value) || 0)}
                        className="w-full px-1.5 py-1 text-[11px] rounded-lg glass-input tabular-nums"
                      />
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <label className="flex items-center justify-between p-3 rounded-2xl glass-card text-xs cursor-pointer">
            <span className="font-medium">Show Hidden Back Edges</span>
            <input
              type="checkbox"
              checked={showHidden}
              onChange={(e) => setShowHidden(e.target.checked)}
              className="w-4 h-4 cursor-pointer"
            />
          </label>
        </div>

        <button
          onClick={handleExportSVG}
          className="w-full py-2.5 rounded-full glass-pill-active text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Planometric (SVG)</span>
        </button>
      </aside>

      {/* Right Dual Sheet: 2D Plan + 45°/45° Planometric View */}
      <section
        className={`lg:col-span-8 rounded-[24px] border overflow-hidden flex flex-col ${
          isDark
            ? 'bg-[#0b0b0e] border-white/15 text-[#f4f4f6]'
            : 'bg-[#fafafb] border-black/15 text-[#0d0d10]'
        }`}
      >
        <div className="px-5 py-3.5 border-b border-current/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-semibold">
            <Layers className="w-4 h-4 opacity-70" />
            <span>Planometric Projection (True Plan Rotated 45° + Vertical Z-Axis)</span>
          </div>
          <span className="text-[11px] opacity-55 tabular-nums">
            Base {params.baseX} × {params.baseY} mm
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
          <svg
            ref={svgRef}
            viewBox="0 0 720 460"
            className="w-full h-full max-h-[540px]"
            style={{ fontFamily: 'Plus Jakarta Sans, Inter, sans-serif' }}
          >
            <rect width="720" height="460" fill={isDark ? '#0b0b0e' : '#fafafb'} />

            {/* 45°/45° Base Plate */}
            <polygon
              points={ptsStr(basePts)}
              fill={baseFill}
              stroke={strokeInk}
              strokeWidth="1.8"
            />

            {/* Axis Reference Lines at Origin */}
            <line
              x1={proj(0, 0, 0).sx}
              y1={proj(0, 0, 0).sy}
              x2={proj(params.baseX + 20, 0, 0).sx}
              y2={proj(params.baseX + 20, 0, 0).sy}
              stroke={strokeMuted}
              strokeWidth="1"
              strokeDasharray="4 3"
            />
            <text
              x={proj(params.baseX + 24, 0, 0).sx}
              y={proj(params.baseX + 24, 0, 0).sy}
              fill={strokeMuted}
              fontSize="11"
              fontWeight="600"
            >
              X (45°)
            </text>

            <line
              x1={proj(0, 0, 0).sx}
              y1={proj(0, 0, 0).sy}
              x2={proj(0, params.baseY + 20, 0).sx}
              y2={proj(0, params.baseY + 20, 0).sy}
              stroke={strokeMuted}
              strokeWidth="1"
              strokeDasharray="4 3"
            />
            <text
              x={proj(0, params.baseY + 24, 0).sx - 28}
              y={proj(0, params.baseY + 24, 0).sy}
              fill={strokeMuted}
              fontSize="11"
              fontWeight="600"
            >
              Y (45°)
            </text>

            <line
              x1={proj(0, 0, 0).sx}
              y1={proj(0, 0, 0).sy}
              x2={proj(0, 0, 42).sx}
              y2={proj(0, 0, 42).sy}
              stroke={strokeMuted}
              strokeWidth="1"
              strokeDasharray="4 3"
            />
            <text
              x={proj(0, 0, 46).sx - 12}
              y={proj(0, 0, 46).sy}
              fill={strokeMuted}
              fontSize="11"
              fontWeight="600"
            >
              Z (90°)
            </text>

            {/* Render Sorted Blocks */}
            {sortedBlocks.map((b) => {
              const p000 = proj(b.x, b.y, 0);
              const p100 = proj(b.x + b.dx, b.y, 0);
              const p110 = proj(b.x + b.dx, b.y + b.dy, 0);
              const p010 = proj(b.x, b.y + b.dy, 0);

              const p001 = proj(b.x, b.y, b.dz);
              const p101 = proj(b.x + b.dx, b.y, b.dz);
              const p111 = proj(b.x + b.dx, b.y + b.dy, b.dz);
              const p011 = proj(b.x, b.y + b.dy, b.dz);

              const centerTop = proj(b.x + b.dx / 2, b.y + b.dy / 2, b.dz);

              return (
                <g key={b.id}>
                  {/* Hidden back vertical/base edges */}
                  {showHidden && (
                    <>
                      <line x1={p110.sx} y1={p110.sy} x2={p111.sx} y2={p111.sy} stroke={strokeMuted} strokeWidth="0.9" strokeDasharray="3 3" />
                      <line x1={p100.sx} y1={p100.sy} x2={p110.sx} y2={p110.sy} stroke={strokeMuted} strokeWidth="0.9" strokeDasharray="3 3" />
                      <line x1={p010.sx} y1={p010.sy} x2={p110.sx} y2={p110.sy} stroke={strokeMuted} strokeWidth="0.9" strokeDasharray="3 3" />
                    </>
                  )}
                  {/* Front-Left Face (y=0 side -> actually x=b.x face) */}
                  <polygon
                    points={ptsStr([p000, p010, p011, p001])}
                    fill={leftFill}
                    stroke={strokeInk}
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  {/* Front-Right Face (y=b.y face) */}
                  <polygon
                    points={ptsStr([p000, p100, p101, p001])}
                    fill={rightFill}
                    stroke={strokeInk}
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  {/* Top Face (z=b.dz) */}
                  <polygon
                    points={ptsStr([p001, p101, p111, p011])}
                    fill={topFill}
                    stroke={strokeInk}
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <text
                    x={centerTop.sx}
                    y={centerTop.sy + 3}
                    textAnchor="middle"
                    fill={strokeInk}
                    fontSize="9.5"
                    fontWeight="600"
                  >
                    {b.dx}/{b.dy}/{b.dz}
                  </text>
                </g>
              );
            })}

            {/* Inset 2D Reference Plan (Top-Left Corner) */}
            <g transform="translate(24, 24)">
              <rect
                x="0"
                y="0"
                width="172"
                height="112"
                rx="14"
                fill={isDark ? '#121216' : '#ffffff'}
                stroke={strokeMuted}
                strokeOpacity="0.3"
              />
              <text x="12" y="18" fill={strokeMuted} fontSize="9.5" fontWeight="600">
                2D PLAN REFERENCE
              </text>
              <g transform="translate(16, 28)">
                <rect
                  x="0"
                  y="0"
                  width="140"
                  height={(params.baseY / Math.max(1, params.baseX)) * 140}
                  fill="none"
                  stroke={strokeInk}
                  strokeWidth="1.2"
                />
                {params.blocks.map((b) => {
                  const s = 140 / Math.max(1, params.baseX);
                  const hTotal = params.baseY * s;
                  return (
                    <rect
                      key={b.id}
                      x={b.x * s}
                      y={hTotal - (b.y + b.dy) * s}
                      width={b.dx * s}
                      height={b.dy * s}
                      fill={isDark ? 'rgba(255,255,255,0.14)' : 'rgba(13,13,16,0.1)'}
                      stroke={strokeInk}
                      strokeWidth="1"
                    />
                  );
                })}
              </g>
            </g>
          </svg>
        </div>
      </section>
    </div>
  );
};
