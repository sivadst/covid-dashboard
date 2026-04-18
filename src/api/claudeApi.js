const CLAUDE_URL = 'https://api.anthropic.com/v1/messages';

export async function fetchAISummary(stats, country) {
  const prompt = `You are an epidemiologist and data scientist. Analyze this COVID-19 data for ${country} and provide a concise 2-3 sentence analytical summary.

Data:
- Total cases: ${stats.cases?.toLocaleString()}
- Total deaths: ${stats.deaths?.toLocaleString()}
- Recovered: ${stats.recovered?.toLocaleString()}
- Active cases: ${stats.active?.toLocaleString()}
- Death rate: ${stats.deaths && stats.cases ? ((stats.deaths / stats.cases) * 100).toFixed(2) : 0}%
- Cases per million: ${stats.casesPerOneMillion?.toLocaleString()}
- Deaths per million: ${stats.deathsPerOneMillion?.toLocaleString()}
- Today's cases: ${stats.todayCases?.toLocaleString()}
- Today's deaths: ${stats.todayDeaths?.toLocaleString()}

Provide an insightful analytical summary focused on severity, trends, and one notable risk indicator. Use precise language. Keep under 80 words.`;

  const res = await fetch(CLAUDE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 200,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) throw new Error('Claude API error');
  const data = await res.json();
  return data.content?.[0]?.text || 'Analysis unavailable.';
}
