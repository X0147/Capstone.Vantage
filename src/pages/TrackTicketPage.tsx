import React, { useState } from 'react';
import { useBookingStore } from '../store/useBookingStore';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import {
  Search, Ticket, Plane, ShieldAlert, QrCode, RefreshCw,
  ShieldCheck, Clock, MapPin, User, Calendar, ArrowRight, Fingerprint, Copy
} from 'lucide-react';
import AnimatedSpinner from '../components/AnimatedSpinner';
import SEO from '../components/SEO';

const TicketSkeleton = () => (
  <div className="max-w-5xl mx-auto px-sm py-xl min-h-[85vh] flex flex-col justify-center animate-pulse">
    {/* Header Bar Skeleton */}
    <div className="flex items-center justify-between flex-wrap gap-sm mb-lg">
      <div className="space-y-sm">
        <div className="h-6 w-32 bg-white/10 rounded-full" />
        <div className="h-10 w-64 bg-white/10 rounded-lg" />
      </div>
      <div className="h-8 w-24 bg-white/10 rounded-xl" />
    </div>

    {/* Main Grid Skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-md">
      <div className="lg:col-span-2 premium-glass rounded-3xl border border-white/10 h-[28rem]" />
      <div className="space-y-md">
        <div className="premium-glass rounded-3xl border border-white/10 h-64" />
        <div className="premium-glass rounded-3xl border border-white/10 h-40" />
      </div>
    </div>
  </div>
);
export const TrackTicketPage: React.FC = () => {
  const { t } = useTranslation();
  const { trackedTicket, trackError, lookupTicket, clearTrackedTicket } = useBookingStore();

  const [pnr, setPnr] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pnr || !lastName) return;
    setIsSearching(true);
    await lookupTicket(pnr, lastName);
    setIsSearching(false);
  };



  return (
    <div className="w-full min-h-screen">
      <SEO 
        title="Track Reservation" 
        description="Retrieve your Capstone.Vantage flight itinerary, live terminal data, and boarding documents securely." 
      />
      {!trackedTicket ? (
        isSearching ? (
          <TicketSkeleton />
        ) : (
        /* ── SEARCH / AUTHENTICATION VIEW ──────────────────── */
        <div className="flex flex-col items-center justify-center min-h-[85vh] px-sm py-xl">

          {/* Hero Header */}
          <div className="text-center space-y-sm mb-xl max-w-2xl mx-auto fade-in-up">
            <div className="inline-flex items-center gap-2xs px-sm py-2xs rounded-full bg-vantage-accent/10 border border-vantage-accent/20 text-[10px] font-mono tracking-widest text-vantage-accent uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-vantage-accent animate-pulse" />
              Secure Ticket Retrieval
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]">
              <span className="text-white">Manage</span>{' '}
              <span className="text-gradient-sky italic">Booking</span>
            </h1>
            <p className="text-vantage-text text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              Access your complete itinerary, boarding documents, and live terminal intelligence with your booking reference.
            </p>
          </div>

          {/* Search Card */}
          <div className="w-full max-w-lg mx-auto fade-in-up" style={{ animationDelay: '0.15s' }}>
            <div className="relative premium-glass rounded-3xl p-lg border border-white/10 shadow-2xl overflow-hidden">
              {/* Card glow effects */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-vantage-accent/8 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-blue-600/8 rounded-full blur-[60px] pointer-events-none" />

              {/* Card header */}
              <div className="flex items-center gap-sm mb-lg relative z-10">
                <div className="p-sm rounded-2xl bg-gradient-to-br from-vantage-accent/20 to-blue-500/10 border border-vantage-accent/20">
                  <Ticket className="w-6 h-6 text-vantage-accent" />
                </div>
                <div>
                  <h2 className="text-base font-black text-white uppercase tracking-wide">{t('track.title')}</h2>
                  <p className="text-xs text-vantage-muted mt-0.5">Retrieve live terminal data & boarding documents</p>
                </div>
              </div>

              <form onSubmit={handleLookup} className="space-y-md relative z-10">
                {/* PNR Input */}
                <div className="space-y-2xs">
                  <label className="flex items-center gap-2xs text-[10px] uppercase tracking-wider text-vantage-muted font-bold">
                    <Fingerprint className="w-3 h-3" />
                    {t('track.pnr_label')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={6}
                      value={pnr}
                      onChange={(e) => setPnr(e.target.value.toUpperCase())}
                      placeholder="e.g., VNTG6K"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-md py-sm text-sm text-white uppercase focus:outline-none focus:border-vantage-accent focus:bg-white/[0.03] font-mono tracking-[0.3em] transition-all placeholder:tracking-normal placeholder:normal-case placeholder:text-vantage-muted/40"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/20">{pnr.length}/6</div>
                  </div>
                </div>

                {/* Last Name Input */}
                <div className="space-y-2xs">
                  <label className="flex items-center gap-2xs text-[10px] uppercase tracking-wider text-vantage-muted font-bold">
                    <User className="w-3 h-3" />
                    Passenger Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="As written on passport"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-md py-sm text-sm text-white focus:outline-none focus:border-vantage-accent focus:bg-white/[0.03] transition-all placeholder:text-vantage-muted/40"
                  />
                </div>

                {/* Error Alert */}
                {trackError && (
                  <div className="flex items-center gap-sm p-sm rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs animate-fadeIn">
                    <ShieldAlert className="w-5 h-5 shrink-0" />
                    <span>{trackError}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSearching || !pnr || !lastName}
                  className="w-full py-sm rounded-2xl bg-gradient-to-r from-vantage-accent to-blue-500 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-sm transition-all hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100"
                >
                  {isSearching ? (
                    <AnimatedSpinner size={16} />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  {isSearching ? 'Authenticating...' : t('track.cta')}
                </button>
              </form>

              {/* Security badge */}
              <div className="mt-md pt-md border-t border-white/5 flex items-center justify-center gap-sm relative z-10">
                <div className="flex items-center gap-2xs text-[10px] font-mono text-white/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>AES-256 ENCRYPTED</span>
                </div>
                <div className="w-px h-3 bg-white/10" />
                <div className="flex items-center gap-2xs text-[10px] font-mono text-emerald-400/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SECURE CHANNEL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-sm mt-lg fade-in-up" style={{ animationDelay: '0.3s' }}>
            {[
              { icon: ShieldCheck, label: 'GDPR Compliant' },
              { icon: Clock, label: 'Real-Time Sync' },
              { icon: Ticket, label: 'Mobile Wallet Ready' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2xs px-sm py-2xs rounded-full bg-white/5 border border-white/5 text-[10px] text-vantage-muted">
                <Icon className="w-3 h-3 text-vantage-accent/60" />
                {label}
              </div>
            ))}
          </div>
          </div>
        )
      ) : (
        /* ── LIVE TICKETING PORTAL ─────────────────────────── */
        <div className="max-w-5xl mx-auto px-sm py-xl min-h-[85vh] flex flex-col justify-center animate-fadeIn">

          {/* Header Bar */}
          <div className="flex items-center justify-between flex-wrap gap-sm mb-lg">
            <div className="space-y-2xs">
              <div className="flex items-center gap-sm">
                <span className="inline-flex items-center gap-2xs text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-sm py-2xs rounded-full border border-emerald-500/20 tracking-wider uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {trackedTicket.status.replace('_', ' ')}
                </span>
                <span className="text-[10px] font-mono text-white/30 uppercase">{trackedTicket.cabin}</span>
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-sm">
                Reservation <span className="text-gradient-sky">{trackedTicket.pnr}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(trackedTicket.pnr);
                    toast.success('PNR copied to clipboard', {
                      style: { background: '#0a0f16', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
                      iconTheme: { primary: '#c8a44e', secondary: '#0a0f16' }
                    });
                  }}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-vantage-muted hover:text-white transition-colors"
                  title="Copy PNR"
                  aria-label="Copy PNR to clipboard"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </h1>
            </div>
            <button
              onClick={clearTrackedTicket}
              className="flex items-center gap-2xs text-xs text-vantage-accent border border-vantage-accent/20 px-sm py-2xs rounded-xl hover:bg-vantage-accent/10 transition-all group"
            >
              <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
              New Search
            </button>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-md">

            {/* ── Boarding Pass Card ── */}
            <div className="lg:col-span-2 premium-glass rounded-3xl border border-white/10 overflow-hidden relative">
              {/* Top glow */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
              <div className="absolute -top-24 -right-24 w-56 h-56 bg-vantage-accent/8 rounded-full blur-[80px] pointer-events-none" />

              {/* Header strip */}
              <div className="flex items-center justify-between px-lg py-sm border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-sm">
                  <div className="p-2xs rounded-lg bg-vantage-accent/20">
                    <Plane className="w-4 h-4 text-vantage-accent rotate-45" />
                  </div>
                  <div>
                    <p className="text-[10px] text-vantage-muted uppercase font-bold tracking-wider">Flight</p>
                    <p className="text-sm font-mono font-black text-white">{trackedTicket.flightNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-vantage-muted uppercase font-bold tracking-wider">Seat</p>
                  <p className="text-sm font-mono font-black text-vantage-accent">{trackedTicket.seat}</p>
                </div>
              </div>

              {/* Route Display */}
              <div className="px-lg py-lg">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <h3 className="text-3xl md:text-4xl font-black text-white tracking-widest">{trackedTicket.origin}</h3>
                    <p className="text-[10px] text-vantage-muted uppercase mt-2xs">Origin</p>
                  </div>

                  {/* Animated Route Line */}
                  <div className="flex-1 mx-md relative flex items-center">
                    <div className="w-full border-t border-dashed border-white/15" />
                    <div className="absolute left-0 w-2.5 h-2.5 rounded-full bg-vantage-accent/40 border-2 border-vantage-accent" />
                    <div className="absolute left-1/2 -translate-x-1/2 bg-brand-dark px-sm">
                      <div className="p-2xs rounded-full bg-white/5 border border-white/10">
                        <Plane className="w-4 h-4 text-vantage-accent" />
                      </div>
                    </div>
                    <div className="absolute right-0 w-2.5 h-2.5 rounded-full bg-sky-400/40 border-2 border-sky-400" />
                  </div>

                  <div className="text-center">
                    <h3 className="text-3xl md:text-4xl font-black text-white tracking-widest">{trackedTicket.destination}</h3>
                    <p className="text-[10px] text-vantage-muted uppercase mt-2xs">Destination</p>
                  </div>
                </div>
              </div>

              {/* Detail Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-sm p-sm">
                {[
                  { icon: User, label: 'Passenger', value: trackedTicket.passengerName },
                  { icon: Calendar, label: 'Departure', value: new Date(trackedTicket.departureTime).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) },
                  { icon: Clock, label: 'Time', value: new Date(trackedTicket.departureTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) },
                  { icon: MapPin, label: 'Gate / Terminal', value: `${trackedTicket.gate} · ${trackedTicket.terminal}` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="premium-glass rounded-2xl px-md py-sm space-y-2xs border border-white/5 hover:bg-white/[0.04] transition-colors group">
                    <div className="flex items-center gap-2xs text-[10px] text-vantage-muted uppercase font-bold tracking-wider group-hover:text-vantage-accent transition-colors">
                      <Icon className="w-3 h-3" />
                      {label}
                    </div>
                    <p className="text-xs font-bold text-white truncate">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right Column ── */}
            <div className="space-y-md">

              {/* QR Code / Gate Pass */}
              <div className="premium-glass rounded-3xl p-lg border border-white/10 flex flex-col items-center text-center space-y-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="p-md rounded-3xl bg-white shadow-[0_0_40px_rgba(255,255,255,0.08)]">
                  <QrCode className="w-20 h-20 text-brand-dark" />
                </div>
                <div>
                  <p className="text-sm font-black text-white">Digital Gate Pass</p>
                  <p className="text-[10px] text-vantage-muted mt-2xs leading-relaxed max-w-xs">
                    Scan at terminal security gates & automated boarding points
                  </p>
                </div>
                <button className="w-full py-sm rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] active:scale-[0.98]">
                  Add to Apple Wallet
                </button>
              </div>

              {/* Flight Status */}
              <div className="premium-glass rounded-3xl p-md border border-white/10 space-y-sm">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-vantage-muted flex items-center gap-2xs">
                  <ArrowRight className="w-3 h-3" /> Flight Status
                </h3>
                <div className="space-y-xs">
                  {[
                    { label: 'Booking Confirmed', done: true },
                    { label: 'Online Check-In', done: true },
                    { label: 'Boarding Gate Open', done: false },
                    { label: 'Departed', done: false },
                  ].map(({ label, done }, i) => (
                    <div key={i} className="flex items-center gap-sm">
                      <div className={`w-2 h-2 rounded-full ${done ? 'bg-emerald-400' : 'bg-white/15'}`} />
                      <span className={`text-xs ${done ? 'text-white' : 'text-vantage-muted'}`}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackTicketPage;
