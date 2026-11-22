import { SolidDimensions, ThemeMode } from '../types';

interface ExportParams {
  canvases: {
    front: HTMLCanvasElement | null;
    top: HTMLCanvasElement | null;
    leftSide: HTMLCanvasElement | null;
  };
  solidName: string;
  dimensions: SolidDimensions;
  theme: ThemeMode;
  showMiterLine: boolean;
  showProjectors: boolean;
}

export async function exportSheetAsPNG({
  canvases,
  solidName,
  dimensions,
  theme,
  showMiterLine,
  showProjectors,
}: ExportParams): Promise<void> {
  const isDark = theme === 'blueprint';

  // Target high-res canvas size (1920x1080)
  const W = 1920;
  const H = 1080;

  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = W;
  exportCanvas.height = H;
  const ctx = exportCanvas.getContext('2d');
  if (!ctx) return;

  // 1. Background Fill
  ctx.fillStyle = isDark ? '#0c1222' : '#f8fafc';
  ctx.fillRect(0, 0, W, H);

  // 2. Outer Drawing Sheet Border (CAD Standard Margin)
  const margin = 30;
  ctx.strokeStyle = isDark ? '#38bdf8' : '#334155';
  ctx.lineWidth = 4;
  ctx.strokeRect(margin, margin, W - 2 * margin, H - 2 * margin);

  // Inner margin border
  ctx.lineWidth = 1;
  ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(100, 116, 139, 0.4)';
  ctx.strokeRect(margin + 8, margin + 8, W - 2 * (margin + 8), H - 2 * (margin + 8));

  // 3. Top Banner
  ctx.fillStyle = isDark ? '#10172a' : '#e2e8f0';
  ctx.fillRect(margin + 9, margin + 9, W - 2 * (margin + 9), 50);

  ctx.fillStyle = isDark ? '#38bdf8' : '#0f172a';
  ctx.font = 'bold 20px "JetBrains Mono", monospace';
  ctx.fillText('ORTHOVIEW 3D — FIRST-ANGLE ORTHOGRAPHIC PROJECTION SHEET', margin + 30, margin + 42);

  ctx.fillStyle = isDark ? '#94a3b8' : '#475569';
  ctx.font = '14px "JetBrains Mono", monospace';
  ctx.fillText('ISO 128 / BIS SP:46 (FIRST QUADRANT)', W - margin - 350, margin + 42);

  // 4. Quadrant geometry coordinates
  const qLeft = margin + 9;
  const qTop = margin + 59;
  const qWidth = (W - 2 * (margin + 9)) / 2;
  const qHeight = (H - margin - 59 - margin - 9) / 2;

  // Center reference lines intersection
  const cx = qLeft + qWidth;
  const cy = qTop + qHeight;

  // Render 3 WebGL Views from their respective canvases
  // Quadrant 1: Front View (Top-Left)
  if (canvases.front) {
    ctx.drawImage(canvases.front, qLeft + 10, qTop + 10, qWidth - 20, qHeight - 20);
  }

  // Quadrant 2: Left Side View (Top-Right)
  if (canvases.leftSide) {
    ctx.drawImage(canvases.leftSide, cx + 10, qTop + 10, qWidth - 20, qHeight - 20);
  }

  // Quadrant 3: Top View (Bottom-Left)
  if (canvases.top) {
    ctx.drawImage(canvases.top, qLeft + 10, cy + 10, qWidth - 20, qHeight - 20);
  }

  // Faint Projector Rays
  if (showProjectors) {
    ctx.save();
    ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(37, 99, 235, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);

    // Vertical projectors (FV to TV)
    ctx.beginPath();
    ctx.moveTo(qLeft + qWidth * 0.3, qTop + 30);
    ctx.lineTo(qLeft + qWidth * 0.3, cy + qHeight - 30);
    ctx.moveTo(qLeft + qWidth * 0.7, qTop + 30);
    ctx.lineTo(qLeft + qWidth * 0.7, cy + qHeight - 30);
    ctx.stroke();

    // Horizontal projectors (FV to LHSV)
    ctx.beginPath();
    ctx.moveTo(qLeft + 40, qTop + qHeight * 0.3);
    ctx.lineTo(cx + qWidth - 40, qTop + qHeight * 0.3);
    ctx.moveTo(qLeft + 40, qTop + qHeight * 0.7);
    ctx.lineTo(cx + qWidth - 40, qTop + qHeight * 0.7);
    ctx.stroke();

    ctx.restore();
  }

  // 45° Miter line in Quadrant 4 (Bottom-Right)
  if (showMiterLine) {
    ctx.save();
    ctx.strokeStyle = isDark ? '#38bdf8' : '#2563eb';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);

    ctx.beginPath();
    ctx.moveTo(cx + 20, cy + 20);
    ctx.lineTo(cx + qWidth * 0.65, cy + qHeight * 0.65);
    ctx.stroke();

    ctx.fillStyle = isDark ? '#38bdf8' : '#2563eb';
    ctx.font = 'bold 13px "JetBrains Mono", monospace';
    ctx.fillText('45° MITER LINE', cx + qWidth * 0.28, cy + qHeight * 0.35);

    ctx.restore();
  }

  // Reference Lines: Horizontal X — Y
  ctx.save();
  ctx.strokeStyle = isDark ? '#38bdf8' : '#1e293b';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(qLeft, cy);
  ctx.lineTo(qLeft + 2 * qWidth, cy);
  ctx.stroke();

  // X and Y text badges
  ctx.fillStyle = isDark ? '#38bdf8' : '#0f172a';
  ctx.font = 'bold 18px "JetBrains Mono", monospace';
  ctx.fillText('X', qLeft + 15, cy - 10);
  ctx.fillText('Y', qLeft + 2 * qWidth - 30, cy - 10);

  // Reference Lines: Vertical X1 — Y1
  ctx.strokeStyle = isDark ? '#fbbf24' : '#1e293b';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx, qTop);
  ctx.lineTo(cx, qTop + 2 * qHeight);
  ctx.stroke();

  // X1 and Y1 labels
  ctx.fillStyle = isDark ? '#fbbf24' : '#0f172a';
  ctx.fillText('X₁', cx - 35, qTop + 30);
  ctx.fillText('Y₁', cx - 35, qTop + 2 * qHeight - 20);

  // Center Origin O
  ctx.beginPath();
  ctx.arc(cx, cy, 14, 0, Math.PI * 2);
  ctx.fillStyle = isDark ? '#0f172a' : '#ffffff';
  ctx.fill();
  ctx.strokeStyle = isDark ? '#38bdf8' : '#1e293b';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = isDark ? '#38bdf8' : '#0f172a';
  ctx.font = 'bold 14px "JetBrains Mono", monospace';
  ctx.fillText('O', cx - 6, cy + 5);
  ctx.restore();

  // Quadrant Labels
  ctx.fillStyle = isDark ? '#94a3b8' : '#475569';
  ctx.font = 'bold 15px "JetBrains Mono", monospace';
  ctx.fillText('FRONT VIEW (FV / ELEVATION) [V.P.]', qLeft + 25, qTop + 35);
  ctx.fillText('LEFT-HAND SIDE VIEW (LHSV) [R.P.P.]', cx + 25, qTop + 35);
  ctx.fillText('TOP VIEW (TV / PLAN) [H.P.]', qLeft + 25, cy + 35);

  // 5. Title Block in Bottom-Right
  const tbWidth = 560;
  const tbHeight = 150;
  const tbX = W - margin - 9 - tbWidth - 10;
  const tbY = H - margin - 9 - tbHeight - 10;

  ctx.save();
  ctx.fillStyle = isDark ? '#101728' : '#ffffff';
  ctx.fillRect(tbX, tbY, tbWidth, tbHeight);

  ctx.strokeStyle = isDark ? '#38bdf8' : '#334155';
  ctx.lineWidth = 2;
  ctx.strokeRect(tbX, tbY, tbWidth, tbHeight);

  // Dividing line
  ctx.beginPath();
  ctx.moveTo(tbX + 340, tbY);
  ctx.lineTo(tbX + 340, tbY + tbHeight);
  ctx.stroke();

  // Left Title Block text
  ctx.fillStyle = isDark ? '#38bdf8' : '#0f172a';
  ctx.font = 'bold 15px "JetBrains Mono", monospace';
  ctx.fillText('ORTHOVIEW 3D • DRAWING SHEET', tbX + 15, tbY + 28);

  ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
  ctx.font = 'bold 14px "JetBrains Mono", monospace';
  ctx.fillText(`SUBJECT: ${solidName.toUpperCase()}`, tbX + 15, tbY + 54);

  ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.fillText('B.Tech Engineering Graphics & CAD Lab', tbX + 15, tbY + 76);
  ctx.fillText(`Dimensions: ${dimensions.length} × ${dimensions.width} × ${dimensions.height} mm`, tbX + 15, tbY + 102);
  ctx.fillText('Scale: 1:1  •  Standard: ISO 128 / BIS SP:46', tbX + 15, tbY + 126);

  // Right Title Block: First Angle Projection Symbol
  ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('PROJECTION METHOD', tbX + 360, tbY + 24);

  // Draw Frustum Symbol
  const symX = tbX + 360;
  const symY = tbY + 40;

  ctx.strokeStyle = isDark ? '#64748b' : '#94a3b8';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 2, 1, 2]);
  // Centerline
  ctx.beginPath();
  ctx.moveTo(symX, symY + 30);
  ctx.lineTo(symX + 170, symY + 30);
  ctx.moveTo(symX + 130, symY);
  ctx.lineTo(symX + 130, symY + 60);
  ctx.stroke();
  ctx.setLineDash([]);

  // Frustum Trapezoid
  ctx.strokeStyle = isDark ? '#38bdf8' : '#0f172a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(symX + 15, symY + 20);
  ctx.lineTo(symX + 60, symY + 10);
  ctx.lineTo(symX + 60, symY + 50);
  ctx.lineTo(symX + 15, symY + 40);
  ctx.closePath();
  ctx.stroke();

  // Concentric Circles
  ctx.beginPath();
  ctx.arc(symX + 130, symY + 30, 20, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(symX + 130, symY + 30, 10, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = isDark ? '#fbbf24' : '#b45309';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('FIRST ANGLE PROJECTION', tbX + 365, tbY + 130);

  ctx.restore();

  // Trigger download
  const dataUrl = exportCanvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = `OrthoView3D_FirstAngle_${solidName.replace(/\s+/g, '_')}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
