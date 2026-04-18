# COVID Analytics Dashboard

A production-grade React data science dashboard with live COVID-19 data, interactive charts, trend analysis, ML forecasting, and AI-powered insights.

## Stack

- **React 18** — UI framework
- **Recharts** — charting library
- **disease.sh** — free public COVID-19 API (no key needed)
- **Claude API** — AI-powered analysis summaries

## Project Structure

```
src/
├── api/
│   ├── covidApi.js        # disease.sh API layer
│   └── claudeApi.js       # Anthropic Claude API
├── components/
│   ├── AISummary.jsx      # Claude-powered text analysis
│   ├── BarChart.jsx       # Recharts bar chart wrapper
│   ├── ChartCard.jsx      # Card shell for charts
│   ├── CountryTable.jsx   # Ranked country data table
│   ├── ForecastChart.jsx  # Forecast UI + controls
│   ├── InsightsPanel.jsx  # KPI insight cells
│   ├── LineChart.jsx      # Recharts line chart wrapper
│   ├── MetricCard.jsx     # Summary stat cards
│   ├── Sidebar.jsx        # Nav + country selector
│   └── Topbar.jsx         # Header bar
├── hooks/
│   ├── useAISummary.js    # Claude API state hook
│   ├── useCovidData.js    # Data fetching hook
│   └── useForecast.js     # Linear regression forecast hook
├── pages/
│   ├── CountriesPage.jsx  # Country rankings view
│   ├── ForecastPage.jsx   # Forecast model view
│   ├── OverviewPage.jsx   # Main dashboard view
│   └── TrendsPage.jsx     # Trend analysis view
├── styles/
│   └── global.css         # Full design system
├── utils/
│   └── formatters.js      # Number/date formatting utils
├── App.jsx                # Root component + routing
└── index.js               # Entry point
```

## Getting Started

```bash
npm install
npm start
```

Opens at **http://localhost:3000**

## Features

| Feature | Details |
|---|---|
| Live data | disease.sh — no API key required |
| 23 countries | Worldwide + 22 country filters |
| 4 dashboard tabs | Overview, Trends, Forecast, Countries |
| 6 metric cards | Cases, deaths, recovered, active, CFR, 7-day avg |
| Key Insights panel | Growth rate, CFR, recovery rate, peak detection |
| Trend charts | 60-day dual series (cases vs deaths) |
| Weekly buckets | 7-day aggregated bar chart |
| Cumulative view | 90-day total trajectory |
| Forecast model | OLS linear regression, 7 or 14-day window |
| Confidence band | ±15% around point estimate |
| Country table | Top 15 with CFR, cases/million, today's delta |
| AI analysis | Claude-powered 80-word epidemiological summary |

## AI Analysis (Optional)

The "Generate Analysis" button in the Insights panel calls the Anthropic API. The app works fully without it — the button simply won't return a response if the API is not reachable from the browser.

If you're running this in a local environment with a proxy or modified `claudeApi.js` to include your API key:

```js
// src/api/claudeApi.js — add to headers:
'x-api-key': 'YOUR_KEY_HERE',
'anthropic-version': '2023-06-01',
'anthropic-dangerous-direct-browser-access': 'true',
```

> Note: For production, route Claude API calls through a backend server to protect your API key.

## Data Attribution

COVID-19 data provided by [disease.sh](https://disease.sh) — Open Disease Data API.

updated