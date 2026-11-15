/**
 * Verification test script for ClimateScope logic, state management, and calculations.
 */

import { METRIC_CONFIG, METRIC_LIST } from '../src/data/metricConfig.js';
import { calculateComparison, generateClimateInsights } from '../src/utils/calculations.js';
import { 
  getAllObservations, 
  getAvailableYears, 
  getObservationByYear, 
  getComparisonData 
} from '../src/utils/dataSelectors.js';
import { formatValue, formatDiff, formatPercent } from '../src/utils/formatters.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('--- RUNNING CLIMATESCOPE VERIFICATION SUITE ---\n');

// 1. Data Integrity Tests
const observations = getAllObservations();
assert(observations.length === 10, `Expected 10 completed years of observations, got ${observations.length}`);

const availableYears = getAvailableYears();
assert(availableYears[0] === 2016 && availableYears[availableYears.length - 1] === 2025,
  `Years range correctly from 2016 to 2025: [${availableYears.join(', ')}]`);

const obs2016 = getObservationByYear(2016);
const obs2025 = getObservationByYear(2025);
assert(obs2016 !== null && obs2025 !== null, 'Records for 2016 and 2025 exist');

assert(obs2016.metrics.temperatureAnomaly.value === 1.02, '2016 temperature anomaly is 1.02°C');
assert(obs2025.metrics.temperatureAnomaly.value === 1.19, '2025 temperature anomaly is 1.19°C');
assert(obs2025.metrics.temperatureAnomaly.status === 'preliminary', '2025 temperature anomaly is flagged preliminary');
assert(obs2016.metrics.atmosphericCO2.value === 404.41, '2016 atmospheric CO2 is 404.41 ppm');
assert(obs2025.metrics.atmosphericCO2.value === 426.90, '2025 atmospheric CO2 is 426.90 ppm');

// 2. Metric Configurations
assert(Object.keys(METRIC_CONFIG).length === 6, 'Contains exactly 6 required climate indicators');
assert(METRIC_CONFIG.temperatureAnomaly.allowPercentage === false, 'Temperature anomaly percentage calculation is disabled');
assert(METRIC_CONFIG.seaLevel.allowPercentage === false, 'Sea level percentage calculation is disabled');
assert(METRIC_CONFIG.oceanHeatContent.allowPercentage === false, 'Ocean heat content percentage calculation is disabled');
assert(METRIC_CONFIG.atmosphericCO2.allowPercentage === true, 'CO2 concentration percentage calculation is enabled');
assert(METRIC_CONFIG.co2Emissions.allowPercentage === true, 'CO2 emissions percentage calculation is enabled');
assert(METRIC_CONFIG.arcticSeaIce.allowPercentage === true, 'Arctic sea ice percentage calculation is enabled');
assert(METRIC_CONFIG.arcticSeaIce.invertTrendPolarity === true, 'Arctic sea ice decline is flagged as adverse');

// 3. Calculation & Scientific Integrity Tests
const tempComp = calculateComparison(
  obs2025.metrics.temperatureAnomaly,
  obs2016.metrics.temperatureAnomaly,
  METRIC_CONFIG.temperatureAnomaly
);
assert(Math.abs(tempComp.diff - 0.17) < 0.0001, `Temperature difference 2025 vs 2016 is +0.17°C (got ${tempComp.diff.toFixed(2)})`);
assert(tempComp.percentChange === null, 'Temperature percentChange is null');
assert(tempComp.isScientificallyValidPercent === false, 'Temperature isScientificallyValidPercent is false');
assert(tempComp.impact === 'adverse', 'Temperature increase is adverse');

const co2Comp = calculateComparison(
  obs2025.metrics.atmosphericCO2,
  obs2016.metrics.atmosphericCO2,
  METRIC_CONFIG.atmosphericCO2
);
assert(Math.abs(co2Comp.diff - 22.49) < 0.0001, `CO2 difference is +22.49 ppm (got ${co2Comp.diff.toFixed(2)})`);
assert(co2Comp.percentChange !== null, 'CO2 percentChange is calculated');
assert(Math.abs(co2Comp.percentChange - 5.56) < 0.05, `CO2 percent change is ~ +5.56% (got ${co2Comp.percentChange.toFixed(2)}%)`);
assert(co2Comp.impact === 'adverse', 'CO2 increase is adverse');

const iceComp = calculateComparison(
  obs2025.metrics.arcticSeaIce,
  obs2016.metrics.arcticSeaIce,
  METRIC_CONFIG.arcticSeaIce
);
assert(Math.abs(iceComp.diff - (-0.31)) < 0.0001, `Sea ice difference is -0.31 million km² (got ${iceComp.diff.toFixed(2)})`);
assert(iceComp.impact === 'adverse', 'Sea ice decline is marked adverse');

// 4. Dynamic Climate Insights Generation
const insights = generateClimateInsights(2025, 2016, obs2025.metrics, obs2016.metrics, METRIC_CONFIG);
assert(insights.length === 6, `Generated exactly 6 data-driven insights (got ${insights.length})`);
assert(insights[0].text.includes('2025') && insights[0].text.includes('2016'), 'Insights explicitly reference the selected years');
assert(insights[0].text.includes('0.17°C higher'), `Temperature insight correctly states higher (got: "${insights[0].text}")`);

// 5. Comparison Table Data Selector
const comparisonTableRows = getComparisonData(2025, 2016);
assert(comparisonTableRows.length === 6, `Comparison table has 6 rows (got ${comparisonTableRows.length})`);

// 6. Formatters
assert(formatValue(1.19, 2, '°C') === '1.19 °C', 'formatValue formats correctly');
assert(formatDiff(0.17, 2, '°C') === '+0.17 °C', 'formatDiff positive formats with +');
assert(formatDiff(-0.31, 2, 'M km²') === '−0.31 M km²', 'formatDiff negative formats with −');
assert(formatPercent(5.56, 1) === '+5.6%', 'formatPercent formats with sign and %');
assert(formatValue(null) === 'N/A', 'formatValue handles null safely');
assert(formatDiff(null) === 'N/A', 'formatDiff handles null safely');
assert(formatPercent(null) === 'N/A', 'formatPercent handles null safely');

console.log(`\nTEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL VERIFICATIONS SUCCESSFUL!');
}
