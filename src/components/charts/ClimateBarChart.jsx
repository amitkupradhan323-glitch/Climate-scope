import React, { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ReferenceLine
} from 'recharts';
import { BarChart3, ArrowRight, Layers, ArrowUpDown, Calendar } from 'lucide-react';
import { useClimateStore } from '../../store/useClimateStore';
import { METRIC_CONFIG, METRIC_LIST } from '../../data/metricConfig';
import { getComparisonData, getAllObservations } from '../../utils/dataSelectors';
import { formatValue, formatDiff } from '../../utils/formatters';

export default function ClimateBarChart() {
  const selectedYear = useClimateStore((state) => state.selectedYear);
  const comparisonYear = useClimateStore((state) => state.comparisonYear);
  const activeMetric = useClimateStore((state) => state.activeMetric);
  const setActiveMetric = useClimateStore((state) => state.setActiveMetric);

  const [barMode, setBarMode] = useState('decade'); // 'decade' | 'deltas'

  const activeConfig = METRIC_CONFIG[activeMetric] || METRIC_CONFIG.temperatureAnomaly;
  const observations = getAllObservations();
  const comparisonData = getComparisonData(selectedYear, comparisonYear);

  // 1. Decade Annual Bar Data for the active metric
  const decadeBarData = useMemo(() => {
    return observations.map((obs) => {
      const isPrimary = obs.year === selectedYear;
      const isComparison = obs.year === comparisonYear;
      const val = obs.metrics[activeMetric]?.value ?? null;

      let fill = '#94A3B8'; // default slate-400
      if (isPrimary) fill = '#0891B2'; // cyan-600
      if (isComparison) fill = '#0D9488'; // teal-600

      return {
        year: obs.year,
        value: val,
        status: obs.metrics[activeMetric]?.status,
        isPrimary,
        isComparison,
        fill
      };
    });
  }, [observations, activeMetric, selectedYear, comparisonYear]);

  // 2. Net Delta Bar Data across all 6 metrics
  const deltaBarData = useMemo(() => {
    return comparisonData.map((item) => {
      const diffVal = item.diff;
      const isAdverse = item.impact === 'adverse';
      const isFavorable = item.impact === 'favorable';
      const color = isAdverse ? '#EA580C' : isFavorable ? '#10B981' : '#64748B';

      return {
        name: item.config.shortName,
        fullName: item.config.name,
        diff: diffVal,
        unit: item.config.unit,
        decimals: item.config.decimals,
        impact: item.impact,
        fill: color
      };
    });
  }, [comparisonData]);

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm space-y-6">
      
      {/* Header and Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-700">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Comparative Bar Graph Analytics</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Climate Indicator Bar Visualizations
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Compare annual distribution and magnitude shifts between {selectedYear} (Primary) and {comparisonYear} (Reference).
          </p>
        </div>

        {/* Bar Mode Switcher */}
        <div className="flex items-center gap-1.5 self-start md:self-auto bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setBarMode('decade')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              barMode === 'decade'
                ? 'bg-white text-cyan-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>10-Year Annual Bars</span>
          </button>
          <button
            onClick={() => setBarMode('deltas')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              barMode === 'deltas'
                ? 'bg-white text-cyan-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Indicator Deltas (Δ)</span>
          </button>
        </div>
      </div>

      {/* MODE 1: 10-YEAR ANNUAL BAR GRAPH */}
      {barMode === 'decade' && (
        <div className="space-y-4">
          
          {/* Metric Selector Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-2">
            <span className="text-xs font-semibold text-slate-500 mr-1">Select Metric:</span>
            {METRIC_LIST.map((m) => (
              <button
                key={`barmetric-${m.id}`}
                onClick={() => setActiveMetric(m.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeMetric === m.id
                    ? 'bg-cyan-100 text-cyan-900 border border-cyan-300 shadow-2xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {m.shortName}
              </button>
            ))}
          </div>

          {/* Bar Chart Header details */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">{activeConfig.name}</span>
              <span className="font-mono text-slate-500">({activeConfig.unit})</span>
            </div>
            <div className="flex items-center gap-4 font-semibold text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-cyan-600"></span>
                <span>Primary ({selectedYear})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-teal-600"></span>
                <span>Compare ({comparisonYear})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-400"></span>
                <span>Other Years</span>
              </div>
            </div>
          </div>

          {/* Recharts BarChart Canvas */}
          <div className="h-72 sm:h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={decadeBarData}
                margin={{ top: 20, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis 
                  dataKey="year" 
                  stroke="#64748B" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={{ stroke: '#CBD5E1' }}
                />
                <YAxis 
                  stroke="#64748B" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={{ stroke: '#CBD5E1' }}
                  tickFormatter={(val) => `${val}`}
                />
                <Tooltip
                  formatter={(val, name, item) => [
                    `${formatValue(val, activeConfig.decimals, activeConfig.unit)}`,
                    item.payload.isPrimary ? `${item.payload.year} (Primary Year)` : item.payload.isComparison ? `${item.payload.year} (Compare Year)` : `${item.payload.year}`
                  ]}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#CBD5E1',
                    borderRadius: '8px',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[6, 6, 0, 0]}
                  animationDuration={800}
                >
                  {decadeBarData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.fill}
                      stroke={entry.isPrimary ? '#0E7490' : entry.isComparison ? '#0F766E' : 'none'}
                      strokeWidth={entry.isPrimary || entry.isComparison ? 2 : 0}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      )}

      {/* MODE 2: NET DELTA BAR GRAPH ACROSS ALL 6 METRICS */}
      {barMode === 'deltas' && (
        <div className="space-y-4">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-bold text-slate-800">
              Net Physical Shift: {selectedYear} relative to {comparisonYear} (Δ = Primary − Compare)
            </span>
            <div className="flex items-center gap-3 font-semibold text-[11px]">
              <span className="flex items-center gap-1 text-orange-700">
                <span className="w-2.5 h-2.5 rounded bg-orange-600"></span> Adverse Climate Direction
              </span>
              <span className="flex items-center gap-1 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded bg-emerald-600"></span> Stabilizing / Favorable
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
            {deltaBarData.map((item) => {
              const absVal = Math.abs(item.diff);
              const sign = item.diff > 0 ? '+' : item.diff < 0 ? '−' : '±';

              return (
                <div key={item.name} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{item.name}</span>
                    <span className={`font-mono font-bold ${
                      item.impact === 'adverse' ? 'text-orange-600' : 'text-emerald-600'
                    }`}>
                      {sign}{absVal.toFixed(item.decimals)} {item.unit}
                    </span>
                  </div>

                  {/* Horizontal visual bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.impact === 'adverse' ? 'bg-orange-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(15, (absVal / (absVal + 5)) * 100))}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{item.fullName}</span>
                    <span className="font-medium text-slate-600">
                      {item.impact === 'adverse' ? '● Adverse' : '● Favorable'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </section>
  );
}
