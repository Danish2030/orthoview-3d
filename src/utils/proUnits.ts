import { UnitSystem } from '../types/pro';

/**
 * Format linear dimensions in mm to either metric (m / mm) or imperial (ft-in).
 * Handles negative values and guards against NaN/Infinity.
 */
export function formatLength(mm: number, unit: UnitSystem): string {
  const safeMm = Number.isFinite(mm) ? mm : 0;
  const sign = safeMm < 0 ? '-' : '';
  const absMm = Math.abs(safeMm);

  if (unit === 'imperial') {
    const totalInches = absMm / 25.4;
    let feet = Math.floor(totalInches / 12);
    let inches = Math.round(totalInches % 12);
    if (inches === 12) {
      feet += 1;
      inches = 0;
    }
    return `${sign}${feet}'-${inches}"`;
  }

  if (absMm >= 1000) {
    return `${sign}${(absMm / 1000).toFixed(2)} m`;
  }
  return `${sign}${Math.round(absMm)} mm`;
}

/**
 * Format floor or wall surface area in m² or sq.ft
 */
export function formatArea(sqM: number, unit: UnitSystem): string {
  const safeSqM = Number.isFinite(sqM) ? Math.max(0, sqM) : 0;
  if (unit === 'imperial') {
    const sqFt = safeSqM * 10.7639104;
    return `${sqFt.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} sq.ft`;
  }
  return `${safeSqM.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m²`;
}

/**
 * Format site/plot area into standard civil units including traditional Cents (1 cent = 40.468564 m²).
 */
export function formatPlotArea(sqM: number, unit: UnitSystem): {
  primary: string;
  secondary: string;
  cents: string;
} {
  const safeSqM = Number.isFinite(sqM) ? Math.max(0, sqM) : 0;
  const sqFt = safeSqM * 10.7639104;
  const centsVal = safeSqM / 40.468564;

  const cents = `${centsVal.toFixed(2)} Cents`;

  if (unit === 'imperial') {
    return {
      primary: `${sqFt.toLocaleString('en-US', { maximumFractionDigits: 0 })} sq.ft`,
      secondary: `${safeSqM.toFixed(1)} m²`,
      cents,
    };
  }

  return {
    primary: `${safeSqM.toLocaleString('en-US', { maximumFractionDigits: 1 })} m²`,
    secondary: `${sqFt.toLocaleString('en-US', { maximumFractionDigits: 0 })} sq.ft`,
    cents,
  };
}

/**
 * Convert mm to numeric representation in the current unit system (meters or feet)
 */
export function toNumericUnit(mm: number, unit: UnitSystem): number {
  const safeMm = Number.isFinite(mm) ? mm : 0;
  return unit === 'imperial' ? safeMm / 304.8 : safeMm / 1000;
}

/**
 * Unit symbol label for display
 */
export function getUnitLabel(unit: UnitSystem): string {
  return unit === 'imperial' ? 'ft' : 'm';
}
