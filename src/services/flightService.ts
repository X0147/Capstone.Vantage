import type { TripType, TravelClass, Passengers } from '../store/useSearchStore';

export interface FlightSearchRequest {
  origin: string;
  destination: string;
  date: string; // ISO yyyy-mm-dd
  passengers: Passengers;
  tripType: TripType;
  cabinClass: TravelClass;
}

export interface FlightLayover {
  airportCode: string;
  airportName: string;
  durationMinutes: number;
}

export interface FlightSearchResult {
  id: string;
  leg: 'outbound' | 'return';
  airlineName: 'Emirates' | 'Qantas' | 'Singapore Airlines';
  airlineIata: 'EK' | 'QF' | 'SQ';
  flightNumber: string;
  origin: string;
  destination: string;
  departureIso: string;
  arrivalIso: string;
  durationMinutes: number;
  cabinClass: TravelClass;
  price: number;
  currency: 'USD';
  stops: number;
  layovers: FlightLayover[];
  aircraft: 'Airbus A350-900' | 'Boeing 777-300ER' | 'Airbus A380-800';
}

const AIRLINES = [
  { name: 'Emirates', iata: 'EK' as const, aircraft: 'Airbus A380-800' as const },
  { name: 'Qantas', iata: 'QF' as const, aircraft: 'Boeing 777-300ER' as const },
  { name: 'Singapore Airlines', iata: 'SQ' as const, aircraft: 'Airbus A350-900' as const },
];

const CABIN_MULTIPLIER: Record<TravelClass, number> = {
  economy: 1,
  premium: 1.35,
  business: 2.2,
  first: 3.4,
};

const STOP_OPTIONS = [
  { airportCode: 'DXB', airportName: 'Dubai International' },
  { airportCode: 'SIN', airportName: 'Singapore Changi' },
  { airportCode: 'BNE', airportName: 'Brisbane Airport' },
  { airportCode: 'CNS', airportName: 'Cairns Airport' },
];

const sleep = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);

    const onAbort = () => {
      window.clearTimeout(timeoutId);
      reject(new DOMException('Request aborted', 'AbortError'));
    };

    if (signal?.aborted) {
      onAbort();
      return;
    }

    signal?.addEventListener('abort', onAbort, { once: true });
  });

const toUtcMidday = (isoDate: string) => `${isoDate}T12:00:00.000Z`;

const seededIndex = (seed: string, modulo: number) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 2147483647;
  }
  return Math.abs(hash) % modulo;
};

const addMinutes = (iso: string, minutes: number) => {
  const date = new Date(iso);
  date.setUTCMinutes(date.getUTCMinutes() + minutes);
  return date.toISOString();
};

const generateLayovers = (seed: string, stops: number, departureIso: string) => {
  if (stops <= 0) {
    return [] as FlightLayover[];
  }

  return Array.from({ length: stops }, (_, index) => {
    const option = STOP_OPTIONS[(seededIndex(`${seed}:${index}`, STOP_OPTIONS.length) + index) % STOP_OPTIONS.length];
    return {
      airportCode: option.airportCode,
      airportName: option.airportName,
      durationMinutes: 45 + seededIndex(`${seed}:layover:${index}`, 90),
    } satisfies FlightLayover;
  });
};

const buildResult = (
  request: FlightSearchRequest,
  leg: 'outbound' | 'return',
  offset: number
): FlightSearchResult => {
  const airline = AIRLINES[offset % AIRLINES.length];
  const seed = `${request.origin}:${request.destination}:${request.date}:${request.tripType}:${request.cabinClass}:${leg}:${offset}`;
  const stops = offset === 1 ? 1 : 0;
  const durationMinutes = leg === 'outbound' ? [910, 985, 1120][offset % 3] : [905, 975, 1105][offset % 3];
  const departureBase = toUtcMidday(request.date);
  const departureIso = addMinutes(departureBase, offset * 120 + (leg === 'return' ? 180 : 0));
  const arrivalIso = addMinutes(departureIso, durationMinutes);
  const baseFare = 420 + seededIndex(seed, 260) + offset * 85;
  const price = Math.round(baseFare * CABIN_MULTIPLIER[request.cabinClass]);

  return {
    id: `${leg}-${request.origin}-${request.destination}-${request.date}-${offset}`,
    leg,
    airlineName: airline.name,
    airlineIata: airline.iata,
    flightNumber: `${airline.iata}${180 + seededIndex(seed, 700)}`,
    origin: leg === 'outbound' ? request.origin : request.destination,
    destination: leg === 'outbound' ? request.destination : request.origin,
    departureIso,
    arrivalIso,
    durationMinutes,
    cabinClass: request.cabinClass,
    price,
    currency: 'USD',
    stops,
    layovers: generateLayovers(seed, stops, departureIso),
    aircraft: airline.aircraft,
  };
};

export async function searchFlights(
  request: FlightSearchRequest,
  signal?: AbortSignal
): Promise<FlightSearchResult[]> {
  await sleep(800, signal);

  const outbound = [0, 1, 2].map((index) => buildResult(request, 'outbound', index));

  if (request.tripType === 'roundtrip') {
    const returnDate = request.date;
    const returnRequest = { ...request, date: returnDate };
    const inbound = [0, 1, 2].map((index) => buildResult(returnRequest, 'return', index));
    return [...outbound, ...inbound];
  }

  return outbound;
}
