import ForecastChart from '../components/ForecastChart';

export default function ForecastPage({ dailyCases, dailyLabels }) {
  return (
    <>
      <div className="page-title">Forecast Model</div>
      <div className="page-subtitle">Linear regression · 14-day trailing window · ±15% confidence band</div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-header">
          <div>
            <div className="card-title">Model Methodology</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {[
            { label: 'Algorithm', val: 'Ordinary Least Squares (OLS)', color: 'var(--accent)' },
            { label: 'Training window', val: 'Last 14 days of daily cases', color: 'var(--cyan)' },
            { label: 'Confidence band', val: '±15% around point estimate', color: 'var(--amber)' },
            { label: 'Limitation', val: 'Does not model waves or policy', color: 'var(--text-muted)' },
          ].map(item => (
            <div key={item.label} style={{
              background: 'var(--bg-base)',
              border: '1px solid var(--border-dim)',
              borderRadius: 'var(--r-md)',
              padding: '12px 14px',
            }}>
              <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: item.color, fontFamily: 'var(--font-mono)' }}>{item.val}</div>
            </div>
          ))}
        </div>
      </div>

      <ForecastChart dailyCases={dailyCases} dailyLabels={dailyLabels} />
    </>
  );
}
