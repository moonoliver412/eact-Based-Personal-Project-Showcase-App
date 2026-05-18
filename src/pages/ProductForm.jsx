import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductsContext } from "../context/ProductsContext";

const EMPTY_FORM = {
  name: "",
  category: "",
  price: "",
  stock: "",
  image: "",
  description: "",
};

// Page with a controlled form for adding a new product (a CREATE request).
// The form runs on one continuous navy surface — sage-on-navy fields.
export default function ProductForm() {
  const { addProduct } = useProductsContext();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // One handler keeps every field in sync with state by its `name` attribute.
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const created = await addProduct({
        name: form.name.trim(),
        category: form.category.trim(),
        description: form.description.trim(),
        image: form.image.trim() || "https://picsum.photos/seed/new/400/300",
        price: Number(form.price),
        stock: Number(form.stock),
      });
      // Send the admin straight to the new product's detail page.
      navigate(`/products/${created.id}`);
    } catch {
      setError("Could not save the product. Make sure the server is running.");
      setSubmitting(false);
    }
  }

  return (
    <section className="panel bg-navy">
      <span className="eyebrow">New entry</span>
      <h1>Add a New Product</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price ($)
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Stock
          <input
            name="stock"
            type="number"
            min="0"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image URL
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://… (optional)"
          />
        </label>
        <label>
          Description
          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            required
          />
        </label>
        {error && <p className="status error">{error}</p>}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Saving…" : "Save Product"}
        </button>
      </form>
    </section>
  );
}
