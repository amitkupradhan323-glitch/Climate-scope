import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MetricInfoModal from '../common/MetricInfoModal';
import { GraduationCap, ArrowRight } from 'lucide-react';
import { useClimateStore } from '../../store/useClimateStore';

export default function DashboardLayout({ children }) {
  const setCurrentView = useClimateStore((state) => state.setCurrentView);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-900">
      {/* Top Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 sm:space-y-10">
        {children}
      </main>

      {/* Left-Side Sticky Exam Launcher Card */}
      <aside 
        aria-label="Climate Examination Launcher"
        className="fixed left-5 bottom-6 z-40 hidden sm:block animate-fadeIn"
      >
        <button
          onClick={() => setCurrentView('exam')}
          className="group flex items-center gap-3 px-3.5 py-2.5 bg-white/95 backdrop-blur-md border border-emerald-300 rounded-2xl shadow-lg hover:shadow-xl hover:border-emerald-500 hover:scale-105 transition-all text-xs font-bold text-slate-800 cursor-pointer"
          title="Take the 15-Question Climate Examination"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs group-hover:rotate-6 transition-transform">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-extrabold">Exam Section</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <div className="text-slate-900 font-extrabold text-xs">Climate Exam (15 MCQs)</div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-emerald-600 ml-1 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </aside>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Metric Info Modal */}
      <MetricInfoModal />
    </div>
  );
}
