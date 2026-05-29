import React, { useState } from 'react';
import { useBookingStore, BookingRecord } from '../store/useBookingStore';
import { Search, MapPin, Calendar, Users, Briefcase, ChevronRight, ShieldCheck, Fingerprint, Lock, ArrowRight, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const ManageBookingPage: React.FC = () => {
  const [pnr, setPnr] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [booking, setBooking] = useState<BookingRecord | null>(null);

  const getBooking = useBookingStore((state) => state.getBooking);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pnr || !lastName) {
      setError('Please enter both PNR and Last Name.');
      return;
    }

    setIsSearching(true);
    setError('');

    // Simulate network delay for premium feel
    setTimeout(() => {
      const found = getBooking(pnr, lastName);
      if (found) {
        setBooking(found);
      } else {
        setError('No active booking found matching those details.');
        setBooking(null);
      }
      setIsSearching(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-vantage-midnight flex flex-col relative overflow-hidden">
      {/* ── Cinematic Backgrounds ── */}
      <img
        src={`${import.meta.env.BASE_URL || '/'}images/03_buildings_network.jpg`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-lighten pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-vantage-midnight/90 via-vantage-midnight/60 to-black/95 pointer-events-none" />

      {/* Ambient Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none -mr-40" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-vantage-gold/5 rounded-full blur-[120px] pointer-events-none -ml-40" />

      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 py-20">
        
        {/* Header Text */}
        <AnimatePresence mode="wait">
          {!booking && (
            <motion.div
              key="header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-4 mb-12"
            >
              <div className="flex items-center justify-center gap-2 text-vantage-gold/70 mb-4">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Encrypted Ledger Access</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight leading-none">
                Manage Booking
              </h1>
              <p className="text-vantage-muted max-w-lg mx-auto text-sm md:text-base">
                Authenticate to access your itinerary, select bespoke seating, or modify your premium travel arrangements.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!booking ? (
            <motion.div
              key="search-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md relative group"
            >
              {/* Form Glow */}
              <div className="absolute -inset-1 rounded-4xl bg-gradient-to-br from-sky-500/20 via-vantage-gold/10 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 pointer-events-none" />
              
              <form
                onSubmit={handleSearch}
                className="relative bg-[#070b12]/70 border border-white/10 rounded-4xl p-8 md:p-10 backdrop-blur-2xl shadow-2xl space-y-6"
              >
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-vantage-muted font-mono mb-2">
                    Booking Reference (PNR)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={pnr}
                      onChange={(e) => setPnr(e.target.value.toUpperCase())}
                      placeholder="e.g. VNTG6K"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white font-mono tracking-widest focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.05] transition-all uppercase placeholder:normal-case placeholder:tracking-normal placeholder:font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-vantage-muted font-mono mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Smith"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                </div>

                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex items-center gap-2 text-red-400 text-[11px] font-mono uppercase bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <div className="pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="group relative w-full overflow-hidden rounded-2xl bg-white text-vantage-midnight font-bold px-6 py-4 text-sm uppercase tracking-widest transition-all hover:bg-vantage-gold hover:text-black disabled:opacity-70"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSearching ? (
                        <span className="animate-pulse">Retrieving Ledger...</span>
                      ) : (
                        <>Access Booking <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></>
                      )}
                    </span>
                  </button>
                </div>

                <div className="flex flex-col items-center gap-3 pt-2">
                  <p className="text-[9px] uppercase tracking-widest text-vantage-muted font-mono">Or authenticate via</p>
                  <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-vantage-muted hover:text-white hover:border-white/30 text-xs transition-all"
                  >
                    <Fingerprint className="w-4 h-4" /> Biometric Token
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="booking-details"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-5xl"
            >
              {/* Top Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-3xl font-black text-white font-display leading-none">Booking Overview</h2>
                  <p className="text-vantage-gold font-mono tracking-widest text-[11px] mt-2 uppercase">Ref: {booking.pnr}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 text-emerald-400 px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Confirmed
                  </span>
                  <button
                    onClick={() => setBooking(null)}
                    className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-vantage-muted hover:text-white transition-colors border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-full"
                  >
                    <RotateCcw className="w-3 h-3" /> New Search
                  </button>
                </div>
              </div>

              {/* Main Card */}
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
                {/* Background Image for Card */}
                <img
                  src={`${import.meta.env.BASE_URL || '/'}images/04_city_skyline.jpg`}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
                />
                <div className="absolute inset-0 bg-[#070b12]/80 backdrop-blur-md pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
                  
                  {/* Left Column: Itinerary */}
                  <div className="p-8 lg:col-span-2 space-y-8">
                    <div className="flex items-center gap-2 text-sky-400">
                      <MapPin className="w-4 h-4" />
                      <h3 className="text-xs font-mono uppercase tracking-widest font-bold">Flight Itinerary</h3>
                    </div>

                    {booking.outbound && (
                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 transition-all hover:bg-white/[0.04]">
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-[10px] font-mono text-vantage-muted uppercase tracking-widest">Outbound Segment</span>
                          <span className="text-[10px] font-mono text-white/50">{new Date(booking.outbound.departure.time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-center">
                            <p className="text-4xl font-display font-black text-white">{booking.outbound.departure.iata}</p>
                            <p className="text-[10px] text-vantage-muted font-mono mt-1">{new Date(booking.outbound.departure.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                          
                          <div className="flex-1 flex flex-col items-center px-4 md:px-12">
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-vantage-gold/50 to-transparent relative">
                              <motion.div 
                                className="absolute top-1/2 left-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-vantage-gold rounded-full"
                                animate={{ x: ['-200%', '200%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                              />
                            </div>
                            <p className="text-[9px] font-mono text-vantage-muted uppercase tracking-widest mt-2">{booking.outbound.duration}</p>
                          </div>

                          <div className="text-center">
                            <p className="text-4xl font-display font-black text-white">{booking.outbound.arrival.iata}</p>
                            <p className="text-[10px] text-vantage-muted font-mono mt-1">{new Date(booking.outbound.arrival.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {booking.returnFlight && (
                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 transition-all hover:bg-white/[0.04]">
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-[10px] font-mono text-vantage-muted uppercase tracking-widest">Return Segment</span>
                          <span className="text-[10px] font-mono text-white/50">{new Date(booking.returnFlight.departure.time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-center">
                            <p className="text-4xl font-display font-black text-white">{booking.returnFlight.departure.iata}</p>
                            <p className="text-[10px] text-vantage-muted font-mono mt-1">{new Date(booking.returnFlight.departure.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                          
                          <div className="flex-1 flex flex-col items-center px-4 md:px-12">
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent relative">
                               <motion.div 
                                className="absolute top-1/2 left-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-sky-400 rounded-full"
                                animate={{ x: ['200%', '-200%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                              />
                            </div>
                            <p className="text-[9px] font-mono text-vantage-muted uppercase tracking-widest mt-2">{booking.returnFlight.duration}</p>
                          </div>

                          <div className="text-center">
                            <p className="text-4xl font-display font-black text-white">{booking.returnFlight.arrival.iata}</p>
                            <p className="text-[10px] text-vantage-muted font-mono mt-1">{new Date(booking.returnFlight.arrival.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Passengers & Actions */}
                  <div className="p-8 space-y-8 bg-black/20">
                    <div>
                      <div className="flex items-center gap-2 text-vantage-gold mb-4">
                        <Users className="w-4 h-4" />
                        <h3 className="text-xs font-mono uppercase tracking-widest font-bold">Passenger Manifest</h3>
                      </div>
                      <div className="space-y-3">
                        {booking.passengers.map((p, i) => (
                          <div key={i} className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                            <div>
                              <p className="text-sm font-bold text-white">{p.firstName} {p.lastName}</p>
                              <p className="text-[9px] font-mono text-vantage-muted uppercase mt-0.5">Traveler {i + 1}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-white/80">{booking.seats[i] || 'Unassigned'}</p>
                              <p className="text-[9px] font-mono text-vantage-muted uppercase mt-0.5">Seat</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <div className="flex items-center gap-2 text-white mb-4">
                        <Briefcase className="w-4 h-4" />
                        <h3 className="text-xs font-mono uppercase tracking-widest font-bold">Concierge Actions</h3>
                      </div>
                      <div className="space-y-3">
                        <button
                          onClick={() => navigate('/tracker', { state: { flightNumber: booking.outbound?.id.split('-')[3] || 'EK201' } })}
                          className="w-full flex items-center justify-between p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 hover:bg-sky-500 hover:text-white transition-all group"
                        >
                          <span className="text-xs font-mono uppercase tracking-widest font-bold">Live Tracking Radar</span>
                          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all group">
                          <span className="text-xs font-mono uppercase tracking-widest font-bold">Select Bespoke Meals</span>
                          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-vantage-muted" />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all group">
                          <span className="text-xs font-mono uppercase tracking-widest font-bold">Request Upgrades</span>
                          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-vantage-muted" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ManageBookingPage;
