import React, { memo } from 'react';

const Loading = memo(() => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] py-24 bg-transparent animate-in fade-in duration-700">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Triple Ring System */}
        <div className="absolute inset-0 border-2 border-transparent border-t-orange-500 rounded-full animate-spin [animation-duration:1.2s] [animation-timing-function:cubic-bezier(0.5,0,0.5,1)]" />
        <div className="absolute inset-2 border-2 border-transparent border-t-amber-400 rounded-full animate-spin [animation-duration:1.5s] [animation-direction:reverse]" />
        <div className="absolute inset-4 border-2 border-transparent border-t-orange-600 rounded-full animate-spin [animation-duration:0.8s]" />
        
        {/* Center Logo Icon */}
        <div className="w-12 h-12 bg-white rounded-full shadow-lg shadow-orange-100 flex items-center justify-center z-10 animate-pulse">
           <svg className="w-6 h-6 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 9H9V2H7V9H5V2H3V9C3 11.12 4.66 12.84 6.75 12.97V22H9.25V12.97C11.34 12.84 13 11.12 13 9V2H11V9ZM16 6V14H18.5V22H21V2C18.24 2 16 4.24 16 6Z"/>
           </svg>
        </div>
      </div>
      
      <div className="mt-12 text-center space-y-4">
        <h2 className="text-4xl font-black text-gray-900 tracking-tighter flex items-center justify-center gap-1">
           Made<span className="text-orange-500 italic">Best</span>
        </h2>
        
        <div className="flex flex-col items-center gap-3">
           <div className="w-48 h-1 bg-orange-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 bg-[length:200%_100%] animate-shimmer rounded-full" />
           </div>
           <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
              Preparing Excellence
           </span>
        </div>
      </div>
    </div>
  );
});

Loading.displayName = 'Loading';

export default Loading;