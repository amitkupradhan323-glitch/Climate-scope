import { create } from 'zustand';

/**
 * Zustand store for ClimateScope dashboard and exam state.
 * Manages user interaction state: selected years, active metric,
 * current page/view (dashboard vs exam), theme, and modal state.
 */
export const useClimateStore = create((set, get) => ({
  // Current Top-Level View: 'dashboard' | 'exam'
  currentView: 'dashboard',

  // Default selected years
  selectedYear: 2025,
  comparisonYear: 2016,

  // Active metric for historical trend charts
  activeMetric: 'temperatureAnomaly',

  // Active navigation tab within dashboard
  activeView: 'overview',

  // Active metric for detail/info modal
  infoMetricId: null,

  // Theme: default is 'light' (white theme)
  theme: 'light',

  // Actions
  setCurrentView: (view) => {
    set({ currentView: view });
    // Update window hash so direct navigation and browser history work
    if (view === 'exam') {
      window.location.hash = 'exam';
    } else {
      window.location.hash = '';
    }
  },

  setSelectedYear: (year) => {
    const numYear = Number(year);
    const { comparisonYear } = get();

    if (numYear === comparisonYear) {
      return;
    }
    set({ selectedYear: numYear });
  },

  setComparisonYear: (year) => {
    const numYear = Number(year);
    const { selectedYear } = get();

    if (numYear === selectedYear) {
      return;
    }
    set({ comparisonYear: numYear });
  },

  swapYears: () => {
    const { selectedYear, comparisonYear } = get();
    set({
      selectedYear: comparisonYear,
      comparisonYear: selectedYear
    });
  },

  setActiveMetric: (metricId) => {
    set({ activeMetric: metricId });
  },

  setActiveView: (view) => {
    set({ activeView: view });
  },

  setInfoMetricId: (metricId) => {
    set({ infoMetricId: metricId });
  },

  closeInfoModal: () => {
    set({ infoMetricId: null });
  },

  setTheme: (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    set({ theme });
  },

  toggleTheme: () => {
    const current = get().theme;
    const next = current === 'light' ? 'dark' : 'light';
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    set({ theme: next });
  }
}));
