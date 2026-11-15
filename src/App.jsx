import React, { useEffect } from 'react';
import { useClimateStore } from './store/useClimateStore';
import DashboardLayout from './components/layout/DashboardLayout';
import HeroBanner from './components/layout/HeroBanner';
import YearSelector from './components/dashboard/YearSelector';
import PlanetDiagnosis from './components/narrative/PlanetDiagnosis';
import ClimateOverview from './components/dashboard/ClimateOverview';
import ClimateInsights from './components/dashboard/ClimateInsights';
import TrendChart from './components/charts/TrendChart';
import ClimateBarChart from './components/charts/ClimateBarChart';
import ClimatePieChart from './components/charts/ClimatePieChart';
import WarmingEngine from './components/narrative/WarmingEngine';
import ImpactExplorer from './components/narrative/ImpactExplorer';
import SolutionsMatrix from './components/narrative/SolutionsMatrix';
import ComparisonTable from './components/dashboard/ComparisonTable';
import AboutDataSection from './components/dashboard/AboutDataSection';
import ClimateExam from './components/exam/ClimateExam';

export default function App() {
  const currentView = useClimateStore((state) => state.currentView);
  const setCurrentView = useClimateStore((state) => state.setCurrentView);

  // Sync hash routing (e.g. #exam opens ClimateExam directly)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#exam') {
        setCurrentView('exam');
      } else if (!window.location.hash || window.location.hash === '#') {
        setCurrentView('dashboard');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setCurrentView]);

  // If exam view is active, render the dedicated Exam page
  if (currentView === 'exam') {
    return <ClimateExam />;
  }

  // Otherwise render full interactive analytics dashboard
  return (
    <DashboardLayout>
      {/* 1. Hero Introduction Banner */}
      <HeroBanner />

      {/* 2. Fixed Sticky Top Year Selector */}
      <YearSelector />

      {/* 3. Planetary Diagnosis & Clinical Fever (PDF Pages 2, 4, 5) */}
      <PlanetDiagnosis />

      {/* 4. Core Climate Vital Signs (The 6 KPI Cards) */}
      <ClimateOverview />

      {/* 5. Dynamic Observational Climate Insights */}
      <ClimateInsights />

      {/* 6. Historical Trend Analytics (Interactive 10-Year Recharts Visualizations) */}
      <TrendChart />

      {/* 7. Bar Graph & Pie Chart Visual Analytics */}
      <div id="charts-section" className="space-y-8 sm:space-y-10">
        <ClimateBarChart />
        <ClimatePieChart />
      </div>

      {/* 8. The Warming Engine & Feedback Loops (PDF Pages 3 & 6) */}
      <div id="engine-section" className="space-y-8 sm:space-y-10">
        <WarmingEngine />
        <ImpactExplorer />
      </div>

      {/* 9. Net-Zero Pathways & Everyday Solutions (PDF Pages 11–15) */}
      <SolutionsMatrix />

      {/* 10. Year-by-Year Tabular Comparison Matrix */}
      <ComparisonTable />

      {/* 11. Scientific Provenance & Authoritative Data Archives */}
      <AboutDataSection />
    </DashboardLayout>
  );
}
