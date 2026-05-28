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
      description: 'Intercept global carrier transponder paths across active international vectors in absolute real‑time.',
      icon: <Compass className="h-8 w-8 text-vantage-accent animate-spin-slow" />, 
      link: '/tracker',
    },
    {
      title: 'Secure Passport Vault',
      description: 'Save document credentials, TSA PreCheck, and payment details inside secure local browser memory.',
      icon: <Lock className="h-8 w-8 text-vantage-accent" />, 
      link: '/dashboard',
    },
    {
      title: 'Locator Ledger Retrieval',
      description: 'Search, modify, or add baggage services to your confirmed itineraries using booking references.',
      icon: <ShieldCheck className="h-8 w-8 text-vantage-accent" />, 
      link: '/manage-booking',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-sm">
      {cards.map((card) => (
        <div key={card.title} className="premium-glass rounded-3xl border border-white/5 p-md flex flex-col justify-between h-56 hover:border-white/10 transition-all">
          <div className="space-y-xs">
            {card.icon}
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">{card.title}</h4>
            <p className="text-xs text-vantage-muted">{card.description}</p>
          </div>
          <AccessibleButton
            ariaLabel={`Open ${card.title}`}
            className="text-xs font-bold text-vantage-accent hover:underline flex items-center gap-3xs mt-sm self-start"
            onClick={() => navigate(card.link)}
          >
            {card.title.includes('Radar') ? 'Open Satellite Radar' : card.title.includes('Vault') ? 'Configure Vault Preferences' : 'Retrieve Smart Ticket'}
            <ArrowRight className="h-4 w-4" />
          </AccessibleButton>
        </div>
      ))}
    </div>
  );
};

export default TechFeaturesGrid;
