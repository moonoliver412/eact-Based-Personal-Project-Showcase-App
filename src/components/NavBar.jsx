import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// Floating pill navigation. The Romanesco wordmark sits on the left, the
// route links group in the centre, and a sage CTA pill on the right. On
// scroll the pill tightens; on mobile the links collapse into a fullscreen
// navy overlay opened by the burger button.
export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Tighten the pill once the page has scrolled a little.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={scrolled ? "navbar scrolled" : "navbar"}>
      <NavLink to="/" className="brand" onClick={closeMenu}>
        Portal<span>.</span>
      </NavLink>

      <nav className={menuOpen ? "nav-links open" : "nav-links"}>
        <NavLink to="/" end onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/products" onClick={closeMenu}>
          Products
        </NavLink>
      </nav>

      <div className="nav-right">
        <NavLink to="/products/new" className="nav-cta" onClick={closeMenu}>
          Add Product
        </NavLink>
        <button
          type="button"
          className={menuOpen ? "nav-burger open" : "nav-burger"}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
