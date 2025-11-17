// react imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//components
import ProductList from "./components/ProductList";
import ProductDetailsPage from "./pages/product/[id]";
import NotFound from "./NotFound";

function App() {
  return (
    <Router>
      <div className="h-[100vh] w-[100vw] ">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
