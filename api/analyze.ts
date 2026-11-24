// Vercel Serverless Function: POST /api/analyze
// Proxies Gemini 2.5-flash Vision API requests securely without exposing GEMINI_API_KEY to the client

export const config = {
  maxDuration: 30,
};

const SYSTEM_PROMPT = `You are an expert Mechanical Engineering CAD & Computer-Aided Drafting AI.
Analyze this textbook/exam isometric engineering drawing photo and extract exact 3D parametric geometry.

First, check if this is an exact match for one of our known presets:
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
  "summary": "one-sentence summary of features and dimensions"
}`;

export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the Vercel server.' });
    }

    const { imageBase64, mimeType, hint } = req.body || {};
    if (!imageBase64) {
      return res.status(400).json({ error: 'Missing imageBase64 payload.' });
    }

    if (imageBase64.length > 8 * 1024 * 1024) {
      return res.status(413).json({ error: 'Payload too large (limit 6MB).' });
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey.trim()}`;
    const promptText = hint ? `${SYSTEM_PROMPT}\nUser hint / note: ${hint}` : SYSTEM_PROMPT;

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: promptText },
              {
                inlineData: {
                  mimeType: mimeType || 'image/jpeg',
                  data: imageBase64.replace(/^data:[^;]+;base64,/, ''),
                },
              },
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
      return res.status(response.status).json({ error: `Gemini API error (${response.status}): ${errText.slice(0, 200)}` });
    }

    const data = await response.json();
    const rawContent = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawContent) {
      return res.status(502).json({ error: 'Empty response from Gemini Vision.' });
    }

    const cleaned = rawContent.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    return res.status(200).json(parsed);
  } catch (err: any) {
    console.error('Analyze error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
