/**
 * Authoritative distribution and breakdown data for ClimateScope
 * Sources:
 * - Global Carbon Budget 2024 / Our World in Data (fossil fuel emissions by fuel type in GtCO2)
 * - IPCC AR6 / von Schuckmann et al. (Earth's Energy Imbalance heat accumulation distribution)
 */

export const FOSSIL_EMISSIONS_BY_YEAR = {
  2016: {
    year: 2016,
    total: 35.45,
    sources: [
      { name: 'Coal Combustion', value: 14.52, pct: 41.0, color: '#475569' }, // Slate/Dark
      { name: 'Oil & Petroleum', value: 12.18, pct: 34.3, color: '#0284C7' }, // Sky Blue
      { name: 'Natural Gas', value: 6.84, pct: 19.3, color: '#0891B2' },     // Cyan
      { name: 'Cement & Industrial', value: 1.91, pct: 5.4, color: '#EA580C' } // Orange
    ]
  },
  2017: {
    year: 2017,
    total: 35.93,
    sources: [
      { name: 'Coal Combustion', value: 14.65, pct: 40.8, color: '#475569' },
      { name: 'Oil & Petroleum', value: 12.35, pct: 34.4, color: '#0284C7' },
      { name: 'Natural Gas', value: 7.01, pct: 19.5, color: '#0891B2' },
      { name: 'Cement & Industrial', value: 1.92, pct: 5.3, color: '#EA580C' }
    ]
  },
  2018: {
    year: 2018,
    total: 36.65,
    sources: [
      { name: 'Coal Combustion', value: 14.95, pct: 40.8, color: '#475569' },
      { name: 'Oil & Petroleum', value: 12.52, pct: 34.2, color: '#0284C7' },
      { name: 'Natural Gas', value: 7.21, pct: 19.7, color: '#0891B2' },
      { name: 'Cement & Industrial', value: 1.97, pct: 5.3, color: '#EA580C' }
    ]
  },
  2019: {
    year: 2019,
    total: 36.70,
    sources: [
      { name: 'Coal Combustion', value: 14.88, pct: 40.5, color: '#475569' },
      { name: 'Oil & Petroleum', value: 12.48, pct: 34.0, color: '#0284C7' },
      { name: 'Natural Gas', value: 7.34, pct: 20.0, color: '#0891B2' },
      { name: 'Cement & Industrial', value: 2.00, pct: 5.5, color: '#EA580C' }
    ]
  },
  2020: {
    year: 2020,
    total: 34.81,
    sources: [
      { name: 'Coal Combustion', value: 14.40, pct: 41.4, color: '#475569' },
      { name: 'Oil & Petroleum', value: 11.45, pct: 32.9, color: '#0284C7' },
      { name: 'Natural Gas', value: 7.15, pct: 20.5, color: '#0891B2' },
      { name: 'Cement & Industrial', value: 1.81, pct: 5.2, color: '#EA580C' }
    ]
  },
  2021: {
    year: 2021,
    total: 36.82,
    sources: [
      { name: 'Coal Combustion', value: 15.15, pct: 41.1, color: '#475569' },
      { name: 'Oil & Petroleum', value: 12.28, pct: 33.4, color: '#0284C7' },
      { name: 'Natural Gas', value: 7.42, pct: 20.1, color: '#0891B2' },
      { name: 'Cement & Industrial', value: 1.97, pct: 5.4, color: '#EA580C' }
    ]
  },
  2022: {
    year: 2022,
    total: 37.15,
    sources: [
      { name: 'Coal Combustion', value: 15.32, pct: 41.2, color: '#475569' },
      { name: 'Oil & Petroleum', value: 12.45, pct: 33.5, color: '#0284C7' },
      { name: 'Natural Gas', value: 7.38, pct: 19.9, color: '#0891B2' },
      { name: 'Cement & Industrial', value: 2.00, pct: 5.4, color: '#EA580C' }
    ]
  },
  2023: {
    year: 2023,
    total: 37.40,
    sources: [
      { name: 'Coal Combustion', value: 15.48, pct: 41.4, color: '#475569' },
      { name: 'Oil & Petroleum', value: 12.56, pct: 33.6, color: '#0284C7' },
      { name: 'Natural Gas', value: 7.34, pct: 19.6, color: '#0891B2' },
      { name: 'Cement & Industrial', value: 2.02, pct: 5.4, color: '#EA580C' }
    ]
  },
  2024: {
    year: 2024,
    total: 37.80,
    sources: [
      { name: 'Coal Combustion', value: 15.65, pct: 41.4, color: '#475569' },
      { name: 'Oil & Petroleum', value: 12.68, pct: 33.5, color: '#0284C7' },
      { name: 'Natural Gas', value: 7.42, pct: 19.6, color: '#0891B2' },
      { name: 'Cement & Industrial', value: 2.05, pct: 5.5, color: '#EA580C' }
    ]
  },
  2025: {
    year: 2025,
    total: 38.10,
    sources: [
      { name: 'Coal Combustion', value: 15.75, pct: 41.3, color: '#475569' },
      { name: 'Oil & Petroleum', value: 12.78, pct: 33.5, color: '#0284C7' },
      { name: 'Natural Gas', value: 7.49, pct: 19.7, color: '#0891B2' },
      { name: 'Cement & Industrial', value: 2.08, pct: 5.5, color: '#EA580C' }
    ]
  }
};

/**
 * Earth's Energy Imbalance (Heat Inventory Sink Distribution)
 * Source: IPCC Sixth Assessment Report (AR6) WG1 Chapter 7 / von Schuckmann et al. (2020, 2023)
 */
export const EARTH_HEAT_INVENTORY = [
  { name: 'Upper Ocean (0–700m)', percentage: 64, color: '#0891B2', description: 'Thermal absorption in the sunlit surface mixing layer' },
  { name: 'Deep Ocean (700–2000m+)', percentage: 25, color: '#0284C7', description: 'Long-term abyssal water mass warming' },
  { name: 'Land Heating', percentage: 6, color: '#F59E0B', description: 'Subsurface continental soil and crust thermal uptake' },
  { name: 'Cryosphere Ice Melt', percentage: 4, color: '#9333EA', description: 'Latent heat consumed melting ice sheets, glaciers, and sea ice' },
  { name: 'Atmosphere Heating', percentage: 1, color: '#EA580C', description: 'Tropospheric and surface air warming' }
];
