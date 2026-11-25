// Cloudflare Worker Proxy: GET /analyze (health check) | POST /analyze (vision proxy)
// Proxies Gemini 2.5-flash Vision API requests reading env.GEMINI_API_KEY from Worker secrets

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

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const apiKey = env.GEMINI_API_KEY;
    const url = new URL(request.url);

    // GET Health-Check Endpoint
    if (request.method === 'GET') {
      return new Response(
        JSON.stringify({
          ok: true,
          service: 'orthoview-vision-proxy',
          model: 'gemini-2.5-flash',
          keyConfigured: Boolean(apiKey && apiKey.trim().length > 0),
          keyPrefix: apiKey && apiKey.trim().length > 3 ? apiKey.trim().slice(0, 3) : null,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Endpoint not found or method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    try {
      if (!apiKey || !apiKey.trim()) {
        return new Response(
          JSON.stringify({
            error: 'GEMINI_API_KEY is not configured on Cloudflare Worker secrets.',
            hint: 'Set GEMINI_API_KEY in Cloudflare Worker secrets via wrangler secret put GEMINI_API_KEY.',
          }),
          { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }

      const body = await request.json().catch(() => ({}));
      // Accept imageBase64 / hint AND fall back to image / userHint
      const rawImage = body.imageBase64 || body.image;
      const rawHint = body.hint || body.userHint;
      let mimeType = body.mimeType;

      if (!rawImage || typeof rawImage !== 'string') {
        return new Response(JSON.stringify({ error: 'Missing imageBase64 or image payload.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      if (rawImage.length > 8 * 1024 * 1024) {
        return new Response(JSON.stringify({ error: 'Payload too large (limit 6MB).' }), {
          status: 413,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // Infer mimeType from data URL if omitted
      const match = rawImage.match(/^data:([^;]+);base64,/);
      if (match && !mimeType) {
        mimeType = match[1];
      }
      if (!mimeType) {
        mimeType = 'image/jpeg';
      }

      const cleanBase64 = rawImage.replace(/^data:[^;]+;base64,/, '').trim();

      // Call Gemini generateContent WITHOUT ?key= in the URL, passing x-goog-api-key header
      const geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
      const promptText = rawHint ? `${SYSTEM_PROMPT}\nUser hint / note: ${rawHint}` : SYSTEM_PROMPT;

      const res = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey.trim(),
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: promptText },
                {
                  inlineData: {
                    mimeType,
                    data: cleanBase64,
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

      if (!res.ok) {
        const errText = await res.text();
        let parsedErr = null;
        try {
          parsedErr = JSON.parse(errText);
        } catch {
          // ignore
        }
        const upstreamMsg =
          parsedErr?.error?.message || errText.slice(0, 300) || `HTTP ${res.status}`;
        const isAuthError = res.status === 401 || res.status === 403;

        return new Response(
          JSON.stringify({
            error: `Gemini API error (${res.status}): ${upstreamMsg}`,
            upstreamStatus: res.status,
            ...(isAuthError
              ? {
                  hint: 'Authentication failed. If using an API key from Google Cloud Console, ensure the Generative Language API is enabled and API key restrictions allow it.',
                }
              : {}),
          }),
          { status: res.status, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }

      const data = await res.json();
      const rawContent = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawContent) {
        return new Response(JSON.stringify({ error: 'Empty response from Gemini Vision.' }), {
          status: 502,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // Safely extract JSON: strip markdown fences and find outermost { ... }
      const stripped = rawContent.replace(/```json/gi, '').replace(/```/g, '').trim();
      const firstBrace = stripped.indexOf('{');
      const lastBrace = stripped.lastIndexOf('}');

      if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
        return new Response(
          JSON.stringify({
            error: `Unable to locate JSON object in Gemini response: ${stripped.slice(0, 160)}`,
          }),
          {
            status: 502,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );
      }

      const jsonString = stripped.slice(firstBrace, lastBrace + 1);
      const parsed = JSON.parse(jsonString);

      return new Response(JSON.stringify(parsed), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message || 'Worker internal error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  },
};
