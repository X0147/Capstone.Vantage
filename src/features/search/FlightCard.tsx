import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Wifi, BriefcaseBusiness, PlaneTakeoff } from 'lucide-react';
import type { FlightSearchResult } from '../../services/flightService.ts';

export interface FlightCardProps {
  flight: FlightSearchResult;
  expanded: boolean;
  selected: boolean;
  onSelect: (flight: FlightSearchResult) => void;
  onToggleExpand: (flightId: string) => void;
}

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

const airlineBadge: Record<FlightSearchResult['airlineName'], string> = {
  Emirates: 'EK',
  Qantas: 'QF',
  'Singapore Airlines': 'SQ',
};

export function FlightCard({ flight, expanded, selected, onSelect, onToggleExpand }: FlightCardProps) {
  return (
    <motion.article
      layout
      onClick={() => onSelect(flight)}
      className={`group cursor-pointer overflow-hidden rounded-2xl border p-5 transition-colors shadow-[0_12px_40px_rgba(0,0,0,0.22)] ${
        selected ? 'border-vantage-accent/60 bg-white/10' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
      }`}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white text-xs font-semibold text-slate-900">
            {airlineBadge[flight.airlineName]}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-white">{flight.airlineName}</h3>
              <span className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/70">
                {flight.airlineIata} {flight.flightNumber}
              </span>
            </div>
            <p className="mt-1 text-sm text-white/60">
              {flight.origin} → {flight.destination} • {flight.aircraft}
            </p>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3 lg:max-w-3xl lg:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-black/10 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Departure</p>
            <p className="mt-2 text-2xl font-semibold text-white">{formatTime(flight.departureIso)}</p>
            <p className="mt-1 text-sm text-white/60">{flight.origin}</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/10 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Timeline</p>
            <div className="mt-3 flex items-center gap-2 text-white/70">
              <span className="text-sm font-medium">{formatDuration(flight.durationMinutes)}</span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 via-white/45 to-white/10" />
              <span className="text-sm font-medium">{flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}</span>
            </div>
            <p className="mt-3 text-xs text-white/50">Layovers are shown in the expanded view.</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/10 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Arrival</p>
            <p className="mt-2 text-2xl font-semibold text-white">{formatTime(flight.arrivalIso)}</p>
            <p className="mt-1 text-sm text-white/60">{flight.destination}</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/10 p-4 text-right">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Fare</p>
            <p className="mt-2 text-3xl font-semibold text-white">${flight.price}</p>
            <p className="mt-1 text-sm text-white/60">{flight.cabinClass}</p>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onToggleExpand(flight.id);
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10"
              aria-expanded={expanded}
              aria-label={`Toggle details for ${flight.airlineName} flight ${flight.flightNumber}`}
            >
              Details
              <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="details"
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          >
            <div className="grid gap-4 p-5 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                  <BriefcaseBusiness className="h-4 w-4 text-vantage-accent" />
                  Cabin features
                </div>
                <ul className="space-y-1 text-sm text-white/70">
                  <li>Wi-Fi available on board</li>
                  <li>Seat pitch from 31" in economy</li>
                  <li>Premium dining on eligible cabins</li>
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                  <PlaneTakeoff className="h-4 w-4 text-vantage-accent" />
                  Baggage rules
                </div>
                <ul className="space-y-1 text-sm text-white/70">
                  <li>Carry-on: 1 bag + 1 personal item</li>
                  <li>Checked baggage varies by cabin class</li>
                  <li>Priority boarding on premium cabins</li>
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                  <Wifi className="h-4 w-4 text-vantage-accent" />
                  Route details
                </div>
                <ul className="space-y-1 text-sm text-white/70">
                  <li>{flight.layovers.length > 0 ? flight.layovers.map((layover) => `${layover.airportCode} (${layover.durationMinutes}m)`).join(' • ') : 'No layovers'}</li>
                  <li>{flight.aircraft}</li>
                  <li>{flight.currency} fare</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default FlightCard;
