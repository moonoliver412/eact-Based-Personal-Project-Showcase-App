import { NavLink } from "react-router-dom";

// Top navigation bar. NavLink automatically adds an "active" class to the
// link that matches the current route, which the stylesheet highlights.
export default function NavBar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="brand">
        🛒 Admin Portal
      </NavLink>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/products/new">Add Product</NavLink>
      </nav>
    </header>
  );
}
