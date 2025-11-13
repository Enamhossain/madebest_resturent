import React, { memo } from 'react';

// Optimized SplashScreen with memo and CSS-only animations
const SplashScreen = memo(() => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="relative w-24 h-24">
        {/* Outer rotating ring - optimized with will-change */}
        <div 
          className="absolute inset-0 border-4 border-transparent border-t-orange-400 rounded-full animate-spin"
          style={{ 
            animationDuration: '1s',
            willChange: 'transform'
          }}
        />
        
        {/* Middle rotating ring */}
        <div 
          className="absolute inset-3 border-4 border-transparent border-r-amber-300 rounded-full animate-spin"
          style={{ 
            animationDuration: '0.8s', 
            animationDirection: 'reverse',
            willChange: 'transform'
          }}
        />
        
        {/* Inner pulsing circle */}
        <div 
          className="absolute inset-6 w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-300 rounded-full animate-pulse shadow-lg"
          style={{ willChange: 'opacity' }}
        />
      </div>
      
      {/* Brand and loading text - optimized positioning */}
      <div className="absolute bottom-32 text-center">
        <h2 className="text-4xl font-bold text-orange-600 mb-2 tracking-wide">
          MadeBest
        </h2>
        <div className="flex items-center justify-center">
          <p className="text-gray-600 text-sm">Loading delicious experience</p>
          <span className="text-orange-500 font-bold text-sm ml-1 animate-pulse">...</span>
        </div>
      </div>

      {/* Progress bar - optimized animation */}
      <div className="absolute bottom-20 w-64 h-1 bg-orange-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 rounded-full"
          style={{
            animation: 'progress 1.5s ease-in-out infinite',
            willChange: 'transform'
          }}
        />
      </div>
    </div>
  );
});

SplashScreen.displayName = 'SplashScreen';

export default SplashScreen;

