// Mock data service simulating deterministic API responses
// Based on Amadeus Django logic

const AIRLINES = {
  'UA': { name: 'United Airlines', logo: 'https://s1.apideeplink.com/images/airlines/UA.png' },
  'DL': { name: 'Delta Air Lines', logo: 'https://s1.apideeplink.com/images/airlines/DL.png' },
  'AA': { name: 'American Airlines', logo: 'https://s1.apideeplink.com/images/airlines/AA.png' },
  'B6': { name: 'JetBlue Airways', logo: 'https://s1.apideeplink.com/images/airlines/B6.png' }
};

const generateMockFlights = (from, to, date, isReturn = false) => {
  if (!from || !to || !date) return [];
  
  // Deterministic seed based on route and date length to keep results consistent
  const seed = from.length + to.length + date.length;
  
  const flights = [];
  const basePrice = 150 + (seed * 10 % 300);
  
  // Flight 1: Direct
  flights.push({
    id: `${isReturn ? 'ret' : 'out'}-${from}-${to}-1`,
    airline: AIRLINES['UA'],
    departure: { iata: from, time: `${date}T08:00:00` },
    arrival: { iata: to, time: `${date}T10:30:00` },
    duration: '2h 30m',
    stops: 0,
    price: basePrice + 50
  });

  // Flight 2: 1 Stop
  flights.push({
    id: `${isReturn ? 'ret' : 'out'}-${from}-${to}-2`,
    airline: AIRLINES['DL'],
    departure: { iata: from, time: `${date}T13:15:00` },
    arrival: { iata: to, time: `${date}T18:45:00` },
    duration: '5h 30m',
    stops: 1,
    stopover: 'ATL',
    price: basePrice - 30
  });

  // Flight 3: Direct Evening
  flights.push({
    id: `${isReturn ? 'ret' : 'out'}-${from}-${to}-3`,
    airline: AIRLINES['AA'],
    departure: { iata: from, time: `${date}T19:00:00` },
    arrival: { iata: to, time: `${date}T21:45:00` },
    duration: '2h 45m',
    stops: 0,
    price: basePrice
  });

  return flights;
};

export const flightService = {
  searchFlights: async (params) => {
    const { from, to, departDate, returnDate } = params;
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const outbound = generateMockFlights(from, to, departDate, false);
    const returnFlights = returnDate ? generateMockFlights(to, from, returnDate, true) : null;

    return {
      outbound,
      return: returnFlights
    };
  }
};
