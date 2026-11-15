/**
 * Formatting utilities for numbers, units, and status badges
 */

/**
 * Format a numeric value with specified decimals and optional unit
 * @param {number|null|undefined} value 
 * @param {number} decimals 
 * @param {string} [unit]
 * @returns {string}
 */
export function formatValue(value, decimals = 2, unit = '') {
  if (value === null || value === undefined || isNaN(value)) {
    return 'N/A';
  }
  const formatted = Number(value).toFixed(decimals);
  return unit ? `${formatted} ${unit}` : formatted;
}

/**
 * Format a difference/delta with an explicit positive/negative sign
 * @param {number|null|undefined} diff 
 * @param {number} decimals 
 * @param {string} [unit]
 * @returns {string}
 */
export function formatDiff(diff, decimals = 2, unit = '') {
  if (diff === null || diff === undefined || isNaN(diff)) {
    return 'N/A';
  }
  const sign = diff > 0 ? '+' : diff < 0 ? '−' : '±';
  const absValue = Math.abs(diff).toFixed(decimals);
  const formatted = `${sign}${absValue}`;
  return unit ? `${formatted} ${unit}` : formatted;
}

/**
 * Format a percentage change with sign and percent symbol
 * @param {number|null|undefined} percent 
 * @param {number} decimals 
 * @returns {string}
 */
export function formatPercent(percent, decimals = 1) {
  if (percent === null || percent === undefined || isNaN(percent)) {
    return 'N/A';
  }
  const sign = percent > 0 ? '+' : percent < 0 ? '−' : '';
  const absValue = Math.abs(percent).toFixed(decimals);
  return `${sign}${absValue}%`;
}

/**
 * Capitalize first letter
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
