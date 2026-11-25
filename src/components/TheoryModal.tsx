import React from 'react';
import { X, BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ThemeMode } from '../types';

interface TheoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
}

export const TheoryModal: React.FC<TheoryModalProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null;

  const isDark = theme === 'blueprint';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-4xl max-h-[90vh] rounded-2xl border shadow-2xl flex flex-col overflow-hidden font-sans ${
          isDark
            ? 'bg-[#0f172a] border-slate-700 text-slate-200'
            : 'bg-white border-slate-300 text-slate-800'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isDark ? 'border-slate-800 bg-[#131c31]' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-sky-400" />
            <div>
              <h2 className="text-base font-bold font-mono tracking-tight text-slate-100">
                FIRST-ANGLE ORTHOGRAPHIC PROJECTION GUIDE
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                ISO 128 / BIS SP:46 Engineering Graphics Theory for First-Year B.Tech
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm custom-scrollbar">
          {/* Section 1: Fundamental Principle */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-sky-950/20 border-sky-800/50' : 'bg-blue-50/50 border-blue-200'
            }`}
          >
            <h3 className="text-sm font-bold font-mono text-sky-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              1. The Golden Rule of First-Angle Projection
            </h3>
            <p className="leading-relaxed">
              In First-Angle Projection, the object is imagined to be situated in the{' '}
              <strong className="text-sky-400">First Quadrant</strong>:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 font-mono text-xs text-slate-300">
              <li>
                <strong>Above</strong> the Horizontal Plane (H.P.)
              </li>
              <li>
                <strong>In front of</strong> the Vertical Plane (V.P.)
              </li>
              <li>
                The <strong>Object lies BETWEEN the Observer and the Plane of Projection</strong>.
              </li>
            </ul>
            <p className="mt-3 text-xs text-slate-400">
              When the rays of sight strike the object, its shadow or image is cast onto the plane
              behind it. Thus, each view is projected onto the opposite side of the observer!
            </p>
          </div>

          {/* Section 2: Layout on the Drawing Sheet */}
          <div>
            <h3 className="text-sm font-bold font-mono text-amber-400 uppercase tracking-wider mb-3">
              2. Standard Drawing Sheet Layout (ISO / BIS)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="font-mono font-bold text-xs text-sky-300 mb-2">
                  TOP-LEFT: FRONT VIEW (FV / ELEVATION)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Drawn on the Vertical Plane (V.P.) <strong>ABOVE</strong> the reference line{' '}
                  <code className="text-amber-400 font-bold">X — Y</code>.
                </p>
                <div className="text-[11px] text-slate-400 mt-2">
                  • Shows: <strong>Length (L)</strong> along horizontal and <strong>Height (H)</strong> along vertical.
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="font-mono font-bold text-xs text-amber-300 mb-2">
                  TOP-RIGHT: LEFT-HAND SIDE VIEW (LHSV)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Projected onto the Right Profile Plane (R.P.P.) to the <strong>RIGHT</strong> of
                  the Front View, beyond the reference line{' '}
                  <code className="text-amber-400 font-bold">X₁ — Y₁</code>.
                </p>
                <div className="text-[11px] text-slate-400 mt-2">
                  • Shows: <strong>Width/Depth (W)</strong> along horizontal and <strong>Height (H)</strong> along vertical.
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="font-mono font-bold text-xs text-emerald-300 mb-2">
                  BOTTOM-LEFT: TOP VIEW (TV / PLAN)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Drawn on the Horizontal Plane (H.P.) <strong>BELOW</strong> the reference line{' '}
                  <code className="text-amber-400 font-bold">X — Y</code>, aligned directly under the Front View.
                </p>
                <div className="text-[11px] text-slate-400 mt-2">
                  • Shows: <strong>Length (L)</strong> along horizontal and <strong>Width/Depth (W)</strong> along vertical.
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="font-mono font-bold text-xs text-purple-300 mb-2">
                  BOTTOM-RIGHT: 45° MITER LINE & TITLE BLOCK
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A 45° construction line drawn from the intersection of X-Y and X₁-Y₁ that transfers
                  depth dimensions from the Top View directly up into the Side View.
                </p>
                <div className="text-[11px] text-slate-400 mt-2">
                  • Accommodates the official First-Angle Projection symbol and drawing credentials.
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Why 2nd and 4th Quadrant are not used */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-amber-950/20 border-amber-800/40' : 'bg-amber-50 border-amber-200'
            }`}
          >
            <h3 className="text-sm font-bold font-mono text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              3. Classic Exam Question: Why are 2nd & 4th Angle Projections NOT used?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When preparing an orthographic projection sheet, the Horizontal Plane (H.P.) is rotated{' '}
              <strong>90° clockwise</strong> about the reference line X-Y to bring it into the same
              plane as the Vertical Plane (V.P.):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div className="p-2.5 rounded bg-black/20 text-xs">
                <span className="font-bold text-amber-300">In the 2nd Quadrant:</span> The H.P. is
                above the reference line. When rotated 90° clockwise, the H.P. swings upward and{' '}
                <strong>overlaps directly with the V.P.</strong> The Front View and Top View lie on top of
                one another, resulting in an unintelligible mess of overlapping lines!
              </div>
              <div className="p-2.5 rounded bg-black/20 text-xs">
                <span className="font-bold text-amber-300">In the 4th Quadrant:</span> Both V.P. and
                H.P. end up <strong>below</strong> the reference line after rotation. Again, the Front View
                and Top View overlap each other, making the drawing unusable.
              </div>
            </div>
          </div>

          {/* Section 4: Line Types (BIS SP:46 Standard) */}
          <div>
            <h3 className="text-sm font-bold font-mono text-slate-300 uppercase tracking-wider mb-3">
              4. Engineering Line Standards (BIS SP:46)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 text-left text-slate-400">
                    <th className="pb-2">Line Style</th>
                    <th className="pb-2">Standard Name</th>
                    <th className="pb-2">Thickness</th>
                    <th className="pb-2">Application in VectorDesk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr>
                    <td className="py-2 text-sky-400 font-bold">──────</td>
                    <td className="py-2">Continuous Thick (Type A)</td>
                    <td className="py-2">0.5 mm</td>
                    <td className="py-2 text-slate-300">Visible object outlines & edges</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-amber-400 font-bold">- - - -</td>
                    <td className="py-2">Dashed Medium (Type F)</td>
                    <td className="py-2">0.3 mm</td>
                    <td className="py-2 text-slate-300">Hidden outlines & edges (occluded features)</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-400 font-bold">─ · ─ ·</td>
                    <td className="py-2">Long Dash-Dotted Thin (Type G)</td>
                    <td className="py-2">0.2 mm</td>
                    <td className="py-2 text-slate-300">Center lines, axes of cylinders & cones</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sky-300/60 font-bold">······</td>
                    <td className="py-2">Continuous / Faint Thin (Type B)</td>
                    <td className="py-2">0.2 mm</td>
                    <td className="py-2 text-slate-300">Projectors, dimension lines, 45° miter line</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className={`px-6 py-3 border-t flex items-center justify-end ${
            isDark ? 'border-slate-800 bg-[#131c31]' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono font-bold rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors"
          >
            Got It, Back to Workspace
          </button>
        </div>
      </div>
    </div>
  );
};
