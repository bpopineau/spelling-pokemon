// File: src/services/ttsService.ts
//
// Simple wrapper around the Web SpeechSynthesis API for text-to-speech.
// Components can call `speak("hello")` without worrying about browser quirks.

type SpeakOptions = {
  lang?: string; // e.g. "en-US"
  rate?: number; // 0.1 – 10 (1 is default)
  voiceName?: string; // Exact `SpeechSynthesisVoice.name`
};

/** Browser-safe TTS helper */
export const speak = (text: string, opts: SpeakOptions = {}): void => {
  if (!("speechSynthesis" in window)) {
    // Gracefully degrade if unsupported
    console.error("SpeechSynthesis is not supported in this browser.");
    return;
  }

  // Cancel any ongoing utterance so new text doesn’t overlap
  window.speechSynthesis.cancel();

  const {
    lang = "en-US",
    rate = 0.9, // slightly slower for young readers
    voiceName,
  } = opts;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;

  if (voiceName) {
    const voice = window.speechSynthesis
      .getVoices()
      .find((v) => v.name === voiceName);
    if (voice) utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
};

// TODO: expose a getAvailableVoices() helper to list voices for settings page.
// TODO: consider queueing consecutive calls instead of canceling immediately.
