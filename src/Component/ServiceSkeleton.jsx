import React, { memo } from 'react';

// Skeleton loader for Service component
const ServiceSkeleton = memo(() => {
  return (
    <div className="p-8 space-y-8">
      {/* Header Skeleton */}
      <div className="text-center animate-pulse">
        <div className="h-8 w-48 bg-gray-300 rounded mx-auto mb-2"></div>
        <div className="h-4 w-32 bg-gray-200 rounded mx-auto"></div>
      </div>

      {/* Service Cards Skeleton */}
      {[1, 2, 3].map((item) => (
        <article
          key={item}
          className="flex flex-wrap container mx-auto bg-white transition drop-shadow-xl animate-pulse"
        >
          <div className="md:basis-1/2">
            <div className="h-60 w-full bg-gray-300 rounded"></div>
          </div>
          <div className="block md:flex md:flex-1 md:flex-col p-4 sm:p-6">
            <div className="space-y-3">
              <div className="h-6 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
              <div className="h-10 w-24 bg-gray-300 rounded-full mt-4"></div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
});

ServiceSkeleton.displayName = 'ServiceSkeleton';

export default ServiceSkeleton;

