import React, { useState } from 'react';
import { useBookingStore } from '../store/useBookingStore';
import { useTranslation } from 'react-i18next';
import { Search, Ticket, Plane, ShieldAlert, QrCode, RefreshCw } from 'lucide-react';

export const TrackTicketPage: React.FC = () => {
  const { t } = useTranslation();
  const { trackedTicket, trackError, lookupTicket, clearTrackedTicket } = useBookingStore();
  
  const [pnr, setPnr] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pnr || !lastName) return;
    setIsSearching(true);
    await lookupTicket(pnr, lastName);
    setIsSearching(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-sm py-md min-h-[80vh] flex flex-col justify-center">
      {!trackedTicket ? (
        /* AUTHENTICATION LOOKUP DRAWER */
        <div className="premium-glass rounded-3xl p-md border border-white/5 space-y-sm max-w-md mx-auto w-full">
          <div className="flex items-center gap-xs">
            <Ticket className="w-6 h-6 text-vantage-accent" />
            <div>
              <h2 className="text-md font-black text-white uppercase tracking-wide">{t('track.title')}</h2>
              <p className="text-xs text-vantage-muted">Retrieve live terminal data & boarding documents</p>
            </div>
          </div>

          <form onSubmit={handleLookup} className="space-y-xs">
            <div className="space-y-2xs">
              <label className="block text-[10px] uppercase tracking-wider text-vantage-muted font-bold">
                {t('track.pnr_label')}
              </label>
              <input
                type="text"
                maxLength={6}
                value={pnr}
                onChange={(e) => setPnr(e.target.value.toUpperCase())}
                placeholder="e.g., VNTG6K"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-xs py-xs text-xs text-white uppercase focus:outline-none focus:border-vantage-accent font-mono tracking-widest"
              />
            </div>

            <div className="space-y-2xs">
              <label className="block text-[10px] uppercase tracking-wider text-vantage-muted font-bold">
                Passenger Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="As written on passport"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-xs py-xs text-xs text-white focus:outline-none focus:border-vantage-accent"
              />
            </div>

            {trackError && (
              <div className="flex items-center gap-2xs p-xs rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{trackError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSearching}
              className="w-full py-xs mt-xs rounded-xl bg-gradient-to-r from-vantage-accent to-blue-500 text-vantage-dark font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2xs transition-all hover:opacity-90 disabled:opacity-50"
            >
              {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              {t('track.cta')}
            </button>
          </form>
        </div>
      ) : (
        /* LIVE TICKETING PORTAL DETAILS DASHBOARD */
        <div className="space-y-sm animate-fadeIn">
          <div className="flex items-center justify-between flex-wrap gap-xs">
            <div>
              <span className="text-[10px] font-bold bg-green-500/10 text-green-400 px-xs py-3xs rounded-full border border-green-500/20 tracking-wider uppercase">
                ● Live: {trackedTicket.status.replace('_', ' ')}
              </span>
              <h1 className="text-lg font-black text-white uppercase mt-2xs tracking-tight">
                Reservation Summary ({trackedTicket.pnr})
              </h1>
            </div>
            <button 
              onClick={clearTrackedTicket}
              className="text-xs text-vantage-accent border border-vantage-accent/20 px-xs py-2xs rounded-xl hover:bg-vantage-accent/5 transition-colors"
            >
              Search Different Ticket
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-sm">
            {/* Boarding Pass Visual Component */}
            <div className="md:col-span-2 premium-glass rounded-3xl p-md border border-white/5 space-y-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-vantage-accent/10 to-transparent blur-xl pointer-events-none" />
              
              <div className="flex justify-between items-center border-b border-white/5 pb-xs">
                <div>
                  <p className="text-[10px] text-vantage-muted uppercase font-bold">Flight Number</p>
                  <p className="text-sm font-mono font-bold text-white">{trackedTicket.flightNumber}</p>
                </div>
                <Plane className="w-5 h-5 text-vantage-accent rotate-90" />
                <div className="text-right">
                  <p className="text-[10px] text-vantage-muted uppercase font-bold">Seat Assigned</p>
                  <p className="text-sm font-mono font-bold text-vantage-accent">{trackedTicket.seat}</p>
                </div>
              </div>

              {/* Responsive Flex Routing Display */}
              <div className="flex justify-between items-center py-xs">
                <div>
                  <h3 className="text-xl font-black text-white tracking-wider">{trackedTicket.origin}</h3>
                  <p className="text-[10px] text-vantage-muted uppercase">Origin Station</p>
                </div>
                <div className="flex-1 border-t border-dashed border-white/20 mx-md relative">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-vantage-dark p-2xs rounded-full border border-white/5">
                    <Plane className="w-3 h-3 text-vantage-muted" />
                  </div>
                </div>
                <div className="text-right">
                  <h3 className="text-xl font-black text-white tracking-wider">{trackedTicket.destination}</h3>
                  <p className="text-[10px] text-vantage-muted uppercase">Destination</p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-xs flex justify-between items-center flex-wrap gap-xs">
                <div>
                  <p className="text-[10px] text-vantage-muted uppercase font-bold">Passenger Identity</p>
                  <p className="text-xs font-bold text-white">{trackedTicket.passengerName}</p>
                </div>
                <div>
                  <p className="text-[10px] text-vantage-muted uppercase font-bold">Departure Schedule</p>
                  <p className="text-xs text-white font-mono">{new Date(trackedTicket.departureTime).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Mobile Wallet Integration Gate */}
            <div className="premium-glass rounded-3xl p-md border border-white/5 flex flex-col items-center justify-center text-center space-y-xs bg-gradient-to-b from-white/5 to-transparent">
              <QrCode className="w-24 h-24 text-white p-xs bg-white rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.05)]" />
              <div>
                <p className="text-xs font-bold text-white">Digital Gate Pass</p>
                <p className="text-[10px] text-vantage-muted px-xs mt-3xs">Scan directly at terminal security gates and automated boarding points.</p>
              </div>
              <button className="w-full py-2xs rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition-all">
                Add to Apple Wallet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackTicketPage;
