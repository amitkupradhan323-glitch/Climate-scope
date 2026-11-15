import React from 'react';
import { 
  Table, 
  ArrowUpRight, 
  ArrowDownRight, 
  Minus, 
  Info,
  Thermometer, 
  CloudRain, 
  Factory, 
  Waves, 
  Snowflake, 
  Flame,
  HelpCircle
} from 'lucide-react';
import { useClimateStore } from '../../store/useClimateStore';
import { getComparisonData } from '../../utils/dataSelectors';
import { formatValue, formatDiff, formatPercent } from '../../utils/formatters';

const iconMap = {
  Thermometer,
  CloudRain,
  Factory,
  Waves,
  Snowflake,
  Flame,
};

export default function ComparisonTable() {
  const selectedYear = useClimateStore((state) => state.selectedYear);
  const comparisonYear = useClimateStore((state) => state.comparisonYear);
  const setInfoMetricId = useClimateStore((state) => state.setInfoMetricId);
  const setActiveMetric = useClimateStore((state) => state.setActiveMetric);

  const tableData = getComparisonData(selectedYear, comparisonYear);

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm space-y-4">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-700">
            <Table className="w-3.5 h-3.5" />
            <span>Tabular Matrix</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Year-by-Year Comparison
          </h3>
        </div>
        <p className="text-xs text-slate-500 max-w-md">
          Direct statistical comparison across all 6 core planetary indicators between {selectedYear} and {comparisonYear}.
        </p>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto -mx-5 sm:mx-0 border border-slate-200 rounded-xl">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-slate-200 text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-xs font-bold uppercase tracking-wider text-slate-600">
                <th scope="col" className="py-3.5 pl-4 pr-3 sm:pl-6 text-left">
                  Indicator
                </th>
                <th scope="col" className="px-3 py-3.5 text-right font-mono text-cyan-800">
                  Primary Year ({selectedYear})
                </th>
                <th scope="col" className="px-3 py-3.5 text-right font-mono text-teal-800">
                  Comparison Year ({comparisonYear})
                </th>
                <th scope="col" className="px-3 py-3.5 text-right font-mono text-slate-700">
                  Difference (Δ)
                </th>
                <th scope="col" className="px-3 py-3.5 pr-4 sm:pr-6 text-right font-mono text-slate-700">
                  Change
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm bg-white">
              {tableData.map((row) => {
                const { 
                  config, 
                  primaryValue, 
                  comparisonValue, 
                  diff, 
                  percentChange, 
                  direction, 
                  impact, 
                  isScientificallyValidPercent,
                  primaryStatus
                } = row;

                const IconComp = iconMap[config.iconName] || Info;

                return (
                  <tr 
                    key={row.metricId}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Indicator Column */}
                    <td className="py-4 pl-4 pr-3 sm:pl-6 text-slate-900">
                      <div className="flex items-center gap-3">
                        <div 
                          className="p-2 rounded-lg border hidden sm:flex items-center justify-center shrink-0 cursor-pointer"
                          style={{ 
                            backgroundColor: `${config.color}14`, 
                            color: config.color,
                            borderColor: `${config.color}30`
                          }}
                          onClick={() => setActiveMetric(config.id)}
                          title={`Focus trend chart on ${config.name}`}
                        >
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span 
                              className="font-bold text-slate-900 group-hover:text-cyan-700 transition-colors cursor-pointer"
                              onClick={() => setActiveMetric(config.id)}
                            >
                              {config.name}
                            </span>
                            <button
                              onClick={() => setInfoMetricId(config.id)}
                              className="text-slate-400 hover:text-cyan-700 p-0.5 rounded transition-colors"
                              title={`View documentation for ${config.name}`}
                            >
                              <Info className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-2">
                            <span>{config.source}</span>
                            <span>•</span>
                            <span className="font-mono text-[11px] text-slate-400">{config.unit}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Primary Year Value */}
                    <td className="px-3 py-4 text-right font-mono text-sm sm:text-base font-extrabold text-slate-900 whitespace-nowrap">
                      <div>
                        {formatValue(primaryValue, config.decimals, config.unit)}
                      </div>
                      {primaryStatus === 'preliminary' && (
                        <span className="text-[10px] text-amber-600 font-sans font-semibold">
                          (preliminary)
                        </span>
                      )}
                    </td>

                    {/* Comparison Year Value */}
                    <td className="px-3 py-4 text-right font-mono text-sm sm:text-base font-semibold text-slate-700 whitespace-nowrap">
                      {formatValue(comparisonValue, config.decimals, config.unit)}
                    </td>

                    {/* Absolute Difference Column */}
                    <td className="px-3 py-4 text-right font-mono font-extrabold whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 ${
                        impact === 'adverse' 
                          ? 'text-orange-600' 
                          : impact === 'favorable' 
                          ? 'text-emerald-600' 
                          : 'text-slate-700'
                      }`}>
                        {direction === 'up' && <ArrowUpRight className="w-3.5 h-3.5" />}
                        {direction === 'down' && <ArrowDownRight className="w-3.5 h-3.5" />}
                        {direction === 'flat' && <Minus className="w-3.5 h-3.5" />}
                        <span>{formatDiff(diff, config.decimals, config.unit)}</span>
                      </span>
                    </td>

                    {/* Proportional Change Column */}
                    <td className="px-3 py-4 pr-4 sm:pr-6 text-right whitespace-nowrap font-mono text-xs">
                      {isScientificallyValidPercent ? (
                        <span className={`inline-block px-2.5 py-1 rounded-md font-bold ${
                          impact === 'adverse' 
                            ? 'bg-orange-50 text-orange-700 border border-orange-200' 
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {formatPercent(percentChange, 1)}
                        </span>
                      ) : (
                        <div className="flex items-center justify-end gap-1 text-slate-500 font-sans text-[11px]" title={config.percentageNotice}>
                          <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Baseline Anomaly</span>
                          <HelpCircle className="w-3 h-3 text-slate-400" />
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scientific Footnote */}
      <div className="pt-2 text-xs text-slate-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-slate-100">
        <p>
          <span className="font-semibold text-cyan-800">Scientific Note:</span> Percentages are strictly calculated only for physical concentrations and spatial extents (ppm, Gt, M km²). Temperature anomalies and sea-level heights are baseline-referenced measurements where percentage calculations are mathematically invalid.
        </p>
      </div>

    </section>
  );
}
