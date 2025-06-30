import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProgressBar from "./ProgressBar";

describe("ProgressBar", () => {
  it("renders custom label and color", () => {
    render(<ProgressBar current={5} total={10} label="XP" color="secondary" />);
    expect(screen.getAllByText(/XP/i).length).toBeGreaterThan(0);
    // Check that progress text displays current and total values
    expect(screen.getByText("5 / 10 XP")).toBeDefined();
  });
});
