import React, { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend
} from 'recharts';
import { 
  BarChart2, 
  Thermometer, 
  CloudRain, 
  Factory, 
  Waves, 
  Snowflake, 
  Flame,
  Info,
  Maximize2,
  Grid3X3,
  Columns
} from 'lucide-react';
import { useClimateStore } from '../../store/useClimateStore';
import { METRIC_CONFIG, METRIC_LIST } from '../../data/metricConfig';
import { getMetricTimeSeries, getComparisonData } from '../../utils/dataSelectors';
import { formatValue, formatDiff } from '../../utils/formatters';

const iconMap = {
  Thermometer,
  CloudRain,
  Factory,
  Waves,
  Snowflake,
  Flame,
};

// Custom Dot for Primary & Comparison Years in Recharts (White Theme)
const CustomHighlightedDot = (props) => {
  const { cx, cy, payload, primaryYear, comparisonYear, strokeColor } = props;
  if (!cx || !cy || payload.value === null) return null;

  const isPrimary = Number(payload.year) === Number(primaryYear);
  const isComparison = Number(payload.year) === Number(comparisonYear);

  if (isPrimary) {
    return (
      <g>
        <circle cx={cx} cy={cy} r="9" fill="#06B6D4" fillOpacity="0.25" className="animate-ping" />
        <circle cx={cx} cy={cy} r="6.5" fill="#0891B2" stroke="#FFFFFF" strokeWidth="2.5" />
      </g>
    );
  }

  if (isComparison) {
    return (
      <g>
        <circle cx={cx} cy={cy} r="8" fill="#0D9488" fillOpacity="0.2" />
        <circle cx={cx} cy={cy} r="5.5" fill="#FFFFFF" stroke="#0D9488" strokeWidth="2.5" />
      </g>
    );
  }

  return (
    <circle cx={cx} cy={cy} r="3" fill="#FFFFFF" stroke={strokeColor} strokeWidth="2" />
  );
};

// Custom interactive Tooltip in White Theme
const CustomChartTooltip = ({ active, payload, label, config, primaryYear, comparisonYear, compValue }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isPrimary = Number(label) === Number(primaryYear);
    const isComparison = Number(label) === Number(comparisonYear);
    const val = data.value;
    const diffToComp = (val !== null && compValue !== null) ? val - compValue : null;

    return (
      <div className="bg-white/95 border border-slate-200 rounded-xl p-3.5 shadow-xl backdrop-blur-md text-xs min-w-[210px]">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
          <span className="font-extrabold text-slate-900 font-mono text-sm">{label}</span>
          <div className="flex items-center gap-1">
            {isPrimary && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                Primary Year
              </span>
            )}
            {isComparison && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-200">
                Compare Year
              </span>
            )}
            {data.status === 'preliminary' && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                Prelim
              </span>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-slate-700">
            <span className="text-slate-500 font-medium">{config.shortName}:</span>
            <span className="font-bold text-slate-900 font-mono text-sm">
              {formatValue(val, config.decimals, config.unit)}
            </span>
          </div>

          {!isComparison && compValue !== null && val !== null && (
            <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-100">
              <span className="font-medium">vs {comparisonYear}:</span>
              <span className={`font-mono font-bold ${diffToComp > 0 ? 'text-orange-600' : 'text-emerald-600'}`}>
                {formatDiff(diffToComp, config.decimals, config.unit)}
              </span>
            </div>
          )}

          {data.note && (
            <p className="text-[10px] text-slate-500 italic pt-1 border-t border-slate-100">
              {data.note}
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default function TrendChart() {
  const activeMetric = useClimateStore((state) => state.activeMetric);
  const setActiveMetric = useClimateStore((state) => state.setActiveMetric);
  const selectedYear = useClimateStore((state) => state.selectedYear);
  const comparisonYear = useClimateStore((state) => state.comparisonYear);
  const setInfoMetricId = useClimateStore((state) => state.setInfoMetricId);

  const [viewMode, setViewMode] = useState('single'); // 'single' | 'grid' | 'compare-bars'

  const activeConfig = METRIC_CONFIG[activeMetric] || METRIC_CONFIG.temperatureAnomaly;

  // Time series for active metric
  const timeSeriesData = useMemo(() => {
    return getMetricTimeSeries(activeMetric, selectedYear, comparisonYear);
  }, [activeMetric, selectedYear, comparisonYear]);

  // Comparison value for tooltip delta
  const compValue = useMemo(() => {
    const item = timeSeriesData.find(d => Number(d.year) === Number(comparisonYear));
    return item ? item.value : null;
  }, [timeSeriesData, comparisonYear]);

  // Comparison data for all metrics for bar chart view
  const comparisonData = useMemo(() => {
    return getComparisonData(selectedYear, comparisonYear);
  }, [selectedYear, comparisonYear]);

  // Calculate domain boundaries for Y-axis with pleasant margins
  const yDomain = useMemo(() => {
    const values = timeSeriesData.map(d => d.value).filter(v => v !== null && !isNaN(v));
    if (values.length === 0) return [0, 100];
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.15 || 1;
    
    const lower = Number((min - padding).toFixed(activeConfig.decimals));
    const upper = Number((max + padding).toFixed(activeConfig.decimals));
    return [lower, upper];
  }, [timeSeriesData, activeConfig]);

  // Summary statistics for the 10-year series
  const stats = useMemo(() => {
    const values = timeSeriesData.map(d => d.value).filter(v => v !== null && !isNaN(v));
    if (values.length === 0) return null;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((acc, val) => acc + val, 0) / values.length;
    const first = timeSeriesData[0]?.value;
    const last = timeSeriesData[timeSeriesData.length - 1]?.value;
    const netShift = (first !== null && last !== null) ? last - first : null;
    return { min, max, avg, netShift };
  }, [timeSeriesData]);

  const CurrentIcon = iconMap[activeConfig.iconName] || BarChart2;

  return (
    <section id="trends-section" className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm space-y-6">
      
      {/* Header and View Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-700">
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Time-Series Analytics</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Climate Trends — Last 10 Years
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Tracking planetary shifts across 2016–2025. Highlighted markers indicate your selected Primary ({selectedYear}) and Reference ({comparisonYear}) years.
          </p>
        </div>

        {/* View Mode Toggle Buttons */}
        <div className="flex items-center gap-1.5 self-start md:self-auto bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setViewMode('single')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              viewMode === 'single'
                ? 'bg-white text-cyan-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Focused Trend</span>
          </button>
          <button
            onClick={() => setViewMode('compare-bars')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              viewMode === 'compare-bars'
                ? 'bg-white text-cyan-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Year Comparison Bar</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-cyan-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            <span>All 6 Grid</span>
          </button>
        </div>
      </div>

      {/* Metric Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {METRIC_LIST.map((metric) => {
          const IconComp = iconMap[metric.iconName] || BarChart2;
          const isActive = activeMetric === metric.id && viewMode !== 'compare-bars';

          return (
            <button
              key={metric.id}
              onClick={() => {
                setActiveMetric(metric.id);
                if (viewMode === 'compare-bars') setViewMode('single');
              }}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${
                isActive
                  ? 'bg-cyan-50/70 border-cyan-400 shadow-xs ring-1 ring-cyan-400/50'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div 
                  className="p-1.5 rounded-lg border"
                  style={{ 
                    backgroundColor: `${metric.color}15`, 
                    color: metric.color,
                    borderColor: `${metric.color}35`
                  }}
                >
                  <IconComp className="w-4 h-4" />
                </div>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse"></span>
                )}
              </div>
              <div>
                <span className={`block text-xs font-bold truncate ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                  {metric.shortName}
                </span>
                <span className="block text-[10px] text-slate-500 font-mono font-medium">
                  {metric.unit}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* VIEW MODE 1: SINGLE FOCUSED IN-DEPTH CHART */}
      {viewMode === 'single' && (
        <div className="space-y-4">
          
          {/* Active Metric Sub-Header with Metadata & Info Trigger */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2.5">
              <div 
                className="p-2 rounded-lg border"
                style={{ 
                  backgroundColor: `${activeConfig.color}18`, 
                  color: activeConfig.color,
                  borderColor: `${activeConfig.color}35`
                }}
              >
                <CurrentIcon className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-slate-900">
                    {activeConfig.name}
                  </h4>
                  <button
                    onClick={() => setInfoMetricId(activeConfig.id)}
                    className="text-slate-400 hover:text-cyan-700 transition-colors p-1"
                    title="View metric details"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-xs text-slate-500">
                  {activeConfig.source} • Baseline: {activeConfig.baseline}
                </span>
              </div>
            </div>

            {/* Visual Legend for the Chart Highlights */}
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-cyan-600 ring-2 ring-cyan-200"></span>
                <span className="text-slate-800">Primary Year: {selectedYear}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-white border-2 border-teal-600"></span>
                <span className="text-slate-800">Compare Year: {comparisonYear}</span>
              </div>
            </div>
          </div>

          {/* Interactive Recharts Canvas in White Theme */}
          <div className="h-80 sm:h-96 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={timeSeriesData}
                margin={{ top: 20, right: 20, left: -10, bottom: 10 }}
              >
                <defs>
                  <linearGradient id="metricAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={activeConfig.color} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={activeConfig.color} stopOpacity={0.0} />
                  </linearGradient>
                </defs>

                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#E2E8F0" 
                  vertical={false} 
                />

                <XAxis
                  dataKey="year"
                  stroke="#64748B"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: '#CBD5E1' }}
                  dy={10}
                />

                <YAxis
                  stroke="#64748B"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: '#CBD5E1' }}
                  domain={yDomain}
                  tickFormatter={(val) => `${val} ${activeConfig.unit}`}
                />

                <Tooltip 
                  content={
                    <CustomChartTooltip 
                      config={activeConfig}
                      primaryYear={selectedYear}
                      comparisonYear={comparisonYear}
                      compValue={compValue}
                    />
                  } 
                />

                {/* Primary Year Vertical Reference Line */}
                <ReferenceLine
                  x={selectedYear}
                  stroke="#0891B2"
                  strokeDasharray="3 3"
                  strokeWidth={2}
                />

                {/* Comparison Year Vertical Reference Line */}
                <ReferenceLine
                  x={comparisonYear}
                  stroke="#0D9488"
                  strokeDasharray="3 3"
                  strokeWidth={2}
                />

                {/* Area Gradient */}
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="transparent"
                  fill="url(#metricAreaGradient)"
                  isAnimationActive={true}
                />

                {/* Trend Line with highlighted dots */}
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={activeConfig.color}
                  strokeWidth={2.5}
                  dot={(props) => (
                    <CustomHighlightedDot
                      {...props}
                      primaryYear={selectedYear}
                      comparisonYear={comparisonYear}
                      strokeColor={activeConfig.color}
                    />
                  )}
                  activeDot={{
                    r: 6.5,
                    fill: activeConfig.color,
                    stroke: '#FFFFFF',
                    strokeWidth: 2.5
                  }}
                  isAnimationActive={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Decade Summary Statistics Strip in White Theme */}
          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="text-slate-500 font-medium block mb-1">10-Year Low</span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {formatValue(stats.min, activeConfig.decimals, activeConfig.unit)}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="text-slate-500 font-medium block mb-1">10-Year High</span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {formatValue(stats.max, activeConfig.decimals, activeConfig.unit)}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="text-slate-500 font-medium block mb-1">Decade Mean</span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {formatValue(stats.avg, activeConfig.decimals, activeConfig.unit)}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="text-slate-500 font-medium block mb-1">Net Decade Shift (2016→2025)</span>
                <span className={`font-mono font-bold text-sm ${
                  activeConfig.invertTrendPolarity
                    ? stats.netShift < 0 ? 'text-orange-600' : 'text-emerald-600'
                    : stats.netShift > 0 ? 'text-orange-600' : 'text-emerald-600'
                }`}>
                  {formatDiff(stats.netShift, activeConfig.decimals, activeConfig.unit)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: COMPARATIVE BAR CHART (RECHARTS) */}
      {viewMode === 'compare-bars' && (
        <div className="space-y-4">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                Direct Side-by-Side Comparison: {selectedYear} vs {comparisonYear}
              </h4>
              <p className="text-slate-500">
                Visualize values for the two selected observation years across all six indicators.
              </p>
            </div>
            <div className="flex items-center gap-4 font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-cyan-600"></span>
                <span>Primary ({selectedYear})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-teal-600"></span>
                <span>Compare ({comparisonYear})</span>
              </div>
            </div>
          </div>

          {/* 6 mini comparative bar cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {comparisonData.map((item) => {
              const barData = [
                { name: `${item.comparisonYear}`, value: item.comparisonValue, fill: '#0D9488' },
                { name: `${item.primaryYear}`, value: item.primaryValue, fill: '#0891B2' }
              ];

              return (
                <div key={`bar-${item.metricId}`} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{item.config.name}</span>
                    <span className="text-[10px] font-mono text-slate-500">{item.config.unit}</span>
                  </div>

                  <div className="h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                        <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                        <Tooltip 
                          formatter={(val) => [`${formatValue(val, item.config.decimals)} ${item.config.unit}`, 'Value']}
                          contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: '8px', fontSize: '11px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs font-mono">
                    <span className="text-slate-500">Difference:</span>
                    <span className={`font-bold ${item.impact === 'adverse' ? 'text-orange-600' : 'text-emerald-600'}`}>
                      {formatDiff(item.diff, item.config.decimals, item.config.unit)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW MODE 3: ALL 6 INDICATORS MINI-GRID */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {METRIC_LIST.map((metric) => {
            const series = getMetricTimeSeries(metric.id, selectedYear, comparisonYear);
            const MetricIcon = iconMap[metric.iconName] || BarChart2;
            const values = series.map(d => d.value).filter(v => v !== null);
            const min = Math.min(...values);
            const max = Math.max(...values);
            const pad = (max - min) * 0.15 || 1;

            return (
              <div 
                key={`mini-chart-${metric.id}`}
                onClick={() => {
                  setActiveMetric(metric.id);
                  setViewMode('single');
                }}
                className="p-4 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-cyan-300 rounded-xl transition-all cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div 
                      className="p-1.5 rounded-lg border"
                      style={{ 
                        backgroundColor: `${metric.color}15`, 
                        color: metric.color,
                        borderColor: `${metric.color}30`
                      }}
                    >
                      <MetricIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                        {metric.name}
                      </h5>
                      <span className="text-[10px] text-slate-500 font-mono font-medium">{metric.unit}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-cyan-700 font-bold group-hover:underline">Focus</span>
                </div>

                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={series} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="2 2" stroke="#E2E8F0" vertical={false} />
                      <XAxis dataKey="year" stroke="#94A3B8" fontSize={10} tickLine={false} />
                      <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} domain={[min - pad, max + pad]} />
                      <Tooltip content={<CustomChartTooltip config={metric} primaryYear={selectedYear} comparisonYear={comparisonYear} compValue={compValue} />} />
                      <Area type="monotone" dataKey="value" stroke={metric.color} fill={`${metric.color}18`} strokeWidth={2} />
                      <ReferenceLine x={selectedYear} stroke="#0891B2" strokeDasharray="2 2" />
                      <ReferenceLine x={comparisonYear} stroke="#0D9488" strokeDasharray="2 2" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </section>
  );
}
