import React, { useState } from 'react';
import { CreditCard, ArrowRight, Loader2, X, CheckCircle2 } from 'lucide-react';

export default function TripsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 2. Spatial Route Morph Loader
  const handleBoardingPassRoute = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      window.location.hash = '/boarding-pass';
    }, 800); // Gives time for structural transition feel
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 relative overflow-hidden">
      
      {/* TRIP RECORD COMPONENT CARD */}
      <div className="w-full max-w-4xl bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 space-y-6">
        {/* Main card markup here */}
        
        {/* CONTROL ACTION TRAY */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="text-xs font-mono text-slate-400">
            Reconciled Ledger Entry: <span className="text-emerald-400 font-bold">CASH_AT_COUNTER</span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Drawer Activator Toggle */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="px-4 py-2 bg-slate-800/60 border border-white/10 hover:border-white/20 rounded-xl text-xs font-mono text-slate-300 transition-colors flex items-center gap-2"
            >
              <CreditCard className="w-3.5 h-3.5" /> Get Payment Info
            </button>

            {/* Simulated Animated Route Link */}
            <button
              type="button"
              disabled={isTransitioning}
              onClick={handleBoardingPassRoute}
              className="px-5 py-2 bg-white text-slate-950 font-bold rounded-xl text-xs font-mono transition-all hover:bg-slate-200 active:scale-98 disabled:opacity-50 flex items-center gap-1.5"
            >
              {isTransitioning ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> STRUCTURING PASS...
                </>
              ) : (
                <>
                  Boarding Pass <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* HIGH-DENSITY LEDGER BREAKDOWN DRAWER (Item 3) */}
      <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-900/95 backdrop-blur-2xl border-l border-white/10 transform transition-transform duration-300 ease-out shadow-2xl p-6 flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* DRAWER TOP NAV MAP */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
          <div className="font-mono space-y-0.5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Ledger Reconciliation Matrix</h3>
            <p className="text-[10px] text-slate-400 font-mono">Reference Trace ID: TX_TYPE: PRP_CASH</p>
          </div>
          <button 
            type="button" 
            onClick={() => setIsDrawerOpen(false)}
            className="p-1.5 bg-slate-800 border border-white/5 rounded-xl text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* LEDGER GRID SUMMARY */}
        <div className="space-y-6 flex-1 overflow-y-auto font-mono">
          <div className="bg-slate-950 p-4 border border-white/5 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">Settled Gross Aggregate</span>
              <span className="text-xl font-bold text-emerald-400">$4,250.00</span>
            </div>
            <div className="text-right">
              <span className="text-[9px] text-slate-500 block uppercase">Audit State</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold inline-block mt-0.5">
                ● RECONCILED
              </span>
            </div>
          </div>

          {/* ITEMIZED BREAKDOWN LEDGER TABLE */}
          <div className="space-y-2">
            <h4 className="text-[11px] text-indigo-400 font-bold uppercase tracking-wider">Transaction Allocation Matrix</h4>
            <div className="border border-white/5 rounded-xl overflow-hidden bg-slate-950/50">
              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className="border-b border-white/5 bg-slate-950 text-slate-400 font-bold">
                    <th className="p-3">Allocation Code</th>
                    <th className="p-3">Description</th>
                    <th className="p-3 text-right">Amount (USD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  <tr>
                    <td className="p-3 font-bold text-white">FLIGHT-BASE</td>
                    <td className="p-3 text-slate-400">JIB → ORD Fare Block</td>
                    <td className="p-3 text-right font-bold">$3,800.00</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">INTL-TAX</td>
                    <td className="p-3 text-slate-400">Crossing & Sovereign Fees</td>
                    <td className="p-3 text-right font-bold">$300.00</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">BAG-PREMIUM</td>
                    <td className="p-3 text-slate-400">2 Checked Bags Allowance</td>
                    <td className="p-3 text-right font-bold">$150.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* DRAWER FOOTER LOG */}
        <div className="border-t border-white/5 pt-4 font-mono text-[9px] text-slate-500 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> SECURE GATEWAY TRANSACTION RECONCILIATION COMPLETED
        </div>

      </div>

      {/* BACKGROUND DRAWER DIMMER MASK */}
      {isDrawerOpen && (
        <div 
          role="presentation"
          onClick={() => setIsDrawerOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        />
      )}
    </div>
  );
}
