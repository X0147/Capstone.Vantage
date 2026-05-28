import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Search, Navigation } from 'lucide-react';

export const QuickFlightTracker: React.FC = () => {
  const [flightNo, setFlightNo] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (flightNo.trim()) {
      navigate('/tracker', { state: { flightNumber: flightNo.trim().toUpperCase() } });
    }
  };

  return (
    <div className="relative w-full rounded-4xl border border-vantage-accent/20 bg-gradient-to-r from-vantage-midnight via-[#0a1120] to-vantage-midnight p-lg overflow-hidden premium-glass-strong shadow-glow-accent group transition-all hover:border-vantage-accent/40">
      {/* Background elements */}
      <div className="absolute inset-0 bg-hero-gradient opacity-50 pointer-events-none" />
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-vantage-accent/10 rounded-full blur-[100px] pointer-events-none -mr-32 -mt-32" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-xl">
        <div className="space-y-sm max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2xs rounded-full border border-vantage-accent/30 bg-vantage-accent/10 px-xs py-3xs text-[10px] font-bold uppercase tracking-widest text-vantage-accent">
            <Navigation className="h-3 w-3 animate-pulse" /> Live Telemetry Matrix
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white italic">
            Track Elite Flights Instantly
          </h2>
          <p className="text-sm text-vantage-muted">
            Access our real-time global airspace radar. Enter any commercial or private charter designation to lock onto its active transponder path.
          </p>
        </div>

        <div className="w-full md:w-auto shrink-0 flex-1 max-w-md">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="e.g. EK201, AA100"
              value={flightNo}
              onChange={(e) => setFlightNo(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-3xl pl-lg pr-2xl py-md text-base font-mono text-white placeholder:text-white/30 focus:outline-none focus:border-vantage-accent focus:ring-2 focus:ring-vantage-accent/20 transition-all uppercase tracking-wider shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-xs top-1/2 -translate-y-1/2 p-sm bg-gradient-to-r from-sky-400 to-blue-600 text-vantage-midnight rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-glow-sm"
              aria-label="Track Flight"
            >
              <Compass className="w-5 h-5 animate-spin-slow" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuickFlightTracker;
