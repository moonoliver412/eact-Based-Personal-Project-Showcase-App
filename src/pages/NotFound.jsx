import { Link } from "react-router-dom";

// Catch-all page for any route that does not exist.
export default function NotFound() {
  return (
    <section className="notfound">
      <div className="notfound-big" aria-hidden="true">
        404
      </div>
      <h1>Page Not Found</h1>
      <p className="status">The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Go Home
        <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
