import * as THREE from 'three';
import { SolidRotation } from '../types';

export interface BoundingBox2D {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  width: number;
  height: number;
}

export interface ProjectedBounds {
  front: BoundingBox2D;
  top: BoundingBox2D;
  leftSide: BoundingBox2D;
}

/**
 * Computes the exact 2D screen bounding boxes of the rotated solid for:
 * 1. Front View (Elevation on VP)
 * 2. Top View (Plan on HP)
 * 3. Left-Hand Side View (Profile on RPP)
 */
export function calculateProjectedBounds(
  geometry: THREE.BufferGeometry,
  rotation: SolidRotation
): ProjectedBounds {
  // Convert degrees to radians
  const euler = new THREE.Euler(
    THREE.MathUtils.degToRad(rotation.x),
    THREE.MathUtils.degToRad(rotation.y),
    THREE.MathUtils.degToRad(rotation.z),
    'XYZ'
  );

  const rotMatrix = new THREE.Matrix4().makeRotationFromEuler(euler);

  const posAttr = geometry.getAttribute('position');
  if (!posAttr) {
    const empty: BoundingBox2D = { minX: -25, maxX: 25, minY: -25, maxY: 25, width: 50, height: 50 };
    return { front: empty, top: empty, leftSide: empty };
  }

  const v = new THREE.Vector3();

  // Front View: X -> screenX, Y -> screenY
  let fMinX = Infinity, fMaxX = -Infinity;
  let fMinY = Infinity, fMaxY = -Infinity;

  // Top View: X -> screenX, -Z -> screenY (or Z down)
  let tMinX = Infinity, tMaxX = -Infinity;
  let tMinY = Infinity, tMaxY = -Infinity;

  // LHSV: Z -> screenX (front Z on left), Y -> screenY
  let sMinX = Infinity, sMaxX = -Infinity;
  let sMinY = Infinity, sMaxY = -Infinity;

  for (let i = 0; i < posAttr.count; i++) {
    v.fromBufferAttribute(posAttr, i);
    v.applyMatrix4(rotMatrix);

    // Front View
    if (v.x < fMinX) fMinX = v.x;
    if (v.x > fMaxX) fMaxX = v.x;
    if (v.y < fMinY) fMinY = v.y;
    if (v.y > fMaxY) fMaxY = v.y;

    // Top View (X is horizontal, -Z is vertical upwards towards XY)
    if (v.x < tMinX) tMinX = v.x;
    if (v.x > tMaxX) tMaxX = v.x;
    // In Top View, world +Z is front (down), world -Z is back (up)
    // We map screenY = -v.z so back is at top (+screenY) and front is at bottom (-screenY)
    const topY = -v.z;
    if (topY < tMinY) tMinY = topY;
    if (topY > tMaxY) tMaxY = topY;

    // LHSV (looking from -X towards +X: world +Z is on observer's left)
    // screenX = v.z (so +Z is left when camera is set up accordingly)
    const sideX = v.z;
    if (sideX < sMinX) sMinX = sideX;
    if (sideX > sMaxX) sMaxX = sideX;
    if (v.y < sMinY) sMinY = v.y;
    if (v.y > sMaxY) sMaxY = v.y;
  }

  return {
    front: {
      minX: fMinX,
      maxX: fMaxX,
      minY: fMinY,
      maxY: fMaxY,
      width: Math.max(1, fMaxX - fMinX),
      height: Math.max(1, fMaxY - fMinY),
    },
    top: {
      minX: tMinX,
      maxX: tMaxX,
      minY: tMinY,
      maxY: tMaxY,
      width: Math.max(1, tMaxX - tMinX),
      height: Math.max(1, tMaxY - tMinY),
    },
    leftSide: {
      minX: sMinX,
      maxX: sMaxX,
      minY: sMinY,
      maxY: sMaxY,
      width: Math.max(1, sMaxX - sMinX),
      height: Math.max(1, sMaxY - sMinY),
    },
  };
}

/**
 * Common engineering angles for quick alignment
 */
export const SNAP_ANGLES = [0, 30, 45, 60, 90, 180];
