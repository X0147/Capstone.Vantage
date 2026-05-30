import { getAirport } from '../utils/safeLookup';

export interface RouteAnalysis {
  distanceKm: number;
  distanceMiles: number;
  flightTimeHours: number;
  flightTimeFormatted: string;
  stops: number;
  stopAnalysis: string;
  typicalAircraft: string;
  commonHubs: string[];
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Haversine formula
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}



// Main analysis function
export function analyzeRoute(originIata: string, destIata: string): RouteAnalysis | null {
  const origin = getAirport(originIata);
  const dest = getAirport(destIata);

  if (!origin || !dest) return null;

  const distanceKm = Math.round(calculateDistance(origin.lat, origin.lon, dest.lat, dest.lon));
  const distanceMiles = Math.round(distanceKm * 0.621371);

  // Average cruising speed 900km/h + 45 mins for takeoff/landing
  let totalHours = (distanceKm / 900) + 0.75;
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);

  let stops = 0;
  let stopAnalysis = '';
  let typicalAircraft = 'Airbus A320 / Boeing 737';
  let commonHubs: string[] = [];

  if (distanceKm < 3000) {
    stops = 0;
    stopAnalysis = 'Non-stop route. Operates daily direct.';
  } else if (distanceKm < 8500) {
    stops = 0;
    stopAnalysis = 'Typically non-stop. Long-haul direct route.';
    typicalAircraft = 'Boeing 787 / Airbus A350';
  } else if (distanceKm < 14000) {
    stops = 0; // Ultra long haul, but often non-stop nowadays
    stopAnalysis = 'Ultra-long-haul. Often non-stop, but may require 1 stop depending on carrier.';
    typicalAircraft = 'Airbus A350-1000 / Boeing 777-300ER';
    commonHubs = ['DXB', 'DOH', 'FRA'];
  } else {
    stops = 1;
    stopAnalysis = '1 Stop required. Exceeds typical commercial range.';
    typicalAircraft = 'Airbus A380 / Boeing 777-300ER';
    commonHubs = ['DXB', 'SIN', 'LHR', 'DOH'];
    // Add layover time
    totalHours += 2.5;
  }

  return {
    distanceKm,
    distanceMiles,
    flightTimeHours: totalHours,
    flightTimeFormatted: `${hours}h ${minutes}m`,
    stops,
    stopAnalysis,
    typicalAircraft,
    commonHubs,
  };
}
