// Use the browser's speech synthesis to read a word aloud
export const speak = (text: string) => {
  if ("speechSynthesis" in window) {
    // Stop any previous speech so words don't overlap
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9; // Slightly slower for clarity
    window.speechSynthesis.speak(utterance);
  } else {
    console.error("Sorry, your browser doesn't support text-to-speech.");
  }
};
