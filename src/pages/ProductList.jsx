import { useState } from "react";
import { useProductsContext } from "../context/ProductsContext";
import useDebounce from "../hooks/useDebounce";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";

// Product catalog page. Reads products from context (a READ request runs once
// when the app mounts) and filters them with a debounced search term.
export default function ProductList() {
  const { products, loading, error } = useProductsContext();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 250);

  const term = debouncedSearch.trim().toLowerCase();
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
  );

  if (loading) return <p className="status">Loading products…</p>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <section>
      <h1>Products</h1>
      <SearchBar value={search} onChange={setSearch} />
      <p className="result-count">{filtered.length} product(s) found</p>
      {filtered.length === 0 ? (
        <p className="status">No products match your search.</p>
      ) : (
        <div className="grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
