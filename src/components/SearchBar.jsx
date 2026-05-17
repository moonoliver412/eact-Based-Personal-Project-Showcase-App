// Controlled search input. The parent owns the value and is told about every
// change, which keeps this component simple and easy to test.
export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      className="search-bar"
      placeholder="Search products by name or category..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search products"
    />
  );
}
