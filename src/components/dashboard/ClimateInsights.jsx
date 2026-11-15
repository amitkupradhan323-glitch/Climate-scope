import React, { useMemo } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Lightbulb 
} from 'lucide-react';
import { useClimateStore } from '../../store/useClimateStore';
import { getObservationByYear } from '../../utils/dataSelectors';
import { METRIC_CONFIG } from '../../data/metricConfig';
import { generateClimateInsights } from '../../utils/calculations';

export default function ClimateInsights() {
  const selectedYear = useClimateStore((state) => state.selectedYear);
  const comparisonYear = useClimateStore((state) => state.comparisonYear);

  const primaryRecord = getObservationByYear(selectedYear);
  const comparisonRecord = getObservationByYear(comparisonYear);

  const insights = useMemo(() => {
    return generateClimateInsights(
      selectedYear,
      comparisonYear,
      primaryRecord?.metrics,
      comparisonRecord?.metrics,
      METRIC_CONFIG
    );
  }, [selectedYear, comparisonYear, primaryRecord, comparisonRecord]);

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Automated Analytical Digest</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Climate Insights
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto font-mono">
          <span>Comparing</span>
          <span className="font-bold text-cyan-800">{selectedYear}</span>
          <ArrowRight className="w-3 h-3 text-slate-400" />
          <span className="font-bold text-teal-800">{comparisonYear}</span>
        </div>
      </div>

      {/* Insights Cards Grid in White Theme */}
      {insights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {insights.map((item) => {
            const isAdverse = item.impact === 'adverse';
            const isFavorable = item.impact === 'favorable';

            return (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                      {item.category}
                    </span>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isAdverse
                          ? 'bg-orange-50 text-orange-700 border border-orange-200'
                          : isFavorable
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      {item.diffFormatted}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 mb-1.5">
                    {item.title}
                  </h4>
                  
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.text}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    {isAdverse ? (
                      <span className="text-orange-600 font-semibold">● Adverse Climate Trend</span>
                    ) : isFavorable ? (
                      <span className="text-emerald-600 font-semibold">● Decelerating / Favorable</span>
                    ) : (
                      <span>● Neutral Observation</span>
                    )}
                  </span>
                  <span className="font-mono">Observed Data</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-sm">No observational comparison data available for the chosen years.</p>
        </div>
      )}

      {/* Observational Integrity Guarantee */}
      <div className="flex items-center gap-2 p-3 bg-cyan-50 border border-cyan-200 rounded-xl text-xs text-cyan-900">
        <Lightbulb className="w-4 h-4 text-cyan-700 shrink-0" />
        <p>
          All statements are calculated dynamically and strictly describe observational differentials between the selected years without unverified causal extrapolations.
        </p>
      </div>

    </section>
  );
}
