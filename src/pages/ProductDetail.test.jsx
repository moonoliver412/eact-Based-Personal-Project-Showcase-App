import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import { useProductsContext } from "../context/ProductsContext";

vi.mock("../context/ProductsContext", () => ({
  useProductsContext: vi.fn(),
}));

const product = {
  id: 1,
  name: "Wireless Headphones",
  category: "Audio",
  price: 89.99,
  stock: 5,
  description: "Great sound.",
  image: "a.jpg",
};

function renderDetail(state) {
  useProductsContext.mockReturnValue(state);
  return render(
    <MemoryRouter initialEntries={["/products/1"]}>
      <Routes>
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products" element={<div>Products list</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("ProductDetail page", () => {
  it("displays the selected product", () => {
    renderDetail({
      products: [product],
      loading: false,
      editProduct: vi.fn(),
      removeProduct: vi.fn(),
    });

    expect(
      screen.getByRole("heading", { name: "Wireless Headphones" })
    ).toBeInTheDocument();
    expect(screen.getByText("$89.99")).toBeInTheDocument();
  });

  it("saves edited values through editProduct (UPDATE)", async () => {
    const editProduct = vi.fn().mockResolvedValue({});
    renderDetail({
      products: [product],
      loading: false,
      editProduct,
      removeProduct: vi.fn(),
    });

    await userEvent.click(screen.getByRole("button", { name: /^edit$/i }));
    const priceInput = screen.getByLabelText("Price ($)");
    await userEvent.clear(priceInput);
    await userEvent.type(priceInput, "75");
    await userEvent.click(
      screen.getByRole("button", { name: /save changes/i })
    );

    expect(editProduct).toHaveBeenCalledWith(
      1,
      expect.objectContaining({ price: 75 })
    );
  });
});
