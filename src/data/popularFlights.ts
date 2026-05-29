export interface PopularFlight {
  flight: string;
  airline: string;
  origin: string;
  dest: string;
  status: string;
}

export const POPULAR_FLIGHTS: PopularFlight[] = [
  { flight: 'EK201', airline: 'Emirates', origin: 'DXB', dest: 'JFK', status: 'In-Flight' },
  { flight: 'BA117', airline: 'British Airways', origin: 'LHR', dest: 'JFK', status: 'On-Time' },
  { flight: 'SQ32', airline: 'Singapore Airlines', origin: 'SIN', dest: 'SFO', status: 'In-Flight' },
  { flight: 'QR701', airline: 'Qatar Airways', origin: 'DOH', dest: 'JFK', status: 'Delayed' },
  { flight: 'QF1', airline: 'Qantas', origin: 'SYD', dest: 'LHR', status: 'In-Flight' },
  { flight: 'AF23', airline: 'Air France', origin: 'JFK', dest: 'CDG', status: 'On-Time' },
  { flight: 'JL5', airline: 'Japan Airlines', origin: 'JFK', dest: 'HND', status: 'In-Flight' },
  { flight: 'CX840', airline: 'Cathay Pacific', origin: 'HKG', dest: 'JFK', status: 'Landed' },
];
