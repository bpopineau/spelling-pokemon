// src/services/ttsService.ts
// Use the browser's speech synthesis to read a word aloud.
//
// The web SpeechSynthesis API is widely supported in modern browsers and lets
// us provide auditory feedback without needing any external libraries. This
// helper function abstracts the API so other components only need to pass the
// text they want spoken.
// Narrative scripts used with this service are stored in
// `src/data/tts-narrative/` as described in assets.md.

// A variable to hold the voices once they are loaded.
let voices: SpeechSynthesisVoice[] = [];

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

export const speak = (text: string) => {
  if ("speechSynthesis" in window) {
    // Stop any previous speech so words don't overlap
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

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
    window.speechSynthesis.speak(utterance);
  } else {
    // Most modern browsers support this API, but in case a user is on an
    // unsupported platform we log a helpful error.
    console.error("Sorry, your browser doesn't support text-to-speech.");
  }
};
// TODO: expose voice and language selection options for international players