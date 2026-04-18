import { fmtNum } from '../utils/formatters';

export default function Topbar({ summary }) {
  const now = new Date().toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <header className="topbar">
      <div className="logo">
        <div className="logo-icon">⬡</div>
        <span>COVID Analytics</span>
        <div className="live-badge">
          <div className="live-dot" />
          Live
        </div>
      </div>

      <div className="topbar-right">
        {summary && (
          <>
            <div className="topbar-stat">
              <div className="topbar-stat-label">Global Cases</div>
              <div className="topbar-stat-value">{fmtNum(summary.cases)}</div>
            </div>
            <div className="topbar-stat">
              <div className="topbar-stat-label">Global Deaths</div>
              <div className="topbar-stat-value" style={{ color: 'var(--red)' }}>{fmtNum(summary.deaths)}</div>
            </div>
          </>
        )}
        <div className="topbar-stat">
          <div className="topbar-stat-label">Updated</div>
          <div className="topbar-stat-value">{now}</div>
        </div>
      </div>
    </header>
  );
}
