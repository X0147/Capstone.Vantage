import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';

export default function ResultsPage() {
  const navigate = useNavigate();
  const { flightsOutbound, selectedOutbound, selectOutbound, searchParams } = useBookingStore();

  const handleContinue = () => {
    if (selectedOutbound) {
      navigate('/passenger-info');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-6 text-brand-light">
        Select your flight: {searchParams.from} → {searchParams.to}
      </h2>

      <div className="space-y-4">
        {flightsOutbound.map(flight => (
          <div 
            key={flight.id} 
            onClick={() => selectOutbound(flight)}
            className={`cursor-pointer bg-white/5 backdrop-blur-sm border p-6 rounded-xl transition-all ${
              selectedOutbound?.id === flight.id 
                ? 'border-brand-emerald bg-brand-emerald/10' 
                : 'border-white/10 hover:border-brand-accent hover:bg-white/10'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img src={flight.airline.logo} alt={flight.airline.name} className="w-12 h-12 object-contain bg-white rounded p-1" />
                <div>
                  <div className="font-bold text-lg">{flight.departure.time.split('T')[1].substring(0,5)} - {flight.arrival.time.split('T')[1].substring(0,5)}</div>
                  <div className="text-brand-light text-sm">{flight.airline.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-2xl text-brand-emerald">${flight.price}</div>
                <div className="text-sm text-brand-light">{flight.duration} ({flight.stops === 0 ? 'Direct' : `${flight.stops} Stop`})</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button 
          onClick={handleContinue}
          disabled={!selectedOutbound}
          className="bg-brand-accent hover:bg-brand-accent/80 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-lg transition-all"
        >
          Continue to Passengers
        </button>
      </div>
    </div>
  );
}
