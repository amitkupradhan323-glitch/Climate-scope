import { useClimateStore } from '../src/store/useClimateStore.js';

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

console.log('--- TESTING ZUSTAND STORE BEHAVIOR ---\n');

const state = useClimateStore.getState();
assert(state.selectedYear === 2025, 'Initial selectedYear is 2025');
assert(state.comparisonYear === 2016, 'Initial comparisonYear is 2016');
assert(state.activeMetric === 'temperatureAnomaly', 'Initial activeMetric is temperatureAnomaly');

// Test swapYears
state.swapYears();
assert(useClimateStore.getState().selectedYear === 2016, 'After swap, selectedYear is 2016');
assert(useClimateStore.getState().comparisonYear === 2025, 'After swap, comparisonYear is 2025');

// Swap back
state.swapYears();
assert(useClimateStore.getState().selectedYear === 2025, 'Restored selectedYear to 2025');
assert(useClimateStore.getState().comparisonYear === 2016, 'Restored comparisonYear to 2016');

// Test preventing duplicate year in setSelectedYear
useClimateStore.getState().setSelectedYear(2016);
assert(useClimateStore.getState().selectedYear === 2025, 'setSelectedYear prevents selecting comparisonYear (2016)');

// Test preventing duplicate year in setComparisonYear
useClimateStore.getState().setComparisonYear(2025);
assert(useClimateStore.getState().comparisonYear === 2016, 'setComparisonYear prevents selecting selectedYear (2025)');

// Test valid changes
useClimateStore.getState().setSelectedYear(2023);
assert(useClimateStore.getState().selectedYear === 2023, 'setSelectedYear sets valid year (2023)');

useClimateStore.getState().setComparisonYear(2018);
assert(useClimateStore.getState().comparisonYear === 2018, 'setComparisonYear sets valid year (2018)');

// Reset
useClimateStore.getState().setSelectedYear(2025);
useClimateStore.getState().setComparisonYear(2016);

// Test setActiveMetric
useClimateStore.getState().setActiveMetric('atmosphericCO2');
assert(useClimateStore.getState().activeMetric === 'atmosphericCO2', 'setActiveMetric sets metric');
useClimateStore.getState().setActiveMetric('temperatureAnomaly');

// Test modal state
useClimateStore.getState().setInfoMetricId('seaLevel');
assert(useClimateStore.getState().infoMetricId === 'seaLevel', 'setInfoMetricId sets metric id');
useClimateStore.getState().closeInfoModal();
assert(useClimateStore.getState().infoMetricId === null, 'closeInfoModal resets to null');

console.log(`\nSTORE TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
if (failed > 0) process.exit(1);
