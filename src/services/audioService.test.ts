// ---------------------------------------------------------------------------
// audioService Unit Tests (src/services/audioService.test.ts)
// ---------------------------------------------------------------------------
// Verifies background music helper functions control a shared audio element.
import { describe, it, expect, beforeEach, vi } from "vitest";

class MockAudio {
  src = "";
  volume = 1;
  loop = false;
  paused = true;
  play = vi.fn(() => {
    this.paused = false;
    return Promise.resolve();
  });
  pause = vi.fn(() => {
    this.paused = true;
  });
}

let mockAudio: MockAudio;

beforeEach(() => {
  mockAudio = new MockAudio();
  (global as any).Audio = vi.fn(() => mockAudio);
  vi.resetModules();
});

describe("audioService", () => {
  it("plays a new music track", async () => {
    const mod = await import("./audioService");
    mod.playBackgroundMusic("song.mp3");
    expect(mockAudio.src).toBe("song.mp3");
    expect(mockAudio.play).toHaveBeenCalled();
  });

  it("does not replay the same track", async () => {
    const mod = await import("./audioService");
    mod.playBackgroundMusic("song.mp3");
    mockAudio.play.mockClear();
    mod.playBackgroundMusic("song.mp3");
    expect(mockAudio.play).not.toHaveBeenCalled();
  });

  it("pauses and resumes playback", async () => {
    const mod = await import("./audioService");
    mod.playBackgroundMusic("song.mp3");
    mod.pauseBackgroundMusic();
    expect(mockAudio.pause).toHaveBeenCalled();
    mockAudio.pause.mockClear();
    mockAudio.play.mockClear();
    mod.resumeBackgroundMusic();
    expect(mockAudio.play).toHaveBeenCalled();
  });

  it("stops playback", async () => {
    const mod = await import("./audioService");
    mod.playBackgroundMusic("song.mp3");
    mod.stopBackgroundMusic();
    expect(mockAudio.pause).toHaveBeenCalled();
  });
});
