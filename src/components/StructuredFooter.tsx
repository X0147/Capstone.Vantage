import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Globe, Mail } from 'lucide-react';
import BrandLogo from './BrandLogo';

const FOOTER_LINKS = {
  'Book Flights': [
    { label: 'New York → London', path: '/' },
    { label: 'New York → Tokyo', path: '/' },
    { label: 'New York → Paris', path: '/' },
    { label: 'New York → Dubai', path: '/' },
  ],
  'Airspace Tools': [
    { label: 'ADS-B Radar', path: '/tracker' },
    { label: 'Itinerary Retrieval', path: '/manage-booking' },
    { label: 'Frequent Flyer Miles', path: '/dashboard' },
    { label: 'Seat Selection', path: '/' },
  ],
  'Platform': [
    { label: 'Privacy Policy', path: '#' },
    { label: 'Terms of Service', path: '#' },
    { label: 'Cookie Preferences', path: '#' },
    { label: 'Accessibility', path: '#' },
  ],
};

export const StructuredFooter: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 space-y-xl pt-xl">
      {/* Newsletter strip */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-md premium-glass rounded-4xl p-lg border border-white/6">
        <div className="space-y-2xs">
          <h4 className="font-display text-xl font-bold text-white italic">Stay in the Vector</h4>
          <p className="text-xs text-vantage-muted max-w-sm">
            Get curated flight deals, airspace intelligence, and Vantage Privilege updates delivered weekly.
          </p>
        </div>
        <div className="flex gap-xs w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Mail className="absolute left-sm top-1/2 -translate-y-1/2 w-4 h-4 text-vantage-muted" />
            <input
              type="email"
              placeholder="you@vantage.aero"
              className="w-full bg-black/40 border border-white/10 rounded-2xl pl-10 pr-sm py-sm text-xs text-white placeholder:text-vantage-muted focus:outline-none focus:border-vantage-accent/60 transition-all"
            />
          </div>
          <button className="shrink-0 px-md py-sm rounded-2xl bg-gradient-to-r from-sky-400 to-blue-600 text-vantage-midnight font-bold text-xs uppercase tracking-wider transition-all hover:shadow-glow-accent hover:scale-[1.02] active:scale-[0.98]">
            Subscribe
          </button>
        </div>
      </div>

      {/* Link columns */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-xl">
        {/* Brand column */}
        <div className="col-span-2 space-y-md">
          <BrandLogo iconSize="w-40 h-auto" />
          <p className="text-[11px] text-vantage-muted leading-relaxed max-w-xs">
            Capstone.Vantage operates an encrypted aerospace booking matrix, enabling global flight
            dispatching, PNR generation, and real-time telemetry interception.
          </p>
          <div className="flex items-center gap-2xs text-[9px] font-mono text-vantage-muted">
            <Globe className="w-3 h-3 text-vantage-accent" />
            <span>Global coverage — 195 countries, 900+ airports</span>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading} className="space-y-sm">
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-white">{heading}</h5>
            <ul className="space-y-xs">
              {links.map(({ label, path }) => (
                <li key={label}>
                  <button
                    onClick={() => navigate(path)}
                    className="text-[11px] text-vantage-muted hover:text-vantage-accent transition-colors duration-200 text-left font-mono"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 pt-md flex flex-col md:flex-row justify-between items-center gap-xs">
        <span className="font-mono text-[9px] text-vantage-muted">
          © {currentYear} Capstone.Vantage Airspace LLC. All flight parameters encrypted. All rights reserved.
        </span>
        <div className="flex items-center gap-2xs font-mono text-[9px] text-vantage-muted">
          <ShieldCheck className="w-3 h-3 text-vantage-gold" />
          <span>Node: Secure-Active</span>
          <span className="h-1.5 w-1.5 rounded-full bg-vantage-emerald animate-pulse" />
          <span className="text-vantage-emerald">Latency: 12ms</span>
        </div>
      </div>
    </footer>
  );
};

export default StructuredFooter;
