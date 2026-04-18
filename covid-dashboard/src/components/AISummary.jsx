import { useEffect } from 'react';
import { useAISummary } from '../hooks/useAISummary';

export default function AISummary({ stats, country }) {
  const { summary, loading, error, generate, reset } = useAISummary();

  useEffect(() => { reset(); }, [country, reset]);

  return (
    <div className="ai-block">
      <div className="ai-header">
        <span className="ai-label">AI Analysis</span>
        <span className="ai-tag">Claude-Powered</span>
      </div>

      {!summary && !loading && (
        <button
          className="ai-gen-btn"
          onClick={() => generate(stats, country)}
          disabled={!stats}
        >
          ✦ Generate Analysis ↗
        </button>
      )}

      {loading && (
        <div className="ai-thinking">
          <span style={{ animation: 'livepulse 1s ease-in-out infinite', display: 'inline-block' }}>◆</span>
          Analyzing data...
        </div>
      )}

      {error && (
        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          {error}
        </div>
      )}

      {summary && (
        <div>
          <div className="ai-summary-text">{summary}</div>
          <button
            className="ai-gen-btn"
            style={{ marginTop: 10, fontSize: 10 }}
            onClick={() => { reset(); }}
          >
            ↺ Reset
          </button>
        </div>
      )}
    </div>
  );
}
