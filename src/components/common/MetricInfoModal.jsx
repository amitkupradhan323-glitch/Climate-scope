import React, { useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Info, 
  BookOpen, 
  Layers, 
  Compass, 
  Scale, 
  Thermometer, 
  CloudRain, 
  Factory, 
  Waves, 
  Snowflake, 
  Flame 
} from 'lucide-react';
import { METRIC_CONFIG } from '../../data/metricConfig';
import { useClimateStore } from '../../store/useClimateStore';

const iconMap = {
  Thermometer,
  CloudRain,
  Factory,
  Waves,
  Snowflake,
  Flame,
};

export default function MetricInfoModal() {
  const infoMetricId = useClimateStore((state) => state.infoMetricId);
  const closeInfoModal = useClimateStore((state) => state.closeInfoModal);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeInfoModal();
      }
    };
    if (infoMetricId) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [infoMetricId, closeInfoModal]);

  if (!infoMetricId) return null;

  const metric = METRIC_CONFIG[infoMetricId];
  if (!metric) return null;

  const IconComponent = iconMap[metric.iconName] || Info;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn"
      onClick={closeInfoModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-800 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div 
              className="p-3 rounded-xl border flex items-center justify-center"
              style={{ 
                backgroundColor: `${metric.color}15`, 
                color: metric.color,
                borderColor: `${metric.color}35`
              }}
            >
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-cyan-700 font-bold">
                Climate Indicator Specification
              </span>
              <h3 id="modal-title" className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {metric.name}
              </h3>
            </div>
          </div>
          <button
            onClick={closeInfoModal}
            className="p-2 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Attributes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1 font-medium">
              <Scale className="w-3.5 h-3.5 text-cyan-700" />
              <span>Standard Measurement Unit</span>
            </div>
            <div className="text-base font-bold text-slate-900 font-mono">
              {metric.unit}
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1 font-medium">
              <Layers className="w-3.5 h-3.5 text-teal-700" />
              <span>Reference Baseline</span>
            </div>
            <div className="text-sm font-semibold text-slate-800">
              {metric.baseline}
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1 font-medium">
              <Compass className="w-3.5 h-3.5 text-amber-700" />
              <span>Scope & Observation Domain</span>
            </div>
            <div className="text-sm font-semibold text-slate-800">
              {metric.depthOrScope}
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-rose-700" />
              <span>Primary Source Provider</span>
            </div>
            <div className="text-sm font-semibold text-slate-800 truncate" title={metric.sourceOrg}>
              {metric.source}
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-4 text-sm leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-600"></span>
              What This Metric Measures
            </h4>
            <p className="text-slate-600">{metric.description}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              Scientific Methodology & Integrity
            </h4>
            <p className="text-slate-600">{metric.scientificSignificance}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              Why It Matters for Planetary Health
            </h4>
            <p className="text-slate-600">{metric.whyItMatters}</p>
          </div>

          {/* Mathematical Percentage Note */}
          <div className="p-4 rounded-xl bg-cyan-50/80 border border-cyan-200 text-xs">
            <div className="font-bold text-cyan-900 mb-1">
              Mathematical Comparison Rule:
            </div>
            {metric.allowPercentage ? (
              <p className="text-cyan-800">
                This metric represents a physical ratio quantity ({metric.unit}). Percentage changes between years are mathematically and scientifically sound and reflect true proportional variations.
              </p>
            ) : (
              <p className="text-cyan-800">
                {metric.percentageNotice || 'This metric is an anomaly or baseline-referenced value. Calculating percentage changes on relative anomaly values is mathematically misleading and scientifically invalid; absolute differences are strictly applied.'}
              </p>
            )}
          </div>
        </div>

        {/* Footer with External Link */}
        <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Dataset Source: <span className="text-slate-900 font-semibold">{metric.sourceOrg}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={metric.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-cyan-800 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-lg transition-colors w-full sm:w-auto"
            >
              <span>View Source Dataset</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={closeInfoModal}
              className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors w-full sm:w-auto"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
