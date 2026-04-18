import MetricCard from '../components/MetricCard';
import ChartCard from '../components/ChartCard';
import InsightsPanel from '../components/InsightsPanel';
import LineChart from '../components/LineChart';
import { fmtNum, fmtPct } from '../utils/formatters';

export default function OverviewPage({ summary, dailyCases, dailyLabels, dailyDeaths, country }) {
  if (!summary) return null;

  const deathRate = summary.cases ? (summary.deaths / summary.cases) * 100 : 0;
  const avg7 = dailyCases.length
    ? Math.round(dailyCases.slice(-7).reduce((a, b) => a + b, 0) / 7)
    : 0;

  const caseSeries = dailyLabels.map((x, i) => ({ x, y: dailyCases[i] }));

  return (
    <>
      <div className="page-title">{country === 'worldwide' ? 'Global Overview' : country}</div>
      <div className="page-subtitle">disease.sh · 90-day window · last updated daily</div>

      <div className="metrics-grid">
        <MetricCard
          label="Total Cases"
          value={summary.cases}
          delta={summary.todayCases}
          color="blue"
        />
        <MetricCard
          label="Total Deaths"
          value={summary.deaths}
          delta={summary.todayDeaths}
          color="red"
        />
        <MetricCard
          label="Recovered"
          value={summary.recovered}
          color="green"
        />
        <MetricCard
          label="Active Cases"
          value={summary.active}
          sub={`Critical: ${fmtNum(summary.critical)}`}
          color="amber"
        />
        <MetricCard
          label="Case Fatality Rate"
          value={fmtPct(deathRate)}
          sub="Deaths / confirmed cases"
          color="red"
          isPercent
        />
        <MetricCard
          label="7-Day Avg"
          value={avg7}
          sub="Rolling daily new cases"
          color="purple"
        />
      </div>

      <InsightsPanel summary={summary} dailyCases={dailyCases} country={country} />

      <ChartCard title="Daily New Cases" subtitle="Last 30 days · confirmed">
        <LineChart
          series={[{
            label: 'New Cases',
            data: caseSeries.slice(-30),
            color: '#3d8ef8',
            strokeWidth: 2,
          }]}
          height={240}
        />
      </ChartCard>
    </>
  );
}
