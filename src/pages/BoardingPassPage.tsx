import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import {
  ShieldCheck, Maximize2, X, ArrowLeft,
  Clock, Plane, Briefcase, MapPin, User
} from 'lucide-react';

const BOOKING_REF = 'OFDTIF69RBJJZIJ1OSMR';
const PASSENGER   = 'Jennifer Natalie Newton';
const SECURITY_KEY = 'AX7890zklmnpqt';

  // Boarding target: today at 23:55 local
  function getBoardingTarget(): Date {
    const t = new Date();
    t.setHours(23, 55, 0, 0);
    if (t < new Date()) t.setDate(t.getDate() + 1);
    return t;
  }

function formatCountdown(ms: number): string {
  if (ms <= 0) return '00h 00m 00s';
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1_000);
  return `${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`;
}

export default function BoardingPassPage() {
  const navigate = useNavigate();
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [countdown, setCountdown] = useState('');

  const boardingTarget = getBoardingTarget();

  useEffect(() => {
    const tick = () => setCountdown(formatCountdown(boardingTarget.getTime() - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const qrPayload = `VANTAGE::${BOOKING_REF}::${PASSENGER}::12A`;

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden font-sans flex flex-col items-center justify-center px-4 py-12">

      {/* Ambient glow background */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Back button */}
      <div className="w-full max-w-xl mb-6 flex items-center justify-between relative z-10">
        <button
          type="button"
          onClick={() => navigate('/trips')}
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-all bg-white/5 border border-white/5 hover:border-white/10 px-3 py-1.5 rounded-xl"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          My Trips
        </button>
        <span className="text-[10px] font-mono tracking-widest text-slate-600 uppercase">Vantage Node: BP-{BOOKING_REF.slice(0,8)}</span>
      </div>

      {/* Main boarding pass card */}
      <div className="relative w-full max-w-xl bg-gradient-to-b from-slate-900/90 to-slate-950/80 backdrop-blur-2xl border border-white/8 rounded-[32px] shadow-2xl overflow-hidden z-10">

        {/* Top gradient accent */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500" />

        {/* Airline / Status header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <ShieldCheck className="w-4.5 h-4.5 text-indigo-400" />
            </div>
            <div>
              <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-bold block">Priority Class Manifest</span>
              <span className="text-xs font-black text-white">Capstone Vantage Gate Pass</span>
            </div>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono uppercase px-2.5 py-1 rounded-lg font-extrabold">
            ● Boarding Pass Issued
          </span>
        </div>

        {/* Route section */}
        <div className="px-6 py-6 flex items-center justify-between gap-2">
          <div>
            <div className="text-5xl font-black text-white tracking-tighter">JIB</div>
            <div className="text-xs text-slate-400 font-mono mt-1">Djibouti Ambouli</div>
            <div className="flex items-center gap-1.5 mt-2">
              <Clock className="w-3 h-3 text-slate-500" />
                            <span className="text-sm font-mono font-bold text-white">23:55</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center px-2 gap-1">
            <span className="text-[9px] font-mono text-slate-500 bg-slate-950 border border-white/5 px-2 py-0.5 rounded-md">Turkish Airlines</span>
            <div className="relative w-full flex items-center my-1">
              <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/30 to-cyan-500/30" />
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-3 w-6 h-6 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center justify-center">
                <Plane className="w-3 h-3 text-indigo-400 rotate-90" />
              </div>
            </div>
              <span className="text-[9px] font-mono text-slate-500">TK 1972 / 1918</span>
          </div>

          <div className="text-right">
            <div className="text-5xl font-black text-white tracking-tighter">ORD</div>
            <div className="text-xs text-slate-400 font-mono mt-1">Chicago O'Hare</div>
            <div className="flex items-center gap-1.5 mt-2 justify-end">
              <Clock className="w-3 h-3 text-slate-500" />
                            <span className="text-sm font-mono font-bold text-cyan-400">09:40</span>
            </div>
          </div>
        </div>

        {/* Dashed separator */}
        <div className="relative mx-6 border-t border-dashed border-white/10 flex items-center justify-between">
          <div className="absolute -left-6 -top-3.5 w-7 h-7 rounded-full bg-slate-950 border-r border-white/10" />
          <div className="absolute -right-6 -top-3.5 w-7 h-7 rounded-full bg-slate-950 border-l border-white/10" />
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-4 gap-3 px-6 py-5 text-center font-mono">
          <div className="bg-slate-950/50 rounded-2xl p-3 border border-white/5">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="w-3 h-3 text-slate-500" />
              <span className="text-[9px] text-slate-500 uppercase">Boarding</span>
            </div>
            <span className="text-sm font-black text-white">23:55</span>
            <span className="block text-[8px] text-indigo-400 mt-0.5 animate-pulse">{countdown}</span>
          </div>
          <div className="bg-slate-950/50 rounded-2xl p-3 border border-white/5">
            <div className="flex items-center justify-center gap-1 mb-1">
              <MapPin className="w-3 h-3 text-slate-500" />
              <span className="text-[9px] text-slate-500 uppercase">Gate</span>
            </div>
            <span className="text-sm font-black text-cyan-400">B14</span>
          </div>
          <div className="bg-slate-950/50 rounded-2xl p-3 border border-white/5">
            <div className="flex items-center justify-center gap-1 mb-1">
              <User className="w-3 h-3 text-slate-500" />
              <span className="text-[9px] text-slate-500 uppercase">Seat</span>
            </div>
            <span className="text-sm font-black text-emerald-400">12A</span>
          </div>
          <div className="bg-slate-950/50 rounded-2xl p-3 border border-white/5">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Briefcase className="w-3 h-3 text-slate-500" />
              <span className="text-[9px] text-slate-500 uppercase">Bags</span>
            </div>
            <span className="text-sm font-black text-slate-300">×2</span>
          </div>
        </div>

        {/* Dashed separator */}
        <div className="relative mx-6 border-t border-dashed border-white/10 flex items-center justify-between">
          <div className="absolute -left-6 -top-3.5 w-7 h-7 rounded-full bg-slate-950 border-r border-white/10" />
          <div className="absolute -right-6 -top-3.5 w-7 h-7 rounded-full bg-slate-950 border-l border-white/10" />
        </div>

        {/* Passenger + QR */}
        <div className="flex items-center justify-between gap-4 px-6 py-5">
          <div className="space-y-1 font-mono">
            <span className="text-[9px] text-slate-500 uppercase tracking-widest block">Manifest Index Passenger</span>
            <h3 className="text-lg font-black text-white leading-tight">{PASSENGER}</h3>
            <div className="mt-1">
              <span className="text-[9px] text-slate-500">Security Key: </span>
              <span className="text-[9px] font-mono text-indigo-300 font-bold">{SECURITY_KEY}</span>
            </div>
            <div className="mt-1">
              <span className="text-[9px] text-slate-500">PNR: </span>
              <span className="text-[9px] font-mono text-slate-300">{BOOKING_REF}</span>
            </div>
          </div>

          {/* QR touchpoint */}
          <button
            type="button"
            onClick={() => setIsQrModalOpen(true)}
            className="group relative p-2.5 bg-white rounded-2xl border-2 border-white/20 transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-xl shadow-white/10"
          >
            <QRCodeSVG
              value={qrPayload}
              size={80}
              level="H"
              bgColor="#ffffff"
              fgColor="#0f172a"
            />
            <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center rounded-2xl transition-opacity gap-1">
              <Maximize2 className="w-4 h-4 text-white" />
              <span className="text-[9px] text-white font-mono font-bold">EXPAND</span>
            </div>
          </button>
        </div>

        {/* Footer status */}
        <div className="border-t border-white/5 px-6 py-3 flex items-center justify-between font-mono text-[9px] bg-slate-950/30">
          <div className="flex items-center gap-1.5 text-emerald-400/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            MANIFEST VAULT SECURED // AVAILABLE OFFLINE
          </div>
          <span className="text-slate-600">SYS_REV_0147</span>
        </div>
      </div>

      {/* QR Modal */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="relative bg-slate-900 border border-white/10 rounded-[32px] p-8 w-full max-w-sm text-center font-mono space-y-5 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 bg-slate-800 border border-white/5 rounded-xl text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="pt-2">
              <h4 className="text-sm font-black text-white uppercase tracking-widest">Gate Scanner Engine</h4>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Hold screen flat to gate terminal lens for optimal scan.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl inline-block border-4 border-indigo-500/20 shadow-xl">
              <QRCodeSVG
                value={qrPayload}
                size={220}
                level="H"
                bgColor="#ffffff"
                fgColor="#0f172a"
              />
            </div>

            <div className="space-y-2">
              <span className="block text-[10px] text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 py-1.5 px-3 rounded-lg">
                BRN-PFR: {BOOKING_REF}
              </span>
              <span className="block text-[9px] text-slate-500">{PASSENGER}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
