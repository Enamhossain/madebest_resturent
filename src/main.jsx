import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import SplashScreen from "./Component/SplashScreen";

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

// App component with splash screen
function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <Suspense fallback={<SplashScreen />}>
              <RouterProvider router={router} />
            </Suspense>
          </HelmetProvider>
        </QueryClientProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}

// Use createRoot for React 18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
