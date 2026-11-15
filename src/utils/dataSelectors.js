/**
 * Data selector and query functions for ClimateScope dataset
 */

import climateData from '../data/climateData.json' with { type: 'json' };
import { METRIC_CONFIG, METRIC_LIST } from '../data/metricConfig.js';
import { calculateComparison } from './calculations.js';

/**
 * Get all year observation records
 */
export function getAllObservations() {
  return climateData.observations || [];
}

/**
 * Get dataset metadata
 */
export function getDatasetMetadata() {
  return climateData.metadata || {
    coverageStartYear: 2016,
    coverageEndYear: 2025,
    lastUpdated: 'November 2025',
    isDemoData: false
  };
}

/**
 * Get sorted list of all available years
 * @returns {number[]} e.g. [2016, 2017, ..., 2025]
 */
export function getAvailableYears() {
  return getAllObservations()
    .map(d => d.year)
    .sort((a, b) => a - b);
}

/**
 * Get observation record for a specific year
 * @param {number} year 
 * @returns {object|null}
 */
export function getObservationByYear(year) {
  const numericYear = Number(year);
  return getAllObservations().find(d => d.year === numericYear) || null;
}

/**
 * Get time series data for a specific metric formatted for Recharts
 * @param {string} metricId 
 * @param {number} [primaryYear]
 * @param {number} [comparisonYear]
 * @returns {Array<object>}
 */
export function getMetricTimeSeries(metricId, primaryYear, comparisonYear) {
  const observations = getAllObservations();

  return observations.map(record => {
    const metricData = record.metrics[metricId] || { value: null, status: 'missing' };
    const isPrimary = Number(record.year) === Number(primaryYear);
    const isComparison = Number(record.year) === Number(comparisonYear);

    return {
      year: record.year,
      value: metricData.value,
      status: metricData.status,
      note: metricData.note || '',
      isPrimary,
      isComparison,
      highlightType: isPrimary ? 'primary' : isComparison ? 'comparison' : 'standard'
    };
  });
}

/**
 * Get 10-year sparkline series for a metric
 * @param {string} metricId 
 * @returns {Array<object>}
 */
export function getSparklineData(metricId) {
  return getAllObservations().map(record => ({
    year: record.year,
    value: record.metrics[metricId]?.value ?? null
  }));
}

/**
 * Get complete comparison dataset for table and overview cards
 * @param {number} primaryYear 
 * @param {number} comparisonYear 
 * @returns {Array<object>}
 */
export function getComparisonData(primaryYear, comparisonYear) {
  const primaryRecord = getObservationByYear(primaryYear);
  const comparisonRecord = getObservationByYear(comparisonYear);

  return METRIC_LIST.map(config => {
    const pMetric = primaryRecord?.metrics[config.id] || { value: null, status: 'missing' };
    const cMetric = comparisonRecord?.metrics[config.id] || { value: null, status: 'missing' };

    const comp = calculateComparison(pMetric, cMetric, config);

    return {
      metricId: config.id,
      config,
      primaryYear,
      comparisonYear,
      ...comp
    };
  });
}
