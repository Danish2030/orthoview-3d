import * as THREE from 'three';
import { SideViewMode, SolidDimensions, SolidRotation, ThemeMode, TitleBlockMeta } from '../types';

export type ExportFormat = 'png' | 'pdf' | 'dxf' | 'svg' | 'stl';

export interface SheetExportParams {
  geometry: THREE.BufferGeometry;
  solidName: string;
  dimensions: SolidDimensions;
  rotation: SolidRotation;
  sideViewMode: SideViewMode;
  titleBlockMeta: TitleBlockMeta;
  // Legacy optional fields kept for backwards compatibility
  canvases?: {
    front: HTMLCanvasElement | null;
    top: HTMLCanvasElement | null;
    leftSide: HTMLCanvasElement | null;
    isometric?: HTMLCanvasElement | null;
  };
  theme?: ThemeMode;
  showMiterLine?: boolean;
  showProjectors?: boolean;
}

interface Seg2D {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface ProjectedView {
  segments: Seg2D[];
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

function projectGeometryView(
  geometry: THREE.BufferGeometry,
  rotation: SolidRotation,
  view: 'front' | 'top' | 'leftSide' | 'rightSide' | 'isometric'
): ProjectedView {
  const edges = new THREE.EdgesGeometry(geometry, 18);
  const pos = edges.getAttribute('position');

  const euler = new THREE.Euler(
    THREE.MathUtils.degToRad(rotation.x),
    THREE.MathUtils.degToRad(rotation.y),
    THREE.MathUtils.degToRad(rotation.z),
    'XYZ'
  );
  const rotMat = new THREE.Matrix4().makeRotationFromEuler(euler);

  // Isometric basis vectors (30° classic isometric)
  const cos30 = Math.cos(Math.PI / 6);
  const sin30 = 0.5;

  const projectPoint = (v: THREE.Vector3): [number, number] => {
    const p = v.clone().applyMatrix4(rotMat);
    switch (view) {
      case 'front':
        return [p.x, p.y];
      case 'top':
        // First-angle plan looking down +Y: +X right, +Z downward (so -p.z is up in math coords)
        return [p.x, -p.z];
      case 'leftSide':
        // Looking from -X toward +X: +Z is left, -Z is right
        return [-p.z, p.y];
      case 'rightSide':
        return [p.z, p.y];
      case 'isometric': {
        const ix = (p.x - p.z) * cos30;
        const iy = p.y + (p.x + p.z) * sin30 * 0.5 - (p.x + p.z) * sin30;
        // Standard isometric: x right-down, z left-down, y up -> sx = (x - z)*cos30, sy = y - (x + z)*sin30
        void iy;
        return [ix, p.y - (p.x + p.z) * sin30];
      }
    }
  };

  const segments: Seg2D[] = [];
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  const v1 = new THREE.Vector3();
  const v2 = new THREE.Vector3();

  for (let i = 0; i < pos.count; i += 2) {
    v1.fromBufferAttribute(pos, i);
    v2.fromBufferAttribute(pos, i + 1);
    const [x1, y1] = projectPoint(v1);
    const [x2, y2] = projectPoint(v2);

    // Skip degenerate zero-length edges
    if (Math.hypot(x2 - x1, y2 - y1) < 0.05) continue;

    segments.push({ x1, y1, x2, y2 });
    if (x1 < minX) minX = x1;
    if (x1 > maxX) maxX = x1;
    if (x2 < minX) minX = x2;
    if (x2 > maxX) maxX = x2;
    if (y1 < minY) minY = y1;
    if (y1 > maxY) maxY = y1;
    if (y2 < minY) minY = y2;
    if (y2 > maxY) maxY = y2;
  }

  edges.dispose();

  if (!Number.isFinite(minX)) {
    return { segments: [], minX: -20, maxX: 20, minY: -20, maxY: 20 };
  }
  return { segments, minX, maxX, minY, maxY };
}

function fitSegmentsToBox(
  pv: ProjectedView,
  cx: number,
  cy: number,
  maxW: number,
  maxH: number,
  invertY: boolean
): { segments: Seg2D[]; bounds: { left: number; right: number; top: number; bottom: number } } {
  const spanX = Math.max(1, pv.maxX - pv.minX);
  const spanY = Math.max(1, pv.maxY - pv.minY);
  const scale = Math.min(maxW / spanX, maxH / spanY);
  const midX = (pv.minX + pv.maxX) / 2;
  const midY = (pv.minY + pv.maxY) / 2;

  const tx = (x: number) => cx + (x - midX) * scale;
  const ty = (y: number) => (invertY ? cy - (y - midY) * scale : cy + (y - midY) * scale);

  const mapped = pv.segments.map((s) => ({
    x1: tx(s.x1),
    y1: ty(s.y1),
    x2: tx(s.x2),
    y2: ty(s.y2),
  }));

  const halfW = (spanX * scale) / 2;
  const halfH = (spanY * scale) / 2;
  return {
    segments: mapped,
    bounds: {
      left: cx - halfW,
      right: cx + halfW,
      top: cy - halfH,
      bottom: cy + halfH,
    },
  };
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Generates an exact AutoCAD-style pure white A3 4-quadrant vector SVG sheet
 * matching the college lab drawing layout (border, dotted dividers, views,
 * dimension lines with arrowheads, Isometric view, and College Title Block).
 */
export function buildAutoCADSheetSVG(params: SheetExportParams): string {
  const { geometry, solidName, dimensions, rotation, sideViewMode, titleBlockMeta } = params;
  const W = 1400;
  const H = 990;
  const m = 36;
  const innerW = W - m * 2;
  const innerH = H - m * 2;
  const midX = W / 2;
  const midY = H / 2;

  const sideType = sideViewMode === 'right' ? 'rightSide' : 'leftSide';
  const sideTitle = sideViewMode === 'right' ? 'RIGHT SIDE VIEW' : 'LEFT SIDE VIEW';

  const fvProj = projectGeometryView(geometry, rotation, 'front');
  const svProj = projectGeometryView(geometry, rotation, sideType);
  const tvProj = projectGeometryView(geometry, rotation, 'top');
  const isoProj = projectGeometryView(geometry, rotation, 'isometric');

  const fv = fitSegmentsToBox(fvProj, m + innerW * 0.25, m + innerH * 0.25, 310, 220, true);
  const sv = fitSegmentsToBox(svProj, m + innerW * 0.75, m + innerH * 0.25, 310, 220, true);
  const tv = fitSegmentsToBox(tvProj, m + innerW * 0.25, m + innerH * 0.75, 310, 220, true);
  const iso = fitSegmentsToBox(isoProj, m + innerW * 0.75, m + innerH * 0.65, 290, 210, true);

  const drawSegs = (segs: Seg2D[], strokeW = 1.6) =>
    segs
      .map(
        (s) =>
          `<line x1="${s.x1.toFixed(1)}" y1="${s.y1.toFixed(1)}" x2="${s.x2.toFixed(1)}" y2="${s.y2.toFixed(1)}" stroke="#000000" stroke-width="${strokeW}" stroke-linecap="round"/>`
      )
      .join('\n');

  const drawHorizDim = (x1: number, x2: number, yRef: number, offset: number, label: string) => {
    const y = yRef + offset;
    const extDir = offset >= 0 ? 1 : -1;
    return `
      <line x1="${x1.toFixed(1)}" y1="${(yRef + 4 * extDir).toFixed(1)}" x2="${x1.toFixed(1)}" y2="${(y + 6 * extDir).toFixed(1)}" stroke="#000" stroke-width="0.9"/>
      <line x1="${x2.toFixed(1)}" y1="${(yRef + 4 * extDir).toFixed(1)}" x2="${x2.toFixed(1)}" y2="${(y + 6 * extDir).toFixed(1)}" stroke="#000" stroke-width="0.9"/>
      <line x1="${x1.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#000" stroke-width="1" marker-start="url(#arrowStart)" marker-end="url(#arrowEnd)"/>
      <text x="${((x1 + x2) / 2).toFixed(1)}" y="${(y - 5).toFixed(1)}" text-anchor="middle" font-size="13" fill="#000">${escapeXml(label)}</text>
    `;
  };

  const drawVertDim = (y1: number, y2: number, xRef: number, offset: number, label: string) => {
    const x = xRef + offset;
    const extDir = offset >= 0 ? 1 : -1;
    const cy = (y1 + y2) / 2;
    return `
      <line x1="${(xRef + 4 * extDir).toFixed(1)}" y1="${y1.toFixed(1)}" x2="${(x + 6 * extDir).toFixed(1)}" y2="${y1.toFixed(1)}" stroke="#000" stroke-width="0.9"/>
      <line x1="${(xRef + 4 * extDir).toFixed(1)}" y1="${y2.toFixed(1)}" x2="${(x + 6 * extDir).toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#000" stroke-width="0.9"/>
      <line x1="${x.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#000" stroke-width="1" marker-start="url(#arrowStart)" marker-end="url(#arrowEnd)"/>
      <text x="${(x - 6).toFixed(1)}" y="${cy.toFixed(1)}" text-anchor="middle" font-size="13" fill="#000" transform="rotate(-90 ${(x - 6).toFixed(1)} ${cy.toFixed(1)})">${escapeXml(label)}</text>
    `;
  };

  // Title Block Geometry (Bottom-Right anchored inside outer border, matching reference)
  const tbW = 540;
  const tbH = 162;
  const tbX = W - m - tbW;
  const tbY = H - m - tbH;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="font-family: Arial, Helvetica, sans-serif; background: #ffffff;">
  <defs>
    <marker id="arrowEnd" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M 0 2 L 10 5 L 0 8 z" fill="#000000"/>
    </marker>
    <marker id="arrowStart" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M 10 2 L 0 5 L 10 8 z" fill="#000000"/>
    </marker>
  </defs>

  <!-- Pure White AutoCAD Drawing Sheet -->
  <rect x="0" y="0" width="${W}" height="${H}" fill="#ffffff"/>

  <!-- Thin Crisp Outer Border -->
  <rect x="${m}" y="${m}" width="${innerW}" height="${innerH}" fill="none" stroke="#000000" stroke-width="1.6"/>

  <!-- Dotted Quadrant Dividers (matching AutoCAD 4-quadrant reference) -->
  <line x1="${midX}" y1="${m}" x2="${midX}" y2="${H - m}" stroke="#333333" stroke-width="1.1" stroke-dasharray="2 6"/>
  <line x1="${m}" y1="${midY}" x2="${W - m}" y2="${midY}" stroke="#333333" stroke-width="1.1" stroke-dasharray="2 6"/>

  <!-- QUADRANT 1: FRONT VIEW -->
  <text x="${(fv.bounds.left + fv.bounds.right) / 2}" y="${fv.bounds.top - 28}" text-anchor="middle" font-size="15" font-weight="500" fill="#000">FRONT VIEW</text>
  ${drawSegs(fv.segments, 1.5)}
  ${drawHorizDim(fv.bounds.left, fv.bounds.right, fv.bounds.bottom, 30, `${dimensions.length}`)}
  ${drawVertDim(fv.bounds.top, fv.bounds.bottom, fv.bounds.right, 30, `${dimensions.height}`)}

  <!-- QUADRANT 2: SIDE VIEW -->
  <text x="${(sv.bounds.left + sv.bounds.right) / 2}" y="${sv.bounds.top - 28}" text-anchor="middle" font-size="15" font-weight="500" fill="#000">${sideTitle}</text>
  ${drawSegs(sv.segments, 1.5)}
  ${drawHorizDim(sv.bounds.left, sv.bounds.right, sv.bounds.bottom, 30, `${dimensions.width}`)}
  ${drawVertDim(sv.bounds.top, sv.bounds.bottom, sv.bounds.left, -30, `${dimensions.height}`)}

  <!-- QUADRANT 3: TOP VIEW -->
  <text x="${(tv.bounds.left + tv.bounds.right) / 2}" y="${tv.bounds.top - 32}" text-anchor="middle" font-size="15" font-weight="500" fill="#000">TOP VIEW</text>
  ${drawSegs(tv.segments, 1.5)}
  ${drawHorizDim(tv.bounds.left, tv.bounds.right, tv.bounds.top, -16, `${dimensions.length}`)}
  ${drawVertDim(tv.bounds.top, tv.bounds.bottom, tv.bounds.right, 30, `${dimensions.width}`)}

  <!-- QUADRANT 4: ISOMETRIC VIEW -->
  <text x="${iso.bounds.left + 10}" y="${iso.bounds.top - 14}" text-anchor="start" font-size="15" font-weight="500" fill="#000">ISOMETRIC VIEW</text>
  ${drawSegs(iso.segments, 1.35)}

  <!-- "All dimensions are in mm" note above Title Block -->
  <text x="${tbX + tbW - 145}" y="${tbY - 12}" text-anchor="middle" font-size="13" fill="#000">All dimensions are in mm</text>

  <!-- COLLEGE LAB TITLE BLOCK (Exact Match to Reference Sheet) -->
  <g transform="translate(${tbX}, ${tbY})">
    <rect x="0" y="0" width="${tbW}" height="${tbH}" fill="#ffffff" stroke="#000000" stroke-width="1.4"/>
    <!-- Row 1: NAME | TITLE (height 64) -->
    <line x1="0" y1="64" x2="${tbW}" y2="64" stroke="#000" stroke-width="1.2"/>
    <line x1="185" y1="0" x2="185" y2="${tbH}" stroke="#000" stroke-width="1.2"/>
    <text x="14" y="37" font-size="13" fill="#000">NAME: ${escapeXml(titleBlockMeta.name || '')}</text>
    <text x="200" y="37" font-size="13" fill="#000">TITLE: ${escapeXml(solidName.toUpperCase().slice(0, 32))}</text>

    <!-- Lower Rows: CLASS / ROLL NO / DATE | DWG NO / GRADE / VALUED BY | SCALE + Symbol -->
    <line x1="365" y1="64" x2="365" y2="${tbH}" stroke="#000" stroke-width="1.2"/>
    <line x1="0" y1="97" x2="${tbW}" y2="97" stroke="#000" stroke-width="1.1"/>
    <line x1="0" y1="130" x2="365" y2="130" stroke="#000" stroke-width="1.1"/>

    <text x="12" y="86" font-size="12" fill="#000">CLASS: ${escapeXml(titleBlockMeta.className || '')}</text>
    <text x="12" y="119" font-size="12" fill="#000">ROLL NO.: ${escapeXml(titleBlockMeta.rollNo || '')}</text>
    <text x="12" y="151" font-size="12" fill="#000">DATE: ${escapeXml(titleBlockMeta.date || '')}</text>

    <text x="196" y="86" font-size="12" fill="#000">DWG. NO.: ${escapeXml(titleBlockMeta.dwgNo || '')}</text>
    <text x="196" y="119" font-size="12" fill="#000">GRADE: ${escapeXml(titleBlockMeta.grade || '')}</text>
    <text x="196" y="151" font-size="12" fill="#000">VALUED BY: ${escapeXml(titleBlockMeta.valuedBy || '')}</text>

    <text x="378" y="86" font-size="12" fill="#000">SCALE: ${escapeXml(titleBlockMeta.scale || '1:1')}</text>

    <!-- First-Angle Projection Symbol -->
    <g transform="translate(382, 102)">
      <line x1="2" y1="26" x2="144" y2="26" stroke="#16a34a" stroke-width="1" stroke-dasharray="8 3 2 3"/>
      <line x1="112" y1="2" x2="112" y2="50" stroke="#16a34a" stroke-width="1" stroke-dasharray="8 3 2 3"/>
      <polygon points="12,16 64,6 64,46 12,36" fill="none" stroke="#000000" stroke-width="1.4"/>
      <circle cx="112" cy="26" r="20" fill="none" stroke="#000000" stroke-width="1.4"/>
      <circle cx="112" cy="26" r="10" fill="none" stroke="#000000" stroke-width="1.4"/>
    </g>
  </g>
</svg>`;
}

/**
 * Generates a real ASCII R12 AutoCAD DXF file (opens directly in AutoCAD, LibreCAD,
 * SolidWorks, Fusion 360 — save as .DWG directly inside AutoCAD).
 */
export function buildAutoCADDXF(params: SheetExportParams): string {
  const { geometry, solidName, dimensions, rotation, sideViewMode, titleBlockMeta } = params;
  const W = 420; // A3 width in mm
  const H = 297; // A3 height in mm
  const m = 10;
  const midX = W / 2;
  const midY = H / 2;

  const sideType = sideViewMode === 'right' ? 'rightSide' : 'leftSide';
  const sideTitle = sideViewMode === 'right' ? 'RIGHT SIDE VIEW' : 'LEFT SIDE VIEW';

  const fv = fitSegmentsToBox(projectGeometryView(geometry, rotation, 'front'), W * 0.25, H * 0.75, 110, 75, false);
  const sv = fitSegmentsToBox(projectGeometryView(geometry, rotation, sideType), W * 0.75, H * 0.75, 110, 75, false);
  const tv = fitSegmentsToBox(projectGeometryView(geometry, rotation, 'top'), W * 0.25, H * 0.25, 110, 75, false);
  const iso = fitSegmentsToBox(projectGeometryView(geometry, rotation, 'isometric'), W * 0.75, H * 0.36, 95, 65, false);

  const lines: string[] = [
    '0', 'SECTION',
    '2', 'HEADER',
    '9', '$ACADVER', '1', 'AC1009',
    '9', '$INSUNITS', '70', '4',
    '0', 'ENDSEC',
    '0', 'SECTION',
    '2', 'ENTITIES',
  ];

  const addLine = (x1: number, y1: number, x2: number, y2: number, layer = 'VISIBLE') => {
    lines.push(
      '0', 'LINE',
      '8', layer,
      '10', x1.toFixed(3), '20', y1.toFixed(3), '30', '0.0',
      '11', x2.toFixed(3), '21', y2.toFixed(3), '31', '0.0'
    );
  };

  const addRect = (x: number, y: number, w: number, h: number, layer = 'BORDER') => {
    addLine(x, y, x + w, y, layer);
    addLine(x + w, y, x + w, y + h, layer);
    addLine(x + w, y + h, x, y + h, layer);
    addLine(x, y + h, x, y, layer);
  };

  const addText = (x: number, y: number, height: number, text: string, layer = 'TEXT') => {
    lines.push(
      '0', 'TEXT',
      '8', layer,
      '10', x.toFixed(3), '20', y.toFixed(3), '30', '0.0',
      '40', height.toFixed(2),
      '1', text
    );
  };

  // A3 Outer Border & Center Dividers
  addRect(m, m, W - m * 2, H - m * 2, 'BORDER');
  addLine(midX, m, midX, H - m, 'CENTER');
  addLine(m, midY, W - m, midY, 'CENTER');

  // Views
  for (const s of fv.segments) addLine(s.x1, s.y1, s.x2, s.y2, 'VISIBLE');
  for (const s of sv.segments) addLine(s.x1, s.y1, s.x2, s.y2, 'VISIBLE');
  for (const s of tv.segments) addLine(s.x1, s.y1, s.x2, s.y2, 'VISIBLE');
  for (const s of iso.segments) addLine(s.x1, s.y1, s.x2, s.y2, 'ISOMETRIC');

  // View Titles
  addText(W * 0.2, H * 0.91, 4.5, 'FRONT VIEW');
  addText(W * 0.7, H * 0.91, 4.5, sideTitle);
  addText(W * 0.2, H * 0.43, 4.5, 'TOP VIEW');
  addText(W * 0.65, H * 0.46, 4.5, 'ISOMETRIC VIEW');
  addText(W - 140, 62, 3.5, `All dimensions are in mm (${dimensions.length}x${dimensions.width}x${dimensions.height})`);

  // College Lab Title Block (Bottom-Right in DXF coords where Y=0 is bottom)
  const tbW = 165;
  const tbH = 48;
  const tbX = W - m - tbW;
  const tbY = m;
  addRect(tbX, tbY, tbW, tbH, 'TITLEBLOCK');
  addLine(tbX, tbY + 30, tbX + tbW, tbY + 30, 'TITLEBLOCK');
  addLine(tbX + 55, tbY, tbX + 55, tbY + tbH, 'TITLEBLOCK');
  addLine(tbX + 115, tbY, tbX + 115, tbY + 30, 'TITLEBLOCK');
  addLine(tbX, tbY + 20, tbX + tbW, tbY + 20, 'TITLEBLOCK');
  addLine(tbX, tbY + 10, tbX + 115, tbY + 10, 'TITLEBLOCK');

  addText(tbX + 3, tbY + 37, 3.2, `NAME: ${titleBlockMeta.name || ''}`);
  addText(tbX + 58, tbY + 37, 3.2, `TITLE: ${solidName.toUpperCase().slice(0, 28)}`);
  addText(tbX + 3, tbY + 23, 2.8, `CLASS: ${titleBlockMeta.className || ''}`);
  addText(tbX + 3, tbY + 13, 2.8, `ROLL NO: ${titleBlockMeta.rollNo || ''}`);
  addText(tbX + 3, tbY + 3, 2.8, `DATE: ${titleBlockMeta.date || ''}`);
  addText(tbX + 58, tbY + 23, 2.8, `DWG NO: ${titleBlockMeta.dwgNo || ''}`);
  addText(tbX + 58, tbY + 13, 2.8, `GRADE: ${titleBlockMeta.grade || ''}`);
  addText(tbX + 58, tbY + 3, 2.8, `VALUED BY: ${titleBlockMeta.valuedBy || ''}`);
  addText(tbX + 118, tbY + 23, 2.8, `SCALE: ${titleBlockMeta.scale || '1:1'}`);

  // First-Angle Symbol in DXF
  addLine(tbX + 120, tbY + 6, tbX + 136, tbY + 3, 'TITLEBLOCK');
  addLine(tbX + 136, tbY + 3, tbX + 136, tbY + 17, 'TITLEBLOCK');
  addLine(tbX + 136, tbY + 17, tbX + 120, tbY + 14, 'TITLEBLOCK');
  addLine(tbX + 120, tbY + 14, tbX + 120, tbY + 6, 'TITLEBLOCK');
  lines.push('0', 'CIRCLE', '8', 'TITLEBLOCK', '10', (tbX + 151).toFixed(2), '20', (tbY + 10).toFixed(2), '30', '0.0', '40', '6.5');
  lines.push('0', 'CIRCLE', '8', 'TITLEBLOCK', '10', (tbX + 151).toFixed(2), '20', (tbY + 10).toFixed(2), '30', '0.0', '40', '3.2');

  lines.push('0', 'ENDSEC', '0', 'EOF');
  return lines.join('\n');
}

/**
 * Generates an ASCII STL 3D mesh for AutoCAD 3D, Fusion 360, SolidWorks, or 3D printing.
 */
export function buildSTL(geometry: THREE.BufferGeometry, solidName: string): string {
  const nonIdx = geometry.index ? geometry.toNonIndexed() : geometry;
  const pos = nonIdx.getAttribute('position');
  const out: string[] = [`solid ${solidName.replace(/\W+/g, '_')}`];

  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();
  const ab = new THREE.Vector3();
  const ac = new THREE.Vector3();
  const n = new THREE.Vector3();

  for (let i = 0; i < pos.count; i += 3) {
    a.fromBufferAttribute(pos, i);
    b.fromBufferAttribute(pos, i + 1);
    c.fromBufferAttribute(pos, i + 2);
    ab.subVectors(b, a);
    ac.subVectors(c, a);
    n.crossVectors(ab, ac).normalize();

    out.push(`  facet normal ${n.x.toFixed(5)} ${n.y.toFixed(5)} ${n.z.toFixed(5)}`);
    out.push('    outer loop');
    out.push(`      vertex ${a.x.toFixed(4)} ${a.y.toFixed(4)} ${a.z.toFixed(4)}`);
    out.push(`      vertex ${b.x.toFixed(4)} ${b.y.toFixed(4)} ${b.z.toFixed(4)}`);
    out.push(`      vertex ${c.x.toFixed(4)} ${c.y.toFixed(4)} ${c.z.toFixed(4)}`);
    out.push('    endloop');
    out.push('  endfacet');
  }

  out.push(`endsolid ${solidName.replace(/\W+/g, '_')}`);
  if (nonIdx !== geometry) nonIdx.dispose();
  return out.join('\n');
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function exportSheetInFormat(
  format: ExportFormat,
  params: SheetExportParams
): Promise<void> {
  const safeName = params.solidName.replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '');
  const baseFilename = `OrthoView3D_${safeName}_${params.dimensions.length}x${params.dimensions.width}x${params.dimensions.height}`;

  if (format === 'dxf') {
    const dxf = buildAutoCADDXF(params);
    triggerDownload(new Blob([dxf], { type: 'application/dxf' }), `${baseFilename}.dxf`);
    return;
  }

  if (format === 'stl') {
    const stl = buildSTL(params.geometry, params.solidName);
    triggerDownload(new Blob([stl], { type: 'model/stl' }), `${baseFilename}.stl`);
    return;
  }

  const svgStr = buildAutoCADSheetSVG(params);

  if (format === 'svg') {
    triggerDownload(new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' }), `${baseFilename}.svg`);
    return;
  }

  if (format === 'pdf') {
    const win = window.open('', '_blank', 'width=1200,height=850');
    if (win) {
      win.document.write(`<!doctype html>
<html>
  <head>
    <title>${baseFilename} — A3 AutoCAD Sheet</title>
    <style>
      @page { size: A3 landscape; margin: 6mm; }
      html, body { margin: 0; padding: 0; background: #fff; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
      svg { width: 100%; height: auto; max-height: 100vh; }
    </style>
  </head>
  <body>
    ${svgStr}
    <script>window.onload = () => { setTimeout(() => window.print(), 250); };</script>
  </body>
</html>`);
      win.document.close();
    } else {
      // Fallback if pop-up blocked: download SVG
      triggerDownload(new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' }), `${baseFilename}.svg`);
    }
    return;
  }

  // High-Res Crisp White AutoCAD PNG (2400 x 1697)
  await new Promise<void>((resolve, reject) => {
    const img = new Image();
    const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 2400;
        canvas.height = 1697;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((pngBlob) => {
            if (pngBlob) triggerDownload(pngBlob, `${baseFilename}_AutoCAD_Sheet.png`);
            URL.revokeObjectURL(url);
            resolve();
          }, 'image/png');
        } else {
          URL.revokeObjectURL(url);
          resolve();
        }
      } catch (e) {
        URL.revokeObjectURL(url);
        reject(e);
      }
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}

// Backwards-compatible helper
export async function exportSheetAsPNG(params: SheetExportParams): Promise<void> {
  return exportSheetInFormat('png', params);
}
