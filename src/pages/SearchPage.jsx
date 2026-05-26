import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';

export default function SearchPage() {
  const navigate = useNavigate();
  const { searchParams, setSearchParams, searchFlights, isSearching } = useBookingStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    await searchFlights();
    navigate('/results');
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-brand-light">Where are you flying?</h2>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-brand-light mb-1">From</label>
              <input 
                type="text" 
                required
                className="w-full bg-brand-dark/50 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                placeholder="e.g. SFO"
                value={searchParams.from}
                onChange={e => setSearchParams({ from: e.target.value.toUpperCase() })}
              />
            </div>
            <div>
              <label className="block text-sm text-brand-light mb-1">To</label>
              <input 
                type="text" 
                required
                className="w-full bg-brand-dark/50 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                placeholder="e.g. JFK"
                value={searchParams.to}
                onChange={e => setSearchParams({ to: e.target.value.toUpperCase() })}
              />
            </div>
            <div>
              <label className="block text-sm text-brand-light mb-1">Depart</label>
              <input 
                type="date" 
                required
                className="w-full bg-brand-dark/50 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                value={searchParams.departDate}
                onChange={e => setSearchParams({ departDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm text-brand-light mb-1">Return</label>
              <input 
                type="date" 
                className="w-full bg-brand-dark/50 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                value={searchParams.returnDate}
                onChange={e => setSearchParams({ returnDate: e.target.value })}
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={isSearching}
            className="w-full mt-6 bg-brand-accent hover:bg-brand-accent/80 text-white font-bold py-4 rounded-lg transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isSearching ? 'Searching...' : 'Search Flights'}
          </button>
        </form>
      </div>
    </div>
  );
}
