import { describe, it, expect } from "vitest";
import { isSceneUnlocked } from "./progression";

describe("isSceneUnlocked", () => {
  const scenes = [
    { id: 1, unlock_xp: 0 },
    { id: 2, unlock_xp: 50 },
  ];

  it("returns true when xp meets threshold", () => {
    expect(isSceneUnlocked(scenes, 2, 60)).toBe(true);
  });

  it("returns false when xp is below threshold", () => {
    expect(isSceneUnlocked(scenes, 2, 40)).toBe(false);
  });

  it("returns false when scene not found", () => {
    expect(isSceneUnlocked(scenes, 999, 100)).toBe(false);
  });
});
