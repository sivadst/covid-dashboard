import {
  BarChart as ReBarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { fmtNum } from '../utils/formatters';

const TOOLTIP_STYLE = {
  backgroundColor: '#111a30',
  border: '1px solid rgba(56,100,180,0.25)',
  borderRadius: 8,
  fontSize: 11,
  fontFamily: "'JetBrains Mono', monospace",
  color: '#e8edf8',
};

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={TOOLTIP_STYLE}>
      <div style={{ color: '#4a5a7a', marginBottom: 4, fontSize: 10 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.fill }}>
          {p.name}: <strong>{fmtNum(p.value)}</strong>
        </div>
      ))}
    </div>
  );
}

export default function BarChart({ data, color = '#3d8ef8', height = 200 }) {
  // data: [{ label, value }]
  if (!data?.length) return null;
  const max = Math.max(...data.map(d => d.value));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReBarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="rgba(56,100,180,0.08)" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fill: '#4a5a7a', fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#4a5a7a', fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={fmtNum}
          width={48}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" name="Cases" radius={[4, 4, 0, 0]}>
          {data.map((entry, i) => {
            const opacity = 0.3 + 0.7 * (entry.value / max);
            return <Cell key={i} fill={color} fillOpacity={opacity} />;
          })}
        </Bar>
      </ReBarChart>
    </ResponsiveContainer>
  );
}
