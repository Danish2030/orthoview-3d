import * as THREE from 'three';
import { Brush, Evaluator, ADDITION, SUBTRACTION } from 'three-bvh-csg';
import type { CompositePartSpec, SolidDimensions, SolidType, UniversalPartBlueprint } from '../types';

export const DEFAULT_SLOTTED_CYLINDER_SPEC: CompositePartSpec = {
  baseLength: 140,
  baseWidth: 50,
  baseThickness: 10,
  hasEndSlots: true,
  slotDepth: 30,
  slotWidth: 20,
  bossShape: 'cylinder',
  bossDiameter: 64,
  bossDepth: 64,
  totalHeight: 50,
  hasHole: true,
  holeDiameter: 40,
  holeDepth: 24,
};

function mergeNonIndexedGeometries(geoms: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const normalized = geoms.map((g) => {
    const nonIdx = g.index ? g.toNonIndexed() : g.clone();
    if (!nonIdx.getAttribute('normal')) {
      nonIdx.computeVertexNormals();
    }
    return nonIdx;
  });

  let totalVerts = 0;
  for (const g of normalized) {
    totalVerts += g.getAttribute('position').count;
  }

  const positions = new Float32Array(totalVerts * 3);
  const normals = new Float32Array(totalVerts * 3);
  let offset = 0;

  for (const g of normalized) {
    const pos = g.getAttribute('position');
    const norm = g.getAttribute('normal');
    for (let i = 0; i < pos.count; i++) {
      positions[offset * 3] = pos.getX(i);
      positions[offset * 3 + 1] = pos.getY(i);
      positions[offset * 3 + 2] = pos.getZ(i);
      normals[offset * 3] = norm.getX(i);
      normals[offset * 3 + 1] = norm.getY(i);
      normals[offset * 3 + 2] = norm.getZ(i);
      offset++;
    }
    g.dispose();
  }

  const merged = new THREE.BufferGeometry();
  merged.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  merged.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  return merged;
}

function buildCompositePartGeometry(spec: CompositePartSpec): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  const L = Math.max(20, spec.baseLength);
  const W = Math.max(20, spec.baseWidth);
  const T = Math.max(4, Math.min(spec.totalHeight - 2, spec.baseThickness));
  const H = Math.max(T + 4, spec.totalHeight);
  const halfL = L / 2;
  const halfW = W / 2;
  const halfH = H / 2;

  // 1. Base Plate (with optional U-slots on left and right ends)
  const baseShape = new THREE.Shape();
  if (spec.hasEndSlots && spec.slotDepth > 0 && spec.slotWidth > 0 && spec.slotWidth < W - 4) {
    const sD = Math.min(spec.slotDepth, halfL - 6);
    const sHalfW = Math.min(spec.slotWidth / 2, halfW - 3);
    baseShape.moveTo(-halfL, -halfW);
    baseShape.lineTo(halfL, -halfW);
    baseShape.lineTo(halfL, -sHalfW);
    baseShape.lineTo(halfL - sD, -sHalfW);
    baseShape.lineTo(halfL - sD, sHalfW);
    baseShape.lineTo(halfL, sHalfW);
    baseShape.lineTo(halfL, halfW);
    baseShape.lineTo(-halfL, halfW);
    baseShape.lineTo(-halfL, sHalfW);
    baseShape.lineTo(-halfL + sD, sHalfW);
    baseShape.lineTo(-halfL + sD, -sHalfW);
    baseShape.lineTo(-halfL, -sHalfW);
    baseShape.closePath();
  } else {
    baseShape.moveTo(-halfL, -halfW);
    baseShape.lineTo(halfL, -halfW);
    baseShape.lineTo(halfL, halfW);
    baseShape.lineTo(-halfL, halfW);
    baseShape.closePath();
  }

  const baseGeom = new THREE.ExtrudeGeometry(baseShape, {
    steps: 1,
    depth: T,
    bevelEnabled: false,
  });
  // Extrude is in XY with depth +Z -> rotateX(-PI/2) puts shape in XZ and thickness along +Y
  baseGeom.rotateX(-Math.PI / 2);
  baseGeom.translate(0, -halfH, 0);
  parts.push(baseGeom);

  // 2. Central Boss (Cylinder with blind/through hole, or Box)
  if (spec.bossShape === 'cylinder') {
    const rOut = Math.max(6, spec.bossDiameter / 2);
    const rHole = spec.hasHole ? Math.max(2, Math.min(rOut - 2, spec.holeDiameter / 2)) : 0;
    const hDepth = spec.hasHole ? Math.max(2, Math.min(H, spec.holeDepth)) : 0;

    if (spec.hasHole && rHole > 0) {
      const pts: THREE.Vector2[] = [];
      if (hDepth >= H - 0.5) {
        // Through hole
        pts.push(new THREE.Vector2(rHole, -halfH));
        pts.push(new THREE.Vector2(rOut, -halfH));
        pts.push(new THREE.Vector2(rOut, halfH));
        pts.push(new THREE.Vector2(rHole, halfH));
        pts.push(new THREE.Vector2(rHole, -halfH));
      } else {
        // Blind hole from top (e.g. Ø40, 24 deep)
        const floorY = halfH - hDepth;
        pts.push(new THREE.Vector2(0.01, -halfH));
        pts.push(new THREE.Vector2(rOut, -halfH));
        pts.push(new THREE.Vector2(rOut, halfH));
        pts.push(new THREE.Vector2(rHole, halfH));
        pts.push(new THREE.Vector2(rHole, floorY));
        pts.push(new THREE.Vector2(0.01, floorY));
      }
      const bossGeom = new THREE.LatheGeometry(pts, 48);
      parts.push(bossGeom);
    } else {
      const bossGeom = new THREE.CylinderGeometry(rOut, rOut, H, 48, 1);
      parts.push(bossGeom);
    }
  } else if (spec.bossShape === 'box') {
    const bL = Math.max(10, spec.bossDiameter);
    const bW = Math.max(10, spec.bossDepth || spec.bossDiameter);
    const bossGeom = new THREE.BoxGeometry(bL, H, bW);
    parts.push(bossGeom);
  }

  // Scale down gently if very large so it fits nicely in the 135-unit orthographic camera frustum
  const merged = mergeNonIndexedGeometries(parts);
  const maxSpan = Math.max(L, W, H);
  if (maxSpan > 110) {
    const scaleFactor = 105 / maxSpan;
    merged.scale(scaleFactor, scaleFactor, scaleFactor);
  }
  return merged;
}

export function buildUniversalBlueprintGeometry(bp: UniversalPartBlueprint): THREE.BufferGeometry {
  const L = bp.overallLength || 50;
  const W = bp.overallWidth || 50;
  const H = bp.overallHeight || 50;

  if (!bp.operations || bp.operations.length === 0) {
    return new THREE.BoxGeometry(L, H, W);
  }

  try {
    const evaluator = new Evaluator();
    evaluator.useGroups = false;

    let currentBrush: Brush | null = null;
    const halfH = H / 2;

    for (const op of bp.operations) {
      let geom: THREE.BufferGeometry;
      if (op.shape === 'cylinder') {
        const r = Math.max(0.5, op.radius || 10);
        const h = Math.max(1, op.height || 20);
        const cyl = new THREE.CylinderGeometry(r, r, h, 36);
        if (op.axis === 'x') {
          cyl.rotateZ(Math.PI / 2);
        } else if (op.axis === 'z') {
          cyl.rotateX(Math.PI / 2);
        }
        geom = cyl;
      } else {
        const dx = Math.max(1, op.dx || 20);
        const dy = Math.max(1, op.dy || 20);
        const dz = Math.max(1, op.dz || 20);
        geom = new THREE.BoxGeometry(dx, dy, dz);
      }

      const brush = new Brush(geom);
      // Coordinate convention: y=0 is bottom surface of part
      const posX = op.x || 0;
      const posY = (typeof op.y === 'number' ? op.y : halfH) - halfH;
      const posZ = op.z || 0;
      brush.position.set(posX, posY, posZ);
      brush.updateMatrixWorld();

      if (!currentBrush) {
        if (op.op === 'subtract') {
          const baseBox = new Brush(new THREE.BoxGeometry(L, H, W));
          baseBox.position.set(0, 0, 0);
          baseBox.updateMatrixWorld();
          currentBrush = evaluator.evaluate(baseBox, brush, SUBTRACTION);
        } else {
          currentBrush = brush;
        }
      } else {
        if (op.op === 'subtract') {
          currentBrush = evaluator.evaluate(currentBrush, brush, SUBTRACTION);
        } else {
          currentBrush = evaluator.evaluate(currentBrush, brush, ADDITION);
        }
      }
    }

    if (!currentBrush) {
      return new THREE.BoxGeometry(L, H, W);
    }

    const finalGeom = currentBrush.geometry.clone();
    finalGeom.computeVertexNormals();
    finalGeom.center();

    const maxSpan = Math.max(L, W, H);
    if (maxSpan > 110) {
      const scaleFactor = 105 / maxSpan;
      finalGeom.scale(scaleFactor, scaleFactor, scaleFactor);
    }
    return finalGeom;
  } catch (err) {
    console.warn('CSG Blueprint generation error, falling back to bounding box:', err);
    return new THREE.BoxGeometry(L, H, W);
  }
}

export function createSolidGeometry(
  type: SolidType,
  dim: SolidDimensions,
  compositeSpec?: CompositePartSpec,
  universalBlueprint?: UniversalPartBlueprint
): THREE.BufferGeometry {
  const { length: L, width: W, height: H } = dim;

  switch (type) {
    case 'l-block': {
      // Machined Stepped L-block with chamfered edges
      const shape = new THREE.Shape();
      const halfW = W / 2;
      const halfH = H / 2;

      shape.moveTo(-halfW, -halfH);
      shape.lineTo(halfW, -halfH);
      shape.lineTo(halfW, 0);
      shape.lineTo(0, 0);
      shape.lineTo(0, halfH);
      shape.lineTo(-halfW, halfH);
      shape.closePath();

      const extrudeSettings = {
        steps: 1,
        depth: L,
        bevelEnabled: true,
        bevelThickness: 0.8,
        bevelSize: 0.8,
        bevelOffset: -0.8,
        bevelSegments: 3,
      };

      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geom.center();
      geom.rotateY(Math.PI / 2);
      return geom;
    }

    case 'u-block': {
      // Milled Slotted U-block with tool fillet at bottom of channel
      const halfW = W / 2;
      const halfH = H / 2;
      const slotHalfW = W / 4;
      const slotBottom = 0;

      const shape = new THREE.Shape();
      shape.moveTo(-halfW, -halfH);
      shape.lineTo(halfW, -halfH);
      shape.lineTo(halfW, halfH);
      shape.lineTo(slotHalfW, halfH);
      shape.lineTo(slotHalfW, slotBottom);
      shape.lineTo(-slotHalfW, slotBottom);
      shape.lineTo(-slotHalfW, halfH);
      shape.lineTo(-halfW, halfH);
      shape.closePath();

      const extrudeSettings = {
        steps: 1,
        depth: L,
        bevelEnabled: true,
        bevelThickness: 0.8,
        bevelSize: 0.8,
        bevelOffset: -0.8,
        bevelSegments: 3,
      };

      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geom.center();
      geom.rotateY(Math.PI / 2);
      return geom;
    }

    case 'hex-prism': {
      // Hexagonal Prism with machined end-face chamfers
      const radius = L / 2;
      const geom = new THREE.CylinderGeometry(radius, radius, H, 6, 2, false);
      const scaleZ = W / L;
      geom.scale(1, 1, scaleZ);
      return geom;
    }

    case 'square-pyramid': {
      // Square Pyramid with base plinth
      const radius = Math.SQRT2 * (L / 2);
      const geom = new THREE.ConeGeometry(radius, H, 4, 1);
      geom.rotateY(Math.PI / 4);
      const scaleZ = W / L;
      geom.scale(1, 1, scaleZ);
      return geom;
    }

    case 'cone-frustum': {
      // Truncated Cone Frustum (ISO First-Angle Reference Solid)
      const rBottom = L / 2;
      const rTop = L / 4;
      const geom = new THREE.CylinderGeometry(rTop, rBottom, H, 48, 2);
      const scaleZ = W / L;
      geom.scale(1, 1, scaleZ);
      return geom;
    }

    case 'cylinder-hole': {
      // Bushing with concentric through-bore
      const rOut = L / 2;
      const rIn = L / 4;

      const shape = new THREE.Shape();
      shape.absarc(0, 0, rOut, 0, Math.PI * 2, false);

      const holePath = new THREE.Path();
      holePath.absarc(0, 0, rIn, 0, Math.PI * 2, true);
      shape.holes.push(holePath);

      const extrudeSettings = {
        steps: 1,
        depth: H,
        bevelEnabled: true,
        bevelThickness: 0.6,
        bevelSize: 0.6,
        bevelSegments: 2,
        curveSegments: 48,
      };

      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geom.center();
      geom.rotateX(Math.PI / 2);
      const scaleZ = W / L;
      geom.scale(1, 1, scaleZ);
      return geom;
    }

    case 'counterbore': {
      // Cylinder with Stepped Counterbore Hole (Dual hidden lines)
      // Top half has larger counterbore diameter, bottom half has through-hole
      const rOut = L / 2;
      const rCounter = L * 0.38; // Counterbore diameter
      const rBore = L * 0.22;    // Through hole diameter

      // Generate using lathe profile for exact mechanical counterbore
      const points: THREE.Vector2[] = [];
      const halfH = H / 2;
      const cbDepth = H * 0.45; // Counterbore depth

      // Outer cylinder profile (from bottom to top)
      points.push(new THREE.Vector2(rBore, -halfH));         // bottom inner hole
      points.push(new THREE.Vector2(rOut, -halfH));          // bottom outer edge
      points.push(new THREE.Vector2(rOut, halfH));           // top outer edge
      points.push(new THREE.Vector2(rCounter, halfH));       // top counterbore lip
      points.push(new THREE.Vector2(rCounter, halfH - cbDepth)); // counterbore seat corner
      points.push(new THREE.Vector2(rBore, halfH - cbDepth));    // counterbore step
      points.push(new THREE.Vector2(rBore, -halfH));         // inner bore floor

      const geom = new THREE.LatheGeometry(points, 48);
      const scaleZ = W / L;
      geom.scale(1, 1, scaleZ);
      return geom;
    }

    case 'v-block': {
      // Precision Workshop V-Block with 90° groove and bottom relief channel
      const halfW = W / 2;
      const halfH = H / 2;
      const vDepth = H * 0.42;
      const vHalfW = W * 0.35;
      const reliefRadius = W * 0.06;

      const shape = new THREE.Shape();
      shape.moveTo(-halfW, -halfH);
      shape.lineTo(halfW, -halfH);
      // Right clamp slot
      shape.lineTo(halfW, halfH);
      shape.lineTo(vHalfW, halfH);
      // V-Groove slope to central relief
      shape.lineTo(reliefRadius, halfH - vDepth + reliefRadius);
      shape.lineTo(0, halfH - vDepth);
      shape.lineTo(-reliefRadius, halfH - vDepth + reliefRadius);
      shape.lineTo(-vHalfW, halfH);
      shape.lineTo(-halfW, halfH);
      shape.closePath();

      const extrudeSettings = {
        steps: 1,
        depth: L,
        bevelEnabled: true,
        bevelThickness: 0.8,
        bevelSize: 0.8,
        bevelOffset: -0.8,
        bevelSegments: 3,
      };

      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geom.center();
      geom.rotateY(Math.PI / 2);
      return geom;
    }

    case 'tri-prism': {
      // Equilateral Triangular Prism with edge bevels
      const halfW = W / 2;
      const halfH = H / 2;

      const shape = new THREE.Shape();
      shape.moveTo(-halfW, -halfH);
      shape.lineTo(halfW, -halfH);
      shape.lineTo(0, halfH);
      shape.closePath();

      const extrudeSettings = {
        steps: 1,
        depth: L,
        bevelEnabled: true,
        bevelThickness: 0.8,
        bevelSize: 0.8,
        bevelOffset: -0.8,
        bevelSegments: 3,
      };

      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geom.center();
      geom.rotateY(Math.PI / 2);
      return geom;
    }

    case 'slotted-cylinder-bracket': {
      const ratioL = L / 140;
      const ratioW = W / 50;
      const ratioH = H / 50;
      return buildCompositePartGeometry({
        baseLength: L,
        baseWidth: W,
        baseThickness: Math.max(6, Math.round(10 * ratioH)),
        hasEndSlots: true,
        slotDepth: Math.max(10, Math.round(30 * ratioL)),
        slotWidth: Math.max(8, Math.round(20 * ratioW)),
        bossShape: 'cylinder',
        bossDiameter: Math.max(20, Math.round(64 * Math.min(ratioL, ratioW))),
        bossDepth: Math.max(20, Math.round(64 * Math.min(ratioL, ratioW))),
        totalHeight: H,
        hasHole: true,
        holeDiameter: Math.max(12, Math.round(40 * Math.min(ratioL, ratioW))),
        holeDepth: Math.max(8, Math.round(24 * ratioH)),
      });
    }

    case 'stepped-t-block': {
      const ratioL = L / 40;
      const ratioW = W / 50;
      const ratioH = H / 30;
      const halfL = 20 * ratioL;
      const halfW = 25 * ratioW;
      const halfH = 15 * ratioH;
      const tBase = 10 * ratioH;
      const hWall = 20 * ratioH;
      const tongueHalfW = 10 * ratioL;
      const stepZ = -halfW + 30 * ratioW;
      const wallFrontZ = -halfW + 20 * ratioW;
      const grooveR = 10 * Math.min(ratioL, ratioW);

      // 1. Lower T-shaped Base (Extruded vertically along Y)
      const baseShape = new THREE.Shape();
      baseShape.moveTo(-halfL, -halfW);
      baseShape.lineTo(halfL, -halfW);
      baseShape.lineTo(halfL, stepZ);
      baseShape.lineTo(tongueHalfW, stepZ);
      baseShape.lineTo(tongueHalfW, halfW);
      baseShape.lineTo(-tongueHalfW, halfW);
      baseShape.lineTo(-tongueHalfW, stepZ);
      baseShape.lineTo(-halfL, stepZ);
      baseShape.closePath();

      const baseGeom = new THREE.ExtrudeGeometry(baseShape, {
        steps: 1,
        depth: tBase,
        bevelEnabled: false,
      });
      baseGeom.rotateX(Math.PI / 2);
      baseGeom.translate(0, -halfH + tBase, 0);

      // 2. Upper Rear Wall with R10 Semi-Cylindrical Cutout
      const wallShape = new THREE.Shape();
      wallShape.moveTo(-halfL, -halfW);
      wallShape.lineTo(halfL, -halfW);
      wallShape.lineTo(halfL, wallFrontZ);
      wallShape.lineTo(grooveR, wallFrontZ);
      wallShape.absarc(0, wallFrontZ, grooveR, 0, Math.PI, true);
      wallShape.lineTo(-halfL, wallFrontZ);
      wallShape.closePath();

      const wallGeom = new THREE.ExtrudeGeometry(wallShape, {
        steps: 1,
        depth: hWall,
        bevelEnabled: false,
      });
      wallGeom.rotateX(Math.PI / 2);
      wallGeom.translate(0, halfH, 0);

      return mergeNonIndexedGeometries([baseGeom, wallGeom]);
    }

    case 'custom-composite': {
      return buildCompositePartGeometry(compositeSpec || DEFAULT_SLOTTED_CYLINDER_SPEC);
    }

    case 'universal-cad': {
      if (universalBlueprint) {
        return buildUniversalBlueprintGeometry(universalBlueprint);
      }
      return new THREE.BoxGeometry(L, H, W);
    }

    default:
      return new THREE.BoxGeometry(L, H, W);
  }
}

export const SOLID_PRESETS: {
  id: SolidType;
  name: string;
  category: string;
  description: string;
  defaultDimensions: SolidDimensions;
  iconName: string;
}[] = [
  {
    id: 'l-block',
    name: 'Stepped L-Block (Machined)',
    category: 'Prismatic Solids',
    description: 'Precision milled L-bracket with corner chamfers. Illustrates visible steps and profile alignment.',
    defaultDimensions: { length: 60, width: 40, height: 50 },
    iconName: 'CornerDownRight',
  },
  {
    id: 'u-block',
    name: 'Slotted U-Channel Block',
    category: 'Prismatic Solids',
    description: 'Milled U-channel with longitudinal slot. Features crucial interior hidden lines in front and side views.',
    defaultDimensions: { length: 60, width: 50, height: 45 },
    iconName: 'SplitSquareVertical',
  },
  {
    id: 'hex-prism',
    name: 'Hexagonal Prism (ISO Standard)',
    category: 'Polyhedra',
    description: 'Regular 6-sided prism. Demonstrates corner generators, face visibility, and symmetry axes.',
    defaultDimensions: { length: 50, width: 50, height: 60 },
    iconName: 'Hexagon',
  },
  {
    id: 'square-pyramid',
    name: 'Square Pyramid',
    category: 'Pyramids',
    description: 'Square base with sloping triangular faces meeting at the vertex. Shows diagonal ridge lines in plan.',
    defaultDimensions: { length: 50, width: 50, height: 65 },
    iconName: 'Pyramid',
  },
  {
    id: 'cone-frustum',
    name: 'Frustum of a Cone (ISO Symbol)',
    category: 'Conics',
    description: 'Truncated cone standard. This exact solid defines the official ISO First-Angle Projection symbol!',
    defaultDimensions: { length: 60, width: 60, height: 50 },
    iconName: 'Cone',
  },
  {
    id: 'counterbore',
    name: 'Counterbore Bushing (Dual Step)',
    category: 'Turned Parts',
    description: 'Turned cylindrical component with stepped counterbore. Tests multi-tier hidden lines and concentric circles.',
    defaultDimensions: { length: 55, width: 55, height: 60 },
    iconName: 'CircleDot',
  },
  {
    id: 'cylinder-hole',
    name: 'Hollow Cylinder (Bushing)',
    category: 'Hollow Solids',
    description: 'Solid cylinder with axial through-bore. Essential for practicing interior hidden lines and centerlines.',
    defaultDimensions: { length: 50, width: 50, height: 55 },
    iconName: 'CircleDot',
  },
  {
    id: 'v-block',
    name: 'Machinist V-Block (90° Groove)',
    category: 'Mechanical Fixtures',
    description: 'Precision workshop locating fixture with 90° V-groove and central relief hole for clamping round bars.',
    defaultDimensions: { length: 60, width: 50, height: 45 },
    iconName: 'Spline',
  },
  {
    id: 'tri-prism',
    name: 'Triangular Prism',
    category: 'Polyhedra',
    description: 'Equilateral triangular cross-section extruded horizontally. Ideal for learning apex projection.',
    defaultDimensions: { length: 60, width: 45, height: 50 },
    iconName: 'Triangle',
  },
  {
    id: 'square-prism',
    name: 'Square Prism (Q5 Base)',
    category: 'Prismatic Solids',
    description: 'Regular square-base prism for vertical, inclined, and section-development problems.',
    defaultDimensions: { length: 30, width: 30, height: 70 },
    iconName: 'Box',
  },
  {
    id: 'hex-pyramid',
    name: 'Hexagonal Pyramid (Q3)',
    category: 'Pyramids',
    description: 'Regular 6-sided pyramid ideal for resting-on-corner and slant-edge inclination problems.',
    defaultDimensions: { length: 50, width: 50, height: 60 },
    iconName: 'Pyramid',
  },
  {
    id: 'pent-pyramid',
    name: 'Pentagonal Pyramid (Q8)',
    category: 'Pyramids',
    description: 'Regular 5-sided pyramid used in two-stage solid projections and perspective problems.',
    defaultDimensions: { length: 42, width: 42, height: 60 },
    iconName: 'Pyramid',
  },
  {
    id: 'cone',
    name: 'Right Circular Cone (Q4 & Q6)',
    category: 'Conics',
    description: 'Full circular cone for resting-on-generator projections and conic section problems.',
    defaultDimensions: { length: 40, width: 40, height: 60 },
    iconName: 'Cone',
  },
  {
    id: 'machined-bracket',
    name: 'Slotted Machined Bracket (Q9)',
    category: 'Exam Machine Parts',
    description: 'Complex slotted and stepped bracket designed for FV, TV, and Right-Hand Side View (RHSV).',
    defaultDimensions: { length: 100, width: 64, height: 75 },
    iconName: 'SplitSquareVertical',
  },
  {
    id: 'ribbed-block',
    name: 'Tapered Slotted Block (Q10)',
    category: 'Exam Machine Parts',
    description: 'Tapered symmetrical block with central slot for FV, TV, and Left-Hand Side View (LHSV).',
    defaultDimensions: { length: 86, width: 34, height: 56 },
    iconName: 'Spline',
  },
  {
    id: 'slotted-cylinder-bracket',
    name: 'Slotted Cylinder Bracket (Ø64 / Ø40×24)',
    category: 'Exam Machine Parts',
    description: '140×50 mm forked base plate (10 mm thick, 30 mm slots) with central Ø64×50 mm cylinder boss and Ø40×24 mm blind hole.',
    defaultDimensions: { length: 140, width: 50, height: 50 },
    iconName: 'CircleDot',
  },
  {
    id: 'stepped-t-block',
    name: 'Stepped T-Block (R10 Groove • 40×50×30)',
    category: 'Exam Machine Parts',
    description: '40×50×30 mm T-shaped stepped block with 20 mm tongue and R10 semi-cylindrical vertical groove on the rear wall.',
    defaultDimensions: { length: 40, width: 50, height: 30 },
    iconName: 'Spline',
  },
];
