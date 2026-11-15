import { FOSSIL_EMISSIONS_BY_YEAR, EARTH_HEAT_INVENTORY } from '../src/data/distributionData.js';

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

console.log('--- TESTING PIE CHART & DISTRIBUTION DATA ---\n');

// 1. Heat inventory sums to 100%
const totalHeatPct = EARTH_HEAT_INVENTORY.reduce((sum, item) => sum + item.percentage, 0);
assert(totalHeatPct === 100, `Earth heat inventory percentages sum to 100% (got ${totalHeatPct}%)`);
assert(EARTH_HEAT_INVENTORY[0].percentage + EARTH_HEAT_INVENTORY[1].percentage === 89,
  'Oceans absorb 89% (64% upper + 25% deep)');

// 2. Fossil emissions records for 2016 through 2025
const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
years.forEach((yr) => {
  const data = FOSSIL_EMISSIONS_BY_YEAR[yr];
  assert(data !== undefined, `Emissions breakdown exists for ${yr}`);
  assert(data.sources.length === 4, `${yr} has 4 fuel categories (Coal, Oil, Gas, Cement)`);
  const sumVal = data.sources.reduce((sum, s) => sum + s.value, 0);
  assert(Math.abs(sumVal - data.total) < 0.1, `${yr} fuel sum (~${sumVal.toFixed(2)}) matches total (${data.total})`);
});

console.log(`\nDISTRIBUTION TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
if (failed > 0) process.exit(1);
