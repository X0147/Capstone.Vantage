import React, { useState } from 'react';
import { useUserStore } from '../store/useUserStore';
import { useBookingStore } from '../store/useBookingStore';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Plane,
  MapPin,
  CreditCard,
  Award,
  Clock,
  Calendar,
  ShieldCheck,
  Ticket,
  TrendingUp,
  Compass,
  CheckCircle2,
  Settings2,
  Lock,
} from 'lucide-react';
import { TravelInfoCard } from '../components/TravelInfoCard';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useUserStore();
  const pastBookings = useBookingStore((state) => state.pastBookings);

  const [activeTab, setActiveTab] = useState<'overview' | 'trips' | 'profile'>('overview');

  // Client Access Gateway States
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [clientName, setClientName] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [authError, setAuthError] = useState('');

  // States for profile editing
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [passportNumber, setPassportNumber] = useState(profile.passportNumber);
  const [tsaPreCheck, setTsaPreCheck] = useState(profile.tsaPreCheck);
  const [dietaryPreference, setDietaryPreference] = useState(profile.dietaryPreference);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfile({
      firstName,
      lastName,
      email,
      phone,
      passportNumber,
      tsaPreCheck,
      dietaryPreference,
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  // Split bookings into upcoming vs past (simulated based on status/date)
  const upcomingBookings = pastBookings.filter((b) => {
    // In our simplified logic, all persistent bookings are upcoming unless marked otherwise
    return b.pnr;
  });

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    if (!clientName.trim() ?? !trackingId.trim()) {
      setAuthError('Please provide both Client Identity and Tracking ID.');
      return;
    }
    
    setIsUnlocking(true);
    // Simulate secure network fetch for client details
    setTimeout(() => {
      // Update store to dynamically reflect the entered user's details
      const names = clientName.trim().split(' ');
      updateProfile({
        firstName: names[0] ?? clientName,
        lastName: names.length > 1 ? names.slice(1).join(' ') : profile.lastName,
      });
      setIsUnlocking(false);
      setIsUnlocked(true);
    }, 1500);
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-sm relative overflow-hidden rounded-3xl mt-sm">
        {/* Cinematic Background */}
        <img
          src={`${import.meta.env.BASE_URL ?? '/'}images/06_plane_sky.jpg`}
          alt="Flight View"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f16] via-[#0a0f16]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-vantage-dark/40 pointer-events-none backdrop-blur-[2px]" />

        <div className="w-full max-w-md premium-glass rounded-3xl border border-white/10 p-xl shadow-2xl relative overflow-hidden z-10 bg-black/60 backdrop-blur-2xl">
          {/* Background Glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-vantage-accent via-sky-500 to-vantage-accent opacity-50" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-32 bg-vantage-accent/5 rounded-[100%] blur-3xl pointer-events-none" />
          
          <div className="text-center space-y-md relative z-10">
            <div className="w-16 h-16 mx-auto rounded-full bg-vantage-dark border border-white/10 flex items-center justify-center shadow-lg">
              <Lock className="w-6 h-6 text-vantage-accent" />
            </div>
            
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Client Portal Access</h2>
              <p className="text-sm text-vantage-muted mt-2">
                Enter your secure tracking coordinates and client identity to access your private flight dashboard.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4 pt-sm">
              <div className="space-y-1 text-left">
                <label htmlFor="clientNameInput" className="block text-[10px] uppercase font-bold text-vantage-muted tracking-wider mb-2xs">Client Name</label>
                <input
                  id="clientNameInput"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-vantage-accent/50 focus:bg-white/[0.05] transition-all"
                />
              </div>

              <div className="space-y-1 text-left">
                <label htmlFor="trackingIdInput" className="text-[10px] uppercase font-bold tracking-wider text-vantage-muted pl-1">Tracking ID / PNR</label>
                <input
                  id="trackingIdInput"
                  type="text"
                  value={trackingId}
                  onChange={(e) => { setTrackingId(e.target.value); setAuthError(''); }}
                  placeholder="Enter access code"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-vantage-accent/50 focus:bg-white/[0.05] transition-all font-mono uppercase"
                />
              </div>

              {authError && (
                <div className="text-red-400 text-xs text-left bg-red-500/10 border border-red-500/20 rounded-lg p-2.5">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={isUnlocking}
                className="w-full relative group overflow-hidden bg-vantage-accent text-vantage-dark font-bold rounded-xl px-6 py-4 mt-sm transition-all hover:bg-vantage-accent/90 disabled:opacity-70 flex justify-center items-center"
              >
                {isUnlocking ? (
                  <span className="flex items-center gap-2 animate-pulse text-sm">
                    <ShieldCheck className="w-4 h-4" /> Authenticating...
                  </span>
                ) : (
                  <span className="text-sm">Access Dashboard</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-md px-sm py-lg">
      {/* Top Banner Signifier */}
      <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-r from-vantage-dark to-[#0f172a] p-lg shadow-2xl">
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-vantage-accent via-blue-600 to-transparent pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
          <div className="space-y-2xs">
            <span className="inline-flex items-center gap-3xs rounded-full border border-vantage-accent/20 bg-vantage-accent/10 px-xs py-3xs text-[10px] font-bold uppercase tracking-widest text-vantage-accent">
              <Award className="h-3 w-3" /> Vantage Gold Privilege Club
            </span>
            <h1 className="text-3xl font-black tracking-tight text-white">
              Welcome back, {profile.firstName}
            </h1>
            <p className="text-xs text-vantage-muted">
              Dashboard access granted for tracking ID: <span className="font-mono text-vantage-accent">{trackingId.toUpperCase()}</span>.
            </p>
          </div>
{/* Travel Itinerary Card */}



          <div className="flex items-center gap-sm">
            <div className="premium-glass rounded-2xl border border-white/5 p-xs text-center min-w-[120px]">
              <span className="block text-[9px] uppercase tracking-wider text-vantage-muted">
                Loyalty Balance
              </span>
              <span className="text-lg font-black text-vantage-accent font-mono">
                {profile.milesBalance.toLocaleString()}
              </span>
              <span className="block text-[8px] text-emerald-400 font-bold mt-3xs">
                ↑ Gold Tier Tier
              </span>
            </div>

            <div className="premium-glass rounded-2xl border border-white/5 p-xs text-center min-w-[120px]">
              <span className="block text-[9px] uppercase tracking-wider text-vantage-muted">
                Elite Tier
              </span>
              <span className="text-lg font-black text-white">{profile.tier}</span>
              <span className="block text-[8px] text-vantage-muted mt-3xs">Expires: Oct 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-white/5 gap-xs">
        <button
          onClick={() => {
            setActiveTab('overview');
          }}
          className={`pb-xs text-xs font-bold uppercase tracking-wider border-b-2 px-xs transition-all ${
            activeTab === 'overview'
              ? 'border-vantage-accent text-vantage-accent'
              : 'border-transparent text-vantage-muted hover:text-white'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => {
            setActiveTab('trips');
          }}
          className={`pb-xs text-xs font-bold uppercase tracking-wider border-b-2 px-xs transition-all ${
            activeTab === 'trips'
              ? 'border-vantage-accent text-vantage-accent'
              : 'border-transparent text-vantage-muted hover:text-white'
          }`}
        >
          My Trips ({upcomingBookings.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('profile');
          }}
          className={`pb-xs text-xs font-bold uppercase tracking-wider border-b-2 px-xs transition-all ${
            activeTab === 'profile'
              ? 'border-vantage-accent text-vantage-accent'
              : 'border-transparent text-vantage-muted hover:text-white'
          }`}
        >
          Profile & Documents
        </button>
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              {/* Miles Progress & Promotion */}
              <div className="md:col-span-2 space-y-md">
                <div className="premium-glass rounded-3xl border border-white/5 p-md space-y-sm">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      Tier Progress
                    </h3>
                    <span className="text-[10px] font-mono text-vantage-accent">
                      15,750 miles to Platinum
                    </span>
                  </div>

                  <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-vantage-accent to-blue-500 rounded-full"
                      style={{ width: '84%' }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-xs pt-xs text-center font-mono text-[10px]">
                    <div className="bg-black/20 rounded-xl p-3xs border border-white/5">
                      <span className="block text-vantage-muted">Points Earned YTD</span>
                      <span className="text-white font-bold">12,450 XP</span>
                    </div>
                    <div className="bg-black/20 rounded-xl p-3xs border border-white/5">
                      <span className="block text-vantage-muted">Vantage Sectors</span>
                      <span className="text-white font-bold">14 Flights</span>
                    </div>
                  </div>
                </div>

                {/* Upcoming Flights Module */}
                <div className="space-y-sm">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-vantage-accent">
                    Active Flight Segments
                  </h3>

                  {upcomingBookings.length === 0 ? (
                    <div className="premium-glass rounded-3xl border border-white/5 p-lg text-center space-y-xs">
                      <Plane className="h-8 w-8 text-vantage-muted mx-auto animate-pulse" />
                      <p className="text-xs text-white font-bold">No active segments detected.</p>
                      <p className="text-[11px] text-vantage-muted">
                        Book a flight now to unlock dynamic tracking coordinates.
                      </p>
                      <button
                        onClick={() => navigate('/')}
                        className="mt-xs text-xs font-bold text-vantage-accent hover:underline"
                      >
                        Start Booking Flow →
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-xs">
                      {upcomingBookings.map((booking, idx) => (
                        <div
                          key={idx}
                          className="premium-glass rounded-3xl border border-white/10 p-md flex flex-col md:flex-row justify-between items-start md:items-center gap-xs hover:border-vantage-accent/30 transition-all"
                        >
                          <div className="space-y-3xs">
                            <span className="font-mono text-[10px] text-vantage-accent uppercase tracking-wider font-bold">
                              PNR: {booking.pnr}
                            </span>
                            <div className="flex items-center gap-xs">
                              <span className="text-md font-black text-white">
                                {booking.outbound?.departure.iata}
                              </span>
                              <span className="text-vantage-muted text-xs">→</span>
                              <span className="text-md font-black text-white">
                                {booking.outbound?.arrival.iata}
                              </span>
                            </div>
                            <span className="block text-[10px] text-vantage-muted font-mono">
                              {booking.dateBooked.slice(0, 10)}
                            </span>
                          </div>

                          <div className="flex items-center gap-xs">
                            <button
                              onClick={() => navigate('/manage-booking')}
                              className="px-sm py-2xs bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold text-white hover:bg-white/10 transition-all"
                            >
                              Manage Itinerary
                            </button>

                            <button
                              onClick={() =>
                                navigate('/tracker', {
                                  state: {
                                    flightNumber: booking.outbound?.id.split('-')[3] ?? 'EK201',
                                  },
                                })
                              }
                              className="px-sm py-2xs bg-vantage-accent text-vantage-dark rounded-lg text-[11px] font-bold hover:bg-vantage-accent/80 transition-all flex items-center gap-3xs"
                            >
                              <Compass className="h-3 w-3" /> Radar Track
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar Quick Card */}
              <div className="space-y-md">
                {/* Security Pass Card */}
                <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-vantage-dark/80 to-black p-md shadow-lg space-y-sm">
                  <div className="flex justify-between items-center border-b border-white/5 pb-xs">
                    <span className="text-[10px] font-mono text-vantage-muted">
                      TRAVEL CREDENTIALS
                    </span>
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  </div>

                  <div className="space-y-xs text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-vantage-muted">Passport</span>
                      <span className="text-white font-bold">
                        {profile.passportNumber ?? 'None'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-vantage-muted">TSA Pre</span>
                      <span className="text-white font-bold">{profile.tsaPreCheck ?? 'None'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-vantage-muted">KNT No.</span>
                      <span className="text-white font-bold">{profile.frequentFlyerNumber}</span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-vantage-accent/5 border border-vantage-accent/20 p-xs text-center text-[10px] text-vantage-muted">
                    🔐 Encrypted Node Vault Storage
                  </div>
                </div>

                {/* Dietary preference info */}
                <div className="premium-glass rounded-3xl border border-white/5 p-md space-y-xs">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-vantage-accent">
                    Dietary Preference
                  </h4>
                  <p className="text-xs text-white font-medium">{profile.dietaryPreference}</p>
                  <p className="text-[10px] text-vantage-muted">
                    Autoselected for all confirmed bookings.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trips' && (
            <div className="space-y-md">
              <h3 className="text-md font-black text-white">Full Flight History & Trips</h3>

              {upcomingBookings.length === 0 ? (
                <div className="premium-glass rounded-3xl border border-white/5 p-xl text-center space-y-xs">
                  <Ticket className="h-10 w-10 text-vantage-muted mx-auto animate-pulse" />
                  <p className="text-sm text-white font-bold">
                    No registered trips found in your account.
                  </p>
                  <p className="text-xs text-vantage-muted max-w-sm mx-auto">
                    Any flights booked using Capstone.Vantage will dynamically sync and load into
                    your trip portal.
                  </p>
                  <button
                    onClick={() => navigate('/')}
                    className="mt-sm px-md py-sm bg-vantage-accent text-vantage-dark rounded-xl text-xs font-bold hover:bg-vantage-accent/80 transition-all"
                  >
                    Book Flight Now
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
                  {upcomingBookings.map((booking, idx) => (
                    <div
                      key={idx}
                      className="premium-glass rounded-3xl border border-white/5 p-md flex flex-col justify-between space-y-md hover:border-white/15 transition-all"
                    >
                      <div className="flex justify-between items-start border-b border-white/5 pb-xs">
                        <div>
                          <span className="inline-block rounded-md bg-vantage-accent/10 border border-vantage-accent/20 text-vantage-accent font-mono text-[10px] px-2xs py-3xs font-bold uppercase">
                            PNR: {booking.pnr}
                          </span>
                          <span className="block text-[9px] text-vantage-muted mt-2xs">
                            Booked on {booking.dateBooked.slice(0, 10)}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-xs py-3xs rounded-full border border-emerald-500/20">
                          CONFIRMED
                        </span>
                      </div>

                      <div className="space-y-xs">
                        {booking.outbound && (
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-vantage-muted flex items-center gap-3xs">
                              <Plane className="h-3 w-3" /> Outbound
                            </span>
                            <span className="font-bold text-white">
                              {booking.outbound.departure.iata} → {booking.outbound.arrival.iata} (
                              {booking.outbound.airline.name})
                            </span>
                          </div>
                        )}
                        {booking.returnFlight && (
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-vantage-muted flex items-center gap-3xs">
                              <Plane className="h-3 w-3 rotate-180" /> Return
                            </span>
                            <span className="font-bold text-white">
                              {booking.returnFlight.departure.iata} →{' '}
                              {booking.returnFlight.arrival.iata} (
                              {booking.returnFlight.airline.name})
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between items-center text-xs border-t border-white/5 pt-xs">
                          <span className="text-vantage-muted">Total Price Paid</span>
                          <span className="font-mono font-bold text-vantage-accent">
                            ${booking.totalPrice}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-xs pt-xs">
                        <button
                          onClick={() => navigate('/manage-booking')}
                          className="flex-1 py-sm bg-white/5 border border-white/10 text-xs font-bold text-white rounded-xl hover:bg-white/10 transition-colors"
                        >
                          Modify Flight
                        </button>
                        <button
                          onClick={() =>
                            navigate('/tracker', {
                              state: {
                                flightNumber: booking.outbound?.id.split('-')[3] ?? 'EK201',
                              },
                            })
                          }
                          className="flex-1 py-sm bg-vantage-accent text-vantage-dark text-xs font-bold rounded-xl hover:bg-vantage-accent/80 transition-colors"
                        >
                          Satellite Radar Track
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              {/* Profile form */}
              <form
                onSubmit={handleSaveProfile}
                className="md:col-span-2 premium-glass rounded-3xl border border-white/5 p-lg space-y-md"
              >
                <h3 className="text-md font-black text-white">Traveler Profile & Preferences</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
                  <div>
                    <label htmlFor="profile-firstName" className="block text-[10px] uppercase font-bold text-vantage-muted tracking-wider mb-2xs">
                      First Name
                    </label>
                    <input
                      id="profile-firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      className="w-full bg-vantage-dark border border-white/10 rounded-xl px-sm py-sm text-xs text-white focus:outline-none focus:border-vantage-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="profile-lastName" className="block text-[10px] uppercase font-bold text-vantage-muted tracking-wider mb-2xs">
                      Last Name
                    </label>
                    <input
                      id="profile-lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      className="w-full bg-vantage-dark border border-white/10 rounded-xl px-sm py-sm text-xs text-white focus:outline-none focus:border-vantage-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="profile-email" className="block text-[10px] uppercase font-bold text-vantage-muted tracking-wider mb-2xs">
                      Email
                    </label>
                    <input
                      id="profile-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      className="w-full bg-vantage-dark border border-white/10 rounded-xl px-sm py-sm text-xs text-white focus:outline-none focus:border-vantage-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="profile-phone" className="block text-[10px] uppercase font-bold text-vantage-muted tracking-wider mb-2xs">
                      Phone
                    </label>
                    <input
                      id="profile-phone"
                      type="text"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      className="w-full bg-vantage-dark border border-white/10 rounded-xl px-sm py-sm text-xs text-white focus:outline-none focus:border-vantage-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="profile-passportNumber" className="block text-[10px] uppercase font-bold text-vantage-muted tracking-wider mb-2xs">
                      Passport Number
                    </label>
                    <input
                      id="profile-passportNumber"
                      type="text"
                      value={passportNumber}
                      onChange={(e) => {
                        setPassportNumber(e.target.value);
                      }}
                      className="w-full bg-vantage-dark border border-white/10 rounded-xl px-sm py-sm text-xs text-white focus:outline-none focus:border-vantage-accent font-mono"
                    />
                  </div>

                  <div>
                    <label htmlFor="profile-tsaPreCheck" className="block text-[10px] uppercase font-bold text-vantage-muted tracking-wider mb-2xs">
                      TSA PreCheck ID
                    </label>
                    <input
                      id="profile-tsaPreCheck"
                      type="text"
                      value={tsaPreCheck}
                      onChange={(e) => {
                        setTsaPreCheck(e.target.value);
                      }}
                      className="w-full bg-vantage-dark border border-white/10 rounded-xl px-sm py-sm text-xs text-white focus:outline-none focus:border-vantage-accent font-mono"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="profile-dietaryPreference" className="block text-[10px] uppercase font-bold text-vantage-muted tracking-wider mb-2xs">
                      Dietary Preference
                    </label>
                    <select
                      id="profile-dietaryPreference"
                      value={dietaryPreference}
                      onChange={(e) => {
                        setDietaryPreference(e.target.value);
                      }}
                      className="w-full bg-vantage-dark border border-white/10 rounded-xl px-sm py-sm text-xs text-white focus:outline-none focus:border-vantage-accent"
                    >
                      <option value="None">No Dietary Preference</option>
                      <option value="Vegetarian (VGML)">Vegetarian (VGML)</option>
                      <option value="Vegan (VGML)">Vegan (VGML)</option>
                      <option value="Halal (MOML)">Halal (MOML)</option>
                      <option value="Kosher (KSML)">Kosher (KSML)</option>
                    </select>
                  </div>
                </div>

                {isSaved && (
                  <p className="text-emerald-400 text-xs font-bold animate-pulse flex items-center gap-3xs">
                    <CheckCircle2 className="h-4 w-4" /> Vault security data successfully saved.
                  </p>
                )}

                <button
                  type="submit"
                  className="px-md py-sm bg-vantage-accent text-vantage-dark rounded-xl text-xs font-bold hover:bg-vantage-accent/80 transition-all"
                >
                  Save Profile Settings
                </button>
              </form>

              {/* Saved Card widget */}
              <div className="space-y-md">
                <div className="premium-glass rounded-3xl border border-white/5 p-md space-y-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-vantage-accent">
                    Saved Payment Methods
                  </h4>

                  {profile.savedCard ? (
                    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-tr from-[#1e293b] to-black p-sm space-y-md text-white">
                      <div className="flex justify-between items-center">
                        <CreditCard className="h-6 w-6 text-vantage-accent" />
                        <span className="text-[10px] font-mono text-vantage-muted">
                          {profile.savedCard.brand}
                        </span>
                      </div>

                      <div className="font-mono text-sm tracking-wider">
                        •••• •••• •••• {profile.savedCard.last4}
                      </div>

                      <div className="flex justify-between items-center font-mono text-[9px] text-vantage-muted">
                        <span>LAURENCE VANTAGE</span>
                        <span>EXP: {profile.savedCard.expiry}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-vantage-muted">No saved credit cards found.</p>
                  )}

                  <button className="w-full py-sm bg-white/5 border border-white/10 text-xs font-bold text-white rounded-xl hover:bg-white/10 transition-colors">
                    Add New Card
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;
