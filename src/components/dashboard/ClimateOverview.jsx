import React from 'react';
import { Activity } from 'lucide-react';
import { useClimateStore } from '../../store/useClimateStore';
import { getComparisonData } from '../../utils/dataSelectors';
import StatCard from './StatCard';

export default function ClimateOverview() {
  const selectedYear = useClimateStore((state) => state.selectedYear);
  const comparisonYear = useClimateStore((state) => state.comparisonYear);

  const comparisonData = getComparisonData(selectedYear, comparisonYear);

  return (
    <section id="overview-section" className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-700">
            <Activity className="w-3.5 h-3.5" />
            <span>Key Climate Performance Indicators</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Planetary Vital Signs ({selectedYear} vs {comparisonYear})
          </h3>
        </div>
        <p className="text-xs text-slate-500 max-w-md">
          Comparing {selectedYear} directly against {comparisonYear}. Click any metric’s info icon to review measurement baselines and source archives.
        </p>
      </div>

      {/* Grid of 6 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {comparisonData.map((item) => (
          <StatCard key={item.metricId} comparisonItem={item} />
        ))}
      </div>
    </section>
  );
}
