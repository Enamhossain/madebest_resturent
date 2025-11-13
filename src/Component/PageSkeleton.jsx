import React, { memo } from 'react';

// Generic page skeleton loader
const PageSkeleton = memo(({ type = 'default' }) => {
  if (type === 'contact') {
    return (
      <div className="animate-pulse">
        {/* Hero Skeleton */}
        <div className="bg-gray-300 h-64"></div>
        
        {/* Form Skeleton */}
        <div className="container mx-auto px-4 py-8">
          <div className="h-8 w-48 bg-gray-300 rounded mb-6"></div>
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-10 w-32 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Info Cards Skeleton */}
        <div className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <div className="h-8 w-64 bg-gray-300 rounded mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg p-6">
                  <div className="h-12 w-12 bg-gray-300 rounded mb-4"></div>
                  <div className="h-6 w-24 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'shop') {
    return (
      <div className="animate-pulse">
        {/* Hero Skeleton */}
        <div className="bg-gray-300 h-96"></div>
        
        {/* Content Skeleton */}
        <div className="container mx-auto px-4 py-20">
          <div className="h-10 w-64 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Images Skeleton */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-64 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default skeleton
  return (
    <div className="animate-pulse p-8">
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-300 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
        <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
});

PageSkeleton.displayName = 'PageSkeleton';

export default PageSkeleton;

