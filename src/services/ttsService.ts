// ---------------------------------------------------------------------------
// ttsService (src/services/ttsService.ts)
// ---------------------------------------------------------------------------
// Thin wrapper around the Web SpeechSynthesis API. The service exposes a single
// `speak()` function that other components can call to read text aloud. All
// voice selection logic and browser compatibility quirks are contained here so
// the rest of the codebase can remain agnostic about how speech works.
//
// The web SpeechSynthesis API is widely supported in modern browsers and lets
// us provide auditory feedback without needing any external libraries. This
// helper function abstracts the API so other components only need to pass the
// text they want spoken.
// Narrative scripts used with this service are stored in
// `src/data/tts-narrative/` as described in docs/assets.md.
//
// Development Plan:
// - Allow selecting from the list of available voices and persist the player's
//   preference in `gameState`.
// - Add support for queuing longer narration scripts so scenes can play a
//   sequence of lines with proper timing.
// - Consider falling back to a server-side TTS service for platforms without
//   built-in speech synthesis.
// - Document recommended voice names in docs/assets.md along with notes on which
//   browsers provide them by default.
// - Explore caching generated audio clips with IndexedDB so frequently used
//   phrases play instantly.

// A variable to hold the voices once they are loaded.
let voices: SpeechSynthesisVoice[] = [];

// Map ARPAbet phonemes to the International Phonetic Alphabet. This allows us
// to generate SSML that improves pronunciation across browsers.
const ARPABET_TO_IPA: Record<string, string> = {
  AA: "ɑ",
  AE: "æ",
  AH: "ʌ",
  AO: "ɔ",
  AW: "aʊ",
  AY: "aɪ",
  B: "b",
  CH: "tʃ",
  D: "d",
  DH: "ð",
  EH: "ɛ",
  ER: "ɝ",
  EY: "eɪ",
  F: "f",
  G: "ɡ",
  HH: "h",
  IH: "ɪ",
  IY: "i",
  JH: "dʒ",
  K: "k",
  L: "l",
  M: "m",
  N: "n",
  NG: "ŋ",
  OW: "oʊ",
  OY: "ɔɪ",
  P: "p",
  R: "r",
  S: "s",
  SH: "ʃ",
  T: "t",
  TH: "θ",
  UH: "ʊ",
  UW: "u",
  V: "v",
  W: "w",
  Y: "j",
  Z: "z",
  ZH: "ʒ",
};

/**
 * Convert an ARPAbet string like "DH-AH" to an IPA string used in SSML.
 */
const arpabetToIpa = (phonetic: string): string => {
  return phonetic
    .split("-")
    .map((p) => ARPABET_TO_IPA[p] || "")
    .join("");
};

// This function will be called when the voices are loaded.
const loadVoices = () => {
  voices = window.speechSynthesis.getVoices();
};

// If Speech Synthesis is available, load the voices.
if ("speechSynthesis" in window) {
  loadVoices();
  // The 'voiceschanged' event is fired when the list of voices has been loaded and is ready to use.
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

/**
 * Speak the given text using the Web Speech API. When a phonetic
 * representation is provided it will be converted to IPA and wrapped in
 * SSML so the word is pronounced more clearly.
 */
export const speak = (text: string, phonetic?: string) => {
  if ("speechSynthesis" in window) {
    // Stop any previous speech so words don't overlap
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance();

    // Selecting a friendly voice can dramatically improve clarity for young
    // players. The list below favors high-quality voices available on most
    // platforms but gracefully falls back if none are found.

    // --- Voice Selection Logic ---
    // Define a list of preferred, high-quality voices.
    const preferredVoices = [
      "Google US English",
      "Microsoft David - English (United States)",
      "Samantha", // Common on macOS/iOS
      "Alex",     // High-quality on macOS/iOS
    ];

    // Try to find a preferred voice.
    let selectedVoice = voices.find(voice =>
      preferredVoices.includes(voice.name) && voice.lang.startsWith("en-US")
    );

    // If no preferred voice is found, fall back to the first available US English voice.
    if (!selectedVoice) {
      selectedVoice = voices.find(voice => voice.lang === "en-US");
    }

    // If a suitable voice is found, assign it to the utterance.
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.lang = "en-US";
    utterance.rate = 0.85; // Slowed down slightly more for clarity
    utterance.pitch = 1.0; // Default pitch is usually best

    if (phonetic) {
      const ipa = arpabetToIpa(phonetic);
      utterance.text = `<speak><phoneme alphabet="ipa" ph="${ipa}">${text}</phoneme></speak>`;
    } else {
      utterance.text = text;
    }

    window.speechSynthesis.speak(utterance);
  } else {
    // Most modern browsers support this API, but in case a user is on an
    // unsupported platform we log a helpful error.
    console.error("Sorry, your browser doesn't support text-to-speech.");
  }
};
// TODO: expose voice and language selection options for international players

