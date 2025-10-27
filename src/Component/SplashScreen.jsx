import React, { useEffect, useState } from 'react';

const SplashScreen = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 w-24 h-24">
          <div className="absolute inset-0 border-4 border-transparent border-t-orange-400 rounded-full animate-spin" style={{ animationDuration: '1s' }}></div>
        </div>
        
        {/* Middle rotating ring */}
        <div className="absolute inset-3 w-18 h-18">
          <div className="absolute inset-0 border-4 border-transparent border-r-amber-300 rounded-full animate-spin" style={{ animationDuration: '0.8s', animationDirection: 'reverse' }}></div>
        </div>
        
        {/* Inner pulsing circle */}
        <div className="absolute inset-6 w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-300 rounded-full animate-pulse shadow-lg"></div>
      </div>
      
      {/* Brand and loading text */}
      <div className="absolute bottom-32 text-center">
        <h2 className="text-4xl font-bold text-orange-600 mb-2 tracking-wide">
          MadeBest
        </h2>
        <div className="flex items-center justify-center space-x-1">
          <p className="text-gray-600 text-sm">Loading delicious experience</p>
          <span className="text-orange-500 font-bold text-sm">{dots}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-20 w-64 h-1 bg-orange-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 rounded-full animate-progress"></div>
      </div>
    </div>
  );
};

export default SplashScreen;

