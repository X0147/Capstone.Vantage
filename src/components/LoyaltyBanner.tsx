import React, { useState } from 'react';
import { Award, Tv2, FastForward, ArrowRight, Star, Sparkles, Compass } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const BENEFITS = [
  {
    icon: Star,
    title: 'Accelerated Rewards',
    desc: 'On all signature global routes',
  },
  {
    icon: Tv2,
    title: 'Sanctuary Access',
    desc: 'Unrestricted access to private global lounges',
  },
  {
    icon: FastForward,
    title: 'Sovereign Terminal Clearance',
    desc: 'Dedicated biometric check-in & invisible security',
  },
];

export const LoyaltyBanner: React.FC = () => {
  const navigate = useNavigate();
  const [miles, setMiles] = useState(42500);
  const targetMiles = 50000;
  const progressPercent = Math.min((miles / targetMiles) * 100, 100);

  const simulateMilesEarned = () => {
    setMiles((prev) => {
      const next = prev + 1500;
      return next > targetMiles ? 30000 : next; // Reset back to simulate loop
    });
  };

  return (
    <section className="relative overflow-hidden rounded-4xl border border-vantage-gold/15 bg-gradient-to-br from-[#070b12] via-[#120d04] to-[#040810] p-xl sm:p-2xl shadow-glow-gold transition-all duration-300 hover:border-vantage-gold/25">
      {/* Earth network background image */}
      <img
        src={`${import.meta.env.BASE_URL || '/'}images/earth-network.jpg`}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.18] mix-blend-lighten pointer-events-none select-none"
      />
      {/* Dark gradient overlay to keep text crisp */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#070b12]/80 via-[#120d04]/70 to-[#040810]/85 pointer-events-none" />

      {/* Shimmer sweep */}
      <div className="absolute inset-0 shimmer-gold pointer-events-none opacity-40" />

      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-vantage-gold/10 rounded-full blur-[100px] pointer-events-none -mr-24 -mt-24" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-600/5 rounded-full blur-[80px] pointer-events-none -ml-16 -mb-16" />


      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-xl">
        {/* Left Side: Program Details */}
        <div className="lg:col-span-7 space-y-lg">
          <div className="space-y-xs">
            <span className="inline-flex items-center gap-2xs rounded-full border border-vantage-gold/30 bg-vantage-gold/10 px-sm py-2xs text-[9px] font-bold uppercase tracking-widest text-vantage-gold">
              <Award className="h-3 w-3 animate-pulse" />
              Vantage Black Syndicate
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-bold leading-tight text-white italic">
              Command the Apex of Global Transit
            </h3>
            <p className="text-sm text-vantage-muted leading-relaxed max-w-xl">
              Access a realm reserved for the absolute elite. Accrue zero-gravity cryptographic rewards, bypass the masses with sovereign terminal clearance, and decompress in over 1,200 private sanctuaries worldwide.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-sm pt-sm">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col gap-2xs p-xs rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-vantage-gold/10 border border-vantage-gold/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-vantage-gold" />
                </div>
                <div className="mt-2xs">
                  <p className="text-xs font-bold text-white">{title}</p>
                  <p className="text-[10px] text-vantage-muted mt-3xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-md pt-xs">
            <Link
              to="/login"
              className="group/btn relative overflow-hidden rounded-xl bg-vantage-gold/10 border border-vantage-gold/30 px-lg py-sm font-bold text-[11px] uppercase tracking-widest text-vantage-gold transition-all duration-300 hover:bg-vantage-gold hover:text-vantage-midnight hover:shadow-glow-gold hover:-translate-y-0.5"
            >
              Request Black Status <ArrowRight className="inline-block ml-xs w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-500 group-hover/btn:translate-x-full" />
            </Link>
            <button
              onClick={simulateMilesEarned}
              className="flex items-center gap-xs text-[10px] font-mono uppercase tracking-widest text-vantage-muted hover:text-vantage-text transition-colors"
            >
              <Compass className="w-4 h-4" /> Simulate Ledger
            </button>
          </div>
        </div>

        {/* Right Side: Interactive Card */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <Link to="/dashboard" className="relative w-full max-w-[340px] aspect-[1.586/1] rounded-3xl p-sm border border-vantage-gold/30 bg-gradient-to-br from-vantage-midnight via-[#121620] to-[#040810] shadow-2xl overflow-hidden group/card cursor-pointer transition-transform hover:-translate-y-2 hover:shadow-glow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vantage-gold">
            {/* Gloss reflection shimmer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000 ease-out" />
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-vantage-gold/5 rounded-full blur-xl pointer-events-none" />

            <div className="h-full flex flex-col justify-between relative z-10">
              {/* Card Top */}
              <div className="flex justify-between items-start">
                <div className="space-y-3xs">
                  <span className="text-[7px] font-mono uppercase tracking-widest text-vantage-gold">Vantage Black Cryptographic Ledger</span>
                  <div className="text-sm font-semibold tracking-wider text-white">SOVEREIGN PROTOCOL</div>
                </div>
                <div className="w-7 h-7 rounded-lg bg-vantage-gold/15 flex items-center justify-center border border-vantage-gold/30">
                  <Sparkles className="w-4 h-4 text-vantage-gold animate-pulse" />
                </div>
              </div>

              {/* Card Chip & Wireless */}
              <div className="flex items-center gap-xs">
                <div className="w-8 h-6 rounded bg-gradient-to-r from-vantage-gold/30 to-vantage-gold-light/45 border border-vantage-gold/20" />
                <Compass className="w-4 h-4 text-white/20" />
              </div>

              {/* Card Bottom */}
              <div className="flex justify-between items-end">
                <div className="space-y-3xs">
                  <div className="text-[10px] font-semibold text-white tracking-widest">VIP ELITE MEMBER</div>
                  <div className="text-[9px] font-mono text-vantage-muted">ID: VN-840-9281</div>
                </div>
                <span className="text-[8px] font-mono tracking-widest px-xs py-3xs rounded-full border border-vantage-gold/30 text-vantage-gold bg-vantage-gold/10 font-bold">
                  GOLD ELITE
                </span>
              </div>
            </div>
          </Link>

          {/* Interactive Miles Tracker Panel */}
          <div className="w-full max-w-[340px] mt-md p-sm bg-black/40 border border-white/5 rounded-2xl space-y-2xs backdrop-blur-md">
            <div className="flex justify-between items-center text-[10px] font-mono tracking-wider text-vantage-muted">
              <span>NEXT TIER: PLATINUM</span>
              <span className="text-white font-bold">{progressPercent.toFixed(0)}% COMPLETE</span>
            </div>
            
            {/* Progress bar */}
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-vantage-gold to-vantage-gold-light rounded-full shadow-glow-gold transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-xs pt-3xs">
              <span className="text-vantage-text font-medium">{miles.toLocaleString()} Miles</span>
              <span className="text-vantage-muted font-mono text-[10px]">{targetMiles.toLocaleString()} Miles Target</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoyaltyBanner;
