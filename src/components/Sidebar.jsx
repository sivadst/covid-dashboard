import { COUNTRY_LIST } from '../api/covidApi';

const NAV_ITEMS = [
  { id: 'overview',  icon: '▦', label: 'Overview' },
  { id: 'trends',    icon: '↗', label: 'Trends' },
  { id: 'forecast',  icon: '◈', label: 'Forecast' },
  { id: 'countries', icon: '⊞', label: 'Countries' },
];

export default function Sidebar({ activeTab, setActiveTab, country, setCountry }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-section-title">Navigation</div>
      {NAV_ITEMS.map(item => (
        <button
          key={item.id}
          className={`nav-item${activeTab === item.id ? ' active' : ''}`}
          onClick={() => setActiveTab(item.id)}
        >
          <span className="nav-icon">{item.icon}</span>
          {item.label}
        </button>
      ))}

      <div className="country-selector-title" style={{ marginTop: 16 }}>Region</div>
      <select
        className="country-select"
        value={country}
        onChange={e => setCountry(e.target.value)}
      >
        {COUNTRY_LIST.map(c => (
          <option key={c} value={c}>
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </option>
        ))}
      </select>

      <div style={{ marginTop: 'auto', paddingTop: 24 }}>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', lineHeight: 1.7, padding: '0 4px' }}>
          <div style={{ marginBottom: 4 }}>Data: disease.sh</div>
          <div>AI: Claude API</div>
        </div>
      </div>
    </aside>
  );
}
