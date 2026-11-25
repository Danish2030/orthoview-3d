export type UnitSystem = 'metric' | 'imperial';

export type ProModuleId =
  | 'floor-plan'
  | 'column-grid'
  | 'staircase'
  | 'elevation-section'
  | 'mep-overlay'
  | 'site-far'
  | 'boq-schedule';

export type CadLayerId =
  | 'A-WALL'
  | 'A-DOOR'
  | 'S-COLS'
  | 'E-LITE'
  | 'P-PIPE'
  | 'M-HVAC'
  | 'A-DIMS';

export interface CadLayerConfig {
  id: CadLayerId;
  label: string;
  color: string;
  visible: boolean;
  lineWeight: number;
}

export const DEFAULT_CAD_LAYERS: CadLayerConfig[] = [
  { id: 'A-WALL', label: 'Walls & Slabs (A-WALL)', color: '#38bdf8', visible: true, lineWeight: 0.5 },
  { id: 'A-DOOR', label: 'Doors & Windows (A-DOOR)', color: '#fbbf24', visible: true, lineWeight: 0.25 },
  { id: 'S-COLS', label: 'Columns & Footings (S-COLS)', color: '#ef4444', visible: true, lineWeight: 0.35 },
  { id: 'E-LITE', label: 'Electrical & Lighting (E-LITE)', color: '#eab308', visible: true, lineWeight: 0.25 },
  { id: 'P-PIPE', label: 'Plumbing & Drainage (P-PIPE)', color: '#06b6d4', visible: true, lineWeight: 0.3 },
  { id: 'M-HVAC', label: 'HVAC & Ducts (M-HVAC)', color: '#a855f7', visible: true, lineWeight: 0.3 },
  { id: 'A-DIMS', label: 'Dimensions & Grids (A-DIMS)', color: '#94a3b8', visible: true, lineWeight: 0.18 },
];

export interface GfcRevision {
  rev: string;
  date: string;
  description: string;
  status: 'Tender' | 'Approval' | 'GFC';
}

export interface GfcSheetMeta {
  projectTitle: string;
  clientName: string;
  architectName: string;
  contractorName: string;
  drawingNo: string;
  sheetSize: 'A1' | 'A2' | 'A3';
  scale: '1:50' | '1:100' | '1:200';
  northAngle: number;
  revisions: GfcRevision[];
}

export interface ProRoomDoor {
  id: string;
  wall: 'N' | 'S' | 'E' | 'W';
  offset: number; // mm from wall start
  widthMm: number; // e.g. 900, 1000
  tag: string; // e.g. 'D1', 'D2'
}

export interface ProRoomWindow {
  id: string;
  wall: 'N' | 'S' | 'E' | 'W';
  offset: number; // mm from wall start
  widthMm: number; // e.g. 1200, 1500
  sillMm: number; // e.g. 900
  heightMm: number; // e.g. 1200
  tag: string; // e.g. 'W1', 'W2', 'V1'
}

export interface ProRoom {
  id: string;
  name: string;
  x: number; // mm
  y: number; // mm
  width: number; // mm (X span)
  depth: number; // mm (Y span)
  wallExtMm: number; // e.g. 230
  wallIntMm: number; // e.g. 115
  doors: ProRoomDoor[];
  windows: ProRoomWindow[];
  floorType?: 'vitrified' | 'granite' | 'anti-skid' | 'hardwood';
}

export interface ColumnItem {
  id: string;
  gridX: string;
  gridY: string;
  x: number; // mm
  y: number; // mm
  widthMm: number; // e.g. 230
  depthMm: number; // e.g. 450
  footingType: 'isolated' | 'combined' | 'raft';
  footingWidthMm: number;
  footingLengthMm: number;
  mainBarsCount: number;
  mainBarsDiaMm: number;
  stirrupDiaMm: number;
  stirrupSpacingMm: number;
}

export interface ColumnGridConfig {
  xSpans: { label: string; spanMm: number }[];
  ySpans: { label: string; spanMm: number }[];
  columns: ColumnItem[];
  showPlinthBeam: boolean;
  beamWidthMm: number;
  beamDepthMm: number;
}

export interface StaircaseConfig {
  type: 'dog-legged' | 'l-shaped' | 'open-well';
  floorHeightMm: number;
  riserMm: number;
  treadMm: number;
  flightWidthMm: number;
  waistSlabMm: number;
  landingWidthMm: number;
  handrailHeightMm: number;
}

export interface BuildingLevels {
  plinthHeightMm: number;
  floorHeightMm: number;
  sillLevelMm: number;
  lintelLevelMm: number;
  slabThicknessMm: number;
  parapetHeightMm: number;
  numFloors: number;
}

export interface SitePlotParams {
  plotWidthMm: number;
  plotDepthMm: number;
  roadWidthMm: number;
  roadLocation: 'front' | 'rear' | 'left' | 'right';
  setbackFrontMm: number;
  setbackRearMm: number;
  setbackLeftMm: number;
  setbackRightMm: number;
  proposedFloors: number;
  maxPermissibleFar: number;
  maxGroundCoveragePct: number;
  northAngleDeg: number;
}

export interface MepNode {
  id: string;
  roomId: string;
  type: 'light' | 'switch' | 'ac' | 'tap' | 'drain' | 'ic' | 'diffuser' | 'db';
  discipline: 'electrical' | 'plumbing' | 'hvac';
  x: number;
  y: number;
  tag: string;
  specs?: string;
}

export interface BoqSettings {
  brickType: 'clay-brick' | 'aac-block';
  tileSizeMm: 600 | 800;
  concreteGrade: 'M20' | 'M25';
  steelRateKg: number;
  cementBagRate: number;
}

export interface ProProjectState {
  id: string;
  name: string;
  unitSystem: UnitSystem;
  activeLayerIds: CadLayerId[];
  layers: CadLayerConfig[];
  rooms: ProRoom[];
  buildingLevels: BuildingLevels;
  columnGrid: ColumnGridConfig;
  staircase: StaircaseConfig;
  sitePlot: SitePlotParams;
  mepNodes: MepNode[];
  gfcMeta: GfcSheetMeta;
  boqSettings: BoqSettings;
}

export const DEFAULT_PRO_PROJECT: ProProjectState = {
  id: 'proj-default-2bhk',
  name: 'Sunrise Villa (2BHK G+1)',
  unitSystem: 'metric',
  activeLayerIds: ['A-WALL', 'A-DOOR', 'S-COLS', 'E-LITE', 'P-PIPE', 'M-HVAC', 'A-DIMS'],
  layers: DEFAULT_CAD_LAYERS,
  rooms: [
    {
      id: 'room-1',
      name: 'Sit-Out / Verandah',
      x: 0,
      y: 0,
      width: 4500,
      depth: 1800,
      wallExtMm: 230,
      wallIntMm: 115,
      doors: [{ id: 'd-so-1', wall: 'S', offset: 1600, widthMm: 1200, tag: 'D-Main' }],
      windows: [],
      floorType: 'granite',
    },
    {
      id: 'room-2',
      name: 'Living & Dining Room',
      x: 0,
      y: 1800,
      width: 4500,
      depth: 4200,
      wallExtMm: 230,
      wallIntMm: 115,
      doors: [
        { id: 'd-liv-1', wall: 'N', offset: 1800, widthMm: 1000, tag: 'D1' },
        { id: 'd-liv-2', wall: 'E', offset: 2200, widthMm: 900, tag: 'D2' },
      ],
      windows: [
        { id: 'w-liv-1', wall: 'W', offset: 1200, widthMm: 1500, sillMm: 900, heightMm: 1200, tag: 'W1' },
        { id: 'w-liv-2', wall: 'W', offset: 2800, widthMm: 1200, sillMm: 900, heightMm: 1200, tag: 'W2' },
      ],
      floorType: 'vitrified',
    },
    {
      id: 'room-3',
      name: 'Kitchen & Utility',
      x: 4500,
      y: 1800,
      width: 3200,
      depth: 3000,
      wallExtMm: 230,
      wallIntMm: 115,
      doors: [{ id: 'd-kit-1', wall: 'W', offset: 800, widthMm: 900, tag: 'D2' }],
      windows: [{ id: 'w-kit-1', wall: 'E', offset: 1000, widthMm: 1200, sillMm: 1050, heightMm: 1000, tag: 'W3' }],
      floorType: 'anti-skid',
    },
    {
      id: 'room-4',
      name: 'Master Bedroom',
      x: 0,
      y: 6000,
      width: 4000,
      depth: 3800,
      wallExtMm: 230,
      wallIntMm: 115,
      doors: [{ id: 'd-mbr-1', wall: 'S', offset: 1000, widthMm: 900, tag: 'D2' }],
      windows: [
        { id: 'w-mbr-1', wall: 'W', offset: 1200, widthMm: 1500, sillMm: 900, heightMm: 1200, tag: 'W1' },
        { id: 'w-mbr-2', wall: 'N', offset: 1400, widthMm: 1200, sillMm: 900, heightMm: 1200, tag: 'W2' },
      ],
      floorType: 'hardwood',
    },
    {
      id: 'room-5',
      name: 'Bedroom 2',
      x: 4000,
      y: 4800,
      width: 3700,
      depth: 3400,
      wallExtMm: 230,
      wallIntMm: 115,
      doors: [{ id: 'd-bed2-1', wall: 'W', offset: 800, widthMm: 900, tag: 'D2' }],
      windows: [{ id: 'w-bed2-1', wall: 'E', offset: 1100, widthMm: 1400, sillMm: 900, heightMm: 1200, tag: 'W2' }],
      floorType: 'vitrified',
    },
    {
      id: 'room-6',
      name: 'Common Toilet / Bath',
      x: 4500,
      y: 8200,
      width: 2400,
      depth: 1600,
      wallExtMm: 230,
      wallIntMm: 115,
      doors: [{ id: 'd-bth-1', wall: 'W', offset: 400, widthMm: 750, tag: 'D3' }],
      windows: [{ id: 'w-bth-1', wall: 'N', offset: 800, widthMm: 600, sillMm: 1800, heightMm: 600, tag: 'V1' }],
      floorType: 'anti-skid',
    },
  ],
  buildingLevels: {
    plinthHeightMm: 600,
    floorHeightMm: 3000,
    sillLevelMm: 900,
    lintelLevelMm: 2100,
    slabThicknessMm: 125,
    parapetHeightMm: 900,
    numFloors: 1,
  },
  columnGrid: {
    xSpans: [
      { label: 'A-B', spanMm: 4500 },
      { label: 'B-C', spanMm: 3200 },
    ],
    ySpans: [
      { label: '1-2', spanMm: 1800 },
      { label: '2-3', spanMm: 4200 },
      { label: '3-4', spanMm: 3800 },
    ],
    columns: [
      { id: 'c1', gridX: 'A', gridY: '1', x: 0, y: 0, widthMm: 230, depthMm: 450, footingType: 'isolated', footingWidthMm: 1500, footingLengthMm: 1500, mainBarsCount: 6, mainBarsDiaMm: 16, stirrupDiaMm: 8, stirrupSpacingMm: 150 },
      { id: 'c2', gridX: 'B', gridY: '1', x: 4500, y: 0, widthMm: 230, depthMm: 450, footingType: 'isolated', footingWidthMm: 1500, footingLengthMm: 1500, mainBarsCount: 6, mainBarsDiaMm: 16, stirrupDiaMm: 8, stirrupSpacingMm: 150 },
      { id: 'c3', gridX: 'A', gridY: '2', x: 0, y: 1800, widthMm: 230, depthMm: 450, footingType: 'isolated', footingWidthMm: 1500, footingLengthMm: 1500, mainBarsCount: 6, mainBarsDiaMm: 16, stirrupDiaMm: 8, stirrupSpacingMm: 150 },
      { id: 'c4', gridX: 'B', gridY: '2', x: 4500, y: 1800, widthMm: 230, depthMm: 450, footingType: 'isolated', footingWidthMm: 1650, footingLengthMm: 1650, mainBarsCount: 8, mainBarsDiaMm: 16, stirrupDiaMm: 8, stirrupSpacingMm: 150 },
      { id: 'c5', gridX: 'C', gridY: '2', x: 7700, y: 1800, widthMm: 230, depthMm: 450, footingType: 'isolated', footingWidthMm: 1500, footingLengthMm: 1500, mainBarsCount: 6, mainBarsDiaMm: 16, stirrupDiaMm: 8, stirrupSpacingMm: 150 },
      { id: 'c6', gridX: 'A', gridY: '3', x: 0, y: 6000, widthMm: 230, depthMm: 450, footingType: 'isolated', footingWidthMm: 1650, footingLengthMm: 1650, mainBarsCount: 8, mainBarsDiaMm: 16, stirrupDiaMm: 8, stirrupSpacingMm: 150 },
      { id: 'c7', gridX: 'B', gridY: '3', x: 4500, y: 6000, widthMm: 230, depthMm: 450, footingType: 'isolated', footingWidthMm: 1650, footingLengthMm: 1650, mainBarsCount: 8, mainBarsDiaMm: 16, stirrupDiaMm: 8, stirrupSpacingMm: 150 },
      { id: 'c8', gridX: 'C', gridY: '3', x: 7700, y: 6000, widthMm: 230, depthMm: 450, footingType: 'isolated', footingWidthMm: 1500, footingLengthMm: 1500, mainBarsCount: 6, mainBarsDiaMm: 16, stirrupDiaMm: 8, stirrupSpacingMm: 150 },
      { id: 'c9', gridX: 'A', gridY: '4', x: 0, y: 9800, widthMm: 230, depthMm: 450, footingType: 'isolated', footingWidthMm: 1500, footingLengthMm: 1500, mainBarsCount: 6, mainBarsDiaMm: 16, stirrupDiaMm: 8, stirrupSpacingMm: 150 },
      { id: 'c10', gridX: 'B', gridY: '4', x: 4500, y: 9800, widthMm: 230, depthMm: 450, footingType: 'isolated', footingWidthMm: 1500, footingLengthMm: 1500, mainBarsCount: 6, mainBarsDiaMm: 16, stirrupDiaMm: 8, stirrupSpacingMm: 150 },
    ],
    showPlinthBeam: true,
    beamWidthMm: 230,
    beamDepthMm: 380,
  },
  staircase: {
    type: 'dog-legged',
    floorHeightMm: 3000,
    riserMm: 150,
    treadMm: 300,
    flightWidthMm: 1000,
    waistSlabMm: 150,
    landingWidthMm: 1000,
    handrailHeightMm: 900,
  },
  sitePlot: {
    plotWidthMm: 15000,
    plotDepthMm: 20000,
    roadWidthMm: 9000,
    roadLocation: 'front',
    setbackFrontMm: 3000,
    setbackRearMm: 2000,
    setbackLeftMm: 1500,
    setbackRightMm: 1500,
    proposedFloors: 1,
    maxPermissibleFar: 2.0,
    maxGroundCoveragePct: 60,
    northAngleDeg: 0,
  },
  mepNodes: [
    { id: 'mep-1', roomId: 'room-1', type: 'light', discipline: 'electrical', x: 2250, y: 900, tag: 'L1', specs: '12W Warm Recessed LED' },
    { id: 'mep-2', roomId: 'room-2', type: 'db', discipline: 'electrical', x: 200, y: 2200, tag: 'DB-1', specs: '8-Way 3-Phase MCB DB' },
    { id: 'mep-3', roomId: 'room-2', type: 'light', discipline: 'electrical', x: 2250, y: 3900, tag: 'L2', specs: '18W Panel Light' },
    { id: 'mep-4', roomId: 'room-2', type: 'ac', discipline: 'electrical', x: 4300, y: 3000, tag: 'AC-1', specs: '1.5 Ton Split AC Point' },
    { id: 'mep-5', roomId: 'room-3', type: 'tap', discipline: 'plumbing', x: 6500, y: 2200, tag: 'SINK-1', specs: 'Kitchen Double Bowl SS Sink' },
    { id: 'mep-6', roomId: 'room-3', type: 'drain', discipline: 'plumbing', x: 6700, y: 2000, tag: 'GT-1', specs: '75mm Nahani Trap' },
    { id: 'mep-7', roomId: 'room-6', type: 'tap', discipline: 'plumbing', x: 5000, y: 8800, tag: 'EWC-1', specs: 'Wall-Hung Commode with Flush Valve' },
    { id: 'mep-8', roomId: 'room-6', type: 'drain', discipline: 'plumbing', x: 5200, y: 9000, tag: 'IC-1', specs: '110mm Soil Pipe to Inspection Chamber' },
    { id: 'mep-9', roomId: 'room-4', type: 'diffuser', discipline: 'hvac', x: 2000, y: 7900, tag: 'DIFF-1', specs: 'Linear Slot Supply Diffuser' },
  ],
  gfcMeta: {
    projectTitle: 'Sunrise Villa Residential Project',
    clientName: 'Er. Rajesh & Family',
    architectName: 'Studio ArchForm / VectorDesk',
    contractorName: 'BuildCon Infrastructure Ltd.',
    drawingNo: 'VD-GFC-01',
    sheetSize: 'A1',
    scale: '1:100',
    northAngle: 0,
    revisions: [
      { rev: 'R0', date: '12/10/2026', description: 'Initial Concept & Tender', status: 'Tender' },
      { rev: 'R1', date: '04/11/2026', description: 'Client Approval & Municipal Check', status: 'Approval' },
      { rev: 'R2', date: '25/11/2026', description: 'Good For Construction Release', status: 'GFC' },
    ],
  },
  boqSettings: {
    brickType: 'clay-brick',
    tileSizeMm: 600,
    concreteGrade: 'M25',
    steelRateKg: 78,
    cementBagRate: 420,
  },
};
