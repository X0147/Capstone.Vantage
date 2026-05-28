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
  },
};

type TrackerLocationState = {
  flightNumber?: string;
};

export const FlightTrackerPage: React.FC = () => {
  const location = useLocation();
  const incomingFlight = (location.state as TrackerLocationState | null)?.flightNumber || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFlight, setActiveFlight] = useState<TrackedFlight | null>(MOCK_TRACK_DATA.EK201);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!incomingFlight) return;

    const nextQuery = incomingFlight.toUpperCase();
    setSearchQuery(nextQuery);

    if (MOCK_TRACK_DATA[nextQuery]) {
      setActiveFlight(MOCK_TRACK_DATA[nextQuery]);
      setErrorMsg('');
    }
  }, [incomingFlight]);

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const upperQuery = searchQuery.trim().toUpperCase();
    if (MOCK_TRACK_DATA[upperQuery]) {
      setActiveFlight(MOCK_TRACK_DATA[upperQuery]);
      setErrorMsg('');
    } else {
      setErrorMsg('Active flight signature not detected in global telemetry.');
    }
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
          placeholder="Enter Flight Designation (e.g., EK201, P47120)"
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

      <AnimatePresence mode="wait">
        {activeFlight && (
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
                  <div className="rounded-xl border border-white/10 bg-vantage-dark p-sm text-center">
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

                  <div className="rounded-xl border border-white/10 bg-vantage-dark p-sm text-center">
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
                  <span className="text-xs font-bold text-white">2h 14m</span>
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
                    <span className="font-mono font-bold text-white">Boeing 777-300ER</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/20 p-xs text-xs">
                    <span className="text-vantage-muted">Heading Trajectory</span>
                    <span className="font-mono font-bold text-white">284° Northwest</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/20 p-xs text-xs">
                    <span className="text-vantage-muted">Outside Temp</span>
                    <span className="font-mono font-bold text-white">-54°C</span>
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
