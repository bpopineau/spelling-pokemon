// ---------------------------------------------------------------------------
// gameState Action Tests (src/services/gameState.actions.test.ts)
// ---------------------------------------------------------------------------
// Additional unit tests covering XP gain and word mastery rewards.
import { describe, it, expect, beforeEach } from "vitest";
import { useGameStore } from "./gameState";

describe("gameState actions", () => {
  beforeEach(() => {
    useGameStore.getState().resetProgress();
  });

  it("levels up when enough XP is gained", () => {
    useGameStore.getState().addXp(120);
    const state = useGameStore.getState();
    expect(state.level).toBe(2);
    expect(state.xp).toBe(120);
    expect(state.xpToNextLevel).toBe(200);
  });

  it("increments words mastered and awards hint", () => {
    const store = useGameStore.getState();
    store.spendHint();
    for (let i = 0; i < 5; i++) {
      store.incrementWordsMastered(i);
    }
    const updated = useGameStore.getState();
    expect(updated.wordsMastered).toBe(5);
    expect(updated.masteredWordIndices.length).toBe(5);
    expect(updated.hintCharges).toBe(2);
  });
});
