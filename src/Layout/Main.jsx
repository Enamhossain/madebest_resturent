import React, { memo, useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../shared/Footer/Footer'
import Navbar from '../shared/Navbar/Navbar'

const Main = memo(() => {
  const location = useLocation()
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  
  const hideHeaderFooter = location.pathname.includes('login') ||  location.pathname.includes('signup')

  useEffect(() => {
    // Start loading bar on route change
    setShowLoader(true);
    setProgress(30);
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(timer);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    const completionTimer = setTimeout(() => {
      clearInterval(timer);
      setProgress(100);
      setTimeout(() => {
        setShowLoader(false);
        setProgress(0);
      }, 300);
    }, 600);

    return () => {
      clearInterval(timer);
      clearTimeout(completionTimer);
    };
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Top Loading Bar */}
      <div 
        id="top-loading-bar" 
        className="fixed top-0 left-0 h-[3px] bg-primary z-[9999] transition-all duration-300 ease-out"
        style={{ 
          width: `${progress}%`, 
          opacity: showLoader ? 1 : 0,
          boxShadow: '0 0 10px rgba(249, 115, 22, 0.5)'
        }}
      />
      
      {!hideHeaderFooter && <Navbar />}
      
      <main className="flex-grow animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Outlet />
      </main>

      {!hideHeaderFooter && <Footer />}
    </div>
  )
})

Main.displayName = 'Main';

export default Main;
