import React, { useState } from 'react';
import { Armchair } from 'lucide-react';
import useBookingStore from '../../store/useBookingStore';

interface Seat {
  id: string;
  row: number;
  letter: string;
  class: 'first' | 'premium' | 'economy';
  status: 'available' | 'occupied' | 'selected';
  priceModifier: number;
}

interface SeatSelectorProps {
  onSelectionComplete: (selectedSeats: Seat[]) => void;
  baseFare: number;
}

// Simulated premium cabin layout layout configuration
const GENERATED_SEATS: Seat[] = Array.from({ length: 12 }, (_, rowIndex) => {
  const row = rowIndex + 1;
  const cabinClass = row <= 3 ? 'first' : row <= 6 ? 'premium' : 'economy';
  const letters = cabinClass === 'first' ? ['A', 'C', 'D', 'F'] : ['A', 'B', 'C', 'D', 'E', 'F'];

  return letters.map((letter) => ({
    id: `${row}${letter}`,
    row,
    letter,
    class: cabinClass,
    status: Math.random() < 0.25 ? 'occupied' : 'available',
    priceModifier: cabinClass === 'first' ? 250 : cabinClass === 'premium' ? 75 : 0,
  }));
}).flat();

export const SeatSelector: React.FC<SeatSelectorProps> = ({ onSelectionComplete, baseFare }) => {
  const [seats, setSeats] = useState<Seat[]>(GENERATED_SEATS);

  const selectedSeats = seats.filter((s) => s.status === 'selected');
  const additivePrice = selectedSeats.reduce((acc, s) => acc + s.priceModifier, 0);
  const totalPrice = baseFare + additivePrice;

  const handleSeatClick = (seatId: string) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) => {
        if (seat.id !== seatId || seat.status === 'occupied') return seat;
        return {
          ...seat,
          status: seat.status === 'selected' ? 'available' : 'selected',
        };
      })
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent, seatId: string) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleSeatClick(seatId);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-md items-start p-sm">
      {/* Fuselage Map */}
      <div className="lg:col-span-2 premium-glass rounded-2xl p-md border border-white/5 relative overflow-hidden">
        {/* Cockpit Indicator Visual */}
        <div className="w-24 h-8 bg-gradient-to-b from-vantage-accent/20 to-transparent border-t border-x border-vantage-accent/30 rounded-t-full mx-auto mb-xl flex items-center justify-center text-[9px] tracking-widest text-vantage-accent font-semibold uppercase">
          Cockpit
        </div>

        {/* Seat Map Layout Grid */}
        <div className="space-y-sm max-h-[500px] overflow-y-auto pr-2xs custom-scrollbar">
          {Array.from({ length: 12 }).map((_, rIdx) => {
            const rowNum = rIdx + 1;
            const rowSeats = seats.filter((s) => s.row === rowNum);
            const isFirstClass = rowNum <= 3;

            return (
              <div key={rowNum} className="flex items-center justify-center gap-2xs">
                {/* Left Side Group */}
                <div className="flex gap-2xs">
                  {rowSeats.slice(0, isFirstClass ? 2 : 3).map((seat) => (
                    <button
                      key={seat.id}
                      disabled={seat.status === 'occupied'}
                      onClick={() => {
                        handleSeatClick(seat.id);
                      }}
                      onKeyDown={(e) => {
                        handleKeyDown(e, seat.id);
                      }}
                      role="checkbox"
                      aria-checked={seat.status === 'selected'}
                      aria-label={`Seat ${seat.id}, ${seat.class} class, ${seat.status}, price option plus ${seat.priceModifier} dollars`}
                      className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-200 ${
                        seat.status === 'occupied'
                          ? 'bg-white/5 border-white/5 text-white/10 cursor-not-allowed'
                          : seat.status === 'selected'
                            ? 'bg-vantage-accent border-vantage-accent text-vantage-dark font-bold scale-95 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                            : seat.class === 'first'
                              ? 'border-amber-500/40 hover:border-amber-400 bg-amber-500/5 text-amber-400'
                              : seat.class === 'premium'
                                ? 'border-vantage-accent/40 hover:border-vantage-accent bg-vantage-accent/5 text-vantage-accent'
                                : 'border-white/10 hover:border-white/30 bg-white/5 text-vantage-muted'
                      }`}
                    >
                      <Armchair className="w-4 h-4" />
                    </button>
                  ))}
                </div>

                {/* Center Aisle Indicator */}
                <div className="w-8 text-center text-xs font-mono font-bold text-white/20 select-none">
                  {rowNum}
                </div>

                {/* Right Side Group */}
                <div className="flex gap-2xs">
                  {rowSeats.slice(isFirstClass ? 2 : 3).map((seat) => (
                    <button
                      key={seat.id}
                      disabled={seat.status === 'occupied'}
                      onClick={() => {
                        handleSeatClick(seat.id);
                      }}
                      onKeyDown={(e) => {
                        handleKeyDown(e, seat.id);
                      }}
                      role="checkbox"
                      aria-checked={seat.status === 'selected'}
                      aria-label={`Seat ${seat.id}, ${seat.class} class, ${seat.status}`}
                      className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-200 ${
                        seat.status === 'occupied'
                          ? 'bg-white/5 border-white/5 text-white/10 cursor-not-allowed'
                          : seat.status === 'selected'
                            ? 'bg-vantage-accent border-vantage-accent text-vantage-dark font-bold scale-95 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                            : seat.class === 'first'
                              ? 'border-amber-500/40 hover:border-amber-400 bg-amber-500/5 text-amber-400'
                              : seat.class === 'premium'
                                ? 'border-vantage-accent/40 hover:border-vantage-accent bg-vantage-accent/5 text-vantage-accent'
                                : 'border-white/10 hover:border-white/30 bg-white/5 text-vantage-muted'
                      }`}
                    >
                      <Armchair className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Floating Panel Summary */}
      <div className="premium-glass rounded-2xl p-sm border border-white/5 space-y-sm sticky top-24">
        <h4 className="text-xs font-bold uppercase tracking-wider text-vantage-accent">
          Manifest Summary
        </h4>

        {selectedSeats.length === 0 ? (
          <p className="text-xs text-vantage-muted">
            Please tap or select an open cabin seat to allocate your arrangement coordinates.
          </p>
        ) : (
          <div className="space-y-xs">
            <div className="flex flex-wrap gap-2xs">
              {selectedSeats.map((s) => (
                <span
                  key={s.id}
                  className="px-xs py-2xs rounded bg-white/5 text-xs text-white border border-white/10 font-mono"
                >
                  {s.id} ({s.class[0].toUpperCase()})
                </span>
              ))}
            </div>
            <div className="border-t border-white/5 pt-xs space-y-2xs text-xs">
              <div className="flex justify-between text-vantage-muted">
                <span>Base Airfare</span>
                <span>${baseFare}</span>
              </div>
              <div className="flex justify-between text-vantage-muted">
                <span>Cabin Upgrades</span>
                <span className="text-vantage-accent">+${additivePrice}</span>
              </div>
              <div className="flex justify-between font-bold text-white text-sm border-t border-white/5 pt-2xs">
                <span>Total Due</span>
                <span>${totalPrice}</span>
              </div>
            </div>
          </div>
        )}

        <button
          disabled={selectedSeats.length === 0}
          onClick={() => {
            const setSeats = useBookingStore.getState().setSeats;
            // persist seat ids and price to the booking store
            setSeats(
              selectedSeats.map((s) => s.id),
              additivePrice
            );
            // advance to payment step
            useBookingStore.getState().setStep(3);
            onSelectionComplete(selectedSeats);
          }}
          className="w-full py-xs rounded-xl bg-vantage-accent text-vantage-dark font-bold text-xs tracking-wide uppercase shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-colors duration-300"
        >
          Confirm Cabin Manifest
        </button>
      </div>
    </div>
  );
};

export default SeatSelector;
