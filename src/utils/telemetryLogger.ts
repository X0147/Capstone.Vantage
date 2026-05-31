// src/utils/telemetryLogger.ts
export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
}

const writeInternalLog = (level: 'info' | 'warn' | 'error', message: string) => {
  const cached = localStorage.getItem('vantage_telemetry');
  const logs: LogEntry[] = cached ? (JSON.parse(cached) as LogEntry[]) : [];
  logs.push({ timestamp: new Date().toISOString(), level, message });
  localStorage.setItem('vantage_telemetry', JSON.stringify(logs));
};

export const telemetry = {
  info: (msg: string) => writeInternalLog('info', msg),
  warn: (msg: string) => writeInternalLog('warn', msg),
};
