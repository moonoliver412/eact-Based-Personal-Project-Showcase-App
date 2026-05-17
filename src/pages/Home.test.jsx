import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

describe("Home page", () => {
  it("renders the heading and the calls to action", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /admin product portal/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /browse products/i })
    ).toHaveAttribute("href", "/products");
    expect(
      screen.getByRole("link", { name: /add a product/i })
    ).toHaveAttribute("href", "/products/new");
  });
});
