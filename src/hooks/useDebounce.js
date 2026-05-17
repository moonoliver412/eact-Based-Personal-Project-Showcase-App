import { useState, useEffect } from "react";

/**
 * Custom hook that delays updating a value until the user stops changing it.
 *
 * The search box uses this so the product list only re-filters after a short
 * pause in typing, instead of on every single keystroke.
 */
export default function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    // Clear the pending timer if the value changes before the delay elapses.
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
