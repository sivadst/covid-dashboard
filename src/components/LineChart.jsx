import { useEffect, useRef } from 'react';
import {
  LineChart as ReLineChart,
  Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ReferenceLine,
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
      <div style={{ color: '#4a5a7a', marginBottom: 6, fontSize: 10 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: <strong>{fmtNum(p.value)}</strong>
        </div>
      ))}
    </div>
  );
}

export default function LineChart({ series, height = 240, showLegend = false }) {
  // series: [{ label, data: [{x, y}], color, dashed }]
  if (!series || !series.length) return null;

  const allKeys = series.map(s => s.label);
  const dataMap = {};
  series.forEach(s => {
    s.data.forEach(({ x, y }) => {
      if (!dataMap[x]) dataMap[x] = { x };
      dataMap[x][s.label] = y;
    });
  });
  const chartData = Object.values(dataMap);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReLineChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="rgba(56,100,180,0.08)" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="x"
          tick={{ fill: '#4a5a7a', fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fill: '#4a5a7a', fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={fmtNum}
          width={48}
        />
        <Tooltip content={<CustomTooltip />} />
        {showLegend && (
          <Legend
            wrapperStyle={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: '#4a5a7a', paddingTop: 12 }}
          />
        )}
        {series.map(s => (
          <Line
            key={s.label}
            type="monotone"
            dataKey={s.label}
            stroke={s.color}
            strokeWidth={s.strokeWidth || 2}
            strokeDasharray={s.dashed ? '5 4' : undefined}
            dot={s.dot || false}
            activeDot={{ r: 4, strokeWidth: 0 }}
            connectNulls={false}
          />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  );
}
