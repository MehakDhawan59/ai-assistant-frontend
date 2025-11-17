import React from "react";

const SkeletonProductCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white border border-gray-200 rounded-2xl shadow-sm p-4 flex flex-col"
        >
          {/* Image placeholder */}
          <div className="bg-gray-200 h-56 w-full rounded-lg mb-4"></div>

          {/* Brand */}
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>

          {/* Product Title */}
          <div className="h-5 bg-gray-200 rounded w-2/3 mb-3"></div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="h-3 w-3 rounded-full bg-gray-300"></div>
            <div className="h-3 w-12 bg-gray-200 rounded"></div>
          </div>

          {/* Price & discount */}
          <div className="flex items-center gap-2 mb-2">
            <div className="h-5 w-16 bg-gray-200 rounded"></div>
            <div className="h-4 w-12 bg-gray-200 rounded"></div>
          </div>

          {/* Delivery text */}
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>

          {/* Add to cart button */}
          <div className="h-10 bg-gray-300 rounded-md"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonProductCard;
