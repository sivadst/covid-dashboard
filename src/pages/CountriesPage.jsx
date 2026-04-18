import CountryTable from '../components/CountryTable';
import BarChart from '../components/BarChart';
import ChartCard from '../components/ChartCard';
import { fmtNum } from '../utils/formatters';

export default function CountriesPage({ topCountries }) {
  if (!topCountries?.length) {
    return (
      <div className="loading-wrap">
        <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
          Switch to "worldwide" to see country rankings.
        </div>
      </div>
    );
  }

  const top10 = topCountries.slice(0, 10);
  const barData = top10.map(c => ({ label: c.country.slice(0, 6), value: c.cases }));
  const deathData = top10.map(c => ({ label: c.country.slice(0, 6), value: c.deaths }));

  return (
    <>
      <div className="page-title">Country Rankings</div>
      <div className="page-subtitle">Top 15 countries · sorted by total confirmed cases</div>

      <div className="charts-row" style={{ marginBottom: 16 }}>
        <ChartCard title="Cases — Top 10" subtitle="Total confirmed">
          <BarChart data={barData} color="#3d8ef8" height={180} />
        </ChartCard>
        <ChartCard title="Deaths — Top 10" subtitle="Total confirmed">
          <BarChart data={deathData} color="#f04d4d" height={180} />
        </ChartCard>
      </div>

      <CountryTable countries={topCountries} />
    </>
  );
}
