import { useState, useMemo } from 'react';
import { useCovidData } from './hooks/useCovidData';
import { toDailySeries, toCumulativeSeries, last30 } from './utils/formatters';

import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';

import OverviewPage  from './pages/OverviewPage';
import TrendsPage    from './pages/TrendsPage';
import ForecastPage  from './pages/ForecastPage';
import CountriesPage from './pages/CountriesPage';

import './styles/global.css';

export default function App() {
  const [country, setCountry] = useState('worldwide');
  const [activeTab, setActiveTab] = useState('overview');

  const { data, loading, error, reload } = useCovidData(country);

  const derived = useMemo(() => {
    if (!data?.historical) return null;
    const { cases, deaths, recovered } = data.historical;

    const dailyCasesAll  = toDailySeries(cases);
    const dailyDeathsAll = toDailySeries(deaths);
    const dailyRecAll    = toDailySeries(recovered);
    const cumCases       = toCumulativeSeries(cases);

    return {
      dailyCases:      dailyCasesAll.values,
      dailyLabels:     dailyCasesAll.labels,
      dailyDeaths:     dailyDeathsAll.values,
      dailyRecovered:  dailyRecAll.values,
      cumulativeCases: cumCases.values,
      cumulativeLabels:cumCases.labels,
    };
  }, [data]);

  const handleCountryChange = (c) => {
    setCountry(c);
    setActiveTab('overview');
  };

  return (
    <div className="app-layout">
      <Topbar summary={data?.summary} />

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        country={country}
        setCountry={handleCountryChange}
      />

      <main className="main-content">
        {error && (
          <div className="error-box">
            ⚠ {error} &nbsp;
            <button
              onClick={reload}
              style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11 }}
            >
              Retry ↺
            </button>
          </div>
        )}

        {loading ? (
          <div className="loading-wrap">
            <div className="spinner" />
            <div>Loading {country} data…</div>
          </div>
        ) : derived ? (
          <>
            {activeTab === 'overview' && (
              <OverviewPage
                summary={data.summary}
                dailyCases={derived.dailyCases}
                dailyLabels={derived.dailyLabels}
                dailyDeaths={derived.dailyDeaths}
                country={country}
              />
            )}
            {activeTab === 'trends' && (
              <TrendsPage
                dailyCases={derived.dailyCases}
                dailyLabels={derived.dailyLabels}
                dailyDeaths={derived.dailyDeaths}
                dailyRecovered={derived.dailyRecovered}
                cumulativeCases={derived.cumulativeCases}
                cumulativeLabels={derived.cumulativeLabels}
              />
            )}
            {activeTab === 'forecast' && (
              <ForecastPage
                dailyCases={derived.dailyCases}
                dailyLabels={derived.dailyLabels}
              />
            )}
            {activeTab === 'countries' && (
              <CountriesPage topCountries={data.topCountries} />
            )}
          </>
        ) : null}
      </main>
    </div>
  );
}
