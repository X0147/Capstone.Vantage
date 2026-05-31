import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useBookingStore } from '../store/useBookingStore';
import { telemetry } from '../utils/telemetryLogger';
import SeatMapMatrix from '../components/SeatMapMatrix';
import { jsPDF } from 'jspdf';
import {
  ShieldCheck, AlertTriangle, Briefcase,
  CheckCircle, Plane, Clock, User, ArrowLeft, WifiOff, FileText
} from 'lucide-react';

export default function BoardingPassPage() {
  const navigate = useNavigate();
  
  // Explicitly type the store hooks to avoid implicit 'any' states
  const bookingDetails = useBookingStore((state) => state.bookingDetails);
  const completeCheckIn = useBookingStore((state) => state.completeCheckIn);
  
  const qrRef = useRef<HTMLDivElement>(null);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  const [checkInStep, setCheckInStep] = useState<number>(
    bookingDetails?.status === "BOARDING PASS ISSUED" ? 3 : 1
  );

  const [hazardAgreed, setHazardAgreed] = useState<boolean>(false);
  const [baggageCount, setBaggageCount] = useState<number>(1);
  const [selectedSeat] = useState<string>('12A'); // Removed unused setter to satisfy linter

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      telemetry.info('Network connection online.');
    };
    const handleOffline = () => {
      setIsOnline(false);
      telemetry.warn('Network connection dropped.');
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white font-sans">
        <div className="text-center space-y-4">
          <p className="text-slate-400 text-sm">No active flight manifest loaded in cache.</p>
          <button onClick={() => navigate('/') } className="text-xs text-indigo-400 hover:underline">
            ← Return to Command Base
          </button>
        </div>
      </div>
    );
  }

  const handleFinishCheckIn = (): void => {
    if (checkInStep === 1 && !hazardAgreed) return;

    if (checkInStep === 1) {
      telemetry.info('Hazard compliance step approved by passenger.');
      setCheckInStep(2);
    } else if (checkInStep === 2) {
      if (typeof completeCheckIn === 'function') {
        completeCheckIn(selectedSeat, baggageCount);
      }
      setCheckInStep(3);
    }
  };

  const exportManifest = (): void => {
    try {
      const doc = new jsPDF() as any;
      let y = 40;
      const lineHeight = 24;

      doc.setFontSize(20);
      doc.text('Capstone Vantage – Boarding Pass Manifest', 40, y);
      y += lineHeight;
      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 40, y);
      y += lineHeight * 1.5;

      doc.setFontSize(11);
      doc.text('TRANSACTION METHOD: PHYSICAL CASH // LEDGER BALANCES VERIFIED BY OPERATOR: ANTI GRAVITY CODER', 40, y);
      y += lineHeight * 2;

      doc.setFontSize(12);
      doc.text(`Passenger Name: ${bookingDetails.passengerName}`, 40, y);
      y += lineHeight;
      doc.text(`Email Address: ${bookingDetails.email ?? 'newtonjenny07@gmail.com'}`, 40, y);
      y += lineHeight;
      doc.text(`PNR Reference: ${bookingDetails.bookingReference}`, 40, y);
      y += lineHeight;
      doc.text(`Route Grid: ${bookingDetails.route?.origin ?? 'JIB'} -> ${bookingDetails.route?.destination ?? 'ORD'}`, 40, y);
      y += lineHeight;
      doc.text(`Gate Assignment: ${bookingDetails.gate ?? 'B14'}  |  Allocated Seat: ${bookingDetails.seat ?? selectedSeat}`, 40, y);
      y += lineHeight;
      doc.text(`Baggage Manifest: ${bookingDetails.baggage ?? `${baggageCount} Checked Bags`}`, 40, y);
      y += lineHeight * 1.5;

      doc.text(`Payment Verification Token: ${bookingDetails.currencyReceipt ?? 'USD 4,250.00'} [SETTED]`, 40, y);
      y += lineHeight * 2;

      const qrSvgElement = qrRef.current?.querySelector('svg') as SVGElement | null;
      if (qrSvgElement) {
        const svgString = new XMLSerializer().serializeToString(qrSvgElement);
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const blobUrl = URL.createObjectURL(svgBlob);
        
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width * 2;
          canvas.height = img.height * 2;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const imgData = canvas.toDataURL('image/png');
            doc.addImage(imgData, 'PNG', 40, y, 140, 140);
          }
          URL.revokeObjectURL(blobUrl);
          doc.save(`${String(bookingDetails.bookingReference)}_manifest.pdf`);
          telemetry.info('Exported physical manifest voucher PDF successfully.');
        };
        img.src = blobUrl;
      } else {
        doc.save(`${String(bookingDetails.bookingReference)}_manifest.pdf`);
        telemetry.warn('QR code asset missing during export sequence.');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      telemetry.error(`PDF compiling trace barrier crash: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white font-sans p-4 md:p-8 flex flex-col items-center justify-center relative overflow-y-auto">
      {!isOnline && (
        <div className="fixed top-0 left-0 w-full bg-red-600 text-white font-mono text-[11px] font-bold py-1.5 px-4 text-center z-50 flex items-center justify-center gap-2 shadow-lg animate-pulse">
          <WifiOff className="w-3.5 h-3.5" />
          <span>OFFLINE CONNECTION RUNNING — SERVICE CACHING STANDBY</span>
        </div>
      )}

      <div className="w-full max-w-2xl flex items-center justify-between mb-6 no-print relative z-10">
        <button
          onClick={() => navigate('/trips')}
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-all bg-white/5 border border-white/5 px-3 py-1.5 rounded-xl"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Trips Matrix</span>
        </button>
        <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
          Vantage Node: BP-{bookingDetails.bookingReference ?? 'UNKNOWN'}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {checkInStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full max-w-xl bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 relative z-10"
          >
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/20">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight">IATA Safety & Hazard Declaration</h2>
                <p className="text-xs text-slate-400">International flight protection compliance review</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-white/5">
              Passengers are strictly prohibited from packing hazardous items inside checked or carry-on luggage. This includes loose lithium batteries, flammable aerosols, fireworks, acids, and oxidizing compounds. Clear declaration is binding under international transport statutes.
            </p>

            <label className="flex items-start gap-3 bg-slate-950/20 p-4 rounded-xl border border-white/5 cursor-pointer group hover:border-white/10 transition-all">
              <input
                type="checkbox"
                checked={hazardAgreed}
                onChange={(e) => setHazardAgreed(e.target.checked)}
                className="mt-0.5 rounded border-white/10 bg-slate-950 text-indigo-500 focus:ring-0"
              />
              <span className="text-xs text-slate-300 group-hover:text-slate-200 select-none">
                I certify that I am not transport-carrying any prohibited dangerous goods or unmapped battery cells on this flight sector.
              </span>
            </label>

            <button
              disabled={!hazardAgreed}
              onClick={handleFinishCheckIn}
              className={`w-full font-bold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg ${hazardAgreed ? 'bg-white text-slate-950 hover:bg-slate-200' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
            >
              <span>Verify Compliance & Continue</span>
            </button>
          </motion.div>
        )}

        {checkInStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full max-w-xl bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 relative z-10"
          >
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                <Briefcase className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight">Luggage Allocation & Seating Matrix</h2>
                <p className="text-xs text-slate-400">Configure weights and lock cabin seating coordinates</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-mono">Registered Bags (Max 32kg)</span>
                <span className="font-bold text-indigo-400">{baggageCount} Checked Bags</span>
              </div>
              <div className="flex gap-2">
                {[0, 1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setBaggageCount(num)}
                    className={`flex-1 py-2 text-xs font-mono font-bold rounded-xl border transition-all ${baggageCount === num ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-950/40 border-white/5 text-slate-400 hover:border-white/10'}`}
                  >
                    {num === 0 ? 'None' : `${num} Bag`}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-mono">Interactive Aircraft Seating Vector</span>
                <span className="font-bold text-emerald-400 font-mono">Seat {selectedSeat} Reserved</span>
              </div>
              <SeatMapMatrix />
            </div>

            <button
              onClick={handleFinishCheckIn}
              className="w-full bg-white text-slate-950 font-black py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-slate-200 transition-all shadow-lg"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Generate Digital Boarding Pass</span>
            </button>
          </motion.div>
        )}

        {checkInStep === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-slate-900 border border-white/5 rounded-[32px] overflow-hidden shadow-2xl relative printable z-10"
          >
            <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500" />

            <div className="p-6 md:p-8 bg-gradient-to-b from-slate-950/60 to-transparent flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block">Priority Class Manifest</span>
                  <h3 className="text-md font-black text-white tracking-tight">Capstone Vantage Gate Pass</h3>
                </div>
              </div>
              <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold rounded-lg uppercase">
                {String(bookingDetails.status ?? 'CHECKED IN')}
              </div>
            </div>

            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="text-center md:col-span-4 md:text-left">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Origin</span>
                <h1 className="text-4xl font-black text-white tracking-tight">{String(bookingDetails.route?.origin ?? 'JIB')}</h1>
                <p className="text-xs text-slate-400 mt-0.5">Djibouti Ambouli</p>
              </div>
              <div className="flex flex-col items-center justify-center md:col-span-4">
                <span className="text-[9px] font-mono text-slate-400 bg-slate-950 border border-white/5 px-2 py-0.5 rounded-md mb-1">
                  {String(bookingDetails.route?.carrier ?? 'Turkish Airlines')}
                </span>
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent relative my-1">
                  <Plane className="absolute left-1/2 top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rotate-90 text-indigo-400" />
                </div>
                <span className="text-[10px] font-mono text-slate-500">{String(bookingDetails.route?.flightNumber ?? 'TK 1972')}</span>
              </div>
              <div className="text-center md:col-span-4 md:text-right">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Destination</span>
                <h1 className="text-4xl font-black text-white tracking-tight">{String(bookingDetails.route?.destination ?? 'ORD')}</h1>
                <p className="text-xs text-slate-400 mt-0.5">Chicago O'Hare</p>
              </div>
            </div>

            <div className="mx-6 md:mx-8 p-4 bg-slate-950/40 rounded-2xl border border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
              <div>
                <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center justify-center sm:justify-start gap-1"><Clock className="w-3 h-3" /> Boarding</span>
                <span className="text-sm font-mono font-black text-white">{String(bookingDetails.boardingTime ?? "13:15")}</span>
              </div>
              <div>
                <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center justify-center sm:justify-start gap-1"><Plane className="w-3 h-3" /> Gate Lock</span>
                <span className="text-sm font-mono font-black text-indigo-400">{String(bookingDetails.gate ?? "B14")}</span>
              </div>
              <div>
                <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center justify-center sm:justify-start gap-1"><User className="w-3 h-3" /> Assigned Seat</span>
                <span className="text-sm font-mono font-black text-emerald-400">{String(bookingDetails.seat ?? selectedSeat)}</span>
              </div>
              <div>
                <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center justify-center sm:justify-start gap-1"><Briefcase className="w-3 h-3" /> Bags</span>
                <span className="block text-xs font-sans font-bold text-slate-300 truncate">{String(bookingDetails.baggage ?? `${baggageCount} Checked Bags`)}</span>
              </div>
            </div>

            <div className="mt-6 p-6 bg-slate-950/60 border-t border-dashed border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center sm:text-left">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Manifest Index Passenger</span>
                <h4 className="text-sm font-black text-white">{String(bookingDetails.passengerName)}</h4>
                <p className="text-[10px] font-mono text-slate-400">Security Key: <span className="text-indigo-400">{String(bookingDetails.trackingCode ?? 'AX7890')}</span></p>
              </div>

              <div className="flex flex-col items-center gap-3 no-print">
                <div ref={qrRef} className="bg-white p-3 rounded-2xl shadow-xl border border-white/10 flex items-center justify-center">
                  <QRCodeSVG
                    value={`VANTAGE::${String(bookingDetails.bookingReference ?? '')}::${String(bookingDetails.passengerName)}::${String(bookingDetails.seat ?? selectedSeat)}`}
                    size={100}
                    level="H"
                  />
                </div>
                <button
                  onClick={exportManifest}
                  className="text-[10px] font-mono font-bold bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-xl shadow-md flex items-center gap-1.5 transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Export Voucher PDF</span>
                </button>
              </div>
            </div>

            <div className="mx-6 mb-6 p-4 bg-emerald-950/10 border border-emerald-500/10 rounded-xl flex items-center justify-between font-mono text-[10px] text-emerald-400">
              <div className="space-y-0.5">
                <span className="text-slate-500 block">GATE TRANSACTION AUDIT</span>
                <span>TX_TYPE: PAY_CASH // STATION: JIB_GATE_OFFICE</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">RECEIPT</span>
                <span className="text-white font-bold">{String(bookingDetails.currencyReceipt ?? 'USD 4,250.00')} [SETTED]</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
