import React, { useState } from 'react';
import { Pencil, Check } from 'lucide-react';
import { SolidDimensions, ThemeMode, TitleBlockMeta } from '../types';

interface TitleBlockProps {
  solidName: string;
  dimensions: SolidDimensions;
  theme: ThemeMode;
  meta: TitleBlockMeta;
  onUpdateMeta: (next: TitleBlockMeta) => void;
}

export const TitleBlock: React.FC<TitleBlockProps> = ({
  solidName,
  dimensions,
  theme,
  meta,
  onUpdateMeta,
}) => {
  const isDark = theme === 'blueprint';
  const [editing, setEditing] = useState(false);

  const cellBorder = isDark ? 'border-white/20' : 'border-black/75';
  const labelCls = 'text-[8px] font-semibold uppercase tracking-wide opacity-65 mr-1';

  return (
    <div className="w-full space-y-1 select-none">
      <div className="flex items-center justify-between px-0.5 text-[9px]">
        <span className="opacity-65 font-medium">
          All dimensions are in mm ({dimensions.length}×{dimensions.width}×{dimensions.height})
        </span>
        <button
          type="button"
          onClick={() => setEditing((v) => !v)}
          className="flex items-center gap-1 opacity-65 hover:opacity-100 cursor-pointer font-medium"
          title="Edit College Lab Title Block"
        >
          {editing ? <Check className="w-3 h-3" /> : <Pencil className="w-2.5 h-2.5" />}
          <span>{editing ? 'Done' : 'Edit Block'}</span>
        </button>
      </div>

      {/* Authentic AutoCAD College Lab Title Block Table */}
      <div
        className={`border text-[9px] leading-tight overflow-hidden ${
          isDark
            ? 'bg-[#0e0e12] border-white/25 text-zinc-100'
            : 'bg-white border-black/80 text-black'
        }`}
      >
        {/* Row 1: NAME | TITLE */}
        <div className={`grid grid-cols-12 border-b ${cellBorder}`}>
          <div className={`col-span-5 px-2 py-1.5 border-r ${cellBorder} flex items-center gap-1 min-w-0`}>
            <span className={labelCls}>NAME:</span>
            {editing ? (
              <input
                value={meta.name}
                onChange={(e) => onUpdateMeta({ ...meta, name: e.target.value })}
                className="w-full bg-transparent border-b border-current/30 text-[9px] font-semibold focus:outline-none"
              />
            ) : (
              <span className="font-semibold truncate">{meta.name || '—'}</span>
            )}
          </div>
          <div className="col-span-7 px-2 py-1.5 flex items-center gap-1 min-w-0">
            <span className={labelCls}>TITLE:</span>
            <span className="font-semibold uppercase truncate">{solidName}</span>
          </div>
        </div>

        {/* Lower Section: Left 2 cols (CLASS/ROLL/DATE & DWG/GRADE/VALUED) + Right col (SCALE + Symbol) */}
        <div className="grid grid-cols-12">
          <div className={`col-span-8 grid grid-cols-2 border-r ${cellBorder}`}>
            {/* CLASS */}
            <div className={`px-2 py-1 border-r border-b ${cellBorder} flex items-center gap-1`}>
              <span className={labelCls}>CLASS:</span>
              {editing ? (
                <input
                  value={meta.className}
                  onChange={(e) => onUpdateMeta({ ...meta, className: e.target.value })}
                  className="w-full bg-transparent border-b border-current/30 text-[9px] font-semibold focus:outline-none"
                />
              ) : (
                <span className="font-semibold truncate">{meta.className}</span>
              )}
            </div>
            {/* DWG NO */}
            <div className={`px-2 py-1 border-b ${cellBorder} flex items-center gap-1`}>
              <span className={labelCls}>DWG. NO.:</span>
              {editing ? (
                <input
                  value={meta.dwgNo}
                  onChange={(e) => onUpdateMeta({ ...meta, dwgNo: e.target.value })}
                  className="w-full bg-transparent border-b border-current/30 text-[9px] font-semibold focus:outline-none"
                />
              ) : (
                <span className="font-semibold tabular-nums truncate">{meta.dwgNo}</span>
              )}
            </div>
            {/* ROLL NO */}
            <div className={`px-2 py-1 border-r border-b ${cellBorder} flex items-center gap-1`}>
              <span className={labelCls}>ROLL NO.:</span>
              {editing ? (
                <input
                  value={meta.rollNo}
                  onChange={(e) => onUpdateMeta({ ...meta, rollNo: e.target.value })}
                  className="w-full bg-transparent border-b border-current/30 text-[9px] font-semibold focus:outline-none"
                />
              ) : (
                <span className="font-semibold tabular-nums truncate">{meta.rollNo}</span>
              )}
            </div>
            {/* GRADE */}
            <div className={`px-2 py-1 border-b ${cellBorder} flex items-center gap-1`}>
              <span className={labelCls}>GRADE:</span>
              <span className="font-semibold">{meta.grade}</span>
            </div>
            {/* DATE */}
            <div className={`px-2 py-1 border-r ${cellBorder} flex items-center gap-1`}>
              <span className={labelCls}>DATE:</span>
              <span className="font-semibold tabular-nums truncate">{meta.date}</span>
            </div>
            {/* VALUED BY */}
            <div className="px-2 py-1 flex items-center gap-1">
              <span className={labelCls}>VALUED BY:</span>
              <span className="font-semibold truncate">{meta.valuedBy}</span>
            </div>
          </div>

          {/* Right Cell: SCALE + ISO First-Angle Symbol */}
          <div className="col-span-4 flex flex-col justify-between p-1.5">
            <div className="text-[8px] font-semibold flex items-center justify-between">
              <span className="opacity-65">SCALE:</span>
              <span className="tabular-nums">{meta.scale}</span>
            </div>
            <div className="flex items-center justify-center pt-0.5">
              <svg
                width="74"
                height="28"
                viewBox="0 0 80 34"
                className={isDark ? 'stroke-white' : 'stroke-black'}
                fill="none"
                strokeWidth="1.4"
              >
                <line
                  x1="2"
                  y1="17"
                  x2="78"
                  y2="17"
                  stroke="currentColor"
                  strokeOpacity="0.4"
                  strokeWidth="0.9"
                  strokeDasharray="5 2 1 2"
                />
                <line
                  x1="62"
                  y1="3"
                  x2="62"
                  y2="31"
                  stroke="currentColor"
                  strokeOpacity="0.4"
                  strokeWidth="0.9"
                  strokeDasharray="5 2 1 2"
                />
                <polygon points="10,11 32,6 32,28 10,23" />
                <circle cx="62" cy="17" r="11" />
                <circle cx="62" cy="17" r="5.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
