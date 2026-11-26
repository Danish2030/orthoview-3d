import React from 'react';
import { AlertTriangle, RotateCcw, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  moduleName: string;
  children: React.ReactNode;
  onResetData?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error?.message || 'Unexpected rendering error occurred.',
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error(`[VectorDesk ErrorBoundary — ${this.props.moduleName}]`, error, info.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  handleReset = () => {
    this.props.onResetData?.();
    this.setState({ hasError: false, errorMessage: '' });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full min-h-[260px] flex items-center justify-center p-6">
          <div className="max-w-md w-full rounded-3xl glass-card border border-rose-500/25 p-6 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base tracking-tight">
                {this.props.moduleName} Encountered an Error
              </h3>
              <p className="text-xs opacity-70 font-mono break-words px-2">
                {this.state.errorMessage}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={this.handleRetry}
                className="px-4 py-2 rounded-full glass-pill-active text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Module</span>
              </button>
              {this.props.onResetData && (
                <button
                  type="button"
                  onClick={this.handleReset}
                  className="px-4 py-2 rounded-full glass-pill text-xs font-semibold flex items-center gap-1.5 cursor-pointer hover:border-rose-500/40"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                  <span>Reset Default Project</span>
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
