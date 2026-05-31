import React, { useState, useEffect } from 'react';
import { ShieldCheck, Maximize2, X } from 'lucide-react';

export default function BoardingPassPage() {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [countdown, setCountdown] = useState('02h 14m 05s');

  // 1. Dynamic Countdown Ticker Simulation
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hours = String(23 - now.getHours()).padStart(2, '0');
      const minutes = String(59 - now.getMinutes()).padStart(2, '0');
      const seconds = String(59 - now.getSeconds()).padStart(2, '0');
      setCountdown(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col items-center justify-center">
      {/* Existing pass container */}
      <div className="relative w-full max-w-md bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden">
        
        {/* TOP SPEC HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4" /> Priority Class Manifest
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono uppercase px-2 py-0.5 rounded-md font-extrabold">
            Boarding Pass Issued
          </span>
        </div>

        {/* TIME GRID CONTAINER (Modified to anchor countdown) */}
        <div className="grid grid-cols-4 gap-4 border-t border-b border-white/5 py-4 my-4 font-mono text-center">
          <div>
            <span className="block text-[9px] text-slate-500 uppercase tracking-tight">Boarding</span>
            <span className="text-sm font-bold text-white">13:15</span>
            {/* Added Ticker */}
            <span className="block text-[8px] text-indigo-400 animate-pulse mt-0.5">{countdown}</span>
          </div>
          <div>
            <span className="block text-[9px] text-slate-500 uppercase tracking-tight">Gate Lock</span>
            <span className="text-sm font-bold text-cyan-400">B14</span>
          </div>
          <div>
            <span className="block text-[9px] text-slate-500 uppercase tracking-tight">Assigned Seat</span>
            <span className="text-sm font-bold text-emerald-400">12A</span>
          </div>
          <div>
            <span className="block text-[9px] text-slate-500 uppercase tracking-tight">Bags</span>
            <span className="text-sm font-bold text-slate-300">2 Checked</span>
          </div>
        </div>

        {/* PASSENGER INDEX / QR CONTAINER (Modified for click modal trigger) */}
        <div className="flex items-center justify-between gap-4 mt-6">
          <div className="space-y-1 font-mono">
            <span className="text-[9px] text-slate-500 uppercase block">Manifest Index Passenger</span>
            <h3 className="text-sm font-bold text-white">Jennifer Natalie Newton</h3>
            <span className="text-[10px] text-slate-400 block">Security Key: <span className="text-indigo-300">AX7890zklmnpqt</span></span>
          </div>
          
          {/* QR Touchpoint */}
          <button 
            type="button"
            onClick={() => setIsQrModalOpen(true)}
            className="group relative p-2 bg-white rounded-xl border border-white/20 transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            <img src="/api/placeholder/80/80" alt="QR Manifest Entry" className="w-16 h-16 object-cover" />
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-xl transition-opacity">
              <Maximize2 className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>

        {/* ENVIRONMENTAL STATUS CRADLE (Item 4) */}
        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[9px] text-slate-500">
          <div className="flex items-center gap-1.5 text-emerald-400/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>● MANIFEST VAULT SECURED // AVAILABLE OFFLINE</span>
          </div>
          <span className="text-slate-600">SYS_REV_0147</span>
        </div>

      </div>

      {/* INTERACTIVE SCANNER MODAL OVERLAY */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 w-full max-w-sm relative text-center font-mono space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <button 
              type="button" 
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-1 pt-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Scanner Optimization Engine</h4>
              <p className="text-xs text-slate-400">Position screen grid directly flat against terminal gate lens.</p>
            </div>
            <div className="bg-white p-4 rounded-2xl inline-block border-4 border-indigo-500/30">
              <img src="/api/placeholder/240/240" alt="High-Contrast QR Matrix" className="w-56 h-56 mx-auto" />
            </div>
            <span className="block text-[10px] text-indigo-400 bg-indigo-500/10 py-1 px-3 rounded-md max-w-xs mx-auto">
              BRN-PFR: 0F0TIFG9RBJJZ1J1OSMR
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
