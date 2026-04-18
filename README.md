# COVID Analytics Dashboard

🚀 **Live Demo:** [View Dashboard](https://covid-dashboard-v21.vercel.app/)

A production-grade React data science dashboard with live COVID-19 data, interactive charts, trend analysis, machine learning forecasting, and AI-powered insights.

---

## 🧠 Tech Stack

* **React 18** — UI framework
* **Recharts** — data visualization
* **disease.sh API** — real-time COVID data
* **Claude API** — AI-powered analysis

---

## 📂 Project Structure

```
src/
├── api/
│   ├── covidApi.js
│   └── claudeApi.js
├── components/
│   ├── AISummary.jsx
│   ├── BarChart.jsx
│   ├── ChartCard.jsx
│   ├── CountryTable.jsx
│   ├── ForecastChart.jsx
│   ├── InsightsPanel.jsx
│   ├── LineChart.jsx
│   ├── MetricCard.jsx
│   ├── Sidebar.jsx
│   └── Topbar.jsx
├── hooks/
│   ├── useAISummary.js
│   ├── useCovidData.js
│   └── useForecast.js
├── pages/
│   ├── CountriesPage.jsx
│   ├── ForecastPage.jsx
│   ├── OverviewPage.jsx
│   └── TrendsPage.jsx
├── styles/
│   └── global.css
├── utils/
│   └── formatters.js
├── App.jsx
└── index.js
```

---

## ⚙️ Getting Started

```bash
npm install
npm start
```

App runs on: **http://localhost:3000**

---

## 🚀 Features

* 🌍 Live COVID data (no API key required)
* 🌐 23 country filters (including global view)
* 📊 Interactive charts (cases, deaths, trends)
* 📈 4 dashboard views:

  * Overview
  * Trends
  * Forecast
  * Countries
* 🧮 6 key metrics:

  * Cases, Deaths, Recovered, Active, CFR, 7-day average
* 🧠 AI-powered insights (Claude integration)
* 📉 ML Forecasting (Linear Regression model)
* 📅 Time-series analysis (daily + cumulative trends)

---

## 🤖 AI Analysis (Optional)

The **"Generate Analysis"** button uses Claude API.

To enable locally:

```js
// src/api/claudeApi.js
'x-api-key': 'YOUR_API_KEY',
'anthropic-version': '2023-06-01',
'anthropic-dangerous-direct-browser-access': 'true',
```

⚠️ For production, use a backend proxy to protect your API key.

---

## 📊 Data Source

COVID-19 data provided by:
👉 https://disease.sh


---

## 💡 Future Improvements

* Backend integration for secure AI usage
* Advanced forecasting models (ARIMA / LSTM)
* User personalization & saved views
* Mobile responsiveness improvements

---

## ⭐ Final Note

This project demonstrates full-stack thinking — combining **data science, machine learning, and frontend engineering** into a real-world deployed application.

---
