import React from 'react';
import { Award, Tv2, FastForward, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BENEFITS = [
  {
    icon: Star,
    title: '2× Miles',
    desc: 'On every trans-atlantic vector',
  },
  {
    icon: Tv2,
    title: 'VIP Lounge',
    desc: 'Complimentary worldwide access',
  },
  {
    icon: FastForward,
    title: 'Priority Queue',
    desc: 'Fast-track security clearance',
  },
];

export const LoyaltyBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden rounded-4xl border border-vantage-gold/15 bg-gradient-to-br from-[#0f0a00] via-[#1a1200] to-[#0a0f1a] p-lg shadow-glow-gold">
      {/* Shimmer sweep */}
      <div className="absolute inset-0 shimmer-gold pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-vantage-gold/8 rounded-full blur-[100px] pointer-events-none -mr-24 -mt-24" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-600/5 rounded-full blur-[80px] pointer-events-none -ml-16 -mb-16" />

      <div className="relative z-10 space-y-lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
          <div className="space-y-xs max-w-xl">
            <span className="inline-flex items-center gap-2xs rounded-full border border-vantage-gold/30 bg-vantage-gold/10 px-sm py-2xs text-[9px] font-bold uppercase tracking-widest text-vantage-gold">
              <Award className="h-3 w-3" />
              Vantage Privilege Club
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white italic">
              Unlock Elite Status &amp; Accelerate Your Mileage
            </h3>
            <p className="text-sm text-vantage-muted leading-relaxed">
              Join millions of global travelers earning 2× reward miles on every flight.
              Enjoy complimentary VIP lounge entry and priority fast-track clearances worldwide.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="group shrink-0 flex items-center gap-2xs px-lg py-sm rounded-2xl bg-gradient-to-r from-vantage-gold to-vantage-gold-light text-vantage-midnight font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-glow-gold hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shadow-lg"
          >
            Join Elite Club
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-sm pt-lg border-t border-vantage-gold/10">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-sm">
              <div className="p-sm rounded-2xl bg-vantage-gold/10 border border-vantage-gold/20 shrink-0">
                <Icon className="w-5 h-5 text-vantage-gold" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{title}</p>
                <p className="text-[11px] text-vantage-muted mt-3xs">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoyaltyBanner;
