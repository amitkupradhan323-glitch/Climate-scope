import React, { useState } from 'react';
import { 
  RotateCw, 
  Sun, 
  CloudRain, 
  Waves, 
  AlertTriangle, 
  Factory, 
  ShieldAlert, 
  ArrowRight,
  Flame,
  CheckCircle2
} from 'lucide-react';

const ENGINE_STAGES = [
  {
    step: 1,
    title: 'We Release Emissions',
    subtitle: 'Anthropogenic Inputs',
    icon: Factory,
    color: '#0284C7',
    tag: '54.1 Gt CO₂eq / year',
    detail: 'Human energy, industrial, and agricultural practices combust fossil fuels (coal, oil, gas) and expand livestock herds, venting billions of tonnes of CO₂ and methane annually.',
    scientificMechanism: 'Atmospheric greenhouse gas concentrations rise to record highs (426+ ppm CO₂), changing atmospheric chemical composition.'
  },
  {
    step: 2,
    title: 'Gases Trap Solar Heat',
    subtitle: 'The Invisible Blanket',
    icon: Sun,
    color: '#EA580C',
    tag: 'Enhanced Greenhouse Forcing',
    detail: 'Shortwave sunlight enters freely and warms Earth’s surface. When that energy radiates back out as infrared heat, greenhouse molecules absorb and re-emit it toward the surface.',
    scientificMechanism: 'Acts like a thermal blanket, reducing Earth’s outgoing radiative cooling to outer space and creating a persistent energy imbalance.'
  },
  {
    step: 3,
    title: 'Oceans & Land Absorb Energy',
    subtitle: 'The Giant Thermal Sponge',
    icon: Waves,
    color: '#0891B2',
    tag: '>90% Oceanic Heat Uptake',
    detail: 'The excess energy imbalance has nowhere to escape. Over 90% is absorbed into the global oceans (0–2000m depth), while continental land surfaces warm rapidly (+1.59°C).',
    scientificMechanism: 'Drives record ocean heat content (>32 × 10²² Joules anomaly) and massive thermal expansion of seawater.'
  },
  {
    step: 4,
    title: 'Earth’s Systems Are Disrupted',
    subtitle: 'Planetary Feedback Disruptions',
    icon: AlertTriangle,
    color: '#9333EA',
    tag: 'Tipping Cascades',
    detail: 'Polar ice sheets and mountain glaciers accelerate their retreat, sea level reaches record heights, marine ecosystems suffer catastrophic bleaching, and atmospheric extremes intensify.',
    scientificMechanism: 'Melting ice reduces planetary albedo (thermal reflectance), causing further warming and destabilizing jet stream weather patterns.'
  }
];

export default function WarmingEngine() {
  const [activeStage, setActiveStage] = useState(0);
  const current = ENGINE_STAGES[activeStage];
  const CurrentIcon = current.icon;

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm space-y-6">
      
      {/* Section Header (PDF Page 6) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-700">
            <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Planetary Feedback Dynamics</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            The Warming Engine: How Human Activity Drives Planetary Response
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Understanding the cyclical chain reaction connecting emissions, heat trapping, ocean uptake, and system disruption.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-800 self-start md:self-auto">
          Interactive Mechanism Explorer
        </span>
      </div>

      {/* The 4-Stage Cyclical Navigation (PDF Page 6) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {ENGINE_STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isSelected = activeStage === idx;

          return (
            <button
              key={stage.title}
              onClick={() => setActiveStage(idx)}
              className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between space-y-2 group ${
                isSelected
                  ? 'bg-cyan-50/70 border-cyan-400 shadow-sm ring-1 ring-cyan-400/50'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                  style={{ backgroundColor: `${stage.color}15`, color: stage.color }}
                >
                  0{stage.step}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  isSelected ? 'bg-cyan-200/60 text-cyan-900' : 'bg-slate-200 text-slate-600'
                }`}>
                  Stage {stage.step}
                </span>
              </div>

              <div>
                <h4 className={`text-sm font-bold ${isSelected ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'}`}>
                  {stage.title}
                </h4>
                <p className="text-[11px] text-slate-500">{stage.subtitle}</p>
              </div>

              {isSelected && (
                <div className="w-full h-1 bg-cyan-600 rounded-full mt-1"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Stage Detailed Breakdown */}
      <div className="p-5 sm:p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div 
              className="p-3 rounded-xl border flex items-center justify-center shadow-2xs"
              style={{ backgroundColor: `${current.color}15`, color: current.color, borderColor: `${current.color}30` }}
            >
              <CurrentIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Step 0{current.step} In Depth
              </span>
              <h4 className="text-lg sm:text-xl font-extrabold text-slate-900">
                {current.title}
              </h4>
            </div>
          </div>

          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 shadow-2xs self-start sm:self-auto">
            {current.tag}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
            <span className="font-bold text-slate-900 block flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
              Observed Phenomenon
            </span>
            <p className="text-slate-600 leading-relaxed">
              {current.detail}
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
            <span className="font-bold text-slate-900 block flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-600" />
              Atmospheric & Ocean Physics
            </span>
            <p className="text-slate-600 leading-relaxed">
              {current.scientificMechanism}
            </p>
          </div>
        </div>
      </div>

      {/* The 3-Step Heat-Trapping Blanket Mechanism (PDF Page 3) */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50/50 via-slate-50 to-orange-50/50 border border-amber-200/80 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
          <Sun className="w-4 h-4 text-amber-600" />
          <span>The Greenhouse Mechanism (PDF Page 3)</span>
        </div>
        <h4 className="text-base font-bold text-slate-900">
          Human activities wrap the planet in an invisible, heat-trapping blanket.
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="font-bold text-slate-900 block">1. Incoming Sunlight</span>
            <p className="text-slate-600">Solar radiation enters the transparent atmosphere and directly warms the Earth's land and sea surface.</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="font-bold text-slate-900 block">2. Outgoing Heat</span>
            <p className="text-slate-600">The warmed Earth radiates thermal energy back toward space as longer-wavelength infrared radiation.</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="font-bold text-slate-900 block">3. Trapping Blanket</span>
            <p className="text-slate-600">Greenhouse gas molecules act like a blanket, trapping infrared heat and keeping it close to the ground.</p>
          </div>
        </div>
      </div>

    </section>
  );
}
