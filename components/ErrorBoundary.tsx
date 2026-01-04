
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[var(--bg-color)] flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-[var(--card-bg)] border-4 border-[var(--border-main)] p-8 md:p-12 shadow-[12px_12px_0px_0px_var(--shadow-color)] max-w-lg w-full">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            <h2 className="retro-title text-2xl md:text-3xl uppercase mb-4 text-[var(--text-main)]">Signal Interrupted</h2>
            <p className="text-[var(--text-muted)] font-bold uppercase text-[10px] md:text-xs mb-8 tracking-widest leading-relaxed">
              The archive stream has encountered a fatal parity error. <br/>Data fragments may be corrupted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.reload()} 
                className="flex items-center justify-center gap-2 bg-pink-400 text-white px-6 py-3 rounded-xl font-black uppercase text-[10px] shadow-[4px_4px_0px_0px_var(--shadow-color)] hover:translate-y-[-2px] transition-all"
              >
                <RefreshCcw size={14} /> Recalibrate
              </button>
              <button 
                onClick={() => window.location.href = '/'} 
                className="flex items-center justify-center gap-2 bg-[var(--border-main)] text-[var(--bg-color)] px-6 py-3 rounded-xl font-black uppercase text-[10px] shadow-[4px_4px_0px_0px_var(--shadow-color)] hover:translate-y-[-2px] transition-all"
              >
                <Home size={14} /> Exit to Library
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Access children through props in a class component
    return this.props.children;
  }
}

export default ErrorBoundary;
