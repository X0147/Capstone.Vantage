import { Component, ErrorInfo, ReactNode } from 'react';
import { telemetry } from '../utils/telemetryLogger';
import { ShieldAlert, RefreshCw } from 'lucide-react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, error: null };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    telemetry.error(`Fatal UI Thread Crash: ${error.message}`, {
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
  }

  private handleSystemReset = () => {
    localStorage.clear(); // Safe clear-all state recovery strategy
    window.location.href = '/Capstone.Vantage/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-slate-900 border border-red-500/20 rounded-3xl p-8 text-center space-y-6 shadow-2xl backdrop-blur-xl">
            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto border border-red-500/20">
              <ShieldAlert className="w-8 h-8 text-red-400" />
            </div>
            <div className="space-y-2">
              <h1 className="text-xl font-black text-white tracking-tight">Core Ledger Violation</h1>
              <p className="text-xs text-slate-400 leading-relaxed">
                An unhandled exception has interrupted the runtime stream. The vector context has been written securely to telemetry cache.
              </p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-white/5 text-left overflow-x-auto max-h-32 text-[10px] font-mono text-red-400">
              {this.state.error?.toString()}
            </div>
            <button
              onClick={this.handleSystemReset}
              className="w-full bg-white text-slate-950 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-slate-200 transition-all shadow-lg"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Flush Engine and Purge State Cache</span>
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
