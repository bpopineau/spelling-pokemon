import { useGameStore } from '../gameState';

describe('gameState store', () => {
  it('adds XP and levels up', () => {
    const { addXp, xp, level } = useGameStore.getState();
    addXp(150);               // should cross 100-XP threshold
    const state = useGameStore.getState();
    expect(state.level).toBe(level + 1);
    expect(state.xp).toBe(xp + 150);
  });
});
