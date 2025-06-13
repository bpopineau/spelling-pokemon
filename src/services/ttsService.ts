// Use the browser's speech synthesis to read a word aloud.
//
// The web SpeechSynthesis API is widely supported in modern browsers and lets
// us provide auditory feedback without needing any external libraries. This
// helper function abstracts the API so other components only need to pass the
// text they want spoken.
export const speak = (text: string) => {
  if ("speechSynthesis" in window) {
    // Stop any previous speech so words don't overlap
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9; // Slightly slower for clarity
    window.speechSynthesis.speak(utterance);
  } else {
    // Most modern browsers support this API, but in case a user is on an
    // unsupported platform we log a helpful error.
    console.error("Sorry, your browser doesn't support text-to-speech.");
  }
};
