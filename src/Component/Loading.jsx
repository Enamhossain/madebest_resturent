import React, { memo } from 'react';

const Loading = memo(() => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] py-24 bg-transparent">
      <div className="relative">
        {/* Dynamic Triple Ring Spinner */}
        <div className="w-20 h-20 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
        <div className="absolute inset-2 border-4 border-transparent border-r-amber-400 rounded-full animate-spin [animation-duration:0.8s] [animation-direction:reverse]" />
        <div className="absolute inset-4 border-4 border-transparent border-l-orange-300 rounded-full animate-spin [animation-duration:0.6s]" />
      </div>
      
      <div className="mt-12 text-center space-y-3">
        <h2 className="text-3xl font-black text-foreground tracking-tighter animate-pulse">
           Made<span className="text-primary italic">Best</span>
        </h2>
        <div className="flex items-center justify-center gap-2">
           <span className="text-muted-foreground text-sm font-medium uppercase tracking-[0.2em]">Preparing Excellence</span>
           <div className="flex gap-1">
              <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0s]" />
              <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
           </div>
        </div>
      </div>
    </div>
  );
});

Loading.displayName = 'Loading';

export default Loading;