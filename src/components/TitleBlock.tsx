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
      className={`border text-[10px] select-none rounded-2xl p-3 transition-colors ${
        isDark
          ? 'bg-[#121216]/95 border-white/15 text-zinc-200'
          : 'bg-white/95 border-black/15 text-zinc-900 shadow-sm'
      }`}
    >
      <div className="grid grid-cols-12 gap-2.5">
        <div className="col-span-8 flex flex-col justify-between border-r pr-2.5 border-current/10">
          <div>
            <div className="flex items-center justify-between border-b pb-1.5 border-current/10">
              <span className="font-semibold tracking-[0.06em] text-[10px] uppercase">
                OrthoView3D • Engineering Graphics
              </span>
              <span
                className={`text-[8px] px-2 py-0.5 rounded-full font-semibold ${
                  isDark ? 'bg-white/10 text-zinc-200' : 'bg-black/5 text-zinc-700'
                }`}
              >
                ISO 128 / BIS SP:46
              </span>
            </div>

            <div className="mt-1.5 flex items-baseline justify-between gap-2">
              <div className="truncate">
                <span className="text-[9px] opacity-55">PART: </span>
                <span className="text-xs font-semibold uppercase tracking-[-0.01em]">
                  {solidName}
                </span>
              </div>
              <div className="text-[9px] opacity-65 shrink-0 tabular-nums">
                DRG: <span className="font-semibold opacity-100">OV3D-101</span>
              </div>
            </div>

            <div className="text-[9px] opacity-65 mt-0.5 tabular-nums">
              Dimensions:{' '}
              <span className="font-semibold opacity-100">
                {dimensions.length} × {dimensions.width} × {dimensions.height} mm
              </span>{' '}
              • Scale: <span className="font-semibold opacity-100">1:1</span>
            </div>
          </div>

          <div className="mt-1.5 pt-1.5 border-t border-current/10 grid grid-cols-2 gap-1 text-[8px] opacity-60">
            <div>
              <span>TOL: </span>
              <span className="font-semibold opacity-100">±0.1 mm / ±0.5°</span>
            </div>
            <div>
              <span>FINISH: </span>
              <span className="font-semibold opacity-100">Ra 1.6 μm (N7)</span>
            </div>
          </div>
        </div>

        <div className="col-span-4 flex flex-col items-center justify-center pl-1">
          <div className="text-[8px] font-semibold tracking-[0.14em] uppercase mb-1 opacity-55">
            First-Angle Symbol
          </div>

          <div
            className={`flex items-center px-2 py-1 rounded-xl border ${
              isDark ? 'bg-white/[0.04] border-white/10' : 'bg-black/[0.03] border-black/10'
            }`}
          >
            <svg
              width="76"
              height="34"
              viewBox="0 0 80 36"
              className={isDark ? 'stroke-white' : 'stroke-[#0d0d10]'}
              fill="none"
              strokeWidth="1.5"
            >
              <line
                x1="2"
                y1="18"
                x2="78"
                y2="18"
                stroke="currentColor"
                strokeOpacity="0.35"
                strokeWidth="1"
                strokeDasharray="5 2 1 2"
              />
              <line
                x1="62"
                y1="3"
                x2="62"
                y2="33"
                stroke="currentColor"
                strokeOpacity="0.35"
                strokeWidth="1"
                strokeDasharray="5 2 1 2"
              />
              <polygon
                points="10,12 30,6 30,30 10,24"
                fill="currentColor"
                fillOpacity="0.06"
              />
              <circle cx="62" cy="18" r="12" />
              <circle cx="62" cy="18" r="6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
