import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';
import { getMetricTimeSeries } from '../../utils/dataSelectors';
import { METRIC_CONFIG } from '../../data/metricConfig';
import { formatValue } from '../../utils/formatters';

export default function OceanHeatChart({ primaryYear = 2025, comparisonYear = 2016, height = 260 }) {
  const config = METRIC_CONFIG.oceanHeatContent;
  const data = getMetricTimeSeries('oceanHeatContent', primaryYear, comparisonYear);

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
      <div className="flex items-center justify-between mb-3 text-xs">
        <span className="font-bold text-slate-900">{config.name} ({config.unit})</span>
        <span className="text-slate-500 font-mono">NOAA NCEI 0–2000m Layer Anomaly</span>
      </div>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="ohcGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#DB2777" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#DB2777" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="year" stroke="#64748B" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748B" fontSize={11} tickLine={false} domain={[15, 36]} />
            <Tooltip 
              formatter={(val) => [`${formatValue(val, 1)} × 10²² J`, 'Ocean Heat']}
              contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: '8px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <ReferenceLine x={primaryYear} stroke="#0891B2" strokeDasharray="3 3" strokeWidth={2} />
            <ReferenceLine x={comparisonYear} stroke="#0D9488" strokeDasharray="3 3" strokeWidth={2} />
            <Area type="monotone" dataKey="value" stroke="#DB2777" fill="url(#ohcGradient)" strokeWidth={2.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
