import React, { memo } from 'react';

// Modern Loading component with bouncing dots
const Loading = memo(() => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="relative flex space-x-3">
        {/* Bouncing dots */}
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="w-4 h-4 bg-orange-500 rounded-full"
            style={{
              animation: 'bounce 1.4s ease-in-out infinite',
              animationDelay: `${index * 0.16}s`,
              willChange: 'transform'
            }}
          />
        ))}
      </div>
      
      {/* Logo or text */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold text-orange-600 animate-pulse">MadeBest</h2>
        <p className="text-sm text-gray-500 mt-2">Loading delicious experience...</p>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0) translateY(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1) translateY(-20px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
});

Loading.displayName = 'Loading';

export default Loading;