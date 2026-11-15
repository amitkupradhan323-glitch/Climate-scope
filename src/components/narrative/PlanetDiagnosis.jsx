import React from 'react';
import { 
  Thermometer, 
  Flame, 
  Waves, 
  Mountain, 
  TrendingUp, 
  Clock, 
  ShieldAlert, 
  Tractor, 
  Trees, 
  Factory 
} from 'lucide-react';
import { useClimateStore } from '../../store/useClimateStore';

export default function PlanetDiagnosis() {
  const selectedYear = useClimateStore((state) => state.selectedYear);

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm space-y-6">
      
      {/* Title & Core Diagnosis Header (PDF Page 2) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600">
            <Thermometer className="w-3.5 h-3.5" />
            <span>Planetary Clinical Diagnosis</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Earth is running a persistent fever.
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Historical instrumental records confirm an accelerating global thermal anomaly driven by greenhouse forcing.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold self-start md:self-auto">
          <TrendingUp className="w-4 h-4 text-rose-600" />
          <span>Warmest Era: 2023–2026</span>
        </div>
      </div>

      {/* 3 Diagnosis Highlight Cards (PDF Page 2) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Current Diagnosis */}
        <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-700">
            <Thermometer className="w-4 h-4" />
            <span>Current Diagnosis</span>
          </div>
          <div className="text-2xl font-black text-rose-900 font-mono">
            +1.1°C to +1.47°C
          </div>
          <p className="text-xs text-rose-800 leading-relaxed font-medium">
            Global average surface temperatures have reached 1.1°C to 1.47°C above pre-industrial levels, pressing against Paris Agreement thresholds.
          </p>
        </div>

        {/* Card 2: The Baseline */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Clock className="w-4 h-4 text-cyan-700" />
            <span>Pre-Industrial Baseline</span>
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">
            1850–1900 Era
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            All long-term fever measurements are standardized against the 1850–1900 climatological average prior to large-scale industrialization.
          </p>
        </div>

        {/* Card 3: The Trend */}
        <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
            <TrendingUp className="w-4 h-4 text-amber-600" />
            <span>Decadal Trend</span>
          </div>
          <div className="text-2xl font-black text-amber-900 font-mono">
            Last 12 Years
          </div>
          <p className="text-xs text-amber-800 leading-relaxed font-medium">
            The last 12 consecutive years—and specifically 2023 through 2026—stand as the warmest multi-year period in instrumental history.
          </p>
        </div>

      </div>

      {/* Differential Warming & Ocean Sponge Card (PDF Page 5) */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-50/60 via-slate-50 to-teal-50/50 border border-cyan-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-800">
            <Waves className="w-4 h-4 text-cyan-600" />
            <span>The Ocean Thermal Sponge & Land Disparity</span>
          </div>
          <span className="text-xs font-bold text-cyan-900 font-mono bg-white px-2.5 py-1 rounded-lg border border-cyan-200">
            Oceans Absorb &gt;90% of Trapped Heat
          </span>
        </div>

        <h4 className="text-base sm:text-lg font-bold text-slate-900">
          Our oceans act as a giant thermal sponge, absorbing the brunt of the heat.
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Land Warming */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Mountain className="w-3.5 h-3.5 text-amber-600" />
                Land Surfaces Heating
              </span>
              <span className="text-lg font-black text-amber-700 font-mono">+1.59°C</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Continental landmasses heat up fast due to lower thermal inertia, warming by approximately <strong className="text-slate-900 font-semibold">1.59°C</strong> and fueling severe agricultural stress and heatwaves.
            </p>
          </div>

          {/* Ocean Surface Warming */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Waves className="w-3.5 h-3.5 text-cyan-600" />
                Ocean Surface Warming
              </span>
              <span className="text-lg font-black text-cyan-700 font-mono">+0.88°C</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ocean surfaces have warmed less (<strong className="text-slate-900 font-semibold">about 0.88°C</strong>), but they are doing the heavy lifting by absorbing <strong className="text-cyan-800 font-semibold">&gt;90% of planetary heat excess</strong>, supercharging marine heatwaves.
            </p>
          </div>
        </div>
      </div>

      {/* Total Greenhouse Emissions: 54.1 Billion Tonnes (PDF Page 4) */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-600" />
            <span>Anthropogenic Emissions: Record 54.1 Billion Tonnes Greenhouse Gases</span>
          </h4>
          <span className="text-xs font-mono font-bold text-orange-700">54.1 Gt CO₂eq in 2025</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <Factory className="w-3.5 h-3.5 text-slate-600" />
              <span>1. Fossil Fuels</span>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Coal, petroleum, and natural gas combustion remains the primary driver of global $\text{CO}_2$ emissions.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <Tractor className="w-3.5 h-3.5 text-emerald-600" />
              <span>2. Farming & Agriculture</span>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Livestock enteric fermentation and rice cultivation represent the single largest anthropogenic source of atmospheric methane ($\text{CH}_4$).
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <Trees className="w-3.5 h-3.5 text-amber-600" />
              <span>3. Land Use & Deforestation</span>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Clear-cutting tropical rainforests and degrading wetlands cuts down nature's primary carbon sequestration sinks.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}
