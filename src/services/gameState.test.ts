// ---------------------------------------------------------------------------
// Game State Tests (src/services/gameState.test.ts)
// ---------------------------------------------------------------------------
// Unit tests covering the resetProgress action of the Zustand game store.
import { beforeEach, describe, expect, it } from "vitest";
import { useGameStore } from "./gameState";

describe("gameState resetProgress", () => {
  beforeEach(() => {
    useGameStore.getState().resetProgress();
  });

  it("resets all tracked values", () => {
    const store = useGameStore.getState();
    store.addXp(150);
    store.catchPokemon(1);
    store.resetProgress();
    const reset = useGameStore.getState();
    expect(reset.xp).toBe(0);
    expect(reset.level).toBe(1);
    expect(reset.xpToNextLevel).toBe(100);
    expect(reset.collectedPokemonIds).toEqual([]);
  });
});
