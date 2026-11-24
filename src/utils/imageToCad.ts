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
  source: 'gemini-vision' | 'offline-preset';
}

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

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
  "solidType": "slotted-cylinder-bracket" | "custom-composite" | "l-block" | "u-block" | "machined-bracket" | "ribbed-block" | "v-block" | "counterbore" | "cylinder-hole",
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
    throw new Error(`Gemini Vision API error (${response.status}): ${errText.slice(0, 180)}`);
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
    partName: 'Slotted Cylinder Bracket (Ø64 / Ø40×24 Deep)',
    solidType: 'slotted-cylinder-bracket',
    dimensions: { length: 140, width: 50, height: 50 },
    sideViewMode: 'left',
    compositeSpec: DEFAULT_SLOTTED_CYLINDER_SPEC,
    callouts: ['L = 140 mm', 'W = 50 mm', 'Base T = 10 mm', 'End Slots 30×20 mm (15 mm fingers)', 'Boss Ø64 × 50 mm', 'Ø40 HOLE, 24 DEEP'],
    summary: '140×50 mm forked base plate (10 mm thick) with 30 mm end slots and central Ø64×50 mm cylinder containing a Ø40×24 mm blind hole.',
    source: 'offline-preset',
  },
  {
    partName: 'Stepped T-Block with R10 Slot',
    solidType: 'custom-composite',
    dimensions: { length: 50, width: 40, height: 30 },
    sideViewMode: 'left',
    compositeSpec: {
      baseLength: 50,
      baseWidth: 40,
      baseThickness: 10,
      hasEndSlots: true,
      slotDepth: 20,
      slotWidth: 20,
      bossShape: 'box',
      bossDiameter: 30,
      bossDepth: 40,
      totalHeight: 30,
      hasHole: false,
      holeDiameter: 20,
      holeDepth: 20,
    },
    callouts: ['L = 50 mm', 'W = 40 mm', 'H = 30 mm', 'Step = 10 mm', 'R10 Slot'],
    summary: '50×40×30 mm stepped L/T block with 10 mm front projection and central 20 mm slot.',
    source: 'offline-preset',
  },
];
