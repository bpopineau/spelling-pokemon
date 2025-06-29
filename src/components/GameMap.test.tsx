// ---------------------------------------------------------------------------
// GameMap Accessibility Tests (src/components/GameMap.test.tsx)
// ---------------------------------------------------------------------------
// Verifies keyboard navigation between region hotspots. We mock the navigate
// function so no actual routing occurs during the test.

import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import GameMap from "./GameMap";
import { useGameStore } from "@/services/gameState";

// Prevent actual audio playback during tests
vi.mock("@/hooks/useBackgroundMusic", () => ({ default: () => {} }));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return { ...actual, useNavigate: () => vi.fn() };
});

describe("GameMap keyboard navigation", () => {
  beforeEach(() => {
    useGameStore.getState().resetProgress();
    useGameStore.getState().addXp(150); // unlock first few regions
  });

  it("moves focus with arrow keys", () => {
    const { getAllByRole } = render(<GameMap />);
    const hotspots = getAllByRole("button");
    hotspots[0].focus();
    fireEvent.keyDown(hotspots[0], { key: "ArrowRight" });
    expect(document.activeElement).toBe(hotspots[1]);
  });
});
