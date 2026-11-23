import React, { useMemo, useRef, useState } from 'react';
import { Download, RotateCcw, AlertTriangle, CheckCircle2, Ruler, Wand2 } from 'lucide-react';
import { LineProblemParams, ThemeMode } from '../types';
import { Q1_DEFAULT_LINE } from '../utils/examBank';
import { parseLineQuestion } from '../utils/questionParser';

interface LineSolverStudioProps {
  params: LineProblemParams;
  onChangeParams: (next: LineProblemParams) => void;
  theme: ThemeMode;
  studentName?: string;
}

export const LineSolverStudio: React.FC<LineSolverStudioProps> = ({
  params,
  onChangeParams,
  theme,
  studentName,
}) => {
  const isDark = theme === 'blueprint';
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [questionText, setQuestionText] = useState('');
  const [parsedStatus, setParsedStatus] = useState<string | null>(null);

  const handleSolveLineQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    const result = parseLineQuestion(questionText);
    onChangeParams(result.params);
    setParsedStatus(result.notes.join(' • '));
  };

  const calc = useMemo(() => {
    const { trueLength: TL, distHP: zA, distVP: yA, thetaHP: thetaDeg, phiVP: phiDeg } = params;
    const isValid = thetaDeg + phiDeg <= 90;
    const theta = (thetaDeg * Math.PI) / 180;
    const phi = (phiDeg * Math.PI) / 180;

    const dz = TL * Math.sin(theta);
    const dy = TL * Math.sin(phi);
    const lenTV = TL * Math.cos(theta);
    const lenFV = TL * Math.cos(phi);

    const dxSq = Math.max(0, lenFV * lenFV - dz * dz);
    const dx = Math.sqrt(dxSq);

    const zB = zA + dz;
    const yB = yA + dy;

    const alphaDeg = dx > 0.001 ? (Math.atan2(dz, dx) * 180) / Math.PI : 90;
    const betaDeg = dx > 0.001 ? (Math.atan2(dy, dx) * 180) / Math.PI : 90;

    // Traces
    const hasHT = dz > 0.001;
    const tHT = hasHT ? -zA / dz : 0;
    const htX = tHT * dx;
    const htY = yA + tHT * dy;

    const hasVT = dy > 0.001;
    const tVT = hasVT ? -yA / dy : 0;
    const vtX = tVT * dx;
    const vtZ = zA + tVT * dz;

    return {
      isValid,
      dz,
      dy,
      dx,
      lenFV,
      lenTV,
      zB,
      yB,
      alphaDeg,
      betaDeg,
      hasHT,
      htX,
      htY,
      hasVT,
      vtX,
      vtZ,
    };
  }, [params]);

  const handleExportSVG = () => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgRef.current);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OrthoView3D_LineSolver_TL${params.trueLength}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // SVG Coordinate Mapping (Origin A_x at x=260, XY line at y=250, scale = 2.6 px/mm)
  const scale = 2.6;
  const originX = 270;
  const xyY = 250;

  const toSvgX = (mmX: number) => originX + mmX * scale;
  const toSvgZ = (mmZ: number) => xyY - mmZ * scale; // above HP goes UP
  const toSvgY = (mmY: number) => xyY + mmY * scale; // in front of VP goes DOWN

  const aPrime = { x: toSvgX(0), y: toSvgZ(params.distHP) };
  const aPlan = { x: toSvgX(0), y: toSvgY(params.distVP) };

  const b1Prime = { x: toSvgX(calc.lenTV), y: toSvgZ(calc.zB) };
  const b2Plan = { x: toSvgX(calc.lenFV), y: toSvgY(calc.yB) };

  const bPrime = { x: toSvgX(calc.dx), y: toSvgZ(calc.zB) };
  const bPlan = { x: toSvgX(calc.dx), y: toSvgY(calc.yB) };

  const htPt = { x: toSvgX(calc.htX), y: toSvgY(calc.htY) };
  const vtPt = { x: toSvgX(calc.vtX), y: toSvgZ(calc.vtZ) };

  const strokePrimary = isDark ? '#f4f4f6' : '#0d0d10';
  const strokeMuted = isDark ? '#71717a' : '#71717a';
  const strokeAccent = isDark ? '#a1a1aa' : '#3f3f46';

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 p-3 overflow-hidden h-full">
      {/* Left Control Panel */}
      <aside className="lg:col-span-4 rounded-[24px] glass-panel border p-5 flex flex-col justify-between overflow-y-auto custom-scrollbar space-y-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] opacity-55 font-semibold">
                Module 1 • Locus Method
              </div>
              <h2 className="text-lg font-semibold tracking-[-0.02em] mt-0.5">
                Straight Line &amp; Traces
              </h2>
            </div>
            <button
              onClick={() => onChangeParams(Q1_DEFAULT_LINE)}
              title="Reset to 24EST1004-C Q1"
              className="px-3 py-1.5 rounded-full glass-pill text-[11px] font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Load Q1</span>
            </button>
          </div>

          {!calc.isValid && (
            <div className="p-3 rounded-2xl border border-rose-500/40 bg-rose-500/10 text-rose-400 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Geometrically impossible: θ ({params.thetaHP}°) + φ ({params.phiVP}°) must be ≤ 90°.
              </span>
            </div>
          )}

          {/* Ask / Paste Line Question Box */}
          <form onSubmit={handleSolveLineQuestion} className="p-3.5 rounded-2xl glass-card space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 opacity-80" />
                Ask Line Question
              </span>
              <span className="text-[10px] opacity-55">Auto-Plot Locus</span>
            </div>
            <textarea
              rows={2}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="e.g. Line AB 75 mm long, end A 15 mm above HP and 25 mm in front of VP, inclined 35° to HP and 40° to VP..."
              className="w-full p-2.5 rounded-xl text-[11px] glass-input resize-none"
            />
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() =>
                  setQuestionText(
                    'A line AB 70 mm long has end A 15 mm above HP and 25 mm in front of VP, inclined at 35 degrees to HP and 40 degrees to VP.'
                  )
                }
                className="text-[10px] opacity-60 hover:opacity-100 underline cursor-pointer"
              >
                Try sample
              </button>
              <button
                type="submit"
                disabled={!questionText.trim()}
                className="px-3.5 py-1.5 rounded-full glass-pill-active text-[11px] font-semibold flex items-center gap-1.5 disabled:opacity-45 cursor-pointer"
              >
                <Wand2 className="w-3 h-3" />
                <span>Draw Projection</span>
              </button>
            </div>
            {parsedStatus && (
              <div className="text-[10px] opacity-75 pt-1.5 border-t border-current/10 leading-relaxed">
                {parsedStatus}
              </div>
            )}
          </form>

          {/* Numeric + Slider Controls */}
          <div className="space-y-3">
            {[
              { key: 'trueLength' as const, label: 'True Length (TL)', min: 20, max: 110, unit: 'mm' },
              { key: 'distHP' as const, label: 'End A above HP', min: 0, max: 50, unit: 'mm' },
              { key: 'distVP' as const, label: 'End A in front of VP', min: 0, max: 50, unit: 'mm' },
              { key: 'thetaHP' as const, label: 'Inclination to HP (θ)', min: 0, max: 80, unit: '°' },
              { key: 'phiVP' as const, label: 'Inclination to VP (φ)', min: 0, max: 80, unit: '°' },
            ].map((item) => (
              <div key={item.key} className="p-3.5 rounded-2xl glass-card space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium opacity-80">{item.label}</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={item.min}
                      max={item.max}
                      value={params[item.key]}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (!Number.isNaN(val)) {
                          onChangeParams({
                            ...params,
                            [item.key]: Math.max(item.min, Math.min(item.max, val)),
                          });
                        }
                      }}
                      className="w-16 px-2 py-0.5 text-right text-xs font-semibold rounded-lg glass-input tabular-nums"
                    />
                    <span className="text-[11px] opacity-55 w-5">{item.unit}</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={item.min}
                  max={item.max}
                  value={params[item.key]}
                  onChange={(e) =>
                    onChangeParams({ ...params, [item.key]: Number(e.target.value) })
                  }
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-current/15"
                />
              </div>
            ))}
          </div>

          {/* Calculated Engineering Results */}
          <div className="rounded-2xl bg-[#0a0a0c] text-white p-4 space-y-3 border border-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-white/80" />
                Computed Results
              </span>
              <span className="text-[10px] text-white/55">First-Angle</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5 text-xs tabular-nums">
              <div className="p-2.5 rounded-xl bg-white/[0.06]">
                <div className="text-[10px] text-white/55">Front View (a&apos;b&apos;)</div>
                <div className="font-semibold mt-0.5">{calc.lenFV.toFixed(2)} mm</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.06]">
                <div className="text-[10px] text-white/55">Top View (ab)</div>
                <div className="font-semibold mt-0.5">{calc.lenTV.toFixed(2)} mm</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.06]">
                <div className="text-[10px] text-white/55">Apparent Angles</div>
                <div className="font-semibold mt-0.5">
                  α {calc.alphaDeg.toFixed(1)}° • β {calc.betaDeg.toFixed(1)}°
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.06]">
                <div className="text-[10px] text-white/55">End Projector (ΔX)</div>
                <div className="font-semibold mt-0.5">{calc.dx.toFixed(2)} mm</div>
              </div>
            </div>
            <div className="pt-2 border-t border-white/10 text-[11px] space-y-1 text-white/75 tabular-nums">
              <div>
                <span className="text-white/45">HT: </span>
                {calc.hasHT
                  ? `${Math.abs(calc.htY).toFixed(1)} mm ${calc.htY >= 0 ? 'in front of VP' : 'behind VP'}`
                  : 'No HT (parallel to HP)'}
              </div>
              <div>
                <span className="text-white/45">VT: </span>
                {calc.hasVT
                  ? `${Math.abs(calc.vtZ).toFixed(1)} mm ${calc.vtZ >= 0 ? 'above HP' : 'below HP'}`
                  : 'No VT (parallel to VP)'}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleExportSVG}
          className="w-full py-2.5 rounded-full glass-pill-active text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Locus Sheet (SVG)</span>
        </button>
      </aside>

      {/* Right Interactive 2D Locus Drawing Sheet */}
      <section
        className={`lg:col-span-8 rounded-[24px] border overflow-hidden flex flex-col relative ${
          isDark
            ? 'bg-[#0b0b0e] border-white/15 text-[#f4f4f6]'
            : 'bg-[#fafafb] border-black/15 text-[#0d0d10]'
        }`}
      >
        <div className="px-5 py-3.5 border-b border-current/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-semibold">
            <Ruler className="w-4 h-4 opacity-70" />
            <span>Orthographic Projection of Straight Line AB — Rotation / Locus Method</span>
          </div>
          <span className="text-[11px] opacity-55">
            {studentName ? `${studentName} • ` : ''}ISO 128 First-Angle
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
          <svg
            ref={svgRef}
            viewBox="0 0 760 500"
            className="w-full h-full max-h-[560px]"
            style={{ fontFamily: 'Plus Jakarta Sans, Inter, sans-serif' }}
          >
            {/* Subtle Dot Grid Background */}
            <defs>
              <pattern id="lineGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.8" fill={strokeMuted} opacity="0.25" />
              </pattern>
            </defs>
            <rect width="760" height="500" fill={isDark ? '#0b0b0e' : '#fafafb'} />
            <rect width="760" height="500" fill="url(#lineGrid)" />

            {/* XY Reference Line */}
            <line x1="40" y1={xyY} x2="720" y2={xyY} stroke={strokePrimary} strokeWidth="1.6" />
            <text x="44" y={xyY - 8} fill={strokePrimary} fontSize="12" fontWeight="600">
              X
            </text>
            <text x="706" y={xyY - 8} fill={strokePrimary} fontSize="12" fontWeight="600">
              Y
            </text>
            <text x="64" y={xyY - 12} fill={strokeMuted} fontSize="10">
              VP (Front View)
            </text>
            <text x="64" y={xyY + 18} fill={strokeMuted} fontSize="10">
              HP (Top View)
            </text>

            {/* End A Projector */}
            <line
              x1={aPrime.x}
              y1={Math.min(aPrime.y, xyY)}
              x2={aPlan.x}
              y2={Math.max(aPlan.y, xyY)}
              stroke={strokeMuted}
              strokeWidth="0.9"
              strokeDasharray="4 3"
            />

            {calc.isValid && (
              <>
                {/* Locus of b' and b */}
                <line
                  x1="120"
                  y1={bPrime.y}
                  x2="680"
                  y2={bPrime.y}
                  stroke={strokeMuted}
                  strokeWidth="0.9"
                  strokeDasharray="8 3 2 3"
                />
                <text x="580" y={bPrime.y - 6} fill={strokeMuted} fontSize="10">
                  Locus of b&apos;
                </text>

                <line
                  x1="120"
                  y1={bPlan.y}
                  x2="680"
                  y2={bPlan.y}
                  stroke={strokeMuted}
                  strokeWidth="0.9"
                  strokeDasharray="8 3 2 3"
                />
                <text x="580" y={bPlan.y + 14} fill={strokeMuted} fontSize="10">
                  Locus of b
                </text>

                {/* True Length Construction Lines (Thin) */}
                <line
                  x1={aPrime.x}
                  y1={aPrime.y}
                  x2={b1Prime.x}
                  y2={b1Prime.y}
                  stroke={strokeAccent}
                  strokeWidth="1.2"
                  strokeDasharray="5 3"
                />
                <text x={b1Prime.x + 6} y={b1Prime.y - 4} fill={strokeAccent} fontSize="10">
                  b1&apos; (TL={params.trueLength}, θ={params.thetaHP}°)
                </text>

                <line
                  x1={aPlan.x}
                  y1={aPlan.y}
                  x2={b2Plan.x}
                  y2={b2Plan.y}
                  stroke={strokeAccent}
                  strokeWidth="1.2"
                  strokeDasharray="5 3"
                />
                <text x={b2Plan.x + 6} y={b2Plan.y + 12} fill={strokeAccent} fontSize="10">
                  b2 (TL={params.trueLength}, φ={params.phiVP}°)
                </text>

                {/* End B Projector */}
                <line
                  x1={bPrime.x}
                  y1={bPrime.y}
                  x2={bPlan.x}
                  y2={bPlan.y}
                  stroke={strokeMuted}
                  strokeWidth="0.9"
                  strokeDasharray="4 3"
                />

                {/* Trace Extension Lines */}
                {calc.hasVT && (
                  <>
                    <line
                      x1={aPlan.x}
                      y1={aPlan.y}
                      x2={vtPt.x}
                      y2={xyY}
                      stroke={strokeMuted}
                      strokeWidth="0.9"
                      strokeDasharray="3 3"
                    />
                    <line
                      x1={vtPt.x}
                      y1={xyY}
                      x2={vtPt.x}
                      y2={vtPt.y}
                      stroke={strokeMuted}
                      strokeWidth="0.9"
                      strokeDasharray="3 3"
                    />
                    <line
                      x1={aPrime.x}
                      y1={aPrime.y}
                      x2={vtPt.x}
                      y2={vtPt.y}
                      stroke={strokeMuted}
                      strokeWidth="0.9"
                      strokeDasharray="3 3"
                    />
                    <circle cx={vtPt.x} cy={vtPt.y} r="3.5" fill={strokePrimary} />
                    <text x={vtPt.x - 24} y={vtPt.y + 14} fill={strokePrimary} fontSize="10" fontWeight="600">
                      VT
                    </text>
                  </>
                )}

                {calc.hasHT && (
                  <>
                    <line
                      x1={aPrime.x}
                      y1={aPrime.y}
                      x2={htPt.x}
                      y2={xyY}
                      stroke={strokeMuted}
                      strokeWidth="0.9"
                      strokeDasharray="3 3"
                    />
                    <line
                      x1={htPt.x}
                      y1={xyY}
                      x2={htPt.x}
                      y2={htPt.y}
                      stroke={strokeMuted}
                      strokeWidth="0.9"
                      strokeDasharray="3 3"
                    />
                    <circle cx={htPt.x} cy={htPt.y} r="3.5" fill={strokePrimary} />
                    <text x={htPt.x - 24} y={htPt.y + 14} fill={strokePrimary} fontSize="10" fontWeight="600">
                      HT
                    </text>
                  </>
                )}

                {/* Final Dark Front View a'b' */}
                <line
                  x1={aPrime.x}
                  y1={aPrime.y}
                  x2={bPrime.x}
                  y2={bPrime.y}
                  stroke={strokePrimary}
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
                {/* Final Dark Top View ab */}
                <line
                  x1={aPlan.x}
                  y1={aPlan.y}
                  x2={bPlan.x}
                  y2={bPlan.y}
                  stroke={strokePrimary}
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />

                {/* Point Markers & Labels */}
                <circle cx={aPrime.x} cy={aPrime.y} r="3.2" fill={strokePrimary} />
                <text x={aPrime.x - 16} y={aPrime.y - 6} fill={strokePrimary} fontSize="11" fontWeight="600">
                  a&apos;
                </text>

                <circle cx={bPrime.x} cy={bPrime.y} r="3.2" fill={strokePrimary} />
                <text x={bPrime.x + 6} y={bPrime.y - 6} fill={strokePrimary} fontSize="11" fontWeight="600">
                  b&apos; ({calc.lenFV.toFixed(1)}mm)
                </text>

                <circle cx={aPlan.x} cy={aPlan.y} r="3.2" fill={strokePrimary} />
                <text x={aPlan.x - 14} y={aPlan.y + 14} fill={strokePrimary} fontSize="11" fontWeight="600">
                  a
                </text>

                <circle cx={bPlan.x} cy={bPlan.y} r="3.2" fill={strokePrimary} />
                <text x={bPlan.x + 6} y={bPlan.y + 14} fill={strokePrimary} fontSize="11" fontWeight="600">
                  b ({calc.lenTV.toFixed(1)}mm)
                </text>
              </>
            )}
          </svg>
        </div>
      </section>
    </div>
  );
};
