const BASE = 'https://disease.sh/v3/covid-19';

export async function fetchGlobal() {
  const res = await fetch(`${BASE}/all`);
  if (!res.ok) throw new Error('Failed to fetch global data');
  return res.json();
}

export async function fetchCountry(country) {
  const res = await fetch(`${BASE}/countries/${encodeURIComponent(country)}`);
  if (!res.ok) throw new Error(`Failed to fetch data for ${country}`);
  return res.json();
}

export async function fetchHistorical(country = null, days = 90) {
  const url = country
    ? `${BASE}/historical/${encodeURIComponent(country)}?lastdays=${days}`
    : `${BASE}/historical/all?lastdays=${days}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch historical data');
  const data = await res.json();
  return country ? data.timeline : data;
}

export async function fetchTopCountries(limit = 15) {
  const res = await fetch(`${BASE}/countries?sort=cases`);
  if (!res.ok) throw new Error('Failed to fetch country rankings');
  const data = await res.json();
  return data.slice(0, limit);
}

export async function fetchAll(country = 'worldwide') {
  const isGlobal = country === 'worldwide';
  const [summary, historical, top] = await Promise.all([
    isGlobal ? fetchGlobal() : fetchCountry(country),
    fetchHistorical(isGlobal ? null : country, 90),
    isGlobal ? fetchTopCountries(15) : Promise.resolve([]),
  ]);
  return { summary, historical, topCountries: top };
}

export const COUNTRY_LIST = [
  'worldwide', 'USA', 'India', 'Brazil', 'France', 'Germany',
  'UK', 'Russia', 'Italy', 'Japan', 'South Korea', 'Australia',
  'Canada', 'Mexico', 'Spain', 'Argentina', 'Colombia', 'Poland',
  'Netherlands', 'Turkey', 'Sweden', 'Belgium', 'Switzerland',
];
