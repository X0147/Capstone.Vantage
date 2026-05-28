export interface Airport {
  code: string; // IATA Code
  name: string;
  city: string;
  country: string;
  timezone: string;
}

export interface Airline {
  code: string; // ICAO/IATA
  name: string;
  alliance: 'Star Alliance' | 'OneWorld' | 'SkyTeam' | 'Independent';
}

export const GLOBAL_AIRPORTS: Airport[] = [
  { code: 'LOS', name: 'Murtala Muhammed International', city: 'Lagos', country: 'Nigeria', timezone: 'GMT+1' },
  { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'UAE', timezone: 'GMT+4' },
  { code: 'LHR', name: 'London Heathrow Airport', city: 'London', country: 'United Kingdom', timezone: 'GMT+0' },
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'United States', timezone: 'GMT-5' },
  { code: 'SIN', name: 'Changi Airport', city: 'Singapore', country: 'Singapore', timezone: 'GMT+8' },
  { code: 'HND', name: 'Haneda Airport', city: 'Tokyo', country: 'Japan', timezone: 'GMT+9' },
  { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France', timezone: 'GMT+1' },
  { code: 'CPT', name: 'Cape Town International', city: 'Cape Town', country: 'South Africa', timezone: 'GMT+2' }
];

export const GLOBAL_AIRLINES: Airline[] = [
  { code: 'EK', name: 'Emirates', alliance: 'Independent' },
  { code: 'QR', name: 'Qatar Airways', alliance: 'OneWorld' },
  { code: 'SQ', name: 'Singapore Airlines', alliance: 'Star Alliance' },
  { code: 'BA', name: 'British Airways', alliance: 'OneWorld' },
  { code: 'DL', name: 'Delta Air Lines', alliance: 'SkyTeam' },
  { code: 'P4', name: 'Air Peace', alliance: 'Independent' }
];

export default {
  GLOBAL_AIRPORTS,
  GLOBAL_AIRLINES,
};
