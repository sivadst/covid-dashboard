export function fmtNum(n) {
  if (n == null || isNaN(n)) return '—';
  if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return Math.round(n).toLocaleString();
}

export function fmtPct(n, decimals = 2) {
  if (n == null || isNaN(n)) return '—';
  return n.toFixed(decimals) + '%';
}

export function fmtDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('/');
  if (parts.length < 2) return dateStr;
  return `${parts[0]}/${parts[1]}`;
}

export function toDailySeries(cumulativeObj) {
  if (!cumulativeObj) return { labels: [], values: [] };
  const entries = Object.entries(cumulativeObj);
  const labels = entries.map(([d]) => fmtDate(d));
  const values = entries.map(([, v], i) =>
    i === 0 ? 0 : Math.max(0, v - entries[i - 1][1])
  );
  return { labels, values };
}

export function toCumulativeSeries(obj) {
  if (!obj) return { labels: [], values: [] };
  const entries = Object.entries(obj);
  return {
    labels: entries.map(([d]) => fmtDate(d)),
    values: entries.map(([, v]) => v),
  };
}

export function last30(series) {
  return {
    labels: series.labels.slice(-30),
    values: series.values.slice(-30),
  };
}

export function weeklyBuckets(labels, values) {
  const buckets = [];
  for (let i = 0; i < values.length; i += 7) {
    const slice = values.slice(i, i + 7);
    buckets.push({
      label: labels[i] || '',
      value: slice.reduce((a, b) => a + b, 0),
    });
  }
  return buckets;
}
