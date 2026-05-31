import { Plane } from 'lucide-react';

interface ItineraryTrackerCardProps {
  booking?: {
    bookingReference?: string;
    route?: {
      origin?: string;
      destination?: string;
      flightNumber?: string;
    };
  };
}

export default function ItineraryTrackerCard({ booking }: ItineraryTrackerCardProps) {
  if (!booking) return null;

  return (
    <div className="p-5 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl flex items-center justify-between transition-all hover:border-white/10">
      <div className="space-y-1">
        <span className="text-[10px] font-mono tracking-wider text-indigo-400 uppercase font-bold">Active Sector Track</span>
        <h4 className="text-sm font-bold text-white font-mono">{booking.bookingReference ?? 'UNMAPPED'}</h4>
        <p className="text-xs text-slate-400">
          {booking.route?.origin ?? 'JIB'} &rarr; {booking.route?.destination ?? 'ORD'}
        </p>
      </div>
      <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
        <Plane className="w-4 h-4 rotate-90" />
      </div>
    </div>
  );
}
