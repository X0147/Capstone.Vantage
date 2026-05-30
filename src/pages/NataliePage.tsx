import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowLeft, ShieldCheck, MapPin, Calendar, Clock, Plane, Briefcase, Star, Fingerprint, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { ProfileCard } from '../components/ProfileCard';
import { ItineraryCard } from '../components/ItineraryCard';
import { TravelTimeline } from '../components/TravelTimeline';

const passenger = {
  trackingId: 'ABC123',
  name: 'Jennifer Natalie Newton',
  tier: 'Black Syndicate',
  milesBalance: 123456,
  passportNumber: 'P1234567',
  tsaPreCheck: 'Clear',
  dietaryPreference: 'Vegetarian',
  itinerary: {
    departure: { iata: 'JFK', time: '2026-06-15T13:00:00Z' },
    arrival: { iata: 'LHR', time: '2026-06-15T15:30:00Z' },
    flightNumber: 'VA123',
    airline: 'Vantage Air'
  }
};

const NataliePage: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(passenger.trackingId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Premium animation variants
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-vantage-midnight flex flex-col relative overflow-hidden font-sans">
      <SEO 
        title="Dossier: Jennifer N. Newton" 
        description="Exclusive Black Syndicate passenger profile and itinerary." 
      />

      {/* Cinematic Background */}
      <img
        src={`${import.meta.env.BASE_URL ?? '/'}images/earth-network.jpg`}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.25] mix-blend-lighten pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-vantage-midnight/90 via-vantage-midnight/70 to-black/95 pointer-events-none" />

      {/* Ambient Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-vantage-gold/5 rounded-full blur-[150px] pointer-events-none -mr-40" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none -ml-40" />

      {/* Top Navigation */}
      <div className="relative z-20 w-full px-6 py-8 md:px-12 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-vantage-muted hover:text-white transition-all text-xs font-mono tracking-widest uppercase"
        >
          <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all shadow-lg">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          </span>
          Return
        </button>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-vantage-gold/30 bg-vantage-gold/10 backdrop-blur-md">
          <Fingerprint className="w-3.5 h-3.5 text-vantage-gold animate-pulse" />
          <span className="text-[9px] font-mono uppercase tracking-widest text-vantage-gold font-bold">Encrypted Dossier</span>
        </div>
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-20 w-full max-w-6xl mx-auto px-6 md:px-12 flex-1 pb-20 flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Profile Card */}
          <motion.div variants={fadeUp} className="lg:col-span-5 space-y-8">
            <ProfileCard passenger={passenger} />
          </motion.div>

          {/* Right Column: Active Itinerary */}
          <motion.div variants={fadeUp} className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3 text-white mb-2">
              <Plane className="w-6 h-6 text-vantage-gold" />
              <h2 className="text-2xl font-display font-bold">Active Manifest</h2>
            </div>
            
            <div className="rounded-[2rem] bg-[#070b12]/60 border border-white/10 backdrop-blur-xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-[80px]" />
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                <ItineraryCard passenger={passenger} />
              </div>
        <TravelTimeline />

              <div className="relative flex items-center justify-between z-10 bg-white/[0.02] border border-white/5 rounded-2xl p-6 mb-8">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-vantage-gold/50 to-transparent relative">
                  <motion.div 
                    className="absolute top-1/2 left-1/2 -translate-y-1/2 w-2 h-2 bg-vantage-gold rounded-full"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                  <Calendar className="w-4 h-4 text-vantage-muted mb-2" />
                  <p className="text-[9px] font-mono text-vantage-muted uppercase tracking-widest">Date</p>
                  <p className="text-sm font-bold text-white mt-1">15 Jun 2026</p>
                </div>
                <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                  <Briefcase className="w-4 h-4 text-vantage-muted mb-2" />
                  <p className="text-[9px] font-mono text-vantage-muted uppercase tracking-widest">Cabin</p>
                  <p className="text-sm font-bold text-white mt-1">First Class</p>
                </div>
                <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                  <Star className="w-4 h-4 text-vantage-gold mb-2" />
                  <p className="text-[9px] font-mono text-vantage-muted uppercase tracking-widest">Seat</p>
                  <p className="text-sm font-bold text-white mt-1">1A (Bespoke)</p>
                </div>
                <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                  <p className="text-sm text-vantage-muted mb-4">
                    Tracking ID: <span className="font-mono text-vantage-accent mr-2">{passenger.trackingId}</span>
                    <button
                      onClick={handleCopy}
                      className="text-xs underline text-vantage-accent hover:text-vantage-accent/80 transition-colors"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </p>
                  <Clock className="w-4 h-4 text-vantage-muted mb-2" />
                  <p className="text-[9px] font-mono text-vantage-muted uppercase tracking-widest">Boarding</p>
                  <p className="text-sm font-bold text-white mt-1">13:45</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button onClick={() => navigate('/tracker', { state: { flightNumber: 'VW-402' } })} className="flex items-center justify-between bg-[#070b12]/60 border border-sky-500/20 hover:border-sky-500/50 hover:bg-sky-500/10 backdrop-blur-md p-5 rounded-2xl transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                    <MapPin className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">Live Tracking</p>
                    <p className="text-[10px] font-mono text-vantage-muted uppercase tracking-widest">Monitor Flight VW-402</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-sky-400 transition-transform group-hover:translate-x-1" />
              </button>

              <button className="flex items-center justify-between bg-[#070b12]/60 border border-vantage-gold/20 hover:border-vantage-gold/50 hover:bg-vantage-gold/10 backdrop-blur-md p-5 rounded-2xl transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-vantage-gold/10 flex items-center justify-center border border-vantage-gold/20">
                    <ShieldCheck className="w-4 h-4 text-vantage-gold" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">Concierge Access</p>
                    <p className="text-[10px] font-mono text-vantage-muted uppercase tracking-widest">Modify Arrangements</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-vantage-gold transition-transform group-hover:translate-x-1" />
              </button>

              <button onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Natalie Dossier',
                      text: "Check out Jennifer Natalie Newton's profile!",
                      url: window.location.href
                    });
                  } else {
                    alert('Share not supported');
                  }
                }} className="flex items-center justify-between bg-[#070b12]/60 border border-vantage-gold/20 hover:border-vantage-gold/50 hover:bg-vantage-gold/10 backdrop-blur-md p-5 rounded-2xl transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-vantage-gold/10 flex items-center justify-center border border-vantage-gold/20">
                    <Star className="w-4 h-4 text-vantage-gold" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">Share</p>
                    <p className="text-[10px] font-mono text-vantage-muted uppercase tracking-widest">Spread the word</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-vantage-gold transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NataliePage;
