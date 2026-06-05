import React from 'react';
import { 
  Plane, 
  MapPin, 
  User, 
  Layers, 
  Activity, 
  Clock, 
  Mail, 
  Printer, 
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function TrackPage() {
  // Hardcoded pre-hydrated passenger manifest metrics to bypass login gate
  const manifest = {
    passengerName: "Jennifer Natalie Newton",
    passengerEmail: "newtonjenny07@gmail.com",
    trackingCode: "AX7890zklmnpqrt",
    bookingRef: "OFDTIF69RBJJZIJ1OSMR",
    bookingDate: "24 Apr 2026",
    bookingStatus: "PENDING",
    checkInStatus: "ON HOLD",
    departureDate: "01-06-26",
    arrivalDate: "03-06-26",
    supportEmail: "capstone@consultant.com"
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 font-mono relative overflow-hidden">
      {/* GLOBAL TELEMETRY BACKGROUND GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-6 relative z-10">
        
        {/* HEADER BLOCK */}
        <div className="border-b border-white/10 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div>
              <h1 className="text-lg font-bold tracking-wider uppercase flex items-center gap-2 text-indigo-400">
                <Activity className="w-5 h-5 text-indigo-400 animate-pulse" /> Core Telemetry Terminal
              </h1>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Active Long-Haul Route Architecture // Manifest Lock Enabled
              </p>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-white/10 px-3 py-1.5 rounded-xl text-[11px]">
              <span className="text-slate-500">TRACKING ID:</span>
              <span className="text-indigo-400 font-bold">{manifest.trackingCode}</span>
            </div>
          </div>
        </div>

        {/* STATION BRIEFING BANNER */}
        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex items-start gap-2.5">
            <Printer className="w-4 h-4 text-blue-400 shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-xs text-blue-200 leading-relaxed">
              <span className="font-bold text-white uppercase block sm:inline sm:mr-1">Station Boarding Instruction:</span> 
              Please notify the passenger that she will print her official physical flight ticket once she arrives at the station check-in counter.
            </p>
          </div>
          <div className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-1 rounded border border-blue-500/30 uppercase tracking-wider shrink-0">
            Counter Print Ready
          </div>

          {/* HOLD NOTICE BANNER */}
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-2 text-red-300 transition-colors duration-300">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="font-bold">Flight is on hold pending check-in</span>
          </div>
        </div>

        {/* CORE TELEMETRY MATRIX GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT PANELS: FLIGHT ROUTE & HUBS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* COMPACT INTERACTIVE PATH BAR */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-3 text-xs">
                <span className="text-slate-400 font-bold tracking-wider uppercase flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" /> Transit Dynamics
                </span>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px]">
                  ● STATUS: {manifest.bookingStatus}
                </span>
              </div>

              {/* ROUTE LINE DESIGN */}
              <div className="grid grid-cols-3 items-center text-center relative">
                <div className="text-left">
                  <span className="text-[10px] text-slate-500 uppercase block">Origin Node</span>
                  <span className="text-xl font-bold tracking-wide block text-white">JIB</span>
                  <span className="text-[10px] text-slate-400 block truncate">Djibouti Airport</span>
                </div>

                <div className="flex flex-col items-center justify-center relative">
                  <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded-md font-bold mb-1 z-10">
                    IST Transit
                  </span>
                  <div className="w-full h-[1px] bg-dashed border-t border-white/20 absolute top-1/2 -translate-y-1/2 left-0" />
                  <Plane className="w-4 h-4 text-indigo-400 rotate-90 bg-slate-900 relative z-10 px-0.5" />
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase block">Destination Target</span>
                  <span className="text-xl font-bold tracking-wide block text-white">ORD</span>
                  <span className="text-[10px] text-slate-400 block truncate">Chicago O'Hare</span>
                </div>
              </div>

              {/* TIMELINE TIMESTAMPS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5 text-xs font-mono">
                <div className="bg-slate-950 p-3 border border-white/5 rounded-xl">
                  <span className="text-slate-500 text-[9px] block uppercase tracking-wider">Departure Date</span>
                  <span className="text-slate-200 font-bold flex items-center gap-1.5 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" /> {manifest.departureDate}
                  </span>
                </div>
                <div className="bg-slate-950 p-3 border border-white/5 rounded-xl">
                  <span className="text-slate-500 text-[9px] block uppercase tracking-wider">Arrival Target</span>
                  <span className="text-slate-200 font-bold flex items-center gap-1.5 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" /> {manifest.arrivalDate}
                  </span>
                </div>
              </div>
            </div>

            {/* CHRONOLOGICAL STOP LOG PANEL */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" /> Connecting Route Sequence
              </h3>

              <div className="space-y-2 text-xs relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-[1px] before:bg-white/10">
                
                {/* START STEP */}
                <div className="flex justify-between items-start bg-slate-950 p-3 border border-white/5 rounded-xl relative pl-10">
                  <div className="absolute left-3.5 top-4 w-3 h-3 rounded-full bg-indigo-500 border-2 border-slate-950" />
                  <div>
                    <span className="font-bold text-white">Djibouti-Ambouli International (JIB)</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">Non-stop connections unavailable for this vector</p>
                  </div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Origin</span>
                </div>

                {/* PRIMARY STOPOVER STEP */}
                <div className="flex justify-between items-start bg-slate-950 p-3 border border-white/5 rounded-xl relative pl-10">
                  <div className="absolute left-3.5 top-4 w-3 h-3 rounded-full bg-amber-500 border-2 border-slate-950" />
                  <div>
                    <span className="font-bold text-slate-200">Istanbul Airport (IST) — Turkish Airlines</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Optimal 1-stop connection layout (~17h 45m total flight time with ~1h 20m layover window)
                    </p>
                  </div>
                  <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded h-fit shrink-0">
                    ~17h 45m
                  </span>
                </div>

                {/* FINAL DESTINATION */}
                <div className="flex justify-between items-start bg-slate-950 p-3 border border-white/5 rounded-xl relative pl-10">
                  <div className="absolute left-3.5 top-4 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950" />
                  <div>
                    <span className="font-bold text-slate-200">Chicago O'Hare International (ORD)</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">Terminal customs, entry screening and immigration hub</p>
                  </div>
                  <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded h-fit shrink-0">
                    Arrival
                  </span>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT PANELS: MANIFEST PROFILE & CORE SYSTEM ACTIONS */}
          <div className="space-y-6">
            
            {/* PASSENGER PROFILE LOG */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-white/5 pb-2">
                <User className="w-4 h-4 text-indigo-400" /> Passenger Details
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block">Passenger Last/First Name</span>
                  <span className="text-sm font-bold text-white block mt-0.5">{manifest.passengerName}</span>
                </div>
                
                <div className="border-t border-white/5 pt-2">
                  <span className="text-[9px] text-slate-500 uppercase block">Registered Contact Address</span>
                  <span className="text-slate-300 block font-medium mt-0.5">{manifest.passengerEmail}</span>
                </div>

                <div className="border-t border-white/5 pt-2">
                  <span className="text-[9px] text-slate-500 uppercase block">Booking Reference (PNR)</span>
                  <span className="text-indigo-400 font-bold block tracking-wider mt-0.5">{manifest.bookingRef}</span>
                </div>

                <div className="border-t border-white/5 pt-2">
                  <span className="text-[9px] text-slate-500 uppercase block">Verification Timestamp</span>
                  <span className="text-slate-400 block mt-0.5">Issued: {manifest.bookingDate}</span>
                </div>

                <div className="border-t border-white/5 pt-2">
                  <span className="text-[9px] text-slate-500 uppercase block">Digital Check-In Status</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md tracking-widest inline-flex items-center gap-1.5 mt-1.5 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {manifest.checkInStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* FLIGHT CONTROLS & SUPPORT ACTION PLATFORM */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-white/5 pb-2">
                <AlertCircle className="w-4 h-4 text-indigo-400" /> Terminal Services
              </h3>
              
              <div className="bg-slate-950 p-3 border border-white/5 rounded-xl space-y-2 text-xs">
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Need to alter schedules, update passenger indexes, or modify routing matrices?
                </p>
                <a 
                  href={`mailto:${manifest.supportEmail}?subject=Flight Reschedule Request - ${manifest.bookingRef}`}
                  className="w-full py-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-bold text-center rounded-xl transition-all flex items-center justify-center gap-2 text-[11px]"
                >
                  <Mail className="w-3.5 h-3.5" /> Email to Reschedule
                </a>
              </div>

              <div className="text-[9px] text-slate-500 text-center font-mono">
                System Administrator Node: <span className="text-slate-400">{manifest.supportEmail}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
