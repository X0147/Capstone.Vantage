import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import { telemetry } from '../utils/telemetryLogger';
import { Plane, ArrowRight, ShieldAlert, Radio } from 'lucide-react';

export function ItineraryTrackerCard() {
  const navigate = useNavigate();
  const bookingDetails = useBookingStore((state: any) => state.bookingDetails);
  const executeAutoLogin = useBookingStore((state: any) => state.executeAutoLogin);

  const activeRecord = bookingDetails || {
    passengerName: "Jennifer Natalie Newton",
    bookingReference: "OFDTIF69RBJJZIJ1OSMR",
    trackingCode: "AX7890zklmnpqrt",
    status: "CHECKED IN",
    route: {
      origin: "JIB",
      destination: "ORD",
      departureDate: "01-06-26",
      carrier: "Turkish Airlines",
      flightNumber: "TK660 / TK185",
      layover: "Istanbul (IST) – 1h 20m"
    }
  };

  const handleSmartNavigation = () => {
    // ⚡ Deep Enhancement: Auto-login validation run
    telemetry.info('Smart navigation intercept: executing auto-login allocation.', {
      pnr: activeRecord.bookingReference,
      targetRoute: '/boarding-pass'
    });
    
    executeAutoLogin(); // Enforces type-safe global session state authentication
    navigate('/boarding-pass');
  };

  const triggerAnomalyReport = () => {
    telemetry.warn('User manual anomaly notification event initiated.');
    const systemLogs = telemetry.getLogs().slice(0, 5);
    const repositoryUrl = "https://github.com/X0147/Capstone.Vantage/issues/new";
    const issueTitle = encodeURIComponent(`[System Anomaly]: Tracking Core Failure - ${activeRecord.bookingReference}`);
    const issueBody = encodeURIComponent([
      `### 📝 System Anomaly Telemetry Report`,
      `**Passenger Profile:** ${activeRecord.passengerName}`,
      `**Active Contract PNR:** \`${activeRecord.bookingReference}\``,
      `**Security Status Field:** ${activeRecord.status}`,
      `\n### ⚡ Runtime Telemetry Trace Matrix (Latest Logs)`,
      `\`\`\`json\n${JSON.stringify(systemLogs, null, 2)}\n\`\`\``,
      `\n*Reported automatically via client-side Telemetry Portal.*`
    ].join('\n'));

    window.open(`${repositoryUrl}?title=${issueTitle}&body=${issueBody}`, '_blank');
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-900/60 to-slate-950/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 relative overflow-hidden text-white shadow-2xl">
      <div className="absolute -right-16 -top-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">Active Radar Feed</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={triggerAnomalyReport}
            className="flex items-center gap-1 text-[10px] font-mono border border-red-500/30 bg-red-950/30 text-red-400 hover:bg-red-950/60 transition-all px-2.5 py-1 rounded-xl"
            title="Export State and Log System Anomaly to GitHub Issues"
          >
            <ShieldAlert className="w-3 h-3" />
            <span>Report Anomaly</span>
          </button>
          <span className="text-xs font-mono font-black text-indigo-400 bg-indigo-950/50 border border-indigo-900/40 px-3 py-1 rounded-xl">
            {activeRecord.bookingReference}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-6">
        <div className="md:col-span-3 text-center md:text-left">
          <h4 className="text-2xl font-black tracking-tight text-white">{activeRecord.route.origin}</h4>
          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Djibouti City</p>
        </div>

        <div className="md:col-span-6 flex flex-col items-center justify-center px-2">
          <span className="text-[9px] font-mono text-slate-400 bg-slate-900/80 border border-white/5 px-2 py-0.5 rounded-md mb-1.5 text-center">
            {activeRecord.route.carrier} • {activeRecord.route.layover}
          </span>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent relative">
            <Plane className="w-3.5 h-3.5 text-indigo-400 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rotate-90" />
          </div>
        </div>

        <div className="md:col-span-3 text-center md:text-right">
          <h4 className="text-2xl font-black tracking-tight text-white">{activeRecord.route.destination}</h4>
          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Chicago O'Hare</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-white/5 bg-slate-950/20 -mx-6 -mb-6 p-6">
        <div className="flex items-center gap-4 text-xs">
          <div>
            <span className="text-[9px] font-mono text-slate-500 block uppercase">Passenger Record</span>
            <span className="font-bold text-slate-200">{activeRecord.passengerName}</span>
          </div>
          <div className="h-6 w-px bg-white/5" />
          <div>
            <span className="text-[9px] font-mono text-slate-500 block uppercase">Clearance Security Code</span>
            <span className="font-mono text-slate-400 font-medium">{activeRecord.trackingCode}</span>
          </div>
        </div>

        {/* Enhanced Auto-Authenticating Action Button */}
        <button
          onClick={handleSmartNavigation}
          className="bg-indigo-500 text-white hover:bg-indigo-600 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-indigo-500/10"
        >
          <Radio className="w-3.5 h-3.5 text-indigo-200 animate-pulse" />
          <span>Launch Dashboard & Auto-Login →</span>
        </button>
      </div>
    </div>
  );
}
