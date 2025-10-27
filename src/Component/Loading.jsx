import React from 'react';

function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="relative">
        {/* Main spinning ring */}
        <div className="w-20 h-20 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
        
        {/* Inner rotating ring */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-4 border-amber-200 border-r-amber-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
      </div>
      
      {/* Logo or text */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold text-orange-600 animate-pulse">MadeBest</h2>
        <p className="text-sm text-gray-500 mt-2">Loading delicious experience...</p>
      </div>
    </div>
  );
}

export default Loading;
