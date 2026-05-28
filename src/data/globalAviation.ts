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
  // --- North America ---
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'United States', timezone: 'EST' },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'United States', timezone: 'PST' },
  { code: 'ORD', name: "O'Hare International Airport", city: 'Chicago', country: 'United States', timezone: 'CST' },
  { code: 'MIA', name: 'Miami International Airport', city: 'Miami', country: 'United States', timezone: 'EST' },
  { code: 'YYZ', name: 'Toronto Pearson International', city: 'Toronto', country: 'Canada', timezone: 'EST' },
  { code: 'YVR', name: 'Vancouver International', city: 'Vancouver', country: 'Canada', timezone: 'PST' },
  { code: 'MEX', name: 'Benito Juárez International', city: 'Mexico City', country: 'Mexico', timezone: 'CST' },

  // --- Europe ---
  { code: 'LHR', name: 'London Heathrow Airport', city: 'London', country: 'United Kingdom', timezone: 'GMT' },
  { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France', timezone: 'CET' },
  { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany', timezone: 'CET' },
  { code: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands', timezone: 'CET' },
  { code: 'FCO', name: 'Leonardo da Vinci–Fiumicino', city: 'Rome', country: 'Italy', timezone: 'CET' },
  { code: 'MAD', name: 'Adolfo Suárez Barajas', city: 'Madrid', country: 'Spain', timezone: 'CET' },
  { code: 'ZRH', name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland', timezone: 'CET' },

  // --- Middle East & Africa ---
  { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'UAE', timezone: 'GST' },
  { code: 'DOH', name: 'Hamad International Airport', city: 'Doha', country: 'Qatar', timezone: 'AST' },
  { code: 'AUH', name: 'Zayed International Airport', city: 'Abu Dhabi', country: 'UAE', timezone: 'GST' },
  { code: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey', timezone: 'EET' },
  { code: 'CAI', name: 'Cairo International Airport', city: 'Cairo', country: 'Egypt', timezone: 'EET' },
  { code: 'LOS', name: 'Murtala Muhammed International', city: 'Lagos', country: 'Nigeria', timezone: 'WAT' },
  { code: 'CPT', name: 'Cape Town International', city: 'Cape Town', country: 'South Africa', timezone: 'SAST' },
  { code: 'JNB', name: 'O. R. Tambo International', city: 'Johannesburg', country: 'South Africa', timezone: 'SAST' },

  // --- Asia & Oceania ---
  { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore', timezone: 'SGT' },
  { code: 'HND', name: 'Haneda Airport', city: 'Tokyo', country: 'Japan', timezone: 'JST' },
  { code: 'NRT', name: 'Narita International', city: 'Tokyo', country: 'Japan', timezone: 'JST' },
  { code: 'HKG', name: 'Hong Kong International', city: 'Hong Kong', country: 'China', timezone: 'HKT' },
  { code: 'ICN', name: 'Incheon International', city: 'Seoul', country: 'South Korea', timezone: 'KST' },
  { code: 'PEK', name: 'Beijing Capital International', city: 'Beijing', country: 'China', timezone: 'CST' },
  { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand', timezone: 'ICT' },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj', city: 'Mumbai', country: 'India', timezone: 'IST' },
  { code: 'DEL', name: 'Indira Gandhi International', city: 'Delhi', country: 'India', timezone: 'IST' },
  { code: 'SYD', name: 'Sydney Kingsford Smith', city: 'Sydney', country: 'Australia', timezone: 'AEST' },
  { code: 'MEL', name: 'Melbourne Airport', city: 'Melbourne', country: 'Australia', timezone: 'AEST' },
  { code: 'AKL', name: 'Auckland Airport', city: 'Auckland', country: 'New Zealand', timezone: 'NZST' },
];

export const GLOBAL_AIRLINES: Airline[] = [
  // --- OneWorld Alliance ---
  { code: 'QR', name: 'Qatar Airways', alliance: 'OneWorld' },
  { code: 'BA', name: 'British Airways', alliance: 'OneWorld' },
  { code: 'AA', name: 'American Airlines', alliance: 'OneWorld' },
  { code: 'QF', name: 'Qantas', alliance: 'OneWorld' },
  { code: 'CX', name: 'Cathay Pacific', alliance: 'OneWorld' },
  { code: 'AY', name: 'Finnair', alliance: 'OneWorld' },
  { code: 'IB', name: 'Iberia', alliance: 'OneWorld' },

  // --- Star Alliance ---
  { code: 'SQ', name: 'Singapore Airlines', alliance: 'Star Alliance' },
  { code: 'LH', name: 'Lufthansa', alliance: 'Star Alliance' },
  { code: 'UA', name: 'United Airlines', alliance: 'Star Alliance' },
  { code: 'NH', name: 'All Nippon Airways', alliance: 'Star Alliance' },
  { code: 'AC', name: 'Air Canada', alliance: 'Star Alliance' },
  { code: 'TK', name: 'Turkish Airlines', alliance: 'Star Alliance' },
  { code: 'ET', name: 'Ethiopian Airlines', alliance: 'Star Alliance' },
  { code: 'NZ', name: 'Air New Zealand', alliance: 'Star Alliance' },

  // --- SkyTeam Alliance ---
  { code: 'DL', name: 'Delta Air Lines', alliance: 'SkyTeam' },
  { code: 'AF', name: 'Air France', alliance: 'SkyTeam' },
  { code: 'KL', name: 'KLM Royal Dutch Airlines', alliance: 'SkyTeam' },
  { code: 'KE', name: 'Korean Air', alliance: 'SkyTeam' },
  { code: 'CI', name: 'China Airlines', alliance: 'SkyTeam' },

  // --- Premium Independents & Value ---
  { code: 'EK', name: 'Emirates', alliance: 'Independent' },
  { code: 'EY', name: 'Etihad Airways', alliance: 'Independent' },
  { code: 'P4', name: 'Air Peace', alliance: 'Independent' },
  { code: 'WS', name: 'WestJet', alliance: 'Independent' },
];

export default {
  GLOBAL_AIRPORTS,
  GLOBAL_AIRLINES,
};
