import { Airport } from '../types/airport';

let cachedAirports: Airport[] | null = null;

export const getAirports = async (): Promise<Airport[]> => {
  if (cachedAirports) return cachedAirports;
  try {
    const module = await import('../data/airports.json');
    cachedAirports = module.default;
    // store in localStorage for next loads
    localStorage.setItem('airports', JSON.stringify(cachedAirports));
  } catch {
    // fallback: try to read from localStorage
    const stored = localStorage.getItem('airports');
    if (stored) {
      cachedAirports = JSON.parse(stored) as Airport[];
    } else {
      cachedAirports = [];
    }
  }
  return cachedAirports;
};

export const searchAirports = async (query: string): Promise<Airport[]> => {
  const list = await getAirports();
  const lower = query.toLowerCase();
  return list.filter(
    (a) =>
      a.code.toLowerCase().includes(lower) ??
      a.city.toLowerCase().includes(lower) ??
      a.name.toLowerCase().includes(lower)
  );
};
