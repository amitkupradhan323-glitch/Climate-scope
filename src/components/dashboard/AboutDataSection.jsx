import React from 'react';
import { 
  Database, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Info, 
  FileText,
  Thermometer, 
  CloudRain, 
  Factory, 
  Waves, 
  Snowflake, 
  Flame 
} from 'lucide-react';
import { METRIC_LIST } from '../../data/metricConfig';
import { useClimateStore } from '../../store/useClimateStore';

const iconMap = {
  Thermometer,
  CloudRain,
  Factory,
  Waves,
  Snowflake,
  Flame,
};

export default function AboutDataSection() {
  const setInfoMetricId = useClimateStore((state) => state.setInfoMetricId);

  return (
    <section id="about-section" className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-700">
            <Database className="w-3.5 h-3.5" />
            <span>Scientific Provenance</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            About the Data & Measurement Methodologies
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            ClimateScope relies exclusively on public, authoritative observational records produced by the world’s leading atmospheric, oceanic, and cryospheric scientific institutions.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 self-start md:self-auto font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Peer-Reviewed Data Pipelines</span>
        </div>
      </div>

      {/* Grid of the 6 Authoritative Data Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {METRIC_LIST.map((metric) => {
          const IconComp = iconMap[metric.iconName] || Info;

          return (
            <div
              key={`about-${metric.id}`}
              className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="p-2 rounded-lg border"
                      style={{ 
                        backgroundColor: `${metric.color}15`, 
                        color: metric.color,
                        borderColor: `${metric.color}30`
                      }}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {metric.name}
                      </h4>
                      <span className="text-[11px] text-cyan-700 font-semibold">
                        {metric.source}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-500 font-medium">Operating Agency: </span>
                    <span className="text-slate-800 font-semibold">{metric.sourceOrg}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 font-medium">Standard Unit: </span>
                    <span className="font-mono text-cyan-800 font-bold">{metric.unit}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 font-medium">Reference Baseline: </span>
                    <span className="text-slate-700">{metric.baseline}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 font-medium">Observation Scope: </span>
                    <span className="text-slate-700">{metric.depthOrScope}</span>
                  </div>

                  <p className="pt-2 text-slate-500 text-[11px] leading-relaxed border-t border-slate-200">
                    {metric.description}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                <button
                  onClick={() => setInfoMetricId(metric.id)}
                  className="text-xs font-bold text-cyan-700 hover:text-cyan-800 transition-colors flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Specification</span>
                </button>

                <a
                  href={metric.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <span>Data Archive</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scientific Integrity Principles */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-700" />
          <span>Dataset Curation & Scientific Standards</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
            <span className="font-bold text-slate-900 block mb-1">1. Absolute vs Anomaly Distinctions</span>
            <p className="text-slate-500">
              Temperature and ocean heat are measured against historical climatological baselines. Percentage calculations are disabled on anomaly values to prevent mathematical fallacies.
            </p>
          </div>
          <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
            <span className="font-bold text-slate-900 block mb-1">2. Transparent Lifecycle Status</span>
            <p className="text-slate-500">
              Observations for complete years 2016–2024 are finalized peer-reviewed values; 2025 values represent published preliminary annual updates and are clearly badged.
            </p>
          </div>
          <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
            <span className="font-bold text-slate-900 block mb-1">3. Consistent Definitions</span>
            <p className="text-slate-500">
              Arctic sea ice strictly utilizes the September monthly mean (avoiding daily minimum noise), and emissions isolate fossil fuel and cement combustion without land-use volatility.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
