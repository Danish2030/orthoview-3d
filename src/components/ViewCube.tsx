import React from 'react';
import { Home } from 'lucide-react';

interface ViewCubeProps {
  cameraMatrix: number[];
  onSelectView: (view: 'front' | 'top' | 'left' | 'right' | 'back' | 'bottom' | 'isometric') => void;
  theme: 'blueprint' | 'paper';
}

export const ViewCube: React.FC<ViewCubeProps> = ({ cameraMatrix, onSelectView, theme }) => {
  const isDark = theme === 'blueprint';

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

  const cssMatrix = [
    m0, m4, m8, 0,
    -m1, -m5, -m9, 0,
    m2, m6, m10, 0,
    0, 0, 0, 1,
  ];

  const transformStyle = `matrix3d(${cssMatrix.join(',')})`;

  const faceBaseClass = `absolute w-[64px] h-[64px] flex flex-col items-center justify-center font-semibold text-[10px] tracking-wider border transition-all cursor-pointer select-none backface-visible ${
    isDark
      ? 'bg-[#121216]/90 hover:bg-white hover:text-black text-zinc-200 border-white/20'
      : 'bg-white/95 hover:bg-[#0d0d10] hover:text-white text-zinc-800 border-black/15 shadow-sm'
  }`;

  const halfSize = 32;

  return (
    <div className="relative flex flex-col items-center">
      <button
        onClick={() => onSelectView('isometric')}
        title="Isometric Home Orientation"
        className="absolute -top-2 -left-2 p-1.5 rounded-full glass-pill transition-all z-20 cursor-pointer"
      >
        <Home className="w-3.5 h-3.5" />
      </button>

      <div
        className="w-24 h-24 flex items-center justify-center"
        style={{ perspective: '400px' }}
      >
        <div
          className="relative w-[64px] h-[64px] transition-transform duration-75"
          style={{
            transformStyle: 'preserve-3d',
            transform: transformStyle,
          }}
        >
          <div onClick={() => onSelectView('front')} className={faceBaseClass} style={{ transform: `translateZ(${halfSize}px)` }}>
            <span>FRONT</span>
            <span className="text-[8px] opacity-60">V.P.</span>
          </div>
          <div onClick={() => onSelectView('back')} className={faceBaseClass} style={{ transform: `rotateY(180deg) translateZ(${halfSize}px)` }}>
            <span>BACK</span>
          </div>
          <div onClick={() => onSelectView('top')} className={faceBaseClass} style={{ transform: `rotateX(90deg) translateZ(${halfSize}px)` }}>
            <span>TOP</span>
            <span className="text-[8px] opacity-60">H.P.</span>
          </div>
          <div onClick={() => onSelectView('bottom')} className={faceBaseClass} style={{ transform: `rotateX(-90deg) translateZ(${halfSize}px)` }}>
            <span>BOTTOM</span>
          </div>
          <div onClick={() => onSelectView('right')} className={faceBaseClass} style={{ transform: `rotateY(90deg) translateZ(${halfSize}px)` }}>
            <span>RIGHT</span>
          </div>
          <div onClick={() => onSelectView('left')} className={faceBaseClass} style={{ transform: `rotateY(-90deg) translateZ(${halfSize}px)` }}>
            <span>LEFT</span>
            <span className="text-[8px] opacity-60">R.P.P.</span>
          </div>
        </div>
      </div>

      <div className="text-[9px] font-medium tracking-[0.18em] uppercase opacity-50 -mt-1">
        ViewCube
      </div>
    </div>
  );
};
