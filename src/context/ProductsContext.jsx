import { createContext, useContext } from "react";
import useProducts from "../hooks/useProducts";

// Context lets any page read the catalog and CRUD actions without prop drilling.
const ProductsContext = createContext(null);

/**
 * Provider that runs the useProducts hook once and shares the result with the
 * whole component tree. Wrapping the app in this means the catalog is fetched
 * a single time and every route works against the same data.
 */
export function ProductsProvider({ children }) {
  const products = useProducts();
  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
}

// Convenience hook so components can grab the context with a clear error if
// they are accidentally rendered outside the provider.
export function useProductsContext() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProductsContext must be used within a ProductsProvider");
  }
  return context;
}
