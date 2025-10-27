import React from 'react'

const SkeletonCard = () => {
  return (
    <div className="max-w-md mx-auto bg-gray-300 md:rounded-l-full shadow-lg overflow-hidden md:max-w-2xl mt-3 relative animate-pulse">
    <div className="flex p-4 space-x-4 sm:px-8 shadow-lg bg-gray-200">
      <div className="flex-shrink-0 w-16 h-16 rounded-full dark:bg-gray-300"></div>
      <div className="flex-1 py-2 space-y-4">
        <div className="w-full h-3 rounded dark:bg-gray-300"></div>
        <div className="w-5/6 h-3 rounded dark:bg-gray-300"></div>
      </div>
    </div>
    <div className="p-4 space-y-4 sm:px-8 max-w-md mx-auto bg-gray-300 md:rounded-l-full shadow-lg overflow-hidden md:max-w-2xl mt-3 relative">
      <div className="w-full h-4 rounded dark:bg-gray-300"></div>
      <div className="w-full h-4 rounded dark:bg-gray-300"></div>
      <div className="w-3/4 h-4 rounded dark:bg-gray-300"></div>
    </div>
  </div>
  )
}

export default SkeletonCard