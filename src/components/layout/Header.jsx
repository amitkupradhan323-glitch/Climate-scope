import React from 'react';
import { 
  Globe2, 
  Layers, 
  BarChart2, 
  BookOpen,
  PieChart as PieIcon,
  RotateCw,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { useClimateStore } from '../../store/useClimateStore';

export default function Header() {
  const activeView = useClimateStore((state) => state.activeView);
  const setActiveView = useClimateStore((state) => state.setActiveView);
  const theme = useClimateStore((state) => state.theme);
  const toggleTheme = useClimateStore((state) => state.toggleTheme);

  const handleNavClick = (viewId, elementId) => {
    setActiveView(viewId);
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-xs h-14 sm:h-16 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-sky-500 p-[1.5px] shadow-sm">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Globe2 className="w-4 h-4 text-cyan-600 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900">
                  Climate<span className="text-cyan-600">Scope</span>
                </h1>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200 uppercase tracking-wider">
                  Our Vibrant Planet
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links & Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <nav className="flex items-center gap-1" aria-label="Dashboard Navigation">
              
              <button
                onClick={() => handleNavClick('overview', 'overview-section')}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeView === 'overview'
                    ? 'bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Vital Signs</span>
                <span className="md:hidden">Overview</span>
              </button>

              <button
                onClick={() => handleNavClick('trends', 'trends-section')}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeView === 'trends'
                    ? 'bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Trends</span>
              </button>

              <button
                onClick={() => handleNavClick('charts', 'charts-section')}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeView === 'charts'
                    ? 'bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <PieIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Bars & Pies</span>
                <span className="sm:hidden">Charts</span>
              </button>

              <button
                onClick={() => handleNavClick('engine', 'engine-section')}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeView === 'engine'
                    ? 'bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Warming Engine</span>
                <span className="sm:hidden">Science</span>
              </button>

              <button
                onClick={() => handleNavClick('solutions', 'solutions-section')}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeView === 'solutions'
                    ? 'bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Solutions</span>
              </button>

              <button
                onClick={() => handleNavClick('about', 'about-section')}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeView === 'about'
                    ? 'bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">About Data</span>
              </button>

            </nav>

            {/* Optional Theme Toggle */}
            <div className="pl-1 sm:pl-2 border-l border-slate-200">
              <button
                onClick={toggleTheme}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                aria-label="Toggle theme"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                {theme === 'light' ? (
                  <Moon className="w-4 h-4 text-slate-600" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
