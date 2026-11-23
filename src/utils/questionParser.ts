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

export interface ParsedLineQuestion {
  params: LineProblemParams;
  notes: string[];
  confidence: 'high' | 'medium';
}

export interface ParsedPlanometricQuestion {
  params: PlanometricParams;
  notes: string[];
  confidence: 'high' | 'medium';
}

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

export function parseLineQuestion(rawQuestion: string): ParsedLineQuestion {
  const text = rawQuestion.trim().toLowerCase();
  const notes: string[] = [];
  let matches = 0;

  // 1. True Length
  const tlRaw = extractNumber(text, [
    /(?:line|segment)\s*(?:ab|pq|cd|ef|mn)?\s*(?:is|of)?\s*(\d+(?:\.\d+)?)\s*mm/,
    /(\d+(?:\.\d+)?)\s*mm\s*(?:long|true\s*length)/,
    /(?:true\s*length|tl|length)\s*(?:=|of|is|:)?\s*(\d+(?:\.\d+)?)\s*(?:mm)?/,
  ]);
  const trueLength = Math.max(20, Math.min(110, Math.round(tlRaw ?? Q1_DEFAULT_LINE.trueLength)));
  if (tlRaw !== null) {
    matches++;
    notes.push(`True Length (TL) = ${trueLength} mm`);
  } else {
    notes.push(`True Length defaulted to ${trueLength} mm`);
  }

  // 2. End A above HP
  const endAInHP = /(?:end\s*(?:a|p)?|one\s*(?:of\s*its\s*)?ends?)\s*(?:is\s*)?(?:in|on)\s*(?:the\s*)?(?:hp|h\.p\.)/.test(text);
  const distHPRaw = endAInHP
    ? 0
    : extractNumber(text, [
        /(\d+(?:\.\d+)?)\s*mm\s*above\s*(?:the\s*)?(?:hp|h\.p\.)/,
        /(?:above\s*hp|d_hp|hp\s*dist(?:ance)?)\s*(?:=|is|:)?\s*(\d+(?:\.\d+)?)/,
      ]);
  const distHP = Math.max(0, Math.min(50, Math.round(distHPRaw ?? 15)));
  if (distHPRaw !== null) {
    matches++;
    notes.push(`End A above HP = ${distHP} mm`);
  }

  // 3. End A in front of VP
  const endAInVP = /(?:end\s*(?:a|p)?|one\s*(?:of\s*its\s*)?ends?)\s*(?:is\s*)?(?:in|on)\s*(?:the\s*)?(?:vp|v\.p\.)/.test(text);
  const distVPRaw = endAInVP
    ? 0
    : extractNumber(text, [
        /(\d+(?:\.\d+)?)\s*mm\s*in\s*front\s*of\s*(?:the\s*)?(?:vp|v\.p\.)/,
        /(\d+(?:\.\d+)?)\s*mm\s*infront\s*of\s*(?:the\s*)?(?:vp|v\.p\.)/,
        /(?:in\s*front\s*of\s*vp|d_vp|vp\s*dist(?:ance)?)\s*(?:=|is|:)?\s*(\d+(?:\.\d+)?)/,
      ]);
  const distVP = Math.max(0, Math.min(50, Math.round(distVPRaw ?? 30)));
  if (distVPRaw !== null) {
    matches++;
    notes.push(`End A in front of VP = ${distVP} mm`);
  }

  // 4. Inclination to HP (theta) — supports explicit angle, parallel/perpendicular, or End B height
  let thetaHP: number | null = null;
  if (/parallel\s*to\s*(?:the\s*)?(?:hp|h\.p\.)/.test(text)) {
    thetaHP = 0;
  } else if (/perpendicular\s*to\s*(?:the\s*)?(?:hp|h\.p\.)/.test(text)) {
    thetaHP = 80;
  } else {
    thetaHP = extractNumber(text, [
      /(\d+(?:\.\d+)?)\s*(?:°|deg|degrees?)\s*(?:to|with)\s*(?:the\s*)?(?:hp|h\.p\.|horizontal\s*plane)/,
      /(?:theta|θ)\s*(?:=|is|:)?\s*(\d+(?:\.\d+)?)/,
    ]);
  }

  // Fallback: compute theta from End B distance above HP or Top View length
  if (thetaHP === null) {
    const endBHP = extractNumber(text, [
      /(?:end\s*(?:b|q)|other\s*end)\s*(?:is\s*)?(\d+(?:\.\d+)?)\s*mm\s*above\s*(?:the\s*)?(?:hp|h\.p\.)/,
    ]);
    const tvLen = extractNumber(text, [
      /(?:top\s*view|plan)\s*(?:length|measures?|is)?\s*(?:=|of|:)?\s*(\d+(?:\.\d+)?)\s*mm/,
    ]);
    if (endBHP !== null && endBHP >= distHP && endBHP - distHP <= trueLength) {
      thetaHP = Math.round((Math.asin((endBHP - distHP) / trueLength) * 180) / Math.PI);
      notes.push(`Derived θ = ${thetaHP}° from End B (${endBHP} mm above HP)`);
    } else if (tvLen !== null && tvLen <= trueLength) {
      thetaHP = Math.round((Math.acos(tvLen / trueLength) * 180) / Math.PI);
      notes.push(`Derived θ = ${thetaHP}° from Top View length (${tvLen} mm)`);
    }
  }

  // 5. Inclination to VP (phi) — supports explicit angle, parallel/perpendicular, End B VP dist, or FV length
  let phiVP: number | null = null;
  if (/parallel\s*to\s*(?:the\s*)?(?:vp|v\.p\.)/.test(text)) {
    phiVP = 0;
  } else if (/perpendicular\s*to\s*(?:the\s*)?(?:vp|v\.p\.)/.test(text)) {
    phiVP = 80;
  } else {
    phiVP = extractNumber(text, [
      /(\d+(?:\.\d+)?)\s*(?:°|deg|degrees?)\s*(?:to|with)\s*(?:the\s*)?(?:vp|v\.p\.|vertical\s*plane)/,
      /(?:phi|φ)\s*(?:=|is|:)?\s*(\d+(?:\.\d+)?)/,
    ]);
  }

  if (phiVP === null) {
    const endBVP = extractNumber(text, [
      /(?:end\s*(?:b|q)|other\s*end)\s*(?:is\s*)?(?:.*?\s+and\s+)?(\d+(?:\.\d+)?)\s*mm\s*in\s*front\s*of\s*(?:the\s*)?(?:vp|v\.p\.)/,
    ]);
    const fvLen = extractNumber(text, [
      /(?:front\s*view|elevation)\s*(?:length|measures?|is)?\s*(?:=|of|:)?\s*(\d+(?:\.\d+)?)\s*mm/,
    ]);
    if (endBVP !== null && endBVP >= distVP && endBVP - distVP <= trueLength) {
      phiVP = Math.round((Math.asin((endBVP - distVP) / trueLength) * 180) / Math.PI);
      notes.push(`Derived φ = ${phiVP}° from End B (${endBVP} mm in front of VP)`);
    } else if (fvLen !== null && fvLen <= trueLength) {
      phiVP = Math.round((Math.acos(fvLen / trueLength) * 180) / Math.PI);
      notes.push(`Derived φ = ${phiVP}° from Front View length (${fvLen} mm)`);
    }
  }

  const finalTheta = Math.max(0, Math.min(80, Math.round(thetaHP ?? 30)));
  const finalPhi = Math.max(0, Math.min(80, Math.round(phiVP ?? 45)));

  if (thetaHP !== null) matches++;
  if (phiVP !== null) matches++;
  notes.push(`Inclinations: θ = ${finalTheta}° to HP, φ = ${finalPhi}° to VP`);

  return {
    params: {
      trueLength,
      distHP,
      distVP,
      thetaHP: finalTheta,
      phiVP: finalPhi,
    },
    notes,
    confidence: matches >= 3 ? 'high' : 'medium',
  };
}

export function parsePlanometricQuestion(rawQuestion: string): ParsedPlanometricQuestion {
  const text = rawQuestion.trim().toLowerCase();
  const notes: string[] = [];

  // Exact match for Q2 24EST1004-C
  if (
    text.includes('25/25/25') &&
    text.includes('20/10/10') &&
    text.includes('30/20/20')
  ) {
    notes.push('Matched 24EST1004-C Q2 exact planometric layout (100×50 base + 3 blocks)');
    return {
      params: Q2_DEFAULT_PLANOMETRIC,
      notes,
      confidence: 'high',
    };
  }

  // 1. Extract base plate dimensions (e.g. "base 120 x 60", "100x50 mm base", "plan 80 by 50")
  let baseX = 100;
  let baseY = 50;
  const baseMatch =
    text.match(/(?:base|plate|plan|rectangle|floor)\s*(?:of|size|:)?\s*(\d+(?:\.\d+)?)\s*(?:mm)?\s*(?:x|×|by|\*)\s*(\d+(?:\.\d+)?)/) ||
    text.match(/(\d+(?:\.\d+)?)\s*(?:mm)?\s*(?:x|×|by|\*)\s*(\d+(?:\.\d+)?)\s*(?:mm)?\s*(?:base|plate|plan|rectangle)/);

  if (baseMatch) {
    baseX = Math.max(30, Math.min(180, Math.round(parseFloat(baseMatch[1]))));
    baseY = Math.max(25, Math.min(120, Math.round(parseFloat(baseMatch[2]))));
    notes.push(`Detected base plate: ${baseX} × ${baseY} mm`);
  } else {
    notes.push(`Base plate defaulted to ${baseX} × ${baseY} mm`);
  }

  // 2. Extract all X/Y/Z or LxWxH block triplets
  const blockRegex =
    /(?:x\/y\/z\s*=\s*)?(\d+(?:\.\d+)?)\s*(?:\/|x|×)\s*(\d+(?:\.\d+)?)\s*(?:\/|x|×)\s*(\d+(?:\.\d+)?)(?:\s*(?:at|pos|@)\s*\(?\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*\)?)?/g;

  const extractedBlocks: PlanometricBlock[] = [];
  let match: RegExpExecArray | null;
  let cursorX = 0;
  let cursorY = 0;

  while ((match = blockRegex.exec(text)) !== null) {
    const dx = Math.max(5, Math.min(baseX, Math.round(parseFloat(match[1]))));
    const dy = Math.max(5, Math.min(baseY, Math.round(parseFloat(match[2]))));
    const dz = Math.max(5, Math.min(90, Math.round(parseFloat(match[3]))));

    const idx = extractedBlocks.length;
    let posX = match[4] !== undefined ? Math.round(parseFloat(match[4])) : 0;
    let posY = match[5] !== undefined ? Math.round(parseFloat(match[5])) : 0;

    if (match[4] === undefined) {
      // Smart layout placement across base corners if explicit (x,y) isn't specified
      const surrounding = text.slice(Math.max(0, match.index - 24), Math.min(text.length, match.index + match[0].length + 24));
      if (surrounding.includes('top-left') || surrounding.includes('top left')) {
        posX = 0;
        posY = Math.max(0, baseY - dy);
      } else if (surrounding.includes('top-right') || surrounding.includes('top right')) {
        posX = Math.max(0, baseX - dx);
        posY = Math.max(0, baseY - dy);
      } else if (surrounding.includes('bottom-right') || surrounding.includes('bottom right')) {
        posX = Math.max(0, baseX - dx);
        posY = 0;
      } else if (surrounding.includes('bottom-left') || surrounding.includes('bottom left')) {
        posX = 0;
        posY = 0;
      } else if (surrounding.includes('center') || surrounding.includes('centre')) {
        posX = Math.max(0, Math.round((baseX - dx) / 2));
        posY = Math.max(0, Math.round((baseY - dy) / 2));
      } else {
        // Auto-pack without overlapping
        if (cursorX + dx > baseX) {
          cursorX = 0;
          cursorY = Math.min(Math.max(0, baseY - dy), cursorY + dy + 5);
        }
        posX = cursorX;
        posY = idx === 0 ? Math.max(0, baseY - dy) : cursorY;
        cursorX += dx + 8;
      }
    }

    posX = Math.max(0, Math.min(baseX - dx, posX));
    posY = Math.max(0, Math.min(baseY - dy, posY));

    const letter = String.fromCharCode(65 + (idx % 26));
    extractedBlocks.push({
      id: `pb-${idx + 1}`,
      label: `Block ${letter} (${dx}/${dy}/${dz})`,
      x: posX,
      y: posY,
      dx,
      dy,
      dz,
    });
  }

  if (extractedBlocks.length === 0) {
    notes.push('No X/Y/Z block triplets detected — loaded default Q2 blocks');
    return {
      params: { ...Q2_DEFAULT_PLANOMETRIC, baseX, baseY },
      notes,
      confidence: 'medium',
    };
  }

  notes.push(`Parsed ${extractedBlocks.length} block(s) accurately onto ${baseX}×${baseY} mm plan`);
  return {
    params: {
      baseX,
      baseY,
      blocks: extractedBlocks,
    },
    notes,
    confidence: 'high',
  };
}

export function parseEngineeringQuestion(rawQuestion: string): ParsedQuestionResult {
  const text = rawQuestion.trim().toLowerCase();
  const notes: string[] = [];

  // Route 1: Planometric Projection
  if (text.includes('planometric') || text.includes('x/y/z')) {
    const plano = parsePlanometricQuestion(rawQuestion);
    return {
      targetModule: 'planometric',
      solidType: 'l-block',
      solidName: `Planometric (${plano.params.baseX}×${plano.params.baseY} mm)`,
      dimensions: { length: plano.params.baseX, width: plano.params.baseY, height: 25 },
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
    const line = parseLineQuestion(rawQuestion);
    return {
      targetModule: 'lines',
      solidType: 'l-block',
      solidName: `Straight Line AB (${line.params.trueLength} mm)`,
      dimensions: {
        length: line.params.trueLength,
        width: line.params.distVP,
        height: line.params.distHP,
      },
      rotation: { x: line.params.thetaHP, y: line.params.phiVP, z: 0 },
      sideViewMode: 'left',
      lineParams: line.params,
      confidence: line.confidence,
      notes: ['Routed to Straight Line & Traces Solver (Module 1)', ...line.notes],
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
