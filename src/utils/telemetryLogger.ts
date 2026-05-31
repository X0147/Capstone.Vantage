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
