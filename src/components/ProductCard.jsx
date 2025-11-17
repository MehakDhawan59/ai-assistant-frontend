import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className=" border rounded-2xl p-3 shadow-md hover:shadow-lg transition cursor-pointer  bg-white"
      key={product._id}
    >
      <div
        onClick={() => navigate(`/product/${product._id}`)}
        className="relative group"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-60 object-cover rounded-lg hover:scale-105 transition duration-300"
        />

        <h3 className="font-bold text-sm text-gray-800">
          {product.brand || "ONLY"}
        </h3>
        <p className="text-gray-700 text-sm truncate">{product.title}</p>

        <div className="flex items-center mt-1">
          <span className="text-yellow-500 text-sm">★</span>
          <span className="ml-1 text-sm">{product.rating}</span>
        </div>

        <div className="mt-1 text-lg font-semibold text-gray-900">
          ₹{product.price}
          <span className="ml-2 line-through text-gray-400 text-sm">
            ₹{product.mrp}
          </span>
          <span className="ml-1 text-green-600 text-sm font-medium">
            ({product.discountPercentage}% off)
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-1">
          Free delivery {product.deliveryDate}
        </p>
        {/* Hover Overlay */}
        {/* <div className="absolute inset-0  flex items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-sm font-medium p-2 bg-gray-500">
            Click on the product to learn more about it with AI assistance
          </p>
        </div> */}
      </div>

      <button
        className="mt-2 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-1.5 rounded-md cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log("Add to cart clicked");
        }}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
