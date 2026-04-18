import { fmtNum } from '../utils/formatters';

const ACCENT_COLORS = {
  blue:   'linear-gradient(90deg, #3d8ef8, #22d3ee)',
  red:    'linear-gradient(90deg, #f04d4d, #f97316)',
  green:  'linear-gradient(90deg, #10e090, #34d399)',
  amber:  'linear-gradient(90deg, #f5a623, #fbbf24)',
  purple: 'linear-gradient(90deg, #a78bfa, #818cf8)',
};

export default function MetricCard({ label, value, sub, delta, color = 'blue', isPercent = false }) {
  const displayVal = isPercent ? value : fmtNum(value);
  const hasDelta = delta !== undefined && delta !== null;
  const isUp = hasDelta && delta > 0;

  return (
    <div className="metric-card">
      <div
        className="metric-card-accent"
        style={{ background: ACCENT_COLORS[color] || ACCENT_COLORS.blue }}
      />
      <div className="metric-label">{label}</div>
      <div className="metric-value" style={{ color: `var(--${color === 'blue' ? 'text-primary' : color === 'red' ? 'red' : color === 'green' ? 'green' : color === 'amber' ? 'amber' : color === 'purple' ? 'purple' : 'cyan'})` }}>
        {displayVal}
      </div>
      {sub && <div className="metric-sub">{sub}</div>}
      {hasDelta && (
        <span className={`metric-delta ${isUp ? 'up' : 'down'}`}>
          {isUp ? '▲' : '▼'} {fmtNum(Math.abs(delta))} today
        </span>
      )}
    </div>
  );
}
