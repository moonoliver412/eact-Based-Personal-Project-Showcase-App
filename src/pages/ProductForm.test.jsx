import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ProductForm from "./ProductForm";
import { useProductsContext } from "../context/ProductsContext";

vi.mock("../context/ProductsContext", () => ({
  useProductsContext: vi.fn(),
}));

describe("ProductForm page", () => {
  it("sends the entered values to addProduct on submit", async () => {
    const addProduct = vi.fn().mockResolvedValue({ id: 99 });
    useProductsContext.mockReturnValue({ addProduct });

    render(
      <MemoryRouter>
        <ProductForm />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText("Name"), "Desk Organizer");
    await userEvent.type(screen.getByLabelText("Category"), "Office");
    await userEvent.type(screen.getByLabelText("Price ($)"), "12.5");
    await userEvent.type(screen.getByLabelText("Stock"), "7");
    await userEvent.type(
      screen.getByLabelText("Description"),
      "Keeps the desk tidy."
    );
    await userEvent.click(
      screen.getByRole("button", { name: /save product/i })
    );

    expect(addProduct).toHaveBeenCalledTimes(1);
    expect(addProduct).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Desk Organizer",
        category: "Office",
        price: 12.5,
        stock: 7,
      })
    );
  });
});
