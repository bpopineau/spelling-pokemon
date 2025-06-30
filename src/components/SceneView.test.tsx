// ---------------------------------------------------------------------------
// SceneView Error Handling Tests (src/components/SceneView.test.tsx)
// ---------------------------------------------------------------------------
// Ensures a friendly message is displayed when the background image cannot load.
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import SceneView from "./SceneView";

vi.mock("@/hooks/useBackgroundMusic", () => ({ default: () => {} }));

vi.mock("@/data/scenes.json", () => ({
  default: [
    {
      id: 1,
      name: "Test Scene",
      background: "missing.png",
      word_start: 0,
      word_end: 1,
      music: "bg_forest.ogg",
      unlock_xp: 0,
    },
  ],
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ sceneId: "1" }),
    useNavigate: () => vi.fn(),
  };
});

describe("SceneView background errors", () => {
  it("shows fallback text when the image fails to load", () => {
    const { getByAltText, getByText } = render(<SceneView />);
    fireEvent.error(getByAltText("Test Scene"));
    expect(getByText(/background image failed to load/i)).toBeTruthy();
  });
});
