'use client';

/**
 * Error Boundary Component - Fashion AI
 * 
 * Catches JavaScript errors in child components and displays fallback UI
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    
    // Log to error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // You can also send to an error tracking service here
    // sendToErrorTracker(error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Đã xảy ra lỗi
            </h2>
            
            <p className="text-gray-600 mb-6">
              Xin lỗi, đã có lỗi xảy ra khi tải trang này. Vui lòng thử lại hoặc liên hệ hỗ trợ nếu vấn đề vẫn tiếp tục.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left bg-gray-100 rounded-lg p-4">
                <summary className="cursor-pointer font-medium text-gray-700">
                  Chi tiết lỗi (Development)
                </summary>
                <pre className="mt-2 text-xs text-red-600 overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Thử lại
              </button>
              
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Home className="w-4 h-4" />
                Về trang chủ
              </Link>
              
              <Link
                href="/support"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Hỗ trợ
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Simple error fallback component
export function ErrorFallback({ 
  error,
  resetErrorBoundary 
}: { 
  error?: Error;
  resetErrorBoundary?: () => void;
}) {
  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-red-800">Đã xảy ra lỗi</h3>
          <p className="text-sm text-red-600 mt-1">
            {error?.message || 'Không thể tải nội dung này'}
          </p>
          {resetErrorBoundary && (
            <button
              onClick={resetErrorBoundary}
              className="mt-3 text-sm font-medium text-red-700 hover:text-red-800 underline"
            >
              Thử lại
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// HOC to wrap components with error boundary
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundaryWrapper(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}

export default ErrorBoundary;
