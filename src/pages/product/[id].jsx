// react imports
import React from "react";
//hooks
import useFetch from "../../hooks/useFetch";
//components
import Layout from "../../Layout";
import AIChatWidget from "../../components/AIChatWidget";
import ProductDetailSkeleton from "../../components/Skeletons/ProductDetailSkeleton";
import API_BASE_URL from "../../config/api";
//icons
import { Star, MapPin, Share2 } from "lucide-react";
//library
import moment from "moment";

const ProductDetailsPage = () => {
  const [activeTab, setActiveTab] = React.useState("details");
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const id = pathParts[pathParts.length - 1];
  const {
    data: product,
    loading,
    error,
  } = useFetch(`${API_BASE_URL}/api/products/${id}`);
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={
              star <= rating
                ? "fill-yellow-500 text-yellow-500"
                : "text-gray-300"
            }
          />
        ))}
      </div>
    );
  };
  // Assuming `reviews` is an array of objects like: { rating: number, ... }

  const RatingDistribution = ({ reviews }) => {
    // 1. Calculate counts per rating (1-5 stars)
    const ratingCounts = [1, 2, 3, 4, 5].map((star) => ({
      star,
      count: reviews.filter((r) => r.rating === star).length,
    }));

    // 2. Total number of reviews
    const totalReviews = reviews.length;

    // 3. Add percentage dynamically
    const ratingsWithPercentage = ratingCounts.map((r) => ({
      ...r,
      percentage: totalReviews ? Math.round((r.count / totalReviews) * 100) : 0,
    }));

    return (
      <div className="space-y-2 mb-8">
        {ratingsWithPercentage
          .sort((a, b) => b.star - a.star) // descending stars
          .map(({ star, percentage }) => (
            <div key={star} className="flex items-center gap-3">
              <span className="text-sm text-blue-600 hover:underline cursor-pointer w-16">
                {star} star
              </span>
              <div className="flex-1 bg-gray-200 rounded-full h-5">
                <div
                  className="bg-yellow-400 h-5 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12">{percentage}%</span>
            </div>
          ))}
      </div>
    );
  };
  // show skeleton when loading data
  if (!product || loading)
    return (
      <div className="text-center mt-20">
        <ProductDetailSkeleton />
      </div>
    );

  //TODO - Error Boundary
  if (error)
    return <div className="text-center mt-20 text-red-500">Error: {error}</div>;
  return (
    <Layout>
      <div className="p-8 flex flex-col md:flex-row gap-10 max-w-5xl mx-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Image Gallery */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-lg p-4 sticky top-4">
                <div className="relative mb-4">
                  <button className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
                    <Share2 size={20} />
                  </button>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-lg p-6">
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Visit the {product.brand} Store
                </a>
                <h1 className="text-2xl font-semibold text-gray-900 mt-2 mb-3">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-semibold">
                    {product.rating}
                  </span>
                  {renderStars(product.rating)}
                  <span className="text-blue-600 hover:underline cursor-pointer text-sm">
                    {product.totalRatings} ratings
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-red-600 text-2xl font-medium">
                      -{product.discount}%
                    </span>
                    <span className="text-3xl font-semibold text-gray-900">
                      ₹{product.price}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    M.R.P.: <span className="line-through">₹{product.mrp}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Inclusive of all taxes
                  </p>
                </div>
              </div>
            </div>

            {/* Buy Box */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg p-6 border sticky top-4">
                <div className="text-3xl font-semibold text-gray-900 mb-2">
                  ₹{product.price}
                  <sup className="text-sm">00</sup>
                </div>

                <div className="mb-4">
                  <span className="font-semibold text-sm">FREE delivery </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {product.delivery}
                  </span>
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:underline ml-1"
                  >
                    Details
                  </a>
                </div>

                <div className="flex items-start gap-2 text-sm mb-4">
                  <MapPin size={16} className="text-gray-600 mt-0.5" />
                  <div>
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      Delivering to Ludhiana 141007
                    </span>
                    <span className="text-gray-600"> - </span>
                    <a href="#" className="text-blue-600 hover:underline">
                      Update location
                    </a>
                  </div>
                </div>

                <div className="text-lg font-semibold text-green-700 mb-4">
                  In stock
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Ships from</span>
                    <span className="font-medium">Amazon</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Sold by</span>
                    <span className="font-medium text-blue-600">
                      {product.seller}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Payment</span>
                    <span className="font-medium text-blue-600">
                      Secure transaction
                    </span>
                  </div>
                </div>

                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2.5 rounded-full mb-2 transition">
                  Add to Cart
                </button>
                <button className="w-full bg-orange-400 hover:bg-orange-500 text-black font-medium py-2.5 rounded-full mb-3 transition">
                  Buy Now
                </button>

                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Add gift options</span>
                </label>

                <button className="w-full mt-3 border border-gray-300 rounded-lg py-2 text-sm hover:bg-gray-50 transition">
                  Add to Wish List
                </button>
              </div>
            </div>
          </div>

          {/* Product Details & Reviews */}
          <div className="mt-8 bg-white rounded-lg">
            {/* Tabs */}
            <div className="border-b">
              <div className="flex gap-8 px-6">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`py-4 font-medium border-b-2 transition ${
                    activeTab === "details"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Product Details
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`py-4 font-medium border-b-2 transition ${
                    activeTab === "reviews"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Customer Reviews
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === "details" ? (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">
                    Product Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {product?.description?.split(". ").map((point, idx) => (
                      <p key={idx} className="text-gray-700 leading-7">
                        • {point.trim()}.
                      </p>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">
                      Customer Reviews
                    </h2>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        {renderStars(product.rating)}
                        <span className="text-2xl font-semibold">
                          {product.rating} out of 5
                        </span>
                      </div>
                      <span className="text-gray-600">
                        {product.totalRatings} global ratings
                      </span>
                    </div>

                    {/* Rating Distribution */}
                    <div className="space-y-2 mb-8">
                      <RatingDistribution reviews={product.reviews} />
                    </div>
                  </div>

                  {/* Review List */}
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
                            {review.reviewerName.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">
                              {review.reviewerName}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              {renderStars(review.rating)}
                              <span className="text-sm font-semibold text-gray-900">
                                {review.title}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              Reviewed in India on{" "}
                              {moment(review.updatedAt).format(
                                "DD/MM/YYYY hh:mm A"
                              )}
                            </div>
                            <p className="text-gray-700 mt-3">
                              {review.comment}
                            </p>
                            <div className="flex items-center gap-4 mt-4 text-sm">
                              <button className="text-gray-600 hover:text-gray-900">
                                Helpful
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                Report
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AIChatWidget productId={id} />
    </Layout>
  );
};

export default ProductDetailsPage;
