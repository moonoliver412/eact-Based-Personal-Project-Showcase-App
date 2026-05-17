import { Link } from "react-router-dom";

// A single product tile shown in the catalog grid. The Link routes to the
// product's detail page where it can be edited or deleted.
export default function ProductCard({ product }) {
  return (
    <article className="card">
      <img src={product.image} alt={product.name} className="card-img" />
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="card-category">{product.category}</p>
        <p className="card-price">${Number(product.price).toFixed(2)}</p>
        <Link to={`/products/${product.id}`} className="btn btn-secondary">
          View / Edit
        </Link>
      </div>
    </article>
  );
}
