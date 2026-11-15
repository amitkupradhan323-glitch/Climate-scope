# ClimateScope — Interactive Global Warming Analytics Dashboard

**ClimateScope** is a modern, responsive, and scientifically rigorous climate analytics web application built with **React**, **Vite**, **Tailwind CSS**, **Zustand**, and **Recharts**, featuring an elegant **crisp white theme** with high-contrast typography, fixed top year controls, and rich data visualizations.

The platform visualizes and compares global climate indicators over the last 10 completed calendar years (**2016–2025**), empowering users to select any two observation years to explore how planetary vital signs have evolved across the decade.

🌐 **Live Deployment**: [https://amitkupradhan323-glitch.github.io/Climate-scope/](https://amitkupradhan323-glitch.github.io/Climate-scope/)  
📦 **GitHub Repository**: [https://github.com/amitkupradhan323-glitch/Climate-scope](https://github.com/amitkupradhan323-glitch/Climate-scope)

---

## 🎨 Design & White Theme

- **Fixed Top Year Changing Section**: The year selection controls remain pinned to the top of the viewport (`sticky top-14 sm:top-16 z-40`) with a blur backdrop and drop shadow, keeping the Primary Year, Compare Year, Swap, and Presets accessible while the dashboard scrolls underneath.
- **Clean White Aesthetics**: Pure white surfaces (`#FFFFFF`), subtle slate backgrounds (`#F8FAFC`), soft borders (`#E2E8F0`), and restrained shadows (`shadow-sm`, `shadow-md`).
- **High Contrast & Readability**: Deep slate headings (`text-slate-900`), balanced descriptions (`text-slate-600`), and tabular mono numerals (`font-mono`).
- **Vibrant Accent Palette**:
  - **Teal & Cyan**: Ocean and atmospheric signals (`#0D9488`, `#0891B2`)
  - **Orange & Amber**: Warming trends and thermal expansion (`#EA580C`, `#F59E0B`)
  - **Sky Blue & Purple**: Emissions and cryosphere dynamics (`#0284C7`, `#9333EA`)
- **Theme Flexibility**: Built with white theme as default, with a quick-switch toggle available in the header.

---

## 📊 Recharts Data Visualizations

1. **Interactive 10-Year Historical Trend Chart (`TrendChart.jsx`)**:
   - Area and line visualizations for all 6 climate metrics.
   - Dual-year highlighting: Displays distinct pulsating markers and reference lines for the **Primary Year** and **Comparison Year**.
   - Custom white-theme interactive tooltips showing exact values, preliminary/final status, and deltas relative to the reference year.
2. **Direct Year-by-Year Comparison Bar Graph (`ClimateBarChart.jsx`)**:
   - Side-by-side comparative column chart displaying the two chosen observation years across all six indicators.
   - Indicator delta divergence bars showing net physical shifts ($\Delta$).
3. **Planetary Proportions & Carbon Shares (Pie Chart - `ClimatePieChart.jsx`)**:
   - Fossil fuel $\text{CO}_2$ emissions breakdown by fuel type (Coal, Oil, Natural Gas, Cement).
   - Earth's planetary heat inventory donut chart (Upper Ocean 64%, Deep Ocean 25%, Land 6%, Ice Melt 4%, Atmosphere 1%).
4. **10-Year Mini Sparklines (`SparklineChart.jsx`)**:
   - Pixel-crisp sparklines on each of the six KPI cards highlighting the exact dual-year positions.

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

## 🚀 GitHub Pages Deployment Setup

### Quick Setup in 2 Simple Steps:

1. Open your repository on GitHub:
   [https://github.com/amitkupradhan323-glitch/Climate-scope/settings/pages](https://github.com/amitkupradhan323-glitch/Climate-scope/settings/pages)
2. Under **"Build and deployment"** > **"Source"**:
   - Select: **Deploy from a branch**
   - Branch: **`gh-pages`**
   - Folder: **`/ (root)`**
   - Click **Save**!

> **Why this works**: By deploying from the `gh-pages` branch, you completely avoid the *"Branch main is not allowed to deploy to github-pages due to environment protection rules"* error. The GitHub Action in `.github/workflows/deploy.yml` automatically builds the app and updates the `gh-pages` branch on every push to `main`!

### Alternatively (If you want to use the GitHub Actions environment):
If you prefer setting Source to **GitHub Actions**, allow `main` in the environment settings:
1. Go to **Settings** > **Environments** > click on **`github-pages`**.
2. Under **Deployment branches**, click **Add deployment branch rule**, type `main`, and click **Add rule**.
3. Re-run the failed workflow.

---

## ⚡ Local Installation & Execution

```powershell
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Run automated verification test suite (83 assertions)
npm test

# 4. Build for production
npm run build

# 5. Preview production build locally
npm run preview
```
