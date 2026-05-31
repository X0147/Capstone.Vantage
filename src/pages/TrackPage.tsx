import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Plane, 
  MapPin, 
  User, 
  Layers, 
  Activity, 
  Clock, 
  Search, 
  Compass, 
  ArrowRight 
} from 'lucide-react';

export default function TrackPage() {
  // Pre-loaded tracking target state (No login/lookup required)
  const [searchQuery, setSearchQuery] = useState('AX7890zklmnpqrt');
  const [timeToDeparture, setTimeToDeparture] = useState('12h 01m 02s');

  // Live countdown array targeting the 01-06-26 departure window
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      // Target departure point: June 1st, 2026
      const target = new Date('2026-06-01T23:55:00');
      const diff = target.getTime() - now.getTime();

      if (diff > 0) {
        // FIXED: Balanced parentheses so .padStart() correctly evaluates on the converted string
        const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
        const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
        
        setTimeToDeparture(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeToDeparture('DEPARTED // AIRBORNE');
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-mono relative overflow-hidden">
      {/* BACKGROUND TELEMETRY GRID LINES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* TOP DECK INTERFACE ACTION BAR */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-4 relative z-10">
        <div>
          <h1 className="text-xl font-bold tracking-wider uppercase flex items-center gap-2 text-indigo-400">
            <Radio className="w-5 h-5 text-indigo-400 animate-pulse" /> Live Tracking Radar
          </h1>
          <p className="text-[11px] text-slate-500 mt-0.5">Active Airspace Telemetry Feed // Core System Node</p>
        </div>

        {/* INPUT LOOKUP BYPASS ROW */}
        <div className="flex items-center gap-2 bg-slate-900/60 border border-white/10 rounded-xl p-1.5 w-full md:w-auto max-w-sm">
          <Search className="w-4 h-4 text-slate-500 ml-2" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-indigo-300 focus:outline-none w-full md:w-56"
            placeholder="ENTER METRIC TRACKING CODE..."
          />
          <span className="text-[9px] bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20 px-2 py-1 rounded uppercase shrink-0">
            SYS_LOCK
          </span>
        </div>
      </div>

      {/* CORE TELEMETRY TRACKING CONTAINER */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* LEFT COLUMN: ACTIVE RADAR TRACKING GRAPH & MILESTONES */}
        <div className="lg:col-span-2 space-y-6">
          {/* RADAR SWEEP FLIGHT BAR PANEL */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/15 rounded-2xl p-6 space-y-6 relative overflow-hidden">
            <div className="flex justify-between items-center text-xs border-b border-white/5 pb-3">
              <div className="flex items-center gap-2 text-slate-400 font-bold">
                <Activity className="w-4 h-4 text-emerald-400" /> FLIGHT PATH TELEMETRY
              </div>
              <span className="text-emerald-400 font-bold animate-pulse text-[11px]">● READY FOR DEPARTURE</span>
            </div>

            {/* HIGH-DENSITY PROGRESS BAR GRID */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-500 block uppercase">Origin Node</span>
                  <span className="text-lg font-bold text-white tracking-wide">JIB <span className="text-xs text-slate-400 font-normal">(Djibouti)</span></span>
                </div>
                <div className="text-center group px-4 py-1.5 border border-white/5 bg-slate-950/60 rounded-xl">
                  <span className="text-[9px] text-indigo-400 block font-bold tracking-widest uppercase">Flight Number</span>
                  <span className="text-xs text-slate-300 font-bold flex items-center gap-1">TK 1972 <Plane className="w-3 h-3 text-indigo-400" /></span>
                </div>
                <div className="space-y-0.5 text-right">
                  <span className="text-[10px] text-slate-500 block uppercase">Destination Hub</span>
                  <span className="text-lg font-bold text-white tracking-wide">ORD <span className="text-xs text-slate-400 font-normal">(Chicago)</span></span>
                </div>
              </div>

              {/* LINEAR POSITION MATRIC BAR */}
              <div className="relative pt-2">
                <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full w-[12%] bg-gradient-to-right from-indigo-500 to-indigo-400 rounded-full relative animate-pulse" />
                </div>
                {/* Visual Position Flag */}
                <div className="absolute top-[3px] left-[10%] -translate-x-1/2 flex flex-col items-center">
                  <span className="w-3 h-3 rounded-full bg-indigo-400 border-2 border-slate-950 shadow-md animate-ping absolute" />
                  <span className="w-3 h-3 rounded-full bg-indigo-400 border-2 border-slate-950 shadow-md" />
                </div>
              </div>

              {/* SUB-TEXT TIMELINE TRACKS */}
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                <span>GATE DEPARTURE PROXIMITY</span>
                <span className="text-indigo-400 font-bold">LOCKED AT COUNTER STAGE</span>
                <span>ARRIVAL RADAR FRAME</span>
              </div>
            </div>

            {/* LIVE COUNTDOWN METRIC BOX */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/5">
              <div className="bg-slate-950 p-3 border border-white/5 rounded-xl font-mono text-xs">
                <span className="text-slate-500 uppercase block text-[9px]">Countdown to Gate Lock</span>
                <span className="text-sm font-bold text-indigo-400 tracking-wider block mt-0.5">{timeToDeparture}</span>
              </div>
              <div className="bg-slate-950 p-3 border border-white/5 rounded-xl font-mono text-xs">
                <span className="text-slate-500 uppercase block text-[9px]">Intermediate Transit</span>
                <span className="text-sm font-bold text-amber-500 block mt-0.5">IST (Istanbul Stop)</span>
              </div>
              <div className="bg-slate-950 p-3 border border-white/5 rounded-xl font-mono text-xs">
                <span className="text-slate-500 uppercase block text-[9px]">Calculated Loop Velocity</span>
                <span className="text-sm font-bold text-slate-300 block mt-0.5">~17h 45m Total Time</span>
              </div>
            </div>

          </div>

          {/* CHRONOLOGICAL MULTI-STOP MATRIX LOGS */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/15 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" /> Chronological Air Corridor Matrix
            </h3>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center bg-slate-950 p-3 border border-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  <div>
                    <span className="font-bold text-white">Djibouti-Ambouli International (JIB)</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">Departure Target: 01-06-26</p>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded">ORIGIN</span>
              </div>

              <div className="flex justify-between items-center bg-slate-950 p-3 border border-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <div>
                    <span className="font-bold text-slate-200">Istanbul Airport Hub (IST)</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">Layover Window Transition: ~1h 20m Connection</p>
                  </div>
                </div>
                <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded">STOPOVER</span>
              </div>

              <div className="flex justify-between items-center bg-slate-950 p-3 border border-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="font-bold text-slate-200">Chicago O'Hare International (ORD)</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">Arrival Destination: 03-06-26</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 font-bold bg-slate-800 border border-white/5 px-2 py-1 rounded">FINAL</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PRE-HYDRATED TARGET MANIFEST PROFILE */}
        <div className="space-y-6">
          {/* JENNIFER'S PASSENGER CONTAINER */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/15 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-white/5 pb-2">
              <User className="w-4 h-4 text-indigo-400" /> Target Manifest Entry
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-500 uppercase block">Passenger Identity</span>
                <span className="text-sm font-bold text-white block">Jennifer Natalie Newton</span>
              </div>
              
              <div className="space-y-0.5 border-t border-white/5 pt-2">
                <span className="text-[9px] text-slate-500 uppercase block">Secure Contact Node</span>
                <span className="text-xs text-slate-300 block">newtonjenny07@gmail.com</span>
              </div>

              <div className="space-y-0.5 border-t border-white/5 pt-2">
                <span className="text-[9px] text-slate-500 uppercase block">Booking Reference PNR</span>
                <span className="text-xs text-indigo-400 font-bold block">OFDTIF69RBJJZIJ1OSMR</span>
              </div>

              <div className="space-y-0.5 border-t border-white/5 pt-2">
                <span className="text-[9px] text-slate-500 uppercase block">Web Check-In State</span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md inline-block mt-1">● SUCCESS // CHECKED IN</span>
              </div>
            </div>
          </div>

          {/* ACTION NAVIGATION CONTROLS */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/15 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest block border-b border-white/5 pb-2">🛰️ System Actions</h3>
            <button
              type="button"
              onClick={() => window.location.hash = '/manage-booking'}
              className="w-full text-left bg-slate-950 border border-white/5 hover:border-indigo-500/30 p-3 rounded-xl text-xs flex justify-between items-center group transition-colors"
            >
              <span className="text-slate-300">View Core Manifest Details</span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </button>
            <div className="text-[10px] text-slate-500 text-center font-mono pt-1">
              Need alterations? Mail <span className="text-slate-400 underline">capstone@consultant.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
