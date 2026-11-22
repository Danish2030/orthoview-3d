import React from 'react';
import { Home } from 'lucide-react';

interface ViewCubeProps {
  cameraMatrix: number[];
  onSelectView: (view: 'front' | 'top' | 'left' | 'right' | 'back' | 'bottom' | 'isometric') => void;
  theme: 'blueprint' | 'paper';
}

export const ViewCube: React.FC<ViewCubeProps> = ({ cameraMatrix, onSelectView, theme }) => {
  const isDark = theme === 'blueprint';

  // Construct CSS 3D transform matrix from camera inverse matrix
  // cameraMatrix is array of 16 elements
  const [
    m0, m1, m2, ,
    m4, m5, m6, ,
    m8, m9, m10, ,
  ] = cameraMatrix.length === 16 ? cameraMatrix : [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];

  // Rotate opposite to camera so cube looks like the object
  // Invert rotation matrix (transpose of 3x3 orthonormal rotation part)
  const cssMatrix = [
    m0, m4, m8, 0,
    -m1, -m5, -m9, 0,
    m2, m6, m10, 0,
    0, 0, 0, 1,
  ];

  const transformStyle = `matrix3d(${cssMatrix.join(',')})`;

  const faceBaseClass = `absolute w-[68px] h-[68px] flex flex-col items-center justify-center font-mono font-bold text-[10px] tracking-wider border transition-all cursor-pointer select-none backface-visible ${
    isDark
      ? 'bg-slate-900/90 hover:bg-sky-500 hover:text-slate-950 text-slate-300 border-sky-500/40 shadow-[inset_0_0_10px_rgba(56,189,248,0.15)]'
      : 'bg-white/95 hover:bg-blue-600 hover:text-white text-slate-700 border-slate-300 shadow-sm'
  }`;

  const halfSize = 34; // px

  return (
    <div className="relative flex flex-col items-center">
      {/* Home / Isometric Quick Button */}
      <button
        onClick={() => onSelectView('isometric')}
        title="Isometric Home Orientation"
        className={`absolute -top-7 -left-1 p-1 rounded-md border text-xs transition-all z-20 ${
          isDark
            ? 'bg-slate-900/80 border-slate-700 text-sky-400 hover:bg-slate-800 hover:text-white'
            : 'bg-white/90 border-slate-300 text-blue-600 hover:bg-slate-100'
        }`}
      >
        <Home className="w-3.5 h-3.5" />
      </button>

      {/* 3D Perspective Viewport for Cube */}
      <div
        className="w-24 h-24 flex items-center justify-center"
        style={{ perspective: '400px' }}
      >
        <div
          className="relative w-[68px] h-[68px] transition-transform duration-75"
          style={{
            transformStyle: 'preserve-3d',
            transform: transformStyle,
          }}
        >
          {/* FRONT FACE (Z = +halfSize) */}
          <div
            onClick={() => onSelectView('front')}
            className={faceBaseClass}
            style={{ transform: `translateZ(${halfSize}px)` }}
          >
            <span>FRONT</span>
            <span className="text-[8px] opacity-70">V.P.</span>
          </div>

          {/* BACK FACE (Z = -halfSize) */}
          <div
            onClick={() => onSelectView('back')}
            className={faceBaseClass}
            style={{ transform: `rotateY(180deg) translateZ(${halfSize}px)` }}
          >
            <span>BACK</span>
          </div>

          {/* TOP FACE (Y = +halfSize) */}
          <div
            onClick={() => onSelectView('top')}
            className={faceBaseClass}
            style={{ transform: `rotateX(90deg) translateZ(${halfSize}px)` }}
          >
            <span>TOP</span>
            <span className="text-[8px] opacity-70">H.P.</span>
          </div>

          {/* BOTTOM FACE (Y = -halfSize) */}
          <div
            onClick={() => onSelectView('bottom')}
            className={faceBaseClass}
            style={{ transform: `rotateX(-90deg) translateZ(${halfSize}px)` }}
          >
            <span>BOTTOM</span>
          </div>

          {/* RIGHT FACE (X = +halfSize) */}
          <div
            onClick={() => onSelectView('right')}
            className={faceBaseClass}
            style={{ transform: `rotateY(90deg) translateZ(${halfSize}px)` }}
          >
            <span>RIGHT</span>
          </div>

          {/* LEFT FACE (X = -halfSize) */}
          <div
            onClick={() => onSelectView('left')}
            className={faceBaseClass}
            style={{ transform: `rotateY(-90deg) translateZ(${halfSize}px)` }}
          >
            <span>LEFT</span>
            <span className="text-[8px] opacity-70">R.P.P.</span>
          </div>
        </div>
      </div>

      <div className="text-[9px] font-mono tracking-widest uppercase text-slate-400 -mt-1">
        CAD VIEWCUBE
      </div>
    </div>
  );
};
