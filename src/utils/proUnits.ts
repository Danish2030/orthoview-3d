import { UnitSystem } from '../types/pro';

/**
 * Format linear dimensions in mm to either metric (m / mm) or imperial (ft-in).
 * Example: 4500 mm -> "4.50 m" (metric) or "14'-9\"" (imperial)
 */
export function formatLength(mm: number, unit: UnitSystem): string {
  if (unit === 'imperial') {
    const totalInches = mm / 25.4;
    let feet = Math.floor(totalInches / 12);
    let inches = Math.round(totalInches % 12);
    if (inches === 12) {
      feet += 1;
      inches = 0;
    }
    return `${feet}'-${inches}"`;
  }

  // Metric
  if (Math.abs(mm) >= 1000) {
    return `${(mm / 1000).toFixed(2)} m`;
  }
  return `${Math.round(mm)} mm`;
}

/**
 * Format floor or wall surface area in m² or sq.ft
 */
export function formatArea(sqM: number, unit: UnitSystem): string {
  if (unit === 'imperial') {
    const sqFt = sqM * 10.7639;
    return `${sqFt.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} sq.ft`;
  }
  return `${sqM.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m²`;
}

/**
 * Format site/plot area into standard civil units including traditional Cents (1 cent = 40.4686 m²).
 */
export function formatPlotArea(sqM: number, unit: UnitSystem): {
  primary: string;
  secondary: string;
  cents: string;
} {
  const sqFt = sqM * 10.7639;
  const centsVal = sqM / 40.4686;

  const cents = `${centsVal.toFixed(2)} Cents`;

  if (unit === 'imperial') {
    return {
      primary: `${sqFt.toLocaleString('en-US', { maximumFractionDigits: 0 })} sq.ft`,
      secondary: `${sqM.toFixed(1)} m²`,
      cents,
    };
  }

  return {
    primary: `${sqM.toLocaleString('en-US', { maximumFractionDigits: 1 })} m²`,
    secondary: `${sqFt.toLocaleString('en-US', { maximumFractionDigits: 0 })} sq.ft`,
    cents,
  };
}

/**
 * Convert mm to numeric representation in the current unit system (meters or feet)
 */
export function toNumericUnit(mm: number, unit: UnitSystem): number {
  return unit === 'imperial' ? mm / 304.8 : mm / 1000;
}

/**
 * Unit symbol label for display
 */
export function getUnitLabel(unit: UnitSystem): string {
  return unit === 'imperial' ? 'ft' : 'm';
}
