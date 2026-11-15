# ClimateScope — Interactive Global Warming Analytics Dashboard

**ClimateScope** is a modern, responsive, and scientifically rigorous climate analytics web application built with **React**, **Vite**, **Tailwind CSS**, **Zustand**, and **Recharts**, featuring an elegant **crisp white theme** with high-contrast typography and vibrant climate color accents.

The platform visualizes and compares global climate indicators over the last 10 completed calendar years (**2016–2025**), empowering users to select any two observation years to explore how planetary vital signs have evolved across the decade.

---

## 🎨 Design & White Theme

- **Clean White Aesthetics**: Pure white surfaces (`#FFFFFF`), subtle slate backgrounds (`#F8FAFC`), soft borders (`#E2E8F0`), and restrained shadows (`shadow-sm`, `shadow-md`).
- **High Contrast & Readability**: Deep slate headings (`text-slate-900`), balanced descriptions (`text-slate-600`), and tabular mono numerals (`font-mono`).
- **Vibrant Accent Palette**:
  - **Teal & Cyan**: Ocean and atmospheric signals (`#0D9488`, `#0891B2`)
  - **Orange & Amber**: Warming trends and thermal expansion (`#EA580C`, `#F59E0B`)
  - **Sky Blue & Purple**: Emissions and cryosphere dynamics (`#0284C7`, `#9333EA`)
- **Theme Flexibility**: Built with white theme as default, with a quick-switch toggle available in the header.

---

## 📊 Recharts Data Visualizations

ClimateScope leverages **Recharts** for rich, responsive data visualization:

1. **Interactive 10-Year Historical Trend Chart**:
   - Area and line visualizations for all 6 climate metrics.
   - Dual-year highlighting: Displays distinct pulsating markers and reference lines for the **Primary Year** and **Comparison Year**.
   - Custom white-theme interactive tooltips showing exact values, preliminary/final status, and deltas relative to the reference year.
2. **Direct Year-by-Year Comparison Bar Chart**:
   - Side-by-side comparative column chart displaying the two chosen observation years across all six indicators.
3. **10-Year Mini Sparklines**:
   - Pixel-crisp sparklines on each of the six KPI cards highlighting the exact dual-year positions.
4. **All 6 Indicators Grid View**:
   - Simultaneous multi-chart overview allowing users to view all planetary vital signs at a glance.

---

## 🌍 The 6 Core Climate Indicators

ClimateScope tracks six planetary vital signs sourced directly from authoritative global scientific archives:

| Indicator | Standard Unit | Authoritative Source | Reference Baseline / Scope | % Change Scientifically Sound? |
| :--- | :--- | :--- | :--- | :--- |
| **Global Temperature Anomaly** | `°C` | **NASA GISTEMP** (Goddard Institute for Space Studies) | 1951–1980 climatological baseline | ❌ **No** (Baseline anomaly; delta in °C is the only valid metric) |
| **Atmospheric CO₂ Concentration** | `ppm` | **NOAA Global Monitoring Laboratory** | Globally averaged marine surface air | ✅ **Yes** (Absolute physical mole fraction) |
| **Global CO₂ Emissions** | `GtCO₂/year` | **Global Carbon Project / Our World in Data** | Fossil fuel combustion & cement (excludes land use) | ✅ **Yes** (Physical annual flux rate) |
| **Global Mean Sea Level (GMSL)** | `mm` | **NASA Satellite Altimetry** (TOPEX, Jason, Sentinel-6) | 1993 baseline (start of precision altimetry) | ❌ **No** (Height relative to arbitrary baseline; delta in mm) |
| **Arctic Sea Ice Extent** | `million km²` | **National Snow and Ice Data Center (NSIDC)** | September monthly average (annual minimum) | ✅ **Yes** (Physical spatial surface area) |
| **Global Ocean Heat Content** | `10²² Joules` | **NOAA NCEI** (Argo Profiling Array) | Upper 2,000m layer anomaly (rel. 1971–2000) | ❌ **No** (Anomaly energy unit; absolute delta in 10²² J / ZJ) |

---

## 🔬 Scientific Data Integrity & Mathematical Rules

1. **Anomaly vs. Physical Quantity Distinction**:
   - Temperature anomalies and sea levels are referenced to historic baseline periods (1951–1980 and 1993, respectively). Calculating a percentage change on an anomaly relative to an arbitrary baseline creates mathematical distortions. ClimateScope strictly enforces **absolute deltas** ($\Delta\text{°C}$ and $\Delta\text{mm}$) for these indicators.
   - For physical ratio scales such as atmospheric $\text{CO}_2$ concentration ($\text{ppm}$), annual emissions ($\text{GtCO}_2/\text{year}$), and Arctic sea ice extent ($\text{million km}^2$), proportional percentage changes ($\%$) are fully calculated and displayed.

2. **Consistent Observations**:
   - Arctic sea ice strictly uses the **September monthly mean** for every year, eliminating single-day weather noise and ensuring apples-to-apples multi-year comparisons.
   - Global $\text{CO}_2$ emissions isolate fossil-fuel combustion and industrial processes to prevent masking of anthropogenic trends by volatile land-use change estimates.

3. **Status Transparency**:
   - Completed calendar years 2016 through 2024 are marked as **Final** peer-reviewed values.
   - Year 2025 values are clearly badged as **Preliminary** observational consensus updates.

---

## 🛠️ Technology Stack

- **React 18** + **Vite 6** (Blazing-fast build & HMR)
- **Zustand 5** (Lightweight global state management without Context/Redux boilerplate)
- **Recharts 2.15** (Responsive time-series and comparative bar charts)
- **Tailwind CSS 3** (Custom white theme styling with subtle contrast surfaces)
- **Lucide React** (Clean scientific iconography)

---

## ⚡ Installation & Execution

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 3. Run Automated Verification Tests
```bash
npm test
```
Executes all 51 automated unit and data integrity tests.

### 4. Build for Production
```bash
npm run build
```
Generates an optimized production bundle in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```
