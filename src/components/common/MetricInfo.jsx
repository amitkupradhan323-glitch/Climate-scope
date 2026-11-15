import React from 'react';
import { Info } from 'lucide-react';
import { useClimateStore } from '../../store/useClimateStore';
import { METRIC_CONFIG } from '../../data/metricConfig';

/**
 * MetricInfo inline trigger button or small badge
 */
export default function MetricInfo({ metricId, className = '' }) {
  const setInfoMetricId = useClimateStore((state) => state.setInfoMetricId);
  const metric = METRIC_CONFIG[metricId];

  if (!metric) return null;

  return (
    <button
      type="button"
      onClick={() => setInfoMetricId(metricId)}
      className={`inline-flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors p-1 rounded hover:bg-slate-800/60 ${className}`}
      title={`View metadata and methodology for ${metric.name}`}
      aria-label={`View metadata for ${metric.name}`}
    >
      <Info className="w-3.5 h-3.5" />
    </button>
  );
}
