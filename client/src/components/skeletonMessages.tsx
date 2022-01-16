import React from 'react';

const SkeletonMessages = () => {
  return (
    <div className="py-16 px-6">
      <div className="w-full flex mb-5">
        <div className="h-12 w-12 bg-gray-200 animate-pulse rounded" />
        <div className="px-4 pb-4 pt-2 max-w-xl text-gray-300 bg-gray-700 ml-3 rounded-r-3xl rounded-bl-3xl">
          <div className="h-3 mb-1 w-16 bg-gray-200 animate-pulse rounded" />
          <div className="h-3.5 mb-1 w-96 bg-gray-200 animate-pulse rounded" />
          <div className="h-3.5 w-72 float-left mr-1 bg-gray-200 animate-pulse rounded" />
          <div className="h-3 w-8 float-left bg-gray-300 animate-pulse rounded" />
        </div>
      </div>
      <div className="w-full flex flex-row-reverse mb-5">
        <div className="h-12 w-12 bg-gray-200 animate-pulse rounded" />
        <div className="px-4 pb-4 pt-2 max-w-xl text-gray-300 bg-purple-700 mr-3 rounded-l-3xl rounded-br-3xl">
          <div className="h-3 mb-1 w-24 bg-gray-200 animate-pulse rounded" />
          <div className="h-3 w-8 float-right ml-1 bg-gray-300 animate-pulse rounded" />
          <div className="h-3.5 mb-1 w-80 float-right bg-gray-200 animate-pulse rounded" />
        </div>
      </div>
      <div className="w-full flex mb-2">
        <div className="h-12 w-12 bg-gray-200 animate-pulse rounded" />
        <div className="px-4 pb-4 pt-2 max-w-xl text-gray-300 bg-gray-700 ml-3 rounded-r-3xl rounded-bl-3xl">
          <div className="h-3 mb-1 w-16 bg-gray-200 animate-pulse rounded" />
          <div className="h-3.5 mb-1 w-48 float-left mr-1 bg-gray-200 animate-pulse rounded" />
          <div className="h-3 w-8 float-left bg-gray-300 animate-pulse rounded" />
        </div>
      </div>
      <div className="w-full flex mb-5">
        <div className="invisible h-12 w-12 bg-gray-200 animate-pulse rounded" />
        <div className="px-4 pb-4 pt-2 max-w-xl text-gray-300 bg-gray-700 ml-3 rounded-r-3xl rounded-bl-3xl">
          <div className="h-3 mb-1 w-16 bg-gray-200 animate-pulse rounded" />
          <div className="h-3.5 mb-1 w-72 float-left mr-1 bg-gray-200 animate-pulse rounded" />
          <div className="h-3 w-8 float-left bg-gray-300 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}

export default SkeletonMessages;
