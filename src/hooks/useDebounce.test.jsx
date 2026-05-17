import { renderHook, act } from "@testing-library/react";
import useDebounce from "./useDebounce";

describe("useDebounce", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("returns the initial value right away", () => {
    const { result } = renderHook(() => useDebounce("hello", 300));
    expect(result.current).toBe("hello");
  });

  it("only updates after the delay has passed", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "a" } }
    );

    rerender({ value: "b" });
    // Not enough time has passed, so the old value is still returned.
    expect(result.current).toBe("a");

    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe("b");
  });
});
