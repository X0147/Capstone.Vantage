import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import { telemetry } from '../utils/telemetryLogger';
import { motion } from 'framer-motion';
import {
  Plane, Calendar, ShieldCheck, ArrowRight,
  Tag, Users, LayoutDashboard, Mail, WifiOff
} from 'lucide-react';

export default function TripsPage() {
  const navigate = useNavigate();
  const bookingDetails = useBookingStore(state => state.bookingDetails);
  const executeAutoLogin = useBookingStore(state => state.executeAutoLogin);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      telemetry.info('Network connection restored.');
    };
    const handleOffline = () => {
      setIsOnline(false);
      telemetry.warn('Network connection severed. Entering offline telemetry mode.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const activeRecord = bookingDetails || {
    passengerName: "Jennifer Natalie Newton",
    bookingReference: "OFDTIF69RBJJZIJ1OSMR",
    trackingCode: "AX7890zklmnpqrt",
    status: "CHECKED IN",
    email: "newtonjenny07@gmail.com",
    paymentMethod: "CASH_AT_COUNTER",
    paymentStatus: "SETTLED",
    currencyReceipt: "USD 4,250.00",
    route: {
      origin: "JIB",
      destination: "ORD",
      departureDate: "Jan 06, 26",
      carrier: "Turkish Airlines",
      flightNumber: "TK 1972 / 1998"
    }
  };

  const handlePassAccess = () => {
    telemetry.info('TripsPage: Accessing digital boarding pass gateway.', {
      pnr: activeRecord.bookingReference
    });
    executeAutoLogin();
    navigate('/boarding-pass');
  };

  return (
    <div className="min-h-screen bg-slate-950/20 text-white relative overflow-hidden font-sans flex flex-col justify-start pt-24 px-4 md:px-8">
      {/* Offline Mode Banner */}
      {!isOnline && (
        <div className="fixed top-0 left-0 w-full bg-red-600 text-white font-mono text-[11px] font-bold py-1.5 px-4 text-center z-50 flex items-center justify-center gap-2 shadow-lg animate-pulse">
          <WifiOff className="w-3.5 h-3.5" />
          <span>OFFLINE MODE ENABLED — CACHED TELEMETRY ACTIVE</span>
        </div>
      )}

      {/* Structural Breadcrumb Line */}
      <div className="w-full max-w-4xl mx-auto mb-6 flex items-center justify-between text-xs text-slate-500 font-mono relative z-10">
        <div className="flex items-center gap-2">
          <span className="hover:text-slate-300 cursor-pointer" onClick={() => navigate('/')}>Hub</span>
          <span>/</span>
          <span className="text-indigo-400">Trips</span>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-slate-600">Secure Network Node</span>
      </div>

      <div className="w-full max-w-4xl mx-auto space-y-6 z-10 relative">
        {/* Page Typography Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent flex items-center gap-3">
            <LayoutDashboard className="w-7 h-7 text-indigo-400" />
            <span>Your Trips</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Monitor upcoming flight itineraries, priority clearances, and security manifests.
          </p>
        </div>

        {/* ENHANCED COMMAND PROFILE HUB CARD */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-gradient-to-br from-slate-900/40 via-slate-900/70 to-slate-950/90 backdrop-blur-2xl border border-white/5 rounded-[24px] p-6 md:p-8 shadow-2xl relative group hover:border-white/10 transition-all duration-300"
        >
          <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-slate-700 tracking-widest select-none pointer-events-none">
            SYS_REF_0147
          </div>

          {/* Upper Info Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Plane className="w-6 h-6 transform rotate-45" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-black tracking-tight text-white">
                    {activeRecord.route.origin} ➔ {activeRecord.route.destination}
                  </h3>
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border ${
                    activeRecord.status === "BOARDING PASS ISSUED"
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                  }`}>
                    {activeRecord.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{activeRecord.route.carrier} • {activeRecord.route.flightNumber}</p>
              </div>
            </div>

            {/* Micro-UX Operator Badge */}
            <div className="bg-slate-950/60 border border-white/10 px-3 py-1.5 rounded-xl font-mono text-[10px] text-indigo-300 font-bold shadow-inner">
              ANTI GRAVITY CODER // AUTHORIZED OPERATOR
            </div>
          </div>

          {/* Lower Grid Sub-Details Layer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-950/40 p-3 rounded-xl border border-white/5">
              <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center gap-1.5 mb-1">
                <Calendar className="w-3 h-3" /> Departure Frame
              </span>
              <span className="text-xs font-bold text-slate-200">{activeRecord.route.departureDate}</span>
            </div>

            <div className="bg-slate-950/40 p-3 rounded-xl border border-white/5">
              <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center gap-1.5 mb-1">
                <Tag className="w-3 h-3" /> Tracking Code
              </span>
              <span className="text-xs font-mono text-slate-300 font-medium">{activeRecord.trackingCode}</span>
            </div>

            <div className="bg-slate-950/40 p-3 rounded-xl border border-white/5">
              <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-3 h-3" /> Booking PNR
              </span>
              <span className="text-xs font-mono font-bold text-indigo-400">{activeRecord.bookingReference}</span>
            </div>

            <div className="bg-slate-950/40 p-3 rounded-xl border border-white/5">
              <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center gap-1.5 mb-1">
                <Users className="w-3 h-3" /> Passenger Index
              </span>
              <span className="text-xs font-sans font-bold text-slate-200 truncate block">
                {activeRecord.passengerName}
              </span>
            </div>
          </div>

          {/* Payment Method Ledger Card & Action Triggers */}
          <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-8 bg-emerald-950/20 border border-emerald-500/10 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono tracking-wider text-emerald-500 uppercase block font-black">Reconciled Ledger Entry</span>
                <p className="text-xs font-medium text-slate-300">
                  Payment Tracked: <span className="font-mono text-emerald-400 font-bold">{activeRecord.paymentMethod?.replace('_', ' ')}</span>
                </p>
              </div>
              <div className="text-right sm:text-right">
                <span className="text-[9px] font-mono text-slate-500 block uppercase">Settled Amount</span>
                <span className="text-xs font-mono font-black text-white">{activeRecord.currencyReceipt || "USD 4,250.00"}</span>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row gap-2 w-full">
              <a
                href={`mailto:${activeRecord.email || "newtonjenny07@gmail.com"}`}
                className="flex-1 bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-850 text-xs font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 group"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Get Payment Info</span>
              </a>

              <button
                onClick={handlePassAccess}
                className="flex-1 bg-white text-slate-950 hover:bg-slate-200 text-xs font-black py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-xl"
              >
                <span>Boarding Pass</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
