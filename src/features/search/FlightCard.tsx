import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FlightOption } from './types';
import { ChevronDown, Wifi, Battery, Shield, Briefcase } from 'lucide-react';

interface FlightCardProps {
  flight: FlightOption;
  isSelected: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onSelect: () => void;
  actionLabel?: string;
}

export const FlightCard: React.FC<FlightCardProps> = React.memo(({
  flight,
  isSelected,
  isExpanded,
  onToggleExpand,
  onSelect,
  actionLabel = 'Select Flight',
}) => {
  const mainSegment = flight.outbound[0];
  if (!mainSegment) return null;

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDuration = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const rem = mins % 60;
    return `${hours}h ${rem}m`;
  };

  const stopsCount = flight.outbound.length - 1;

  return (
    <motion.div
      layout="position"
      transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
      className={`w-full premium-glass rounded-xl overflow-hidden border transition-colors duration-300 ${
        isSelected ? 'border-vantage-accent bg-vantage-surface/90' : 'border-white/5 hover:border-white/10'
      }`}
    >
      {/* Main Card row */}
      <div className="p-sm flex flex-col md:flex-row items-center justify-between gap-sm">
        {/* Airline & Brand Metadata */}
        <div className="flex items-center gap-xs w-full md:w-1/4">
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 font-bold text-xs text-vantage-accent tracking-wider">
            {mainSegment.airlineCode}
          </div>
          <div>
            <h4 className="font-medium text-sm text-white">{mainSegment.airline}</h4>
            <p className="text-xs text-vantage-muted">{mainSegment.aircraft}</p>
          </div>
        </div>

        {/* Departure/Arrival Timeline Visual */}
        <div className="flex items-center justify-between gap-md w-full md:w-2/4">
          <div className="text-left">
            <span className="block text-base font-semibold text-white">{formatTime(mainSegment.departureTime)}</span>
            <span className="text-xs text-vantage-muted font-medium uppercase tracking-wider">{mainSegment.origin}</span>
          </div>

          <div className="flex-1 flex flex-col items-center relative px-xs">
            <span className="text-2xs text-vantage-muted font-medium mb-1">{formatDuration(mainSegment.duration)}</span>
            <div className="w-full h-[2px] bg-white/10 relative flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-vantage-accent absolute left-0" />
              {stopsCount > 0 && (
                <div className="px-1.5 py-0.5 rounded-full bg-vantage-slate border border-white/10 text-3xl font-bold absolute text-vantage-accent text-[9px] uppercase tracking-widest scale-75">
                  {stopsCount} STOP
                </div>
              )}
              <div className="w-2 h-2 rounded-full bg-vantage-accent absolute right-0" />
            </div>
          </div>

          <div className="text-right">
            <span className="block text-base font-semibold text-white">{formatTime(mainSegment.arrivalTime)}</span>
            <span className="text-xs text-vantage-muted font-medium uppercase tracking-wider">{mainSegment.destination}</span>
          </div>
        </div>

        {/* Pricing / CTA Stack */}
        <div className="flex items-center justify-between md:justify-end gap-sm w-full md:w-1/4 border-t md:border-t-0 border-white/5 pt-xs md:pt-0">
          <button
            onClick={onToggleExpand}
            className="flex items-center gap-2xs text-xs text-vantage-muted hover:text-white transition-colors"
          >
            Details
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>

          <div className="text-right flex items-center gap-xs">
            <div>
              <span className="text-2xs block text-vantage-muted uppercase font-medium">From</span>
              <span className="text-lg font-bold text-white">${flight.price}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              className="px-sm py-2xs rounded-lg bg-vantage-accent text-vantage-dark font-semibold text-xs tracking-wide hover:bg-white transition-colors duration-300"
            >
              {actionLabel}
            </button>
          </div>
        </div>
      </div>

      {/* Inline Height Expandable Panel */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
            className="border-t border-white/5 bg-black/20 overflow-hidden"
          >
            <div className="p-sm grid grid-cols-1 md:grid-cols-2 gap-sm text-sm">
              <div className="space-y-xs">
                <h5 className="text-xs font-semibold text-vantage-accent uppercase tracking-wider">Premium Amenities</h5>
                <div className="grid grid-cols-2 gap-2xs text-vantage-muted text-xs">
                  <div className="flex items-center gap-2xs">
                    <Wifi className="w-3.5 h-3.5 text-white/40" />
                    <span>{flight.amenities.wifi ? 'High-speed Wi-Fi Included' : 'No Wi-Fi available'}</span>
                  </div>
                  <div className="flex items-center gap-2xs">
                    <Battery className="w-3.5 h-3.5 text-white/40" />
                    <span>{flight.amenities.power ? 'In-seat Power Outlets' : 'USB charging only'}</span>
                  </div>
                  <div className="flex items-center gap-2xs">
                    <Shield className="w-3.5 h-3.5 text-white/40" />
                    <span>Seat Pitch: {flight.amenities.seatPitch}</span>
                  </div>
                  <div className="flex items-center gap-2xs">
                    <Briefcase className="w-3.5 h-3.5 text-white/40" />
                    <span>Baggage: {flight.amenities.baggage}</span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-vantage-muted space-y-2xs border-t md:border-t-0 md:border-l border-white/5 pt-xs md:pt-0 md:pl-sm">
                <h5 className="text-xs font-semibold text-vantage-accent uppercase tracking-wider">Fare Conditions</h5>
                <p>• Partial refunds allowed with modification fees ($150).</p>
                <p>• Complimentary meal, snack, and high-end beverages mapping to {flight.cabinClass} class parameters.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

FlightCard.displayName = 'FlightCard';

export default FlightCard;
