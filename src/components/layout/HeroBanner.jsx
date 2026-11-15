import React from 'react';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { getDatasetMetadata } from '../../utils/dataSelectors';

export default function HeroBanner() {
  const metadata = getDatasetMetadata();

  return (
    <div className="bg-gradient-to-b from-white via-slate-50/70 to-slate-100/50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        
        {/* Title & Subtitle */}
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[11px] font-semibold text-cyan-800 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-600 animate-ping"></span>
            <span>Global Terrestrial & Marine Monitoring System</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            The Planet, in Numbers.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Explore a decade of global climate change through interactive data and insights.
          </p>
        </div>

        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-cyan-600" />
            <span className="text-slate-500">Coverage:</span>
            <span className="font-bold text-slate-900 font-mono">
              {metadata.coverageStartYear}–{metadata.coverageEndYear}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            <span className="text-slate-500">Updated:</span>
            <span className="font-bold text-slate-900">
              {metadata.lastUpdated}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-slate-500">Dataset:</span>
            <span className="font-bold text-slate-900">NASA · NOAA · GCP</span>
          </div>
        </div>

      </div>
    </div>
  );
}
