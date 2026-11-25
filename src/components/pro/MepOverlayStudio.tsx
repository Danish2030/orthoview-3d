import React, { useState, useMemo } from 'react';
import {
  Zap,
  Droplets,
  Wind,
  Trash2,
  Sliders,
} from 'lucide-react';
import { CadLayerId, MepNode, ProProjectState } from '../../types/pro';
import { ThemeMode } from '../../types';
import { AccentId } from '../../utils/accentTheme';

interface MepOverlayStudioProps {
  project: ProProjectState;
  onUpdateProject: (next: ProProjectState) => void;
  theme: ThemeMode;
  accentId: AccentId;
  activeLayers: CadLayerId[];
}

export const MepOverlayStudio: React.FC<MepOverlayStudioProps> = ({
  project,
  onUpdateProject,
  theme,
  activeLayers,
}) => {
  const isDark = theme === 'blueprint';
  const [filterDiscipline, setFilterDiscipline] = useState<'all' | 'electrical' | 'plumbing' | 'hvac'>('all');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('');

  const showElec = activeLayers.includes('E-LITE') && (filterDiscipline === 'all' || filterDiscipline === 'electrical');
  const showPlumb = activeLayers.includes('P-PIPE') && (filterDiscipline === 'all' || filterDiscipline === 'plumbing');
  const showHvac = activeLayers.includes('M-HVAC') && (filterDiscipline === 'all' || filterDiscipline === 'hvac');

  // Compute bounding box from rooms
  const { minX, minY, maxX, maxY } = useMemo(() => {
    let minx = Infinity;
    let miny = Infinity;
    let maxx = -Infinity;
    let maxy = -Infinity;
    for (const r of project.rooms) {
      minx = Math.min(minx, r.x);
      miny = Math.min(miny, r.y);
      maxx = Math.max(maxx, r.x + r.width);
      maxy = Math.max(maxy, r.y + r.depth);
    }
    return {
      minX: minx === Infinity ? 0 : minx,
      minY: miny === Infinity ? 0 : miny,
      maxX: maxx === -Infinity ? 8000 : maxx,
      maxY: maxy === -Infinity ? 8000 : maxy,
    };
  }, [project.rooms]);

  // Fixture count summary
  const fixtureStats = useMemo(() => {
    let lights = 0;
    let acs = 0;
    let taps = 0;
    let drains = 0;
    let diffusers = 0;
    let dbs = 0;

    for (const n of project.mepNodes) {
      if (n.type === 'light') lights++;
      else if (n.type === 'ac') acs++;
      else if (n.type === 'tap') taps++;
      else if (n.type === 'drain') drains++;
      else if (n.type === 'diffuser') diffusers++;
      else if (n.type === 'db') dbs++;
    }

    return { lights, acs, taps, drains, diffusers, dbs, total: project.mepNodes.length };
  }, [project.mepNodes]);

  const handleAddNode = (discipline: 'electrical' | 'plumbing' | 'hvac', type: MepNode['type']) => {
    const firstRoom = project.rooms[0];
    const newNode: MepNode = {
      id: `mep-${Date.now()}`,
      roomId: firstRoom?.id || 'room-1',
      type,
      discipline,
      x: firstRoom ? firstRoom.x + firstRoom.width / 2 : 2000,
      y: firstRoom ? firstRoom.y + firstRoom.depth / 2 : 2000,
      tag: `${type.toUpperCase()}-${project.mepNodes.length + 1}`,
      specs: `Standard ${type.toUpperCase()} point`,
    };
    onUpdateProject({ ...project, mepNodes: [...project.mepNodes, newNode] });
    setSelectedNodeId(newNode.id);
  };

  const handleDeleteNode = (id: string) => {
    const next = project.mepNodes.filter((n) => n.id !== id);
    onUpdateProject({ ...project, mepNodes: next });
    if (selectedNodeId === id) setSelectedNodeId('');
  };

  const selectedNode = project.mepNodes.find((n) => n.id === selectedNodeId);

  return (
    <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden relative">
      {/* Center Stage */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Discipline Filter */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <div className="p-1 rounded-full glass-pill flex items-center gap-1 text-[11px] font-semibold shadow-lg">
            <button
              onClick={() => setFilterDiscipline('all')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                filterDiscipline === 'all' ? 'glass-pill-active' : 'opacity-65 hover:opacity-100'
              }`}
            >
              All MEP Services
            </button>
            <button
              onClick={() => setFilterDiscipline('electrical')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1 text-amber-400 ${
                filterDiscipline === 'electrical' ? 'glass-pill-active font-bold' : 'opacity-65 hover:opacity-100'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>Electrical (E-LITE)</span>
            </button>
            <button
              onClick={() => setFilterDiscipline('plumbing')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1 text-cyan-400 ${
                filterDiscipline === 'plumbing' ? 'glass-pill-active font-bold' : 'opacity-65 hover:opacity-100'
              }`}
            >
              <Droplets className="w-3 h-3" />
              <span>Plumbing (P-PIPE)</span>
            </button>
            <button
              onClick={() => setFilterDiscipline('hvac')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1 text-purple-400 ${
                filterDiscipline === 'hvac' ? 'glass-pill-active font-bold' : 'opacity-65 hover:opacity-100'
              }`}
            >
              <Wind className="w-3 h-3" />
              <span>HVAC (M-HVAC)</span>
            </button>
          </div>
        </div>

        {/* SVG Drawing Canvas */}
        <div className="flex-1 flex items-center justify-center h-full p-4 overflow-hidden">
          <svg
            viewBox={`${minX - 1200} ${minY - 1200} ${maxX - minX + 2400} ${maxY - minY + 2400}`}
            className="w-full h-full max-h-[88vh]"
          >
            {/* 1. Muted Architectural Floor Plan Underlay */}
            <g opacity="0.35">
              {project.rooms.map((room) => (
                <g key={`underlay-${room.id}`}>
                  <rect
                    x={room.x}
                    y={room.y}
                    width={room.width}
                    height={room.depth}
                    fill={isDark ? '#18181b' : '#f8fafc'}
                    stroke="currentColor"
                    strokeWidth="40"
                  />
                  <text
                    x={room.x + room.width / 2}
                    y={room.y + room.depth / 2}
                    fontSize="180"
                    fontWeight="600"
                    textAnchor="middle"
                    fill="currentColor"
                    opacity="0.5"
                  >
                    {room.name}
                  </text>
                </g>
              ))}
            </g>

            {/* 2. Plumbing Water Supply & Drainage Pipe Network (P-PIPE) */}
            {showPlumb && (
              <g>
                {/* 110mm Soil Drainage Line to Inspection Chamber with 1:60 slope */}
                <path
                  d="M 6700 2000 L 7800 2000 L 7800 9000 L 5200 9000 L 5200 10200"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="70"
                  strokeDasharray="140 40"
                />
                {/* Slope Direction Arrows */}
                <text x="7900" y="5500" fontSize="160" fontWeight="bold" fill="#06b6d4" transform="rotate(90 7900 5500)">
                  SLOPE 1:60 ➤
                </text>
                {/* Exterior Inspection Chamber (IC) */}
                <rect x="5000" y="10000" width="400" height="400" fill="#06b6d4" stroke="#ffffff" strokeWidth="20" />
                <text x="5500" y="10250" fontSize="160" fontWeight="bold" fill="#06b6d4">
                  IC-1 (450×450mm)
                </text>
              </g>
            )}

            {/* 3. HVAC Main Supply Duct Run (M-HVAC) */}
            {showHvac && (
              <g opacity="0.75">
                <rect x="1800" y="2500" width="400" height="5400" fill="rgba(168, 85, 247, 0.15)" stroke="#a855f7" strokeWidth="40" strokeDasharray="80 40" />
                <line x1="2000" y1="2500" x2="2000" y2="7900" stroke="#a855f7" strokeWidth="25" />
                <text x="2100" y="5200" fontSize="160" fontWeight="bold" fill="#a855f7" transform="rotate(90 2100 5200)">
                  MAIN SUPPLY DUCT 400×250mm
                </text>
              </g>
            )}

            {/* 4. Electrical Circuit Wiring Loops (E-LITE) */}
            {showElec && (
              <g opacity="0.85">
                {/* Curved wiring loop from DB to Lights */}
                <path
                  d="M 200 2200 Q 1200 1500 2250 900"
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="35"
                  strokeDasharray="60 40"
                />
                <path
                  d="M 200 2200 Q 1200 3000 2250 3900"
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="35"
                  strokeDasharray="60 40"
                />
                <path
                  d="M 2250 3900 Q 3300 3500 4300 3000"
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="35"
                  strokeDasharray="60 40"
                />
              </g>
            )}

            {/* 5. MEP Nodes / Fixture Glyphs */}
            {project.mepNodes.map((node) => {
              const isSelected = node.id === selectedNodeId;
              let isVisible = false;
              if (node.discipline === 'electrical' && showElec) isVisible = true;
              if (node.discipline === 'plumbing' && showPlumb) isVisible = true;
              if (node.discipline === 'hvac' && showHvac) isVisible = true;
              if (!isVisible) return null;

              const color = node.discipline === 'electrical' ? '#eab308' : node.discipline === 'plumbing' ? '#06b6d4' : '#a855f7';

              return (
                <g key={node.id} onClick={() => setSelectedNodeId(node.id)} className="cursor-pointer">
                  {/* Selection Glow */}
                  {isSelected && (
                    <circle cx={node.x} cy={node.y} r="180" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="15" />
                  )}

                  {/* Fixture Glyph */}
                  {node.type === 'light' && (
                    <g>
                      <circle cx={node.x} cy={node.y} r="90" fill={color} stroke="#ffffff" strokeWidth="20" />
                      <line x1={node.x - 70} y1={node.y - 70} x2={node.x + 70} y2={node.y + 70} stroke="#ffffff" strokeWidth="15" />
                      <line x1={node.x - 70} y1={node.y + 70} x2={node.x + 70} y2={node.y - 70} stroke="#ffffff" strokeWidth="15" />
                    </g>
                  )}

                  {node.type === 'db' && (
                    <g>
                      <rect x={node.x - 80} y={node.y - 80} width="160" height="160" fill="#0f172a" stroke="#eab308" strokeWidth="25" />
                      <line x1={node.x - 80} y1={node.y + 80} x2={node.x + 80} y2={node.y - 80} stroke="#eab308" strokeWidth="20" />
                    </g>
                  )}

                  {node.type === 'ac' && (
                    <g>
                      <rect x={node.x - 120} y={node.y - 60} width="240" height="120" rx="20" fill="#eab308" stroke="#ffffff" strokeWidth="15" />
                      <text x={node.x} y={node.y + 25} fontSize="70" fontWeight="bold" textAnchor="middle" fill="#0f172a">AC</text>
                    </g>
                  )}

                  {node.type === 'tap' && (
                    <g>
                      <circle cx={node.x} cy={node.y} r="80" fill="#06b6d4" stroke="#ffffff" strokeWidth="15" />
                      <polygon points={`${node.x},${node.y - 120} ${node.x - 40},${node.y - 60} ${node.x + 40},${node.y - 60}`} fill="#06b6d4" />
                    </g>
                  )}

                  {node.type === 'drain' && (
                    <g>
                      <circle cx={node.x} cy={node.y} r="90" fill="none" stroke="#06b6d4" strokeWidth="25" />
                      <circle cx={node.x} cy={node.y} r="40" fill="#06b6d4" />
                    </g>
                  )}

                  {node.type === 'diffuser' && (
                    <g>
                      <rect x={node.x - 90} y={node.y - 90} width="180" height="180" fill="none" stroke="#a855f7" strokeWidth="25" />
                      <line x1={node.x - 90} y1={node.y - 90} x2={node.x + 90} y2={node.y + 90} stroke="#a855f7" strokeWidth="15" />
                      <line x1={node.x - 90} y1={node.y + 90} x2={node.x + 90} y2={node.y - 90} stroke="#a855f7" strokeWidth="15" />
                    </g>
                  )}

                  {/* Tag Label */}
                  <text
                    x={node.x + 110}
                    y={node.y + 40}
                    fontSize="130"
                    fontWeight="bold"
                    fill={color}
                  >
                    {node.tag}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Right Sidebar: Fixture Palette & Inspector */}
      <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-current/10 glass-panel p-4 flex flex-col gap-4 overflow-y-auto shrink-0 custom-scrollbar">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[var(--accent-hex)]" />
            <span className="font-semibold text-sm">MEP Services</span>
          </div>
          <span className="text-[10px] opacity-60 font-mono">IS 732 / NBC</span>
        </div>

        {/* Fixture Add Quick Buttons */}
        <div className="space-y-2">
          <span className="text-[11px] font-medium opacity-60">Add Service Point</span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleAddNode('electrical', 'light')}
              className="p-2 rounded-xl border border-amber-500/30 hover:bg-amber-500/10 text-amber-400 font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>+ Light Point</span>
            </button>
            <button
              onClick={() => handleAddNode('electrical', 'ac')}
              className="p-2 rounded-xl border border-amber-500/30 hover:bg-amber-500/10 text-amber-400 font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>+ AC Power</span>
            </button>
            <button
              onClick={() => handleAddNode('plumbing', 'tap')}
              className="p-2 rounded-xl border border-cyan-500/30 hover:bg-cyan-500/10 text-cyan-400 font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>+ Water Tap</span>
            </button>
            <button
              onClick={() => handleAddNode('plumbing', 'drain')}
              className="p-2 rounded-xl border border-cyan-500/30 hover:bg-cyan-500/10 text-cyan-400 font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>+ Drain Trap</span>
            </button>
            <button
              onClick={() => handleAddNode('hvac', 'diffuser')}
              className="col-span-2 p-2 rounded-xl border border-purple-500/30 hover:bg-purple-500/10 text-purple-400 font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Wind className="w-3.5 h-3.5" />
              <span>+ HVAC Supply Diffuser</span>
            </button>
          </div>
        </div>

        {/* Selected Node Inspector */}
        {selectedNode && (
          <div className="p-3 rounded-2xl glass-card space-y-3 text-xs border border-current/10">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs">{selectedNode.tag}</span>
              <button
                onClick={() => handleDeleteNode(selectedNode.id)}
                className="text-rose-500 hover:opacity-100 cursor-pointer p-0.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] opacity-60">Specification</label>
              <input
                type="text"
                value={selectedNode.specs || ''}
                onChange={(e) => {
                  const next = project.mepNodes.map((n) =>
                    n.id === selectedNode.id ? { ...n, specs: e.target.value } : n
                  );
                  onUpdateProject({ ...project, mepNodes: next });
                }}
                className="w-full px-2.5 py-1 rounded-lg border border-current/15 bg-transparent font-medium"
              />
            </div>
          </div>
        )}

        {/* Fixture Schedule Summary Card */}
        <div className="pt-2 border-t border-current/10 space-y-2 text-xs">
          <span className="font-semibold text-xs text-[var(--accent-hex)]">Connected Fixture Schedule</span>
          <div className="p-3 rounded-2xl glass-card space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="opacity-75">Ceiling Lights / Lamps:</span>
              <span className="font-bold font-mono">{fixtureStats.lights} nos.</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-75">Dedicated AC Points:</span>
              <span className="font-bold font-mono">{fixtureStats.acs} nos.</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-75">Main Distribution Board:</span>
              <span className="font-bold font-mono">{fixtureStats.dbs} nos.</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-75">Plumbing Taps / Sinks:</span>
              <span className="font-bold font-mono">{fixtureStats.taps} nos.</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-75">Drainage Traps / ICs:</span>
              <span className="font-bold font-mono">{fixtureStats.drains} nos.</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-75">HVAC Air Diffusers:</span>
              <span className="font-bold font-mono">{fixtureStats.diffusers} nos.</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-current/10 font-bold">
              <span>Total Service Points:</span>
              <span className="text-[var(--accent-hex)] font-mono">{fixtureStats.total} nos.</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
