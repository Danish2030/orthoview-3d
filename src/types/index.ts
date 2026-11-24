export type SolidType =
  | 'l-block'
  | 'u-block'
  | 'hex-prism'
  | 'square-prism'
  | 'square-pyramid'
  | 'hex-pyramid'
  | 'pent-pyramid'
  | 'cone'
  | 'cone-frustum'
  | 'cylinder-hole'
  | 'counterbore'
  | 'v-block'
  | 'tri-prism'
  | 'machined-bracket'
  | 'ribbed-block'
  | 'slotted-cylinder-bracket'
  | 'custom-composite';

export interface CompositePartSpec {
  baseLength: number;     // X (e.g. 140)
  baseWidth: number;      // Z (e.g. 50)
  baseThickness: number;  // Y (e.g. 10)
  hasEndSlots: boolean;
  slotDepth: number;      // along X from each end (e.g. 30)
  slotWidth: number;      // along Z (e.g. 20)
  bossShape: 'cylinder' | 'box' | 'none';
  bossDiameter: number;   // outer diameter or X width (e.g. 64)
  bossDepth: number;      // Z width for box boss
  totalHeight: number;    // total Y height from bottom of base (e.g. 50)
  hasHole: boolean;
  holeDiameter: number;   // inner hole diameter (e.g. 40)
  holeDepth: number;      // blind depth from top, or >= totalHeight for through hole (e.g. 24)
}

export interface TitleBlockMeta {
  name: string;
  className: string;
  rollNo: string;
  dwgNo: string;
  date: string;
  scale: string;
  grade: string;
  valuedBy: string;
}

export interface TitleBlockFieldsConfig {
  name: boolean;
  title: boolean;
  className: boolean;
  rollNo: boolean;
  dwgNo: boolean;
  date: boolean;
  grade: boolean;
  valuedBy: boolean;
  scale: boolean;
  projectionSymbol: boolean;
}

export type QuadrantDividerStyle = 'dotted' | 'solid' | 'none';

export interface TitleBlockOptions {
  enabled: boolean;
  showUnitsNote: boolean;
  dividerStyle?: QuadrantDividerStyle;
  fields: TitleBlockFieldsConfig;
}

export const DEFAULT_TITLE_BLOCK_FIELDS: TitleBlockFieldsConfig = {
  name: true,
  title: true,
  className: true,
  rollNo: true,
  dwgNo: true,
  date: true,
  grade: true,
  valuedBy: true,
  scale: true,
  projectionSymbol: true,
};

export const DEFAULT_TITLE_BLOCK_OPTIONS: TitleBlockOptions = {
  enabled: true,
  showUnitsNote: true,
  dividerStyle: 'dotted',
  fields: DEFAULT_TITLE_BLOCK_FIELDS,
};

export interface SolidDimensions {
  length: number; // L in mm (along X)
  width: number;  // W in mm (along Z)
  height: number; // H in mm (along Y)
}

export interface SolidRotation {
  x: number; // in degrees (0 - 360)
  y: number; // in degrees (0 - 360)
  z: number; // in degrees (0 - 360)
}

export type ThemeMode = 'blueprint' | 'paper';
export type RenderStyle = 'aluminum' | 'steel' | 'polymer' | 'glass' | 'anodized';
export type TransferMethod = 'miter' | 'compass';
export type SideViewMode = 'left' | 'right';
export type AppView = 'landing' | 'dashboard' | 'studio';
export type StudioModule = 'orthographic' | 'lines' | 'planometric';

export interface LineProblemParams {
  trueLength: number;
  distHP: number;
  distVP: number;
  thetaHP: number;
  phiVP: number;
}

export interface PlanometricBlock {
  id: string;
  label: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  dz: number;
}

export interface PlanometricParams {
  baseX: number;
  baseY: number;
  blocks: PlanometricBlock[];
}

export interface UserProfile {
  name: string;
  email: string;
  branch: string;
  initials: string;
}

export interface SavedQuestionRecord {
  id: string;
  title: string;
  question: string;
  module?: StudioModule;
  solidType: SolidType;
  dimensions: SolidDimensions;
  rotation: SolidRotation;
  sideViewMode?: SideViewMode;
  lineParams?: LineProblemParams;
  planometricParams?: PlanometricParams;
  compositeSpec?: CompositePartSpec;
  createdAt: string;
}

export interface DisplayOptions {
  showHiddenLines: boolean;
  showProjectors: boolean;
  showDimensions: boolean;
  showMiterLine: boolean;
  show3DPlanes: boolean;
  show3DGrid: boolean;
  show3DAxes: boolean;
  showSightArrows: boolean;
  showCenterLines: boolean;
  showHatching: boolean;
  showContactShadow: boolean;
  renderStyle: RenderStyle;
  transferMethod: TransferMethod;
  sideViewMode: SideViewMode;
  unfoldProgress: number;
}

export interface SolidPreset {
  id: SolidType;
  name: string;
  category: string;
  description: string;
  defaultDimensions: SolidDimensions;
  iconName: string;
}
