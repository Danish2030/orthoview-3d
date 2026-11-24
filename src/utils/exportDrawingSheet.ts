import * as THREE from 'three';
import type {
  SideViewMode,
  SolidDimensions,
  SolidRotation,
  ThemeMode,
  TitleBlockMeta,
  TitleBlockOptions,
  LineColorPalette,
} from '../types/index.ts';
import { DEFAULT_TITLE_BLOCK_OPTIONS, DEFAULT_LINE_COLORS } from '../types/index.ts';

export type ExportFormat = 'png' | 'pdf' | 'dxf' | 'svg' | 'stl';

export interface SheetExportParams {
  geometry: THREE.BufferGeometry;
  solidName: string;
  dimensions: SolidDimensions;
  rotation: SolidRotation;
  sideViewMode: SideViewMode;
  titleBlockMeta: TitleBlockMeta;
  titleBlockOptions?: TitleBlockOptions;
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

export interface Seg2D {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface ProjectedView {
  visibleSegments: Seg2D[];
  hiddenSegments: Seg2D[];
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

interface FrontTri2D {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  maxZ: number;
  planeA: number;
  planeB: number;
  planeC: number;
  planeD: number;
}

export function checkIsSlottedCylinder(solidName: string, dimensions: SolidDimensions): boolean {
  const nameLower = solidName.toLowerCase();
  return (
    nameLower.includes('slotted cylinder') ||
    (nameLower.includes('cylinder') && nameLower.includes('bracket')) ||
    (dimensions.length === 140 && dimensions.width === 50 && dimensions.height === 50 && nameLower.includes('cylinder'))
  );
}

export function checkIsSteppedTBlock(solidName: string, dimensions: SolidDimensions): boolean {
  const nameLower = solidName.toLowerCase();
  return (
    nameLower.includes('stepped-t-block') ||
    nameLower.includes('stepped t-block') ||
    (nameLower.includes('t-block') && (nameLower.includes('groove') || nameLower.includes('r10'))) ||
    (Math.round(dimensions.length) === 40 && Math.round(dimensions.width) === 50 && Math.round(dimensions.height) === 30 && nameLower.includes('t-block'))
  );
}

export function hexToAci(hex: string): number {
  const clean = hex.replace('#', '').trim();
  if (clean.length !== 6) return 7;
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);

  // Standard AutoCAD Color Index (ACI) palette reference
  const aciPalette: { aci: number; r: number; g: number; b: number }[] = [
    { aci: 1, r: 255, g: 0, b: 0 },       // Red
    { aci: 2, r: 255, g: 255, b: 0 },     // Yellow
    { aci: 3, r: 0, g: 255, b: 0 },       // Green
    { aci: 4, r: 0, g: 255, b: 255 },     // Cyan
    { aci: 5, r: 0, g: 0, b: 255 },       // Blue
    { aci: 6, r: 255, g: 0, b: 255 },     // Magenta / Purple
    { aci: 7, r: 0, g: 0, b: 0 },         // Black / White
    { aci: 8, r: 128, g: 128, b: 128 },   // Gray
    { aci: 9, r: 192, g: 192, b: 192 },   // Light Gray
  ];

  let bestAci = 7;
  let minDistance = Infinity;
  for (const p of aciPalette) {
    const dr = r - p.r;
    const dg = g - p.g;
    const db = b - p.b;
    const dist = 0.3 * dr * dr + 0.59 * dg * dg + 0.11 * db * db;
    if (dist < minDistance) {
      minDistance = dist;
      bestAci = p.aci;
    }
  }
  return bestAci;
}

function pointInTriangle2D(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number
): boolean {
  const d1 = (px - x2) * (y1 - y2) - (x1 - x2) * (py - y2);
  const d2 = (px - x3) * (y2 - y3) - (x2 - x3) * (py - y3);
  const d3 = (px - x1) * (y3 - y1) - (x3 - x1) * (py - y1);
  const hasNeg = d1 < -1e-5 || d2 < -1e-5 || d3 < -1e-5;
  const hasPos = d1 > 1e-5 || d2 > 1e-5 || d3 > 1e-5;
  return !(hasNeg && hasPos);
}

function projectPointToView(
  p: THREE.Vector3,
  view: 'front' | 'top' | 'leftSide' | 'rightSide' | 'isometric'
): { x: number; y: number; z: number } {
  switch (view) {
    case 'front':
      return { x: p.x, y: p.y, z: p.z };
    case 'top':
      return { x: p.x, y: -p.z, z: p.y };
    case 'leftSide':
      return { x: -p.z, y: p.y, z: -p.x };
    case 'rightSide':
      return { x: p.z, y: p.y, z: p.x };
    case 'isometric': {
      const cos30 = 0.8660254037844386; // Math.cos(Math.PI / 6)
      const sin30 = 0.5;
      const ix = (p.x - p.z) * cos30;
      const iy = p.y - (p.x + p.z) * sin30;
      const iz = (p.x + p.y + p.z) * 0.5773502691896257; // 1 / Math.sqrt(3)
      return { x: ix, y: iy, z: iz };
    }
  }
}

/**
 * Clips candidate edges that lie strictly inside the solid cylinder boss cross-section
 * at or below the base plate top (y <= 10mm), eliminating ghost internal seams.
 */
function clipSlottedCylinderInternalEdges(
  p1: THREE.Vector3,
  p2: THREE.Vector3,
  geometry: THREE.BufferGeometry
): { p1: THREE.Vector3; p2: THREE.Vector3 }[] {
  if (!geometry.boundingBox) geometry.computeBoundingBox();
  const bb = geometry.boundingBox!;
  const minX = bb.min.x;
  const maxX = bb.max.x;
  const minY = bb.min.y;
  const L3D = Math.max(1, maxX - minX);
  const scale3D = L3D / 140; // ratio of 3D geometry units to 140 mm part length
  const rBoss = 32 * scale3D;
  const yBaseTop = minY + 10 * scale3D;

  // Only clip edges that lie near or below the base plate top
  if (p1.y > yBaseTop + 0.3 * scale3D && p2.y > yBaseTop + 0.3 * scale3D) {
    return [{ p1, p2 }];
  }

  const dx = p2.x - p1.x;
  const dz = p2.z - p1.z;
  const rBossSq = (rBoss - 0.25 * scale3D) * (rBoss - 0.25 * scale3D);

  const r1Sq = p1.x * p1.x + p1.z * p1.z;
  const r2Sq = p2.x * p2.x + p2.z * p2.z;

  // If both ends are strictly inside cylinder boss radius, discard entirely
  if (r1Sq < rBossSq && r2Sq < rBossSq) {
    return [];
  }

  // Intersect line segment with cylinder circle x^2 + z^2 = rBossSq
  const A = dx * dx + dz * dz;
  if (A < 1e-6) {
    return r1Sq >= rBossSq ? [{ p1, p2 }] : [];
  }

  const B = 2 * (p1.x * dx + p1.z * dz);
  const C = r1Sq - rBossSq;
  const disc = B * B - 4 * A * C;

  if (disc <= 0) {
    return r1Sq >= rBossSq ? [{ p1, p2 }] : [];
  }

  const sqrtDisc = Math.sqrt(disc);
  const t1 = (-B - sqrtDisc) / (2 * A);
  const t2 = (-B + sqrtDisc) / (2 * A);

  const tMin = Math.min(t1, t2);
  const tMax = Math.max(t1, t2);

  const splitPoints = [0];
  if (tMin > 0.001 && tMin < 0.999) splitPoints.push(tMin);
  if (tMax > 0.001 && tMax < 0.999) splitPoints.push(tMax);
  splitPoints.push(1);
  splitPoints.sort((a, b) => a - b);

  const result: { p1: THREE.Vector3; p2: THREE.Vector3 }[] = [];
  for (let i = 0; i < splitPoints.length - 1; i++) {
    const sA = splitPoints[i];
    const sB = splitPoints[i + 1];
    if (sB - sA < 1e-3) continue;

    const sMid = (sA + sB) / 2;
    const mx = p1.x + sMid * dx;
    const mz = p1.z + sMid * dz;
    const mRadiusSq = mx * mx + mz * mz;

    if (mRadiusSq >= rBossSq) {
      result.push({
        p1: p1.clone().lerp(p2, sA),
        p2: p1.clone().lerp(p2, sB),
      });
    }
  }

  return result;
}

/**
 * Projects a 3D geometry into a 2D view, computing both sharp crease edges
 * and view-dependent silhouette edges, then testing depth occlusion against
 * all front-facing triangles.
 */
function projectGeometryView(
  geometry: THREE.BufferGeometry,
  rotation: SolidRotation,
  view: 'front' | 'top' | 'leftSide' | 'rightSide' | 'isometric',
  isSlottedCylinder = false
): ProjectedView {
  const euler = new THREE.Euler(
    THREE.MathUtils.degToRad(rotation.x),
    THREE.MathUtils.degToRad(rotation.y),
    THREE.MathUtils.degToRad(rotation.z),
    'XYZ'
  );
  const rotMat = new THREE.Matrix4().makeRotationFromEuler(euler);

  // 1. Unify vertices to handle both indexed and non-indexed geometries
  const pos = geometry.getAttribute('position');
  const index = geometry.index;
  const vertexPool: THREE.Vector3[] = [];
  const vertexMap = new Map<string, number>();

  const getOrCreateVertex = (v: THREE.Vector3): number => {
    // Quantize to 0.05 mm precision to merge duplicate vertices at seams
    const qx = Math.round(v.x * 20) / 20;
    const qy = Math.round(v.y * 20) / 20;
    const qz = Math.round(v.z * 20) / 20;
    const key = `${qx}_${qy}_${qz}`;
    let idx = vertexMap.get(key);
    if (idx === undefined) {
      idx = vertexPool.length;
      vertexPool.push(new THREE.Vector3(qx, qy, qz));
      vertexMap.set(key, idx);
    }
    return idx;
  };

  interface TriEntry {
    v1: number;
    v2: number;
    v3: number;
    normal: THREE.Vector3;
    p1: THREE.Vector3;
    p2: THREE.Vector3;
    p3: THREE.Vector3;
  }

  const triangles: TriEntry[] = [];
  const edgeMap = new Map<string, { u: number; v: number; faces: number[] }>();

  const triCount = index ? index.count / 3 : pos.count / 3;
  const vA = new THREE.Vector3();
  const vB = new THREE.Vector3();
  const vC = new THREE.Vector3();

  for (let i = 0; i < triCount; i++) {
    const i1 = index ? index.getX(i * 3) : i * 3;
    const i2 = index ? index.getX(i * 3 + 1) : i * 3 + 1;
    const i3 = index ? index.getX(i * 3 + 2) : i * 3 + 2;

    vA.fromBufferAttribute(pos, i1).applyMatrix4(rotMat);
    vB.fromBufferAttribute(pos, i2).applyMatrix4(rotMat);
    vC.fromBufferAttribute(pos, i3).applyMatrix4(rotMat);

    const u = getOrCreateVertex(vA);
    const v = getOrCreateVertex(vB);
    const w = getOrCreateVertex(vC);

    if (u === v || v === w || w === u) continue;

    const edge1 = new THREE.Vector3().subVectors(vB, vA);
    const edge2 = new THREE.Vector3().subVectors(vC, vA);
    const norm = new THREE.Vector3().crossVectors(edge1, edge2);
    if (norm.lengthSq() < 1e-8) continue;
    norm.normalize();

    const triIdx = triangles.length;
    triangles.push({
      v1: u,
      v2: v,
      v3: w,
      normal: norm,
      p1: vertexPool[u].clone(),
      p2: vertexPool[v].clone(),
      p3: vertexPool[w].clone(),
    });

    const pairs = [
      [u, v],
      [v, w],
      [w, u],
    ];
    for (let p = 0; p < 3; p++) {
      const p1 = pairs[p][0];
      const p2 = pairs[p][1];
      const minP = Math.min(p1, p2);
      const maxP = Math.max(p1, p2);
      const edgeKey = `${minP}_${maxP}`;
      const existing = edgeMap.get(edgeKey);
      if (!existing) {
        edgeMap.set(edgeKey, { u: minP, v: maxP, faces: [triIdx] });
      } else {
        existing.faces.push(triIdx);
      }
    }
  }

  // 2. View eye vector pointing from object toward viewer
  let viewEye: THREE.Vector3;
  switch (view) {
    case 'front':
      viewEye = new THREE.Vector3(0, 0, 1);
      break;
    case 'top':
      viewEye = new THREE.Vector3(0, 1, 0);
      break;
    case 'leftSide':
      viewEye = new THREE.Vector3(-1, 0, 0);
      break;
    case 'rightSide':
      viewEye = new THREE.Vector3(1, 0, 0);
      break;
    case 'isometric':
      viewEye = new THREE.Vector3(1, 1, 1).normalize();
      break;
  }

  const faceDot = triangles.map((t) => t.normal.dot(viewEye));

  // 3. Extract candidate edges: both sharp creases (>18°) and view silhouettes
  interface CandidateEdge {
    p1: THREE.Vector3;
    p2: THREE.Vector3;
  }
  const candidateEdges: CandidateEdge[] = [];
  const cos18 = 0.9510565; // Math.cos(THREE.MathUtils.degToRad(18))

  for (const [, edge] of edgeMap) {
    let isCrease = false;
    let isSil = false;

    if (edge.faces.length === 1) {
      isCrease = true;
    } else if (edge.faces.length >= 2) {
      const f1 = edge.faces[0];
      const f2 = edge.faces[1];
      const n1 = triangles[f1].normal;
      const n2 = triangles[f2].normal;
      if (n1.dot(n2) < cos18) {
        isCrease = true;
      }
      const d1 = faceDot[f1];
      const d2 = faceDot[f2];
      if ((d1 > 1e-4 && d2 < -1e-4) || (d1 < -1e-4 && d2 > 1e-4)) {
        isSil = true;
      }
    }

    if (isCrease || isSil) {
      const p1 = vertexPool[edge.u];
      const p2 = vertexPool[edge.v];
      if (isSlottedCylinder) {
        const clipped = clipSlottedCylinderInternalEdges(p1, p2, geometry);
        for (let c = 0; c < clipped.length; c++) {
          candidateEdges.push(clipped[c]);
        }
      } else {
        candidateEdges.push({ p1, p2 });
      }
    }
  }

  // 3b. For Isometric View of composite slotted cylinder bracket, inject the analytical
  // cylinder-to-base intersection curves so the isometric solid body shows true AutoCAD boolean seams
  if (isSlottedCylinder && view === 'isometric') {
    if (!geometry.boundingBox) geometry.computeBoundingBox();
    const bb = geometry.boundingBox!;
    const minX = bb.min.x;
    const maxX = bb.max.x;
    const minY = bb.min.y;
    const L3D = Math.max(1, maxX - minX);
    const scale3D = L3D / 140;
    const rBoss = 32 * scale3D;
    const halfBaseW = 25 * scale3D;
    const yBaseTop = minY + 10 * scale3D;

    const xSeam = Math.sqrt(Math.max(0, rBoss * rBoss - halfBaseW * halfBaseW));
    const thetaMax = Math.asin(Math.min(1, halfBaseW / rBoss));
    const arcSteps = 18;

    // Right curved intersection arc on base top along x^2 + z^2 = rBoss^2
    for (let i = 0; i < arcSteps; i++) {
      const th1 = -thetaMax + (2 * thetaMax * i) / arcSteps;
      const th2 = -thetaMax + (2 * thetaMax * (i + 1)) / arcSteps;
      const p1 = new THREE.Vector3(rBoss * Math.cos(th1), yBaseTop, rBoss * Math.sin(th1)).applyMatrix4(rotMat);
      const p2 = new THREE.Vector3(rBoss * Math.cos(th2), yBaseTop, rBoss * Math.sin(th2)).applyMatrix4(rotMat);
      candidateEdges.push({ p1, p2 });
    }

    // Left curved intersection arc on base top along x^2 + z^2 = rBoss^2
    for (let i = 0; i < arcSteps; i++) {
      const th1 = -thetaMax + (2 * thetaMax * i) / arcSteps;
      const th2 = -thetaMax + (2 * thetaMax * (i + 1)) / arcSteps;
      const p1 = new THREE.Vector3(-rBoss * Math.cos(th1), yBaseTop, rBoss * Math.sin(th1)).applyMatrix4(rotMat);
      const p2 = new THREE.Vector3(-rBoss * Math.cos(th2), yBaseTop, rBoss * Math.sin(th2)).applyMatrix4(rotMat);
      candidateEdges.push({ p1, p2 });
    }

    // The 4 vertical intersection seams where the vertical sides of the base plate meet the curved cylinder wall
    const vertCorners = [
      [xSeam, halfBaseW],
      [xSeam, -halfBaseW],
      [-xSeam, halfBaseW],
      [-xSeam, -halfBaseW],
    ];

    for (let c = 0; c < vertCorners.length; c++) {
      const [vx, vz] = vertCorners[c];
      const p1 = new THREE.Vector3(vx, minY, vz).applyMatrix4(rotMat);
      const p2 = new THREE.Vector3(vx, yBaseTop, vz).applyMatrix4(rotMat);
      candidateEdges.push({ p1, p2 });
    }
  }

  // 4. Build 2D front-facing triangle list for depth/occlusion testing
  const frontTris2D: FrontTri2D[] = [];
  for (let i = 0; i < triangles.length; i++) {
    if (faceDot[i] <= 1e-4) continue;
    const t = triangles[i];
    const pt1 = projectPointToView(t.p1, view);
    const pt2 = projectPointToView(t.p2, view);
    const pt3 = projectPointToView(t.p3, view);

    // 2D signed area
    const cp = (pt2.x - pt1.x) * (pt3.y - pt1.y) - (pt2.y - pt1.y) * (pt3.x - pt1.x);
    if (Math.abs(cp) < 1e-5) continue; // edge-on

    const v1x = pt2.x - pt1.x;
    const v1y = pt2.y - pt1.y;
    const v1z = pt2.z - pt1.z;
    const v2x = pt3.x - pt1.x;
    const v2y = pt3.y - pt1.y;
    const v2z = pt3.z - pt1.z;

    const planeA = v1y * v2z - v1z * v2y;
    const planeB = v1z * v2x - v1x * v2z;
    const planeC = v1x * v2y - v1y * v2x;
    const planeD = -(planeA * pt1.x + planeB * pt1.y + planeC * pt1.z);

    frontTris2D.push({
      x1: pt1.x,
      y1: pt1.y,
      x2: pt2.x,
      y2: pt2.y,
      x3: pt3.x,
      y3: pt3.y,
      minX: Math.min(pt1.x, pt2.x, pt3.x),
      maxX: Math.max(pt1.x, pt2.x, pt3.x),
      minY: Math.min(pt1.y, pt2.y, pt3.y),
      maxY: Math.max(pt1.y, pt2.y, pt3.y),
      maxZ: Math.max(pt1.z, pt2.z, pt3.z),
      planeA,
      planeB,
      planeC,
      planeD,
    });
  }

  // 5. Test each candidate edge against front-facing triangles
  const rawVisible: Seg2D[] = [];
  const rawHidden: Seg2D[] = [];

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  const updateBounds = (x: number, y: number) => {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  };

  const isPointBehindMesh = (px: number, py: number, pz: number): boolean => {
    for (let j = 0; j < frontTris2D.length; j++) {
      const tri = frontTris2D[j];
      if (px < tri.minX - 0.05 || px > tri.maxX + 0.05 || py < tri.minY - 0.05 || py > tri.maxY + 0.05) {
        continue;
      }
      if (pz > tri.maxZ + 0.1) continue;

      if (pointInTriangle2D(px, py, tri.x1, tri.y1, tri.x2, tri.y2, tri.x3, tri.y3)) {
        if (Math.abs(tri.planeC) > 1e-6) {
          const zTri = -(tri.planeA * px + tri.planeB * py + tri.planeD) / tri.planeC;
          if (zTri > pz + 0.18) {
            return true;
          }
        }
      }
    }
    return false;
  };

  for (let e = 0; e < candidateEdges.length; e++) {
    const edge = candidateEdges[e];
    const ep1 = projectPointToView(edge.p1, view);
    const ep2 = projectPointToView(edge.p2, view);

    const segLen2D = Math.hypot(ep2.x - ep1.x, ep2.y - ep1.y);
    if (segLen2D < 0.1) continue; // edge-on

    updateBounds(ep1.x, ep1.y);
    updateBounds(ep2.x, ep2.y);

    // Collect parameter values t in [0, 1] to split segment where occlusions change
    const tValues = [0, 1];

    // Find 2D intersections with front-facing triangle edges
    const xMinS = Math.min(ep1.x, ep2.x);
    const xMaxS = Math.max(ep1.x, ep2.x);
    const yMinS = Math.min(ep1.y, ep2.y);
    const yMaxS = Math.max(ep1.y, ep2.y);
    const dxS = ep2.x - ep1.x;
    const dyS = ep2.y - ep1.y;

    for (let j = 0; j < frontTris2D.length; j++) {
      const tri = frontTris2D[j];
      if (xMaxS < tri.minX || xMinS > tri.maxX || yMaxS < tri.minY || yMinS > tri.maxY) continue;

      const triEdges = [
        [tri.x1, tri.y1, tri.x2, tri.y2],
        [tri.x2, tri.y2, tri.x3, tri.y3],
        [tri.x3, tri.y3, tri.x1, tri.y1],
      ];

      for (let k = 0; k < 3; k++) {
        const [x3, y3, x4, y4] = triEdges[k];
        const dxT = x4 - x3;
        const dyT = y4 - y3;
        const denom = dxS * dyT - dyS * dxT;
        if (Math.abs(denom) < 1e-6) continue;

        const numS = (x3 - ep1.x) * dyT - (y3 - ep1.y) * dxT;
        const t = numS / denom;
        if (t > 0.01 && t < 0.99) {
          const numT = (x3 - ep1.x) * dyS - (y3 - ep1.y) * dxS;
          const u = numT / denom;
          if (u >= -0.001 && u <= 1.001) {
            tValues.push(t);
          }
        }
      }
    }

    // Subdivide long segments to catch curved silhouette boundaries
    if (segLen2D > 12) {
      const steps = Math.min(8, Math.ceil(segLen2D / 8));
      for (let s = 1; s < steps; s++) {
        tValues.push(s / steps);
      }
    }

    tValues.sort((a, b) => a - b);
    const cleanT: number[] = [];
    for (let i = 0; i < tValues.length; i++) {
      const cur = tValues[i];
      if (cleanT.length === 0 || cur - cleanT[cleanT.length - 1] > 1e-3) {
        cleanT.push(cur);
      }
    }

    // Classify each interval [t_k, t_{k+1}]
    for (let k = 0; k < cleanT.length - 1; k++) {
      const tA = cleanT[k];
      const tB = cleanT[k + 1];
      if ((tB - tA) * segLen2D < 0.05) continue;

      const tMid = (tA + tB) / 2;
      const mx = ep1.x + tMid * dxS;
      const my = ep1.y + tMid * dyS;
      const mz = ep1.z + tMid * (ep2.z - ep1.z);

      const isHidden = isPointBehindMesh(mx, my, mz);
      const subSeg: Seg2D = {
        x1: ep1.x + tA * dxS,
        y1: ep1.y + tA * dyS,
        x2: ep1.x + tB * dxS,
        y2: ep1.y + tB * dyS,
      };

      if (isHidden) {
        // Do NOT draw hidden lines in Isometric view (pictorial drawing)
        if (view !== 'isometric') {
          rawHidden.push(subSeg);
        }
      } else {
        rawVisible.push(subSeg);
      }
    }
  }

  if (!Number.isFinite(minX)) {
    return { visibleSegments: [], hiddenSegments: [], minX: -20, maxX: 20, minY: -20, maxY: 20 };
  }

  // 6. Merge collinear segments and eliminate duplicates
  const mergeCollinear = (segs: Seg2D[]): Seg2D[] => {
    if (segs.length <= 1) return segs;
    const res: Seg2D[] = [];
    const used = new Uint8Array(segs.length);

    for (let i = 0; i < segs.length; i++) {
      if (used[i]) continue;
      let sA = segs[i];
      used[i] = 1;

      for (let j = i + 1; j < segs.length; j++) {
        if (used[j]) continue;
        const sB = segs[j];

        const dxA = sA.x2 - sA.x1;
        const dyA = sA.y2 - sA.y1;
        const lenA = Math.hypot(dxA, dyA);
        if (lenA < 0.01) continue;

        const cross = Math.abs((sB.x1 - sA.x1) * dyA - (sB.y1 - sA.y1) * dxA) / lenA;
        const cross2 = Math.abs((sB.x2 - sA.x1) * dyA - (sB.y2 - sA.y1) * dxA) / lenA;

        if (cross < 0.15 && cross2 < 0.15) {
          const tB1 = ((sB.x1 - sA.x1) * dxA + (sB.y1 - sA.y1) * dyA) / (lenA * lenA);
          const tB2 = ((sB.x2 - sA.x1) * dxA + (sB.y2 - sA.y1) * dyA) / (lenA * lenA);
          const minTB = Math.min(tB1, tB2);
          const maxTB = Math.max(tB1, tB2);

          if (maxTB >= -0.05 && minTB <= 1.05) {
            const minT = Math.min(0, minTB);
            const maxT = Math.max(1, maxTB);
            sA = {
              x1: sA.x1 + minT * dxA,
              y1: sA.y1 + minT * dyA,
              x2: sA.x1 + maxT * dxA,
              y2: sA.y1 + maxT * dyA,
            };
            used[j] = 1;
          }
        }
      }
      res.push(sA);
    }
    return res;
  };

  const visibleSegments = mergeCollinear(rawVisible);

  // Hidden lines that are coincident with visible lines are suppressed (visible overrides hidden)
  const filteredHidden: Seg2D[] = [];
  for (let i = 0; i < rawHidden.length; i++) {
    const h = rawHidden[i];
    const hLen = Math.hypot(h.x2 - h.x1, h.y2 - h.y1);
    if (hLen < 0.1) continue;

    const mx = (h.x1 + h.x2) / 2;
    const my = (h.y1 + h.y2) / 2;

    let coveredByVisible = false;
    for (let j = 0; j < visibleSegments.length; j++) {
      const v = visibleSegments[j];
      const vLen = Math.hypot(v.x2 - v.x1, v.y2 - v.y1);
      if (vLen < 0.1) continue;

      const dist = Math.abs((mx - v.x1) * (v.y2 - v.y1) - (my - v.y1) * (v.x2 - v.x1)) / vLen;
      if (dist < 0.3) {
        const dot = ((mx - v.x1) * (v.x2 - v.x1) + (my - v.y1) * (v.y2 - v.y1)) / (vLen * vLen);
        if (dot >= -0.05 && dot <= 1.05) {
          coveredByVisible = true;
          break;
        }
      }
    }
    if (!coveredByVisible) {
      filteredHidden.push(h);
    }
  }

  const hiddenSegments = mergeCollinear(filteredHidden);

  return { visibleSegments, hiddenSegments, minX, maxX, minY, maxY };
}

interface MappedView {
  visibleSegments: Seg2D[];
  hiddenSegments: Seg2D[];
  centerlines: Seg2D[];
  bounds: { left: number; right: number; top: number; bottom: number };
}

function mapOrthographicView(
  pv: ProjectedView,
  cx: number,
  cy: number,
  scale: number,
  invertY: boolean,
  viewType?: 'front' | 'side' | 'top'
): MappedView {
  const midX = (pv.minX + pv.maxX) / 2;
  const midY = (pv.minY + pv.maxY) / 2;

  const tx = (x: number) => cx + (x - midX) * scale;
  const ty = (y: number) => (invertY ? cy - (y - midY) * scale : cy + (y - midY) * scale);

  const mapSeg = (s: Seg2D): Seg2D => ({
    x1: tx(s.x1),
    y1: ty(s.y1),
    x2: tx(s.x2),
    y2: ty(s.y2),
  });

  const spanX = (pv.maxX - pv.minX) * scale;
  const spanY = (pv.maxY - pv.minY) * scale;

  const left = cx - spanX / 2;
  const right = cx + spanX / 2;
  const top = cy - spanY / 2;
  const bottom = cy + spanY / 2;

  // Centerlines: overshoot strictly 8px beyond geometry bounds to keep clear of all dimensions
  const centerlines: Seg2D[] = [];
  const overshoot = 8;

  if (viewType === 'front' || viewType === 'side') {
    centerlines.push({
      x1: cx,
      y1: top - overshoot,
      x2: cx,
      y2: bottom + overshoot,
    });
  } else if (viewType === 'top') {
    centerlines.push({
      x1: left - overshoot,
      y1: cy,
      x2: right + overshoot,
      y2: cy,
    });
    centerlines.push({
      x1: cx,
      y1: top - overshoot,
      x2: cx,
      y2: bottom + overshoot,
    });
  }

  return {
    visibleSegments: pv.visibleSegments.map(mapSeg),
    hiddenSegments: pv.hiddenSegments.map(mapSeg),
    centerlines,
    bounds: {
      left,
      right,
      top,
      bottom,
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
 * matching college lab drawing standards with strict First-Angle alignment,
 * unified scale, true silhouette outlines, ISO dashed hidden lines,
 * dash-dot centerlines, non-overlapping labels, and untruncated title block.
 */
export function buildAutoCADSheetSVG(params: SheetExportParams): string {
  const { geometry, solidName, dimensions, rotation, sideViewMode, titleBlockMeta } = params;
  const tbOpts = params.titleBlockOptions || DEFAULT_TITLE_BLOCK_OPTIONS;
  const isTbEnabled = tbOpts.enabled;
  const colors: LineColorPalette = { ...DEFAULT_LINE_COLORS, ...(tbOpts.lineColors || {}) };

  const W = 1400;
  const H = 990;
  const m = 36;
  const innerW = W - m * 2;
  const innerH = H - m * 2;

  const sideType = sideViewMode === 'right' ? 'rightSide' : 'leftSide';
  const sideTitle = sideViewMode === 'right' ? 'RIGHT SIDE VIEW' : 'LEFT SIDE VIEW';

  const isSlottedCylinder = checkIsSlottedCylinder(solidName, dimensions);
  const isSteppedTBlock = checkIsSteppedTBlock(solidName, dimensions);

  // 1. Project all 4 views with true silhouettes & hidden line depth testing
  const fvProj = projectGeometryView(geometry, rotation, 'front', isSlottedCylinder);
  const svProj = projectGeometryView(geometry, rotation, sideType, isSlottedCylinder);
  const tvProj = projectGeometryView(geometry, rotation, 'top', isSlottedCylinder);
  const isoProj = projectGeometryView(geometry, rotation, 'isometric', isSlottedCylinder);

  // 2. Compute ONE shared orthographic scale across FV, SV, and TV
  const fvSpanX = Math.max(1, fvProj.maxX - fvProj.minX);
  const fvSpanY = Math.max(1, fvProj.maxY - fvProj.minY);
  const svSpanX = Math.max(1, svProj.maxX - svProj.minX);
  const svSpanY = Math.max(1, svProj.maxY - svProj.minY);
  const tvSpanX = Math.max(1, tvProj.maxX - tvProj.minX);
  const tvSpanY = Math.max(1, tvProj.maxY - tvProj.minY);

  const maxOrthoSpanX = Math.max(fvSpanX, svSpanX, tvSpanX);
  const maxOrthoSpanY = Math.max(fvSpanY, svSpanY, tvSpanY);

  // Available drawing box per quadrant: max width 310, max height 200
  const orthoScale = Math.min(310 / maxOrthoSpanX, 200 / maxOrthoSpanY);

  // 3. Exact First-Angle alignment centers:
  // Front View and Top View share the exact same X-center
  // Front View and Side View share the exact same Y-center
  const cxLeft = m + innerW * 0.25; // 368
  const cxRight = m + innerW * 0.75; // 1032
  const cyTop = m + innerH * 0.25; // 265.5
  const cyBottom = m + innerH * 0.75; // 724.5

  const fv = mapOrthographicView(fvProj, cxLeft, cyTop, orthoScale, true, 'front');
  const sv = mapOrthographicView(svProj, cxRight, cyTop, orthoScale, true, 'side');
  const tv = mapOrthographicView(tvProj, cxLeft, cyBottom, orthoScale, true, 'top');

  // 4. Isometric view in Quadrant 4 (pictorial solid drawing, no hidden lines)
  // When Title Block is ON: isoScale up to 295x175, positioned cleanly below y = H/2 with >=20px whitespace above heading
  // When Title Block is OFF: expands to 370x250, centered cleanly at cyBottom in Quadrant 4
  const isoSpanX = Math.max(1, isoProj.maxX - isoProj.minX);
  const isoSpanY = Math.max(1, isoProj.maxY - isoProj.minY);
  const isoScale = isTbEnabled
    ? Math.min(295 / isoSpanX, 175 / isoSpanY)
    : Math.min(370 / isoSpanX, 250 / isoSpanY);
  const isoCenterY = isTbEnabled ? 633.5 : cyBottom;
  const iso = mapOrthographicView(isoProj, cxRight, isoCenterY, isoScale, true, undefined);

  const drawLines = (segs: Seg2D[], strokeW = 1.6, dash?: string, strokeColor = colors.visible) =>
    segs
      .map(
        (s) =>
          `<line x1="${s.x1.toFixed(1)}" y1="${s.y1.toFixed(1)}" x2="${s.x2.toFixed(1)}" y2="${s.y2.toFixed(1)}" stroke="${strokeColor}" stroke-width="${strokeW}" ${
            dash ? `stroke-dasharray="${dash}"` : ''
          } stroke-linecap="round"/>`
      )
      .join('\n');

  const drawHorizDim = (x1: number, x2: number, yRef: number, offset: number, label: string) => {
    const y = yRef + offset;
    const extDir = offset >= 0 ? 1 : -1;
    return `
      <line x1="${x1.toFixed(1)}" y1="${(yRef + 3 * extDir).toFixed(1)}" x2="${x1.toFixed(1)}" y2="${(y + 5 * extDir).toFixed(1)}" stroke="${colors.dimensions}" stroke-width="0.85"/>
      <line x1="${x2.toFixed(1)}" y1="${(yRef + 3 * extDir).toFixed(1)}" x2="${x2.toFixed(1)}" y2="${(y + 5 * extDir).toFixed(1)}" stroke="${colors.dimensions}" stroke-width="0.85"/>
      <line x1="${x1.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${colors.dimensions}" stroke-width="0.95" marker-start="url(#arrowStart)" marker-end="url(#arrowEnd)"/>
      <text x="${((x1 + x2) / 2).toFixed(1)}" y="${(y - 4).toFixed(1)}" text-anchor="middle" font-size="12.5" fill="${colors.dimensions}">${escapeXml(label)}</text>
    `;
  };

  const drawVertDim = (y1: number, y2: number, xRef: number, offset: number, label: string) => {
    const x = xRef + offset;
    const extDir = offset >= 0 ? 1 : -1;
    const cy = (y1 + y2) / 2;
    return `
      <line x1="${(xRef + 3 * extDir).toFixed(1)}" y1="${y1.toFixed(1)}" x2="${(x + 5 * extDir).toFixed(1)}" y2="${y1.toFixed(1)}" stroke="${colors.dimensions}" stroke-width="0.85"/>
      <line x1="${(xRef + 3 * extDir).toFixed(1)}" y1="${y2.toFixed(1)}" x2="${(x + 5 * extDir).toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${colors.dimensions}" stroke-width="0.85"/>
      <line x1="${x.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${colors.dimensions}" stroke-width="0.95" marker-start="url(#arrowStart)" marker-end="url(#arrowEnd)"/>
      <text x="${(x - 5).toFixed(1)}" y="${cy.toFixed(1)}" text-anchor="middle" font-size="12.5" fill="${colors.dimensions}" transform="rotate(-90 ${(x - 5).toFixed(1)} ${cy.toFixed(1)})">${escapeXml(label)}</text>
    `;
  };

  // Title Block Geometry (anchored inside outer border at bottom-right)
  const tbW = 540;
  const tbH = 162;
  const tbX = W - m - tbW;
  const tbY = H - m - tbH;

  // Title Block Dynamic Font / Multi-line Wrap with clean left-alignment at x="196"
  const renderTitleSvg = (title: string): string => {
    const clean = title.toUpperCase().trim();
    if (clean.length <= 26) {
      return `<text x="196" y="37" font-size="13" font-weight="600" fill="${colors.border}">TITLE: ${escapeXml(clean)}</text>`;
    } else if (clean.length <= 38) {
      return `<text x="196" y="37" font-size="11.5" font-weight="600" fill="${colors.border}">TITLE: ${escapeXml(clean)}</text>`;
    } else {
      const splitIdx = clean.lastIndexOf(' ', 32);
      const cut = splitIdx > 14 ? splitIdx : 30;
      const l1 = clean.slice(0, cut);
      const l2 = clean.slice(cut).trim();
      return `
        <text x="196" y="27" font-size="11" font-weight="600" fill="${colors.border}">TITLE: ${escapeXml(l1)}</text>
        <text x="196" y="46" font-size="10.5" font-weight="600" fill="${colors.border}">${escapeXml(l2)}</text>
      `;
    }
  };

  // Dimension positioning and feature callouts
  const unitPx = (fv.bounds.right - fv.bounds.left) / dimensions.length;

  // Left Side View dimensions: snap '50' strictly to base plate walls (never outer Ø64 cylinder)
  const svMidX = (sv.bounds.left + sv.bounds.right) / 2;
  const svBaseSpan = isSlottedCylinder ? dimensions.width * unitPx : (sv.bounds.right - sv.bounds.left);
  const svBaseLeft = svMidX - svBaseSpan / 2;
  const svBaseRight = svMidX + svBaseSpan / 2;

  // Top View dimensions: snap '50' strictly to base plate walls
  const tvMidY = (tv.bounds.top + tv.bounds.bottom) / 2;
  const tvBaseSpan = isSlottedCylinder ? dimensions.width * unitPx : (tv.bounds.bottom - tv.bounds.top);
  const tvBaseTop = tvMidY - tvBaseSpan / 2;
  const tvBaseBottom = tvMidY + tvBaseSpan / 2;

  let extraCalloutsSvg = '';
  if (isSlottedCylinder) {
    const fvMidX = (fv.bounds.left + fv.bounds.right) / 2;
    const tvMidX = (tv.bounds.left + tv.bounds.right) / 2;

    // 1. Base plate thickness 10 mm vertical dimension on left of Front View
    const baseThickPx = 10 * unitPx;
    const baseDimSvg = drawVertDim(fv.bounds.bottom - baseThickPx, fv.bounds.bottom, fv.bounds.left, -26, '10');

    // 2. Blind hole depth 24 mm vertical dimension in Front View (clean, not crossing solid lines)
    const holeDepthPx = 24 * unitPx;
    const r64Px = 32 * unitPx;
    const holeDepthSvg = drawVertDim(fv.bounds.top, fv.bounds.top + holeDepthPx, fvMidX + r64Px, 22, '24');

    // 3. Circular callout Ø64 on Top View outer circle
    const angle64 = (38 * Math.PI) / 180;
    const t64X = tvMidX + r64Px * Math.cos(angle64);
    const t64Y = tvMidY - r64Px * Math.sin(angle64);
    const e64X = t64X + 22;
    const e64Y = t64Y - 18;
    const s64X = e64X + 32;
    const callout64Svg = `
      <path d="M ${t64X.toFixed(1)} ${t64Y.toFixed(1)} L ${e64X.toFixed(1)} ${e64Y.toFixed(1)} L ${s64X.toFixed(1)} ${e64Y.toFixed(1)}" stroke="${colors.dimensions}" stroke-width="0.95" fill="none" marker-start="url(#arrowStart)"/>
      <text x="${(e64X + 4).toFixed(1)}" y="${(e64Y - 4).toFixed(1)}" text-anchor="start" font-size="12" font-weight="600" fill="${colors.dimensions}">Ø64</text>
    `;

    // 4. Circular callout Ø40 on Top View inner hole circle:
    // Routed up-left so its horizontal shelf sits cleanly above tvBaseTop with zero overlap
    const r40Px = 20 * unitPx;
    const t40X = tvMidX - r40Px * 0.7071;
    const t40Y = tvMidY - r40Px * 0.7071;
    const e40X = tvMidX - r64Px - 16;
    const e40Y = tvBaseTop - 18;
    const s40X = e40X - 32;
    const callout40Svg = `
      <path d="M ${t40X.toFixed(1)} ${t40Y.toFixed(1)} L ${e40X.toFixed(1)} ${e40Y.toFixed(1)} L ${s40X.toFixed(1)} ${e40Y.toFixed(1)}" stroke="${colors.dimensions}" stroke-width="0.95" fill="none" marker-start="url(#arrowStart)"/>
      <text x="${(e40X - 4).toFixed(1)}" y="${(e40Y - 4).toFixed(1)}" text-anchor="end" font-size="12" font-weight="600" fill="${colors.dimensions}">Ø40</text>
    `;

    // 5. Slot depth 30 mm horizontal dimension below Top View
    const slotDepthPx = 30 * unitPx;
    const slotDimSvg = drawHorizDim(tv.bounds.left, tv.bounds.left + slotDepthPx, tv.bounds.bottom, 26, '30');

    // 6. End finger width 15 mm vertical dimension on left of Top View
    const fingerWidthPx = 15 * unitPx;
    const fingerDimSvg = drawVertDim(tvBaseBottom - fingerWidthPx, tvBaseBottom, tv.bounds.left, -26, '15');

    extraCalloutsSvg = `
      ${baseDimSvg}
      ${holeDepthSvg}
      ${callout64Svg}
      ${callout40Svg}
      ${slotDimSvg}
      ${fingerDimSvg}
    `;
  }

  // Views Feature Dimensions
  let fvDimsSvg = '';
  let svDimsSvg = '';
  let tvDimsSvg = '';

  if (isSteppedTBlock) {
    const fvMidX = (fv.bounds.left + fv.bounds.right) / 2;
    const tvMidX = (tv.bounds.left + tv.bounds.right) / 2;
    const tongueHalfWPx = 10 * unitPx;
    const tongueDPx = 20 * unitPx;
    const wingWPx = 10 * unitPx;
    const stepDPx = 10 * unitPx;
    const grooveRPx = 10 * unitPx;

    // FV: 20 (center tongue width) at bottom, 30 (total height) on right
    fvDimsSvg = `
      ${drawHorizDim(fvMidX - tongueHalfWPx, fvMidX + tongueHalfWPx, fv.bounds.bottom, 26, '20')}
      ${drawVertDim(fv.bounds.top, fv.bounds.bottom, fv.bounds.right, 32, '30')}
    `;

    // SV: 30 (rear block depth) + 20 (front tongue depth) along bottom, 30 (total height) on left, 10 (tongue height) on right
    const svStepX = sv.bounds.left + tongueDPx;
    const tongueHPx = 10 * unitPx;
    svDimsSvg = `
      ${drawHorizDim(sv.bounds.left, svStepX, sv.bounds.bottom, 26, '20')}
      ${drawHorizDim(svStepX, sv.bounds.right, sv.bounds.bottom, 26, '30')}
      ${drawVertDim(sv.bounds.top, sv.bounds.bottom, sv.bounds.left, -28, '30')}
      ${drawVertDim(sv.bounds.bottom - tongueHPx, sv.bounds.bottom, sv.bounds.right, 26, '10')}
    `;

    // TV: 40 (total width) at top, 10 (left wing steps), 20 (tongue width & depth), 10 (step depth), and radial leader R10
    const arcCenterY = tv.bounds.top + 20 * unitPx;
    const r10TargetX = tvMidX + grooveRPx * Math.cos(Math.PI / 4);
    const r10TargetY = arcCenterY - grooveRPx * Math.sin(Math.PI / 4);
    const r10ElbowX = tvMidX + 24;
    const r10ElbowY = arcCenterY - 18;
    const r10ShelfX = r10ElbowX + 28;

    const r10LeaderSvg = `
      <path d="M ${r10TargetX.toFixed(1)} ${r10TargetY.toFixed(1)} L ${r10ElbowX.toFixed(1)} ${r10ElbowY.toFixed(1)} L ${r10ShelfX.toFixed(1)} ${r10ElbowY.toFixed(1)}" stroke="${colors.dimensions}" stroke-width="0.95" fill="none" marker-start="url(#arrowStart)"/>
      <text x="${(r10ElbowX + 4).toFixed(1)}" y="${(r10ElbowY - 4).toFixed(1)}" text-anchor="start" font-size="12" font-weight="600" fill="${colors.dimensions}">R10</text>
    `;

    tvDimsSvg = `
      ${drawHorizDim(tv.bounds.left, tv.bounds.right, tv.bounds.top, -26, '40')}
      ${drawHorizDim(tv.bounds.left, tv.bounds.left + wingWPx, tv.bounds.top, -12, '10')}
      ${drawHorizDim(tvMidX - tongueHalfWPx, tvMidX + tongueHalfWPx, tv.bounds.bottom, 26, '20')}
      ${drawVertDim(tv.bounds.bottom - tongueDPx, tv.bounds.bottom, tvMidX - tongueHalfWPx, -22, '20')}
      ${drawVertDim(arcCenterY, arcCenterY + stepDPx, tv.bounds.left, -24, '10')}
      ${r10LeaderSvg}
    `;
  } else {
    fvDimsSvg = `
      ${drawHorizDim(fv.bounds.left, fv.bounds.right, fv.bounds.bottom, 32, `${dimensions.length}`)}
      ${drawVertDim(fv.bounds.top, fv.bounds.bottom, fv.bounds.right, 32, `${dimensions.height}`)}
    `;
    svDimsSvg = `
      ${drawHorizDim(svBaseLeft, svBaseRight, sv.bounds.bottom, 32, `${dimensions.width}`)}
      ${drawVertDim(sv.bounds.top, sv.bounds.bottom, sv.bounds.right, 32, `${dimensions.height}`)}
    `;
    tvDimsSvg = `
      ${drawHorizDim(tv.bounds.left, tv.bounds.right, tv.bounds.top, -26, `${dimensions.length}`)}
      ${drawVertDim(tvBaseTop, tvBaseBottom, tv.bounds.right, 32, `${dimensions.width}`)}
    `;
  }

  const fvTitleY = fv.bounds.top - 28;
  const tvTitleY = tv.bounds.top - 54; // Sits at least 28px above top dimension line (offset -26)

  // Units Note
  const unitsNoteSvg = tbOpts.showUnitsNote
    ? isTbEnabled
      ? `<text x="${tbX + tbW - 145}" y="${tbY - 12}" text-anchor="middle" font-size="13" fill="${colors.border}">All dimensions are in mm</text>`
      : `<text x="${W - m - 145}" y="${H - m - 14}" text-anchor="middle" font-size="13" fill="${colors.border}">All dimensions are in mm</text>`
    : '';

  // College Lab Title Block (conditional on isTbEnabled and individual field toggles)
  let titleBlockSvg = '';
  if (isTbEnabled) {
    const f = tbOpts.fields;
    titleBlockSvg = `
  <!-- COLLEGE LAB TITLE BLOCK -->
  <g transform="translate(${tbX}, ${tbY})">
    <rect x="0" y="0" width="${tbW}" height="${tbH}" fill="#ffffff" stroke="${colors.border}" stroke-width="1.4"/>
    <!-- Row 1: NAME | TITLE (height 64) -->
    <line x1="0" y1="64" x2="${tbW}" y2="64" stroke="${colors.border}" stroke-width="1.2"/>
    <line x1="185" y1="0" x2="185" y2="${tbH}" stroke="${colors.border}" stroke-width="1.2"/>
    ${f.name ? `<text x="14" y="37" font-size="13" font-weight="500" fill="${colors.border}">NAME: ${escapeXml(titleBlockMeta.name || '')}</text>` : ''}
    ${f.title ? renderTitleSvg(solidName) : ''}

    <!-- Lower Rows: CLASS / ROLL NO / DATE | DWG NO / GRADE / VALUED BY | SCALE + Symbol -->
    <line x1="365" y1="64" x2="365" y2="${tbH}" stroke="${colors.border}" stroke-width="1.2"/>
    <line x1="0" y1="97" x2="${tbW}" y2="97" stroke="${colors.border}" stroke-width="1.1"/>
    <line x1="0" y1="130" x2="365" y2="130" stroke="${colors.border}" stroke-width="1.1"/>

    ${f.className ? `<text x="12" y="86" font-size="12" fill="${colors.border}">CLASS: ${escapeXml(titleBlockMeta.className || '')}</text>` : ''}
    ${f.rollNo ? `<text x="12" y="119" font-size="12" fill="${colors.border}">ROLL NO.: ${escapeXml(titleBlockMeta.rollNo || '')}</text>` : ''}
    ${f.date ? `<text x="12" y="151" font-size="12" fill="${colors.border}">DATE: ${escapeXml(titleBlockMeta.date || '')}</text>` : ''}

    ${f.dwgNo ? `<text x="196" y="86" font-size="12" fill="${colors.border}">DWG. NO.: ${escapeXml(titleBlockMeta.dwgNo || '')}</text>` : ''}
    ${f.grade ? `<text x="196" y="119" font-size="12" fill="${colors.border}">GRADE: ${escapeXml(titleBlockMeta.grade || '')}</text>` : ''}
    ${f.valuedBy ? `<text x="196" y="151" font-size="12" fill="${colors.border}">VALUED BY: ${escapeXml(titleBlockMeta.valuedBy || '')}</text>` : ''}

    ${f.scale ? `<text x="378" y="86" font-size="12" fill="${colors.border}">SCALE: ${escapeXml(titleBlockMeta.scale || '1:1')}</text>` : ''}

    ${
      f.projectionSymbol
        ? `<!-- First-Angle Projection Symbol -->
    <g transform="translate(382, 102)">
      <line x1="2" y1="26" x2="144" y2="26" stroke="${colors.centerline}" stroke-width="1" stroke-dasharray="8 3 2 3"/>
      <line x1="112" y1="2" x2="112" y2="50" stroke="${colors.centerline}" stroke-width="1" stroke-dasharray="8 3 2 3"/>
      <polygon points="12,16 64,6 64,46 12,36" fill="none" stroke="${colors.border}" stroke-width="1.4"/>
      <circle cx="112" cy="26" r="20" fill="none" stroke="${colors.border}" stroke-width="1.4"/>
      <circle cx="112" cy="26" r="10" fill="none" stroke="${colors.border}" stroke-width="1.4"/>
    </g>`
        : ''
    }
  </g>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="font-family: Arial, Helvetica, sans-serif; background: #ffffff;">
  <defs>
    <marker id="arrowEnd" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M 0 2 L 10 5 L 0 8 z" fill="${colors.dimensions}"/>
    </marker>
    <marker id="arrowStart" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M 10 2 L 0 5 L 10 8 z" fill="${colors.dimensions}"/>
    </marker>
  </defs>

  <!-- Pure White AutoCAD Drawing Sheet -->
  <rect x="0" y="0" width="${W}" height="${H}" fill="#ffffff"/>

  <!-- Thin Crisp Outer Border -->
  <rect x="${m}" y="${m}" width="${innerW}" height="${innerH}" fill="none" stroke="${colors.border}" stroke-width="1.6"/>

  <!-- Quadrant Dividers -->
  ${
    (tbOpts.dividerStyle ?? 'dotted') === 'dotted'
      ? `<line x1="${W / 2}" y1="${m}" x2="${W / 2}" y2="${H - m}" stroke="${colors.dividers}" stroke-width="1.1" stroke-dasharray="2 6"/>
  <line x1="${m}" y1="${H / 2}" x2="${W - m}" y2="${H / 2}" stroke="${colors.dividers}" stroke-width="1.1" stroke-dasharray="2 6"/>`
      : (tbOpts.dividerStyle ?? 'dotted') === 'solid'
        ? `<line x1="${W / 2}" y1="${m}" x2="${W / 2}" y2="${H - m}" stroke="${colors.dividers}" stroke-width="1.1"/>
  <line x1="${m}" y1="${H / 2}" x2="${W - m}" y2="${H / 2}" stroke="${colors.dividers}" stroke-width="1.1"/>`
        : ''
  }

  <!-- QUADRANT 1: FRONT VIEW -->
  <text x="${(fv.bounds.left + fv.bounds.right) / 2}" y="${fvTitleY}" text-anchor="middle" font-size="15" font-weight="600" fill="#000">FRONT VIEW</text>
  <!-- Centerlines -->
  ${drawLines(fv.centerlines, 0.75, '10 3 2 3', colors.centerline)}
  <!-- Hidden Lines (ISO Dashed) -->
  ${drawLines(fv.hiddenSegments, 0.95, '5 3', colors.hidden)}
  <!-- Visible Lines (Solid) -->
  ${drawLines(fv.visibleSegments, 1.6, undefined, colors.visible)}
  <!-- Dimensions -->
  ${fvDimsSvg}

  <!-- QUADRANT 2: SIDE VIEW (Exact Y-alignment with Front View) -->
  <text x="${(sv.bounds.left + sv.bounds.right) / 2}" y="${sv.bounds.top - 28}" text-anchor="middle" font-size="15" font-weight="600" fill="#000">${sideTitle}</text>
  <!-- Centerlines -->
  ${drawLines(sv.centerlines, 0.75, '10 3 2 3', colors.centerline)}
  <!-- Hidden Lines (ISO Dashed) -->
  ${drawLines(sv.hiddenSegments, 0.95, '5 3', colors.hidden)}
  <!-- Visible Lines (Solid) -->
  ${drawLines(sv.visibleSegments, 1.6, undefined, colors.visible)}
  <!-- Dimensions -->
  ${svDimsSvg}

  <!-- QUADRANT 3: TOP VIEW (Exact X-alignment with Front View) -->
  <!-- Top View title placed cleanly above dimension line -->
  <text x="${(tv.bounds.left + tv.bounds.right) / 2}" y="${tvTitleY}" text-anchor="middle" font-size="15" font-weight="600" fill="#000">TOP VIEW</text>
  <!-- Centerlines -->
  ${drawLines(tv.centerlines, 0.75, '10 3 2 3', colors.centerline)}
  <!-- Hidden Lines (ISO Dashed) -->
  ${drawLines(tv.hiddenSegments, 0.95, '5 3', colors.hidden)}
  <!-- Visible Lines (Solid) -->
  ${drawLines(tv.visibleSegments, 1.6, undefined, colors.visible)}
  <!-- Dimensions -->
  ${tvDimsSvg}

  <!-- Special Machine Feature Callouts -->
  ${extraCalloutsSvg}

  <!-- QUADRANT 4: ISOMETRIC VIEW (Clean Pictorial Solid, No Hidden Lines) -->
  <text x="${iso.bounds.left}" y="${(iso.bounds.top - 16).toFixed(1)}" text-anchor="start" font-size="15" font-weight="600" fill="#000">ISOMETRIC VIEW</text>
  ${drawLines(iso.visibleSegments, 1.5, undefined, colors.isometric)}

  <!-- Note above Title Block / bottom note -->
  ${unitsNoteSvg}

  ${titleBlockSvg}
</svg>`;
}

/**
 * Generates a real ASCII R12 AutoCAD DXF file with synchronized layers:
 * VISIBLE, HIDDEN, CENTER, ISOMETRIC, BORDER, TITLEBLOCK, and TEXT.
 */
export function buildAutoCADDXF(params: SheetExportParams): string {
  const { geometry, solidName, dimensions, rotation, sideViewMode, titleBlockMeta } = params;
  const tbOpts = params.titleBlockOptions || DEFAULT_TITLE_BLOCK_OPTIONS;
  const isTbEnabled = tbOpts.enabled;
  const colors: LineColorPalette = { ...DEFAULT_LINE_COLORS, ...(tbOpts.lineColors || {}) };

  const W = 420; // A3 width in mm
  const H = 297; // A3 height in mm
  const m = 10;
  const midX = W / 2;
  const midY = H / 2;

  const sideType = sideViewMode === 'right' ? 'rightSide' : 'leftSide';
  const sideTitle = sideViewMode === 'right' ? 'RIGHT SIDE VIEW' : 'LEFT SIDE VIEW';

  const isSlottedCylinder = checkIsSlottedCylinder(solidName, dimensions);

  const fvProj = projectGeometryView(geometry, rotation, 'front', isSlottedCylinder);
  const svProj = projectGeometryView(geometry, rotation, sideType, isSlottedCylinder);
  const tvProj = projectGeometryView(geometry, rotation, 'top', isSlottedCylinder);
  const isoProj = projectGeometryView(geometry, rotation, 'isometric', isSlottedCylinder);

  // Unified orthographic scale for DXF
  const fvSpanX = Math.max(1, fvProj.maxX - fvProj.minX);
  const fvSpanY = Math.max(1, fvProj.maxY - fvProj.minY);
  const svSpanX = Math.max(1, svProj.maxX - svProj.minX);
  const svSpanY = Math.max(1, svProj.maxY - svProj.minY);
  const tvSpanX = Math.max(1, tvProj.maxX - tvProj.minX);
  const tvSpanY = Math.max(1, tvProj.maxY - tvProj.minY);

  const maxSpanX = Math.max(fvSpanX, svSpanX, tvSpanX);
  const maxSpanY = Math.max(fvSpanY, svSpanY, tvSpanY);
  const orthoScaleDXF = Math.min(105 / maxSpanX, 70 / maxSpanY);

  const cxLeft = W * 0.25; // 105
  const cxRight = W * 0.75; // 315
  const cyTop = H * 0.72; // 213.8 (DXF Y=0 is at bottom)
  const cyBottom = H * 0.28; // 83.2

  const fv = mapOrthographicView(fvProj, cxLeft, cyTop, orthoScaleDXF, false, 'front');
  const sv = mapOrthographicView(svProj, cxRight, cyTop, orthoScaleDXF, false, 'side');
  const tv = mapOrthographicView(tvProj, cxLeft, cyBottom, orthoScaleDXF, false, 'top');

  const isoSpanX = Math.max(1, isoProj.maxX - isoProj.minX);
  const isoSpanY = Math.max(1, isoProj.maxY - isoProj.minY);
  const isoScaleDXF = isTbEnabled
    ? Math.min(85 / isoSpanX, 55 / isoSpanY)
    : Math.min(105 / isoSpanX, 70 / isoSpanY);
  const isoCenterYDXF = isTbEnabled ? 100 : cyBottom;
  const iso = mapOrthographicView(isoProj, cxRight, isoCenterYDXF, isoScaleDXF, false, undefined);

  const lines: string[] = [
    '0',
    'SECTION',
    '2',
    'HEADER',
    '9',
    '$ACADVER',
    '1',
    'AC1009',
    '9',
    '$INSUNITS',
    '70',
    '4',
    '0',
    'ENDSEC',
    '0',
    'SECTION',
    '2',
    'TABLES',
    '0',
    'TABLE',
    '2',
    'LTYPE',
    '70',
    '3',
    '0',
    'LTYPE',
    '2',
    'CONTINUOUS',
    '70',
    '64',
    '3',
    'Solid line',
    '72',
    '65',
    '73',
    '0',
    '40',
    '0.0',
    '0',
    'LTYPE',
    '2',
    'HIDDEN',
    '70',
    '64',
    '3',
    'Hidden __ __ __ __ __',
    '72',
    '65',
    '73',
    '2',
    '40',
    '9.525',
    '49',
    '6.35',
    '49',
    '-3.175',
    '0',
    'LTYPE',
    '2',
    'CENTER',
    '70',
    '64',
    '3',
    'Center ____ _ ____ _',
    '72',
    '65',
    '73',
    '4',
    '40',
    '31.75',
    '49',
    '19.05',
    '49',
    '-3.175',
    '49',
    '3.175',
    '49',
    '-3.175',
    '0',
    'ENDTAB',
    '0',
    'TABLE',
    '2',
    'LAYER',
    '70',
    '7',
    '0',
    'LAYER',
    '2',
    'VISIBLE',
    '70',
    '64',
    '62',
    String(hexToAci(colors.visible)),
    '6',
    'CONTINUOUS',
    '0',
    'LAYER',
    '2',
    'HIDDEN',
    '70',
    '64',
    '62',
    String(hexToAci(colors.hidden)),
    '6',
    'HIDDEN',
    '0',
    'LAYER',
    '2',
    'CENTER',
    '70',
    '64',
    '62',
    String(hexToAci(colors.centerline)),
    '6',
    'CENTER',
    '0',
    'LAYER',
    '2',
    'ISOMETRIC',
    '70',
    '64',
    '62',
    String(hexToAci(colors.isometric)),
    '6',
    'CONTINUOUS',
    '0',
    'LAYER',
    '2',
    'BORDER',
    '70',
    '64',
    '62',
    String(hexToAci(colors.border)),
    '6',
    'CONTINUOUS',
    '0',
    'LAYER',
    '2',
    'TITLEBLOCK',
    '70',
    '64',
    '62',
    String(hexToAci(colors.border)),
    '6',
    'CONTINUOUS',
    '0',
    'LAYER',
    '2',
    'TEXT',
    '70',
    '64',
    '62',
    String(hexToAci(colors.dimensions)),
    '6',
    'CONTINUOUS',
    '0',
    'ENDTAB',
    '0',
    'ENDSEC',
    '0',
    'SECTION',
    '2',
    'ENTITIES',
  ];

  const addLine = (x1: number, y1: number, x2: number, y2: number, layer = 'VISIBLE', linetype?: string) => {
    lines.push('0', 'LINE', '8', layer);
    if (linetype) {
      lines.push('6', linetype);
    }
    lines.push(
      '10',
      x1.toFixed(3),
      '20',
      y1.toFixed(3),
      '30',
      '0.0',
      '11',
      x2.toFixed(3),
      '21',
      y2.toFixed(3),
      '31',
      '0.0'
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
      '0',
      'TEXT',
      '8',
      layer,
      '10',
      x.toFixed(3),
      '20',
      y.toFixed(3),
      '30',
      '0.0',
      '40',
      height.toFixed(2),
      '1',
      text
    );
  };

  // A3 Outer Border & Quadrant Dividers
  addRect(m, m, W - m * 2, H - m * 2, 'BORDER');
  const dxfDividerStyle = tbOpts.dividerStyle ?? 'dotted';
  if (dxfDividerStyle === 'dotted') {
    addLine(midX, m, midX, H - m, 'CENTER', 'CENTER');
    addLine(m, midY, W - m, midY, 'CENTER', 'CENTER');
  } else if (dxfDividerStyle === 'solid') {
    addLine(midX, m, midX, H - m, 'BORDER', 'CONTINUOUS');
    addLine(m, midY, W - m, midY, 'BORDER', 'CONTINUOUS');
  }

  // Visible Lines
  for (const s of fv.visibleSegments) addLine(s.x1, s.y1, s.x2, s.y2, 'VISIBLE');
  for (const s of sv.visibleSegments) addLine(s.x1, s.y1, s.x2, s.y2, 'VISIBLE');
  for (const s of tv.visibleSegments) addLine(s.x1, s.y1, s.x2, s.y2, 'VISIBLE');
  for (const s of iso.visibleSegments) addLine(s.x1, s.y1, s.x2, s.y2, 'ISOMETRIC');

  // Hidden Lines (DXF layer HIDDEN)
  for (const s of fv.hiddenSegments) addLine(s.x1, s.y1, s.x2, s.y2, 'HIDDEN', 'HIDDEN');
  for (const s of sv.hiddenSegments) addLine(s.x1, s.y1, s.x2, s.y2, 'HIDDEN', 'HIDDEN');
  for (const s of tv.hiddenSegments) addLine(s.x1, s.y1, s.x2, s.y2, 'HIDDEN', 'HIDDEN');

  // Centerlines (DXF layer CENTER, strictly 2.5 mm beyond geometry bounds)
  const dxfOvershoot = 2.5;
  // FV centerline
  addLine(cxLeft, fv.bounds.top - dxfOvershoot, cxLeft, fv.bounds.bottom + dxfOvershoot, 'CENTER', 'CENTER');
  // SV centerline
  addLine(cxRight, sv.bounds.top - dxfOvershoot, cxRight, sv.bounds.bottom + dxfOvershoot, 'CENTER', 'CENTER');
  // TV centerlines
  addLine(tv.bounds.left - dxfOvershoot, cyBottom, tv.bounds.right + dxfOvershoot, cyBottom, 'CENTER', 'CENTER');
  addLine(cxLeft, tv.bounds.top - dxfOvershoot, cxLeft, tv.bounds.bottom + dxfOvershoot, 'CENTER', 'CENTER');

  // View Titles
  addText(W * 0.2, H * 0.91, 4.5, 'FRONT VIEW');
  addText(W * 0.7, H * 0.91, 4.5, sideTitle);
  addText(W * 0.2, H * 0.44, 4.5, 'TOP VIEW');
  const isoTitleY = isTbEnabled ? H * 0.45 : H * 0.44;
  addText(W * 0.65, isoTitleY, 4.5, 'ISOMETRIC VIEW');

  if (tbOpts.showUnitsNote) {
    const noteY = isTbEnabled ? 62 : 14;
    addText(W - 140, noteY, 3.5, `All dimensions are in mm (${dimensions.length}x${dimensions.width}x${dimensions.height})`);
  }

  // College Lab Title Block (DXF coordinates: Y=0 is bottom)
  if (isTbEnabled) {
    const f = tbOpts.fields;
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

    if (f.name) addText(tbX + 3, tbY + 37, 3.2, `NAME: ${titleBlockMeta.name || ''}`);
    if (f.title) {
      const fullDxfTitle = solidName.toUpperCase().trim();
      if (fullDxfTitle.length <= 28) {
        addText(tbX + 58, tbY + 37, 3.0, `TITLE: ${fullDxfTitle}`);
      } else {
        const splitIdx = fullDxfTitle.lastIndexOf(' ', 30);
        const cut = splitIdx > 14 ? splitIdx : 28;
        const l1 = fullDxfTitle.slice(0, cut);
        const l2 = fullDxfTitle.slice(cut).trim();
        addText(tbX + 58, tbY + 41, 2.4, `TITLE: ${l1}`);
        addText(tbX + 58, tbY + 33, 2.4, l2);
      }
    }
    if (f.className) addText(tbX + 3, tbY + 23, 2.8, `CLASS: ${titleBlockMeta.className || ''}`);
    if (f.rollNo) addText(tbX + 3, tbY + 13, 2.8, `ROLL NO: ${titleBlockMeta.rollNo || ''}`);
    if (f.date) addText(tbX + 3, tbY + 3, 2.8, `DATE: ${titleBlockMeta.date || ''}`);
    if (f.dwgNo) addText(tbX + 58, tbY + 23, 2.8, `DWG NO: ${titleBlockMeta.dwgNo || ''}`);
    if (f.grade) addText(tbX + 58, tbY + 13, 2.8, `GRADE: ${titleBlockMeta.grade || ''}`);
    if (f.valuedBy) addText(tbX + 58, tbY + 3, 2.8, `VALUED BY: ${titleBlockMeta.valuedBy || ''}`);
    if (f.scale) addText(tbX + 118, tbY + 23, 2.8, `SCALE: ${titleBlockMeta.scale || '1:1'}`);

    if (f.projectionSymbol) {
      // First-Angle Symbol in DXF
      addLine(tbX + 120, tbY + 6, tbX + 136, tbY + 3, 'TITLEBLOCK');
      addLine(tbX + 136, tbY + 3, tbX + 136, tbY + 17, 'TITLEBLOCK');
      addLine(tbX + 136, tbY + 17, tbX + 120, tbY + 14, 'TITLEBLOCK');
      addLine(tbX + 120, tbY + 14, tbX + 120, tbY + 6, 'TITLEBLOCK');
      lines.push('0', 'CIRCLE', '8', 'TITLEBLOCK', '10', (tbX + 151).toFixed(2), '20', (tbY + 10).toFixed(2), '30', '0.0', '40', '6.5');
      lines.push('0', 'CIRCLE', '8', 'TITLEBLOCK', '10', (tbX + 151).toFixed(2), '20', (tbY + 10).toFixed(2), '30', '0.0', '40', '3.2');
    }
  }

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
      @page { size: A3 landscape; margin: 0; }
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
