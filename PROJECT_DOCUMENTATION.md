# 🍽️ MadeBest Restaurant - Full Project Documentation

## 🌟 Overview
MadeBest Restaurant is a premium, high-performance web application designed for gourmet dining experiences. It features a complete ordering system, table reservations, and a robust administrative dashboard for business management.

## 🚀 Key Features

### 🍱 Customer Experience
- **Interactive Menu**: Browse gourmet dishes with high-quality visuals and categorized navigation.
- **Smart Shopping Cart**: Seamlessly add, remove, and manage order quantities with real-time total calculation.
- **Secure Authentication**: Integrated Firebase authentication (Email, Google, Instagram, Twitter).
- **Reservation System**: Book tables with instant confirmation.
- **SEO Optimized**: Fully optimized meta tags, structured data (JSON-LD), and fast performance for search engine ranking.

### 🛡️ Admin Dashboard (Premium Redesign)
- **Real-time Overview**: Instant access to total users, menu items, orders, and revenue statistics.
- **Advanced Management**:
    - **User Directory**: Manage access roles and account status.
    - **Order Tracking**: Comprehensive view of customer orders with payment status indicators.
    - **Menu Management**: Add new dishes with automated image hosting (ImgBB) and granular categorization.
- **Performance Optimized**: Powered by **React Query** for lightning-fast data fetching and background synchronization.

## 🛠️ Technology Stack

### Frontend
- **React 18**: Component-based UI architecture.
- **Vite**: High-speed build tool and development server.
- **Tailwind CSS**: Modern utility-first styling for premium aesthetics.
- **React Router Dom**: Declarative client-side routing.
- **Framer Motion / AOS**: Smooth reveal animations and interactive transitions.

### Data & State Management
- **Tanstack React Query (v5)**: Efficient server-state management and caching.
- **Axios**: Standardized API communication with interceptors for security and caching.
- **Context API**: Global state management for authentication and cart.

### Backend & Services
- **Firebase**: Authentication and secure app initialization.
- **Vercel**: High-performance production hosting.
- **Service Workers**: PWA capabilities for offline support and asset caching.

## ⚡ Performance Optimizations

1.  **Lazy Loading with Auto-Retry**: Implemented a custom `lazyWithRetry` utility to prevent "Failed to fetch module" errors during deployments.
2.  **Asset Caching**: Service worker integration for static assets and API response caching.
3.  **Hashed Assets**: Granular chunking in Vite for better long-term browser caching.
4.  **Skeleton Loaders**: Custom animated skeleton screens to improve perceived performance during data loading.

## 📦 Project Structure

```text
madebest_resturent/
├── public/                 # Static assets & Service Worker
├── src/
│   ├── AuthProvider/       # Authentication context
│   ├── Component/          # Reusable UI components
│   ├── Firebase/           # Firebase configuration
│   ├── Layout/             # Page layouts (Main, Dashboard)
│   ├── Routes/             # Routing configuration
│   ├── hooks/              # Custom React hooks (Axios, Admin, Cart)
│   ├── pages/              # Page components (Home, Menu, Admin, etc.)
│   ├── utils/              # Utility functions (Lazy loading, Aos)
│   ├── App.css             # Global styles
│   └── main.jsx            # Entry point
├── vercel.json             # Vercel deployment config
└── vite.config.js          # Vite optimization config
```

## 🛠️ Development Setup

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run locally**:
    ```bash
    npm run dev
    ```
4.  **Build for production**:
    ```bash
    npm run build
    ```

---
*Created with ❤️ by the MadeBest Development Team.*
