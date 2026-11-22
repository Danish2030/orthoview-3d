import React from 'react';
import { SolidDimensions, ThemeMode } from '../types';

interface TitleBlockProps {
  solidName: string;
  dimensions: SolidDimensions;
  theme: ThemeMode;
}

export const TitleBlock: React.FC<TitleBlockProps> = ({ solidName, dimensions, theme }) => {
  const isDark = theme === 'blueprint';

  return (
    <div
      className={`border text-[10px] font-mono select-none rounded p-2.5 transition-colors ${
        isDark
          ? 'bg-[#0f172a]/95 border-sky-800/80 text-slate-300 shadow-xl'
          : 'bg-white border-slate-400 text-slate-800 shadow-md'
      }`}
    >
      <div className="grid grid-cols-12 gap-2">
        {/* Left Section: Institutional Header & Drawing Specs */}
        <div className="col-span-8 flex flex-col justify-between border-r pr-2 border-slate-700/60">
          <div>
            <div className="flex items-center justify-between border-b pb-1 border-slate-700/40">
              <span
                className={`font-bold tracking-wider text-[11px] uppercase ${
                  isDark ? 'text-sky-400' : 'text-blue-700'
                }`}
              >
                DEPT. OF MECHANICAL ENGINEERING • CAD LAB
              </span>
              <span
                className={`text-[8px] px-1 py-0.2 rounded border font-bold ${
                  isDark
                    ? 'border-sky-500/40 text-sky-300 bg-sky-950/60'
                    : 'border-slate-300 text-slate-600 bg-slate-100'
                }`}
              >
                ISO 128 / BIS SP:46:2003
              </span>
            </div>

            <div className="mt-1 flex items-baseline justify-between">
              <div>
                <span className="text-[9px] text-slate-400">PART: </span>
                <span className="text-xs font-bold text-slate-100 uppercase">
                  {solidName}
                </span>
              </div>
              <div className="text-[9px] text-slate-400">
                DRG NO: <span className="font-bold text-sky-400">OV3D-EG-101</span>
              </div>
            </div>

            <div className="text-[9px] text-slate-400 mt-0.5">
              Dimensions: <span className="text-sky-300 font-bold">{dimensions.length} × {dimensions.width} × {dimensions.height} mm</span> • Scale: <span className="font-bold text-amber-400">1:1</span>
            </div>
          </div>

          {/* Technical Engineering Specifications Box */}
          <div className="mt-1.5 pt-1 border-t border-slate-700/40 grid grid-cols-2 gap-1 text-[8px] text-slate-400">
            <div>
              <span>TOLERANCES: </span>
              <span className="text-slate-300 font-semibold">LINEAR ±0.1 mm, ANGULAR ±0.5°</span>
            </div>
            <div>
              <span>SURFACE FINISH: </span>
              <span className="text-slate-300 font-semibold">Ra 1.6 μm (N7 MACHINED)</span>
            </div>
          </div>
        </div>

        {/* Right Section: Official ISO First-Angle Projection Symbol */}
        <div className="col-span-4 flex flex-col items-center justify-center pl-1">
          <div className="text-[8px] font-bold tracking-wider uppercase mb-0.5 text-slate-400">
            PROJECTION METHOD
          </div>

          {/* Authentic First-Angle Symbol */}
          <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-black/30 border border-slate-800">
            <svg
              width="80"
              height="36"
              viewBox="0 0 80 36"
              className={isDark ? 'stroke-sky-400' : 'stroke-slate-900'}
              fill="none"
              strokeWidth="1.5"
            >
              {/* Horizontal Center Line (dash-dot) */}
              <line
                x1="2"
                y1="18"
                x2="78"
                y2="18"
                stroke={isDark ? '#64748b' : '#94a3b8'}
                strokeWidth="1"
                strokeDasharray="5 2 1 2"
              />

              {/* Vertical Center Line for Concentric Circles */}
              <line
                x1="62"
                y1="3"
                x2="62"
                y2="33"
                stroke={isDark ? '#64748b' : '#94a3b8'}
                strokeWidth="1"
                strokeDasharray="5 2 1 2"
              />

              {/* Truncated Cone Trapezoid (small end left, big end right) */}
              <polygon
                points="10,12 30,6 30,30 10,24"
                fill={isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(15, 23, 42, 0.05)'}
              />

              {/* Outer Circle (matching larger diameter = 24px) */}
              <circle cx="62" cy="18" r="12" />

              {/* Inner Circle (matching smaller diameter = 12px) */}
              <circle cx="62" cy="18" r="6" />
            </svg>
          </div>

          <div
            className={`text-[8px] font-bold tracking-widest mt-1 uppercase ${
              isDark ? 'text-amber-400' : 'text-amber-700'
            }`}
          >
            FIRST ANGLE PROJECTION
          </div>
        </div>
      </div>
    </div>
  );
};
