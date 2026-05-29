import React, { useMemo } from 'react';
import { analyzeRoute } from '../../utils/aviation';
import { Activity, Clock, Navigation, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  originIata: string;
  destinationIata: string;
}

export const RouteIntelligencePanel: React.FC<Props> = ({ originIata, destinationIata }) => {
  const analysis = useMemo(() => {
    if (!originIata ?? !destinationIata ?? originIata === destinationIata) return null;
    return analyzeRoute(originIata, destinationIata);
  }, [originIata, destinationIata]);

  if (!analysis) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="overflow-hidden"
      >
        <div className="mt-sm p-sm rounded-2xl bg-gradient-to-br from-blue-900/10 to-transparent border border-blue-500/20 shadow-inner-glow">
          <div className="flex items-center gap-2xs mb-sm">
            <Activity className="w-4 h-4 text-sky-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Vantage Route Intelligence
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-sm">
            {/* Distance & Time */}
            <div className="flex items-start gap-xs">
              <Navigation className="w-4 h-4 text-vantage-muted mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] uppercase text-vantage-muted tracking-widest font-mono mb-1">
                  Distance & Time
                </p>
                <p className="text-sm font-semibold text-white">
                  {analysis.distanceKm.toLocaleString()} km
                </p>
                <p className="text-xs text-sky-300 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" /> {analysis.flightTimeFormatted} est.
                </p>
              </div>
            </div>

            {/* Stop Analysis */}
            <div className="flex items-start gap-xs">
              {analysis.stops === 0 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              )}
              <div>
                <p className="text-[10px] uppercase text-vantage-muted tracking-widest font-mono mb-1">
                  Stop Analysis
                </p>
                <p className="text-sm font-semibold text-white">
                  {analysis.stops === 0 ? 'Non-Stop Direct' : `${analysis.stops} Stop Required`}
                </p>
                <p className={`text-[10px] mt-0.5 ${analysis.stops === 0 ? 'text-emerald-400/80' : 'text-amber-400/80'}`}>
                  {analysis.stopAnalysis}
                </p>
              </div>
            </div>

            {/* Equipment & Hubs */}
            <div className="flex items-start gap-xs">
              <PlaneIcon className="w-4 h-4 text-vantage-muted mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] uppercase text-vantage-muted tracking-widest font-mono mb-1">
                  Typical Equipment
                </p>
                <p className="text-xs font-semibold text-white mb-1">
                  {analysis.typicalAircraft}
                </p>
                {analysis.commonHubs.length > 0 && (
                  <p className="text-[10px] text-vantage-muted">
                    Layovers likely in: <span className="text-white">{analysis.commonHubs.join(', ')}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const PlaneIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l6.8 3.4-3.5 3.5-3.1-.7L2 15l4 2 2 4 1.2-1.2-.7-3.1 3.5-3.5 3.4 6.8l1.2-.7-.6-1.9.6-1.1z" />
  </svg>
);
