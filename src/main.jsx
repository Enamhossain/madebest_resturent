import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import Loading from "./Component/Loading.jsx";

// Optimized QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      networkMode: 'online',
    },
    mutations: {
      retry: 1,
      networkMode: 'online',
    },
  },
});

// Preload critical resources during idle time
if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
  requestIdleCallback(() => {
    const criticalRoutes = ['/ourmenu', '/about', '/contact'];
    criticalRoutes.forEach(route => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
    });
  });
}

// Performance monitoring (development only)
if (import.meta.env.DEV && typeof window !== 'undefined') {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('🎨 LCP:', Math.round(entry.renderTime || entry.loadTime), 'ms');
          }
        });
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      // Silently fail - not critical
    }
  }

  // First Input Delay (FID) monitoring
  if ('PerformanceObserver' in window) {
    try {
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          console.log('⚡ FID:', Math.round(entry.processingStart - entry.startTime), 'ms');
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (error) {
      // Silently fail
    }
  }
}

// Enhanced Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('❌ Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });
    
    // Log to error tracking service in production
    if (import.meta.env.PROD) {
      // Add your error tracking service here (e.g., Sentry)
      // logErrorToService(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h1>
            <p className="text-gray-600 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            {import.meta.env.DEV && this.state.errorInfo && (
              <details className="text-left mb-4 text-xs text-gray-500 bg-gray-50 p-3 rounded">
                <summary className="cursor-pointer font-semibold">Error Details</summary>
                <pre className="mt-2 overflow-auto">{this.state.errorInfo.componentStack}</pre>
              </details>
            )}
            <button
              onClick={this.handleReset}
              className="w-full px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main App component
function App() {
  useEffect(() => {
    // Remove HTML loading screen with smooth transition
    const htmlLoader = document.querySelector('.loading');
    if (htmlLoader) {
      htmlLoader.style.transition = 'opacity 0.3s ease-out';
      htmlLoader.style.opacity = '0';
      setTimeout(() => htmlLoader.remove(), 300);
    }

    // Prevent layout shift by setting min-height
    document.body.style.minHeight = '100vh';
    
    // Clean up function
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <Suspense fallback={<Loading />}>
              <RouterProvider router={router} />
            </Suspense>
          </HelmetProvider>
        </QueryClientProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

// Initialize React app with error handling
function initializeApp() {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    console.error('❌ Failed to find root element');
    document.body.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: system-ui;">
        <div style="text-align: center;">
          <h1 style="color: #ef4444; margin-bottom: 8px;">Application Error</h1>
          <p style="color: #6b7280;">Root element not found. Please refresh the page.</p>
        </div>
      </div>
    `;
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('❌ Failed to render React app:', error);
    rootElement.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: system-ui;">
        <div style="text-align: center; max-width: 500px; padding: 20px;">
          <h1 style="color: #ef4444; margin-bottom: 8px;">Failed to Load Application</h1>
          <p style="color: #6b7280; margin-bottom: 16px;">${error.message}</p>
          <button 
            onclick="window.location.reload()" 
            style="background: #f97316; color: white; padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;"
          >
            Reload Page
          </button>
        </div>
      </div>
    `;
  }
}

// Start the application
initializeApp();

