import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookingStore } from '../store/useBookingStore';
import { telemetry } from '../utils/telemetryLogger';

/**
 * Hidden developer diagnostics overlay.
 * Visible only after pressing Ctrl+Shift+D (Windows/Linux) or Cmd+Shift+D (macOS).
 */
const DiagnosticsHUD: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [renderTime, setRenderTime] = useState<number>(0);

  // Snapshot of the current Zustand store (all keys)
  const storeSnapshot = useBookingStore(state => ({ ...state }));

  // Toggle visibility on key combo
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const isMac = navigator.platform.toUpperCase().includes('MAC');
    const ctrlOrMeta = isMac ? e.metaKey : e.ctrlKey;
    if (ctrlOrMeta && e.shiftKey && e.key.toLowerCase() === 'd') {
      e.preventDefault();
      setVisible(v => !v);
    }
  }, []);

  // Poll logs every second
  useEffect(() => {
    const interval = setInterval(() => {
      const recent = telemetry.getLogs?.().slice(-10) ?? [];
      setLogs(recent);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track render performance
  useEffect(() => {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      setRenderTime(duration);
    };
  }, []);

  // Register global key listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // System Override actions
  const triggerError = () => {
    // Throwing an error will be caught by the nearest ErrorBoundary.
    throw new Error('Manual error trigger from DiagnosticsHUD');
  };

  const clearLogs = () => {
    telemetry.clearLogs?.();
    setLogs([]);
    telemetry.info('DiagnosticsHUD: logs cleared via System Override');
  };

  const swapPassenger = () => {
    // Simple swap: toggle between existing bookingDetails and a dummy passenger
    const dummy = {
      passengerName: 'Demo Passenger',
      email: 'demo@example.com',
      bookingReference: 'DUMMY123',
      trackingCode: 'XYZ999',
      status: 'CHECKED IN',
      route: {
        origin: 'JIB',
        destination: 'ORD',
        departureDate: '01-01-26',
        arrivalDate: '01-02-26',
        carrier: 'DemoAir',
        flightNumber: 'DA 1000',
      },
      paymentMethod: 'CASH_AT_COUNTER' as const,
      paymentStatus: 'SETTLED' as const,
      currencyReceipt: 'USD 0.00',
    } as const;
    useBookingStore.setState({ bookingDetails: dummy });
    telemetry.info('DiagnosticsHUD: swapped passenger state to dummy');
  };

  // Compute approx log cache size (bytes)
  const logCacheSize = new Blob([JSON.stringify(logs)]).size;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 h-full w-96 bg-slate-950/80 backdrop-blur-3xl border-l border-white/10 text-white z-50 p-4 overflow-y-auto"
        >
          <h2 className="text-lg font-bold mb-4">🛠️ Diagnostics HUD</h2>

          <section className="mb-4">
            <h3 className="text-sm font-medium mb-1">Zustand Store Snapshot</h3>
            <pre className="text-xs bg-black/30 p-2 rounded overflow-x-auto">
{JSON.stringify(storeSnapshot, null, 2)}
            </pre>
          </section>

          <section className="mb-4">
            <h3 className="text-sm font-medium mb-1">Log Stream (last 10)</h3>
            <pre className="text-xs bg-black/30 p-2 rounded overflow-y-auto max-h-40">
{logs.join('\n')}
            </pre>
            <p className="text-xs mt-1">Cache size: {logCacheSize} bytes</p>
          </section>

          <section className="mb-4">
            <h3 className="text-sm font-medium mb-1">Performance Metrics</h3>
            <ul className="text-xs list-disc list-inside">
              <li>Render duration: {renderTime.toFixed(2)} ms</li>
            </ul>
          </section>

          <section className="border-t border-white/20 pt-3">
            <h3 className="text-sm font-medium mb-2">System Override</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={triggerError}
                className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded"
              >
                Throw Hard Error
              </button>
              <button
                onClick={clearLogs}
                className="bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Clear Logs
              </button>
              <button
                onClick={swapPassenger}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded"
              >
                Swap Passenger State
              </button>
            </div>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DiagnosticsHUD;
