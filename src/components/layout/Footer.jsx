import React from 'react';
import { Globe2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-100/80 text-slate-600 py-10 mt-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & mission */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-6 h-6 rounded-lg bg-cyan-100 border border-cyan-300 flex items-center justify-center text-cyan-700">
                <Globe2 className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-bold text-slate-900">ClimateScope</span>
              <span className="text-[11px] text-slate-500 font-mono">v1.0</span>
            </div>
            <p className="text-slate-500 max-w-md">
              An open, transparent global climate data dashboard visualizing 10 completed calendar years of planetary vital signs.
            </p>
          </div>

          {/* Sources and Partners */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600 font-medium">
            <span className="text-slate-400 font-semibold">Data Agencies:</span>
            <a 
              href="https://data.giss.nasa.gov/gistemp/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-cyan-700 transition-colors"
            >
              NASA GISS
            </a>
            <span>•</span>
            <a 
              href="https://gml.noaa.gov/ccgg/trends/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-cyan-700 transition-colors"
            >
              NOAA GML
            </a>
            <span>•</span>
            <a 
              href="https://globalcarbonbudget.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-cyan-700 transition-colors"
            >
              Global Carbon Project
            </a>
            <span>•</span>
            <a 
              href="https://nsidc.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-cyan-700 transition-colors"
            >
              NSIDC
            </a>
            <span>•</span>
            <a 
              href="https://www.ncei.noaa.gov/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-cyan-700 transition-colors"
            >
              NOAA NCEI
            </a>
          </div>

        </div>

        {/* Disclaimer / Bottom row */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>
            Curated strictly from published observational repositories. No synthetic values or unverified projections.
          </p>
          <div className="flex items-center gap-1 font-medium">
            <span>Built for planetary awareness & climate literacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
