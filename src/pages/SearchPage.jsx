import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import pilotOfficer from '../assets/pilot-officer.jpg';
import planeIcon from '../assets/plane-icon.svg';

export default function SearchPage() {
  const navigate = useNavigate();
  const { searchParams, setSearchParams, searchFlights, isSearching } = useBookingStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    await searchFlights();
    navigate('/results');
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] shadow-2xl">
        <img
          src={pilotOfficer}
          alt="Pilot officer"
          className="h-72 w-full object-cover sm:h-[420px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
          <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-brand-light shadow-lg shadow-black/10">
            <img src={planeIcon} alt="Plane icon" className="h-10 w-10" />
            <span className="text-sm uppercase tracking-[0.3em] text-brand-accent">
              Fly smarter
            </span>
          </div>
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
            Find your next flight in seconds
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
            Compare routes, fares, and seats across top airlines with instant search results.
          </p>
        </div>
      </section>

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
                onChange={(e) => setSearchParams({ from: e.target.value.toUpperCase() })}
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
                onChange={(e) => setSearchParams({ to: e.target.value.toUpperCase() })}
              />
            </div>
            <div>
              <label className="block text-sm text-brand-light mb-1">Depart</label>
              <input
                type="date"
                required
                className="w-full bg-brand-dark/50 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                value={searchParams.departDate}
                onChange={(e) => setSearchParams({ departDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm text-brand-light mb-1">Return</label>
              <input
                type="date"
                className="w-full bg-brand-dark/50 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                value={searchParams.returnDate}
                onChange={(e) => setSearchParams({ returnDate: e.target.value })}
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
