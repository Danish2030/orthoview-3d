import {
  LineProblemParams,
  PlanometricBlock,
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

export interface ParsedLineQuestion {
  params: LineProblemParams;
  notes: string[];
  confidence: 'high' | 'medium' | 'low';
}

export interface ParsedPlanometricQuestion {
  params: PlanometricParams;
  notes: string[];
  confidence: 'high' | 'medium' | 'low';
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

export function parseLineQuestion(rawQuestion: string): ParsedLineQuestion {
  const text = rawQuestion.trim().toLowerCase();
  const notes: string[] = [];
  let matches = 0;

  // 1. True Length
  const tlMatch = extractNumber(text, [
    /line\s*(?:[a-z]{1,2})?\s*(?:of\s*length|is|has\s*length)?\s*(\d+(?:\.\d+)?)\s*mm/,
    /(\d+(?:\.\d+)?)\s*mm\s*(?:long|true\s*length|length)/,
    /(?:true\s*length|tl|length)\s*(?:=|of|is|:)?\s*(\d+(?:\.\d+)?)\s*(?:mm)?/,
  ]);
  const trueLength = Math.max(20, Math.min(110, Math.round(tlMatch ?? Q1_DEFAULT_LINE.trueLength)));
  if (tlMatch !== null) {
    matches++;
    notes.push(`True Length (TL) = ${trueLength} mm`);
  }

  // 2. End A distances from HP and VP
  // Check "X mm above HP and Y mm in front of VP" or "X mm and Y mm above HP and in front of VP respectively"
  let distHP: number | null = null;
  let distVP: number | null = null;

  const respDist = text.match(
    /(\d+(?:\.\d+)?)\s*(?:mm)?\s*and\s*(\d+(?:\.\d+)?)\s*(?:mm)?\s*above\s*(?:the\s*)?(?:hp|h\.p\.)\s*and\s*(?:in\s*front\s*of|infront\s*of|before)\s*(?:the\s*)?(?:vp|v\.p\.)/
  );
  if (respDist) {
    distHP = parseFloat(respDist[1]);
    distVP = parseFloat(respDist[2]);
    matches += 2;
  } else {
    if (/(?:end|point|a|p)?\s*(?:is\s*)?(?:in|on|lies\s*in|lies\s*on|resting\s*on)\s*(?:the\s*)?(?:hp|h\.p\.)/.test(text)) {
      distHP = 0;
      matches++;
    } else {
      distHP = extractNumber(text, [
        /(\d+(?:\.\d+)?)\s*mm\s*above\s*(?:the\s*)?(?:hp|h\.p\.)/,
        /(?:above\s*(?:the\s*)?(?:hp|h\.p\.)|d_?hp|dist(?:ance)?\s*(?:from|above)\s*hp)\s*(?:=|is|of|:)?\s*(\d+(?:\.\d+)?)/,
      ]);
      if (distHP !== null) matches++;
    }

    if (/(?:end|point|a|p)?\s*(?:is\s*)?(?:in|on|lies\s*in|lies\s*on)\s*(?:the\s*)?(?:vp|v\.p\.)/.test(text)) {
      distVP = 0;
      matches++;
    } else {
      distVP = extractNumber(text, [
        /(\d+(?:\.\d+)?)\s*mm\s*(?:in\s*front\s*of|infront\s*of|before)\s*(?:the\s*)?(?:vp|v\.p\.)/,
        /(?:in\s*front\s*of\s*(?:the\s*)?(?:vp|v\.p\.)|d_?vp|dist(?:ance)?\s*(?:from|in\s*front\s*of)\s*vp)\s*(?:=|is|of|:)?\s*(\d+(?:\.\d+)?)/,
      ]);
      if (distVP !== null) matches++;
    }
  }

  const finalHP = Math.max(0, Math.min(50, Math.round(distHP ?? 15)));
  const finalVP = Math.max(0, Math.min(50, Math.round(distVP ?? 30)));
  notes.push(`End A: ${finalHP} mm above HP, ${finalVP} mm in front of VP`);

  // 3. True inclinations theta (HP) and phi (VP)
  let thetaHP: number | null = null;
  let phiVP: number | null = null;

  // Handle "inclined at 30° and 45° to HP and VP respectively"
  const respAngles = text.match(
    /(\d+(?:\.\d+)?)\s*(?:°|deg|degrees?)?\s*and\s*(\d+(?:\.\d+)?)\s*(?:°|deg|degrees?)\s*(?:to|with)\s*(?:the\s*)?(?:hp|h\.p\.)\s*and\s*(?:the\s*)?(?:vp|v\.p\.)/
  );
  if (respAngles) {
    thetaHP = parseFloat(respAngles[1]);
    phiVP = parseFloat(respAngles[2]);
    matches += 2;
  } else {
    thetaHP = extractNumber(text, [
      /(\d+(?:\.\d+)?)\s*(?:°|deg|degrees?)\s*(?:to|with)\s*(?:the\s*)?(?:hp|h\.p\.|horizontal\s*plane)/,
      /(?:theta|θ|hp\s*angle)\s*(?:=|is|of|:)?\s*(\d+(?:\.\d+)?)/,
    ]);
    if (thetaHP !== null) matches++;

    phiVP = extractNumber(text, [
      /(\d+(?:\.\d+)?)\s*(?:°|deg|degrees?)\s*(?:to|with)\s*(?:the\s*)?(?:vp|v\.p\.|vertical\s*plane)/,
      /(?:phi|φ|vp\s*angle)\s*(?:=|is|of|:)?\s*(\d+(?:\.\d+)?)/,
    ]);
    if (phiVP !== null) matches++;
  }

  const finalTheta = Math.max(0, Math.min(80, Math.round(thetaHP ?? 30)));
  const finalPhi = Math.max(0, Math.min(80, Math.round(phiVP ?? 45)));
  notes.push(`Inclinations: θ = ${finalTheta}° to HP, φ = ${finalPhi}° to VP`);

  const confidence: 'high' | 'medium' | 'low' =
    matches >= 3 ? 'high' : matches >= 1 ? 'medium' : 'low';

  return {
    params: {
      trueLength,
      distHP: finalHP,
      distVP: finalVP,
      thetaHP: finalTheta,
      phiVP: finalPhi,
    },
    notes,
    confidence,
  };
}

export function parsePlanometricQuestion(rawQuestion: string): ParsedPlanometricQuestion {
  const text = rawQuestion.trim().toLowerCase();
  const notes: string[] = [];

  // 1. Extract Base Plate dimensions (e.g., "base 100x50", "100 x 50 mm", "base of 120 by 60")
  let baseX = 100;
  let baseY = 50;
  let baseMatched = false;

  const basePair = text.match(
    /(?:base(?:\s*plate)?|plan|plate|rectangle|floor)\s*(?:of|is|=|:)?\s*(\d+(?:\.\d+)?)\s*(?:mm)?\s*(?:x|×|by|\*)\s*(\d+(?:\.\d+)?)\s*(?:mm)?/
  );
  if (basePair) {
    baseX = Math.max(20, Math.min(180, Math.round(parseFloat(basePair[1]))));
    baseY = Math.max(20, Math.min(120, Math.round(parseFloat(basePair[2]))));
    baseMatched = true;
  } else {
    // Fallback: look for a standalone 2D pair (not part of a 3D triple)
    const pair2D = text.match(/(?<![/\d])(\d{2,3})\s*(?:mm)?\s*[x×]\s*(\d{2,3})(?!\s*[x×/]\s*\d)/);
    if (pair2D) {
      baseX = Math.max(20, Math.min(180, Math.round(parseFloat(pair2D[1]))));
      baseY = Math.max(20, Math.min(120, Math.round(parseFloat(pair2D[2]))));
      baseMatched = true;
    }
  }
  notes.push(`Base Plate: ${baseX} × ${baseY} mm`);

  // 2. Extract all 3D block specifications:
  // Supports: "25/25/25", "X/Y/Z = 25/25/25", "30x20x20", "30×20×20", optionally with "at (x, y)" or position keywords
  const blockRegex =
    /(?:(?:block|box|prism|cube)\s*[a-z0-9]?\s*(?:of|=|:)?\s*)?(?:x\/y\/z\s*=\s*)?(\d+(?:\.\d+)?)\s*([/x×*])\s*(\d+(?:\.\d+)?)\s*\2\s*(\d+(?:\.\d+)?)(?:\s*mm)?(?:\s*(?:at|@)\s*\(?\s*(?:x\s*=\s*)?(\d+(?:\.\d+)?)\s*,\s*(?:y\s*=\s*)?(\d+(?:\.\d+)?)\s*\)?)?(?:\s*(?:in|at|on)?\s*(top[-\s]?left|top[-\s]?right|bottom[-\s]?left|bottom[-\s]?right|center|centre))?/g;

  const rawBlocks: {
    dx: number;
    dy: number;
    dz: number;
    explicitX?: number;
    explicitY?: number;
    anchor?: string;
  }[] = [];

  let m: RegExpExecArray | null;
  while ((m = blockRegex.exec(text)) !== null) {
    const dx = Math.max(5, Math.min(baseX, Math.round(parseFloat(m[1]))));
    const dy = Math.max(5, Math.min(baseY, Math.round(parseFloat(m[3]))));
    const dz = Math.max(5, Math.min(100, Math.round(parseFloat(m[4]))));
    const explicitX = m[5] !== undefined ? Math.round(parseFloat(m[5])) : undefined;
    const explicitY = m[6] !== undefined ? Math.round(parseFloat(m[6])) : undefined;
    const anchor = m[7]?.replace(/\s+/g, '-');
    rawBlocks.push({ dx, dy, dz, explicitX, explicitY, anchor });
  }

  // Also check for "cube of 30mm" if not matched as triple
  if (rawBlocks.length === 0) {
    const cubeMatch = text.match(/cube\s*(?:of\s*(?:side|edge)?\s*)?(\d+(?:\.\d+)?)\s*mm/);
    if (cubeMatch) {
      const s = Math.max(10, Math.min(Math.min(baseX, baseY), Math.round(parseFloat(cubeMatch[1]))));
      rawBlocks.push({ dx: s, dy: s, dz: s, anchor: 'center' });
    }
  }

  // Check if it matches the exact Q2 exam problem (100x50 + 25/25/25, 20/10/10, 30/20/20)
  const isQ2Exact =
    baseX === 100 &&
    baseY === 50 &&
    rawBlocks.length === 3 &&
    rawBlocks[0].dx === 25 &&
    rawBlocks[1].dx === 20 &&
    rawBlocks[2].dx === 30 &&
    rawBlocks.every((b) => b.explicitX === undefined && !b.anchor);

  if (isQ2Exact) {
    notes.push('Matched 24EST1004-C Q2 exact 3-block layout');
    return {
      params: Q2_DEFAULT_PLANOMETRIC,
      notes,
      confidence: 'high',
    };
  }

  if (rawBlocks.length === 0) {
    notes.push('No explicit X/Y/Z blocks detected — loaded Q2 reference layout');
    return {
      params: { ...Q2_DEFAULT_PLANOMETRIC, baseX, baseY },
      notes,
      confidence: baseMatched ? 'medium' : 'low',
    };
  }

  // Place blocks cleanly with explicit coords, anchor keywords, or smart non-overlapping corner/row packing
  const blocks: PlanometricBlock[] = [];
  let cursorX = 0;

  rawBlocks.forEach((rb, idx) => {
    let x = 0;
    let y = 0;

    if (rb.explicitX !== undefined && rb.explicitY !== undefined) {
      x = Math.max(0, Math.min(baseX - rb.dx, rb.explicitX));
      y = Math.max(0, Math.min(baseY - rb.dy, rb.explicitY));
    } else if (rb.anchor === 'top-left') {
      x = 0;
      y = Math.max(0, baseY - rb.dy);
    } else if (rb.anchor === 'top-right') {
      x = Math.max(0, baseX - rb.dx);
      y = Math.max(0, baseY - rb.dy);
    } else if (rb.anchor === 'bottom-left') {
      x = 0;
      y = 0;
    } else if (rb.anchor === 'bottom-right') {
      x = Math.max(0, baseX - rb.dx);
      y = 0;
    } else if (rb.anchor === 'center' || rb.anchor === 'centre') {
      x = Math.max(0, Math.round((baseX - rb.dx) / 2));
      y = Math.max(0, Math.round((baseY - rb.dy) / 2));
    } else {
      // Auto-pack neatly across the base plate without overlap
      if (idx === 0) {
        x = 0;
        y = Math.max(0, baseY - rb.dy);
        cursorX = rb.dx + 10;
      } else if (idx === rawBlocks.length - 1 && rb.dx <= baseX - cursorX + 10) {
        x = Math.max(0, baseX - rb.dx);
        y = 0;
      } else {
        x = Math.max(0, Math.min(baseX - rb.dx, cursorX));
        y = Math.max(0, Math.round((baseY - rb.dy) / 2));
        cursorX = x + rb.dx + 5;
      }
    }

    const letter = String.fromCharCode(65 + (idx % 26));
    blocks.push({
      id: `b-${idx + 1}`,
      label: `Block ${letter} (${rb.dx}/${rb.dy}/${rb.dz})`,
      x,
      y,
      dx: rb.dx,
      dy: rb.dy,
      dz: rb.dz,
    });
  });

  notes.push(`Parsed ${blocks.length} block${blocks.length > 1 ? 's' : ''} with accurate 45°/45° Z-extrusion`);

  return {
    params: { baseX, baseY, blocks },
    notes,
    confidence: 'high',
  };
}

export function parseEngineeringQuestion(rawQuestion: string): ParsedQuestionResult {
  const text = rawQuestion.trim().toLowerCase();
  const notes: string[] = [];

  // Route 1: Planometric Projection
  if (text.includes('planometric') || text.includes('planimetry') || text.includes('x/y/z')) {
    const plano = parsePlanometricQuestion(rawQuestion);
    return {
      targetModule: 'planometric',
      solidType: 'l-block',
      solidName: `Planometric (${plano.params.baseX}×${plano.params.baseY}, ${plano.params.blocks.length} blocks)`,
      dimensions: {
        length: plano.params.baseX,
        width: plano.params.baseY,
        height: plano.params.blocks[0]?.dz ?? 25,
      },
      rotation: { x: 0, y: 0, z: 0 },
      sideViewMode: 'left',
      planometricParams: plano.params,
      confidence: plano.confidence,
      notes: ['Routed to Planometric Builder (Module 1)', ...plano.notes],
    };
  }

  // Route 2: Straight Line Projection & Traces
  const isLineQuery =
    /\bline\b/.test(text) ||
    text.includes('traces') ||
    text.includes('true length') ||
    text.includes('infront of vp') ||
    text.includes('in front of vp');

  if (
    isLineQuery &&
    !text.includes('prism') &&
    !text.includes('pyramid') &&
    !text.includes('cone') &&
    !text.includes('block')
  ) {
    const lineParsed = parseLineQuestion(rawQuestion);
    const lp = lineParsed.params;
    return {
      targetModule: 'lines',
      solidType: 'l-block',
      solidName: `Straight Line AB (${lp.trueLength} mm)`,
      dimensions: { length: lp.trueLength, width: lp.distVP, height: lp.distHP },
      rotation: { x: lp.thetaHP, y: lp.phiVP, z: 0 },
      sideViewMode: 'left',
      lineParams: lp,
      confidence: lineParsed.confidence,
      notes: ['Routed to Straight Line & Traces Solver (Module 1)', ...lineParsed.notes],
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

  const tripleMatch = text.match(
    /(\d+(?:\.\d+)?)\s*(?:mm)?\s*[x×*]\s*(\d+(?:\.\d+)?)\s*(?:mm)?\s*[x×*]\s*(\d+(?:\.\d+)?)\s*(?:mm)?/
  );
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
  const rotZ = 0;

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
