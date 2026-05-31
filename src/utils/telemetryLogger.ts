export { telemetry } from './telemetry';

// Register online/offline listeners to log connection changes
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    telemetry.info('Network status: online');
  });
  window.addEventListener('offline', () => {
    telemetry.warn('Network status: offline');
  });
}
export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
}

// Ensure your array tracking return matches the type cleanly
export const getLogs = (): LogEntry[] => {
  const cached = localStorage.getItem('vantage_telemetry');
  return cached ? (JSON.parse(cached) as LogEntry[]) : [];
};
