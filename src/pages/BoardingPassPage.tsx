
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { mockJourney } from '../data/flightMocks';
import { useBookingStore } from '../store/useBookingStore';

/**
 * Premium boarding pass page – displays the full multi‑leg itinerary, PNR, tracking code,
 * a scannable QR/barcode, and a reschedule action.
 */
export default function BoardingPassPage() {
  const journey = mockJourney;
  const bookingDetails = useBookingStore(state => state.bookingDetails);

  // Simple timeline component rendering each leg
  const LegItem = ({ leg, isLast }: { leg: typeof journey.legs[0]; isLast: boolean }) => (
    <div className="flex items-center mb-4">
      <div className="flex flex-col items-center w-16">
        <div className="bg-vantage-gold/20 text-vantage-gold rounded-full w-10 h-10 flex items-center justify-center font-medium">
          {leg.departure.iata}
        </div>
        <span className="text-xs text-vantage-muted mt-1">
          {new Date(leg.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <div className="flex-1 h-px bg-vantage-muted mx-2 relative">
        {!isLast && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-4 h-4 text-vantage-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2v20M5 12h14" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center w-16">
        <div className="bg-vantage-gold/20 text-vantage-gold rounded-full w-10 h-10 flex items-center justify-center font-medium">
          {leg.arrival.iata}
        </div>
        <span className="text-xs text-vantage-muted mt-1">
          {new Date(leg.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );

  return (
    <motion.main
      className="max-w-4xl mx-auto p-6 bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl mt-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display text-white">Boarding Pass – {journey.passengerName}</h1>
        <button
          className="px-4 py-2 bg-vantage-gold text-black rounded-md hover:bg-vantage-gold/80 transition"
          onClick={() => alert('Reschedule request sent – we will email you shortly.')}
        >
          Reschedule
        </button>
      </header>

      {/* Main Card */}
      <section className="grid md:grid-cols-2 gap-6 bg-[#0a0e14]/60 p-6 rounded-lg border border-white/5">
        {/* Left – Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-vantage-muted">PNR:</span>
            <code className="text-lg font-mono text-white">{journey.pnr}</code>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-vantage-muted">Tracking:</span>
            <code className="text-lg font-mono text-white">{journey.trackingCode}</code>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-vantage-muted">Email:</span>
            <a href={`mailto:${journey.contactEmail}`} className="text-vantage-gold hover:underline">
              {journey.contactEmail}
            </a>
          </div>

          {/* Timeline */}
          <h2 className="mt-6 text-sm font-medium text-vantage-muted">Itinerary</h2>
          <div className="mt-2">
            {journey.legs.map((leg, idx) => (
              <LegItem key={leg.flightNumber} leg={leg} isLast={idx === journey.legs.length - 1} />
            ))}
          </div>

          {/* Visa / layover warning */}
          {journey.legs.some(l => l.stopover?.visaRequired) && (
            <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-500 text-yellow-200 rounded-md text-sm">
              <strong>Notice:</strong> One of your connections requires a transit visa. Please ensure you have the proper documentation.
            </div>
          )}
        </div>

        {/* Right – Visual stub & QR */}
        <div className="flex flex-col items-center justify-between bg-[#0a0e14]/60 p-4 rounded-lg border border-white/5">
          {/* Mock airline logo – replace with real SVG */}
          <svg className="w-24 h-24 text-vantage-gold" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="4" />
            <text x="50" y="58" textAnchor="middle" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" fontSize="36" fill="currentColor">
              V
            </text>
          </svg>
          <p className="mt-2 text-sm text-vantage-muted">
            {journey.legs?.[0]?.departure?.iata ?? ''} → {journey.legs?.at(-1)?.arrival?.iata ?? ''}
          </p>
          <div className="my-4">
            <QRCodeSVG
              value={`PNR:${journey.pnr}|TRACK:${journey.trackingCode}`}
              size={120}
              bgColor="#0a0e14"
              fgColor="#38bdf8"
              level="M"
            />
          </div>
          <p className="text-xs text-vantage-muted text-center">
            Show this QR code at any Vantage check‑in kiosk. Physical tickets can be printed on‑site.
          </p>
          {/* Payment Receipt Trace */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-emerald-500/10 border-emerald-500/20 text-emerald-400 rounded-[24px] p-4 md:p-6 mt-4 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              <span className="font-mono font-bold">PAYMENT METHOD:</span>
              <span>{bookingDetails?.paymentMethod}</span>
              <span className="font-mono font-bold">RECEIPT:</span>
              <span>{bookingDetails?.currencyReceipt}</span>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
