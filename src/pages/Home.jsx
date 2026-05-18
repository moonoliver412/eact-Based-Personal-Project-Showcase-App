import { Link } from "react-router-dom";

// Landing page. A navy hero panel states what the portal is for, followed by
// three numbered feature cards on the sage surface below it.
export default function Home() {
  return (
    <section className="home">
      <div className="hero panel bg-navy">
        <span className="eyebrow">Store operations</span>
        <h1 className="hero-title">
          The admin <em>product</em> portal
        </h1>
        <p className="hero-sub">
          Manage the e-commerce catalog from one place. Add new products,
          update pricing and stock levels, search the inventory, and remove
          items that are no longer for sale.
        </p>
        <div className="hero-actions">
          <Link to="/products" className="btn btn-primary">
            Browse Products
            <span aria-hidden="true">→</span>
          </Link>
          <Link to="/products/new" className="btn btn-outline">
            Add a Product
          </Link>
        </div>
      </div>

      <div className="section-head">
        <span className="eyebrow">Toolkit</span>
        <h2>Everything the catalog needs</h2>
      </div>

      <div className="feature-grid">
        <div className="feature">
          <span className="feature-num">001</span>
          <h3>Manage catalog</h3>
          <p>View every product in the store at a glance.</p>
        </div>
        <div className="feature">
          <span className="feature-num">002</span>
          <h3>Update details</h3>
          <p>Change price, stock, and descriptions in seconds.</p>
        </div>
        <div className="feature">
          <span className="feature-num">003</span>
          <h3>Quick search</h3>
          <p>Find any product instantly as you type.</p>
        </div>
      </div>
    </section>
  );
}
