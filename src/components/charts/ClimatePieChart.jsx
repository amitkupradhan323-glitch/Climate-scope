import React, { useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';
import { PieChart as PieIcon, Flame, Globe2, Layers, Info } from 'lucide-react';
import { useClimateStore } from '../../store/useClimateStore';
import { FOSSIL_EMISSIONS_BY_YEAR, EARTH_HEAT_INVENTORY } from '../../data/distributionData';
import { formatValue } from '../../utils/formatters';

export default function ClimatePieChart() {
  const selectedYear = useClimateStore((state) => state.selectedYear);
  const comparisonYear = useClimateStore((state) => state.comparisonYear);

  const [pieMode, setPieMode] = useState('emissions'); // 'emissions' | 'heat'

  const primaryEmissions = FOSSIL_EMISSIONS_BY_YEAR[selectedYear] || FOSSIL_EMISSIONS_BY_YEAR[2025];
  const comparisonEmissions = FOSSIL_EMISSIONS_BY_YEAR[comparisonYear] || FOSSIL_EMISSIONS_BY_YEAR[2016];

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm space-y-6">
      
      {/* Header and Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-700">
            <PieIcon className="w-3.5 h-3.5" />
            <span>Distribution & Proportional Shares (Pie Chart)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Planetary Proportions & Carbon Breakdown
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Explore categorical distributions across fuel emissions sources and global planetary heat absorption.
          </p>
        </div>

        {/* Toggle Mode */}
        <div className="flex items-center gap-1.5 self-start md:self-auto bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setPieMode('emissions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              pieMode === 'emissions'
                ? 'bg-white text-cyan-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>CO₂ Emissions by Fuel</span>
          </button>
          <button
            onClick={() => setPieMode('heat')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              pieMode === 'heat'
                ? 'bg-white text-cyan-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Earth's Heat Inventory</span>
          </button>
        </div>
      </div>

      {/* MODE 1: GLOBAL CO2 EMISSIONS BY FUEL TYPE */}
      {pieMode === 'emissions' && (
        <div className="space-y-6">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-bold text-slate-800">
              Fossil Fuel Combustion by Source: Primary ({selectedYear}) vs Compare ({comparisonYear})
            </span>
            <span className="text-slate-500 font-mono text-[11px]">
              Source: Global Carbon Budget / Our World in Data
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            
            {/* Primary Year Pie Chart */}
            <div className="p-5 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-cyan-800 font-bold">Primary Year</span>
                  <h4 className="text-base font-extrabold text-slate-900">{selectedYear} Fuel Mix</h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Total Emissions</span>
                  <span className="font-mono font-extrabold text-cyan-900 text-sm">{primaryEmissions.total.toFixed(2)} GtCO₂</span>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={primaryEmissions.sources}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={85}
                      innerRadius={48}
                      paddingAngle={3}
                      animationDuration={800}
                    >
                      {primaryEmissions.sources.map((entry, index) => (
                        <Cell key={`primary-slice-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val, name, item) => [
                        `${val.toFixed(2)} GtCO₂ (${item.payload.pct}%)`,
                        item.payload.name
                      ]}
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#CBD5E1',
                        borderRadius: '8px',
                        fontSize: '12px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                    />
                    <Legend 
                      iconType="circle"
                      formatter={(val) => <span className="text-xs text-slate-700 font-medium">{val}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Source badges */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-xs">
                {primaryEmissions.sources.map((s) => (
                  <div key={`badge-p-${s.name}`} className="flex items-center justify-between p-1.5 bg-white rounded-lg border border-slate-200">
                    <span className="text-[11px] text-slate-600 truncate mr-1">{s.name}:</span>
                    <span className="font-mono font-bold text-slate-900">{s.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison Year Pie Chart */}
            <div className="p-5 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-teal-800 font-bold">Compare Year</span>
                  <h4 className="text-base font-extrabold text-slate-900">{comparisonYear} Fuel Mix</h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Total Emissions</span>
                  <span className="font-mono font-extrabold text-teal-900 text-sm">{comparisonEmissions.total.toFixed(2)} GtCO₂</span>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={comparisonEmissions.sources}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={85}
                      innerRadius={48}
                      paddingAngle={3}
                      animationDuration={800}
                    >
                      {comparisonEmissions.sources.map((entry, index) => (
                        <Cell key={`comp-slice-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val, name, item) => [
                        `${val.toFixed(2)} GtCO₂ (${item.payload.pct}%)`,
                        item.payload.name
                      ]}
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#CBD5E1',
                        borderRadius: '8px',
                        fontSize: '12px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                    />
                    <Legend 
                      iconType="circle"
                      formatter={(val) => <span className="text-xs text-slate-700 font-medium">{val}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Source badges */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-xs">
                {comparisonEmissions.sources.map((s) => (
                  <div key={`badge-c-${s.name}`} className="flex items-center justify-between p-1.5 bg-white rounded-lg border border-slate-200">
                    <span className="text-[11px] text-slate-600 truncate mr-1">{s.name}:</span>
                    <span className="font-mono font-bold text-slate-900">{s.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODE 2: EARTH'S ENERGY IMBALANCE HEAT SINK INVENTORY */}
      {pieMode === 'heat' && (
        <div className="space-y-6">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-bold text-slate-800">
              Where Does Excess Global Warming Heat Go? (Earth's Energy Imbalance)
            </span>
            <span className="text-slate-500 font-mono text-[11px]">
              Source: IPCC Sixth Assessment Report (AR6) / von Schuckmann et al.
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* The Donut/Pie Chart */}
            <div className="lg:col-span-6 h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={EARTH_HEAT_INVENTORY}
                    dataKey="percentage"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={105}
                    innerRadius={55}
                    paddingAngle={3}
                    animationDuration={900}
                  >
                    {EARTH_HEAT_INVENTORY.map((entry, index) => (
                      <Cell key={`heat-cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2.5} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val, name, item) => [
                      `${val}% of planetary excess heat`,
                      item.payload.name
                    ]}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#CBD5E1',
                      borderRadius: '8px',
                      fontSize: '12px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Legend 
                    iconType="circle"
                    formatter={(val) => <span className="text-xs text-slate-700 font-medium">{val}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Scientific Breakdown Cards */}
            <div className="lg:col-span-6 space-y-2.5">
              <div className="p-3 bg-cyan-50/70 border border-cyan-200 rounded-xl text-xs">
                <span className="font-extrabold text-cyan-900 block mb-0.5">
                  Key Scientific Takeaway: 89% of Heat Goes into the Oceans
                </span>
                <p className="text-cyan-800 text-[11px]">
                  Atmospheric warming accounts for only ~1% of humanity's heat trap. The oceans absorb almost nine-tenths, explaining why ocean heat content is the truest indicator of planetary warming.
                </p>
              </div>

              <div className="space-y-1.5 text-xs">
                {EARTH_HEAT_INVENTORY.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                      <span className="font-semibold text-slate-800">{item.name}</span>
                    </div>
                    <span className="font-mono font-extrabold text-slate-900">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
