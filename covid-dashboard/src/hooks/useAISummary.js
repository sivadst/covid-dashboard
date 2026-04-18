import { useState, useCallback } from 'react';
import { fetchAISummary } from '../api/claudeApi';

export function useAISummary() {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = useCallback(async (stats, country) => {
    setLoading(true);
    setError(null);
    setSummary('');
    try {
      const text = await fetchAISummary(stats, country);
      setSummary(text);
    } catch (err) {
      setError('AI analysis unavailable — ensure API key is configured.');
      setSummary('');
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setSummary('');
    setError(null);
  }, []);

  return { summary, loading, error, generate, reset };
}
