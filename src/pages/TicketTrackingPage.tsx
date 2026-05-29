import React, { useState } from 'react';
import { useBookingStore } from '../store/useBookingStore';
import {
  Search, Ticket, Plane, ShieldAlert, QrCode, RefreshCw,
  User, MapPin, Clock, CalendarDays, ArrowRight, CheckCircle,
  Fingerprint, RotateCcw,
} from 'lucide-react';

/* ── Minimal demo ticket generator ──────────────────────────────── */
interface MockTicket {
  pnr: string;
  passengerFirstName: string;
  passengerLastName: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  seat: string;
  cabin: string;
  gate: string;
  status: string;
  terminal: string;
}

function generateMockTicket(pnr: string, lastName: string): MockTicket {
  const destinations = [
    { origin: 'JFK', destination: 'LHR', flight: 'CV 101', duration: 7.5 },
    { origin: 'JFK', destination: 'CDG', flight: 'CV 203', duration: 7 },
    { origin: 'LHR', destination: 'DXB', flight: 'CV 312', duration: 7 },
    { origin: 'SIN', destination: 'HND', flight: 'CV 508', duration: 7 },
  ];
  const route = destinations[pnr.charCodeAt(0) % destinations.length];
  const dep = new Date(Date.now() + 86400000 * 2);
  dep.setHours(9 + (pnr.charCodeAt(1) % 12), 0, 0, 0);
  const arr = new Date(dep.getTime() + route.duration * 3600000);
  const seats = ['1A', '2C', '12F', '22B', '34E'];
  return {
    pnr: pnr.toUpperCase(),
    passengerFirstName: 'Laurence',
    passengerLastName: lastName.toUpperCase(),
    flightNumber: route.flight,
    origin: route.origin,
    destination: route.destination,
    departureTime: dep.toISOString(),
    arrivalTime: arr.toISOString(),
    seat: seats[pnr.charCodeAt(2) % seats.length],
    cabin: 'Business Class',
    gate: `B${10 + (pnr.charCodeAt(3) % 20)}`,
    terminal: `Terminal ${2 + (pnr.charCodeAt(0) % 3)}`,
    status: 'ON_TIME',
  };
}

function fmt(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  });
}

export default function TicketTrackingPage() {
  const { trackedTicket, trackError, lookupTicket, clearTrackedTicket } = useBookingStore();

  const [pnr, setPnr] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [localTicket, setLocalTicket] = useState<MockTicket | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleLookup = async (e: React.SyntheticEvent) => {
    // ... unchanged ...

    e.preventDefault();
    if (!pnr ?? !lastName) return;
    setLocalError(null);
    setIsSearching(true);

    await new Promise((r) => setTimeout(r, 1200));

    if (pnr.length < 4) {
      setLocalError('PNR must be at least 4 characters. Try "VNTG6K".');
      setIsSearching(false);
      return;
    }

    // Try the store first; fall back to mock
    await lookupTicket(pnr, lastName);
    if (!useBookingStore.getState().trackedTicket) {
      setLocalTicket(generateMockTicket(pnr, lastName));
    }
    setIsSearching(false);
  };

  const handleReset = () => {
    clearTrackedTicket();
    setLocalTicket(null);
    setLocalError(null);
    setPnr('');
    setLastName('');
  };

  const ticket = trackedTicket ?? localTicket;

  return (
    <div className="w-full min-h-screen flex flex-col relative -mt-24 pt-24 overflow-hidden">
      {/* ── Full-screen background ─────────────────────────── */}
      <img
        src={`${import.meta.env.BASE_URL ?? '/' }images/20_sunset_flight.jpg`}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover scale-105 animate-slow-zoom"
      />
      {/* Dark gradient overlay — light enough to keep image visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-sm pt-md pb-lg">
        <div className="flex items-center gap-xs mb-xs">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <p className="text-[9px] font-mono uppercase tracking-widest text-vantage-gold">
            Smart Ticket Ledger
          </p>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-black text-white text-center tracking-wider">
          Flight <span className="text-gradient-gold italic">Passport</span>
        </h1>
        <p className="text-center text-sm text-vantage-muted mt-xs max-w-[480px] mx-auto">
          Enter your Booking Reference and surname to retrieve your live boarding pass and real-time flight status.
        </p>
      </div>

      {/* ── Main Content ────────────────────────────────────── */}
      <div className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-sm pb-xl">
        {!ticket ? (
          /* ── LOOKUP FORM ─────────────────────────────────── */
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div
              className="w-full max-w-[480px] rounded-[2rem] border p-xl space-y-md shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
              style={{
                background: 'rgba(0,0,0,0.35)',
                backdropFilter: 'blur(28px) saturate(180%)',
                WebkitBackdropFilter: 'blur(28px) saturate(180%)',
                borderColor: 'rgba(212,175,55,0.2)',
              }}
            >
              {/* Icon header */}
              <div className="flex flex-col items-center gap-sm text-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-vantage-gold/20 blur-xl" />
                  <div className="relative w-16 h-16 rounded-full bg-black/60 border border-vantage-gold/30 flex items-center justify-center">
                    <Ticket className="w-7 h-7 text-vantage-gold" />
                  </div>
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-white">Retrieve Boarding Pass</h2>
                  <p className="text-[11px] text-vantage-muted mt-3xs">Cryptographic ticket ledger lookup</p>
                </div>
              </div>

              <form onSubmit={handleLookup} className="space-y-sm">
                {/* PNR */}
                <div className="space-y-2xs">
                  <label htmlFor="pnr-input" className="block text-[9px] uppercase tracking-widest text-vantage-gold/80 font-bold">
                    Booking Reference (PNR)
                  </label>
                  <div className="relative group">
                    <Ticket className="absolute left-sm top-1/2 -translate-y-1/2 w-4 h-4 text-vantage-muted group-focus-within:text-vantage-gold transition-colors" />
                    <input id="pnr-input"
                      type="text"
                      maxLength={6}
                      value={pnr}
                      onChange={(e) => setPnr(e.target.value.toUpperCase())}
                      placeholder="e.g. VNTG6K"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-sm py-sm text-sm text-white uppercase font-mono tracking-widest focus:outline-none focus:border-vantage-gold/50 focus:bg-white/[0.07] transition-all placeholder:text-vantage-muted/40 placeholder:normal-case placeholder:tracking-normal"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="space-y-2xs">
                  <label htmlFor="lastname-input" className="block text-[9px] uppercase tracking-widest text-vantage-gold/80 font-bold">
                    Passenger Surname
                  </label>
                  <div className="relative group">
                    <User className="absolute left-sm top-1/2 -translate-y-1/2 w-4 h-4 text-vantage-muted group-focus-within:text-vantage-gold transition-colors" />
                    <input id="lastname-input"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="As written on passport"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-sm py-sm text-sm text-white focus:outline-none focus:border-vantage-gold/50 focus:bg-white/[0.07] transition-all placeholder:text-vantage-muted/40"
                    />
                  </div>
                </div>

                {/* Error */}
                {(localError ?? trackError) && (
                  <div className="flex items-center gap-2xs p-xs rounded-2xl bg-red-500/8 border border-red-500/20 text-red-400 text-xs">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{localError ?? trackError}</span>
                  </div>
                )}

                {/* CTA */}
                <button
                  type="submit"
                  disabled={isSearching}
                  className="w-full group flex items-center justify-center gap-sm py-sm rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-black font-black text-sm uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] active:scale-[0.98] disabled:opacity-50"
                >
                  {isSearching ? (
                    <><RefreshCw className="w-4 h-4 animate-spin" /> Scanning Ledger...</>
                  ) : (
                    <><Search className="w-4 h-4" /> Retrieve Ticket<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></>
                  )}
                </button>
              </form>

              {/* Biometric alt */}
              <div className="flex flex-col items-center gap-xs pt-xs border-t border-white/8">
                <p className="text-[9px] uppercase tracking-widest text-vantage-muted font-mono">Or authenticate via</p>
                <button
                  type="button"
                  className="flex items-center gap-xs px-sm py-2xs rounded-full border border-white/10 text-vantage-muted hover:text-vantage-gold hover:border-vantage-gold/30 text-xs transition-all"
                >
                  <Fingerprint className="w-4 h-4" /> Biometric Identity
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ── BOARDING PASS ────────────────────────────────── */
          <div className="space-y-md animate-fade-in-up">
            {/* Header row */}
            <div className="flex items-center justify-between flex-wrap gap-xs">
              <div className="flex items-center gap-xs">
                <span className="inline-flex items-center gap-2xs text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 px-sm py-3xs rounded-full border border-emerald-500/20 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  {ticket.status.replace('_', ' ')}
                </span>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-2xs text-xs text-vantage-muted hover:text-vantage-gold border border-white/10 hover:border-vantage-gold/30 px-sm py-2xs rounded-full transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" /> New Lookup
              </button>
            </div>

            {/* Boarding pass card */}
            <div
              className="w-full rounded-[2rem] border overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
              style={{
                background: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(32px) saturate(180%)',
                WebkitBackdropFilter: 'blur(32px) saturate(180%)',
                borderColor: 'rgba(212,175,55,0.2)',
              }}
            >
              {/* Top strip */}
              <div className="bg-gradient-to-r from-[#d4af37]/10 via-[#d4af37]/5 to-transparent border-b border-vantage-gold/10 px-xl py-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-md" style={{background: 'rgba(212,175,55,0.07)'}}>
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-widest text-vantage-gold/70 mb-2xs">Passenger</p>
                  <div className="flex items-center gap-xs">
                    <div className="w-10 h-10 rounded-full bg-vantage-gold/10 border border-vantage-gold/20 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-vantage-gold" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl md:text-3xl font-black text-white tracking-wider leading-none">
                        {ticket.passengerFirstName}&nbsp;
                        <span className="text-gradient-gold">{ticket.passengerLastName}</span>
                      </h2>
                      <p className="text-[10px] text-vantage-muted font-mono mt-3xs">{ticket.cabin} · PNR: {ticket.pnr}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-emerald-400 font-semibold">Check-in Complete</span>
                </div>
              </div>

              {/* Main flight info */}
              <div className="px-xl py-lg grid grid-cols-1 md:grid-cols-2 gap-lg">
                {/* Route display */}
                <div className="space-y-md">
                  <div className="flex items-center gap-md">
                    {/* Origin */}
                    <div>
                      <p className="text-[9px] uppercase font-mono tracking-widest text-vantage-muted">From</p>
                      <h3 className="font-display text-5xl font-black text-white leading-none">{ticket.origin}</h3>
                      <p className="text-xs text-vantage-muted mt-2xs font-mono">{fmt(ticket.departureTime)}</p>
                    </div>
                    {/* Flight line */}
                    <div className="flex-1 flex flex-col items-center gap-2xs">
                      <div className="w-full flex items-center gap-2xs">
                        <div className="h-px flex-1 bg-gradient-to-r from-vantage-gold/30 to-white/10" />
                        <Plane className="w-5 h-5 text-vantage-gold" />
                        <div className="h-px flex-1 bg-gradient-to-l from-vantage-gold/30 to-white/10" />
                      </div>
                      <p className="text-[9px] font-mono text-vantage-muted tracking-widest">{ticket.flightNumber}</p>
                    </div>
                    {/* Destination */}
                    <div className="text-right">
                      <p className="text-[9px] uppercase font-mono tracking-widest text-vantage-muted">To</p>
                      <h3 className="font-display text-5xl font-black text-white leading-none">{ticket.destination}</h3>
                      <p className="text-xs text-vantage-muted mt-2xs font-mono">{fmt(ticket.arrivalTime)}</p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-xs p-sm rounded-2xl bg-white/5 border border-white/8">
                    <CalendarDays className="w-4 h-4 text-vantage-gold shrink-0" />
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-vantage-muted font-mono">Departure Date</p>
                      <p className="text-sm font-bold text-white">{fmtDate(ticket.departureTime)}</p>
                    </div>
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-sm">
                  {[
                    { icon: MapPin, label: 'Terminal', value: ticket.terminal },
                    { icon: MapPin, label: 'Gate', value: ticket.gate },
                    { icon: Ticket, label: 'Seat', value: ticket.seat },
                    { icon: Clock, label: 'Boarding', value: fmt(new Date(new Date(ticket.departureTime).getTime() - 40 * 60000).toISOString()) },
                  ].map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center justify-center text-center p-sm rounded-2xl border transition-all hover:scale-105"
                      style={{ background: 'rgba(0,0,0,0.25)', borderColor: 'rgba(212,175,55,0.15)' }}
                    >
                      <Icon className="w-4 h-4 text-vantage-gold mb-2xs" />
                      <p className="text-[9px] uppercase tracking-widest text-vantage-muted font-mono">{label}</p>
                      <p className="text-xl font-black text-white leading-tight mt-2xs">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dashed separator + QR */}
              <div className="relative">
                <div className="absolute left-0 top-1/2 w-6 h-6 -translate-y-1/2 -translate-x-1/2 rounded-full bg-black border border-vantage-gold/10" />
                <div className="absolute right-0 top-1/2 w-6 h-6 -translate-y-1/2 translate-x-1/2 rounded-full bg-black border border-vantage-gold/10" />
                <div className="border-t border-dashed border-white/10 mx-xl" />
              </div>

              <div className="px-xl py-lg flex flex-col sm:flex-row items-center gap-lg">
                {/* QR code mock */}
                <div className="shrink-0 p-xs bg-white rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                  <QrCode className="w-24 h-24 text-black" />
                </div>
                <div className="space-y-xs flex-1">
                  <p className="text-[9px] uppercase tracking-widest text-vantage-gold font-mono">Digital Gate Pass</p>
                  <p className="text-sm text-vantage-muted leading-relaxed">
                    Scan this QR code at any terminal security gate, automated boarding point, or lounge access scanner to verify your identity and boarding status.
                  </p>
                  <div className="flex flex-wrap gap-xs pt-2xs">
                    <button className="flex items-center gap-2xs px-sm py-2xs rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition-all">
                      Add to Apple Wallet
                    </button>
                    <button className="flex items-center gap-2xs px-sm py-2xs rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition-all">
                      Download PDF Pass
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
