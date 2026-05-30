import React from 'react';
import { ShieldCheck, Star } from 'lucide-react';

interface ProfileCardProps {
  passenger: {
    trackingId: string;
    tier: string;
    voyageNumber?: string;
  };
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ passenger }) => {
  return (
    <div className="premium-glass rounded-3xl border border-white/10 p-8 shadow-xl relative z-10 max-w-2xl mx-auto">
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-vantage-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none" />
      <div className="relative bg-[#070b12]/80 backdrop-blur-2xl rounded-[1.9rem] p-8 md:p-10 shadow-2xl overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-vantage-gold/20 rounded-full blur-[60px]" />
        <div className="flex flex-col items-center text-center relative z-10">
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full p-1 border-2 border-vantage-gold/50 border-dashed animate-[spin_10s_linear_infinite]" />
            <img
              src={`${import.meta.env.BASE_URL ?? '/'}images/natalie_portrait.png`}
              alt="Jennifer Natalie Newton"
              className="absolute inset-0 w-full h-full rounded-full object-cover border-4 border-[#070b12]"
            />
            <div className="absolute -bottom-2 -right-2 bg-[#070b12] rounded-full p-1.5 border border-white/10">
              <Star className="w-5 h-5 text-vantage-gold" />
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-vantage-gold/10 border border-vantage-gold/20 text-[10px] font-mono text-vantage-gold uppercase tracking-widest font-bold mb-4">
            <ShieldCheck className="w-3 h-3" /> Black Syndicate Tier
          </span>
          <h1 className="text-3xl md:text-4xl font-display font-black text-white leading-tight mb-2">
            Jennifer Natalie <br /> Newton
          </h1>
          <p className="text-sm text-vantage-muted font-mono tracking-widest uppercase mb-8">
            ID: VNTG-JNN-001
          </p>
          <div className="w-full space-y-3 text-left border-t border-white/10 pt-6">
            <div className="flex justify-between items-center bg-white/[0.02] p-3 rounded-xl border border-white/5">
              <span className="text-[10px] font-mono text-vantage-muted uppercase tracking-widest">Base</span>
              <span className="text-sm text-white font-bold">New York (JFK)</span>
            </div>
            <div className="flex justify-between items-center bg-white/[0.02] p-3 rounded-xl border border-white/5">
              <span className="text-[10px] font-mono text-vantage-muted uppercase tracking-widest">Clearance</span>
              <span className="text-sm text-emerald-400 font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Level 5
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
