import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import SplashScreen from "./Component/SplashScreen";
import Loading from "./Component/Loading";

// Optimized QueryClient configuration for better performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Keep unused data in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
      // Retry failed requests 2 times
      retry: 2,
      // Refetch on window focus only for critical data
      refetchOnWindowFocus: false,
      // Refetch on reconnect
      refetchOnReconnect: true,
      // Network mode for better offline support
      networkMode: 'online',
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
      // Network mode
      networkMode: 'online',
    },
  },
});

// Performance optimization: Preload critical resources
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Prefetch likely next routes
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = '/ourmenu';
    document.head.appendChild(link);
  });
}

// Performance monitoring (development only)
if (import.meta.env.DEV) {
  // Monitor Core Web Vitals
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.renderTime || entry.loadTime);
          }
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Silent fail
    }
  }
}

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-4">{this.state.error?.message || 'An error occurred'}</p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// App component with optimized loading
function App() {
  // Remove HTML loading screen once React loads
  React.useEffect(() => {
    const htmlLoader = document.querySelector('.loading');
    if (htmlLoader) {
      // Fade out smoothly
      htmlLoader.style.transition = 'opacity 0.3s ease-out';
      htmlLoader.style.opacity = '0';
      setTimeout(() => {
        htmlLoader.remove();
      }, 300);
    }
  }, []);

  return (
    <React.StrictMode>
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
    </React.StrictMode>
  );
}

// Use createRoot for React 18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
