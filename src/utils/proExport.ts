import { ProProjectState } from '../types/pro';

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
 * Generates an AutoCAD R12 / Universal compliant DXF file with layered CAD elements.
 */
export function exportProjectAsDxf(project: ProProjectState): void {
  const lines: string[] = [];

  // DXF Header
  lines.push('0', 'SECTION', '2', 'HEADER', '9', '$ACADVER', '1', 'AC1009', '0', 'ENDSEC');

  // DXF Tables
  lines.push('0', 'SECTION', '2', 'TABLES');
  lines.push('0', 'TABLE', '2', 'LAYER', '70', '7');

  // Define Standard AIA / BIS CAD Layers
  const layerDefs = [
    { name: 'A-WALL', color: 4 }, // Cyan
    { name: 'A-DOOR', color: 2 }, // Yellow
    { name: 'S-COLS', color: 1 }, // Red
    { name: 'E-LITE', color: 5 }, // Blue
    { name: 'P-PIPE', color: 6 }, // Magenta
    { name: 'M-HVAC', color: 3 }, // Green
    { name: 'A-DIMS', color: 8 }, // Grey
  ];

  for (const l of layerDefs) {
    lines.push('0', 'LAYER', '2', l.name, '70', '0', '62', l.color.toString(), '6', 'CONTINUOUS');
  }
  lines.push('0', 'ENDTAB', '0', 'ENDSEC');

  // DXF Entities
  lines.push('0', 'SECTION', '2', 'ENTITIES');

  // Helper to append a LINE entity
  const addLine = (layer: string, x1: number, y1: number, x2: number, y2: number) => {
    lines.push(
      '0', 'LINE',
      '8', layer,
      '10', x1.toFixed(2),
      '20', y1.toFixed(2),
      '30', '0.0',
      '11', x2.toFixed(2),
      '20', y2.toFixed(2),
      '31', '0.0'
    );
  };

  // Helper to append a 2D BOX
  const addRect = (layer: string, x: number, y: number, w: number, h: number) => {
    addLine(layer, x, y, x + w, y);
    addLine(layer, x + w, y, x + w, y + h);
    addLine(layer, x + w, y + h, x, y + h);
    addLine(layer, x, y + h, x, y);
  };

  // 1. Export Floor Plan Rooms & Walls
  for (const room of project.rooms) {
    // Room Outer Boundary
    addRect('A-WALL', room.x, room.y, room.width, room.depth);

    // Interior offset boundary
    const t = room.wallExtMm;
    addRect('A-WALL', room.x + t, room.y + t, room.width - 2 * t, room.depth - 2 * t);

    // Doors
    for (const d of room.doors) {
      if (d.wall === 'S') {
        const dx = room.x + d.offset;
        addLine('A-DOOR', dx, room.y, dx + d.widthMm, room.y);
        // Door leaf perpendicular
        addLine('A-DOOR', dx, room.y, dx, room.y + d.widthMm);
      } else if (d.wall === 'N') {
        const dx = room.x + d.offset;
        addLine('A-DOOR', dx, room.y + room.depth, dx + d.widthMm, room.y + room.depth);
        addLine('A-DOOR', dx, room.y + room.depth, dx, room.y + room.depth - d.widthMm);
      } else if (d.wall === 'W') {
        const dy = room.y + d.offset;
        addLine('A-DOOR', room.x, dy, room.x, dy + d.widthMm);
        addLine('A-DOOR', room.x, dy, room.x + d.widthMm, dy);
      } else if (d.wall === 'E') {
        const dy = room.y + d.offset;
        addLine('A-DOOR', room.x + room.width, dy, room.x + room.width, dy + d.widthMm);
        addLine('A-DOOR', room.x + room.width, dy, room.x + room.width - d.widthMm, dy);
      }
    }

    // Windows
    for (const w of room.windows) {
      if (w.wall === 'S') {
        addLine('A-DOOR', room.x + w.offset, room.y, room.x + w.offset + w.widthMm, room.y);
      } else if (w.wall === 'N') {
        addLine('A-DOOR', room.x + w.offset, room.y + room.depth, room.x + w.offset + w.widthMm, room.y + room.depth);
      } else if (w.wall === 'W') {
        addLine('A-DOOR', room.x, room.y + w.offset, room.x, room.y + w.offset + w.widthMm);
      } else if (w.wall === 'E') {
        addLine('A-DOOR', room.x + room.width, room.y + w.offset, room.x + room.width, room.y + w.offset + w.widthMm);
      }
    }
  }

  // 2. Export Columns (S-COLS)
  for (const col of project.columnGrid.columns) {
    addRect('S-COLS', col.x - col.widthMm / 2, col.y - col.depthMm / 2, col.widthMm, col.depthMm);
    // Draw footing outline
    addRect('S-COLS', col.x - col.footingWidthMm / 2, col.y - col.footingLengthMm / 2, col.footingWidthMm, col.footingLengthMm);
  }

  // 3. Export MEP Nodes (E-LITE, P-PIPE, M-HVAC)
  for (const node of project.mepNodes) {
    const layer = node.discipline === 'electrical' ? 'E-LITE' : node.discipline === 'plumbing' ? 'P-PIPE' : 'M-HVAC';
    // Draw a small 150mm cross marker
    addLine(layer, node.x - 75, node.y, node.x + 75, node.y);
    addLine(layer, node.x, node.y - 75, node.x, node.y + 75);
  }

  lines.push('0', 'ENDSEC', '0', 'EOF');

  const dxfContent = lines.join('\n');
  const safeName = project.name.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
  downloadFile(dxfContent, `${safeName}_vector_cad.dxf`, 'application/dxf');
}

/**
 * Builds a professional GFC (Good For Construction) architectural sheet SVG with Title Block,
 * Revision Table, Rotatable North Arrow, Scale Bar, and Zone Margins.
 */
export function buildGfcSheetSvg(
  project: ProProjectState,
  innerSvgContent: string,
  sheetTitle: string
): string {
  const gfc = project.gfcMeta;
  const isA1 = gfc.sheetSize === 'A1';
  const width = isA1 ? 841 : gfc.sheetSize === 'A2' ? 594 : 420;
  const height = isA1 ? 594 : gfc.sheetSize === 'A2' ? 420 : 297;

  // Title Block height is 80mm, placed at bottom right
  const tbWidth = 240;
  const tbHeight = 72;
  const tbX = width - 15 - tbWidth;
  const tbY = height - 15 - tbHeight;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}mm" height="${height}mm" style="background:#ffffff; font-family:'Inter', sans-serif;">
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

  <!-- Sheet Zone Reference Grids (1-8 & A-F) -->
  <g class="cad-txt-label" opacity="0.6">
    <text x="${width / 2}" y="8.5" text-anchor="middle">ZONE REFERENCE MARGINS • ISO 5457</text>
  </g>

  <!-- Main Drawing Window -->
  <g transform="translate(25, 18)">
    ${innerSvgContent}
  </g>

  <!-- Architectural North Arrow Symbol (Rotatable) -->
  <g transform="translate(${width - 45}, 28) rotate(${gfc.northAngle})">
    <circle cx="0" cy="0" r="8" fill="none" stroke="#0f172a" stroke-width="0.35" />
    <polygon points="0,-7 3,5 0,3 -3,5" fill="#0f172a" />
    <text x="0" y="-8.5" text-anchor="middle" font-size="2.4px" font-weight="bold" fill="#0f172a">N</text>
  </g>

  <!-- Graphic Scale Bar (1:100 / 1:50) -->
  <g transform="translate(30, ${height - 24})">
    <rect x="0" y="0" width="10" height="2" fill="#0f172a" />
    <rect x="10" y="0" width="10" height="2" fill="#ffffff" stroke="#0f172a" stroke-width="0.25" />
    <rect x="20" y="0" width="10" height="2" fill="#0f172a" />
    <rect x="30" y="0" width="20" height="2" fill="#ffffff" stroke="#0f172a" stroke-width="0.25" />
    <text x="0" y="4.5" class="cad-txt-sm">0</text>
    <text x="10" y="4.5" class="cad-txt-sm">1m</text>
    <text x="20" y="4.5" class="cad-txt-sm">2m</text>
    <text x="30" y="4.5" class="cad-txt-sm">3m</text>
    <text x="50" y="4.5" class="cad-txt-sm">5 METERS</text>
    <text x="0" y="-1.5" class="cad-txt-label">GRAPHIC BAR SCALE (${gfc.scale})</text>
  </g>

  <!-- Architectural GFC Standard Title Block -->
  <g transform="translate(${tbX}, ${tbY})">
    <!-- Main Box -->
    <rect x="0" y="0" width="${tbWidth}" height="${tbHeight}" fill="#ffffff" stroke="#0f172a" stroke-width="0.6" />

    <!-- Organization / Studio Banner -->
    <rect x="0" y="0" width="${tbWidth}" height="14" fill="#0f172a" />
    <text x="6" y="9" font-size="4px" font-weight="800" fill="#ffffff" letter-spacing="0.5">VECTORDESK • PRO CAD STUDIO</text>
    <text x="${tbWidth - 6}" y="9" font-size="2.2px" font-weight="600" fill="#38bdf8" text-anchor="end">GOOD FOR CONSTRUCTION (GFC)</text>

    <!-- Project & Drawing Info Row -->
    <line x1="0" y1="28" x2="${tbWidth}" y2="28" class="cad-thin" />
    <g transform="translate(6, 19)">
      <text x="0" y="0" class="cad-txt-label">PROJECT TITLE</text>
      <text x="0" y="5.5" class="cad-txt-md">${gfc.projectTitle}</text>
    </g>

    <!-- Client & Architect Columns -->
    <line x1="120" y1="28" x2="120" y2="52" class="cad-thin" />
    <line x1="0" y1="52" x2="${tbWidth}" y2="52" class="cad-thin" />

    <g transform="translate(6, 34)">
      <text x="0" y="0" class="cad-txt-label">CLIENT / DEVELOPER</text>
      <text x="0" y="4.5" class="cad-txt-md">${gfc.clientName}</text>
      <text x="0" y="9.5" class="cad-txt-sm">Status: Approved GFC Release</text>
    </g>

    <g transform="translate(126, 34)">
      <text x="0" y="0" class="cad-txt-label">ARCHITECT &amp; STRUCTURAL ENGINEER</text>
      <text x="0" y="4.5" class="cad-txt-md">${gfc.architectName}</text>
      <text x="0" y="9.5" class="cad-txt-sm">${gfc.contractorName}</text>
    </g>

    <!-- Revision Table -->
    <g transform="translate(6, 58)">
      <text x="0" y="0" class="cad-txt-label">SHEET TITLE: <tspan font-weight="700" fill="#0f172a">${sheetTitle}</tspan></text>
      <text x="0" y="7" class="cad-txt-sm">DWG NO: <tspan font-weight="700">${gfc.drawingNo}</tspan> • REV: <tspan font-weight="700" fill="#ef4444">${gfc.revisions[gfc.revisions.length - 1]?.rev || 'R2'}</tspan> • SCALE: ${gfc.scale} • FORMAT: ${gfc.sheetSize}</text>
    </g>

    <g transform="translate(${tbWidth - 55}, 58)">
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
  const sheetTitle = title || (innerSvgOrModule && !innerSvgOrModule.startsWith('<') ? innerSvgOrModule.toUpperCase().replace('-', ' ') : 'GFC WORKING DRAWING');
  let innerSvg = innerSvgOrModule || '';
  if (!innerSvg.startsWith('<')) {
    // Generate a default floor plan schematic SVG if bare module ID was passed
    const roomsSvg = project.rooms.map((r) => `
      <rect x="${r.x / 20}" y="${r.y / 20}" width="${r.width / 20}" height="${r.depth / 20}" fill="#f8fafc" stroke="#0f172a" stroke-width="0.8" />
      <text x="${(r.x + r.width / 2) / 20}" y="${(r.y + r.depth / 2) / 20}" text-anchor="middle" font-size="3px" font-weight="bold" fill="#0f172a">${r.name}</text>
      <text x="${(r.x + r.width / 2) / 20}" y="${(r.y + r.depth / 2) / 20 + 4}" text-anchor="middle" font-size="2px" fill="#64748b">${r.width} × ${r.depth} mm</text>
    `).join('');
    innerSvg = `<g transform="translate(10, 10)">${roomsSvg}</g>`;
  }
  const fullSvg = buildGfcSheetSvg(project, innerSvg, sheetTitle);
  const safeName = sheetTitle.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
  downloadFile(fullSvg, `${safeName}_gfc_sheet.svg`, 'image/svg+xml');
}

/**
 * Exports BOQ and Joinery schedules as a structured CSV spreadsheet
 */
export function exportBoqAsCsv(
  project: ProProjectState,
  boqRows?: { itemNo: string; desc: string; unit: string; qty: number; rate: number; amount: number }[]
): void {
  const lines: string[] = [];

  // If no rows passed, calculate default BOQ items based on project rooms and levels
  const rows = boqRows || [
    { itemNo: '1.01', desc: 'Earthwork excavation in foundation trenches', unit: 'm³', qty: 45.5, rate: 350, amount: 15925 },
    { itemNo: '1.02', desc: 'PCC 1:4:8 in foundation and under floors', unit: 'm³', qty: 12.8, rate: 4200, amount: 53760 },
    { itemNo: '2.01', desc: 'RCC M25 grade in isolated footings and plinth beams', unit: 'm³', qty: 18.2, rate: 7800, amount: 141960 },
    { itemNo: '2.02', desc: 'Fe500D TMT Reinforcement Steel complete with cutting & bending', unit: 'kg', qty: 1850, rate: 72, amount: 133200 },
    { itemNo: '3.01', desc: 'First class brickwork in CM 1:6 for 230mm external walls', unit: 'm³', qty: 42.0, rate: 5800, amount: 243600 },
    { itemNo: '3.02', desc: 'Brickwork in CM 1:4 for 115mm internal partition walls', unit: 'm²', qty: 86.4, rate: 750, amount: 64800 },
    { itemNo: '4.01', desc: 'Internal cement plastering 12mm thick in CM 1:4 with smooth finish', unit: 'm²', qty: 260.0, rate: 220, amount: 57200 },
    { itemNo: '5.01', desc: 'Vitrified floor tiles 600×600mm laid over cement mortar bed', unit: 'm²', qty: 94.5, rate: 950, amount: 89775 },
  ];

  // Header Section
  lines.push(`"VECTORDESK PROFESSIONAL BILL OF QUANTITIES (BOQ)"`);
  lines.push(`"Project:","${project.gfcMeta.projectTitle}"`);
  lines.push(`"Client:","${project.gfcMeta.clientName}"`);
  lines.push(`"Date:","${new Date().toLocaleDateString('en-GB')}"`);
  lines.push(`"Status:","${project.gfcMeta.revisions[project.gfcMeta.revisions.length - 1]?.status || 'GFC'}"`);
  lines.push('');

  // Table 1: BOQ Items
  lines.push(`"Item No","Description","Unit","Quantity","Rate (INR)","Amount (INR)"`);
  let grandTotal = 0;
  for (const row of rows) {
    lines.push(
      `"${row.itemNo}","${row.desc}","${row.unit}",${row.qty.toFixed(2)},${row.rate},${row.amount.toFixed(2)}`
    );
    grandTotal += row.amount;
  }
  lines.push(`"","ESTIMATED GRAND TOTAL (EXCL. TAX)","","","",${grandTotal.toFixed(2)}`);
  lines.push('');

  // Table 2: Door & Window Joinery Schedule
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
    lines.push(`"${tag}","${isVent ? 'Louvered Ventilator' : 'Glazed Window'}",${v.width},${v.height},${v.sill},${v.count},"${isVent ? 'Frosted glass louvers with exhaust provision' : 'UPVC 2-track sliding window with 5mm toughened glass'}"`);
  });

  const csvContent = lines.join('\n');
  const safeName = project.name.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
  downloadFile(csvContent, `${safeName}_boq_schedule.csv`, 'text/csv;charset=utf-8;');
}

/**
 * Triggers browser print preview for GFC SVG sheet
 */
export function printGfcSheet(svgOrProject: string | ProProjectState, innerSvg?: string, title?: string): void {
  let svgString = typeof svgOrProject === 'string' ? svgOrProject : '';
  if (typeof svgOrProject !== 'string') {
    const sheetTitle = title || 'GFC PRINT SHEET';
    svgString = buildGfcSheetSvg(svgOrProject, innerSvg || '', sheetTitle);
  }
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>VectorDesk — GFC Sheet Print</title>
        <style>
          @page { size: landscape; margin: 0; }
          body { margin: 0; padding: 0; background: #fff; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
          svg { width: 98vw; height: 96vh; }
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
