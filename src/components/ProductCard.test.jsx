import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "./ProductCard";

const product = {
  id: 7,
  name: "Yoga Mat",
  category: "Fitness",
  price: 25,
  image: "yoga.jpg",
};

describe("ProductCard", () => {
  it("shows the product name, category and formatted price", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );

    expect(screen.getByText("Yoga Mat")).toBeInTheDocument();
    expect(screen.getByText("Fitness")).toBeInTheDocument();
    expect(screen.getByText("$25.00")).toBeInTheDocument();
  });

  it("links to the matching detail route", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: /view \/ edit/i })
    ).toHaveAttribute("href", "/products/7");
  });
});
