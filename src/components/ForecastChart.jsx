import { useMemo, useState } from 'react';
import { useForecast } from '../hooks/useForecast';
import { fmtNum } from '../utils/formatters';
import LineChart from './LineChart';
import ChartCard from './ChartCard';

export default function ForecastChart({ dailyCases, dailyLabels }) {
  const [forecastDays, setForecastDays] = useState(7);
  const { forecastValues, trend, peakForecast, avgForecast } = useForecast(dailyCases, forecastDays);

  const series = useMemo(() => {
    if (!dailyCases?.length || !forecastValues?.length) return [];

    const histSlice = dailyCases.slice(-14);
    const histLabels = dailyLabels.slice(-14);

    const forecastLabels = Array.from({ length: forecastDays }, (_, i) => `+${i + 1}d`);

    // Historical series
    const histData = histSlice.map((y, i) => ({ x: histLabels[i], y }));

    // Forecast series — starts at the last historical point
    const fcastData = [
      { x: histLabels[histLabels.length - 1], y: histSlice[histSlice.length - 1] },
      ...forecastValues.map((y, i) => ({ x: forecastLabels[i], y })),
    ];

    return [
      { label: 'Historical', data: histData, color: '#3d8ef8', strokeWidth: 2 },
      { label: 'Forecast', data: fcastData, color: '#f5a623', strokeWidth: 2, dashed: true },
    ];
  }, [dailyCases, dailyLabels, forecastValues, forecastDays]);

  const trendColor = trend === 'increasing' ? 'var(--red)' : trend === 'decreasing' ? 'var(--green)' : 'var(--amber)';
  const trendSymbol = trend === 'increasing' ? '▲' : trend === 'decreasing' ? '▼' : '→';

  return (
    <ChartCard
      title="Case Forecast"
      subtitle={`Linear regression · last 14 days`}
      actions={
        <div className="forecast-controls">
          {[7, 14].map(d => (
            <button
              key={d}
              className={`window-btn${forecastDays === d ? ' active' : ''}`}
              onClick={() => setForecastDays(d)}
            >
              {d}d
            </button>
          ))}
        </div>
      }
    >
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-line" style={{ background: '#3d8ef8' }} />
          Historical
        </div>
        <div className="legend-item">
          <div className="legend-line legend-dashed" style={{ borderColor: '#f5a623', width: 20 }} />
          Forecast
        </div>
      </div>

      <LineChart series={series} height={260} showLegend={false} />

      <div className="forecast-meta">
        <div className="forecast-stat">
          <div className="forecast-stat-label">Projected Peak</div>
          <div className="forecast-stat-value" style={{ color: 'var(--amber)' }}>{fmtNum(peakForecast)}</div>
        </div>
        <div className="forecast-stat">
          <div className="forecast-stat-label">Daily Average</div>
          <div className="forecast-stat-value" style={{ color: 'var(--accent)' }}>{fmtNum(avgForecast)}</div>
        </div>
        <div className="forecast-stat">
          <div className="forecast-stat-label">Trend Direction</div>
          <div className="forecast-stat-value" style={{ fontSize: 14, color: trendColor }}>
            {trendSymbol} {trend.charAt(0).toUpperCase() + trend.slice(1)}
          </div>
        </div>
        <div className="forecast-stat">
          <div className="forecast-stat-label">Model</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
            Linear regression<br />14-day window
          </div>
        </div>
      </div>
    </ChartCard>
  );
}
