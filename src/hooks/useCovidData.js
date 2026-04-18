import { useState, useEffect, useCallback } from 'react';
import { fetchAll } from '../api/covidApi';

export function useCovidData(country) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchAll(country);
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [country]);

  useEffect(() => { load(); }, [load]);

  return { data, loading, error, reload: load };
}
