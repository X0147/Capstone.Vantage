import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBookingStore } from '../store/useBookingStore';
import { telemetry } from '../utils/telemetryLogger';

/**
 * SeatMapMatrix – renders a compact aircraft cabin seat map (rows 10‑20, seats A‑F).
 * Seats can be in three visual states:
 *   • Available – selectable.
 *   • Occupied  – disabled (dark pattern).
 *   • Selected  – glowing indigo frame with emerald accent.
 *
 * Row 12 (seat 12A) is pre‑selected for the passenger "Jennifer Natalie Newton".
 * Clicking an available seat updates the global Zustand store via `completeCheckIn`
 * (seatId, baggageCount). For demo purposes, baggageCount is fixed to 0.
 */
const SeatMapMatrix: React.FC = () => {
  const rows = Array.from({ length: 11 }, (_, i) => 10 + i); // 10‑20 inclusive
  const cols = ['A', 'B', 'C', 'D', 'E', 'F'];

  const bookingDetails = useBookingStore(s => s.bookingDetails);
  const completeCheckIn = useBookingStore(s => s.completeCheckIn);

  // Determine initially selected seat – default to 12A if passenger matches.
  const defaultSeat = bookingDetails?.passengerName === 'Jennifer Natalie Newton' ? '12A' : null;
  const [selectedSeat, setSelectedSeat] = useState<string | null>(defaultSeat);

  // For demo, we'll assume some occupied seats (hard‑coded). In real app, this would
  // come from backend data.
  const occupiedSeats = new Set<string>(['10C', '13D', '15F', '18B']);

  // Update store when selection changes.
  useEffect(() => {
    if (selectedSeat) {
      telemetry.info('SeatMapMatrix: seat selected', { seatId: selectedSeat });
      // Baggage count is set to 0 for now; can be extended later.
      completeCheckIn(selectedSeat, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSeat]);

  const handleSelect = (seatId: string) => {
    if (occupiedSeats.has(seatId)) return; // guard against clicks on occupied seats
    setSelectedSeat(seatId);
  };

  return (
    <div className="mt-6">
      <h2 className="text-sm font-medium text-slate-300 mb-2">Select Your Seat</h2>
      <div className="grid grid-cols-6 gap-2">
        {rows.map(row =>
          cols.map(col => {
            const seatId = `${row}${col}`;
            const isOccupied = occupiedSeats.has(seatId);
            const isSelected = seatId === selectedSeat;

            const baseClasses =
              'w-10 h-10 flex items-center justify-center text-xs rounded border transition-all duration-200';
            const stateClasses = isOccupied
              ? 'bg-slate-900/70 border-slate-700 text-slate-600 cursor-not-allowed opacity-60'
              : isSelected
              ? 'bg-indigo-600/80 border-indigo-500 text-white ring-2 ring-emerald-400'
              : 'bg-slate-800/40 border-slate-400 text-slate-200 hover:bg-slate-700/60 cursor-pointer';

            return (
              <motion.div
                key={seatId}
                layout
                whileHover={!isOccupied ? { scale: 1.05 } : {}}
                whileTap={!isOccupied ? { scale: 0.95 } : {}}
                className={`${baseClasses} ${stateClasses}`}
                style={isOccupied ? { backgroundImage: "repeating-linear-gradient(45deg, #2d2d2d, #2d2d2d 2px, transparent 2px, transparent 4px)" } : undefined}
                onClick={() => handleSelect(seatId)}
              >
                {seatId}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SeatMapMatrix;
