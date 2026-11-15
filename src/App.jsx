import React from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import HeroBanner from './components/layout/HeroBanner';
import YearSelector from './components/dashboard/YearSelector';
import ClimateOverview from './components/dashboard/ClimateOverview';
import ClimateInsights from './components/dashboard/ClimateInsights';
import TrendChart from './components/charts/TrendChart';
import ClimateBarChart from './components/charts/ClimateBarChart';
import ClimatePieChart from './components/charts/ClimatePieChart';
import ComparisonTable from './components/dashboard/ComparisonTable';
import AboutDataSection from './components/dashboard/AboutDataSection';

export default function App() {
  return (
    <DashboardLayout>
      {/* 1. Introductory Hero Banner */}
      <HeroBanner />

      {/* 2. Fixed / Sticky Year Selector (Pinned at top while rest scrolls) */}
      <YearSelector />

      {/* 3. Dynamic Climate Insights (Observational Deltas) */}
      <ClimateInsights />

      {/* 4. Climate KPI Statistics (6 Core Vital Sign Cards with Sparklines) */}
      <ClimateOverview />

      {/* 5. Historical Trend Analytics (Interactive 10-Year Recharts Visualizations) */}
      <TrendChart />

      {/* 6. Visual Comparative Bar Graphs (Bar Chart) */}
      <div id="charts-section" className="space-y-8 sm:space-y-10">
        <ClimateBarChart />
        <ClimatePieChart />
      </div>

      {/* 7. Year-by-Year Tabular Comparison Matrix */}
      <ComparisonTable />

      {/* 8. Scientific Provenance & About Data Section */}
      <AboutDataSection />
    </DashboardLayout>
  );
}
