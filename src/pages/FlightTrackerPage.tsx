import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Search, Compass, ShieldAlert, Navigation, Wind, Gauge, Clock, Plane, Map as MapIcon, RefreshCw, AlertTriangle } from 'lucide-react';
import { analyzeRoute } from '../utils/aviation';
import { POPULAR_FLIGHTS } from '../data/popularFlights';

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
  lat: number;
  lon: number;
  isLiveAPI: boolean;
}

const MOCK_AIRLINES: Record<string, string> = {
  AA: 'American Airlines', UA: 'United Airlines', DL: 'Delta Air Lines', LH: 'Lufthansa',
  BA: 'British Airways', AF: 'Air France', SQ: 'Singapore Airlines', VS: 'Virgin Atlantic',
  EK: 'Emirates', QR: 'Qatar Airways', P4: 'Air Peace', KL: 'KLM Royal Dutch',
  NH: 'All Nippon Airways', CX: 'Cathay Pacific', QF: 'Qantas'
};

const HEADINGS = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];

export const FlightTrackerPage: React.FC = () => {
  const location = useLocation();
  const incomingFlight = (location.state as any)?.flightNumber || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFlight, setActiveFlight] = useState<TrackedFlight | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    if (incomingFlight) {
      setSearchQuery(incomingFlight.toUpperCase());
      triggerTracking(incomingFlight.toUpperCase());
    } else {
      // Auto-load EK201 by default to show something
      triggerTracking('EK201');
    }
  }, [incomingFlight]);

  // Auto-refresh live data every 30 seconds
  useEffect(() => {
    if (!activeFlight || !activeFlight.isLiveAPI) return;
    const interval = setInterval(() => {
      triggerTracking(activeFlight.flightNumber, true);
    }, 30000);
    return () => clearInterval(interval);
  }, [activeFlight?.flightNumber, activeFlight?.isLiveAPI]);

  const generateMockFlight = (flightNo: string): TrackedFlight => {
    const carrierCode = flightNo.slice(0, 2);
    const airline = MOCK_AIRLINES[carrierCode] || 'Vantage Global Alliance';
    let seed = 0;
    for (let i = 0; i < flightNo.length; i++) seed += flightNo.charCodeAt(i);
    
    return {
      flightNumber: flightNo,
      airline,
      origin: 'JFK',
      destination: 'LHR',
      status: 'In-Flight',
      altitude: `${30000 + (seed % 10000)} ft`,
      speed: `${450 + (seed % 100)} mph`,
      progress: 10 + (seed % 80),
      departureTime: '08:00 AM',
      arrivalTime: '08:00 PM',
      vessel: 'Boeing 787-9',
      heading: `${seed % 360}° ${HEADINGS[seed % 8]}`,
      temp: `-${45 + (seed % 10)}°C`,
      remainingTime: `${1 + (seed % 6)}h ${seed % 60}m`,
      lat: 0,
      lon: 0,
      isLiveAPI: false
    };
  };

  const fetchLiveFlightData = async (flightNo: string) => {
    try {
      // Using AllOrigins to bypass CORS for public ADS-B Exchange
      // Note: This is a public best-effort endpoint, might fail
      const url = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://hexdb.io/api/v1/flight/${flightNo}`)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('API Error');
      
      const data = await response.json();
      const payload = JSON.parse(data.contents);
      
      if (!payload || !payload.lat) throw new Error('No live data');

      const carrierCode = flightNo.slice(0, 2);
      
      return {
        flightNumber: flightNo,
        airline: MOCK_AIRLINES[carrierCode] || 'Vantage Live',
        origin: 'Unknown',
        destination: 'Unknown',
        status: 'In-Flight' as const,
        altitude: `${payload.alt_baro || 35000} ft`,
        speed: `${payload.gs || 500} mph`,
        progress: 50, // Hard to calculate without known origin/dest lat/lon exactly
        departureTime: 'Live',
        arrivalTime: 'Live',
        vessel: payload.t || 'Unknown Aircraft',
        heading: `${payload.track || 0}°`,
        temp: 'N/A',
        remainingTime: 'Live Tracking',
        lat: payload.lat,
        lon: payload.lon,
        isLiveAPI: true
      };
    } catch (err) {
      // Fallback to mock generated data
      return generateMockFlight(flightNo);
    }
  };

  const triggerTracking = async (flightNo: string, isSilentRefresh = false) => {
    if (!isSilentRefresh) {
      setIsConnecting(true);
      setErrorMsg('');
    }

    try {
      if (flightNo.length < 3) {
        throw new Error('Please enter a valid flight designation (e.g. EK201).');
      }
      
      const data = await fetchLiveFlightData(flightNo);
      setActiveFlight(data);
      setLastUpdated(new Date());
    } catch (err: any) {
      setErrorMsg(err.message || 'Tracking failed.');
      if (!isSilentRefresh) setActiveFlight(null);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const upperQuery = searchQuery.trim().toUpperCase();
    if (!upperQuery) return;
    triggerTracking(upperQuery);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-lg px-sm py-lg">
      <div className="text-center space-y-3xs">
        <div className="inline-flex items-center gap-2xs rounded-full border border-vantage-accent/20 bg-vantage-accent/10 px-xs py-3xs text-[10px] font-bold uppercase tracking-widest text-vantage-accent">
          <Compass className="h-3 w-3 animate-spin-slow" /> Global ADS-B Telemetry Network
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white font-display italic">
          Live Airspace Surveillance
        </h1>
        <p className="mx-auto max-w-md text-xs text-vantage-muted">
          Intercept active transponder signals and monitor vector velocities across any international carrier in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-md">
        
        {/* Left Column: Search & Popular */}
        <div className="lg:col-span-1 space-y-md">
          <form onSubmit={handleTrackSearch} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Designation (e.g., EK201)"
              className="w-full rounded-2xl border border-white/10 bg-black/40 py-sm pl-md pr-xl text-sm text-white shadow-inner backdrop-blur-md transition-all placeholder-vantage-muted focus:border-vantage-accent focus:outline-none focus:bg-black/60 font-mono uppercase"
            />
            <button
              type="submit"
              className="absolute right-2xs top-1/2 -translate-y-1/2 p-sm text-vantage-muted transition-colors hover:text-vantage-accent bg-white/5 rounded-xl hover:bg-vantage-accent/20"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          {errorMsg && (
            <div className="p-sm rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-xs">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <p>{errorMsg}</p>
            </div>
          )}

          <div className="rounded-3xl border border-white/5 p-sm bg-black/20 premium-glass hidden lg:block">
            <h3 className="text-[10px] font-mono uppercase tracking-widest text-vantage-muted mb-sm px-2xs">
              Active Signatures
            </h3>
            <div className="space-y-xs">
              {POPULAR_FLIGHTS.map((flight) => (
                <button
                  key={flight.flight}
                  onClick={() => {
                    setSearchQuery(flight.flight);
                    triggerTracking(flight.flight);
                  }}
                  className={`w-full text-left p-xs rounded-xl border flex items-center justify-between transition-all ${
                    activeFlight?.flightNumber === flight.flight
                      ? 'bg-vantage-accent/10 border-vantage-accent/40 shadow-[0_0_15px_rgba(56,189,248,0.15)]'
                      : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold text-white font-mono">{flight.flight}</p>
                    <p className="text-[10px] text-vantage-muted">{flight.origin} → {flight.dest}</p>
                  </div>
                  <Plane className={`w-4 h-4 ${activeFlight?.flightNumber === flight.flight ? 'text-vantage-accent' : 'text-white/20'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Tracker Interface */}
        <div className="lg:col-span-3">
          {isConnecting && !activeFlight ? (
            <div className="w-full h-[500px] rounded-3xl border border-white/5 bg-black/20 premium-glass flex flex-col items-center justify-center space-y-md">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-2 border-white/10" />
                <div className="absolute inset-0 rounded-full border-2 border-t-vantage-accent animate-spin" />
                <Compass className="absolute inset-0 m-auto w-6 h-6 text-vantage-accent animate-pulse" />
              </div>
              <p className="text-xs font-mono tracking-widest text-vantage-muted animate-pulse">
                ESTABLISHING SATELLITE UPLINK...
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {activeFlight && (
                <motion.div
                  key="tracker"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-md"
                >
                  <div className="flex flex-col xl:flex-row gap-md">
                    
                    {/* Main Radar Screen */}
                    <div className="flex-1 rounded-3xl border border-white/5 p-md bg-black/30 premium-glass relative overflow-hidden min-h-[400px] flex flex-col">
                      <div className="flex items-center justify-between z-10 mb-md relative">
                        <div>
                          <h2 className="text-2xl font-black text-white flex items-center gap-sm">
                            {activeFlight.airline} {activeFlight.flightNumber}
                            {activeFlight.isLiveAPI ? (
                              <span className="flex items-center gap-1 text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-xs py-0.5 rounded border border-emerald-500/30 tracking-widest uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                ADS-B Live
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-[10px] font-mono bg-amber-500/20 text-amber-400 px-xs py-0.5 rounded border border-amber-500/30 tracking-widest uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                Simulated Vector
                              </span>
                            )}
                          </h2>
                          <p className="text-xs text-vantage-muted font-mono mt-1 flex items-center gap-2">
                            <RefreshCw className="w-3 h-3" /> Last updated: {lastUpdated?.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>

                      {/* Map Area */}
                      <div className="flex-1 relative rounded-2xl bg-[#0a0f16] border border-white/5 overflow-hidden flex items-center justify-center">
                        {/* Map Grid Background */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                        
                        {/* Fake Map SVG overlay for aesthetics */}
                        <MapIcon className="absolute inset-0 m-auto w-full h-[150%] text-white/[0.02] -rotate-12" />

                        {/* Animated Radar Sweep */}
                        <div className="absolute left-1/2 top-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-500/10 shadow-[inset_0_0_100px_rgba(56,189,248,0.05)]">
                          <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent to-sky-400/50 origin-left animate-[spin_4s_linear_infinite]" />
                        </div>

                        {/* Flight Path Arc */}
                        <div className="absolute inset-x-12 top-1/2 h-32 border-t-2 border-dashed border-sky-500/30 rounded-t-[100%] pointer-events-none" />

                        {/* The Plane */}
                        <motion.div 
                          className="absolute z-20 flex flex-col items-center"
                          initial={{ left: '10%' }}
                          animate={{ left: `${activeFlight.progress}%` }}
                          transition={{ duration: 2, ease: "easeOut" }}
                          style={{ top: 'calc(50% - 16px)' }}
                        >
                          <div className="relative">
                            <Navigation className="w-8 h-8 text-sky-400 rotate-90 drop-shadow-[0_0_15px_rgba(56,189,248,0.8)]" />
                            <div className="absolute inset-0 bg-sky-400/40 blur-md rounded-full" />
                            {activeFlight.isLiveAPI && (
                              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                            )}
                          </div>
                          <div className="mt-2 bg-black/80 backdrop-blur-sm border border-sky-500/30 px-xs py-1 rounded text-[10px] font-mono text-sky-300 shadow-lg">
                            {activeFlight.altitude}
                          </div>
                        </motion.div>

                        {/* Origin / Dest Markers */}
                        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
                          <div className="w-4 h-4 rounded-full bg-white/20 border-2 border-white/40 mb-2" />
                          <div className="text-white font-bold font-mono bg-black/50 px-2 rounded backdrop-blur-sm">{activeFlight.origin}</div>
                        </div>
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
                          <div className="w-4 h-4 rounded-full bg-sky-500/20 border-2 border-sky-400 mb-2" />
                          <div className="text-white font-bold font-mono bg-black/50 px-2 rounded backdrop-blur-sm">{activeFlight.destination}</div>
                        </div>
                      </div>

                    </div>

                    {/* Telemetry Sidebar */}
                    <div className="w-full xl:w-72 flex flex-col gap-sm">
                      <div className="rounded-3xl border border-white/5 p-sm bg-black/30 premium-glass">
                        <h3 className="text-[10px] uppercase tracking-widest text-vantage-accent mb-sm">Flight Telemetry</h3>
                        <div className="grid grid-cols-2 gap-xs">
                          <div className="bg-black/40 rounded-2xl p-sm border border-white/5">
                            <Wind className="w-4 h-4 text-vantage-muted mb-xs" />
                            <p className="text-[10px] text-vantage-muted uppercase">Altitude</p>
                            <p className="text-sm font-bold text-white font-mono">{activeFlight.altitude}</p>
                          </div>
                          <div className="bg-black/40 rounded-2xl p-sm border border-white/5">
                            <Gauge className="w-4 h-4 text-vantage-muted mb-xs" />
                            <p className="text-[10px] text-vantage-muted uppercase">Speed</p>
                            <p className="text-sm font-bold text-white font-mono">{activeFlight.speed}</p>
                          </div>
                          <div className="bg-black/40 rounded-2xl p-sm border border-white/5">
                            <Compass className="w-4 h-4 text-vantage-muted mb-xs" />
                            <p className="text-[10px] text-vantage-muted uppercase">Heading</p>
                            <p className="text-sm font-bold text-white font-mono">{activeFlight.heading}</p>
                          </div>
                          <div className="bg-black/40 rounded-2xl p-sm border border-white/5">
                            <Clock className="w-4 h-4 text-vantage-muted mb-xs" />
                            <p className="text-[10px] text-vantage-muted uppercase">Est. Arrival</p>
                            <p className="text-sm font-bold text-white font-mono">{activeFlight.arrivalTime}</p>
                          </div>
                        </div>
                      </div>

                      {/* Route Intelligence Box */}
                      {activeFlight.origin !== 'Unknown' && (
                        <div className="rounded-3xl border border-white/5 p-sm bg-black/30 premium-glass flex-1 flex flex-col">
                          <h3 className="text-[10px] uppercase tracking-widest text-vantage-accent mb-sm">Route Analysis</h3>
                          <div className="flex-1 flex flex-col justify-center space-y-sm">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-vantage-muted">Aircraft</span>
                              <span className="font-mono text-white">{activeFlight.vessel}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-vantage-muted">Status</span>
                              <span className="font-mono text-emerald-400">{activeFlight.status}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-vantage-muted">Duration Left</span>
                              <span className="font-mono text-sky-300">{activeFlight.remainingTime}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

      </div>
    </div>
  );
};

export default FlightTrackerPage;
