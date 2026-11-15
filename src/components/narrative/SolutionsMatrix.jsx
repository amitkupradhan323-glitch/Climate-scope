import React, { useState } from 'react';
import { 
  Zap, 
  Leaf, 
  Home, 
  Bike, 
  Utensils, 
  Sun, 
  Wind, 
  Globe2, 
  CheckSquare, 
  Square,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

const EVERYDAY_ACTIONS = [
  { id: 'led', title: 'Switch to LED Bulbs & Smart Thermostat', category: 'Home Superpower', reduction: '0.4 tonnes CO₂/yr', icon: Home },
  { id: 'transit', title: 'Choose Public Transit, Biking, or EV', category: 'Moving', reduction: '1.2 tonnes CO₂/yr', icon: Bike },
  { id: 'plant', title: 'Add 2–3 Plant-Rich Meals per Week', category: 'Eating', reduction: '0.6 tonnes CO₂/yr', icon: Utensils },
  { id: 'efficient', title: 'Upgrade to Energy-Efficient Heat Pump Appliances', category: 'Home Superpower', reduction: '0.8 tonnes CO₂/yr', icon: Zap }
];

export default function SolutionsMatrix() {
  const [checkedActions, setCheckedActions] = useState({
    led: true,
    transit: true,
    plant: false,
    efficient: false
  });

  const toggleAction = (id) => {
    setCheckedActions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const activeCount = Object.values(checkedActions).filter(Boolean).length;

  return (
    <section id="solutions-section" className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm space-y-6">
      
      {/* Section Header (PDF Pages 11 & 14) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pathways to Net-Zero</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            How Global Shifts and Everyday Steps Cool the Planet
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Under the Paris Agreement, international decarbonization joins forces with individual household superpowers.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold self-start md:self-auto">
          <Globe2 className="w-4 h-4 text-emerald-600" />
          <span>Paris Agreement Alignment</span>
        </div>
      </div>

      {/* The 2x2 Strategic Action Matrix (PDF Page 14) */}
      <div className="overflow-hidden border border-slate-200 rounded-2xl shadow-xs">
        
        {/* Table Headings */}
        <div className="grid grid-cols-1 md:grid-cols-12 bg-slate-100/90 text-xs font-bold text-slate-700 border-b border-slate-200">
          <div className="md:col-span-3 p-3.5 border-b md:border-b-0 md:border-r border-slate-200 uppercase tracking-wider text-slate-500">
            Sector Domain
          </div>
          <div className="md:col-span-4 p-3.5 border-b md:border-b-0 md:border-r border-slate-200 uppercase tracking-wider text-cyan-900 bg-cyan-50/50">
            Big Global Shifts (Macro Policy)
          </div>
          <div className="md:col-span-5 p-3.5 uppercase tracking-wider text-amber-900 bg-amber-50/50">
            Everyday Hero Actions (Individual Superpowers)
          </div>
        </div>

        {/* Row 1: Transforming Energy */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-slate-200 text-xs divide-y md:divide-y-0 md:divide-x divide-slate-200">
          <div className="md:col-span-3 p-4 bg-slate-50 font-bold text-slate-900 flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-700 shrink-0" />
            <div>
              <span className="block text-sm">Transforming Energy</span>
              <span className="text-[10px] text-slate-500 font-normal">Clean Grid & Power</span>
            </div>
          </div>
          <div className="md:col-span-4 p-4 bg-white space-y-1.5">
            <span className="font-bold text-slate-800 block">Massive Renewables & Electrification</span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Deploying utility-scale solar and offshore wind farms at exponential pace; transitioning heavy steel, chemical, and manufacturing industries to clean electric power.
            </p>
          </div>
          <div className="md:col-span-5 p-4 bg-white space-y-1.5">
            <span className="font-bold text-slate-800 block">Home Efficiency & Clean Mobility</span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Switching to high-efficiency LED lighting, using smart thermostats to lower peak grid strain, turning off idle electronics, and opting for public transit or EVs.
            </p>
          </div>
        </div>

        {/* Row 2: Protecting Nature & Food */}
        <div className="grid grid-cols-1 md:grid-cols-12 text-xs divide-y md:divide-y-0 md:divide-x divide-slate-200">
          <div className="md:col-span-3 p-4 bg-slate-50 font-bold text-slate-900 flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-700 shrink-0" />
            <div>
              <span className="block text-sm">Protecting Nature & Food</span>
              <span className="text-[10px] text-slate-500 font-normal">Sinks & Agriculture</span>
            </div>
          </div>
          <div className="md:col-span-4 p-4 bg-white space-y-1.5">
            <span className="font-bold text-slate-800 block">Ecosystem Restoration & Methane Abatement</span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Funding international reforestation and wetland protection; scaling methane capture technologies across energy pipelines and agrarian cattle management.
            </p>
          </div>
          <div className="md:col-span-5 p-4 bg-white space-y-1.5">
            <span className="font-bold text-slate-800 block">Dietary Choices & Sustainable Gardening</span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Incorporating nutrient-dense plant-based meals to curb livestock methane demand, cutting personal food waste, and supporting local community gardens.
            </p>
          </div>
        </div>

      </div>

      {/* Everyday Climate Superpower Checklist (PDF Pages 12 & 13) */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-800">
              Interactive Action Calculator (PDF Pages 12 & 13)
            </span>
            <h4 className="text-base font-extrabold text-slate-900">
              Your Everyday Climate Superpowers
            </h4>
          </div>
          <div className="text-xs font-semibold px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-2xs">
            Active Pledges: <strong className="text-cyan-800 font-bold">{activeCount} of 4</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {EVERYDAY_ACTIONS.map((action) => {
            const isChecked = checkedActions[action.id];
            const Icon = action.icon;

            return (
              <div 
                key={action.id}
                onClick={() => toggleAction(action.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isChecked
                    ? 'bg-white border-cyan-300 shadow-xs'
                    : 'bg-white/50 border-slate-200 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isChecked ? 'bg-cyan-100 text-cyan-800' : 'bg-slate-100 text-slate-500'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">{action.title}</span>
                    <span className="text-[10px] text-slate-500">{action.category} • Est. saving: {action.reduction}</span>
                  </div>
                </div>

                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-cyan-700 shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Inspirational Closing Vision (PDF Page 15) */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-50/70 via-cyan-50/60 to-emerald-50/70 border border-teal-200 text-xs text-slate-700 flex flex-col sm:flex-row items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white border border-teal-200 flex items-center justify-center shrink-0 shadow-2xs">
          <HeartHandshake className="w-6 h-6 text-teal-700" />
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-extrabold text-slate-900">
            By acting together, we can build a resilient, thriving planet for everyone.
          </h4>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            Global warming is a monumental challenge, but we possess the tools, the peer-reviewed science, and the scalable everyday solutions to protect our vibrant world.
          </p>
        </div>
      </div>

    </section>
  );
}
