import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MetricInfoModal from '../common/MetricInfoModal';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-900">
      {/* Top Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 sm:space-y-10">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Metric Info Modal */}
      <MetricInfoModal />
    </div>
  );
}
