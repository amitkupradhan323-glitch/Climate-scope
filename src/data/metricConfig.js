/**
 * Configuration and scientific metadata for ClimateScope indicators.
 * Contains definitions, source attributions, baselines, formatting rules,
 * and scientific guidance on whether percentage change is mathematically sound.
 */

export const METRIC_CONFIG = {
  temperatureAnomaly: {
    id: 'temperatureAnomaly',
    name: 'Global Temperature Anomaly',
    shortName: 'Temp Anomaly',
    unit: '°C',
    source: 'NASA GISTEMP',
    sourceOrg: 'NASA Goddard Institute for Space Studies (GISS)',
    sourceUrl: 'https://data.giss.nasa.gov/gistemp/',
    baseline: '1951–1980 mean',
    depthOrScope: 'Surface air & sea surface temperature',
    decimals: 2,
    allowPercentage: false, // Percentage change of a temperature anomaly (relative to arbitrary baseline) is scientifically invalid.
    percentageNotice: 'Baseline anomaly: percentage changes are mathematically non-meaningful.',
    invertTrendPolarity: false, // higher = warmer (concerning)
    color: '#F97316', // Orange
    gradientFrom: '#EA580C',
    gradientTo: '#F97316',
    iconName: 'Thermometer',
    description:
      'The difference in global average surface temperature compared to the 1951–1980 baseline. A positive anomaly indicates temperatures warmer than the reference period.',
    scientificSignificance:
      'Temperature anomalies provide a more accurate metric than absolute global temperature because anomalies correlate across distances up to 1,200 km, canceling out local elevation and weather biases.',
    whyItMatters:
      'Every fraction of a degree amplifies climate extremes, heatwaves, droughts, agricultural stress, and shifts in precipitation patterns worldwide.'
  },

  atmosphericCO2: {
    id: 'atmosphericCO2',
    name: 'Atmospheric CO₂ Concentration',
    shortName: 'CO₂ Concentration',
    unit: 'ppm',
    source: 'NOAA Global Monitoring Laboratory',
    sourceOrg: 'NOAA GML Carbon Cycle Greenhouse Gases Group',
    sourceUrl: 'https://gml.noaa.gov/ccgg/trends/',
    baseline: 'Globally averaged marine surface air',
    depthOrScope: 'Global tropospheric background atmosphere',
    decimals: 2,
    allowPercentage: true, // Physical concentration (parts per million), valid for % change.
    percentageNotice: null,
    invertTrendPolarity: false, // higher = more greenhouse forcing
    color: '#06B6D4', // Cyan
    gradientFrom: '#0891B2',
    gradientTo: '#06B6D4',
    iconName: 'CloudRain',
    description:
      'The globally averaged mole fraction of atmospheric carbon dioxide, expressed in parts per million (ppm). One ppm corresponds to ~2.13 billion tonnes of carbon in the atmosphere.',
    scientificSignificance:
      'Atmospheric CO₂ is the principal long-lived driver of modern climate change, remaining in the atmosphere for centuries to millennia after emission.',
    whyItMatters:
      'Pre-industrial CO₂ was ~280 ppm. Crossing 420+ ppm puts atmospheric greenhouse forcing at levels unseen in at least 3 to 4 million years (Pliocene Epoch).'
  },

  co2Emissions: {
    id: 'co2Emissions',
    name: 'Global CO₂ Emissions',
    shortName: 'Annual Emissions',
    unit: 'GtCO₂/year',
    source: 'Global Carbon Project',
    sourceOrg: 'Global Carbon Project / Our World in Data',
    sourceUrl: 'https://globalcarbonbudget.org/',
    baseline: 'Fossil fuel combustion & industrial processes (excludes land-use change)',
    depthOrScope: 'Global anthropogenic fossil & industrial fluxes',
    decimals: 2,
    allowPercentage: true, // Physical flux rate, valid for % change.
    percentageNotice: null,
    invertTrendPolarity: false, // higher = higher emissions
    color: '#38BDF8', // Sky Blue
    gradientFrom: '#0284C7',
    gradientTo: '#38BDF8',
    iconName: 'Factory',
    description:
      'Annual global emissions of carbon dioxide originating from fossil fuel burning (coal, oil, natural gas) and industrial processes (cement manufacturing). Excludes land-use change emissions.',
    scientificSignificance:
      'Represents humanity’s annual primary input into the global carbon cycle. Reaching international climate targets requires net anthropogenic CO₂ emissions to fall toward zero.',
    whyItMatters:
      'Despite pledges and renewable energy deployments, global fossil combustion has continued near record highs, driving cumulative atmospheric accumulation.'
  },

  seaLevel: {
    id: 'seaLevel',
    name: 'Global Mean Sea Level',
    shortName: 'Mean Sea Level',
    unit: 'mm',
    source: 'NASA Satellite Altimetry',
    sourceOrg: 'NASA Jet Propulsion Laboratory & Goddard Space Flight Center',
    sourceUrl: 'https://climate.nasa.gov/vital-signs/sea-level/',
    baseline: '1993 reference baseline (TOPEX/Poseidon start = 0 mm)',
    depthOrScope: 'Global open ocean altimetry (66°S to 66°N)',
    decimals: 1,
    allowPercentage: false, // Anomaly relative to arbitrary 1993 starting point.
    percentageNotice: 'Height relative to 1993 baseline: absolute change (mm) is the standard scientific unit.',
    invertTrendPolarity: false, // higher = higher sea level
    color: '#14B8A6', // Teal
    gradientFrom: '#0D9488',
    gradientTo: '#14B8A6',
    iconName: 'Waves',
    description:
      'The global average height of the ocean surface observed continuously by precision radar altimeters on TOPEX/Poseidon, Jason-1, Jason-2, Jason-3, and Sentinel-6 Michael Freilich.',
    scientificSignificance:
      'Sea level rise integrates two core climate responses: thermal expansion of seawater as it warms (~one-third) and the meltwater mass added by land-based ice sheets and mountain glaciers (~two-thirds).',
    whyItMatters:
      'Rising seas accelerate coastal inundation, high-tide flooding, saltwater intrusion into aquifers, and coastal infrastructure erosion worldwide.'
  },

  arcticSeaIce: {
    id: 'arcticSeaIce',
    name: 'Arctic Sea Ice Extent',
    shortName: 'Arctic Sea Ice',
    unit: 'million km²',
    source: 'National Snow and Ice Data Center (NSIDC)',
    sourceOrg: 'NSIDC / University of Colorado Boulder / NASA',
    sourceUrl: 'https://nsidc.org/arcticseaicenews/',
    baseline: 'September monthly mean (minimum seasonal month)',
    depthOrScope: 'Arctic Ocean areas with ≥15% sea ice concentration',
    decimals: 2,
    allowPercentage: true, // Physical surface area, valid for % change.
    percentageNotice: null,
    invertTrendPolarity: true, // DECREASE is adverse (loss of sea ice)
    color: '#A855F7', // Purple/Violet
    gradientFrom: '#9333EA',
    gradientTo: '#C084FC',
    iconName: 'Snowflake',
    description:
      'The total area of the Arctic Ocean covered by at least 15% sea ice during the month of September—the annual seasonal minimum following summer melt. Uses monthly mean to avoid single-day weather noise.',
    scientificSignificance:
      'Sea ice acts as the Earth’s giant thermal mirror, reflecting up to 80% of incoming solar radiation. As ice melts, dark ocean water absorbs 90% of heat, triggering Arctic amplification.',
    whyItMatters:
      'September Arctic sea ice has declined by over 12% per decade relative to the 1981–2010 baseline, reshaping polar ecosystems and influencing Northern Hemisphere jet stream stability.'
  },

  oceanHeatContent: {
    id: 'oceanHeatContent',
    name: 'Global Ocean Heat Content',
    shortName: 'Ocean Heat Content',
    unit: '10²² Joules',
    source: 'NOAA NCEI',
    sourceOrg: 'NOAA National Centers for Environmental Information',
    sourceUrl: 'https://www.ncei.noaa.gov/access/global-ocean-heat-content/',
    baseline: '0–2000m layer heat anomaly relative to 1971–2000',
    depthOrScope: 'Upper 2,000 meters across all global ocean basins',
    decimals: 1,
    allowPercentage: false, // Heat anomaly relative to 1971-2000 baseline; absolute change in 10²² J is the standard scientific unit.
    percentageNotice: 'Anomaly relative to 1971–2000 baseline: represented in 10²² Joules (10 Zettajoules).',
    invertTrendPolarity: false, // higher = warmer oceans
    color: '#EC4899', // Pink / Rose
    gradientFrom: '#DB2777',
    gradientTo: '#F472B6',
    iconName: 'Flame',
    description:
      'The anomaly of total thermal energy stored in the upper 2,000 meters of the global ocean, measured in units of 10²² Joules (equivalent to 10 Zettajoules). Measured via the international Argo profiling float array.',
    scientificSignificance:
      'The ocean absorbs more than 90% of the Earth system’s excess energy imbalance caused by greenhouse gases. Ocean Heat Content is the truest single metric of ongoing planetary thermal accumulation.',
    whyItMatters:
      'Warmer oceans supercharge tropical cyclones, accelerate ice shelf melting from below, disrupt marine ecosystems (coral bleaching), and drive long-term thermal sea level rise.'
  }
};

export const METRIC_LIST = Object.values(METRIC_CONFIG);

export const DATASET_META = {
  coverageYears: '2016–2025',
  startYear: 2016,
  endYear: 2025,
  lastUpdated: 'November 2025',
  version: '2025.11',
  globalScope: 'Global Terrestrial & Marine Monitoring System'
};
