export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'INFO' | 'WARN' | 'ERROR';
  message: string;
  context?: unknown;
}

const STORAGE_KEY = 'vantage_telemetry_logs';
const MAX_LOGS = 50;

export const telemetry = {
  log(level: LogEntry['level'], message: string, context?: unknown) {
    try {
      const logs: LogEntry[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      
      const newEntry: LogEntry = {
        timestamp: new Date().toISOString(),
        level,
        message,
        context: context ? JSON.parse(JSON.stringify(context)) : undefined,
      };
      
      logs.unshift(newEntry);
      
      if (logs.length > MAX_LOGS) logs.pop();
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
      
      const color = level === 'ERROR' || level === 'error' ? '#ef4444' : (level === 'WARN' || level === 'warn') ? '#f59e0b' : '#3b82f6';
      console.log(`%c[${level}] ${message}`, `color: ${color}; font-weight: bold;`, context || '');
    } catch (e) {
      console.error('Telemetry write barrier failure:', e);
    }
  },

  info(message: string, context?: unknown) { this.log('INFO', message, context); },
  warn(message: string, context?: unknown) { this.log('WARN', message, context); },
  error(message: string, context?: unknown) { this.log('ERROR', message, context); },

  getLogs(): LogEntry[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    } catch {
      return [];
    }
  },

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('vantage_telemetry');
  }
};
