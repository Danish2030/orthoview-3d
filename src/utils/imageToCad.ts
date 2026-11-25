import { createWorker } from 'tesseract.js';
import {
  CompositePartSpec,
  SideViewMode,
  SolidDimensions,
  SolidType,
  UniversalPartBlueprint,
} from '../types';
import { DEFAULT_SLOTTED_CYLINDER_SPEC } from './geometryGenerators';

export interface ImageCadExtraction {
  partName: string;
  solidType: SolidType;
  dimensions: SolidDimensions;
  sideViewMode: SideViewMode;
  compositeSpec: CompositePartSpec;
  universalBlueprint?: UniversalPartBlueprint;
  callouts: string[];
  summary: string;
  source: 'gemini-vision' | 'offline-preset' | 'quick-fill' | 'ocr-inference' | 'serverless-proxy';
}

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const CAD_VISION_PROMPT = `You are a precision Mechanical Engineering CAD parser.
Analyze this isometric engineering drawing image and extract exact millimeter dimensions to reconstruct it as an accurate 3D parametric CAD solid.

Check if this is an exact match for one of our known presets:
- "stepped-t-block": 40x50x30 mm T-shaped block with 20 mm tongue and R10 semi-cylindrical groove on rear wall
- "slotted-cylinder-bracket": 140x50x50 mm forked base plate (10 mm thick, 30 mm slots) with central Ø64 boss and Ø40x24 hole
- "l-block": stepped L-shaped block
- "u-block": slotted U-channel block
- "machined-bracket": 100x64x75 mm slotted and stepped bracket
- "ribbed-block": 86x34x56 mm tapered slotted block
- "counterbore": turned cylinder with stepped counterbore
- "cylinder-hole": cylinder with axial through-hole
- "v-block": machinist 90° V-block

If it matches a known preset, set "solidType" to that preset name, fill "dimensions" { length, width, height } in mm, and set "sideViewMode" to "left" or "right" (usually "left" for LHSV unless drawing specifies RHSV).

For ALL OTHER shapes (or composite shapes with custom combinations of blocks, bosses, holes, slots, grooves, steps):
Set "solidType": "universal-cad".
Decompose the 3D part into ordered CSG (Constructive Solid Geometry) boolean operations:
1. Start with the main base or body as an "add" operation.
2. Add any bosses, ribs, upright walls, or tongues as "add" operations.
3. Cut out any holes, through-holes, slots, grooves, or steps as "subtract" operations.

Coordinate system (in mm):
- Origin (0,0,0) is at the center of the part's base footprint on the ground plane (y=0 is the bottom surface).
- X-axis: along part Length (from -overallLength/2 to +overallLength/2).
- Y-axis: along part Height (from y=0 up to y=overallHeight).
- Z-axis: along part Width / Depth (from -overallWidth/2 to +overallWidth/2). Front is towards +Z, back is towards -Z.

Each operation in "universalBlueprint.operations":
- op: "add" | "subtract"
- shape: "box" | "cylinder"
- x, y, z: center of the primitive (in mm)
- dx, dy, dz: dimensions along X, Y, Z for box (in mm)
- radius, height, axis ("x"|"y"|"z"): for cylinder (in mm). axis is the cylinder's longitudinal axis ("y" for vertical bore/boss, "z" for front-to-back, "x" for side-to-side).

Return ONLY valid JSON (no markdown fences, no explanatory text) matching this schema:
{
  "partName": "string",
  "solidType": "universal-cad" | "stepped-t-block" | "slotted-cylinder-bracket" | "l-block" | "u-block" | "machined-bracket" | "ribbed-block" | "counterbore" | "cylinder-hole" | "v-block",
  "dimensions": { "length": number, "width": number, "height": number },
  "sideViewMode": "left" | "right",
  "universalBlueprint": {
    "overallLength": number,
    "overallWidth": number,
    "overallHeight": number,
    "operations": [
      {
        "op": "add" | "subtract",
        "shape": "box" | "cylinder",
        "x": number,
        "y": number,
        "z": number,
        "dx": number,
        "dy": number,
        "dz": number,
        "radius": number,
        "height": number,
        "axis": "x" | "y" | "z"
      }
    ]
  },
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
}`;

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
  const triple = text.match(
    /(\d+(?:\.\d+)?)\s*(?:mm)?\s*[x×*]\s*(\d+(?:\.\d+)?)\s*(?:mm)?\s*[x×*]\s*(\d+(?:\.\d+)?)/
  );
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
  const thick = grab([
    /(?:base\s*thick(?:ness)?|thick(?:ness)?|t)\s*(?:=|is|:)?\s*(\d+(?:\.\d+)?)/,
  ]);
  const boss = grab([
    /(?:boss|outer|cylinder|cyl|od)\s*(?:ø|dia|diameter)?\s*(?:=|is|:)?\s*(\d+(?:\.\d+)?)/,
    /ø\s*(\d+(?:\.\d+)?)\s*(?:boss|outer|cyl)/,
  ]);
  const hole = grab([
    /(?:hole|bore|inner|id)\s*(?:ø|dia|diameter)?\s*(?:=|is|:)?\s*(\d+(?:\.\d+)?)/,
    /ø\s*(\d+(?:\.\d+)?)\s*hole/,
  ]);
  const holeDepth = grab([
    /(\d+(?:\.\d+)?)\s*(?:mm)?\s*deep/,
    /(?:depth|deep)\s*(?:=|is|:)?\s*(\d+(?:\.\d+)?)/,
  ]);
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

function normalizeExtractionPayload(
  parsed: any,
  source: ImageCadExtraction['source']
): ImageCadExtraction {
  const spec: CompositePartSpec = {
    baseLength:
      Number(parsed?.compositeSpec?.baseLength) || Number(parsed?.dimensions?.length) || 100,
    baseWidth:
      Number(parsed?.compositeSpec?.baseWidth) || Number(parsed?.dimensions?.width) || 50,
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
    totalHeight:
      Number(parsed?.compositeSpec?.totalHeight) || Number(parsed?.dimensions?.height) || 50,
    hasHole: Boolean(parsed?.compositeSpec?.hasHole),
    holeDiameter: Number(parsed?.compositeSpec?.holeDiameter) || 20,
    holeDepth: Number(parsed?.compositeSpec?.holeDepth) || 20,
  };

  let universalBlueprint: UniversalPartBlueprint | undefined = undefined;
  if (
    parsed?.universalBlueprint &&
    Array.isArray(parsed.universalBlueprint.operations) &&
    parsed.universalBlueprint.operations.length > 0
  ) {
    universalBlueprint = {
      overallLength:
        Number(parsed.universalBlueprint.overallLength) ||
        Number(parsed.dimensions?.length) ||
        spec.baseLength,
      overallWidth:
        Number(parsed.universalBlueprint.overallWidth) ||
        Number(parsed.dimensions?.width) ||
        spec.baseWidth,
      overallHeight:
        Number(parsed.universalBlueprint.overallHeight) ||
        Number(parsed.dimensions?.height) ||
        spec.totalHeight,
      operations: parsed.universalBlueprint.operations,
    };
  }

  const solidType = (parsed?.solidType as SolidType) || (universalBlueprint ? 'universal-cad' : 'custom-composite');

  return {
    partName: String(parsed?.partName || 'Extracted CAD Component'),
    solidType,
    dimensions: {
      length: Math.max(
        20,
        Math.min(200, Math.round(Number(parsed?.dimensions?.length) || spec.baseLength))
      ),
      width: Math.max(
        20,
        Math.min(200, Math.round(Number(parsed?.dimensions?.width) || spec.baseWidth))
      ),
      height: Math.max(
        15,
        Math.min(200, Math.round(Number(parsed?.dimensions?.height) || spec.totalHeight))
      ),
    },
    sideViewMode: parsed?.sideViewMode === 'right' ? 'right' : 'left',
    compositeSpec: spec,
    universalBlueprint,
    callouts: Array.isArray(parsed?.callouts) ? parsed.callouts.map(String) : [],
    summary: String(parsed?.summary || 'Extracted dimensions from uploaded isometric drawing.'),
    source,
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

  const prompt = `${CAD_VISION_PROMPT}\n${userHint ? `User hint: ${userHint}` : ''}`;

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
  const rawText: string = payload?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const cleaned = rawText.replace(/```json|```/g, '').trim();
  const parsed = JSON.parse(cleaned);

  return normalizeExtractionPayload(parsed, 'gemini-vision');
}

export async function analyzeWithServerlessProxy(
  endpointUrl: string,
  base64DataUrl: string,
  userHint?: string
): Promise<ImageCadExtraction> {
  const match = base64DataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  const mimeType = match ? match[1] : 'image/jpeg';
  const imageBase64 = match ? match[2] : base64DataUrl;

  const response = await fetch(endpointUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      imageBase64,
      mimeType,
      hint: userHint,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Proxy error (${response.status}): ${errText.slice(0, 160)}`);
  }

  const parsed = await response.json();
  return normalizeExtractionPayload(parsed, 'serverless-proxy');
}

/**
 * Offline client-side OCR fallback using tesseract.js.
 * Reads drawing dimension numbers directly from image pixels with zero external network required.
 */
export async function analyzeWithTesseractOcr(
  base64DataUrl: string
): Promise<ImageCadExtraction> {
  try {
    const worker = await createWorker('eng');
    const ret = await worker.recognize(base64DataUrl);
    await worker.terminate();

    const ocrText = (ret?.data?.text || '').toLowerCase();
    
    // Check for recognized keywords or dimension numbers
    const numbers = (ocrText.match(/\b\d{2,3}\b/g) || [])
      .map(Number)
      .filter((n) => n >= 10 && n <= 200);

    const diaMatches = Array.from(ocrText.matchAll(/[øØdD]\s*(\d+)/g)).map((m) =>
      Number(m[1])
    );

    let length = 100;
    let width = 50;
    let height = 50;

    // Check for stepped T-block
    if (ocrText.includes('groove') || ocrText.includes('r10') || (numbers.includes(40) && numbers.includes(30))) {
      return {
        ...OFFLINE_IMAGE_PRESETS[1],
        source: 'ocr-inference',
      };
    }

    // Check for slotted cylinder bracket
    if (diaMatches.includes(64) || diaMatches.includes(40) || (numbers.includes(140) && numbers.includes(50))) {
      return {
        ...OFFLINE_IMAGE_PRESETS[0],
        source: 'ocr-inference',
      };
    }

    if (numbers.length >= 3) {
      const sorted = [...numbers].sort((a, b) => b - a);
      length = sorted[0];
      width = sorted[1];
      height = sorted[2];
    }

    const bossDia = diaMatches[0] || (numbers.find((n) => n < length && n > 20) || 40);
    const holeDia = diaMatches[1] || (numbers.find((n) => n < bossDia && n > 10) || 20);

    const blueprint: UniversalPartBlueprint = {
      overallLength: length,
      overallWidth: width,
      overallHeight: height,
      operations: [
        {
          op: 'add',
          shape: 'box',
          x: 0,
          y: 6,
          z: 0,
          dx: length,
          dy: 12,
          dz: width,
        },
        {
          op: 'add',
          shape: 'cylinder',
          x: 0,
          y: height / 2,
          z: 0,
          radius: bossDia / 2,
          height: height,
          axis: 'y',
        },
        {
          op: 'subtract',
          shape: 'cylinder',
          x: 0,
          y: height / 2,
          z: 0,
          radius: holeDia / 2,
          height: height + 4,
          axis: 'y',
        },
      ],
    };

    return {
      partName: `Auto-Detected Solid (${length}×${width}×${height})`,
      solidType: 'universal-cad',
      dimensions: { length, width, height },
      sideViewMode: 'left',
      compositeSpec: {
        baseLength: length,
        baseWidth: width,
        baseThickness: 12,
        hasEndSlots: true,
        slotDepth: Math.round(length * 0.2),
        slotWidth: Math.round(width * 0.4),
        bossShape: 'cylinder',
        bossDiameter: bossDia,
        bossDepth: bossDia,
        totalHeight: height,
        hasHole: true,
        holeDiameter: holeDia,
        holeDepth: Math.round(height * 0.5),
      },
      universalBlueprint: blueprint,
      callouts: [`${length}×${width}×${height} mm`, `Boss Ø${bossDia}`, `Bore Ø${holeDia}`],
      summary: `Inferred 3D solid from on-image OCR dimensions: ${length}×${width}×${height} mm with Ø${bossDia} boss and Ø${holeDia} bore.`,
      source: 'ocr-inference',
    };
  } catch (err) {
    console.warn('Tesseract OCR fallback error, using offline default preset:', err);
    return {
      ...OFFLINE_IMAGE_PRESETS[0],
      source: 'offline-preset',
    };
  }
}

/**
 * Universal photo-to-CAD analyzer with smart endpoint discovery:
 * Priority 1: VITE_VISION_PROXY_URL / custom proxyUrl
 * Priority 2: Same-origin Vercel serverless /api/analyze
 * Priority 3: Gemini API key (from parameter or localStorage)
 * Priority 4: Offline tesseract.js OCR inference
 */
export async function analyzeIsometricImage(
  base64DataUrl: string,
  options?: {
    userHint?: string;
    apiKey?: string;
    proxyUrl?: string;
  }
): Promise<ImageCadExtraction> {
  const customProxy =
    options?.proxyUrl ||
    (typeof import.meta !== 'undefined' &&
      (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_VISION_PROXY_URL);
  
  // 1. Dedicated Cloudflare Worker / Custom Proxy URL
  if (customProxy) {
    try {
      return await analyzeWithServerlessProxy(customProxy, base64DataUrl, options?.userHint);
    } catch (e) {
      console.warn('Configured Vision Proxy failed, falling back to next endpoint:', e);
    }
  }

  // 2. Same-origin Vercel Serverless Function (/api/analyze)
  if (typeof window !== 'undefined' && (window.location.hostname.includes('vercel.app') || window.location.hostname === 'localhost')) {
    try {
      return await analyzeWithServerlessProxy('/api/analyze', base64DataUrl, options?.userHint);
    } catch (e) {
      console.warn('Same-origin /api/analyze failed, falling back:', e);
    }
  }

  // 3. User Gemini API Key (if provided in options or stored in localStorage)
  const savedKey = options?.apiKey || (typeof localStorage !== 'undefined' ? localStorage.getItem('orthoview-gemini-key') : null);
  if (savedKey && savedKey.trim().length > 10) {
    try {
      return await analyzeIsometricImageWithGemini(savedKey, base64DataUrl, options?.userHint);
    } catch (e) {
      console.warn('Gemini direct API call failed, falling back:', e);
    }
  }

  // 4. In-browser Tesseract.js OCR & Geometric Inference (100% Offline)
  try {
    return await analyzeWithTesseractOcr(base64DataUrl);
  } catch (e) {
    console.warn('OCR inference failed, falling back to offline preset:', e);
  }

  // 5. Ultimate Fallback
  return {
    ...OFFLINE_IMAGE_PRESETS[0],
    source: 'offline-preset',
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
    summary:
      '140×50 mm forked base plate (10 mm thick) with 30 mm end slots and central Ø64×50 mm cylinder with Ø40×24 mm blind hole.',
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
    summary:
      '40×50×30 mm stepped T-block with 20 mm tongue and R10 semi-cylindrical vertical groove on rear wall.',
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
