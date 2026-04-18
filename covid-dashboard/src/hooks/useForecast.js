import { useMemo } from 'react';

function linearRegression(values) {
  const n = values.length;
  if (n < 3) return { slope: 0, intercept: values[n - 1] || 0 };
  const xs = Array.from({ length: n }, (_, i) => i);
  const meanX = xs.reduce((a, b) => a + b, 0) / n;
  const meanY = values.reduce((a, b) => a + b, 0) / n;
  const num = xs.reduce((s, x, i) => s + (x - meanX) * (values[i] - meanY), 0);
  const den = xs.reduce((s, x) => s + (x - meanX) ** 2, 0);
  const slope = den !== 0 ? num / den : 0;
  const intercept = meanY - slope * meanX;
  return { slope, intercept };
}

export function useForecast(historicalValues, forecastDays = 7) {
  return useMemo(() => {
    if (!historicalValues || historicalValues.length < 7) {
      return { forecastValues: [], confidenceBand: [] };
    }

    const window = historicalValues.slice(-14);
    const { slope, intercept } = linearRegression(window);
    const n = window.length;

    const forecastValues = Array.from({ length: forecastDays }, (_, i) => {
      const raw = intercept + slope * (n + i);
      return Math.max(0, Math.round(raw));
    });

    // Simple ±15% confidence band
    const confidenceBand = forecastValues.map(v => ({
      lower: Math.max(0, Math.round(v * 0.85)),
      upper: Math.round(v * 1.15),
    }));

    const trend = slope > 50 ? 'increasing' : slope < -50 ? 'decreasing' : 'stable';
    const peakForecast = Math.max(...forecastValues);
    const avgForecast = Math.round(forecastValues.reduce((a, b) => a + b, 0) / forecastValues.length);

    return { forecastValues, confidenceBand, trend, peakForecast, avgForecast };
  }, [historicalValues, forecastDays]);
}
