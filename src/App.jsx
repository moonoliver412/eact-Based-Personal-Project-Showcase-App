import { Routes, Route } from "react-router-dom";
import { ProductsProvider } from "./context/ProductsContext.jsx";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import ProductList from "./pages/ProductList.jsx";
import ProductForm from "./pages/ProductForm.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import NotFound from "./pages/NotFound.jsx";

// App defines the four client-side routes. ProductsProvider keeps the product
// data in one place so every route reads and writes the same catalog.
export default function App() {
  return (
    <ProductsProvider>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </ProductsProvider>
  );
}
