//components
import ProductCard from "../components/ProductCard";
import Layout from "../Layout";
import SkeletonProductCard from "./Skeletons/SkeletonProductCard";
//hooks
import useFetch from "../hooks/useFetch";
//config
import API_BASE_URL from "../config/api";

const ProductList = () => {
  const {data:products, loading, error} = useFetch(API_BASE_URL + "/api/products");

  if (loading) return <SkeletonProductCard/>;
  // TODO - Error Boundary
  if (error) return <p className="text-red-500">Error: {error}</p>;
  return (
    <Layout>
    <div className="max-w-7xl mx-auto mt-6">
      <h1 className="text-lg font-bold mb-6">All Products - <span className="text-sm text-blue-500 font-normal italic">Click on the product to learn more about it with AI Assistant</span></h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      
      </div>
    </div>
    </Layout>
  );
};

export default ProductList;
