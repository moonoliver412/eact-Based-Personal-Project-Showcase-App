import { Link } from "react-router-dom";

// Catch-all page for any route that does not exist.
export default function NotFound() {
  return (
    <section className="status">
      <h1>404 — Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </section>
  );
}
