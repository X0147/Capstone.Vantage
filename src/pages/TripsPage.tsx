import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import { telemetry } from '../utils/telemetryLogger';
import { motion } from 'framer-motion';
import {
  Plane, Calendar, ShieldCheck, ArrowRight,
  Tag, Briefcase, Users, LayoutDashboard,
  Mail
} from 'lucide-react';

export default function TripsPage() {
  const navigate = useNavigate();
  const bookingDetails = useBookingStore(state => state.bookingDetails);
  const executeAutoLogin = useBookingStore(state => state.executeAutoLogin);

  // Fallback to pre-hydrated Jennifer Natalie Newton dataset if store is somehow cleared
  const activeRecord = bookingDetails || {
    passengerName: "Jennifer Natalie Newton",
    email: "jennifer.nathaniel@example.com",
    bookingReference: "OFDTIS69RBOJJZIJ1OSMR",
    trackingCode: "AX7890zklmnpqt",
    status: "CHECKED IN",
    paymentMethod: "CASH_AT_COUNTER",
    paymentStatus: "SETTLED",
    currencyReceipt: "USD 4,250.00",
    route: {
      origin: "JIB",
      destination: "ORD",
      departureDate: "Jan 06, 26",
      carrier: "Turkish Airlines",
      flightNumber: "TK 1972 / 1998"
    }
  };

  const handlePassAccess = () => {
    telemetry.info('TripsPage: Accessing digital boarding pass gateway.', {
      pnr: activeRecord.bookingReference
    });
    // Ensure state machine is authenticated before pushing view
    executeAutoLogin();
    navigate('/boarding-pass');
  };

  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
React.useEffect(() => {
  const handleOnline = () => setIsOnline(true);
  const handleOffline = () => setIsOnline(false);
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}, []);

// Offline banner
const offlineBanner = !isOnline ? (
  <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-1 z-50">
    Offline Mode Enabled
  </div>
) : null;

return (
  <>
    {offlineBanner}
    <div className="min-h-screen bg-slate-950/40 backdrop-blur-2xl border-white/5 text-white relative overflow-hidden font-sans flex flex-col justify-start pt-24 px-4 md:px-8">

    <div className="min-h-screen bg-slate-950/40 backdrop-blur-2xl border-white/5 text-white relative overflow-hidden font-sans flex flex-col justify-start pt-24 px-4 md:px-8">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-indigo-500/20 text-indigo-300 px-3 py-1 text-sm font-medium">
              ANTI GRAVITY CODER // AUTHORIZED OPERATOR
            </span>
          </div>
          <div className="w-full max-w-4xl mx-auto mb-6 flex items-center justify-between text-xs text-slate-500 font-mono">
            <div className="flex items-center gap-2">
              <span className="hover:text-slate-300 cursor-pointer" onClick={() => navigate('/')}>Hub</span>
              <span>/</span>
              <span className="text-indigo-400">Trips</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-slate-600">Secure Network Node</span>
          </div>
        </div>

      <div className="w-full max-w-4xl mx-auto space-y-6 z-10">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent flex items-center gap-3">
            <LayoutDashboard className="w-7 h-7 text-indigo-400" />
            <span>Your Trips</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Monitor upcoming flight itineraries, priority clearances, and security manifests.
          </p>
        </div>

        {/* Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-gradient-to-br from-slate-900/40 via-slate-900/70 to-slate-950/90 backdrop-blur-2xl border border-white/5 rounded-[24px] p-6 md:p-8 shadow-2xl relative group hover:border-white/10 transition-all duration-300"
        >
          <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-slate-700 tracking-widest select-none pointer-events-none">
            SYS_REF_0147
          </div>

          {/* Upper row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Plane className="w-6 h-6 transform rotate-45" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-black tracking-tight text-white">
                    {activeRecord.route.origin} ➔ {activeRecord.route.destination}
                  </h3>
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border ${
                    activeRecord.status === "BOARDING PASS ISSUED" 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                  }`}> {activeRecord.status} </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{activeRecord.route.carrier} • {activeRecord.route.flightNumber}</p>
              </div>
            </div>

            <button
              onClick={handlePassAccess}
              className="w-full sm:w-auto bg-white/5 hover:bg-white text-white hover:text-slate-950 border border-white/10 text-xs font-bold px-5 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group shadow-xl shadow-black/40"
            >
              <span>View Digital Boarding Pass</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div className="bg-slate-950/40 p-3 rounded-xl border border-white/5">
              <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center gap-1.5 mb-1">
                <Calendar className="w-3 h-3" /> Departure Frame
              </span>
              <span className="text-xs font-bold text-slate-200">{activeRecord.route.departureDate}</span>
            </div>
            <div className="bg-slate-950/40 p-3 rounded-xl border border-white/5">
              <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center gap-1.5 mb-1">
                <Tag className="w-3 h-3" /> Tracking Code
              </span>
              <span className="text-xs font-mono text-slate-300 font-medium">{activeRecord.trackingCode}</span>
            </div>
            <div className="bg-slate-950/40 p-3 rounded-xl border border-white/5">
              <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-3 h-3" /> Booking PNR
              </span>
              <span className="text-xs font-mono font-bold text-indigo-400">{activeRecord.bookingReference}</span>
            </div>
            <div className="bg-slate-950/40 p-3 rounded-xl border border-white/5">
              <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center gap-1.5 mb-1">
                <Users className="w-3 h-3" /> Passenger Index
              </span>
              <span className="text-xs font-sans font-bold text-slate-200 truncate block" title={activeRecord.passengerName}>
                {activeRecord.passengerName.split(' ')[0]} {activeRecord.passengerName.split(' ').slice(-1)}
              </span>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-emerald-500/10 border-emerald-500/20 text-emerald-400 rounded-[24px] p-6 md:p-8 shadow-2xl mt-6"
        >
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold">PAYMENT METHOD:</span>
            <span>{activeRecord.paymentMethod === 'CASH_AT_COUNTER' ? 'CASH (STATION HUB BALANCES RECONCILED)' : activeRecord.paymentMethod}</span>
          </div>
          {/* Contact button for payment info */}
          <div className="mt-4 flex justify-center">
            <a
              href={`mailto:${activeRecord.email}`}
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white text-white hover:text-slate-950 border border-white/10 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
              Get Payment Info
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
