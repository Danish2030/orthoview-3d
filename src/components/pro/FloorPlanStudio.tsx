import React, { useState, useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  Plus,
  Trash2,
  Box,
  DoorOpen,
  Sliders,
} from 'lucide-react';
import { CadLayerId, ProProjectState, ProRoom } from '../../types/pro';
import { ThemeMode } from '../../types';
import { AccentId } from '../../utils/accentTheme';
import { formatLength, formatArea } from '../../utils/proUnits';

interface FloorPlanStudioProps {
  project: ProProjectState;
  onUpdateProject: (next: ProProjectState) => void;
  theme: ThemeMode;
  accentId: AccentId;
  activeLayers: CadLayerId[];
}


const renderRoomFurniture = (name: string, x: number, y: number, w: number, d: number, isDark: boolean) => {
  const lower = name.toLowerCase();
  const stroke = isDark ? 'rgba(228,228,231,0.35)' : 'rgba(15,23,42,0.35)';
  const fill = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.05)';
  const cx = x + w / 2;

  if (lower.includes('bed')) {
    const bw = Math.min(1800, w * 0.48);
    const bd = Math.min(2000, d * 0.5);
    const bx = cx - bw / 2;
    const by = y + 360;
    return (
      <g stroke={stroke} fill={fill} strokeWidth="22" pointerEvents="none">
        <rect x={bx} y={by} width={bw} height={bd} rx="60" />
        <rect x={bx + 120} y={by + 90} width={bw / 2 - 180} height={320} rx="50" />
        <rect x={bx + bw / 2 + 60} y={by + 90} width={bw / 2 - 180} height={320} rx="50" />
        <line x1={bx} y1={by + 560} x2={bx + bw} y2={by + 560} />
      </g>
    );
  }
  if (lower.includes('living') || lower.includes('hall')) {
    const sw = Math.min(2200, w * 0.52);
    return (
      <g stroke={stroke} fill={fill} strokeWidth="22" pointerEvents="none">
        {/* L-Sofa + Coffee Table */}
        <rect x={x + 420} y={y + 420} width={sw} height={700} rx="80" />
        <rect x={x + 420} y={y + 1120} width={700} height={1100} rx="80" />
        <rect x={x + 1350} y={y + 1350} width={950} height={620} rx="60" />
      </g>
    );
  }
  if (lower.includes('kitchen')) {
    return (
      <g stroke={stroke} fill={fill} strokeWidth="22" pointerEvents="none">
        {/* L-shaped Kitchen Counter + 4-Burner Hob + Sink */}
        <path d={`M ${x + 280} ${y + 280} H ${x + w - 280} V ${y + 880} H ${x + 880} V ${y + d - 280} H ${x + 280} Z`} />
        <circle cx={x + w - 700} cy={y + 520} r="90" />
        <circle cx={x + w - 480} cy={y + 520} r="90" />
        <circle cx={x + w - 700} cy={y + 720} r="90" />
        <circle cx={x + w - 480} cy={y + 720} r="90" />
        <rect x={x + 380} y={y + 1150} width={400} height={680} rx="40" />
      </g>
    );
  }
  if (lower.includes('bath') || lower.includes('toilet') || lower.includes('wc')) {
    return (
      <g stroke={stroke} fill={fill} strokeWidth="22" pointerEvents="none">
        <rect x={x + 340} y={y + 340} width={380} height={220} rx="30" />
        <ellipse cx={x + 530} cy={y + 760} rx="180" ry="240" />
        <ellipse cx={x + w - 520} cy={y + 520} rx="220" ry="160" />
      </g>
    );
  }
  return null;
};

export const FloorPlanStudio: React.FC<FloorPlanStudioProps> = ({
  project,
  onUpdateProject,
  theme,
  activeLayers,
}) => {
  const isDark = theme === 'blueprint';
  const [selectedRoomId, setSelectedRoomId] = useState<string>(project.rooms[0]?.id || '');
  const [viewMode, setViewMode] = useState<'2d' | 'split' | '3d'>('split');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // 3D Three.js canvas ref
  const canvas3dRef = useRef<HTMLCanvasElement | null>(null);
  const container3dRef = useRef<HTMLDivElement | null>(null);

  const selectedRoom = useMemo(
    () => project.rooms.find((r) => r.id === selectedRoomId) || project.rooms[0],
    [project.rooms, selectedRoomId]
  );

  // Calculate Carpet Area and Built-Up Area
  const { carpetAreaSqM, builtUpAreaSqM, minX, minY, maxX, maxY } = useMemo(() => {
    let carpetSum = 0;
    let minx = Infinity;
    let miny = Infinity;
    let maxx = -Infinity;
    let maxy = -Infinity;

    for (const r of project.rooms) {
      // Internal dimensions
      const intW = Math.max(0, r.width - 2 * r.wallExtMm);
      const intD = Math.max(0, r.depth - 2 * r.wallExtMm);
      carpetSum += (intW * intD) / 1000000;

      minx = Math.min(minx, r.x);
      miny = Math.min(miny, r.y);
      maxx = Math.max(maxx, r.x + r.width);
      maxy = Math.max(maxy, r.y + r.depth);
    }

    if (minx === Infinity) {
      minx = 0;
      miny = 0;
      maxx = 8000;
      maxy = 8000;
    }

    const totalWidth = maxx - minx;
    const totalDepth = maxy - miny;
    const builtUp = (totalWidth * totalDepth) / 1000000;

    return {
      carpetAreaSqM: carpetSum,
      builtUpAreaSqM: builtUp,
      minX: minx,
      minY: miny,
      maxX: maxx,
      maxY: maxy,
    };
  }, [project.rooms]);

  // Update a single room
  const handleUpdateRoom = (updated: ProRoom) => {
    const nextRooms = project.rooms.map((r) => (r.id === updated.id ? updated : r));
    onUpdateProject({ ...project, rooms: nextRooms });
  };

  // Add Room
  const handleAddRoom = () => {
    const newId = `room-${Date.now()}`;
    const newRoom: ProRoom = {
      id: newId,
      name: `New Room ${project.rooms.length + 1}`,
      x: maxX > 0 ? maxX : 0,
      y: 0,
      width: 3600,
      depth: 3000,
      wallExtMm: 230,
      wallIntMm: 115,
      doors: [{ id: `d-${Date.now()}`, wall: 'S', offset: 1000, widthMm: 900, tag: 'D2' }],
      windows: [{ id: `w-${Date.now()}`, wall: 'N', offset: 1000, widthMm: 1200, sillMm: 900, heightMm: 1200, tag: 'W2' }],
      floorType: 'vitrified',
    };
    onUpdateProject({ ...project, rooms: [...project.rooms, newRoom] });
    setSelectedRoomId(newId);
  };

  // Delete Room
  const handleDeleteRoom = (id: string) => {
    if (project.rooms.length <= 1) return;
    const next = project.rooms.filter((r) => r.id !== id);
    onUpdateProject({ ...project, rooms: next });
    if (selectedRoomId === id) setSelectedRoomId(next[0].id);
  };

  // 3D Extrusion Effect with Three.js
  useEffect(() => {
    if (viewMode === '2d') return;
    const canvas = canvas3dRef.current;
    const container = container3dRef.current;
    if (!canvas || !container) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isDark ? 0x09090b : 0xf8fafc);

    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 50000);
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    camera.position.set(centerX + 8000, 11000, centerY + 13000);
    camera.lookAt(centerX, 0, centerY);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(centerX, 0, centerY);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.9 : 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfffaed, isDark ? 1.6 : 1.4);
    dirLight.position.set(centerX + 6000, 12000, centerY + 8000);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // Ground Grid
    const groundGrid = new THREE.GridHelper(30000, 30, isDark ? 0x27272a : 0xc7d2fe, isDark ? 0x18181b : 0xe2e8f0);
    groundGrid.position.set(centerX, -10, centerY);
    scene.add(groundGrid);

    // Build 3D Walls & Floor Slabs from rooms
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x27272a : 0xf1f5f9,
      roughness: 0.35,
      metalness: 0.1,
    });
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1e293b : 0xe2e8f0,
      roughness: 0.6,
      metalness: 0.1,
    });

    const wallHeight = project.buildingLevels.floorHeightMm || 3000;
    const meshesToDispose: THREE.Mesh[] = [];
    const geomsToDispose: THREE.BufferGeometry[] = [];

    project.rooms.forEach((r) => {
      // Floor Slab Mesh
      const floorGeom = new THREE.BoxGeometry(r.width, 100, r.depth);
      geomsToDispose.push(floorGeom);
      const floorMesh = new THREE.Mesh(floorGeom, floorMaterial);
      floorMesh.position.set(r.x + r.width / 2, 50, r.y + r.depth / 2);
      floorMesh.receiveShadow = true;
      scene.add(floorMesh);
      meshesToDispose.push(floorMesh);

      // 4 Perimeter Extruded Walls
      const t = r.wallExtMm;
      // North Wall
      const nGeom = new THREE.BoxGeometry(r.width, wallHeight, t);
      geomsToDispose.push(nGeom);
      const nMesh = new THREE.Mesh(nGeom, wallMaterial);
      nMesh.position.set(r.x + r.width / 2, wallHeight / 2, r.y + r.depth - t / 2);
      nMesh.castShadow = true;
      nMesh.receiveShadow = true;
      scene.add(nMesh);
      meshesToDispose.push(nMesh);

      // South Wall
      const sGeom = new THREE.BoxGeometry(r.width, wallHeight, t);
      geomsToDispose.push(sGeom);
      const sMesh = new THREE.Mesh(sGeom, wallMaterial);
      sMesh.position.set(r.x + r.width / 2, wallHeight / 2, r.y + t / 2);
      sMesh.castShadow = true;
      sMesh.receiveShadow = true;
      scene.add(sMesh);
      meshesToDispose.push(sMesh);

      // West Wall
      const wGeom = new THREE.BoxGeometry(t, wallHeight, Math.max(0, r.depth - 2 * t));
      geomsToDispose.push(wGeom);
      const wMesh = new THREE.Mesh(wGeom, wallMaterial);
      wMesh.position.set(r.x + t / 2, wallHeight / 2, r.y + r.depth / 2);
      wMesh.castShadow = true;
      wMesh.receiveShadow = true;
      scene.add(wMesh);
      meshesToDispose.push(wMesh);

      // East Wall
      const eGeom = new THREE.BoxGeometry(t, wallHeight, Math.max(0, r.depth - 2 * t));
      geomsToDispose.push(eGeom);
      const eMesh = new THREE.Mesh(eGeom, wallMaterial);
      eMesh.position.set(r.x + r.width - t / 2, wallHeight / 2, r.y + r.depth / 2);
      eMesh.castShadow = true;
      eMesh.receiveShadow = true;
      scene.add(eMesh);
      meshesToDispose.push(eMesh);
    });

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const observer = new ResizeObserver(handleResize);
    observer.observe(container);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      controls.dispose();
      renderer.dispose();
      wallMaterial.dispose();
      floorMaterial.dispose();
      geomsToDispose.forEach((g) => g.dispose());
    };
  }, [viewMode, project.rooms, project.buildingLevels.floorHeightMm, isDark, minX, maxX, minY, maxY]);

  // 2D Viewport Bounding
  const svgWidth = Math.max(10000, maxX - minX + 2500);
  const svgHeight = Math.max(10000, maxY - minY + 2500);
  const viewBoxStr = `${minX - 1200} ${minY - 1200} ${svgWidth} ${svgHeight}`;

  const showWalls = activeLayers.includes('A-WALL');
  const showDoors = activeLayers.includes('A-DOOR');
  const showDims = activeLayers.includes('A-DIMS');

  return (
    <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden relative">
      {/* Center Drafting & 3D Stage */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Floating Mini-Bar */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          {/* 2D / Split / 3D Mode Selector */}
          <div className="p-1 rounded-full glass-pill flex items-center gap-1 text-[11px] font-semibold shadow-lg">
            <button
              onClick={() => setViewMode('2d')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                viewMode === '2d' ? 'glass-pill-active' : 'opacity-65 hover:opacity-100'
              }`}
            >
              2D CAD Plan
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                viewMode === 'split' ? 'glass-pill-active' : 'opacity-65 hover:opacity-100'
              }`}
            >
              Split 2D / 3D
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                viewMode === '3d' ? 'glass-pill-active' : 'opacity-65 hover:opacity-100'
              }`}
            >
              3D Extruded Model
            </button>
          </div>

          {/* Area Metric Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill text-[11px] font-medium shadow-md">
            <span className="opacity-60">Carpet:</span>
            <span className="font-bold text-[var(--accent-hex)]">{formatArea(carpetAreaSqM, project.unitSystem)}</span>
            <span className="opacity-30">•</span>
            <span className="opacity-60">Built-Up:</span>
            <span className="font-bold">{formatArea(builtUpAreaSqM, project.unitSystem)}</span>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1 p-1 rounded-full glass-pill text-xs shadow-lg">
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.15))}
            className="w-7 h-7 rounded-full flex items-center justify-center opacity-75 hover:opacity-100 cursor-pointer"
          >
            -
          </button>
          <span className="w-12 text-center tabular-nums font-mono text-[11px]">{Math.round(zoomLevel * 100)}%</span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.15))}
            className="w-7 h-7 rounded-full flex items-center justify-center opacity-75 hover:opacity-100 cursor-pointer"
          >
            +
          </button>
        </div>

        {/* Drawing Workspace */}
        <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden">
          {/* 2D Floor Plan SVG Canvas */}
          {(viewMode === '2d' || viewMode === 'split') && (
            <div
              className={`relative overflow-hidden flex items-center justify-center select-none ${
                viewMode === 'split' ? 'w-full lg:w-1/2 h-1/2 lg:h-full border-b lg:border-b-0 lg:border-r border-current/10' : 'w-full h-full'
              }`}
            >
              <svg
                id="gfc-floor-plan-svg"
                viewBox={viewBoxStr}
                className="w-full h-full transition-transform duration-200"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <defs>
                  {/* Architectural Hatch Pattern for Walls */}
                  <pattern id="brickHatch" width="400" height="400" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="400" stroke={isDark ? '#38bdf8' : '#0284c7'} strokeWidth="40" strokeOpacity="0.25" />
                  </pattern>
                </defs>

                {/* Grid guidelines */}
                <g opacity="0.15" stroke="currentColor" strokeWidth="20" strokeDasharray="100 100">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line key={`gx-${i}`} x1={minX - 1000 + i * 1000} y1={minY - 1000} x2={minX - 1000 + i * 1000} y2={maxY + 2000} />
                  ))}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line key={`gy-${i}`} x1={minX - 1000} y1={minY - 1000 + i * 1000} x2={maxX + 2000} y2={minY - 1000 + i * 1000} />
                  ))}
                </g>

                {/* Rooms Rendering */}
                {project.rooms.map((room) => {
                  const isSelected = room.id === selectedRoomId;
                  const extT = room.wallExtMm;
                  const intW = Math.max(100, room.width - 2 * extT);
                  const intD = Math.max(100, room.depth - 2 * extT);

                  return (
                    <g key={room.id} onClick={() => setSelectedRoomId(room.id)} className="cursor-pointer">
                      {/* Room Floor Fill & Click Area */}
                      <rect
                        x={room.x}
                        y={room.y}
                        width={room.width}
                        height={room.depth}
                        fill={isSelected ? 'var(--accent-soft)' : isDark ? '#18181b' : '#f8fafc'}
                        stroke={isSelected ? 'var(--accent-hex)' : isDark ? '#3f3f46' : '#cbd5e1'}
                        strokeWidth="30"
                        className="transition-colors"
                      />

                      {/* Architectural Furniture & Fixture Vector Blocks */}
                      {renderRoomFurniture(room.name, room.x, room.y, room.width, room.depth, isDark)}

                      {/* Exterior Wall Thickness Band */}
                      {showWalls && (
                        <path
                          d={`M ${room.x} ${room.y} L ${room.x + room.width} ${room.y} L ${room.x + room.width} ${room.y + room.depth} L ${room.x} ${room.y + room.depth} Z M ${room.x + extT} ${room.y + extT} L ${room.x + extT} ${room.y + extT + intD} L ${room.x + extT + intW} ${room.y + extT + intD} L ${room.x + extT + intW} ${room.y + extT} Z`}
                          fill="url(#brickHatch)"
                          stroke={isDark ? '#e4e4e7' : '#0f172a'}
                          strokeWidth="45"
                          fillRule="evenodd"
                        />
                      )}

                      {/* Doors */}
                      {showDoors &&
                        room.doors.map((door) => {
                          let dx = room.x;
                          let dy = room.y;
                          let arcPath = '';
                          if (door.wall === 'S') {
                            dx = room.x + door.offset;
                            dy = room.y;
                            arcPath = `M ${dx} ${dy} L ${dx} ${dy + door.widthMm} A ${door.widthMm} ${door.widthMm} 0 0 0 ${dx + door.widthMm} ${dy}`;
                          } else if (door.wall === 'N') {
                            dx = room.x + door.offset;
                            dy = room.y + room.depth;
                            arcPath = `M ${dx} ${dy} L ${dx} ${dy - door.widthMm} A ${door.widthMm} ${door.widthMm} 0 0 1 ${dx + door.widthMm} ${dy}`;
                          } else if (door.wall === 'W') {
                            dx = room.x;
                            dy = room.y + door.offset;
                            arcPath = `M ${dx} ${dy} L ${dx + door.widthMm} ${dy} A ${door.widthMm} ${door.widthMm} 0 0 0 ${dx} ${dy + door.widthMm}`;
                          } else {
                            dx = room.x + room.width;
                            dy = room.y + door.offset;
                            arcPath = `M ${dx} ${dy} L ${dx - door.widthMm} ${dy} A ${door.widthMm} ${door.widthMm} 0 0 1 ${dx} ${dy + door.widthMm}`;
                          }

                          return (
                            <g key={door.id}>
                              {/* Clear wall opening */}
                              <line
                                x1={door.wall === 'E' || door.wall === 'W' ? dx : dx}
                                y1={door.wall === 'E' || door.wall === 'W' ? dy : dy}
                                x2={door.wall === 'E' || door.wall === 'W' ? dx : dx + door.widthMm}
                                y2={door.wall === 'E' || door.wall === 'W' ? dy + door.widthMm : dy}
                                stroke={isDark ? '#09090b' : '#ffffff'}
                                strokeWidth="70"
                              />
                              {/* 90-degree swing arc */}
                              <path d={arcPath} fill="none" stroke="#fbbf24" strokeWidth="25" strokeDasharray="30 20" />
                              <text x={dx + 50} y={dy + 50} fontSize="140" fill="#fbbf24" fontWeight="bold">
                                {door.tag}
                              </text>
                            </g>
                          );
                        })}

                      {/* Windows */}
                      {showDoors &&
                        room.windows.map((win) => {
                          const wx = win.wall === 'E' ? room.x + room.width : win.wall === 'W' ? room.x : room.x + win.offset;
                          const wy = win.wall === 'N' ? room.y + room.depth : win.wall === 'S' ? room.y : room.y + win.offset;
                          const isHoriz = win.wall === 'N' || win.wall === 'S';

                          return (
                            <g key={win.id}>
                              {/* Window sill frame */}
                              <rect
                                x={isHoriz ? wx : wx - extT / 2}
                                y={isHoriz ? wy - extT / 2 : wy}
                                width={isHoriz ? win.widthMm : extT}
                                height={isHoriz ? extT : win.widthMm}
                                fill={isDark ? '#1e293b' : '#e2e8f0'}
                                stroke="#38bdf8"
                                strokeWidth="25"
                              />
                              <line
                                x1={isHoriz ? wx : wx}
                                y1={isHoriz ? wy : wy}
                                x2={isHoriz ? wx + win.widthMm : wx}
                                y2={isHoriz ? wy : wy + win.widthMm}
                                stroke="#38bdf8"
                                strokeWidth="35"
                              />
                              <text x={wx + 30} y={wy - 40} fontSize="130" fill="#38bdf8" fontWeight="bold">
                                {win.tag}
                              </text>
                            </g>
                          );
                        })}

                      {/* Room Label & Dimensions */}
                      <g transform={`translate(${room.x + room.width / 2}, ${room.y + room.depth / 2})`} textAnchor="middle">
                        <text y="-80" fontSize="220" fontWeight="700" fill="currentColor">
                          {room.name}
                        </text>
                        <text y="140" fontSize="160" fontWeight="600" opacity="0.65" fill="currentColor">
                          {formatLength(intW, project.unitSystem)} × {formatLength(intD, project.unitSystem)}
                        </text>
                        <text y="320" fontSize="140" fontWeight="500" fill="var(--accent-hex)">
                          {formatArea((intW * intD) / 1000000, project.unitSystem)}
                        </text>
                      </g>

                      {/* Outer Dimension Callouts */}
                      {showDims && isSelected && (
                        <g opacity="0.85">
                          {/* Width dimension */}
                          <line x1={room.x} y1={room.y - 150} x2={room.x + room.width} y2={room.y - 150} stroke="#94a3b8" strokeWidth="25" />
                          <text x={room.x + room.width / 2} y={room.y - 220} fontSize="140" textAnchor="middle" fill="#94a3b8">
                            {formatLength(room.width, project.unitSystem)}
                          </text>
                          {/* Depth dimension */}
                          <line x1={room.x - 150} y1={room.y} x2={room.x - 150} y2={room.y + room.depth} stroke="#94a3b8" strokeWidth="25" />
                          <text x={room.x - 220} y={room.y + room.depth / 2} fontSize="140" textAnchor="end" fill="#94a3b8">
                            {formatLength(room.depth, project.unitSystem)}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          )}

          {/* 3D Extrusion Canvas */}
          {(viewMode === '3d' || viewMode === 'split') && (
            <div
              ref={container3dRef}
              className={`relative overflow-hidden ${
                viewMode === 'split' ? 'w-full lg:w-1/2 h-1/2 lg:h-full' : 'w-full h-full'
              }`}
            >
              <canvas ref={canvas3dRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
              <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full glass-pill text-[11px] flex items-center gap-2">
                <Box className="w-3.5 h-3.5 opacity-75" />
                <span>Extruded 3D Orbit View</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Parametric Inspector Sidebar */}
      <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-current/10 glass-panel p-4 flex flex-col gap-4 overflow-y-auto shrink-0 custom-scrollbar">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[var(--accent-hex)]" />
            <span className="font-semibold text-sm">Room Inspector</span>
          </div>
          <button
            onClick={handleAddRoom}
            className="px-2.5 py-1 rounded-full glass-pill-active text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>Add Room</span>
          </button>
        </div>

        {/* Room Picker Selector */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium opacity-60">Select Active Room</label>
          <select
            value={selectedRoomId}
            onChange={(e) => setSelectedRoomId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-current/15 bg-transparent text-xs font-semibold cursor-pointer"
          >
            {project.rooms.map((r) => (
              <option key={r.id} value={r.id} className={isDark ? 'bg-zinc-900 text-white' : 'bg-white text-black'}>
                {r.name} ({r.width / 1000}×{r.depth / 1000}m)
              </option>
            ))}
          </select>
        </div>

        {selectedRoom && (
          <div className="space-y-4 text-xs">
            {/* Room Name */}
            <div className="space-y-1">
              <label className="text-[11px] opacity-60">Room Label</label>
              <input
                type="text"
                value={selectedRoom.name}
                onChange={(e) => handleUpdateRoom({ ...selectedRoom, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-current/15 bg-transparent font-medium"
              />
            </div>

            {/* Width & Depth Inputs */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] opacity-60">Width (X) mm</label>
                <input
                  type="number"
                  step="100"
                  value={selectedRoom.width}
                  onChange={(e) => handleUpdateRoom({ ...selectedRoom, width: Math.max(1000, Number(e.target.value)) })}
                  className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] opacity-60">Depth (Y) mm</label>
                <input
                  type="number"
                  step="100"
                  value={selectedRoom.depth}
                  onChange={(e) => handleUpdateRoom({ ...selectedRoom, depth: Math.max(1000, Number(e.target.value)) })}
                  className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
                />
              </div>
            </div>

            {/* Position X & Y */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] opacity-60">Offset X mm</label>
                <input
                  type="number"
                  step="100"
                  value={selectedRoom.x}
                  onChange={(e) => handleUpdateRoom({ ...selectedRoom, x: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] opacity-60">Offset Y mm</label>
                <input
                  type="number"
                  step="100"
                  value={selectedRoom.y}
                  onChange={(e) => handleUpdateRoom({ ...selectedRoom, y: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 rounded-xl border border-current/15 bg-transparent tabular-nums"
                />
              </div>
            </div>

            {/* Wall Thickness */}
            <div className="space-y-1">
              <label className="text-[11px] opacity-60">Wall Thickness</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateRoom({ ...selectedRoom, wallExtMm: 230 })}
                  className={`py-1.5 rounded-lg border text-center font-semibold cursor-pointer ${
                    selectedRoom.wallExtMm === 230 ? 'glass-pill-active border-[var(--accent-hex)]' : 'border-current/15 opacity-60'
                  }`}
                >
                  230 mm (9" Ext)
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateRoom({ ...selectedRoom, wallExtMm: 115 })}
                  className={`py-1.5 rounded-lg border text-center font-semibold cursor-pointer ${
                    selectedRoom.wallExtMm === 115 ? 'glass-pill-active border-[var(--accent-hex)]' : 'border-current/15 opacity-60'
                  }`}
                >
                  115 mm (4.5" Part)
                </button>
              </div>
            </div>

            {/* Door Controls */}
            <div className="pt-2 border-t border-current/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold flex items-center gap-1.5 text-xs">
                  <DoorOpen className="w-3.5 h-3.5 text-amber-400" />
                  Doors ({selectedRoom.doors.length})
                </span>
                <button
                  onClick={() => {
                    const newDoor = {
                      id: `d-${Date.now()}`,
                      wall: 'S' as const,
                      offset: 1000,
                      widthMm: 900,
                      tag: `D${selectedRoom.doors.length + 1}`,
                    };
                    handleUpdateRoom({ ...selectedRoom, doors: [...selectedRoom.doors, newDoor] });
                  }}
                  className="text-[10px] text-[var(--accent-hex)] underline font-medium cursor-pointer"
                >
                  + Add Door
                </button>
              </div>

              {selectedRoom.doors.map((door, idx) => (
                <div key={door.id} className="p-2 rounded-xl bg-current/5 flex items-center justify-between gap-2 text-[11px]">
                  <span className="font-bold">{door.tag}</span>
                  <select
                    value={door.wall}
                    onChange={(e) => {
                      const nextDoors = [...selectedRoom.doors];
                      nextDoors[idx] = { ...door, wall: e.target.value as 'N' | 'S' | 'E' | 'W' };
                      handleUpdateRoom({ ...selectedRoom, doors: nextDoors });
                    }}
                    className="bg-transparent border border-current/15 rounded px-1 text-[10px]"
                  >
                    <option value="N">North Wall</option>
                    <option value="S">South Wall</option>
                    <option value="W">West Wall</option>
                    <option value="E">East Wall</option>
                  </select>
                  <span>{door.widthMm}mm</span>
                  <button
                    onClick={() => {
                      handleUpdateRoom({
                        ...selectedRoom,
                        doors: selectedRoom.doors.filter((d) => d.id !== door.id),
                      });
                    }}
                    className="text-rose-500 hover:opacity-100 cursor-pointer p-0.5"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Delete Room */}
            {project.rooms.length > 1 && (
              <button
                onClick={() => handleDeleteRoom(selectedRoom.id)}
                className="w-full mt-4 py-2 rounded-xl text-rose-500 border border-rose-500/25 hover:bg-rose-500/10 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Room</span>
              </button>
            )}
          </div>
        )}
      </aside>
    </div>
  );
};
