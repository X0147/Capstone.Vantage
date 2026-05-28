import React, { useState } from 'react';
import { useBookingStore, BookingRecord } from '../store/useBookingStore';
import { Search, MapPin, Calendar, Users, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const ManageBookingPage: React.FC = () => {
  const [pnr, setPnr] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [booking, setBooking] = useState<BookingRecord | null>(null);

  const getBooking = useBookingStore((state) => state.getBooking);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pnr || !lastName) {
      setError('Please enter both PNR and Last Name.');
      return;
    }

    const found = getBooking(pnr, lastName);
    if (found) {
      setBooking(found);
      setError('');
    } else {
      setError('No active booking found matching those details.');
      setBooking(null);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-lg px-sm py-xl">
      <div className="text-center space-y-sm">
        <h1 className="text-3xl font-black text-white tracking-tight">Manage My Booking</h1>
        <p className="text-vantage-muted">
          View your itinerary, select seats, or modify your premium travel arrangements.
        </p>
      </div>

      {!booking ? (
        <form
          onSubmit={handleSearch}
          className="max-w-md mx-auto space-y-md premium-glass p-lg rounded-3xl border border-white/10"
        >
          <div>
            <label className="block text-xs uppercase tracking-wider text-vantage-muted font-bold mb-2xs">
              Booking Reference (PNR)
            </label>
            <input
              type="text"
              value={pnr}
              onChange={(e) => {
                setPnr(e.target.value.toUpperCase());
              }}
              placeholder="e.g., A8F9B2"
              className="w-full bg-vantage-dark/50 border border-white/10 rounded-xl px-sm py-sm text-white focus:outline-none focus:border-vantage-accent transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-vantage-muted font-bold mb-2xs">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              placeholder="e.g., Smith"
              className="w-full bg-vantage-dark/50 border border-white/10 rounded-xl px-sm py-sm text-white focus:outline-none focus:border-vantage-accent transition-colors"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-vantage-accent text-vantage-dark font-bold py-sm rounded-xl hover:bg-vantage-accent/80 transition-colors"
          >
            <Search className="w-4 h-4" /> Find Booking
          </button>
        </form>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-lg"
          >
            <div className="premium-glass rounded-3xl border border-white/10 p-lg">
              <div className="flex justify-between items-center border-b border-white/10 pb-md mb-md">
                <div>
                  <h2 className="text-2xl font-black text-white">Booking Overview</h2>
                  <p className="text-vantage-muted font-mono mt-1">Ref: {booking.pnr}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block rounded-full bg-emerald-500/20 text-emerald-400 px-sm py-2xs text-xs font-bold border border-emerald-500/20">
                    Confirmed
                  </span>
                </div>
              </div>

              <div className="space-y-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <div className="bg-vantage-dark/50 p-md rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2xs text-vantage-accent mb-sm">
                      <MapPin className="w-4 h-4" />
                      <h3 className="font-bold">Itinerary</h3>
                    </div>
                    {booking.outbound && (
                      <div className="flex justify-between items-center mb-xs">
                        <span className="text-vantage-muted">Outbound:</span>
                        <span className="font-bold text-white">
                          {booking.outbound.departure.iata} → {booking.outbound.arrival.iata}
                        </span>
                      </div>
                    )}
                    {booking.returnFlight && (
                      <div className="flex justify-between items-center">
                        <span className="text-vantage-muted">Return:</span>
                        <span className="font-bold text-white">
                          {booking.returnFlight.departure.iata} →{' '}
                          {booking.returnFlight.arrival.iata}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="bg-vantage-dark/50 p-md rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2xs text-vantage-accent mb-sm">
                      <Users className="w-4 h-4" />
                      <h3 className="font-bold">Passengers</h3>
                    </div>
                    {booking.passengers.map((p, i) => (
                      <div key={i} className="flex justify-between items-center mb-2xs">
                        <span className="text-vantage-muted">Traveler {i + 1}:</span>
                        <span className="font-bold text-white">
                          {p.firstName} {p.lastName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-vantage-dark/50 p-md rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2xs text-vantage-accent mb-sm">
                    <Briefcase className="w-4 h-4" />
                    <h3 className="font-bold">Ancillary Services & Tracking</h3>
                  </div>
                  <div className="flex flex-wrap gap-sm">
                    <button
                      onClick={() =>
                        navigate('/tracker', {
                          state: { flightNumber: booking.outbound?.id.split('-')[3] || 'EK201' },
                        })
                      }
                      className="px-md py-sm bg-vantage-accent/10 border border-vantage-accent/20 text-vantage-accent rounded-xl hover:bg-vantage-accent hover:text-vantage-dark transition-colors font-medium"
                    >
                      Track Flight
                    </button>
                    <button className="px-md py-sm bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors font-medium">
                      Select Meals
                    </button>
                    <button className="px-md py-sm bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors font-medium">
                      Upgrade Seat
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setBooking(null);
                }}
                className="text-sm text-vantage-muted hover:text-white transition-colors underline"
              >
                Search another booking
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ManageBookingPage;
