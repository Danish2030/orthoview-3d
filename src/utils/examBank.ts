import {
  LineProblemParams,
  PlanometricParams,
  SideViewMode,
  SolidDimensions,
  SolidRotation,
  SolidType,
  StudioModule,
} from '../types';

export interface ExamBankQuestion {
  id: string;
  qNo: string;
  moduleLabel: string;
  title: string;
  statement: string;
  targetModule: StudioModule;
  solidType?: SolidType;
  dimensions?: SolidDimensions;
  rotation?: SolidRotation;
  sideViewMode?: SideViewMode;
  lineParams?: LineProblemParams;
  planometricParams?: PlanometricParams;
  phase2Note?: string;
}

export const Q1_DEFAULT_LINE: LineProblemParams = {
  trueLength: 60,
  distHP: 0,
  distVP: 30,
  thetaHP: 30,
  phiVP: 45,
};

export const Q2_DEFAULT_PLANOMETRIC: PlanometricParams = {
  baseX: 100,
  baseY: 50,
  blocks: [
    { id: 'b1', label: 'Block A (25/25/25)', x: 0, y: 25, dx: 25, dy: 25, dz: 25 },
    { id: 'b2', label: 'Block B (20/10/10)', x: 50, y: 10, dx: 20, dy: 10, dz: 10 },
    { id: 'b3', label: 'Block C (30/20/20)', x: 70, y: 0, dx: 30, dy: 20, dz: 20 },
  ],
};

export const EXAM_BANK_24EST1004C: ExamBankQuestion[] = [
  {
    id: 'qp-q1',
    qNo: 'Q1',
    moduleLabel: 'Module 1',
    title: 'Inclined Straight Line & Traces',
    statement:
      'A line AB 60 mm long has one of its ends in HP and 30 mm in front of VP. The line is inclined at 30° to HP and 45° to VP. Draw the projections, determine the length of front view, and locate traces.',
    targetModule: 'lines',
    lineParams: Q1_DEFAULT_LINE,
  },
  {
    id: 'qp-q2',
    qNo: 'Q2',
    moduleLabel: 'Module 1',
    title: 'Planometric View (100×50 Base + 3 Blocks)',
    statement:
      'Draw the planometric view of the 100 × 50 mm base plate containing blocks X/Y/Z = 25/25/25, 20/10/10, and 30/20/20 mm.',
    targetModule: 'planometric',
    planometricParams: Q2_DEFAULT_PLANOMETRIC,
  },
  {
    id: 'qp-q3',
    qNo: 'Q3',
    moduleLabel: 'Module 2',
    title: 'Hexagonal Pyramid on Base Corner',
    statement:
      'A hexagonal pyramid of base edge 25 mm and height 60 mm rests on a corner of its base such that the slant edge makes 45° with HP and the axis makes 40° with VP in top view.',
    targetModule: 'orthographic',
    solidType: 'hex-pyramid',
    dimensions: { length: 50, width: 50, height: 60 },
    rotation: { x: 45, y: 40, z: 0 },
    sideViewMode: 'left',
  },
  {
    id: 'qp-q4',
    qNo: 'Q4',
    moduleLabel: 'Module 2',
    title: 'Cone Lying on Generator in HP',
    statement:
      'Draw the projections of a cone of base circle diameter 40 mm and axis 60 mm long lying on its generator in HP with the top view of its axis inclined at 30° to VP.',
    targetModule: 'orthographic',
    solidType: 'cone',
    dimensions: { length: 40, width: 40, height: 60 },
    rotation: { x: 72, y: 30, z: 0 },
    sideViewMode: 'left',
  },
  {
    id: 'qp-q5',
    qNo: 'Q5',
    moduleLabel: 'Module 3',
    title: 'Cut Square Prism & Surface Development',
    statement:
      'A square prism of base 30 mm and height 70 mm rests on HP with one base edge perpendicular to VP. It is cut by a section plane inclined 40° to HP through the axis midpoint. Develop the lateral surfaces.',
    targetModule: 'orthographic',
    solidType: 'square-prism',
    dimensions: { length: 30, width: 30, height: 70 },
    rotation: { x: 0, y: 0, z: 0 },
    sideViewMode: 'left',
    phase2Note: 'Base solid loaded. Interactive 40° cutting plane & surface unfolding arrive in Phase 2 (v3.2).',
  },
  {
    id: 'qp-q6',
    qNo: 'Q6',
    moduleLabel: 'Module 3',
    title: 'Section of Cone & True Shape',
    statement:
      'A cone of base diameter 50 mm and height 70 mm rests on HP. Cut by a section plane inclined at 40° to HP passing 30 mm below the apex. Draw sectional views and true shape.',
    targetModule: 'orthographic',
    solidType: 'cone',
    dimensions: { length: 50, width: 50, height: 70 },
    rotation: { x: 0, y: 0, z: 0 },
    sideViewMode: 'left',
    phase2Note: 'Base cone loaded. Interactive section plane, 45° hatching & true shape arrive in Phase 2 (v3.2).',
  },
  {
    id: 'qp-q7',
    qNo: 'Q7',
    moduleLabel: 'Module 4',
    title: 'Isometric View: Sphere on Hexagonal Prism',
    statement:
      'Draw the isometric view of a sphere of radius 15 mm kept centrally over a hexagonal prism of base edge 30 mm and height 40 mm resting on HP.',
    targetModule: 'orthographic',
    solidType: 'hex-prism',
    dimensions: { length: 60, width: 60, height: 40 },
    rotation: { x: 0, y: 0, z: 0 },
    sideViewMode: 'left',
    phase2Note: 'Base hexagonal prism loaded. Compound Isometric stacking & 0.816× scale arrive in Phase 2 (v3.2).',
  },
  {
    id: 'qp-q8',
    qNo: 'Q8',
    moduleLabel: 'Module 4',
    title: 'Perspective View: Pentagonal Pyramid',
    statement:
      'A pentagonal pyramid of base edge 25 mm and axis 60 mm rests on GP with one base edge parallel and 10 mm behind PP. Station point is 25 mm in front of PP, 50 mm right of axis, 60 mm above GP.',
    targetModule: 'orthographic',
    solidType: 'pent-pyramid',
    dimensions: { length: 42, width: 42, height: 60 },
    rotation: { x: 0, y: 0, z: 0 },
    sideViewMode: 'left',
    phase2Note: 'Base pentagonal pyramid loaded. Station-Point Perspective engine arrives in Phase 2 (v3.2).',
  },
  {
    id: 'qp-q9',
    qNo: 'Q9',
    moduleLabel: 'Module 5',
    title: 'Slotted Machined Bracket (FV, TV & RHSV)',
    statement:
      'Draw the Top View, Front View, and Right-Hand Side View (RHSV) of the 100 × 64 × 75 mm slotted machined bracket.',
    targetModule: 'orthographic',
    solidType: 'machined-bracket',
    dimensions: { length: 100, width: 64, height: 75 },
    rotation: { x: 0, y: 0, z: 0 },
    sideViewMode: 'right',
  },
  {
    id: 'qp-q10',
    qNo: 'Q10',
    moduleLabel: 'Module 5',
    title: 'Tapered Slotted Block (FV, TV & LHSV)',
    statement:
      'Draw the Top View, Front View, and Left-Hand Side View (LHSV) of the 86 × 34 × 56 mm tapered centrally slotted block.',
    targetModule: 'orthographic',
    solidType: 'ribbed-block',
    dimensions: { length: 86, width: 34, height: 56 },
    rotation: { x: 0, y: 0, z: 0 },
    sideViewMode: 'left',
  },
];
