import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-lg text-white font-sans text-center">
          <div className="premium-glass rounded-3xl p-xl max-w-lg w-full space-y-md border border-red-500/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50" />
            <div className="mx-auto w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-sm">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="font-display text-2xl font-bold text-white tracking-tight">System Exception</h2>
            <p className="text-sm text-vantage-muted">
              An unexpected anomaly occurred within the application layer. Our telemetry has been updated.
            </p>
            <div className="bg-black/40 p-sm rounded-xl border border-white/5 text-left overflow-auto max-h-32 mt-4">
              <code className="text-[10px] text-red-300 font-mono">
                {this.state.error?.toString()}
              </code>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-lg w-full flex items-center justify-center gap-2xs px-lg py-sm rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-xs font-bold uppercase tracking-widest text-white"
            >
              <RefreshCcw className="w-4 h-4" /> Reload Instance
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
