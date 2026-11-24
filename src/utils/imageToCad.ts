import { CompositePartSpec, SideViewMode, SolidDimensions, SolidType } from '../types';
import { DEFAULT_SLOTTED_CYLINDER_SPEC } from './geometryGenerators';

export interface ImageCadExtraction {
  partName: string;
  solidType: SolidType;
  dimensions: SolidDimensions;
  sideViewMode: SideViewMode;
  compositeSpec: CompositePartSpec;
  callouts: string[];
  summary: string;
  source: 'gemini-vision' | 'offline-preset' | 'quick-fill';
}

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

/**
 * Pure client-side parser (ZERO API key required) so any normal user can just
 * type the numbers they see on their photo (e.g. "140x50x50, boss 64, hole 40 deep 24, slot 30")
 * and instantly update the 3D CAD geometry.
 */
export function parseQuickPhotoDimensions(
  rawText: string,
  current: ImageCadExtraction
): ImageCadExtraction {
  const text = rawText.trim().toLowerCase();
  if (!text) return current;

  const spec: CompositePartSpec = { ...current.compositeSpec };
  let solidType: SolidType = current.solidType;
  let sideViewMode: SideViewMode = current.sideViewMode;

  if (text.includes('right side') || text.includes('rhsv')) {
    sideViewMode = 'right';
  } else if (text.includes('left side') || text.includes('lhsv')) {
    sideViewMode = 'left';
  }

  // Extract L x W x H if provided
  const triple = text.match(/(\d+(?:\.\d+)?)\s*(?:mm)?\s*[x×*]\s*(\d+(?:\.\d+)?)\s*(?:mm)?\s*[x×*]\s*(\d+(?:\.\d+)?)/);
  if (triple) {
    spec.baseLength = Math.max(20, Math.min(200, Math.round(parseFloat(triple[1]))));
    spec.baseWidth = Math.max(20, Math.min(200, Math.round(parseFloat(triple[2]))));
    spec.totalHeight = Math.max(15, Math.min(200, Math.round(parseFloat(triple[3]))));
  }

  const grab = (patterns: RegExp[]): number | null => {
    for (const r of patterns) {
      const m = text.match(r);
      if (m && m[1]) {
        const n = parseFloat(m[1]);
        if (!Number.isNaN(n) && n > 0) return Math.round(n);
      }
    }
    return null;
  };

  const len = grab([/(?:length|len|l)\s*(?:=|is|:)?\s*(\d+(?:\.\d+)?)/]);
  const wid = grab([/(?:width|wid|w|breadth)\s*(?:=|is|:)?\s*(\d+(?:\.\d+)?)/]);
  const hgt = grab([/(?:height|hgt|h)\s*(?:=|is|:)?\s*(\d+(?:\.\d+)?)/]);
  const thick = grab([/(?:base\s*thick(?:ness)?|thick(?:ness)?|t)\s*(?:=|is|:)?\s*(\d+(?:\.\d+)?)/]);
  const boss = grab([/(?:boss|outer|cylinder|cyl|od)\s*(?:ø|dia|diameter)?\s*(?:=|is|:)?\s*(\d+(?:\.\d+)?)/, /ø\s*(\d+(?:\.\d+)?)\s*(?:boss|outer|cyl)/]);
  const hole = grab([/(?:hole|bore|inner|id)\s*(?:ø|dia|diameter)?\s*(?:=|is|:)?\s*(\d+(?:\.\d+)?)/, /ø\s*(\d+(?:\.\d+)?)\s*hole/]);
  const holeDepth = grab([/(\d+(?:\.\d+)?)\s*(?:mm)?\s*deep/, /(?:depth|deep)\s*(?:=|is|:)?\s*(\d+(?:\.\d+)?)/]);
  const slotD = grab([/slot\s*(?:depth|len|length)?\s*(?:=|is|:)?\s*(\d+(?:\.\d+)?)/]);

  if (len) spec.baseLength = Math.max(20, Math.min(200, len));
  if (wid) spec.baseWidth = Math.max(20, Math.min(200, wid));
  if (hgt) spec.totalHeight = Math.max(15, Math.min(200, hgt));
  if (thick) spec.baseThickness = Math.max(4, Math.min(spec.totalHeight - 2, thick));
  if (boss) {
    spec.bossDiameter = Math.max(12, Math.min(160, boss));
    spec.bossDepth = spec.bossDiameter;
    if (spec.bossShape === 'none') spec.bossShape = 'cylinder';
    solidType = 'custom-composite';
  }
  if (hole) {
    spec.hasHole = true;
    spec.holeDiameter = Math.max(6, Math.min(spec.bossDiameter - 4, hole));
    solidType = 'custom-composite';
  }
  if (holeDepth) {
    spec.hasHole = true;
    spec.holeDepth = Math.max(4, Math.min(spec.totalHeight, holeDepth));
    solidType = 'custom-composite';
  }
  if (slotD) {
    spec.hasEndSlots = true;
    spec.slotDepth = Math.max(6, Math.min(Math.floor(spec.baseLength / 2) - 4, slotD));
    solidType = 'custom-composite';
  }
  if (text.includes('no slot')) spec.hasEndSlots = false;
  if (text.includes('no hole')) spec.hasHole = false;

  return {
    ...current,
    solidType,
    sideViewMode,
    compositeSpec: spec,
    dimensions: {
      length: spec.baseLength,
      width: spec.baseWidth,
      height: spec.totalHeight,
    },
    summary: `Updated from your photo dimensions: ${spec.baseLength}×${spec.baseWidth}×${spec.totalHeight} mm${
      spec.hasHole ? `, Ø${spec.holeDiameter} hole (${spec.holeDepth} mm deep)` : ''
    }.`,
    source: 'quick-fill',
  };
}

export async function analyzeIsometricImageWithGemini(
  apiKey: string,
  base64DataUrl: string,
  userHint?: string
): Promise<ImageCadExtraction> {
  const match = base64DataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!match) {
    throw new Error('Invalid image format. Please upload a PNG, JPG, or WebP photo.');
  }
  const mimeType = match[1];
  const base64Data = match[2];

  const prompt = `You are a precision Mechanical Engineering CAD parser.
Analyze this isometric engineering drawing image and extract exact millimeter dimensions to reconstruct it as a 3D parametric CAD part.
${userHint ? `User hint: ${userHint}` : ''}

Return ONLY valid JSON (no markdown fences) with this exact schema:
{
  "partName": "string",
  "solidType": "stepped-t-block" | "slotted-cylinder-bracket" | "custom-composite" | "l-block" | "u-block" | "machined-bracket" | "ribbed-block" | "v-block" | "counterbore" | "cylinder-hole",
  "sideViewMode": "left" | "right",
  "dimensions": { "length": number, "width": number, "height": number },
  "compositeSpec": {
    "baseLength": number,
    "baseWidth": number,
    "baseThickness": number,
    "hasEndSlots": boolean,
    "slotDepth": number,
    "slotWidth": number,
    "bossShape": "cylinder" | "box" | "none",
    "bossDiameter": number,
    "bossDepth": number,
    "totalHeight": number,
    "hasHole": boolean,
    "holeDiameter": number,
    "holeDepth": number
  },
  "callouts": ["string"],
  "summary": "one-sentence summary of detected features and dimensions"
}
Use "custom-composite" whenever the part is a base plate + boss/cylinder/slots/hole combination, and fill every numeric value in mm accurately from the drawing labels.`;

  const response = await fetch(`${GEMINI_URL}?key=${encodeURIComponent(apiKey.trim())}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: prompt },
            { inlineData: { mimeType, data: base64Data } },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.1,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Vision API error (${response.status}): ${errText.slice(0, 160)}`);
  }

  const payload = await response.json();
  const rawText: string =
    payload?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const cleaned = rawText.replace(/```json|```/g, '').trim();
  const parsed = JSON.parse(cleaned);

  const spec: CompositePartSpec = {
    baseLength: Number(parsed?.compositeSpec?.baseLength) || Number(parsed?.dimensions?.length) || 100,
    baseWidth: Number(parsed?.compositeSpec?.baseWidth) || Number(parsed?.dimensions?.width) || 50,
    baseThickness: Number(parsed?.compositeSpec?.baseThickness) || 12,
    hasEndSlots: Boolean(parsed?.compositeSpec?.hasEndSlots),
    slotDepth: Number(parsed?.compositeSpec?.slotDepth) || 20,
    slotWidth: Number(parsed?.compositeSpec?.slotWidth) || 20,
    bossShape:
      parsed?.compositeSpec?.bossShape === 'cylinder' ||
      parsed?.compositeSpec?.bossShape === 'box' ||
      parsed?.compositeSpec?.bossShape === 'none'
        ? parsed.compositeSpec.bossShape
        : 'cylinder',
    bossDiameter: Number(parsed?.compositeSpec?.bossDiameter) || 40,
    bossDepth: Number(parsed?.compositeSpec?.bossDepth) || 40,
    totalHeight: Number(parsed?.compositeSpec?.totalHeight) || Number(parsed?.dimensions?.height) || 50,
    hasHole: Boolean(parsed?.compositeSpec?.hasHole),
    holeDiameter: Number(parsed?.compositeSpec?.holeDiameter) || 20,
    holeDepth: Number(parsed?.compositeSpec?.holeDepth) || 20,
  };

  return {
    partName: String(parsed?.partName || 'Extracted CAD Component'),
    solidType: (parsed?.solidType as SolidType) || 'custom-composite',
    dimensions: {
      length: Math.max(20, Math.min(200, Math.round(Number(parsed?.dimensions?.length) || spec.baseLength))),
      width: Math.max(20, Math.min(200, Math.round(Number(parsed?.dimensions?.width) || spec.baseWidth))),
      height: Math.max(20, Math.min(200, Math.round(Number(parsed?.dimensions?.height) || spec.totalHeight))),
    },
    sideViewMode: parsed?.sideViewMode === 'right' ? 'right' : 'left',
    compositeSpec: spec,
    callouts: Array.isArray(parsed?.callouts) ? parsed.callouts.map(String) : [],
    summary: String(parsed?.summary || 'Extracted dimensions from uploaded isometric drawing.'),
    source: 'gemini-vision',
  };
}

export const OFFLINE_IMAGE_PRESETS: ImageCadExtraction[] = [
  {
    partName: 'Slotted Cylinder Bracket (Ø64 / Ø40×24)',
    solidType: 'slotted-cylinder-bracket',
    dimensions: { length: 140, width: 50, height: 50 },
    sideViewMode: 'left',
    compositeSpec: DEFAULT_SLOTTED_CYLINDER_SPEC,
    callouts: ['140×50 Base', 'T=10', 'Slots 30×20', 'Boss Ø64×50', 'Ø40 Hole 24 Deep'],
    summary: '140×50 mm forked base plate (10 mm thick) with 30 mm end slots and central Ø64×50 mm cylinder with Ø40×24 mm blind hole.',
    source: 'offline-preset',
  },
  {
    partName: 'Stepped T-Block (R10 Groove • 40×50×30)',
    solidType: 'stepped-t-block',
    dimensions: { length: 40, width: 50, height: 30 },
    sideViewMode: 'left',
    compositeSpec: {
      baseLength: 40,
      baseWidth: 50,
      baseThickness: 10,
      hasEndSlots: false,
      slotDepth: 0,
      slotWidth: 0,
      bossShape: 'none',
      bossDiameter: 20,
      bossDepth: 20,
      totalHeight: 30,
      hasHole: false,
      holeDiameter: 20,
      holeDepth: 20,
    },
    callouts: ['40×50 Base', 'H=30', 'Tongue 20×20', 'R10 Groove'],
    summary: '40×50×30 mm stepped T-block with 20 mm tongue and R10 semi-cylindrical vertical groove on rear wall.',
    source: 'offline-preset',
  },
  {
    partName: 'Stepped L-Block',
    solidType: 'l-block',
    dimensions: { length: 60, width: 40, height: 50 },
    sideViewMode: 'left',
    compositeSpec: {
      baseLength: 60,
      baseWidth: 40,
      baseThickness: 20,
      hasEndSlots: false,
      slotDepth: 0,
      slotWidth: 0,
      bossShape: 'box',
      bossDiameter: 30,
      bossDepth: 40,
      totalHeight: 50,
      hasHole: false,
      holeDiameter: 0,
      holeDepth: 0,
    },
    callouts: ['L=60', 'W=40', 'H=50'],
    summary: 'Classic stepped L-block for Front, Top, and Left-Hand Side views.',
    source: 'offline-preset',
  },
  {
    partName: 'Slotted U-Channel Block',
    solidType: 'u-block',
    dimensions: { length: 60, width: 50, height: 45 },
    sideViewMode: 'left',
    compositeSpec: {
      baseLength: 60,
      baseWidth: 50,
      baseThickness: 15,
      hasEndSlots: false,
      slotDepth: 0,
      slotWidth: 0,
      bossShape: 'box',
      bossDiameter: 60,
      bossDepth: 50,
      totalHeight: 45,
      hasHole: false,
      holeDiameter: 0,
      holeDepth: 0,
    },
    callouts: ['L=60', 'W=50', 'H=45'],
    summary: 'Milled U-channel block with interior hidden lines in front and side views.',
    source: 'offline-preset',
  },
  {
    partName: 'Counterbore / Hollow Cylinder',
    solidType: 'counterbore',
    dimensions: { length: 55, width: 55, height: 60 },
    sideViewMode: 'left',
    compositeSpec: {
      baseLength: 55,
      baseWidth: 55,
      baseThickness: 10,
      hasEndSlots: false,
      slotDepth: 0,
      slotWidth: 0,
      bossShape: 'cylinder',
      bossDiameter: 55,
      bossDepth: 55,
      totalHeight: 60,
      hasHole: true,
      holeDiameter: 30,
      holeDepth: 25,
    },
    callouts: ['Ø55 Outer', 'H=60', 'Stepped Bore'],
    summary: 'Turned cylindrical component with stepped bore and concentric circles.',
    source: 'offline-preset',
  },
  {
    partName: 'Machined Bracket (Q9 • RHSV)',
    solidType: 'machined-bracket',
    dimensions: { length: 100, width: 64, height: 75 },
    sideViewMode: 'right',
    compositeSpec: {
      baseLength: 100,
      baseWidth: 64,
      baseThickness: 20,
      hasEndSlots: true,
      slotDepth: 24,
      slotWidth: 30,
      bossShape: 'box',
      bossDiameter: 60,
      bossDepth: 40,
      totalHeight: 75,
      hasHole: false,
      holeDiameter: 0,
      holeDepth: 0,
    },
    callouts: ['100×64×75', 'RHSV'],
    summary: 'Exam-style slotted bracket configured with Right-Hand Side View (RHSV).',
    source: 'offline-preset',
  },
  {
    partName: 'Tapered Slotted Block (Q10 • LHSV)',
    solidType: 'ribbed-block',
    dimensions: { length: 86, width: 34, height: 56 },
    sideViewMode: 'left',
    compositeSpec: {
      baseLength: 86,
      baseWidth: 34,
      baseThickness: 12,
      hasEndSlots: false,
      slotDepth: 0,
      slotWidth: 0,
      bossShape: 'box',
      bossDiameter: 48,
      bossDepth: 34,
      totalHeight: 56,
      hasHole: false,
      holeDiameter: 0,
      holeDepth: 0,
    },
    callouts: ['86×34×56', 'LHSV'],
    summary: 'Exam-style symmetrical tapered block with central slot (LHSV).',
    source: 'offline-preset',
  },
];
