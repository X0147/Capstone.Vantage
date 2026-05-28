import type { TripType, TravelClass, Passengers } from '../store/useSearchStore';

// ─────────────────────────────────────────────────────────────────────────────
// Flight Service — Mock data layer with premium fields
// ─────────────────────────────────────────────────────────────────────────────

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

export interface FlightAmenities {
  wifi: boolean;
  powerOutlet: boolean;
  entertainment: boolean;
  mealIncluded: boolean;
  loungeAccess: boolean;
}

export interface CarbonFootprint {
  totalKg: number;
  perPassengerKg: number;
  rating: 'low' | 'medium' | 'high';
  offsetAvailable: boolean;
  offsetPriceUsd: number;
}

export interface FlightSearchResult {
  id: string;
  leg: 'outbound' | 'return';
  airlineName: 'Emirates' | 'Qantas' | 'Singapore Airlines' | 'Qatar Airways' | 'Cathay Pacific';
  airlineIata: 'EK' | 'QF' | 'SQ' | 'QR' | 'CX';
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
  aircraft: string;
  amenities: FlightAmenities;
  carbon: CarbonFootprint;
  onTimePercentage: number;
  seatsRemaining: number;
}

const AIRLINES = [
  { name: 'Emirates' as const, iata: 'EK' as const, aircraft: 'Airbus A380-800' },
  { name: 'Qantas' as const, iata: 'QF' as const, aircraft: 'Boeing 777-300ER' },
  { name: 'Singapore Airlines' as const, iata: 'SQ' as const, aircraft: 'Airbus A350-900' },
  { name: 'Qatar Airways' as const, iata: 'QR' as const, aircraft: 'Boeing 787-9 Dreamliner' },
  { name: 'Cathay Pacific' as const, iata: 'CX' as const, aircraft: 'Airbus A350-1000' },
];

const CABIN_MULTIPLIER: Record<TravelClass, number> = {
  economy: 1,
  premium: 1.35,
  business: 2.2,
  first: 3.4,
};

const CABIN_AMENITIES: Record<TravelClass, FlightAmenities> = {
  economy: { wifi: true, powerOutlet: true, entertainment: true, mealIncluded: false, loungeAccess: false },
  premium: { wifi: true, powerOutlet: true, entertainment: true, mealIncluded: true, loungeAccess: false },
  business: { wifi: true, powerOutlet: true, entertainment: true, mealIncluded: true, loungeAccess: true },
  first: { wifi: true, powerOutlet: true, entertainment: true, mealIncluded: true, loungeAccess: true },
};

const STOP_OPTIONS = [
  { airportCode: 'DXB', airportName: 'Dubai International' },
  { airportCode: 'SIN', airportName: 'Singapore Changi' },
  { airportCode: 'DOH', airportName: 'Hamad International' },
  { airportCode: 'HKG', airportName: 'Hong Kong International' },
  { airportCode: 'IST', airportName: 'Istanbul Airport' },
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

const generateLayovers = (seed: string, stops: number, _departureIso: string) => {
  if (stops <= 0) {
    return [] as FlightLayover[];
  }

  return Array.from({ length: stops }, (_, index) => {
    const option =
      STOP_OPTIONS[
        (seededIndex(`${seed}:${index}`, STOP_OPTIONS.length) + index) % STOP_OPTIONS.length
      ];
    return {
      airportCode: option.airportCode,
      airportName: option.airportName,
      durationMinutes: 45 + seededIndex(`${seed}:layover:${index}`, 90),
    } satisfies FlightLayover;
  });
};

const generateCarbon = (durationMinutes: number, seed: string): CarbonFootprint => {
  const baseKg = Math.round(durationMinutes * 0.115 + seededIndex(seed + ':carbon', 30));
  const rating = baseKg < 100 ? 'low' : baseKg < 200 ? 'medium' : 'high';
  return {
    totalKg: baseKg,
    perPassengerKg: baseKg,
    rating,
    offsetAvailable: true,
    offsetPriceUsd: Math.round(baseKg * 0.08),
  };
};

const buildResult = (
  request: FlightSearchRequest,
  leg: 'outbound' | 'return',
  offset: number
): FlightSearchResult => {
  const airline = AIRLINES[offset % AIRLINES.length];
  const seed = `${request.origin}:${request.destination}:${request.date}:${request.tripType}:${request.cabinClass}:${leg}:${offset}`;
  const stops = offset === 1 ? 1 : 0;
  const durationMinutes =
    leg === 'outbound' ? [910, 985, 1120, 880, 1045][offset % 5] : [905, 975, 1105, 870, 1030][offset % 5];
  const departureBase = toUtcMidday(request.date);
  const departureIso = addMinutes(departureBase, offset * 120 + (leg === 'return' ? 180 : 0));
  const arrivalIso = addMinutes(departureIso, durationMinutes);
  const baseFare = 420 + seededIndex(seed, 260) + offset * 85;
  const price = Math.round(baseFare * CABIN_MULTIPLIER[request.cabinClass]);
  const onTimePercentage = 78 + seededIndex(seed + ':otp', 20);
  const seatsRemaining = 2 + seededIndex(seed + ':seats', 12);

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
    amenities: CABIN_AMENITIES[request.cabinClass],
    carbon: generateCarbon(durationMinutes, seed),
    onTimePercentage,
    seatsRemaining,
  };
};

export async function searchFlights(
  request: FlightSearchRequest,
  signal?: AbortSignal
): Promise<FlightSearchResult[]> {
  // Simulate network latency
  await sleep(800, signal);

  const outbound = [0, 1, 2, 3].map((index) => buildResult(request, 'outbound', index));

  if (request.tripType === 'roundtrip') {
    const returnDate = request.date;
    const returnRequest = { ...request, date: returnDate };
    const inbound = [0, 1, 2, 3].map((index) => buildResult(returnRequest, 'return', index));
    return [...outbound, ...inbound];
  }

  return outbound;
}
