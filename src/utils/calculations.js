/**
 * Scientific calculation utilities for climate metrics comparison and insights generation.
 */

/**
 * Calculate difference and percentage change between primary and comparison year
 * @param {object} primaryMetricData - { value: number|null, status: string }
 * @param {object} comparisonMetricData - { value: number|null, status: string }
 * @param {object} config - Metric config entry
 * @returns {object} Calculated comparison object
 */
export function calculateComparison(primaryMetricData, comparisonMetricData, config) {
  const pVal = primaryMetricData?.value;
  const cVal = comparisonMetricData?.value;

  if (pVal === null || pVal === undefined || cVal === null || cVal === undefined) {
    return {
      primaryValue: pVal,
      comparisonValue: cVal,
      diff: null,
      percentChange: null,
      direction: 'unknown',
      impact: 'neutral',
      isScientificallyValidPercent: false,
      status: primaryMetricData?.status || comparisonMetricData?.status || 'missing'
    };
  }

  // Absolute difference: Primary Year - Comparison Year
  const diff = pVal - cVal;

  // Percentage change is only valid for physical ratio scales where baseline isn't arbitrary
  let percentChange = null;
  const isScientificallyValidPercent = Boolean(config.allowPercentage);

  if (isScientificallyValidPercent && cVal !== 0) {
    percentChange = ((pVal - cVal) / Math.abs(cVal)) * 100;
  }

  // Determine direction
  const direction = Math.abs(diff) < 0.0001 ? 'flat' : diff > 0 ? 'up' : 'down';

  // Determine environmental impact
  // Invert polarity for Arctic Sea Ice where a decrease is adverse
  let impact = 'neutral';
  if (direction !== 'flat') {
    if (config.invertTrendPolarity) {
      impact = direction === 'down' ? 'adverse' : 'favorable';
    } else {
      impact = direction === 'up' ? 'adverse' : 'favorable';
    }
  }

  return {
    primaryValue: pVal,
    comparisonValue: cVal,
    diff,
    percentChange,
    direction,
    impact,
    isScientificallyValidPercent,
    primaryStatus: primaryMetricData?.status,
    comparisonStatus: comparisonMetricData?.status
  };
}

/**
 * Generate dynamic data-driven insights between two years
 * @param {number} primaryYear 
 * @param {number} comparisonYear 
 * @param {object} primaryMetrics 
 * @param {object} comparisonMetrics 
 * @param {object} metricConfigs 
 * @returns {Array<object>} list of generated insight objects
 */
export function generateClimateInsights(
  primaryYear,
  comparisonYear,
  primaryMetrics,
  comparisonMetrics,
  metricConfigs
) {
  if (!primaryMetrics || !comparisonMetrics) return [];

  const insights = [];

  // 1. Temperature Anomaly
  if (primaryMetrics.temperatureAnomaly?.value !== null && comparisonMetrics.temperatureAnomaly?.value !== null) {
    const diff = primaryMetrics.temperatureAnomaly.value - comparisonMetrics.temperatureAnomaly.value;
    const absDiff = Math.abs(diff).toFixed(2);
    const directionWord = diff > 0 ? 'higher' : diff < 0 ? 'lower' : 'equal';
    const actionWord = diff > 0 ? 'increased by' : diff < 0 ? 'decreased by' : 'remained steady at';

    insights.push({
      id: 'temp-insight',
      metricId: 'temperatureAnomaly',
      title: 'Global Surface Temperature',
      text: diff === 0
        ? `In ${primaryYear}, the global temperature anomaly was identical to ${comparisonYear} at +${primaryMetrics.temperatureAnomaly.value.toFixed(2)}°C relative to the 1951–1980 baseline.`
        : `Global temperature anomaly was ${absDiff}°C ${directionWord} in ${primaryYear} compared to ${comparisonYear} (${actionWord} ${absDiff}°C relative to the 1951–1980 reference period).`,
      diffFormatted: `${diff > 0 ? '+' : diff < 0 ? '−' : ''}${absDiff}°C`,
      impact: diff > 0 ? 'adverse' : diff < 0 ? 'favorable' : 'neutral',
      category: 'Thermal'
    });
  }

  // 2. Atmospheric CO2
  if (primaryMetrics.atmosphericCO2?.value !== null && comparisonMetrics.atmosphericCO2?.value !== null) {
    const p = primaryMetrics.atmosphericCO2.value;
    const c = comparisonMetrics.atmosphericCO2.value;
    const diff = p - c;
    const absDiff = Math.abs(diff).toFixed(2);
    const pct = (((p - c) / c) * 100).toFixed(1);
    const action = diff > 0 ? 'increased by' : diff < 0 ? 'decreased by' : 'remained unchanged at';

    insights.push({
      id: 'co2-insight',
      metricId: 'atmosphericCO2',
      title: 'Atmospheric CO₂ Concentration',
      text: `Globally averaged atmospheric CO₂ ${action} ${absDiff} ppm (${diff >= 0 ? '+' : '−'}${Math.abs(pct)}%) between ${comparisonYear} (${c.toFixed(2)} ppm) and ${primaryYear} (${p.toFixed(2)} ppm).`,
      diffFormatted: `${diff > 0 ? '+' : diff < 0 ? '−' : ''}${absDiff} ppm`,
      impact: diff > 0 ? 'adverse' : diff < 0 ? 'favorable' : 'neutral',
      category: 'Atmosphere'
    });
  }

  // 3. Arctic Sea Ice Extent
  if (primaryMetrics.arcticSeaIce?.value !== null && comparisonMetrics.arcticSeaIce?.value !== null) {
    const p = primaryMetrics.arcticSeaIce.value;
    const c = comparisonMetrics.arcticSeaIce.value;
    const diff = p - c;
    const absDiff = Math.abs(diff).toFixed(2);
    const pct = (((p - c) / c) * 100).toFixed(1);
    const action = diff < 0 ? 'contracted by' : diff > 0 ? 'expanded by' : 'remained identical at';

    insights.push({
      id: 'seaice-insight',
      metricId: 'arcticSeaIce',
      title: 'Arctic Sea Ice Minimum',
      text: `September Arctic sea ice monthly average ${action} ${absDiff} million km² (${diff >= 0 ? '+' : '−'}${Math.abs(pct)}%) from ${c.toFixed(2)} million km² in ${comparisonYear} to ${p.toFixed(2)} million km² in ${primaryYear}.`,
      diffFormatted: `${diff > 0 ? '+' : diff < 0 ? '−' : ''}${absDiff}M km²`,
      impact: diff < 0 ? 'adverse' : diff > 0 ? 'favorable' : 'neutral',
      category: 'Cryosphere'
    });
  }

  // 4. Global Mean Sea Level
  if (primaryMetrics.seaLevel?.value !== null && comparisonMetrics.seaLevel?.value !== null) {
    const p = primaryMetrics.seaLevel.value;
    const c = comparisonMetrics.seaLevel.value;
    const diff = p - c;
    const absDiff = Math.abs(diff).toFixed(1);
    const action = diff > 0 ? 'rose by' : diff < 0 ? 'dropped by' : 'remained level at';

    insights.push({
      id: 'sealevel-insight',
      metricId: 'seaLevel',
      title: 'Global Mean Sea Level',
      text: `Satellite altimetry indicates global mean sea level ${action} ${absDiff} mm between ${comparisonYear} (${c.toFixed(1)} mm) and ${primaryYear} (${p.toFixed(1)} mm) relative to the 1993 baseline.`,
      diffFormatted: `${diff > 0 ? '+' : diff < 0 ? '−' : ''}${absDiff} mm`,
      impact: diff > 0 ? 'adverse' : diff < 0 ? 'favorable' : 'neutral',
      category: 'Oceans'
    });
  }

  // 5. Ocean Heat Content
  if (primaryMetrics.oceanHeatContent?.value !== null && comparisonMetrics.oceanHeatContent?.value !== null) {
    const p = primaryMetrics.oceanHeatContent.value;
    const c = comparisonMetrics.oceanHeatContent.value;
    const diff = p - c;
    const absDiff = Math.abs(diff).toFixed(1);
    const action = diff > 0 ? 'accumulated an additional' : diff < 0 ? 'subsided by' : 'remained steady at';

    insights.push({
      id: 'ohc-insight',
      metricId: 'oceanHeatContent',
      title: 'Global Ocean Heat Content (0–2000m)',
      text: `The upper 2,000 meters of the global ocean ${action} ${absDiff} × 10²² Joules of thermal energy between ${comparisonYear} and ${primaryYear}, reflecting planetary energy imbalance.`,
      diffFormatted: `${diff > 0 ? '+' : diff < 0 ? '−' : ''}${absDiff} × 10²² J`,
      impact: diff > 0 ? 'adverse' : diff < 0 ? 'favorable' : 'neutral',
      category: 'Oceans'
    });
  }

  // 6. Global CO2 Emissions
  if (primaryMetrics.co2Emissions?.value !== null && comparisonMetrics.co2Emissions?.value !== null) {
    const p = primaryMetrics.co2Emissions.value;
    const c = comparisonMetrics.co2Emissions.value;
    const diff = p - c;
    const absDiff = Math.abs(diff).toFixed(2);
    const pct = (((p - c) / c) * 100).toFixed(1);
    const action = diff > 0 ? 'rose by' : diff < 0 ? 'declined by' : 'remained unchanged at';

    insights.push({
      id: 'emissions-insight',
      metricId: 'co2Emissions',
      title: 'Annual Fossil Fuel Emissions',
      text: `Annual global fossil fuel & industrial CO₂ emissions ${action} ${absDiff} GtCO₂/year (${diff >= 0 ? '+' : '−'}${Math.abs(pct)}%) from ${c.toFixed(2)} Gt in ${comparisonYear} to ${p.toFixed(2)} Gt in ${primaryYear}.`,
      diffFormatted: `${diff > 0 ? '+' : diff < 0 ? '−' : ''}${absDiff} Gt`,
      impact: diff > 0 ? 'adverse' : diff < 0 ? 'favorable' : 'neutral',
      category: 'Emissions'
    });
  }

  return insights;
}
