import { renderHook, waitFor, act } from "@testing-library/react";
import useProducts from "./useProducts";
import * as api from "../api";

// Replace the real network layer with mocks so the CRUD logic can be tested
// in isolation, without a running server.
vi.mock("../api");

const sampleProduct = {
  id: 1,
  name: "Wireless Headphones",
  category: "Audio",
  price: 89.99,
  stock: 24,
};

describe("useProducts (custom hook)", () => {
  beforeEach(() => {
    api.getProducts.mockResolvedValue([sampleProduct]);
  });

  it("loads products on mount (READ)", async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.products).toHaveLength(1);
  });

  it("adds a product (CREATE)", async () => {
    api.createProduct.mockResolvedValue({ ...sampleProduct, id: 2, name: "Speaker" });
    const { result } = renderHook(() => useProducts());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(() => result.current.addProduct({ name: "Speaker" }));

    expect(result.current.products).toHaveLength(2);
  });

  it("updates a product (UPDATE / PATCH)", async () => {
    api.updateProduct.mockResolvedValue({ ...sampleProduct, price: 49.99 });
    const { result } = renderHook(() => useProducts());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(() => result.current.editProduct(1, { price: 49.99 }));

    expect(result.current.products[0].price).toBe(49.99);
  });

  it("removes a product (DELETE)", async () => {
    api.deleteProduct.mockResolvedValue(true);
    const { result } = renderHook(() => useProducts());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(() => result.current.removeProduct(1));

    expect(result.current.products).toHaveLength(0);
  });

  it("reports an error when the load fails", async () => {
    api.getProducts.mockRejectedValueOnce(new Error("offline"));
    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toMatch(/could not load/i);
  });
});
