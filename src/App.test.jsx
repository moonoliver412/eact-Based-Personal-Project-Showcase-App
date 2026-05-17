import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// Mock the API layer so the routing test does not need a running server.
vi.mock("./api", () => ({
  getProducts: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Audio",
      price: 89.99,
      stock: 5,
      description: "Great sound.",
      image: "a.jpg",
    },
  ]),
  getProduct: vi.fn(),
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn(),
}));

describe("App client-side routing", () => {
  it("shows the home page at the root route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /admin product portal/i })
    ).toBeInTheDocument();
  });

  it("navigates to the products page when the nav link is clicked", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole("link", { name: "Products" }));

    expect(await screen.findByText("Wireless Headphones")).toBeInTheDocument();
  });

  it("renders the 404 page for an unknown route", () => {
    render(
      <MemoryRouter initialEntries={["/does-not-exist"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
