import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("shows the current value", () => {
    render(<SearchBar value="keyboard" onChange={() => {}} />);
    expect(screen.getByLabelText("Search products")).toHaveValue("keyboard");
  });

  it("reports each keystroke through onChange", async () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);

    await userEvent.type(screen.getByLabelText("Search products"), "abc");

    expect(handleChange).toHaveBeenCalledTimes(3);
  });
});
