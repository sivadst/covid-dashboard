import { fmtNum, fmtPct } from '../utils/formatters';

export default function CountryTable({ countries }) {
  if (!countries?.length) return null;

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Country Rankings</div>
          <div className="card-sub">Top 15 by total confirmed cases</div>
        </div>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Country</th>
              <th>Total Cases</th>
              <th>Deaths</th>
              <th>CFR</th>
              <th>Cases/M</th>
              <th>Active</th>
              <th>Today</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((c, i) => {
              const cfr = c.cases ? (c.deaths / c.cases) * 100 : 0;
              return (
                <tr key={c.country}>
                  <td className="rank text-mono">{i + 1}</td>
                  <td className="country-name">{c.country}</td>
                  <td className="text-mono text-accent">{fmtNum(c.cases)}</td>
                  <td className="text-mono text-red">{fmtNum(c.deaths)}</td>
                  <td className="text-mono" style={{ color: cfr > 3 ? 'var(--red)' : cfr > 1 ? 'var(--amber)' : 'var(--green)' }}>
                    {fmtPct(cfr)}
                  </td>
                  <td className="text-mono">{fmtNum(c.casesPerOneMillion)}</td>
                  <td className="text-mono">{fmtNum(c.active)}</td>
                  <td>
                    {c.todayCases > 0 ? (
                      <span className="delta-up">▲ {fmtNum(c.todayCases)}</span>
                    ) : (
                      <span className="delta-none">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
