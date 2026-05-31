import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard, ArrowRight, Loader2, X, CheckCircle2,
  Plane, Calendar, ShieldCheck, Tag, Users, WifiOff,
  Briefcase, Clock, MapPin, ChevronRight
} from 'lucide-react';

const BOOKING = {
  passengerName: 'Jennifer Natalie Newton',
  bookingReference: 'OFDTIF69RBJJZIJ1OSMR',
  trackingCode: 'AX7890zklmnpqrt',
  status: 'BOARDING PASS ISSUED',
  email: 'newtonjenny07@gmail.com',
  paymentMethod: 'CASH AT COUNTER',
  currencyReceipt: 'USD 4,250.00',
  route: {
    origin: 'JIB',
    originCity: 'Djibouti',
    destination: 'ORD',
    destinationCity: "Chicago O'Hare",
    departureDate: 'Jun 01, 2026',
    departureTime: '23:55',
    arrivalTime: '09:40',
    carrier: 'Turkish Airlines',
    flightNumber: 'TK 1972 / 1918',
  },
  gate: 'B14',
  seat: '12A',
  baggage: '2 Checked Bags',
};

export default function TripsPage() {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleBoardingPassRoute = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/boarding-pass');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden font-sans flex flex-col pt-24 px-4 md:px-8">

      {/* Background glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Breadcrumb */}
      <div className="w-full max-w-4xl mx-auto mb-8 flex items-center gap-2 text-xs text-slate-500 font-mono relative z-10">
        <button type="button" onClick={() => navigate('/')} className="hover:text-slate-300 transition-colors">Hub</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-indigo-400 font-bold">My Trips</span>
      </div>

      <div className="w-full max-w-4xl mx-auto space-y-6 relative z-10">

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white">Your Trips</h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">Active flight manifests &amp; priority clearances</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            1 Active Booking
          </div>
        </div>

        {/* Main Flight Card */}
        <div className="w-full bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-white/8 rounded-[28px] overflow-hidden shadow-2xl">

          {/* Accent bar */}
          <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

          {/* Card Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 md:px-8 pt-6 pb-5 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <Plane className="w-5 h-5 rotate-45" />
              </div>
              <div>
                <span className="text-[9px] font-mono text-slate-500 tracking-widest uppercase block">Capstone Vantage // Flight Record</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-mono font-bold text-indigo-300">{BOOKING.bookingReference}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-600 inline-block" />
                  <span className="text-xs font-mono text-slate-400">{BOOKING.route.flightNumber}</span>
                </div>
              </div>
            </div>
            <span className={`text-[10px] font-mono font-black px-3 py-1 rounded-lg border uppercase tracking-wider ${
              BOOKING.status === 'BOARDING PASS ISSUED'
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
            }`}>
              {BOOKING.status}
            </span>
          </div>

          {/* Route Arc Section */}
          <div className="px-6 md:px-8 py-8">
            <div className="flex items-center justify-between gap-4">
              {/* Origin */}
              <div className="text-left">
                <div className="text-5xl font-black text-white tracking-tighter">{BOOKING.route.origin}</div>
                <div className="text-xs text-slate-400 font-mono mt-1">{BOOKING.route.originCity}</div>
                <div className="flex items-center gap-1.5 mt-2">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span className="text-sm font-mono font-bold text-white">{BOOKING.route.departureTime}</span>
                </div>
              </div>

              {/* Flight Arc */}
              <div className="flex-1 flex flex-col items-center gap-1 px-2">
                <span className="text-[10px] font-mono text-slate-500 bg-slate-950 border border-white/5 px-2 py-0.5 rounded-md">
                  {BOOKING.route.carrier}
                </span>
                <div className="relative w-full flex items-center">
                  <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/40 to-cyan-500/40" />
                  <div className="absolute left-1/2 -translate-x-1/2 -translate-y-3 w-7 h-7 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center justify-center">
                    <Plane className="w-3.5 h-3.5 text-indigo-400 rotate-90" />
                  </div>
                </div>
                <span className="text-[9px] font-mono text-slate-500">Direct / Connecting</span>
              </div>

              {/* Destination */}
              <div className="text-right">
                <div className="text-5xl font-black text-white tracking-tighter">{BOOKING.route.destination}</div>
                <div className="text-xs text-slate-400 font-mono mt-1">{BOOKING.route.destinationCity}</div>
                <div className="flex items-center gap-1.5 mt-2 justify-end">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span className="text-sm font-mono font-bold text-cyan-400">{BOOKING.route.arrivalTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-6 md:px-8 pb-6">
            {[
              { icon: Calendar, label: 'Departure', value: BOOKING.route.departureDate, color: 'text-white' },
              { icon: MapPin, label: 'Gate Lock', value: BOOKING.gate, color: 'text-cyan-400' },
              { icon: Users, label: 'Seat', value: BOOKING.seat, color: 'text-emerald-400' },
              { icon: Briefcase, label: 'Baggage', value: BOOKING.baggage, color: 'text-slate-300' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="bg-slate-950/50 border border-white/5 rounded-2xl p-3.5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Icon className="w-3 h-3 text-slate-500" />
                  <span className="text-[9px] font-mono text-slate-500 uppercase">{label}</span>
                </div>
                <span className={`text-sm font-mono font-black ${color}`}>{value}</span>
              </div>
            ))}
          </div>

          {/* Passenger & Action Row */}
          <div className="border-t border-white/5 px-6 md:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

            {/* Passenger block */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center text-slate-400">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] font-mono text-slate-500 uppercase block">Manifest Index Passenger</span>
                <span className="text-sm font-bold text-white">{BOOKING.passengerName}</span>
              </div>
            </div>

            {/* Payment & Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <div className="hidden sm:block text-right mr-2">
                <span className="text-[9px] font-mono text-slate-500 block uppercase">Ledger Entry</span>
                <span className="text-xs font-mono font-bold text-emerald-400">CASH_AT_COUNTER</span>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="px-4 py-2.5 bg-slate-800 border border-white/10 hover:border-white/20 rounded-xl text-xs font-mono text-slate-300 transition-all hover:text-white flex items-center justify-center gap-2"
              >
                <CreditCard className="w-3.5 h-3.5" /> Payment Ledger
              </button>
              <button
                type="button"
                disabled={isTransitioning}
                onClick={handleBoardingPassRoute}
                className="px-5 py-2.5 bg-white text-slate-950 font-black rounded-xl text-xs font-mono transition-all hover:bg-slate-100 active:scale-95 disabled:opacity-60 flex items-center justify-center gap-1.5 shadow-lg shadow-white/10"
              >
                {isTransitioning ? (
                  <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Structuring Pass...</>
                ) : (
                  <>Boarding Pass <ArrowRight className="w-3.5 h-3.5" /></>
                )}
              </button>
            </div>
          </div>

          {/* Footer strip */}
          <div className="border-t border-white/5 px-6 md:px-8 py-3 flex items-center justify-between font-mono text-[9px] text-slate-600 bg-slate-950/30">
            <div className="flex items-center gap-1.5 text-emerald-500/70">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              MANIFEST VAULT SECURED // AVAILABLE OFFLINE
            </div>
            <span>SYS_REF_0147</span>
          </div>
        </div>

      </div>

      {/* PAYMENT LEDGER DRAWER */}
      <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-900/98 backdrop-blur-3xl border-l border-white/8 transform transition-transform duration-300 ease-out shadow-2xl flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Accent */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">Ledger Reconciliation</h3>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">TX_TYPE: PHYSICAL_CASH // VERIFIED</p>
          </div>
          <button type="button" onClick={() => setIsDrawerOpen(false)} className="p-2 bg-slate-800 border border-white/5 rounded-xl text-slate-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5 font-mono">
          {/* Summary */}
          <div className="bg-gradient-to-br from-emerald-950/40 to-slate-950/80 border border-emerald-500/15 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <span className="text-[9px] text-emerald-500 block uppercase tracking-wider font-bold">Settled Gross Aggregate</span>
              <span className="text-3xl font-black text-emerald-400 mt-1 block">$4,250.00</span>
              <span className="text-[9px] text-slate-500 mt-1 block">USD // Physical Cash Transaction</span>
            </div>
            <div className="text-right">
              <span className="text-[9px] text-slate-500 block uppercase mb-1">Audit State</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20 font-black inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> RECONCILED
              </span>
            </div>
          </div>

          {/* Breakdown */}
          <div>
            <h4 className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-3">Transaction Allocation Matrix</h4>
            <div className="border border-white/5 rounded-2xl overflow-hidden bg-slate-950/50">
              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className="border-b border-white/5 bg-slate-950/80 text-slate-500 font-bold uppercase text-[9px]">
                    <th className="p-3 tracking-wider">Code</th>
                    <th className="p-3 tracking-wider">Description</th>
                    <th className="p-3 text-right tracking-wider">USD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { code: 'FLIGHT-BASE', desc: 'JIB → ORD Fare Block', amount: '$3,800.00' },
                    { code: 'INTL-TAX', desc: 'Crossing & Sovereign Fees', amount: '$300.00' },
                    { code: 'BAG-PREMIUM', desc: '2 Checked Bags Allowance', amount: '$150.00' },
                  ].map(row => (
                    <tr key={row.code} className="hover:bg-white/2 transition-colors">
                      <td className="p-3 font-black text-indigo-300">{row.code}</td>
                      <td className="p-3 text-slate-400">{row.desc}</td>
                      <td className="p-3 text-right font-bold text-white">{row.amount}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-950/80">
                    <td className="p-3 font-black text-white" colSpan={2}>TOTAL</td>
                    <td className="p-3 text-right font-black text-emerald-400">$4,250.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Passenger info */}
          <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-4 space-y-2 text-[11px]">
            <h4 className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-3">Passenger Ledger Index</h4>
            {[
              { label: 'Full Name', value: BOOKING.passengerName },
              { label: 'Email Address', value: BOOKING.email },
              { label: 'PNR Reference', value: BOOKING.bookingReference, mono: true, highlight: true },
              { label: 'Payment Channel', value: BOOKING.paymentMethod },
            ].map(({ label, value, mono, highlight }) => (
              <div key={label} className="flex items-center justify-between py-1 border-b border-white/5 last:border-0">
                <span className="text-slate-500">{label}</span>
                <span className={`${mono ? 'font-mono' : ''} ${highlight ? 'text-indigo-300 font-bold' : 'text-slate-300'}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/5 px-6 py-4 flex items-center gap-2 font-mono text-[9px] text-slate-500">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          SECURE GATEWAY TRANSACTION RECONCILIATION COMPLETED
        </div>
      </div>

      {/* Dimmer */}
      {isDrawerOpen && (
        <div
          role="presentation"
          onClick={() => setIsDrawerOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm"
        />
      )}
    </div>
  );
}
