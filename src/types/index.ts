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
  | 'ribbed-block';

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
  trueLength: number; // mm
  distHP: number;     // End A distance above HP (mm)
  distVP: number;     // End A distance in front of VP (mm)
  thetaHP: number;    // True inclination to HP (degrees)
  phiVP: number;      // True inclination to VP (degrees)
}

export interface PlanometricBlock {
  id: string;
  label: string;
  x: number;  // offset from left edge (mm)
  y: number;  // offset from bottom edge (mm)
  dx: number; // length along X (mm)
  dy: number; // depth along Y (mm)
  dz: number; // height along Z (mm)
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
