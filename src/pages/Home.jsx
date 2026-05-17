import { Link } from "react-router-dom";

// Landing page. Explains what the portal is for and links into the main tasks.
export default function Home() {
  return (
    <section className="home">
      <h1>Admin Product Portal</h1>
      <p className="lead">
        Manage the e-commerce catalog from one place. Add new products, update
        pricing and stock levels, search the inventory, and remove items that
        are no longer for sale.
      </p>
      <div className="home-actions">
        <Link to="/products" className="btn btn-primary">
          Browse Products
        </Link>
        <Link to="/products/new" className="btn btn-secondary">
          Add a Product
        </Link>
      </div>
      <div className="feature-grid">
        <div className="feature">
          <h3>📦 Manage Catalog</h3>
          <p>View every product in the store at a glance.</p>
        </div>
        <div className="feature">
          <h3>✏️ Update Details</h3>
          <p>Change price, stock, and descriptions in seconds.</p>
        </div>
        <div className="feature">
          <h3>🔍 Quick Search</h3>
          <p>Find any product instantly as you type.</p>
        </div>
      </div>
    </section>
  );
}
