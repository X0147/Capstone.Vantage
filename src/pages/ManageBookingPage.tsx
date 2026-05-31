import React from 'react';
import { Plane, Clock, MapPin, Printer, Mail, CheckCircle2, Compass, Utensils, ArrowUpRight } from 'lucide-react';

export default function ManageBookingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-mono">
      {/* HEADER SECTION AS SEEN IN SCREENSHOT 2026-05-31 AT 10.29.18.JPG */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-between items-end border-b border-white/5 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white uppercase">Booking Overview</h1>
          <p className="text-xs text-slate-400 mt-1">
            REF: <span className="text-indigo-400 font-bold">OFDTIF69RBJJZIJ1OSMR</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] px-3 py-1 rounded-md font-bold uppercase tracking-wider">
            + CONFIRMED
          </span>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-xs text-slate-400 hover:text-white border border-white/10 hover:border-white/20 bg-slate-900/40 px-3 py-1 rounded-md transition-colors"
          >
            ↻ NEW SEARCH
          </button>
        </div>
      </div>

      {/* CORE WORKSPACE GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: DYNAMIC FLIGHT ITINERARY FRAME */}
        <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl border border-white/15 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-2">
              <Compass className="w-4 h-4" /> 📍 Flight Itinerary Matrix
            </h2>
            <span className="text-[10px] text-slate-500">TRACK_ID: AX7890zklmnpqrt</span>
          </div>

          {/* VERTICAL HIGH-DENSITY ROUTE TIMELINE */}
          <div className="relative border-l border-dashed border-indigo-500/30 ml-4 pl-6 space-y-8">
            {/* DEPARTURE STATION */}
            <div className="relative">
              <span className="absolute -left-[31px] top-0 bg-slate-950 border border-indigo-400 p-1 rounded-full text-indigo-400">
                <MapPin className="w-3 h-3" />
              </span>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-bold">JIB</span>
                  <h4 className="text-sm font-bold text-white mt-1">Djibouti-Ambouli International</h4>
                  <p className="text-xs text-slate-400">Departure Frame: <span className="text-slate-300">01-06-26</span></p>
                </div>
                <div className="text-right text-xs">
                  <span className="text-indigo-400 font-bold block">LEG 01 // TK 1972</span>
                  <span className="text-slate-500">Economy Class</span>
                </div>
              </div>
            </div>

            {/* TRANSCENDENT TRANSIT HUB STOPOVER */}
            <div className="relative bg-slate-950/80 border border-white/5 rounded-xl p-3 flex items-center justify-between">
              <span className="absolute -left-[31px] top-4 bg-slate-950 border border-amber-500/40 p-1 rounded-full text-amber-500 animate-pulse">
                <Clock className="w-3 h-3" />
              </span>
              <div className="font-mono text-xs">
                <span className="text-amber-400 font-bold uppercase">⚠️ Scheduled Layover Connection</span>
                <p className="text-slate-400 mt-0.5">Istanbul Airport (<span className="text-slate-300">IST</span>) — Turkey Transit</p>
              </div>
              <div className="text-right font-mono text-xs text-slate-400">
                <span>Duration: <span className="text-slate-200 font-bold">~1h 20m</span></span>
              </div>
            </div>

            {/* ARRIVAL HUB */}
            <div className="relative">
              <span className="absolute -left-[31px] top-0 bg-slate-950 border border-emerald-400 p-1 rounded-full text-emerald-400">
                <Plane className="w-3 h-3" />
              </span>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-bold">ORD</span>
                  <h4 className="text-sm font-bold text-white mt-1">Chicago O'Hare International</h4>
                  <p className="text-xs text-slate-400">Arrival Frame: <span className="text-slate-300">03-06-26</span></p>
                </div>
                <div className="text-right text-xs">
                  <span className="text-emerald-400 font-bold block">LEG 02 // TK 1918</span>
                  <span className="text-slate-500">Total Loop: ~17h 45m</span>
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC INFORMATION ACTION BANNER (INSTRUCTIONS) */}
          <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-4">
            <div className="flex gap-3">
              <Printer className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-slate-200 uppercase">Physical Kiosk Pass</h5>
                <p className="text-slate-400 mt-0.5">Please print your physical flight ticket voucher directly once you arrive at the designated airport terminal check-in station counter.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-slate-200 uppercase">Itinerary Modification</h5>
                <p className="text-slate-400 mt-0.5">Need to adjust these dates? Forward your verification codes directly to <span className="text-cyan-400 underline">capstone@consultant.com</span> to automatically reschedule.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PASSENGER MANIFEST & CONCIERGE HUB */}
        <div className="space-y-6">
          {/* PASSENGER MANIFEST INTERFACE */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/15 rounded-2xl p-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 border-b border-white/5 pb-2">
              👤 Passenger Manifest
            </h2>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500 uppercase">Primary Traveler</span>
                <span className="text-white font-bold">Jennifer Natalie Newton</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500 uppercase">Contact Node</span>
                <span className="text-slate-300">newtonjenny07@gmail.com</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500 uppercase">Seating Module</span>
                <span className="text-emerald-400 font-bold">12A (Window Row)</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-500 uppercase">Check-In Node</span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                  <CheckCircle2 className="w-3 h-3" /> WEB CHECKED IN
                </span>
              </div>
            </div>
          </div>

          {/* CONCIERGE ACTIONS */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/15 rounded-2xl p-5 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 border-b border-white/5 pb-2">
              🧳 Concierge Actions
            </h2>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => window.location.hash = '/track-flight'}
                className="w-full text-left bg-slate-950 border border-white/5 hover:border-indigo-500/40 p-3 rounded-xl text-xs flex justify-between items-center transition-all group"
              >
                <span className="text-slate-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 group-hover:animate-ping" /> Live Tracking Radar
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </button>
              <button
                type="button"
                className="w-full text-left bg-slate-950 border border-white/5 hover:border-indigo-500/40 p-3 rounded-xl text-xs flex justify-between items-center transition-all group"
              >
                <span className="text-slate-300 flex items-center gap-2">
                  <Utensils className="w-3.5 h-3.5 text-amber-400/80" /> Select Bespoke Meals
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-500" />
              </button>
              <button
                type="button"
                className="w-full text-left bg-slate-950 border border-white/5 hover:border-indigo-500/40 p-3 rounded-xl text-xs flex justify-between items-center transition-all group"
              >
                <span className="text-slate-300 flex items-center gap-2">
                  🛡️ Request Upgrades
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
