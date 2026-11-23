import { SolidDimensions, SolidRotation, SolidType } from '../types';
import { SOLID_PRESETS } from './geometryGenerators';

export interface ParsedQuestionResult {
  solidType: SolidType;
  solidName: string;
  dimensions: SolidDimensions;
  rotation: SolidRotation;
  confidence: 'high' | 'medium' | 'low';
  notes: string[];
}

const clampDim = (val: number): number => Math.max(15, Math.min(150, Math.round(val)));
const normalizeAngle = (val: number): number => ((Math.round(val) % 360) + 360) % 360;

const SOLID_KEYWORDS: { type: SolidType; keywords: string[] }[] = [
  { type: 'hex-prism', keywords: ['hexagonal prism', 'hex prism', 'hexagon prism', 'hexagonal', 'hexagon', '6-sided'] },
  { type: 'square-pyramid', keywords: ['square pyramid', 'pyramid', 'apex', 'slant edge'] },
  { type: 'cone-frustum', keywords: ['frustum', 'truncated cone', 'cone'] },
  { type: 'counterbore', keywords: ['counterbore', 'stepped cylinder', 'stepped bushing', 'flanged bushing', 'dual step'] },
  { type: 'cylinder-hole', keywords: ['hollow cylinder', 'cylinder', 'bushing', 'pipe', 'tube', 'circular', 'bore'] },
  { type: 'v-block', keywords: ['v-block', 'v block', 'vee block', 'v-groove', 'v groove'] },
  { type: 'tri-prism', keywords: ['triangular prism', 'triangle prism', 'tri prism', 'triangular', 'equilateral'] },
  { type: 'u-block', keywords: ['u-block', 'u block', 'u-channel', 'u channel', 'slotted', 'slot', 'channel'] },
  { type: 'l-block', keywords: ['l-block', 'l block', 'stepped block', 'l-bracket', 'bracket', 'stepped'] },
];

function extractNumber(text: string, patterns: RegExp[]): number | null {
  for (const regex of patterns) {
    const match = text.match(regex);
    if (match && match[1]) {
      const parsed = parseFloat(match[1]);
      if (!Number.isNaN(parsed) && parsed > 0) {
        return parsed;
      }
    }
  }
  return null;
}

export function parseEngineeringQuestion(rawQuestion: string): ParsedQuestionResult {
  const text = rawQuestion.trim().toLowerCase();
  const notes: string[] = [];

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

  const preset = SOLID_PRESETS.find((p) => p.id === detectedSolid) || SOLID_PRESETS[0];
  let length = preset.defaultDimensions.length;
  let width = preset.defaultDimensions.width;
  let height = preset.defaultDimensions.height;

  if (bestScore > 0) {
    notes.push(`Matched solid: ${preset.name}`);
  } else {
    notes.push(`No exact solid keyword found — defaulted to ${preset.name}`);
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
      /(?:base\s*(?:side|edge|diameter|dia|width)?|diameter|dia|side|edge|ø)\s*(?:=|of|is|:)?\s*(\d+(?:\.\d+)?)\s*(?:mm)?/,
      /(\d+(?:\.\d+)?)\s*mm\s*(?:base|side|diameter|dia)/,
    ]);

    if (extractedBaseOrDia !== null) {
      const val = clampDim(extractedBaseOrDia);
      length = val;
      width = val;
      notes.push(`Detected base/diameter: ${val} mm (applied to L & W)`);
    }
    if (extractedLength !== null) {
      length = clampDim(extractedLength);
      notes.push(`Detected Length (L): ${length} mm`);
    }
    if (extractedWidth !== null) {
      width = clampDim(extractedWidth);
      notes.push(`Detected Width (W): ${width} mm`);
    }
    if (extractedHeight !== null) {
      height = clampDim(extractedHeight);
      notes.push(`Detected Height / Axis (H): ${height} mm`);
    }
  }

  let rotX = 0;
  let rotY = 0;
  let rotZ = 0;

  const hpAngle = extractNumber(text, [
    /(?:inclined|tilted|angle|makes)\s*(?:at|by|of)?\s*(\d+(?:\.\d+)?)\s*(?:°|deg|degrees?)\s*(?:to|with)\s*(?:the\s*)?(?:hp|h\.p\.|horizontal\s*plane)/,
    /(?:hp|h\.p\.)\s*(?:inclination|angle)?\s*(?:=|of|at|:)?\s*(\d+(?:\.\d+)?)\s*(?:°|deg|degrees?)/,
  ]);
  const vpAngle = extractNumber(text, [
    /(?:inclined|tilted|angle|makes)\s*(?:at|by|of)?\s*(\d+(?:\.\d+)?)\s*(?:°|deg|degrees?)\s*(?:to|with)\s*(?:the\s*)?(?:vp|v\.p\.|vertical\s*plane)/,
    /(?:vp|v\.p\.)\s*(?:inclination|angle)?\s*(?:=|of|at|:)?\s*(\d+(?:\.\d+)?)\s*(?:°|deg|degrees?)/,
  ]);

  const explicitX = extractNumber(text, [/rotate\s*x\s*(?:=|by|to|:)?\s*(\d+(?:\.\d+)?)/, /x\s*(?:axis|rotation)\s*(?:=|by|:)?\s*(\d+(?:\.\d+)?)/]);
  const explicitY = extractNumber(text, [/rotate\s*y\s*(?:=|by|to|:)?\s*(\d+(?:\.\d+)?)/, /y\s*(?:axis|rotation)\s*(?:=|by|:)?\s*(\d+(?:\.\d+)?)/]);
  const explicitZ = extractNumber(text, [/rotate\s*z\s*(?:=|by|to|:)?\s*(\d+(?:\.\d+)?)/, /z\s*(?:axis|rotation)\s*(?:=|by|:)?\s*(\d+(?:\.\d+)?)/]);

  if (hpAngle !== null) {
    rotX = normalizeAngle(hpAngle);
    notes.push(`Inclination to HP: ${rotX}° (Rotate X)`);
  }
  if (vpAngle !== null) {
    rotY = normalizeAngle(vpAngle);
    notes.push(`Inclination to VP: ${rotY}° (Rotate Y)`);
  }
  if (explicitX !== null) rotX = normalizeAngle(explicitX);
  if (explicitY !== null) rotY = normalizeAngle(explicitY);
  if (explicitZ !== null) rotZ = normalizeAngle(explicitZ);

  const confidence: 'high' | 'medium' | 'low' =
    bestScore >= 3 ? 'high' : bestScore > 0 ? 'medium' : 'low';

  return {
    solidType: detectedSolid,
    solidName: preset.name,
    dimensions: { length, width, height },
    rotation: { x: rotX, y: rotY, z: rotZ },
    confidence,
    notes,
  };
}

export const SAMPLE_QUESTIONS: { label: string; text: string }[] = [
  {
    label: 'Hexagonal Prism (Inclined to HP)',
    text: 'Draw the projections of a hexagonal prism of base 40mm and axis height 75mm resting on HP with its axis inclined at 30 degrees to HP.',
  },
  {
    label: 'Square Pyramid (Base & Axis)',
    text: 'A square pyramid of base side 50mm and height 70mm rests on HP, inclined at 25 degrees to VP.',
  },
  {
    label: 'Stepped L-Block (Exact L×W×H)',
    text: 'Draw the front, top, and left side views of a stepped L-block of length 80mm, width 45mm, and height 60mm.',
  },
  {
    label: 'Hollow Cylinder / Bushing',
    text: 'Project a hollow cylinder bushing of diameter 55mm and height 65mm resting vertically on HP.',
  },
];
