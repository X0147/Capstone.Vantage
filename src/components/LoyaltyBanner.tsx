import React from 'react';
import { Sparkles, Award, ArrowRight } from 'lucide-react';
import AccessibleButton from './AccessibleButton';

/**
 * Promotional banner highlighting Vantage Gold Privilege benefits.
 */
export const LoyaltyBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-vantage-accent/20 bg-gradient-to-br from-vantage-dark/80 via-black to-[#1e293b] p-md space-y-sm shadow-xl">
      <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-amber-400 via-orange-500 to-transparent pointer-events-none" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
        <div className="space-y-2xs max-w-xl">
          <span className="inline-flex items-center gap-3xs rounded-full border border-amber-400/20 bg-amber-400/10 px-xs py-3xs text-[9px] font-bold uppercase tracking-widest text-amber-300">
            <Award className="h-3 w-3" /> Vantage Privilege Club Membership
          </span>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-white">
            Unlock Elite Status &amp; Accelerate Your Mileage Balance
          </h3>
          <p className="text-xs text-vantage-muted">
            Join millions of global travelers earning 2x reward miles on all trans‑atlantic flight vectors. Enjoy premium complimentary VIP lounge entry and priority fast‑track security clearances.
          </p>
        </div>
        <AccessibleButton
          ariaLabel="Access Elite Dashboard"
          className="px-md py-sm bg-gradient-to-r from-amber-400 to-amber-500 text-vantage-dark rounded-xl text-xs font-bold hover:opacity-90 transition-all flex items-center gap-2xs whitespace-nowrap"
          onClick={() => window.location.href = '/dashboard'}
        >
          Access Elite Dashboard <ArrowRight className="h-4 w-4" />
        </AccessibleButton>
      </div>
    </section>
  );
};

export default LoyaltyBanner;
