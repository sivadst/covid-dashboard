import { useMemo } from 'react';
import { fmtNum, fmtPct } from '../utils/formatters';
import AISummary from './AISummary';

export default function InsightsPanel({ summary, dailyCases, country }) {
  const insights = useMemo(() => {
    if (!summary || !dailyCases?.length) return null;

    const { cases, deaths, recovered, active, casesPerOneMillion } = summary;
    const deathRate = cases ? (deaths / cases) * 100 : 0;
    const recoveryRate = cases ? (recovered / cases) * 100 : 0;

    const recent7 = dailyCases.slice(-7);
    const prior7  = dailyCases.slice(-14, -7);
    const sum7    = recent7.reduce((a, b) => a + b, 0);
    const sumP7   = prior7.reduce((a, b) => a + b, 0);
    const growthRate = sumP7 > 0 ? ((sum7 - sumP7) / sumP7) * 100 : 0;
    const avg7    = Math.round(sum7 / 7);

    const peakIdx = dailyCases.indexOf(Math.max(...dailyCases));
    const peakVal = dailyCases[peakIdx];

    return { deathRate, recoveryRate, growthRate, avg7, peakVal, casesPerOneMillion, active };
  }, [summary, dailyCases]);

  if (!insights) return null;

  const { deathRate, recoveryRate, growthRate, avg7, peakVal, casesPerOneMillion } = insights;
  const growthAbs = Math.min(Math.abs(growthRate), 100);
  const growthColor = growthRate > 10 ? 'var(--red)' : growthRate > 0 ? 'var(--amber)' : 'var(--green)';
  const growthLabel = growthRate > 10 ? 'Accelerating' : growthRate > 0 ? 'Slow growth' : 'Declining';

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Key Insights</div>
          <div className="card-sub">{country} — epidemiological indicators</div>
        </div>
      </div>

      <div className="insights-grid">
        <div className="insight-cell">
          <div className="insight-label">7-Day Growth Rate</div>
          <div className="insight-value" style={{ color: growthColor }}>
            {growthRate >= 0 ? '+' : ''}{fmtPct(growthRate, 1)}
          </div>
          <div className="insight-desc">{growthLabel} — based on 14-day comparison</div>
          <div className="severity-bar">
            <div className="severity-fill" style={{ width: `${growthAbs}%` }} />
          </div>
        </div>

        <div className="insight-cell">
          <div className="insight-label">Case Fatality Rate</div>
          <div className="insight-value" style={{ color: deathRate > 3 ? 'var(--red)' : 'var(--amber)' }}>
            {fmtPct(deathRate)}
          </div>
          <div className="insight-desc">
            {deathRate > 3 ? 'Above global average — elevated risk' : deathRate > 1 ? 'Moderate fatality ratio' : 'Below average CFR'}
          </div>
        </div>

        <div className="insight-cell">
          <div className="insight-label">Recovery Rate</div>
          <div className="insight-value" style={{ color: recoveryRate > 90 ? 'var(--green)' : 'var(--amber)' }}>
            {fmtPct(recoveryRate, 1)}
          </div>
          <div className="insight-desc">
            {recoveryRate > 90 ? 'Excellent recovery outcomes' : recoveryRate > 70 ? 'Good recovery rate' : 'Recovery tracking in progress'}
          </div>
        </div>

        <div className="insight-cell">
          <div className="insight-label">7-Day Avg (Daily)</div>
          <div className="insight-value" style={{ color: 'var(--cyan)' }}>
            {fmtNum(avg7)}
          </div>
          <div className="insight-desc">New cases per day — rolling weekly mean</div>
        </div>

        <div className="insight-cell">
          <div className="insight-label">Peak (90-day period)</div>
          <div className="insight-value" style={{ color: 'var(--purple)' }}>
            {fmtNum(peakVal)}
          </div>
          <div className="insight-desc">Highest single-day case count observed</div>
        </div>

        <div className="insight-cell">
          <div className="insight-label">Cases per Million</div>
          <div className="insight-value" style={{ color: 'var(--accent)' }}>
            {fmtNum(casesPerOneMillion)}
          </div>
          <div className="insight-desc">Population-adjusted prevalence index</div>
        </div>
      </div>

      <AISummary stats={summary} country={country} />
    </div>
  );
}
