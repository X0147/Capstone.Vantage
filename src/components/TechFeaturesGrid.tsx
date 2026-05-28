import React from 'react';
import { Compass, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import AccessibleButton from './AccessibleButton';
import { useNavigate } from 'react-router-dom';

/**
 * Grid displaying platform technical capabilities.
 */
export const TechFeaturesGrid: React.FC = () => {
  const navigate = useNavigate();
  const cards = [
    {
      title: 'ADS-B Airspace Radar',
      description:
        'Intercept global carrier transponder paths across active international vectors in absolute real‑time.',
      icon: <Compass className="h-8 w-8 text-vantage-accent animate-spin-slow" />,
      link: '/tracker',
    },
    {
      title: 'Secure Passport Vault',
      description:
        'Save document credentials, TSA PreCheck, and payment details inside secure local browser memory.',
      icon: <Lock className="h-8 w-8 text-vantage-accent" />,
      link: '/dashboard',
    },
    {
      title: 'Locator Ledger Retrieval',
      description:
        'Search, modify, or add baggage services to your confirmed itineraries using booking references.',
      icon: <ShieldCheck className="h-8 w-8 text-vantage-accent" />,
      link: '/manage-booking',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-sm">
      {cards.map((card) => (
        <div
          key={card.title}
          onClick={() => navigate(card.link)}
          className="group premium-glass rounded-3xl border border-white/5 p-md flex flex-col justify-between h-56 hover:border-vantage-accent/30 hover:shadow-[0_0_35px_rgba(56,189,248,0.1)] transition-all duration-300 cursor-pointer active:scale-[0.99]"
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
          <div className="space-y-xs">
            <div className="transition-transform duration-300 group-hover:scale-110 origin-left w-fit">
              {card.icon}
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">{card.title}</h4>
            <p className="text-xs text-vantage-muted">{card.description}</p>
          </div>
          <div className="text-xs font-bold text-vantage-accent flex items-center gap-3xs mt-sm self-start transition-colors">
            <span>
              {card.title.includes('Radar')
                ? 'Open Satellite Radar'
                : card.title.includes('Vault')
                  ? 'Configure Vault Preferences'
                  : 'Retrieve Smart Ticket'}
            </span>
            <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechFeaturesGrid;
