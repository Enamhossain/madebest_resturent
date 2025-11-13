import React, { memo } from 'react'

// Optimized SkeletonCard for menu items
const SkeletonCard = memo(() => {
  return (
    <div className="max-w-md mx-auto bg-gray-100 md:rounded-l-full shadow-lg overflow-hidden md:max-w-2xl mt-3 relative animate-pulse">
      <div className="md:flex">
        {/* Image skeleton */}
        <div className="md:shrink-0">
          <div className="h-56 w-full md:h-full md:w-20 bg-gray-300 rounded-md"></div>
        </div>
        {/* Content skeleton */}
        <div className="p-3 flex flex-col justify-between">
          <div>
            <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
            <div className="h-6 w-32 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-1"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          </div>
          {/* Button skeleton */}
          <div className="h-10 w-32 bg-gray-300 rounded-lg mt-2"></div>
        </div>
      </div>
    </div>
  )
})

SkeletonCard.displayName = 'SkeletonCard';

export default SkeletonCard