export type SolidType =
  | 'l-block'
  | 'u-block'
  | 'hex-prism'
  | 'square-pyramid'
  | 'cone-frustum'
  | 'cylinder-hole'
  | 'counterbore'
  | 'v-block'
  | 'tri-prism';

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
  unfoldProgress: number; // 0% (folded 3D box) to 100% (fully flattened 2D sheet)
}

export interface SolidPreset {
  id: SolidType;
  name: string;
  category: string;
  description: string;
  defaultDimensions: SolidDimensions;
  iconName: string;
}
