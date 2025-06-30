// ---------------------------------------------------------------------------
// ttsService Unit Tests (src/services/ttsService.test.ts)
// ---------------------------------------------------------------------------
// Ensures the text-to-speech wrapper selects a voice and formats SSML correctly.
import { describe, it, expect, beforeEach, vi } from "vitest";

let speakFunc: (text: string, phonetic?: string) => void;
let lastUtterance: any;
let speakSpy: any;

class MockUtterance {
  text = "";
  voice: any = null;
  lang = "";
  rate = 1;
  pitch = 1;
  addEventListener = vi.fn();
}

beforeEach(async () => {
  lastUtterance = new MockUtterance();
  speakSpy = vi.fn();
  (global as any).SpeechSynthesisUtterance = vi.fn(() => lastUtterance);
  (global as any).speechSynthesis = {
    cancel: vi.fn(),
    speak: speakSpy,
    getVoices: vi.fn(() => [
      { name: "Google US English", lang: "en-US" },
    ]),
  };
  const mod = await import("./ttsService");
  speakFunc = mod.speak;
});

describe("speak", () => {
  it("passes plain text to speechSynthesis", () => {
    speakFunc("hello");
    expect(speakSpy).toHaveBeenCalled();
    expect(lastUtterance.text).toBe("hello");
  });

  it("converts ARPAbet to IPA when phonetic is provided", () => {
    speakFunc("hello", "HH-AH-L-OW");
    expect(lastUtterance.text).toBe(
      "<speak><phoneme alphabet=\"ipa\" ph=\"hʌloʊ\">hello</phoneme></speak>"
    );
  });
});
