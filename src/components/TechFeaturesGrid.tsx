import React from 'react';
import { Compass, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CARDS = [
  {
    title: 'Unrivaled Global Telemetry',
    description:
      'Command absolute awareness with our real-time global airspace radar. Track elite commercial and private charters with absolute precision.',
    icon: Compass,
    link: '/tracker',
    cta: 'Open Satellite Radar',
    color: 'from-sky-500/20 to-blue-600/10',
    borderColor: 'border-sky-500/20 hover:border-sky-400/40',
    iconColor: 'text-vantage-accent',
    glowColor: 'group-hover:shadow-glow-accent',
  },
  {
    title: 'Impenetrable Digital Enclave',
    description:
      'Safeguard your credentials, biometric clearances, and financial assets within an AES-256 encrypted local vault. Supreme privacy, uncompromising security.',
    icon: Lock,
    link: '/dashboard',
    cta: 'Configure Vault',
    color: 'from-violet-500/15 to-purple-600/8',
    borderColor: 'border-violet-500/20 hover:border-violet-400/40',
    iconColor: 'text-violet-400',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]',
  },
  {
    title: 'Bespoke Itinerary Concierge',
    description:
      'Instantly summon, curate, and elevate your confirmed journeys. Access immediate travel intelligence with absolute modification sovereignty.',
    icon: ShieldCheck,
    link: '/manage-booking',
    cta: 'Retrieve Booking',
    color: 'from-emerald-500/15 to-teal-600/8',
    borderColor: 'border-emerald-500/20 hover:border-emerald-400/40',
    iconColor: 'text-vantage-emerald',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(52,211,153,0.2)]',
  },
];

export const TechFeaturesGrid: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
      {CARDS.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            onClick={() => navigate(card.link)}
            className={`group relative premium-glass rounded-4xl border ${card.borderColor} p-lg flex flex-col justify-between min-h-64 cursor-pointer transition-all duration-400 ease-premium ${card.glowColor} overflow-hidden`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate(card.link);
              }
            }}
            aria-label={`Navigate to ${card.title}`}
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none`} />

            {/* Top accent bar */}
            <div className="absolute top-0 left-lg right-lg h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="relative z-10 space-y-md">
              {/* Icon */}
              <div className={`w-fit p-sm rounded-2xl bg-white/5 border border-white/8 transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110 group-hover:-rotate-3 origin-center`}>
                <Icon className={`h-7 w-7 ${card.iconColor}`} />
              </div>

              <div className="space-y-xs">
                <h4 className="text-base font-bold text-white tracking-tight leading-snug">
                  {card.title}
                </h4>
                <p className="text-xs text-vantage-muted leading-relaxed">{card.description}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="relative z-10 flex items-center gap-2xs text-xs font-bold text-vantage-muted group-hover:text-vantage-accent mt-md transition-colors duration-300">
              <span>{card.cta}</span>
              <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1.5" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TechFeaturesGrid;
