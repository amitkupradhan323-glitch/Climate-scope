import React from 'react';
import { ArrowLeftRight, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { useClimateStore } from '../../store/useClimateStore';
import { getAvailableYears } from '../../utils/dataSelectors';

export default function YearSelector() {
  const selectedYear = useClimateStore((state) => state.selectedYear);
  const comparisonYear = useClimateStore((state) => state.comparisonYear);
  const setSelectedYear = useClimateStore((state) => state.setSelectedYear);
  const setComparisonYear = useClimateStore((state) => state.setComparisonYear);
  const swapYears = useClimateStore((state) => state.swapYears);

  const availableYears = getAvailableYears();

  const handlePrimaryChange = (e) => {
    setSelectedYear(Number(e.target.value));
  };

  const handleComparisonChange = (e) => {
    setComparisonYear(Number(e.target.value));
  };

  const yearDiff = selectedYear - comparisonYear;
  const absDiff = Math.abs(yearDiff);

  return (
    <section 
      aria-label="Year Selection and Comparison Controls"
      className="sticky top-14 sm:top-16 z-40 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-md transition-all"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left description / instructions */}
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-cyan-700">
            <Calendar className="w-3.5 h-3.5" />
            <span>Temporal Comparison Engine</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping"></span>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
            Select Two Observation Years
          </h3>
          <p className="text-xs text-slate-500 hidden sm:block">
            Compare climate indicators between any two completed calendar years.
          </p>
        </div>

        {/* Center / Right: The Two Dropdowns and Swap Button */}
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
          
          {/* Dropdown A: Primary Year */}
          <div className="flex-1 sm:min-w-[150px] space-y-1">
            <label 
              htmlFor="primary-year-select"
              className="block text-[11px] font-bold text-cyan-800 uppercase tracking-wider"
            >
              Primary Year
            </label>
            <div className="relative">
              <select
                id="primary-year-select"
                value={selectedYear}
                onChange={handlePrimaryChange}
                className="w-full appearance-none bg-slate-50 hover:bg-white border border-cyan-300 rounded-xl px-3 sm:px-4 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:bg-white transition-all cursor-pointer shadow-2xs pr-8"
              >
                {availableYears.map((year) => {
                  const isDisabled = year === comparisonYear;
                  return (
                    <option 
                      key={`primary-${year}`} 
                      value={year}
                      disabled={isDisabled}
                      className={isDisabled ? 'text-slate-400 bg-slate-100' : 'text-slate-900 bg-white'}
                    >
                      {year} {isDisabled ? '(Selected in Compare)' : year === 2025 ? '• (Latest)' : ''}
                    </option>
                  );
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-cyan-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Swap Years Button */}
          <div className="flex items-end justify-center pt-4 sm:pt-5">
            <button
              onClick={swapYears}
              type="button"
              title="Swap primary and comparison years"
              aria-label="Swap primary and comparison years"
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 border border-slate-200 hover:border-cyan-300 shadow-2xs transition-all group flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeftRight className="w-4 h-4 transition-transform group-hover:rotate-180 duration-300 text-cyan-600" />
              <span className="sr-only sm:not-sr-only sm:hidden">Swap</span>
            </button>
          </div>

          {/* Dropdown B: Compare With */}
          <div className="flex-1 sm:min-w-[150px] space-y-1">
            <label 
              htmlFor="compare-year-select"
              className="block text-[11px] font-bold text-teal-800 uppercase tracking-wider"
            >
              Compare With
            </label>
            <div className="relative">
              <select
                id="compare-year-select"
                value={comparisonYear}
                onChange={handleComparisonChange}
                className="w-full appearance-none bg-slate-50 hover:bg-white border border-teal-300 rounded-xl px-3 sm:px-4 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all cursor-pointer shadow-2xs pr-8"
              >
                {availableYears.map((year) => {
                  const isDisabled = year === selectedYear;
                  return (
                    <option 
                      key={`compare-${year}`} 
                      value={year}
                      disabled={isDisabled}
                      className={isDisabled ? 'text-slate-400 bg-slate-100' : 'text-slate-900 bg-white'}
                    >
                      {year} {isDisabled ? '(Selected as Primary)' : year === 2016 ? '• (Baseline)' : ''}
                    </option>
                  );
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-teal-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Dynamic Summary & Preset Strip */}
      <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2.5 text-xs">
        <div className="flex items-center gap-2 text-slate-700">
          <span className="text-slate-500 font-medium">Scope:</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-cyan-50 border border-cyan-200 text-cyan-800 font-mono font-bold">
            {selectedYear}
          </span>
          <ArrowRight className="w-3 h-3 text-slate-400" />
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-teal-50 border border-teal-200 text-teal-800 font-mono font-bold">
            {comparisonYear}
          </span>
          <span className="text-slate-500 font-mono font-medium hidden sm:inline">
            ({absDiff} {absDiff === 1 ? 'year' : 'years'} {yearDiff > 0 ? 'later' : 'prior'})
          </span>
        </div>

        {/* Quick presets */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-medium hidden md:inline text-[11px]">Presets:</span>
          <button
            onClick={() => { setSelectedYear(2025); setComparisonYear(2016); }}
            className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition-colors ${
              selectedYear === 2025 && comparisonYear === 2016
                ? 'bg-cyan-100 text-cyan-900 border border-cyan-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Decade (2025 vs 2016)
          </button>
          <button
            onClick={() => { setSelectedYear(2025); setComparisonYear(2020); }}
            className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition-colors ${
              selectedYear === 2025 && comparisonYear === 2020
                ? 'bg-cyan-100 text-cyan-900 border border-cyan-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            5-Year (2025 vs 2020)
          </button>
          <button
            onClick={() => { setSelectedYear(2024); setComparisonYear(2016); }}
            className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition-colors ${
              selectedYear === 2024 && comparisonYear === 2016
                ? 'bg-cyan-100 text-cyan-900 border border-cyan-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            2024 Record
          </button>
        </div>
      </div>
    </section>
  );
}
