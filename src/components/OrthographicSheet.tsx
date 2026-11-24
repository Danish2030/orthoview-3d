import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { ViewCanvas2D } from './ViewCanvas2D';
import { TitleBlock } from './TitleBlock';
import { DisplayOptions, SolidDimensions, SolidRotation, ThemeMode, TitleBlockMeta } from '../types';

interface OrthographicSheetProps {
  geometry: THREE.BufferGeometry;
  dimensions: SolidDimensions;
  rotation: SolidRotation;
  theme: ThemeMode;
  displayOptions: DisplayOptions;
  solidName: string;
  titleBlockMeta: TitleBlockMeta;
  onUpdateTitleBlockMeta: (next: TitleBlockMeta) => void;
  onCanvasesReady?: (canvases: {
    front: HTMLCanvasElement | null;
    top: HTMLCanvasElement | null;
    leftSide: HTMLCanvasElement | null;
    isometric: HTMLCanvasElement | null;
  }) => void;
}

export const OrthographicSheet: React.FC<OrthographicSheetProps> = ({
  geometry,
  dimensions,
  rotation,
  theme,
  displayOptions,
  solidName,
  titleBlockMeta,
  onUpdateTitleBlockMeta,
  onCanvasesReady,
}) => {
  const isDark = theme === 'blueprint';
  const [q4Mode, setQ4Mode] = useState<'isometric' | 'miter'>('isometric');
  const frontCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const topCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const sideCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isoCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleCanvasReady = (
    type: 'front' | 'top' | 'leftSide' | 'rightSide' | 'isometric',
    canvas: HTMLCanvasElement
  ) => {
    if (type === 'front') frontCanvasRef.current = canvas;
    if (type === 'top') topCanvasRef.current = canvas;
    if (type === 'leftSide' || type === 'rightSide') sideCanvasRef.current = canvas;
    if (type === 'isometric') isoCanvasRef.current = canvas;

    if (onCanvasesReady) {
      onCanvasesReady({
        front: frontCanvasRef.current,
        top: topCanvasRef.current,
        leftSide: sideCanvasRef.current,
        isometric: isoCanvasRef.current,
      });
    }
  };

  return (
    <div
      id="orthographic-sheet-container"
      className={`relative w-full h-full p-3 flex flex-col select-none transition-colors duration-200 ${
        isDark ? 'bg-transparent' : 'bg-transparent'
      }`}
    >
      {/* Outer ISO A3 Technical Drawing Sheet Border with Zone Coordinates */}
      <div
        className={`relative flex-1 rounded-[24px] border overflow-hidden flex flex-col shadow-xl transition-colors duration-200 ${
          isDark
            ? 'bg-[#0b0b0e] border-white/15'
            : 'bg-[#fafafb] border-black/15'
        }`}
      >
        {/* ISO Standard Zone Coordinate Bar (Top: 1 - 8) */}
        <div
          className={`h-5 border-b grid grid-cols-8 text-[9px] font-bold items-center text-center ${
            isDark
              ? 'bg-white/[0.03] border-white/10 text-zinc-500'
              : 'bg-black/[0.03] border-black/10 text-zinc-500'
          }`}
        >
          {['1', '2', '3', '4', '5', '6', '7', '8'].map((zone) => (
            <div key={zone} className="border-r border-current/10 last:border-r-0">
              {zone}
            </div>
          ))}
        </div>

        {/* Inner Sheet Area with Left/Right Zone Coordinate Margins */}
        <div className="relative flex-1 flex overflow-hidden">
          {/* Left Zone Coordinates (A - D) */}
          <div
            className={`w-5 border-r flex flex-col justify-around text-[9px] font-bold items-center text-center ${
              isDark
                ? 'bg-white/[0.03] border-white/10 text-zinc-500'
                : 'bg-black/[0.03] border-black/10 text-zinc-500'
            }`}
          >
            {['A', 'B', 'C', 'D'].map((letter) => (
              <span key={letter}>{letter}</span>
            ))}
          </div>

          {/* Main 2x2 Orthographic Quadrant Drawing Workspace */}
          <div className="relative flex-1 grid grid-cols-2 grid-rows-2">
            {/* Quadrant 1 (Top-Left): FRONT VIEW (Elevation on VP) */}
            <div className="relative border-r border-b border-dashed border-current/15 overflow-hidden">
              <ViewCanvas2D
                viewType="front"
                geometry={geometry}
                dimensions={dimensions}
                rotation={rotation}
                theme={theme}
                showHiddenLines={displayOptions.showHiddenLines}
                showDimensions={displayOptions.showDimensions}
                showCenterLines={displayOptions.showCenterLines}
                label="FRONT VIEW (FV)"
                sublabel="ELEVATION"
                planeName="V.P."
                quadrant="Quadrant 1"
                dimensionsSummary={`L: ${dimensions.length}mm × H: ${dimensions.height}mm`}
                onCanvasReady={handleCanvasReady}
              />
            </div>

            {/* Quadrant 2 (Top-Right): LEFT-HAND SIDE VIEW (on RPP) */}
            <div className="relative border-b border-dashed border-current/15 overflow-hidden">
              <ViewCanvas2D
                viewType={displayOptions.sideViewMode === 'right' ? 'rightSide' : 'leftSide'}
                geometry={geometry}
                dimensions={dimensions}
                rotation={rotation}
                theme={theme}
                showHiddenLines={displayOptions.showHiddenLines}
                showDimensions={displayOptions.showDimensions}
                showCenterLines={displayOptions.showCenterLines}
                label={displayOptions.sideViewMode === 'right' ? 'RIGHT SIDE VIEW (RHSV)' : 'LEFT SIDE VIEW (LHSV)'}
                sublabel="PROFILE VIEW"
                planeName={displayOptions.sideViewMode === 'right' ? 'L.P.P.' : 'R.P.P.'}
                quadrant="Quadrant 2"
                dimensionsSummary={`W: ${dimensions.width}mm × H: ${dimensions.height}mm`}
                onCanvasReady={handleCanvasReady}
              />
            </div>

            {/* Quadrant 3 (Bottom-Left): TOP VIEW (Plan on HP) */}
            <div className="relative border-r border-dashed border-current/15 overflow-hidden">
              <ViewCanvas2D
                viewType="top"
                geometry={geometry}
                dimensions={dimensions}
                rotation={rotation}
                theme={theme}
                showHiddenLines={displayOptions.showHiddenLines}
                showDimensions={displayOptions.showDimensions}
                showCenterLines={displayOptions.showCenterLines}
                label="TOP VIEW (TV)"
                sublabel="PLAN"
                planeName="H.P."
                quadrant="Quadrant 3"
                dimensionsSummary={`L: ${dimensions.length}mm × W: ${dimensions.width}mm`}
                onCanvasReady={handleCanvasReady}
              />
            </div>

            {/* Quadrant 4 (Bottom-Right): AutoCAD Isometric View + College Lab Title Block */}
            <div
              className={`relative p-2.5 flex flex-col justify-between overflow-hidden ${
                isDark ? 'bg-[#0b0b0e]' : 'bg-[#fafafb]'
              }`}
            >
              {/* Toggle pill for Isometric vs Miter */}
              <div className="absolute top-2 right-2.5 z-20 flex items-center gap-1 p-0.5 rounded-full glass-pill text-[9px] font-semibold">
                <button
                  type="button"
                  onClick={() => setQ4Mode('isometric')}
                  className={`px-2 py-0.5 rounded-full cursor-pointer ${
                    q4Mode === 'isometric' ? 'glass-pill-active' : 'opacity-60'
                  }`}
                >
                  Isometric
                </button>
                <button
                  type="button"
                  onClick={() => setQ4Mode('miter')}
                  className={`px-2 py-0.5 rounded-full cursor-pointer ${
                    q4Mode === 'miter' ? 'glass-pill-active' : 'opacity-60'
                  }`}
                >
                  45° Miter
                </button>
              </div>

              <div className="relative flex-1 min-h-0 overflow-hidden">
                {q4Mode === 'isometric' ? (
                  <ViewCanvas2D
                    viewType="isometric"
                    geometry={geometry}
                    dimensions={dimensions}
                    rotation={rotation}
                    theme={theme}
                    showHiddenLines={displayOptions.showHiddenLines}
                    showDimensions={false}
                    showCenterLines={false}
                    label="ISOMETRIC VIEW"
                    sublabel="3D PICTORIAL"
                    planeName="ISO"
                    quadrant=""
                    dimensionsSummary={`${dimensions.length}×${dimensions.width}×${dimensions.height} mm`}
                    onCanvasReady={handleCanvasReady}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-2">
                    <svg className="w-full h-full max-h-[140px]" viewBox="0 0 220 120" preserveAspectRatio="xMidYMid meet">
                      {displayOptions.showMiterLine && (
                        <g>
                          <line
                            x1="10"
                            y1="10"
                            x2="160"
                            y2="110"
                            stroke={isDark ? '#a1a1aa' : '#3f3f46'}
                            strokeWidth="1.5"
                            strokeDasharray="4 3"
                          />
                          <text
                            x="95"
                            y="62"
                            fill={isDark ? '#a1a1aa' : '#3f3f46'}
                            fontSize="9"
                            fontWeight="bold"
                          >
                            45° MITER LINE
                          </text>
                        </g>
                      )}
                    </svg>
                  </div>
                )}
              </div>

              {/* College Lab Title Block in bottom right */}
              <div className="w-full mt-1.5 z-10">
                <TitleBlock
                  solidName={solidName}
                  dimensions={dimensions}
                  theme={theme}
                  meta={titleBlockMeta}
                  onUpdateMeta={onUpdateTitleBlockMeta}
                />
              </div>
            </div>

            {/* SVG Overlay for Real-time Alignment Projector Lines across Quadrants */}
            {displayOptions.showProjectors && (
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Vertical Projectors: Front View to Top View */}
                <line
                  x1="28%"
                  y1="18%"
                  x2="28%"
                  y2="82%"
                  stroke={isDark ? '#a1a1aa' : '#52525b'}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity={isDark ? 0.35 : 0.45}
                />
                <line
                  x1="38%"
                  y1="18%"
                  x2="38%"
                  y2="82%"
                  stroke={isDark ? '#a1a1aa' : '#52525b'}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity={isDark ? 0.35 : 0.45}
                />

                {/* Horizontal Projectors: Front View to LHSV */}
                <line
                  x1="15%"
                  y1="22%"
                  x2="85%"
                  y2="22%"
                  stroke={isDark ? '#a1a1aa' : '#52525b'}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity={isDark ? 0.35 : 0.45}
                />
                <line
                  x1="15%"
                  y1="36%"
                  x2="85%"
                  y2="36%"
                  stroke={isDark ? '#a1a1aa' : '#52525b'}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity={isDark ? 0.35 : 0.45}
                />
              </svg>
            )}

            {/* Crisp Horizontal Reference Line X — Y */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none z-30 flex items-center">
              <div
                className={`absolute left-2 -top-6 px-1.5 py-0.5 rounded font-bold text-xs ${
                  isDark ? 'bg-white text-black' : 'bg-[#0d0d10] text-white'
                }`}
              >
                X
              </div>

              <div
                className={`w-full h-[2px] ${
                  isDark ? 'bg-white/60' : 'bg-black/70'
                }`}
              />

              <div
                className={`absolute right-2 -top-6 px-1.5 py-0.5 rounded font-bold text-xs ${
                  isDark ? 'bg-white text-black' : 'bg-[#0d0d10] text-white'
                }`}
              >
                Y
              </div>
            </div>

            {/* Crisp Vertical Reference Line X1 — Y1 */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-30 flex justify-center">
              <div
                className={`absolute top-2 -left-8 px-1.5 py-0.5 rounded font-bold text-xs ${
                  isDark ? 'bg-white text-black' : 'bg-[#0d0d10] text-white'
                }`}
              >
                X₁
              </div>

              <div
                className={`h-full w-[2px] ${
                  isDark ? 'bg-white/60' : 'bg-black/70'
                }`}
              />

              <div
                className={`absolute bottom-2 -left-8 px-1.5 py-0.5 rounded font-bold text-xs ${
                  isDark ? 'bg-white text-black' : 'bg-[#0d0d10] text-white'
                }`}
              >
                Y₁
              </div>

              {/* Origin Intersection O Badge */}
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] border shadow-lg ${
                  isDark
                    ? 'bg-white text-black border-white shadow-md'
                    : 'bg-[#0d0d10] text-white border-[#0d0d10] shadow-md'
                }`}
              >
                O
              </div>
            </div>
          </div>

          {/* Right Zone Coordinates (A - D) */}
          <div
            className={`w-5 border-l flex flex-col justify-around text-[9px] font-bold items-center text-center ${
              isDark
                ? 'bg-white/[0.03] border-white/10 text-zinc-500'
                : 'bg-black/[0.03] border-black/10 text-zinc-500'
            }`}
          >
            {['A', 'B', 'C', 'D'].map((letter) => (
              <span key={letter}>{letter}</span>
            ))}
          </div>
        </div>

        {/* ISO Standard Zone Coordinate Bar (Bottom: 1 - 8) */}
        <div
          className={`h-5 border-t grid grid-cols-8 text-[9px] font-bold items-center text-center ${
            isDark
              ? 'bg-white/[0.03] border-white/10 text-zinc-500'
              : 'bg-black/[0.03] border-black/10 text-zinc-500'
          }`}
        >
          {['1', '2', '3', '4', '5', '6', '7', '8'].map((zone) => (
            <div key={zone} className="border-r border-current/10 last:border-r-0">
              {zone}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
