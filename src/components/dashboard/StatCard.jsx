import React from 'react';
import { 
  Info, 
  ArrowUpRight, 
  ArrowDownRight, 
  Minus,
  Thermometer, 
  CloudRain, 
  Factory, 
  Waves, 
  Snowflake, 
  Flame,
  ExternalLink
} from 'lucide-react';
import { useClimateStore } from '../../store/useClimateStore';
import { formatValue, formatDiff, formatPercent } from '../../utils/formatters';
import { getSparklineData } from '../../utils/dataSelectors';
import SparklineChart from '../charts/SparklineChart';

const iconMap = {
  Thermometer,
  CloudRain,
  Factory,
  Waves,
  Snowflake,
  Flame,
};

export default function StatCard({ comparisonItem }) {
  const { 
    config, 
    primaryYear, 
    comparisonYear, 
    primaryValue, 
    comparisonValue, 
    diff, 
    percentChange, 
    direction, 
    impact, 
    isScientificallyValidPercent,
    primaryStatus,
    comparisonStatus
  } = comparisonItem;

  const setInfoMetricId = useClimateStore((state) => state.setInfoMetricId);
  const setActiveMetric = useClimateStore((state) => state.setActiveMetric);

  const IconComponent = iconMap[config.iconName] || Info;
  const sparklineData = getSparklineData(config.id);

  // Trend Badge styles for white theme
  const getTrendBadge = () => {
    if (diff === null || diff === undefined) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-500">
          <Minus className="w-3 h-3" /> Data Missing
        </span>
      );
    }

    if (direction === 'flat') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
          <Minus className="w-3 h-3" /> Unchanged
        </span>
      );
    }

    if (impact === 'adverse') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200">
          {direction === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          <span>{direction === 'up' ? 'Rising' : 'Declining'}</span>
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
        {direction === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
        <span>{direction === 'up' ? 'Rising' : 'Declining'}</span>
      </span>
    );
  };

  return (
    <article className="group relative bg-white hover:bg-slate-50/50 border border-slate-200 hover:border-slate-300 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      
      {/* Top row: Icon, Name, and Info Button */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div 
              className="p-2.5 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105"
              style={{ backgroundColor: `${config.color}14`, color: config.color, borderColor: `${config.color}30` }}
            >
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                {config.name}
              </h4>
              <span className="text-[11px] text-slate-500 font-mono font-medium">
                {config.unit} • {config.baseline.split('(')[0]}
              </span>
            </div>
          </div>

          {/* Info Button triggering modal */}
          <button
            onClick={() => setInfoMetricId(config.id)}
            className="p-1.5 text-slate-400 hover:text-cyan-700 rounded-lg hover:bg-slate-100 transition-colors"
            title={`View scientific methodology and details for ${config.name}`}
            aria-label={`View scientific details for ${config.name}`}
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {/* Primary Year Value & Status */}
        <div className="mt-3 flex items-baseline justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                {formatValue(primaryValue, config.decimals)}
              </span>
              <span className="text-xs font-bold text-cyan-700 font-mono">
                {config.unit}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="text-slate-700 font-semibold">{primaryYear} Primary</span>
              {primaryStatus === 'preliminary' && (
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
                  Prelim
                </span>
              )}
            </div>
          </div>

          {/* Sparkline Miniature Chart */}
          <div className="text-right">
            <SparklineChart 
              data={sparklineData}
              color={config.color}
              primaryYear={primaryYear}
              comparisonYear={comparisonYear}
            />
          </div>
        </div>

        {/* Comparison Details Box */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
          
          {/* Comparison Year Reference Value */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] text-slate-500 font-medium block mb-0.5">
              {comparisonYear} Value:
            </span>
            <div className="font-mono font-bold text-slate-800">
              {formatValue(comparisonValue, config.decimals, config.unit)}
            </div>
          </div>

          {/* Absolute Difference */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] text-slate-500 font-medium block mb-0.5">
              Absolute Delta:
            </span>
            <div className={`font-mono font-extrabold ${
              impact === 'adverse' ? 'text-orange-600' : impact === 'favorable' ? 'text-emerald-600' : 'text-slate-700'
            }`}>
              {formatDiff(diff, config.decimals, config.unit)}
            </div>
          </div>

        </div>

        {/* Percentage change or Scientific Anomaly Explanation */}
        <div className="mt-2.5 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px] font-medium">Proportional Shift:</span>
          {isScientificallyValidPercent ? (
            <span className={`font-mono font-bold px-2.5 py-0.5 rounded text-xs ${
              impact === 'adverse' 
                ? 'bg-orange-50 text-orange-700 border border-orange-200' 
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}>
              {formatPercent(percentChange, 1)}
            </span>
          ) : (
            <span 
              className="text-[10px] text-slate-500 italic bg-slate-100 px-2 py-0.5 rounded border border-slate-200 cursor-help font-medium"
              title={config.percentageNotice || 'Baseline anomaly: percentage change is mathematically invalid.'}
            >
              N/A (Baseline Anomaly)
            </span>
          )}
        </div>
      </div>

      {/* Bottom Footer: Trend Badge & Source */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div>
          {getTrendBadge()}
        </div>

        <button
          onClick={() => setActiveMetric(config.id)}
          className="text-[11px] text-slate-500 hover:text-cyan-700 font-medium flex items-center gap-1 transition-colors group/src"
          title={`Click to focus trend chart on ${config.name}`}
        >
          <span>{config.source}</span>
          <ExternalLink className="w-3 h-3 opacity-60 group-hover/src:opacity-100" />
        </button>
      </div>

    </article>
  );
}
