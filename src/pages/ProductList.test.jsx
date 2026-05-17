import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ProductList from "./ProductList";
import { useProductsContext } from "../context/ProductsContext";

// Mock the context so the page can be tested with controlled data.
vi.mock("../context/ProductsContext", () => ({
  useProductsContext: vi.fn(),
}));

const sample = [
  { id: 1, name: "Wireless Headphones", category: "Audio", price: 89.99, image: "a.jpg" },
  { id: 2, name: "Yoga Mat", category: "Fitness", price: 25, image: "b.jpg" },
];

function renderList(state) {
  useProductsContext.mockReturnValue(state);
  return render(
    <MemoryRouter>
      <ProductList />
    </MemoryRouter>
  );
}

describe("ProductList page", () => {
  it("shows a loading message while products are being fetched", () => {
    renderList({ products: [], loading: true, error: null });
    expect(screen.getByText(/loading products/i)).toBeInTheDocument();
  });

  it("renders every product once loaded", () => {
    renderList({ products: sample, loading: false, error: null });
    expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();
    expect(screen.getByText("Yoga Mat")).toBeInTheDocument();
  });

  it("filters the list as the user searches", async () => {
    renderList({ products: sample, loading: false, error: null });

    await userEvent.type(screen.getByLabelText("Search products"), "yoga");

    // The search term is debounced, so wait for the non-match to disappear.
    await waitFor(() =>
      expect(screen.queryByText("Wireless Headphones")).not.toBeInTheDocument()
    );
    expect(screen.getByText("Yoga Mat")).toBeInTheDocument();
  });
});
