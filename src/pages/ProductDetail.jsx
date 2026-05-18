import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useProductsContext } from "../context/ProductsContext";

// Detail page for a single product. The admin can switch to an edit form to
// change values (UPDATE / PATCH) or remove the product entirely (DELETE).
export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading, editProduct, removeProduct } =
    useProductsContext();

  const product = products.find((p) => String(p.id) === String(id));

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(null);
  const [busy, setBusy] = useState(false);

  if (loading) return <p className="status">Loading…</p>;

  if (!product) {
    return (
      <section className="notfound">
        <p className="status error">Product not found.</p>
        <Link to="/products" className="btn btn-secondary">
          Back to Products
        </Link>
      </section>
    );
  }

  // Copy the current values into a draft so editing does not mutate state.
  function startEdit() {
    setDraft({
      price: product.price,
      stock: product.stock,
      category: product.category,
      description: product.description,
    });
    setEditing(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setBusy(true);
    await editProduct(product.id, {
      price: Number(draft.price),
      stock: Number(draft.stock),
      category: draft.category,
      description: draft.description,
    });
    setBusy(false);
    setEditing(false);
  }

  async function handleDelete() {
    if (!window.confirm(`Delete "${product.name}"?`)) return;
    setBusy(true);
    await removeProduct(product.id);
    navigate("/products");
  }

  return (
    <section className="detail">
      <Link to="/products" className="back-link">
        ← Back to Products
      </Link>
      <div className="detail-grid">
        <img src={product.image} alt={product.name} className="detail-img" />
        <div>
          {!editing ? (
            <>
              <p className="card-category">{product.category}</p>
              <h1>{product.name}</h1>
              <p className="detail-price">
                ${Number(product.price).toFixed(2)}
              </p>
              <p className="detail-stock">In stock — {product.stock}</p>
              <p className="detail-desc">{product.description}</p>
              <div className="detail-actions">
                <button className="btn btn-primary" onClick={startEdit}>
                  Edit
                </button>
                <button
                  className="btn btn-outline"
                  onClick={handleDelete}
                  disabled={busy}
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <>
              <span className="eyebrow">Editing</span>
              <h1>{product.name}</h1>
              <form className="form" onSubmit={handleSave}>
                <label>
                  Price ($)
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={draft.price}
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
                    value={draft.stock}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Category
                  <input
                    name="category"
                    value={draft.category}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Description
                  <textarea
                    name="description"
                    rows="3"
                    value={draft.description}
                    onChange={handleChange}
                    required
                  />
                </label>
                <div className="detail-actions">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={busy}
                  >
                    {busy ? "Saving…" : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
