import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import { useState } from 'react';

export default function SeatSelectionPage() {
  const navigate = useNavigate();
  const { setSelectedSeats } = useBookingStore();
  const [selectedSeat, setSelectedSeat] = useState(null);

  const seats = ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C'];
  const unavailable = ['1B', '2C'];

  const handleContinue = () => {
    if (selectedSeat) {
      setSelectedSeats('outbound', [selectedSeat]);
      navigate('/payment');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 text-center">
      <h2 className="text-2xl font-bold mb-6 text-brand-light">Select your seat</h2>
      
      <div className="bg-white/10 p-8 rounded-2xl border border-white/20 inline-block">
        <div className="grid grid-cols-3 gap-4">
          {seats.map(seat => (
            <button
              key={seat}
              disabled={unavailable.includes(seat)}
              onClick={() => setSelectedSeat(seat)}
              className={`w-16 h-16 rounded-xl font-bold flex items-center justify-center transition-all ${
                unavailable.includes(seat) ? 'bg-brand-rose/20 text-brand-rose cursor-not-allowed' :
                selectedSeat === seat ? 'bg-brand-emerald text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]' :
                'bg-white/5 border border-white/10 hover:border-brand-emerald'
              }`}
            >
              {seat}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button 
          onClick={handleContinue}
          disabled={!selectedSeat}
          className="bg-brand-accent hover:bg-brand-accent/80 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-lg"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}
