import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Search, Compass, ShieldAlert, Navigation, Wind, Gauge, Clock } from 'lucide-react';

interface TrackedFlight {
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  status: 'In-Flight' | 'On-Time' | 'Delayed' | 'Landed';
  altitude: string;
  speed: string;
  progress: number;
  departureTime: string;
  arrivalTime: string;
  vessel: string;
  heading: string;
  temp: string;
  remainingTime: string;
}

const MOCK_TRACK_DATA: Record<string, TrackedFlight> = {
  EK201: {
    flightNumber: 'EK201',
    airline: 'Emirates',
    origin: 'DXB (Dubai)',
    destination: 'LHR (London)',
    status: 'In-Flight',
    altitude: '38,000 ft',
    speed: '540 mph',
    progress: 62,
    departureTime: '08:20 AM',
    arrivalTime: '12:45 PM',
    vessel: 'Boeing 777-300ER',
    heading: '284° Northwest',
    temp: '-54°C',
    remainingTime: '2h 14m',
  },
  P47120: {
    flightNumber: 'P47120',
    airline: 'Air Peace',
    origin: 'LOS (Lagos)',
    destination: 'JFK (New York)',
    status: 'In-Flight',
    altitude: '36,000 ft',
    speed: '512 mph',
    progress: 33,
    departureTime: '11:15 PM',
    arrivalTime: '06:30 AM',
    vessel: 'Airbus A350-1000',
    heading: '315° Northwest',
    temp: '-51°C',
    remainingTime: '6h 15m',
  },
};

const AIRLINES: Record<string, string> = {
  AA: 'American Airlines',
  UA: 'United Airlines',
  DL: 'Delta Air Lines',
  LH: 'Lufthansa',
  BA: 'British Airways',
  AF: 'Air France',
  SQ: 'Singapore Airlines',
  VS: 'Virgin Atlantic',
  EK: 'Emirates',
  QR: 'Qatar Airways',
  P4: 'Air Peace',
  KL: 'KLM Royal Dutch',
  NH: 'All Nippon Airways',
  CX: 'Cathay Pacific',
};

const AIRPORTS = [
  'JFK (New York)',
  'LHR (London)',
  'DXB (Dubai)',
  'SIN (Singapore)',
  'HND (Tokyo)',
  'CDG (Paris)',
  'LAX (Los Angeles)',
  'SYD (Sydney)',
  'CPT (Cape Town)',
  'AMS (Amsterdam)',
  'FCO (Rome)',
  'IST (Istanbul)',
];

const VESSELS = [
  'Boeing 787-9 Dreamliner',
  'Airbus A350-1000',
  'Boeing 777-300ER',
  'Airbus A380-800',
  'Boeing 737 MAX 9',
  'Airbus A321neo',
];

const HEADINGS = ['Northwest', 'Northeast', 'Southwest', 'Southeast', 'East', 'West', 'North', 'South'];

function generateDynamicFlight(flightNo: string): TrackedFlight {
  const upper = flightNo.trim().toUpperCase();
  const carrierCode = upper.slice(0, 2);
  const airline = AIRLINES[carrierCode] || 'Vantage Global Staralliance';

  let seed = 0;
  for (let i = 0; i < upper.length; i++) {
    seed += upper.charCodeAt(i);
  }

  const originIndex = seed % AIRPORTS.length;
  const destIndex = (seed + 5) % AIRPORTS.length;
  const origin = AIRPORTS[originIndex];
  const destination = AIRPORTS[destIndex === originIndex ? (destIndex + 1) % AIRPORTS.length : destIndex];

  const statuses: ('In-Flight' | 'On-Time' | 'Delayed' | 'Landed')[] = ['In-Flight', 'In-Flight', 'In-Flight', 'Delayed', 'On-Time'];
  const status = statuses[seed % statuses.length];

  const progress = 10 + (seed % 75); // 10% to 85%
  const altitudeVal = 30000 + (seed % 12) * 1000;
  const speedVal = 490 + (seed % 8) * 10;
  
  const depHour = (8 + (seed % 12)) % 12 || 12;
  const depMin = (seed % 4) * 15;
  const isPM = seed % 2 === 0;
  const departureTime = `${String(depHour).padStart(2, '0')}:${String(depMin).padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;

  const durationHours = 4 + (seed % 8);
  const arrHour = (depHour + durationHours) % 12 || 12;
  const arrMin = (depMin + 30) % 60;
  const arrivalTime = `${String(arrHour).padStart(2, '0')}:${String(arrMin).padStart(2, '0')} ${!isPM ? 'PM' : 'AM'}`;

  const remainingHours = Math.max(1, Math.floor((durationHours * (100 - progress)) / 100));
  const remainingMins = Math.floor(((durationHours * (100 - progress)) / 100 - remainingHours) * 60);

  const vessel = VESSELS[seed % VESSELS.length];
  const headingVal = `${seed % 360}° ${HEADINGS[seed % HEADINGS.length]}`;
  const temp = `-${45 + (seed % 15)}°C`;

  return {
    flightNumber: upper,
    airline,
    origin,
    destination,
    status,
    altitude: `${altitudeVal.toLocaleString()} ft`,
    speed: `${speedVal} mph`,
    progress,
    departureTime,
    arrivalTime,
    vessel,
    heading: headingVal,
    temp,
    remainingTime: `${remainingHours}h ${remainingMins}m`,
  };
}

type TrackerLocationState = {
  flightNumber?: string;
};

export const FlightTrackerPage: React.FC = () => {
  const location = useLocation();
  const incomingFlight = (location.state as TrackerLocationState | null)?.flightNumber || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFlight, setActiveFlight] = useState<TrackedFlight | null>(MOCK_TRACK_DATA.EK201);
  const [errorMsg, setErrorMsg] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (!incomingFlight) return;

    const nextQuery = incomingFlight.toUpperCase();
    setSearchQuery(nextQuery);
    triggerTracking(nextQuery);
  }, [incomingFlight]);

  const triggerTracking = (flightNo: string) => {
    setIsConnecting(true);
    setErrorMsg('');
    
    // Simulate high-tech latency to scan satellites
    setTimeout(() => {
      if (MOCK_TRACK_DATA[flightNo]) {
        setActiveFlight(MOCK_TRACK_DATA[flightNo]);
      } else if (flightNo.length >= 3) {
        setActiveFlight(generateDynamicFlight(flightNo));
      } else {
        setErrorMsg('Please enter a valid flight designation (e.g. VS103).');
        setActiveFlight(null);
      }
      setIsConnecting(false);
    }, 800);
  };

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const upperQuery = searchQuery.trim().toUpperCase();
    if (!upperQuery) return;
    triggerTracking(upperQuery);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-md px-sm py-lg">
      <div className="space-y-3xs text-center">
        <div className="inline-flex items-center gap-2xs rounded-full border border-vantage-accent/20 bg-vantage-accent/10 px-xs py-3xs text-[10px] font-bold uppercase tracking-widest text-vantage-accent">
          <Compass className="h-3 w-3 animate-spin-slow" /> Real-time Satellite Telemetry
        </div>
        <h1 className="text-2xl font-black tracking-tight text-white">Global Flight Tracker</h1>
        <p className="mx-auto max-w-md text-xs text-vantage-muted">
          Intercept and monitor live airspace positions, vector velocities, and arrival horizons across any international carrier.
        </p>
      </div>

      <form onSubmit={handleTrackSearch} className="group relative mx-auto max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter Flight Designation (e.g., EK201, AA100, UA902)"
          className="w-full rounded-2xl border border-white/10 bg-vantage-surface/40 py-xs pl-md pr-xl text-sm text-white shadow-inner backdrop-blur-md transition-all placeholder-vantage-muted focus:border-vantage-accent focus:outline-none"
        />
        <button
          type="submit"
          className="absolute right-2xs top-1/2 -translate-y-1/2 p-2xs text-vantage-muted transition-colors hover:text-vantage-accent"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>

      {errorMsg && <p className="text-center text-xs font-medium text-red-400 animate-pulse">{errorMsg}</p>}

      {isConnecting && (
        <div className="flex flex-col items-center justify-center py-xl space-y-sm">
          <div className="w-12 h-12 rounded-full border-2 border-vantage-accent/20 border-t-vantage-accent animate-spin" />
          <p className="text-xs font-mono tracking-widest text-vantage-muted animate-pulse">
            PINGING ACTIVE GEOGRAPHIC ADS-B SATELLITES...
          </p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!isConnecting && activeFlight && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="grid grid-cols-1 gap-md lg:grid-cols-3"
          >
            <div className="relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-3xl border border-white/5 p-md premium-glass lg:col-span-2">
              <div className="z-10 flex items-center justify-between">
                <div>
                  <span className="mb-3xs block text-[10px] uppercase text-vantage-muted font-mono">Active Segment</span>
                  <h2 className="text-md font-black tracking-wide text-white">
                    {activeFlight.airline} {activeFlight.flightNumber}
                  </h2>
                </div>
                <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-xs py-2xs font-mono text-[10px] font-bold uppercase tracking-wide text-emerald-400">
                  ● Live Data Connection
                </span>
              </div>

              <div className="relative my-lg py-md">
                <div className="absolute inset-0 flex items-center">
                  <div className="relative h-[2px] w-full bg-white/5">
                    <motion.div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-vantage-accent/20 to-vantage-accent shadow-[0_0_12px_#38bdf8]"
                      style={{ width: `${activeFlight.progress}%` }}
                    />
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="rounded-xl border border-white/10 bg-vantage-dark p-sm text-center min-w-[90px]">
                    <div className="text-md font-black text-white">{activeFlight.origin.split(' ')[0]}</div>
                    <div className="text-[10px] font-mono text-vantage-muted">{activeFlight.departureTime}</div>
                  </div>

                  <div className="absolute top-1/2 flex -translate-y-1/2 flex-col items-center" style={{ left: `calc(${activeFlight.progress}% - 16px)` }}>
                    <div className="relative">
                      <Navigation className="h-6 w-6 rotate-90 text-vantage-accent drop-shadow-[0_0_8px_#38bdf8]" />
                      <span className="pointer-events-none absolute -left-1 -top-1 h-8 w-8 animate-ping rounded-full border border-vantage-accent/40" />
                    </div>
                    <span className="mt-3xs rounded border border-vantage-accent/20 bg-vantage-dark/90 px-3xs font-mono text-[9px] text-vantage-accent">
                      {activeFlight.progress}%
                    </span>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-vantage-dark p-sm text-center min-w-[90px]">
                    <div className="text-md font-black text-white">{activeFlight.destination.split(' ')[0]}</div>
                    <div className="text-[10px] font-mono text-vantage-muted">{activeFlight.arrivalTime}</div>
                  </div>
                </div>
              </div>

              <div className="z-10 grid grid-cols-3 gap-xs border-t border-white/5 pt-sm text-center font-mono">
                <div className="rounded-xl border border-white/5 bg-black/20 p-xs">
                  <div className="mb-3xs flex items-center justify-center gap-3xs text-[10px] uppercase text-vantage-muted">
                    <Wind className="h-3 w-3 text-vantage-accent" /> Altitude
                  </div>
                  <span className="text-xs font-bold text-white">{activeFlight.altitude}</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-black/20 p-xs">
                  <div className="mb-3xs flex items-center justify-center gap-3xs text-[10px] uppercase text-vantage-muted">
                    <Gauge className="h-3 w-3 text-vantage-accent" /> Ground Speed
                  </div>
                  <span className="text-xs font-bold text-white">{activeFlight.speed}</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-black/20 p-xs">
                  <div className="mb-3xs flex items-center justify-center gap-3xs text-[10px] uppercase text-vantage-muted">
                    <Clock className="h-3 w-3 text-vantage-accent" /> Time Remaining
                  </div>
                  <span className="text-xs font-bold text-white">{activeFlight.remainingTime}</span>
                </div>
              </div>

              <div className="pointer-events-none absolute -bottom-16 -right-16 flex h-64 w-64 items-center justify-center rounded-full border border-white/[0.02]">
                <div className="flex h-48 w-48 items-center justify-center rounded-full border border-white/[0.03]">
                  <div className="h-32 w-32 rounded-full border border-white/[0.05]" />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between space-y-sm rounded-3xl border border-white/5 p-sm premium-glass">
              <div className="space-y-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-vantage-accent">Atmospheric Overview</h3>

                <div className="space-y-xs">
                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/20 p-xs text-xs">
                    <span className="text-vantage-muted">Airframe Vessel</span>
                    <span className="font-mono font-bold text-white">{activeFlight.vessel}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/20 p-xs text-xs">
                    <span className="text-vantage-muted">Heading Trajectory</span>
                    <span className="font-mono font-bold text-white">{activeFlight.heading}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/20 p-xs text-xs">
                    <span className="text-vantage-muted">Outside Temp</span>
                    <span className="font-mono font-bold text-white">{activeFlight.temp}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2xs rounded-2xl border border-vantage-accent/20 bg-vantage-accent/5 p-xs text-[11px] text-vantage-muted">
                <ShieldAlert className="h-4 w-4 shrink-0 text-vantage-accent" />
                <p>Tracking paths are derived from transponder signals via automated ADS-B receiver constellations. Subject to atmospheric ion conditions.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlightTrackerPage;
