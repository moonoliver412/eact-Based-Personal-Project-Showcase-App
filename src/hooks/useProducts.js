import { useState, useEffect, useCallback } from "react";
import * as api from "../api";

/**
 * Custom hook that owns the product catalog.
 *
 * It loads products from the simulated backend on mount and exposes the four
 * CRUD actions. Each action updates local state after the request succeeds, so
 * the UI stays in sync with the server without a full reload.
 */
export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // READ — load the whole catalog. Wrapped in useCallback so it is a stable
  // dependency for the effect below and can also be re-run on demand.
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getProducts();
      setProducts(data);
      setError(null);
    } catch {
      setError("Could not load products. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // CREATE — add a product and append it to local state.
  async function addProduct(product) {
    const created = await api.createProduct(product);
    setProducts((prev) => [...prev, created]);
    return created;
  }

  // UPDATE — patch a product and replace it in local state.
  async function editProduct(id, updates) {
    const updated = await api.updateProduct(id, updates);
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    return updated;
  }

  // DELETE — remove a product and filter it out of local state.
  async function removeProduct(id) {
    await api.deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return {
    products,
    loading,
    error,
    addProduct,
    editProduct,
    removeProduct,
    reload: load,
  };
}
