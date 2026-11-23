import {
  LineProblemParams,
  PlanometricParams,
  SideViewMode,
  SolidDimensions,
  SolidRotation,
  SolidType,
  StudioModule,
} from '../types';
import { SOLID_PRESETS } from './geometryGenerators';
import { Q1_DEFAULT_LINE, Q2_DEFAULT_PLANOMETRIC } from './examBank';

export interface ParsedQuestionResult {
  targetModule: StudioModule;
  solidType: SolidType;
  solidName: string;
  dimensions: SolidDimensions;
  rotation: SolidRotation;
  sideViewMode: SideViewMode;
  lineParams?: LineProblemParams;
  planometricParams?: PlanometricParams;
  confidence: 'high' | 'medium' | 'low';
  notes: string[];
}

const clampDim = (val: number): number => Math.max(15, Math.min(150, Math.round(val)));
const normalizeAngle = (val: number): number => ((Math.round(val) % 360) + 360) % 360;

const SOLID_KEYWORDS: { type: SolidType; keywords: string[] }[] = [
  { type: 'hex-pyramid', keywords: ['hexagonal pyramid', 'hex pyramid', 'hexagon pyramid'] },
  { type: 'pent-pyramid', keywords: ['pentagonal pyramid', 'pent pyramid', 'pentagon pyramid'] },
  { type: 'square-pyramid', keywords: ['square pyramid', 'pyramid', 'apex', 'slant edge'] },
  { type: 'hex-prism', keywords: ['hexagonal prism', 'hex prism', 'hexagon prism', 'hexagonal'] },
  { type: 'square-prism', keywords: ['square prism', 'rectangular prism', 'cube'] },
  { type: 'cone-frustum', keywords: ['frustum', 'truncated cone'] },
  { type: 'cone', keywords: ['cone', 'generator'] },
  { type: 'machined-bracket', keywords: ['machined bracket', 'bracket', 'right side view', 'rhsv'] },
  { type: 'ribbed-block', keywords: ['ribbed block', 'tapered block', 'tapered'] },
  { type: 'counterbore', keywords: ['counterbore', 'stepped cylinder', 'stepped bushing', 'dual step'] },
  { type: 'cylinder-hole', keywords: ['hollow cylinder', 'cylinder', 'bushing', 'pipe', 'tube', 'bore'] },
  { type: 'v-block', keywords: ['v-block', 'v block', 'vee block', 'v-groove', 'v groove'] },
  { type: 'tri-prism', keywords: ['triangular prism', 'triangle prism', 'tri prism', 'triangular'] },
  { type: 'u-block', keywords: ['u-block', 'u block', 'u-channel', 'u channel', 'slotted', 'slot', 'channel'] },
  { type: 'l-block', keywords: ['l-block', 'l block', 'stepped block', 'l-bracket', 'stepped'] },
];

function extractNumber(text: string, patterns: RegExp[]): number | null {
  for (const regex of patterns) {
    const match = text.match(regex);
    if (match && match[1]) {
      const parsed = parseFloat(match[1]);
      if (!Number.isNaN(parsed) && parsed >= 0) {
        return parsed;
      }
    }
  }
  return null;
}

export function parseEngineeringQuestion(rawQuestion: string): ParsedQuestionResult {
  const text = rawQuestion.trim().toLowerCase();
  const notes: string[] = [];

  // Route 1: Planometric Projection
  if (text.includes('planometric') || text.includes('x/y/z')) {
    notes.push('Routed to Planometric Builder (Module 1)');
    return {
      targetModule: 'planometric',
      solidType: 'l-block',
      solidName: 'Planometric View (45°/45°)',
      dimensions: { length: 100, width: 50, height: 25 },
      rotation: { x: 0, y: 0, z: 0 },
      sideViewMode: 'left',
      planometricParams: Q2_DEFAULT_PLANOMETRIC,
      confidence: 'high',
      notes,
    };
  }

  // Route 2: Straight Line Projection & Traces
  const isLineQuery =
    /\bline\b/.test(text) ||
    text.includes('traces') ||
    text.includes('true length') ||
    text.includes('infront of vp') ||
    text.includes('in front of vp');

  if (isLineQuery && !text.includes('prism') && !text.includes('pyramid') && !text.includes('cone') && !text.includes('block')) {
    const tl =
      extractNumber(text, [
        /line\s*(?:ab|pq)?\s*(\d+(?:\.\d+)?)\s*mm/,
        /(\d+(?:\.\d+)?)\s*mm\s*long/,
        /(?:true\s*length|tl)\s*(?:=|of|is|:)?\s*(\d+(?:\.\d+)?)/,
      ]) ?? Q1_DEFAULT_LINE.trueLength;

    const inHP = text.includes('in hp') || text.includes('on hp');
    const distHP = inHP
      ? 0
      : (extractNumber(text, [/(\d+(?:\.\d+)?)\s*mm\s*above\s*(?:the\s*)?hp/]) ?? 15);

    const inVP = text.includes('in vp') || text.includes('on vp');
    const distVP = inVP
      ? 0
      : (extractNumber(text, [/(\d+(?:\.\d+)?)\s*mm\s*in\s*front\s*of\s*(?:the\s*)?vp/]) ?? 30);

    const thetaHP =
      extractNumber(text, [
        /(\d+(?:\.\d+)?)\s*(?:°|deg|degrees?)\s*(?:to|with)\s*(?:the\s*)?(?:hp|h\.p\.)/,
      ]) ?? 30;

    const phiVP =
      extractNumber(text, [
        /(\d+(?:\.\d+)?)\s*(?:°|deg|degrees?)\s*(?:to|with)\s*(?:the\s*)?(?:vp|v\.p\.)/,
      ]) ?? 45;

    notes.push('Routed to Straight Line & Traces Solver (Module 1)');
    notes.push(`True Length = ${tl} mm, d(HP) = ${distHP} mm, d(VP) = ${distVP} mm`);
    notes.push(`Inclinations: θ = ${thetaHP}° to HP, φ = ${phiVP}° to VP`);

    return {
      targetModule: 'lines',
      solidType: 'l-block',
      solidName: `Straight Line AB (${tl} mm)`,
      dimensions: { length: Math.round(tl), width: Math.round(distVP), height: Math.round(distHP) },
      rotation: { x: Math.round(thetaHP), y: Math.round(phiVP), z: 0 },
      sideViewMode: 'left',
      lineParams: {
        trueLength: Math.max(20, Math.min(120, Math.round(tl))),
        distHP: Math.max(0, Math.min(60, Math.round(distHP))),
        distVP: Math.max(0, Math.min(60, Math.round(distVP))),
        thetaHP: Math.max(0, Math.min(80, Math.round(thetaHP))),
        phiVP: Math.max(0, Math.min(80, Math.round(phiVP))),
      },
      confidence: 'high',
      notes,
    };
  }

  // Route 3: Orthographic & 3D Solids
  let detectedSolid: SolidType = 'l-block';
  let bestScore = 0;

  for (const entry of SOLID_KEYWORDS) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (text.includes(kw)) {
        score += kw.includes(' ') || kw.includes('-') ? 3 : 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      detectedSolid = entry.type;
    }
  }

  const sideViewMode: SideViewMode =
    text.includes('right side') || text.includes('rhsv') || text.includes('right-hand side')
      ? 'right'
      : 'left';

  const preset = SOLID_PRESETS.find((p) => p.id === detectedSolid) || SOLID_PRESETS[0];
  let length = preset.defaultDimensions.length;
  let width = preset.defaultDimensions.width;
  let height = preset.defaultDimensions.height;

  if (bestScore > 0) {
    notes.push(`Matched solid: ${preset.name}`);
  } else {
    notes.push(`No exact solid keyword found — defaulted to ${preset.name}`);
  }
  if (sideViewMode === 'right') {
    notes.push('Switched Side View projection to Right-Hand Side View (RHSV)');
  }

  const tripleMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:mm)?\s*[x×*]\s*(\d+(?:\.\d+)?)\s*(?:mm)?\s*[x×*]\s*(\d+(?:\.\d+)?)\s*(?:mm)?/);
  if (tripleMatch) {
    length = clampDim(parseFloat(tripleMatch[1]));
    width = clampDim(parseFloat(tripleMatch[2]));
    height = clampDim(parseFloat(tripleMatch[3]));
    notes.push(`Detected L×W×H dimensions: ${length} × ${width} × ${height} mm`);
  } else {
    const extractedLength = extractNumber(text, [
      /(?:length|len|l)\s*(?:=|of|is|:)?\s*(\d+(?:\.\d+)?)\s*(?:mm)?/,
      /(\d+(?:\.\d+)?)\s*mm\s*(?:long|length)/,
    ]);
    const extractedWidth = extractNumber(text, [
      /(?:width|breadth|depth|thickness|w|b)\s*(?:=|of|is|:)?\s*(\d+(?:\.\d+)?)\s*(?:mm)?/,
      /(\d+(?:\.\d+)?)\s*mm\s*(?:wide|width|deep|thick)/,
    ]);
    const extractedHeight = extractNumber(text, [
      /(?:height|axis|altitude|tall|h)\s*(?:=|of|is|length|:)?\s*(\d+(?:\.\d+)?)\s*(?:mm)?/,
      /(\d+(?:\.\d+)?)\s*mm\s*(?:high|height|tall|axis)/,
    ]);
    const extractedBaseOrDia = extractNumber(text, [
      /(?:base\s*(?:circle\s*)?(?:side|edge|diameter|dia|width)?|diameter|dia|side|edge|ø)\s*(?:=|of|is|:)?\s*(\d+(?:\.\d+)?)\s*(?:mm)?/,
      /(\d+(?:\.\d+)?)\s*mm\s*(?:base|side|diameter|dia)/,
    ]);

    if (extractedBaseOrDia !== null && extractedBaseOrDia > 0) {
      const val = clampDim(extractedBaseOrDia);
      length = val;
      width = val;
      notes.push(`Detected base/diameter: ${val} mm (applied to L & W)`);
    }
    if (extractedLength !== null && extractedLength > 0) {
      length = clampDim(extractedLength);
      notes.push(`Detected Length (L): ${length} mm`);
    }
    if (extractedWidth !== null && extractedWidth > 0) {
      width = clampDim(extractedWidth);
      notes.push(`Detected Width (W): ${width} mm`);
    }
    if (extractedHeight !== null && extractedHeight > 0) {
      height = clampDim(extractedHeight);
      notes.push(`Detected Height / Axis (H): ${height} mm`);
    }
  }

  let rotX = 0;
  let rotY = 0;
  let rotZ = 0;

  const hpAngle = extractNumber(text, [
    /(?:inclined|tilted|angle|makes)\s*(?:at|by|of|an\s*angle\s*of)?\s*(\d+(?:\.\d+)?)\s*(?:°|deg|degrees?)\s*(?:to|with)\s*(?:the\s*)?(?:hp|h\.p\.|horizontal\s*plane)/,
    /(?:hp|h\.p\.)\s*(?:inclination|angle)?\s*(?:=|of|at|:)?\s*(\d+(?:\.\d+)?)\s*(?:°|deg|degrees?)/,
  ]);
  const vpAngle = extractNumber(text, [
    /(?:inclined|tilted|angle|makes)\s*(?:at|by|of|an\s*angle\s*of)?\s*(\d+(?:\.\d+)?)\s*(?:°|deg|degrees?)\s*(?:to|with)\s*(?:the\s*)?(?:vp|v\.p\.|vertical\s*plane)/,
    /(?:vp|v\.p\.)\s*(?:inclination|angle)?\s*(?:=|of|at|:)?\s*(\d+(?:\.\d+)?)\s*(?:°|deg|degrees?)/,
  ]);

  if (text.includes('generator') && detectedSolid === 'cone' && hpAngle === null) {
    rotX = 72;
    notes.push('Cone resting on generator in HP (applied ~72° tilt)');
  }
  if (hpAngle !== null) {
    rotX = normalizeAngle(hpAngle);
    notes.push(`Inclination to HP: ${rotX}° (Rotate X)`);
  }
  if (vpAngle !== null) {
    rotY = normalizeAngle(vpAngle);
    notes.push(`Inclination to VP: ${rotY}° (Rotate Y)`);
  }

  const confidence: 'high' | 'medium' | 'low' =
    bestScore >= 3 ? 'high' : bestScore > 0 ? 'medium' : 'low';

  return {
    targetModule: 'orthographic',
    solidType: detectedSolid,
    solidName: preset.name,
    dimensions: { length, width, height },
    rotation: { x: rotX, y: rotY, z: rotZ },
    sideViewMode,
    confidence,
    notes,
  };
}

export const SAMPLE_QUESTIONS: { label: string; text: string }[] = [
  {
    label: 'Q1: Line AB + Traces',
    text: 'A line AB 60 mm long has one of its ends in HP and 30 mm in front of VP. The line is inclined at 30 degrees to HP and 45 degrees to VP. Determine front view length and traces.',
  },
  {
    label: 'Q2: Planometric View',
    text: 'Draw the planometric view of the 100x50 mm base with X/Y/Z blocks 25/25/25, 20/10/10, and 30/20/20.',
  },
  {
    label: 'Q3: Hexagonal Pyramid',
    text: 'A hexagonal pyramid of base 50mm and height 60mm rests on a corner with slant edge at 45 degrees to HP and axis 40 degrees to VP.',
  },
  {
    label: 'Q9: Bracket (RHSV)',
    text: 'Draw the front view, top view and right side view of a machined bracket of 100x64x75mm.',
  },
];
