import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh
      fastRefresh: true,
      // Optimize JSX runtime
      jsxRuntime: 'automatic',
    })
  ],
  build: {
    rollupOptions: {
      output: {
        // More granular chunking for better caching
        manualChunks(id) {
          // Vendor chunks for better caching
          if (id.includes('node_modules')) {
            if (id.includes('react-dom')) return 'react-dom';
            if (id.includes('react') && !id.includes('react-dom')) return 'react';
            if (id.includes('react-router-dom')) return 'react-router';
            if (id.includes('@tanstack/react-query')) return 'react-query';
            if (id.includes('firebase')) return 'firebase';
            if (id.includes('react-icons')) return 'react-icons';
            if (id.includes('sweetalert')) return 'sweetalert';
            if (id.includes('axios')) return 'axios';
            if (id.includes('react-hook-form')) return 'forms';
            if (id.includes('aos')) return 'aos';
            // Other vendor libraries
            return 'vendor';
          }
        },
        // Optimize chunk names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1500,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2, // Multiple passes for better minification
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_methods: true,
      },
      format: {
        comments: false, // Remove all comments
      },
    },
    // Disable source maps for production (smaller bundle)
    sourcemap: false,
    // Optimize for performance
    cssCodeSplit: true,
    cssMinify: true, // Minify CSS
    reportCompressedSize: false, // Faster builds
    target: 'esnext',
    // Tree-shaking optimization
    treeshake: {
      moduleSideEffects: false,
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'axios',
      'react-icons/fa', // Tree-shake react-icons
      'aos',
      'lodash.throttle',
    ],
    esbuildOptions: {
      target: 'esnext',
    },
  },
  // Resolve Firebase properly
  resolve: {
    alias: {
      'firebase/app': 'firebase/app',
      'firebase/auth': 'firebase/auth',
      'firebase/firestore': 'firebase/firestore'
    }
  },
  // Performance optimizations
  esbuild: {
    legalComments: 'none',
    treeShaking: true,
  },
})
