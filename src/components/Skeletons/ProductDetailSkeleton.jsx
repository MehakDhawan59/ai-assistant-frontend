import React from "react";

const ProductDetailSkeleton = () => {
  return (
    <div className="animate-pulse p-6 max-w-6xl mx-auto">
      {/* Top Section: Image + Product Info + Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Product Image */}
        <div className="bg-gray-200 rounded-xl w-full h-96"></div>

        {/* Middle: Product Title, Rating, Price */}
        <div className="flex flex-col gap-3 col-span-1 lg:col-span-1">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-6 w-64 bg-gray-300 rounded"></div>
          <div className="h-6 w-56 bg-gray-200 rounded"></div>

          <div className="flex gap-2 items-center mt-2">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>

          <div className="h-8 w-28 bg-gray-300 rounded mt-4"></div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>

        {/* Right: Price + Add to Cart */}
        <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
          <div className="h-5 w-24 bg-gray-300 rounded"></div>
          <div className="h-6 w-28 bg-gray-200 rounded"></div>
          <div className="h-3 w-40 bg-gray-200 rounded"></div>
          <div className="h-4 w-20 bg-gray-300 rounded"></div>

          <div className="mt-4 h-10 bg-yellow-300 rounded-lg"></div>
          <div className="h-10 bg-orange-300 rounded-lg"></div>
          <div className="h-4 w-24 bg-gray-200 rounded mt-2"></div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-8 border-gray-300" />

      {/* Bottom: Tabs + Product Details */}
      <div className="space-y-6">
        <div className="flex gap-6 border-b pb-2">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>

        {/* Product Details Text Lines */}
        <div className="space-y-3">
          <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
