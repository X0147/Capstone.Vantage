import React from 'react';
import AccessibleButton from './AccessibleButton';
import { useNavigate } from 'react-router-dom';

/**
 * Multi‑column modern footer with company info, destinations, legal, help, and status.
 */
export const StructuredFooter: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 pt-md pb-sm space-y-md">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-md">
        {/* Brand */}
        <div className="col-span-2 space-y-xs">
          <div className="flex items-center gap-xs">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-vantage-accent to-blue-600 flex items-center justify-center font-black text-xs text-vantage-dark">
              V
            </div>
            <span className="font-black text-sm tracking-tight text-white uppercase">
              Capstone<span className="text-vantage-accent">.Vantage</span>
            </span>
          </div>
          <p className="text-[11px] text-vantage-muted max-w-sm">
            Capstone.Vantage operates an encrypted aerospace booking matrix, enabling flight
            dispatching, PNR generation, and telemetry interception.
          </p>
        </div>
        {/* Navigation columns */}
        <div className="space-y-xs text-xs">
          <h5 className="font-bold uppercase tracking-wider text-white">Book Flights</h5>
          <ul className="space-y-2xs font-mono text-[10px] text-vantage-muted">
            <li>
              <AccessibleButton
                ariaLabel="New York → London"
                className="hover:text-white transition-colors"
                onClick={() => navigate('/')}
              >
                New York → London
              </AccessibleButton>
            </li>
            <li>
              <AccessibleButton
                ariaLabel="New York → Tokyo"
                className="hover:text-white transition-colors"
                onClick={() => navigate('/')}
              >
                New York → Tokyo
              </AccessibleButton>
            </li>
            <li>
              <AccessibleButton
                ariaLabel="New York → Paris"
                className="hover:text-white transition-colors"
                onClick={() => navigate('/')}
              >
                New York → Paris
              </AccessibleButton>
            </li>
          </ul>
        </div>
        <div className="space-y-xs text-xs">
          <h5 className="font-bold uppercase tracking-wider text-white">Airspace Utilities</h5>
          <ul className="space-y-2xs font-mono text-[10px] text-vantage-muted">
            <li>
              <AccessibleButton
                ariaLabel="ADS‑B Telemetry Radar"
                className="hover:text-white transition-colors"
                onClick={() => navigate('/tracker')}
              >
                ADS‑B Telemetry Radar
              </AccessibleButton>
            </li>
            <li>
              <AccessibleButton
                ariaLabel="Itinerary Retrieval"
                className="hover:text-white transition-colors"
                onClick={() => navigate('/manage-booking')}
              >
                Itinerary Retrieval
              </AccessibleButton>
            </li>
            <li>
              <AccessibleButton
                ariaLabel="Frequent Flyer Miles"
                className="hover:text-white transition-colors"
                onClick={() => navigate('/dashboard')}
              >
                Frequent Flyer Miles
              </AccessibleButton>
            </li>
          </ul>
        </div>
        <div className="space-y-xs text-xs">
          <h5 className="font-bold uppercase tracking-wider text-white">Platform Services</h5>
          <ul className="space-y-2xs font-mono text-[10px] text-vantage-muted">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Vector Service
              </a>
            </li>
            <li>
              <span className="text-emerald-400">Node: Secure-Active</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 pt-xs flex flex-col md:flex-row justify-between items-center gap-xs font-mono text-[9px] text-vantage-muted">
        <span>© {currentYear} Capstone.Vantage Airspace LLC. All flight parameters encrypted.</span>
        <div className="flex items-center gap-3xs">
          <svg className="h-3 w-3 text-vantage-accent" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11h-2v2H7v2h2v2h2v-2h2V9h-2V7z" />
          </svg>
          <span>Connection Latency: 12ms (Optimized)</span>
        </div>
      </div>
    </footer>
  );
};

export default StructuredFooter;
