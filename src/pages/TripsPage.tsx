// React import removed (unused)
import { Plane, CheckCircle, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import { mockJourney } from '../data/flightMocks';

export default function TripsPage() {
  const navigate = useNavigate();
  const { bookingDetails } = useBookingStore();

  // Prefer existing booking details from the store; fallback to mock data for demo purposes
  const activeRecord = bookingDetails &&
    (bookingDetails.bookingReference === 'OFDTIF69RBJJZIJ1OSMR' ||
      (bookingDetails.passengerName &&
        bookingDetails.passengerName.toUpperCase().includes('NEWTON')))
      ? bookingDetails
      : null;

  // Build a record shape compatible with BookingRecord when using mock data
  const record = activeRecord || (
    mockJourney && mockJourney.legs && mockJourney.legs.length > 0
      ? {
          passengerName: mockJourney.passengerName,
          email: mockJourney.contactEmail,
          trackingCode: mockJourney.trackingCode,
          bookingReference: mockJourney.pnr,
          status: mockJourney.checkInStatus,
          route: {
            origin: mockJourney.legs[0].departure?.iata ?? '',
            destination: mockJourney.legs[mockJourney.legs.length - 1].arrival?.iata ?? '',
            departureDate: mockJourney.legs[0].departureTime ?? '',
            arrivalDate: mockJourney.legs[mockJourney.legs.length - 1].arrivalTime ?? '',
            carrier: mockJourney.legs.map(l => l.carrier).join(' / '),
            flightNumber: mockJourney.legs.map(l => l.flightNumber).join(' / '),
            layover: `${mockJourney.legs[0].stopover?.minConnectionMins ?? 0}m`
          }
        }
      : null
  );

  return (
    <div className="max-w-7xl mx-auto space-y-xl px-sm py-md">
      <div className="space-y-4">
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <Plane className="h-8 w-8 text-vantage-accent" />
          Your Trips
        </h1>
        <p className="text-vantage-muted">View your upcoming and past itineraries here.</p>

        {record ? (
          <div className="premium-glass rounded-3xl border border-white/10 p-lg flex flex-col gap-4">
            {/* Route Header */}
            <div className="flex items-center justify-between">
              <div className="text-white text-xl font-semibold">
                {record.route.origin} <span className="mx-2">➔</span> {record.route.destination}
              </div>
              <button
                onClick={() => navigate('/boarding-pass')}
                className="flex items-center gap-2 text-sm font-medium text-vantage-accent bg-vantage-accent/10 rounded-md px-3 py-1 hover:bg-vantage-accent/20 transition"
              >
                View Digital Boarding Pass <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {/* Sub‑info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-vantage-muted">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-vantage-accent" />
                <span>{record.route.carrier} – {record.route.flightNumber}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-vantage-accent" />
                <span>{new Date(record.route.departureDate).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: '2-digit' })}</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>{record.status ?? 'OK / CHECKED IN B'}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-mono">Tracking: {record.trackingCode}</span>
              </div>
              {record.route.layover && (
                <div className="col-span-full text-sm text-vantage-muted">
                  Transit via Istanbul (IST) – {record.route.layover} layover
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="premium-glass rounded-3xl border border-white/5 p-md flex flex-col justify-center items-center h-64 text-center">
            <Plane className="h-12 w-12 text-vantage-muted mb-4 opacity-50" />
            <h2 className="text-xl font-bold text-white mb-2">No active trips found</h2>
            <p className="text-sm text-vantage-muted max-w-md">
              You don't have any upcoming flights in your locator ledger. Head back to the search
              matrix to book a new itinerary.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
