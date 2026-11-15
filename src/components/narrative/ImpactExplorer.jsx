import React from 'react';
import { 
  Snowflake, 
  Waves, 
  CloudLightning, 
  Users, 
  Droplets, 
  SunMedium, 
  Fish, 
  AlertCircle,
  ShieldCheck
} from 'lucide-react';

const IMPACTS = [
  {
    id: 'ice',
    title: 'Rapidly Melting Ice & Polar Habitats',
    pdfPage: 'Page 7',
    icon: Snowflake,
    accentColor: '#9333EA',
    badge: 'Cryosphere Retreat',
    summary: 'Accelerated retreat of mountain glaciers and polar ice sheets in Greenland and Antarctica.',
    detail: 'Polar bears, penguins, and Arctic fauna lose sea ice hunting platforms. Meltwater runoff combined with thermal expansion pushes global sea levels to record highs, shrinking vital coastal and polar ecosystems.',
    stats: 'Greenland & Antarctica losing >400 billion tonnes of ice/year'
  },
  {
    id: 'oceans',
    title: 'Hotter Waters Threaten Vibrant Marine Life',
    pdfPage: 'Page 8',
    icon: Fish,
    accentColor: '#0891B2',
    badge: 'Oceanic Stress & Bleaching',
    summary: 'Because oceans absorb >90% of excess heat, marine life faces unprecedented thermal stress.',
    detail: 'Prolonged marine heatwaves trigger widespread coral bleaching, turning kaleidoscopic coral reefs into barren white skeletons, destroying the ocean nurseries supporting 25% of all marine species.',
    stats: 'Over 90% excess heat absorbed; unprecedented reef bleaching'
  },
  {
    id: 'weather',
    title: 'Extra Heat Energy Amplifies Extreme Weather',
    pdfPage: 'Page 9',
    icon: CloudLightning,
    accentColor: '#EA580C',
    badge: 'Thermodynamic Extremes',
    summary: 'Severe regional droughts and heatwaves juxtaposed with intensified precipitation and flooding.',
    detail: 'Warmer air holds approximately 7% more water vapor per 1°C of warming. This thermodynamic acceleration produces prolonged droughts that parched agricultural soils, alternating with catastrophic flash deluges.',
    stats: '+7% atmospheric moisture holding capacity per +1°C'
  },
  {
    id: 'communities',
    title: 'Disproportionate Risks for Vulnerable Communities',
    pdfPage: 'Page 10',
    icon: Users,
    accentColor: '#10B981',
    badge: 'Climate Justice & Food Security',
    summary: 'Global warming disrupts agricultural productivity, changing where and how we grow our food.',
    detail: 'These impacts fall hardest on developing and vulnerable regions that contributed least to historic emissions and lack the capital, engineering infrastructure, and financial resources required to adapt.',
    stats: 'Direct disruption of staple crop yields (maize, wheat, rice)'
  }
];

export default function ImpactExplorer() {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm space-y-6">
      
      {/* Header (PDF Pages 7-10) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-700">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Ecological & Human Repercussions</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            How Climate Disruption Reshapes Our Planet
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Analyzing the systemic impacts across polar ice, marine biodiversity, weather extremes, and human agriculture.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 self-start md:self-auto">
          Scientific Impact Matrix
        </span>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {IMPACTS.map((item) => {
          const Icon = item.icon;

          return (
            <div 
              key={item.id}
              className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between space-y-3 group shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div 
                    className="p-2.5 rounded-xl border flex items-center justify-center group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: `${item.accentColor}14`, color: item.accentColor, borderColor: `${item.accentColor}30` }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                    {item.badge}
                  </span>
                </div>

                <h4 className="text-base font-extrabold text-slate-900 mb-1">
                  {item.title}
                </h4>

                <p className="text-xs font-semibold text-slate-700 mb-2">
                  {item.summary}
                </p>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.detail}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px]">
                <span className="font-mono text-cyan-800 font-bold">
                  {item.stats}
                </span>
                <span className="text-slate-400 font-medium">
                  {item.pdfPage}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
