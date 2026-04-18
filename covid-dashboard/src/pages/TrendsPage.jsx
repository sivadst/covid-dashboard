import ChartCard from '../components/ChartCard';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import { weeklyBuckets } from '../utils/formatters';

export default function TrendsPage({ dailyCases, dailyLabels, dailyDeaths, dailyRecovered, cumulativeCases, cumulativeLabels }) {
  if (!dailyCases?.length) return null;

  const last60Labels = dailyLabels.slice(-60);
  const last60Cases  = dailyCases.slice(-60);
  const last60Deaths = dailyDeaths.slice(-60);

  const caseSeries   = last60Labels.map((x, i) => ({ x, y: last60Cases[i] }));
  const deathSeries  = last60Labels.map((x, i) => ({ x, y: last60Deaths[i] }));

  const cumSeries    = cumulativeLabels.slice(-60).map((x, i) => ({
    x, y: cumulativeCases.slice(-60)[i],
  }));

  const weekly = weeklyBuckets(dailyLabels, dailyCases);

  return (
    <>
      <div className="page-title">Trend Analysis</div>
      <div className="page-subtitle">60-day comparative view · cases, deaths, cumulative</div>

      <ChartCard
        title="Cases vs Deaths — Daily"
        subtitle="60-day overlay · dual series"
      >
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-line" style={{ background: '#3d8ef8' }} />
            New Cases
          </div>
          <div className="legend-item">
            <div className="legend-line" style={{ background: '#f04d4d' }} />
            New Deaths
          </div>
        </div>
        <LineChart
          series={[
            { label: 'New Cases',  data: caseSeries,  color: '#3d8ef8', strokeWidth: 2 },
            { label: 'New Deaths', data: deathSeries, color: '#f04d4d', strokeWidth: 2 },
          ]}
          height={260}
          showLegend={false}
        />
      </ChartCard>

      <div className="charts-row">
        <ChartCard title="Cumulative Cases" subtitle="90-day total trajectory">
          <LineChart
            series={[{ label: 'Total Cases', data: cumSeries, color: '#22d3ee', strokeWidth: 2 }]}
            height={200}
          />
        </ChartCard>

        <ChartCard title="Weekly Case Buckets" subtitle="7-day aggregated totals">
          <BarChart data={weekly} color="#3d8ef8" height={200} />
        </ChartCard>
      </div>
    </>
  );
}
