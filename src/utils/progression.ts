// ---------------------------------------------------------------------------
// Progression Utilities (src/utils/progression.ts)
// ---------------------------------------------------------------------------
// Helper functions for gameplay progression such as determining if a scene
// is unlocked. Keeping this logic separate from React components makes it
// easy to unit test and share across the app.
//
// Development Plan:
// - Add functions for calculating level curves or XP rewards.
// - Allow customizing unlock rules via settings files in the future.
// - Document any formula changes in docs/DEVELOPMENT_NOTES.md when updated.

/**
 * Returns true if the provided scene is unlocked at the given XP level.
 *
 * @param scenes - Array of scene unlock data `{ id: number; unlock_xp: number }`.
 * @param sceneId - ID of the scene to check.
 * @param xp - Player's current experience points.
 * @returns `true` if the player's XP meets or exceeds the unlock threshold.
 */
export function isSceneUnlocked(
  scenes: { id: number; unlock_xp: number }[],
  sceneId: number,
  xp: number
): boolean {
  const scene = scenes.find((s) => s.id === sceneId);
  if (!scene) return false;
  return xp >= scene.unlock_xp;
}
