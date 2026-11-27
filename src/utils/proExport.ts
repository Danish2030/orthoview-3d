import { CadLayerId, ProProjectState } from '../types/pro';

export interface BoqRow {
  itemNo: string;
  desc: string;
  unit: string;
  qty: number;
  rate: number;
  amount: number;
}

export interface BoqTakeoffSummary {
  totalFloorAreaSqM: number;
  totalConcreteCuM: number;
  brickCount: number;
  plasterAreaSqM: number;
  tileCount: number;
  totalSteelKg: number;
  grandTotal: number;
  rows: BoqRow[];
}

/**
 * Single source of truth for Professional BOQ & Material Takeoff calculations.
 * Accounts for numFloors, shared internal wall factor (0.78), door/window deductions,
 * column/footing concrete, and staircase waist slab volume.
 */
export function computeBoqTakeoff(project: ProProjectState): BoqTakeoffSummary {
  const numFloors = Math.max(1, project.buildingLevels.numFloors || 1);
  const wallHeightM = Math.max(2.1, (project.buildingLevels.floorHeightMm || 3000) / 1000);
  const slabThickM = Math.max(0.1, (project.buildingLevels.slabThicknessMm || 125) / 1000);
  const plinthHeightM = Math.max(0.3, (project.buildingLevels.plinthHeightMm || 600) / 1000);
  const settings = project.boqSettings;

  let singleFloorAreaSqM = 0;
  let singleFloorWallPerimM = 0;
  let singleFloorOpeningsSqM = 0;

  for (const r of project.rooms) {
    const wM = Math.max(0, r.width) / 1000;
    const dM = Math.max(0, r.depth) / 1000;
    singleFloorAreaSqM += wM * dM;
    singleFloorWallPerimM += 2 * (wM + dM);

    for (const door of r.doors) {
      singleFloorOpeningsSqM += (Math.max(0, door.widthMm) / 1000) * 2.1;
    }
    for (const win of r.windows) {
      singleFloorOpeningsSqM += (Math.max(0, win.widthMm) / 1000) * (Math.max(0, win.heightMm) / 1000);
    }
  }

  // Apply 0.78 shared-wall factor when multiple adjacent rooms exist to avoid double-counting interior partitions
  const sharedWallFactor = project.rooms.length > 1 ? 0.78 : 1.0;
  const effectivePerimM = singleFloorWallPerimM * sharedWallFactor;

  const totalFloorAreaSqM = singleFloorAreaSqM * numFloors;
  const grossWallAreaSqM = effectivePerimM * wallHeightM * numFloors;
  const netWallAreaSqM = Math.max(0, grossWallAreaSqM - singleFloorOpeningsSqM * numFloors);

  // 1. Concrete (m³): Floor Slabs + Columns (all floors + plinth) + Isolated Footings + Staircase Waist Slab
  const slabVol = totalFloorAreaSqM * slabThickM;
  let colVol = 0;
  let footingVol = 0;
  const totalColHeightM = plinthHeightM + numFloors * (wallHeightM + slabThickM);
  for (const col of project.columnGrid.columns) {
    colVol += (col.widthMm / 1000) * (col.depthMm / 1000) * totalColHeightM;
    footingVol += (col.footingWidthMm / 1000) * (col.footingLengthMm / 1000) * 0.45;
  }
  const stairW = (project.staircase.flightWidthMm || 1200) / 1000;
  const stairWaist = (project.staircase.waistSlabMm || 150) / 1000;
  const stairVol = numFloors > 0 ? stairW * 4.2 * (stairWaist + 0.08) * numFloors : 0;

  const totalConcreteCuM = slabVol + colVol + footingVol + stairVol;

  // 2. Masonry: 230mm average wall thickness; 500 bricks/m³ or ~42 AAC blocks/m³
  const wallVolumeCuM = netWallAreaSqM * 0.21;
  const isAac = settings.brickType === 'aac-block';
  const brickCount = Math.round(isAac ? wallVolumeCuM * 42 : wallVolumeCuM * 500);

  // 3. Plastering Area: Both faces of net walls + ceiling soffit
  const plasterAreaSqM = netWallAreaSqM * 2.0 + totalFloorAreaSqM * 0.85;

  // 4. Flooring Tiles (+10% cutting wastage)
  const tileSideM = (settings.tileSizeMm || 600) / 1000;
  const singleTileArea = Math.max(0.01, tileSideM * tileSideM);
  const tileCount = Math.ceil((totalFloorAreaSqM * 1.1) / singleTileArea);

  // 5. Reinforcement Steel (approx 85 kg/m³ of RCC)
  const totalSteelKg = Math.round(totalConcreteCuM * 85);
  const concreteRate = settings.concreteGrade === 'M25' ? 6400 : 5800;

  const rows: BoqRow[] = [
    {
      itemNo: '1.01',
      desc: 'Earthwork excavation in foundation trenches including shoring & dewatering as per IS 1200',
      unit: 'm³',
      qty: footingVol * 1.8,
      rate: 350,
      amount: footingVol * 1.8 * 350,
    },
    {
      itemNo: '2.01',
      desc: `Ready-mix ${settings.concreteGrade} Reinforced Cement Concrete for footings, columns, slabs & stairs`,
      unit: 'm³',
      qty: totalConcreteCuM,
      rate: concreteRate,
      amount: totalConcreteCuM * concreteRate,
    },
    {
      itemNo: '3.01',
      desc: 'High-yield Fe500D TMT reinforcement steel bars including cutting, bending & placing (IS 1786)',
      unit: 'kg',
      qty: totalSteelKg,
      rate: settings.steelRateKg,
      amount: totalSteelKg * settings.steelRateKg,
    },
    {
      itemNo: '4.01',
      desc: `Masonry work in cement mortar (1:6) using ${isAac ? 'AAC lightweight blocks (600×200×200mm)' : 'Class 1 clay burnt bricks'}`,
      unit: isAac ? 'Blocks' : 'Nos.',
      qty: brickCount,
      rate: isAac ? 68 : 9.5,
      amount: brickCount * (isAac ? 68 : 9.5),
    },
    {
      itemNo: '5.01',
      desc: 'Cement plastering (1:4) 15mm thick for internal, external walls & ceiling soffits',
      unit: 'm²',
      qty: plasterAreaSqM,
      rate: 220,
      amount: plasterAreaSqM * 220,
    },
    {
      itemNo: '6.01',
      desc: `Flooring tiles (${settings.tileSizeMm}×${settings.tileSizeMm}mm vitrified) laid with polymer adhesive & grouting`,
      unit: 'Tiles',
      qty: tileCount,
      rate: 180,
      amount: tileCount * 180,
    },
  ];

  const grandTotal = rows.reduce((sum, r) => sum + r.amount, 0);

  return {
    totalFloorAreaSqM,
    totalConcreteCuM,
    brickCount,
    plasterAreaSqM,
    tileCount,
    totalSteelKg,
    grandTotal,
    rows,
  };
}

/**
 * Downloads arbitrary text as a file in the browser
 */
function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Generates an AutoCAD R12 (AC1009) compliant DXF file with valid group codes (10/20/11/21),
 * LTYPE + LAYER tables, active-layer filtering, door swing ARCs, and room TEXT labels.
 */
export function exportProjectAsDxf(project: ProProjectState): void {
  const lines: string[] = [];
  const activeSet = new Set<CadLayerId>(project.activeLayerIds || []);
  const isLayerOn = (id: CadLayerId) => activeSet.size === 0 || activeSet.has(id);

  // Compute maxY to invert Y-axis from SVG top-down to CAD bottom-up coordinates
  let maxY = 10000;
  for (const r of project.rooms) {
    if (r.y + r.depth > maxY) maxY = r.y + r.depth;
  }
  const cadY = (y: number) => maxY - y;

  // DXF Header
  lines.push('0', 'SECTION', '2', 'HEADER');
  lines.push('9', '$ACADVER', '1', 'AC1009');
  lines.push('9', '$INSUNITS', '70', '4'); // 4 = Millimeters
  lines.push('0', 'ENDSEC');

  // DXF Tables (LTYPE + LAYER)
  lines.push('0', 'SECTION', '2', 'TABLES');
  lines.push('0', 'TABLE', '2', 'LTYPE', '70', '1');
  lines.push('0', 'LTYPE', '2', 'CONTINUOUS', '70', '0', '3', 'Solid line', '72', '65', '73', '0', '40', '0.0');
  lines.push('0', 'ENDTAB');

  lines.push('0', 'TABLE', '2', 'LAYER', '70', '7');
  const layerDefs: { name: CadLayerId; color: number }[] = [
    { name: 'A-WALL', color: 4 },
    { name: 'A-DOOR', color: 2 },
    { name: 'S-COLS', color: 1 },
    { name: 'E-LITE', color: 5 },
    { name: 'P-PIPE', color: 6 },
    { name: 'M-HVAC', color: 3 },
    { name: 'A-DIMS', color: 8 },
  ];

  for (const l of layerDefs) {
    // Negative color in DXF marks layer as turned off in AutoCAD
    const colorCode = isLayerOn(l.name) ? l.color : -l.color;
    lines.push('0', 'LAYER', '2', l.name, '70', '0', '62', colorCode.toString(), '6', 'CONTINUOUS');
  }
  lines.push('0', 'ENDTAB', '0', 'ENDSEC');

  // DXF Entities
  lines.push('0', 'SECTION', '2', 'ENTITIES');

  const addLine = (layer: CadLayerId, x1: number, y1: number, x2: number, y2: number) => {
    if (!isLayerOn(layer)) return;
    lines.push(
      '0', 'LINE',
      '8', layer,
      '10', x1.toFixed(2),
      '20', cadY(y1).toFixed(2),
      '30', '0.0',
      '11', x2.toFixed(2),
      '21', cadY(y2).toFixed(2),
      '31', '0.0'
    );
  };

  const addArc = (layer: CadLayerId, cx: number, cy: number, radius: number, startDeg: number, endDeg: number) => {
    if (!isLayerOn(layer)) return;
    lines.push(
      '0', 'ARC',
      '8', layer,
      '10', cx.toFixed(2),
      '20', cadY(cy).toFixed(2),
      '30', '0.0',
      '40', radius.toFixed(2),
      '50', startDeg.toFixed(1),
      '51', endDeg.toFixed(1)
    );
  };

  const addText = (layer: CadLayerId, x: number, y: number, height: number, text: string) => {
    if (!isLayerOn(layer)) return;
    lines.push(
      '0', 'TEXT',
      '8', layer,
      '10', x.toFixed(2),
      '20', cadY(y).toFixed(2),
      '30', '0.0',
      '40', height.toFixed(1),
      '1', text
    );
  };

  const addRect = (layer: CadLayerId, x: number, y: number, w: number, h: number) => {
    addLine(layer, x, y, x + w, y);
    addLine(layer, x + w, y, x + w, y + h);
    addLine(layer, x + w, y + h, x, y + h);
    addLine(layer, x, y + h, x, y);
  };

  // 1. Export Floor Plan Rooms, Walls, Doors, Windows & Room Labels
  for (const room of project.rooms) {
    addRect('A-WALL', room.x, room.y, room.width, room.depth);
    const t = room.wallExtMm;
    if (room.width > 2 * t && room.depth > 2 * t) {
      addRect('A-WALL', room.x + t, room.y + t, room.width - 2 * t, room.depth - 2 * t);
    }

    addText('A-DIMS', room.x + room.width * 0.25, room.y + room.depth * 0.5, 160, room.name.toUpperCase());
    addText(
      'A-DIMS',
      room.x + room.width * 0.25,
      room.y + room.depth * 0.5 + 240,
      110,
      `${(room.width / 1000).toFixed(2)}m x ${(room.depth / 1000).toFixed(2)}m`
    );

    for (const d of room.doors) {
      if (d.wall === 'S') {
        const dx = room.x + d.offset;
        addLine('A-DOOR', dx, room.y, dx, room.y + d.widthMm);
        addArc('A-DOOR', dx, room.y, d.widthMm, 270, 360);
      } else if (d.wall === 'N') {
        const dx = room.x + d.offset;
        addLine('A-DOOR', dx, room.y + room.depth, dx, room.y + room.depth - d.widthMm);
        addArc('A-DOOR', dx, room.y + room.depth, d.widthMm, 0, 90);
      } else if (d.wall === 'W') {
        const dy = room.y + d.offset;
        addLine('A-DOOR', room.x, dy, room.x + d.widthMm, dy);
        addArc('A-DOOR', room.x, dy, d.widthMm, 270, 360);
      } else if (d.wall === 'E') {
        const dy = room.y + d.offset;
        addLine('A-DOOR', room.x + room.width, dy, room.x + room.width - d.widthMm, dy);
        addArc('A-DOOR', room.x + room.width, dy, d.widthMm, 180, 270);
      }
    }

    for (const w of room.windows) {
      if (w.wall === 'S') {
        addRect('A-DOOR', room.x + w.offset, room.y, w.widthMm, t);
      } else if (w.wall === 'N') {
        addRect('A-DOOR', room.x + w.offset, room.y + room.depth - t, w.widthMm, t);
      } else if (w.wall === 'W') {
        addRect('A-DOOR', room.x, room.y + w.offset, t, w.widthMm);
      } else if (w.wall === 'E') {
        addRect('A-DOOR', room.x + room.width - t, room.y + w.offset, t, w.widthMm);
      }
    }
  }

  // 2. Export Columns & Footings (S-COLS)
  for (const col of project.columnGrid.columns) {
    addRect('S-COLS', col.x - col.widthMm / 2, col.y - col.depthMm / 2, col.widthMm, col.depthMm);
    addRect('S-COLS', col.x - col.footingWidthMm / 2, col.y - col.footingLengthMm / 2, col.footingWidthMm, col.footingLengthMm);
  }

  // 3. Export MEP Nodes (E-LITE, P-PIPE, M-HVAC)
  for (const node of project.mepNodes) {
    const layer: CadLayerId =
      node.discipline === 'electrical' ? 'E-LITE' : node.discipline === 'plumbing' ? 'P-PIPE' : 'M-HVAC';
    addLine(layer, node.x - 90, node.y, node.x + 90, node.y);
    addLine(layer, node.x, node.y - 90, node.x, node.y + 90);
    addText(layer, node.x + 110, node.y, 100, node.tag);
  }

  lines.push('0', 'ENDSEC', '0', 'EOF');

  const dxfContent = lines.join('\r\n');
  const safeName = project.name.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
  downloadFile(dxfContent, `${safeName}_vector_cad.dxf`, 'application/dxf');
}

/**
 * Generates an auto-fitted fallback schematic SVG of the active project's Floor Plan
 * (used when exporting from ProDashboard or a non-SVG 3D/table tab).
 */
function buildFallbackPlanInnerSvg(project: ProProjectState): { viewBox: string; body: string } {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const r of project.rooms) {
    if (r.x < minX) minX = r.x;
    if (r.y < minY) minY = r.y;
    if (r.x + r.width > maxX) maxX = r.x + r.width;
    if (r.y + r.depth > maxY) maxY = r.y + r.depth;
  }
  if (!Number.isFinite(minX)) {
    minX = 0;
    minY = 0;
    maxX = 8000;
    maxY = 8000;
  }

  const pad = 900;
  const vb = `${minX - pad} ${minY - pad} ${maxX - minX + pad * 2} ${maxY - minY + pad * 2}`;
  const roomsSvg = project.rooms
    .map((r) => {
      const t = r.wallExtMm;
      return `
        <rect x="${r.x}" y="${r.y}" width="${r.width}" height="${r.depth}" fill="#f8fafc" stroke="#0f172a" stroke-width="55" />
        <rect x="${r.x + t}" y="${r.y + t}" width="${Math.max(100, r.width - 2 * t)}" height="${Math.max(100, r.depth - 2 * t)}" fill="none" stroke="#334155" stroke-width="25" />
        <text x="${r.x + r.width / 2}" y="${r.y + r.depth / 2 - 40}" text-anchor="middle" font-size="220" font-weight="700" fill="#0f172a">${r.name}</text>
        <text x="${r.x + r.width / 2}" y="${r.y + r.depth / 2 + 210}" text-anchor="middle" font-size="165" fill="#475569">${(r.width / 1000).toFixed(2)}m × ${(r.depth / 1000).toFixed(2)}m</text>
      `;
    })
    .join('');

  return { viewBox: vb, body: roomsSvg };
}

/**
 * Captures the live active Pro studio SVG from the DOM (if present) and normalizes it
 * for print/light-background GFC output, or falls back to the auto-fitted Floor Plan schematic.
 */
function resolveGfcDrawingViewport(
  project: ProProjectState,
  innerSvgOrModule?: string,
  frameW = 360,
  frameH = 185
): string {
  // 1. Try explicit raw SVG markup if provided
  if (innerSvgOrModule && innerSvgOrModule.trim().startsWith('<')) {
    return `<svg x="26" y="16" width="${frameW}" height="${frameH}" preserveAspectRatio="xMidYMid meet">${innerSvgOrModule}</svg>`;
  }

  // 2. Try capturing the active Pro studio SVG from the DOM
  if (typeof document !== 'undefined') {
    const liveSvg = document.querySelector('#pro-active-stage svg') as SVGSVGElement | null;
    if (liveSvg) {
      const vb = liveSvg.getAttribute('viewBox') || '0 0 1000 800';
      const clone = liveSvg.cloneNode(true) as SVGSVGElement;
      // Ensure dark-mode currentColor resolves to crisp dark ink on white GFC paper
      const serializedInner = clone.innerHTML
        .replace(/currentColor/g, '#0f172a')
        .replace(/var\(--accent-hex\)/g, '#0284c7')
        .replace(/var\(--accent-soft\)/g, 'rgba(2,132,199,0.12)');
      return `<svg x="26" y="16" width="${frameW}" height="${frameH}" viewBox="${vb}" preserveAspectRatio="xMidYMid meet">${serializedInner}</svg>`;
    }
  }

  // 3. Fallback: auto-fitted architectural floor plan schematic
  const fallback = buildFallbackPlanInnerSvg(project);
  return `<svg x="26" y="16" width="${frameW}" height="${frameH}" viewBox="${fallback.viewBox}" preserveAspectRatio="xMidYMid meet">${fallback.body}</svg>`;
}

/**
 * Builds a professional GFC (Good For Construction) architectural sheet SVG with Title Block,
 * Revision Table, Rotatable North Arrow, Scale Bar, and Zone Margins.
 */
export function buildGfcSheetSvg(
  project: ProProjectState,
  innerSvgOrModule: string,
  sheetTitle: string
): string {
  const gfc = project.gfcMeta;
  const isA1 = gfc.sheetSize === 'A1';
  const width = isA1 ? 841 : gfc.sheetSize === 'A2' ? 594 : 420;
  const height = isA1 ? 594 : gfc.sheetSize === 'A2' ? 420 : 297;

  const tbWidth = 230;
  const tbHeight = 68;
  const tbX = width - 15 - tbWidth;
  const tbY = height - 15 - tbHeight;

  // Drawing window cleanly avoids border, North arrow, scale bar, and Title Block
  const drawFrameW = width - 72;
  const drawFrameH = height - tbHeight - 40;
  const drawingViewport = resolveGfcDrawingViewport(project, innerSvgOrModule, drawFrameW, drawFrameH);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}mm" height="${height}mm" style="background:#ffffff; font-family:'Inter', system-ui, sans-serif;">
  <style>
    .cad-border { stroke: #0f172a; stroke-width: 0.7; fill: none; }
    .cad-thin { stroke: #334155; stroke-width: 0.25; fill: none; }
    .cad-txt-lg { font-size: 3.2px; font-weight: 700; fill: #0f172a; }
    .cad-txt-md { font-size: 2.2px; font-weight: 600; fill: #1e293b; }
    .cad-txt-sm { font-size: 1.7px; font-weight: 500; fill: #475569; }
    .cad-txt-label { font-size: 1.4px; font-weight: 600; fill: #64748b; text-transform: uppercase; }
  </style>

  <!-- Outer Sheet Margin & Cut Lines -->
  <rect x="5" y="5" width="${width - 10}" height="${height - 10}" class="cad-thin" stroke-dasharray="2 2" />

  <!-- Architectural Drawing Border (20mm Left Binding, 10mm others) -->
  <rect x="20" y="10" width="${width - 30}" height="${height - 20}" class="cad-border" stroke-width="0.9" />
  <rect x="22" y="12" width="${width - 34}" height="${height - 24}" class="cad-thin" />

  <!-- Sheet Zone Reference Header -->
  <g class="cad-txt-label" opacity="0.7">
    <text x="${width / 2}" y="8.5" text-anchor="middle">VECTORDESK PRO • ISO 5457 ${gfc.sheetSize} ARCHITECTURAL SHEET</text>
  </g>

  <!-- Auto-Fitted Main Drawing Window -->
  ${drawingViewport}

  <!-- Architectural North Arrow Symbol (Rotatable) -->
  <g transform="translate(${width - 28}, 28) rotate(${gfc.northAngle})">
    <circle cx="0" cy="0" r="7.5" fill="#ffffff" stroke="#0f172a" stroke-width="0.35" />
    <polygon points="0,-6.5 2.8,4.5 0,2.5 -2.8,4.5" fill="#0f172a" />
    <text x="0" y="-8.5" text-anchor="middle" font-size="2.4px" font-weight="bold" fill="#0f172a">N</text>
  </g>

  <!-- Graphic Scale Bar -->
  <g transform="translate(28, ${height - 24})">
    <rect x="0" y="0" width="10" height="2" fill="#0f172a" />
    <rect x="10" y="0" width="10" height="2" fill="#ffffff" stroke="#0f172a" stroke-width="0.25" />
    <rect x="20" y="0" width="10" height="2" fill="#0f172a" />
    <rect x="30" y="0" width="20" height="2" fill="#ffffff" stroke="#0f172a" stroke-width="0.25" />
    <text x="0" y="4.5" class="cad-txt-sm">0</text>
    <text x="10" y="4.5" class="cad-txt-sm">1m</text>
    <text x="20" y="4.5" class="cad-txt-sm">2m</text>
    <text x="30" y="4.5" class="cad-txt-sm">3m</text>
    <text x="50" y="4.5" class="cad-txt-sm">5m</text>
    <text x="0" y="-1.5" class="cad-txt-label">GRAPHIC SCALE (${gfc.scale})</text>
  </g>

  <!-- Architectural GFC Standard Title Block -->
  <g transform="translate(${tbX}, ${tbY})">
    <rect x="0" y="0" width="${tbWidth}" height="${tbHeight}" fill="#ffffff" stroke="#0f172a" stroke-width="0.6" />
    <rect x="0" y="0" width="${tbWidth}" height="13" fill="#0f172a" />
    <text x="6" y="8.5" font-size="3.8px" font-weight="800" fill="#ffffff" letter-spacing="0.4">VECTORDESK • PRO CAD STUDIO</text>
    <text x="${tbWidth - 6}" y="8.5" font-size="2.1px" font-weight="600" fill="#38bdf8" text-anchor="end">GOOD FOR CONSTRUCTION (GFC)</text>

    <line x1="0" y1="26" x2="${tbWidth}" y2="26" class="cad-thin" />
    <g transform="translate(6, 18)">
      <text x="0" y="0" class="cad-txt-label">PROJECT TITLE</text>
      <text x="0" y="5" class="cad-txt-md">${gfc.projectTitle}</text>
    </g>

    <line x1="115" y1="26" x2="115" y2="49" class="cad-thin" />
    <line x1="0" y1="49" x2="${tbWidth}" y2="49" class="cad-thin" />

    <g transform="translate(6, 32)">
      <text x="0" y="0" class="cad-txt-label">CLIENT / DEVELOPER</text>
      <text x="0" y="4.5" class="cad-txt-md">${gfc.clientName}</text>
      <text x="0" y="9" class="cad-txt-sm">Status: ${gfc.revisions[gfc.revisions.length - 1]?.status || 'GFC'} Release</text>
    </g>

    <g transform="translate(121, 32)">
      <text x="0" y="0" class="cad-txt-label">ARCHITECT &amp; STRUCTURAL</text>
      <text x="0" y="4.5" class="cad-txt-md">${gfc.architectName}</text>
      <text x="0" y="9" class="cad-txt-sm">${gfc.contractorName}</text>
    </g>

    <g transform="translate(6, 55)">
      <text x="0" y="0" class="cad-txt-label">SHEET: <tspan font-weight="700" fill="#0f172a">${sheetTitle}</tspan></text>
      <text x="0" y="6.5" class="cad-txt-sm">DWG: <tspan font-weight="700">${gfc.drawingNo}</tspan> • REV: <tspan font-weight="700" fill="#ef4444">${gfc.revisions[gfc.revisions.length - 1]?.rev || 'R2'}</tspan> • SCALE ${gfc.scale} • ${gfc.sheetSize}</text>
    </g>

    <g transform="translate(${tbWidth - 52}, 55)">
      <text x="0" y="0" class="cad-txt-label">DATE OF ISSUE</text>
      <text x="0" y="5.5" class="cad-txt-md">${new Date().toLocaleDateString('en-GB')}</text>
    </g>
  </g>
</svg>`;
}

/**
 * Downloads active GFC SVG Sheet directly
 */
export function exportGfcSvgSheetFile(project: ProProjectState, innerSvgOrModule?: string, title?: string): void {
  const sheetTitle =
    title ||
    (innerSvgOrModule && !innerSvgOrModule.trim().startsWith('<')
      ? innerSvgOrModule.toUpperCase().replace(/-/g, ' ')
      : 'GFC WORKING DRAWING');
  const fullSvg = buildGfcSheetSvg(project, innerSvgOrModule || '', sheetTitle);
  const safeName = sheetTitle.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
  downloadFile(fullSvg, `${safeName}_gfc_sheet.svg`, 'image/svg+xml');
}

/**
 * Exports live-calculated BOQ and Joinery schedules as a structured CSV spreadsheet
 */
export function exportBoqAsCsv(project: ProProjectState, boqRows?: BoqRow[]): void {
  const lines: string[] = [];
  const rows = boqRows && boqRows.length > 0 ? boqRows : computeBoqTakeoff(project).rows;

  lines.push(`"VECTORDESK PROFESSIONAL BILL OF QUANTITIES (BOQ)"`);
  lines.push(`"Project:","${project.gfcMeta.projectTitle}"`);
  lines.push(`"Client:","${project.gfcMeta.clientName}"`);
  lines.push(`"Floors:","${project.buildingLevels.numFloors || 1}"`);
  lines.push(`"Date:","${new Date().toLocaleDateString('en-GB')}"`);
  lines.push(`"Status:","${project.gfcMeta.revisions[project.gfcMeta.revisions.length - 1]?.status || 'GFC'}"`);
  lines.push('');

  lines.push(`"Item No","Description","Unit","Quantity","Rate (INR)","Amount (INR)"`);
  let grandTotal = 0;
  for (const row of rows) {
    lines.push(
      `"${row.itemNo}","${row.desc.replace(/"/g, '""')}","${row.unit}",${row.qty.toFixed(2)},${row.rate},${row.amount.toFixed(2)}`
    );
    grandTotal += row.amount;
  }
  lines.push(`"","ESTIMATED GRAND TOTAL (EXCL. TAX)","","","",${grandTotal.toFixed(2)}`);
  lines.push('');

  lines.push(`"DOOR & WINDOW JOINERY SCHEDULE"`);
  lines.push(`"Tag","Opening Type","Width (mm)","Height (mm)","Sill (mm)","Quantity","Specification"`);

  const doorMap = new Map<string, { width: number; height: number; count: number }>();
  const winMap = new Map<string, { width: number; height: number; sill: number; count: number }>();

  for (const r of project.rooms) {
    for (const d of r.doors) {
      const prev = doorMap.get(d.tag) || { width: d.widthMm, height: 2100, count: 0 };
      prev.count++;
      doorMap.set(d.tag, prev);
    }
    for (const w of r.windows) {
      const prev = winMap.get(w.tag) || { width: w.widthMm, height: w.heightMm, sill: w.sillMm, count: 0 };
      prev.count++;
      winMap.set(w.tag, prev);
    }
  }

  doorMap.forEach((v, tag) => {
    lines.push(`"${tag}","Flush Door / Hardwood",${v.width},${v.height},0,${v.count},"Teak wood frame with 35mm flush shutter"`);
  });

  winMap.forEach((v, tag) => {
    const isVent = tag.startsWith('V');
    lines.push(
      `"${tag}","${isVent ? 'Louvered Ventilator' : 'Glazed Window'}",${v.width},${v.height},${v.sill},${v.count},"${isVent ? 'Frosted glass louvers with exhaust provision' : 'UPVC 2-track sliding window with 5mm toughened glass'}"`
    );
  });

  const csvContent = lines.join('\n');
  const safeName = project.name.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
  downloadFile(csvContent, `${safeName}_boq_schedule.csv`, 'text/csv;charset=utf-8;');
}

/**
 * Triggers print-ready GFC Sheet (.PDF via browser print) with exact page sizing & zero clipping
 */
export function printGfcSheet(svgOrProject: string | ProProjectState, innerSvgOrModule?: string, title?: string): void {
  let svgString = typeof svgOrProject === 'string' ? svgOrProject : '';
  let pageSize = 'A3 landscape';

  if (typeof svgOrProject !== 'string') {
    const sheetTitle =
      title ||
      (innerSvgOrModule && !innerSvgOrModule.trim().startsWith('<')
        ? innerSvgOrModule.toUpperCase().replace(/-/g, ' ')
        : 'GFC PRINT SHEET');
    pageSize = `${svgOrProject.gfcMeta.sheetSize} landscape`;
    svgString = buildGfcSheetSvg(svgOrProject, innerSvgOrModule || '', sheetTitle);
  }

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>VectorDesk — GFC Sheet Print</title>
        <style>
          @page { size: ${pageSize}; margin: 0; }
          * { box-sizing: border-box; }
          html, body { margin: 0; padding: 0; width: 100%; height: 100%; background: #ffffff; display: flex; justify-content: center; align-items: center; overflow: hidden; }
          svg { width: 100%; height: 100%; max-width: 100vw; max-height: 100vh; display: block; }
        </style>
      </head>
      <body>
        ${svgString}
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}
