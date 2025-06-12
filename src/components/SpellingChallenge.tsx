import { useState, useEffect } from "react";
import words from "../data/words.json";
import Controls from "./Controls";
import { speak } from "../services/ttsService";
import { useGameStore } from "../services/gameState";

interface SpellingChallengeProps {
  wordStart: number;
  wordEnd: number;
}

export default function SpellingChallenge({
  wordStart,
  wordEnd,
}: SpellingChallengeProps) {
  const [sceneWords, setSceneWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [message, setMessage] = useState("");

  const { xp, hintCharges, useHint, addXp } = useGameStore();

  const currentWord = sceneWords[currentWordIndex];

  useEffect(() => {
    const wordsForScene = words.slice(wordStart, wordEnd + 1);
    setSceneWords(wordsForScene);
    setCurrentWordIndex(0);
    setCurrentInput("");
    setMessage("");
  }, [wordStart, wordEnd]);

  useEffect(() => {
    if (currentWord) {
      speak(currentWord);
    }
  }, [currentWord]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newV = event.target.value.replace(/[^a-zA-Z]/g, "").toLowerCase();
    if (currentWord && newV.length > currentWord.length) {
      return;
    }
    setCurrentInput(newV);
  };

  const handleRepeat = () => {
    if (currentWord) {
      speak(currentWord);
    }
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!currentInput) return;

    if (currentInput.toLowerCase() === currentWord?.toLowerCase()) {
      setMessage("Correct! 🎉");
      addXp(10);
    } else {
      setMessage("Try again! 🤔");
    }
  };

  const handleNextWord = () => {
    if (currentWordIndex < sceneWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setMessage("You have completed all the words in this scene! 🏆");
    }
    setCurrentInput("");
    setMessage("");
  };

  const handleHint = () => {
    if (
      hintCharges <= 0 ||
      !currentWord ||
      currentInput.length >= currentWord.length
    ) {
      return;
    }
    const nextChar = currentWord[currentInput.length];
    setCurrentInput(currentInput + nextChar);
    useHint();
  };

  if (!currentWord) {
    return (
      <div className="text-center bg-white bg-opacity-75 p-8 rounded-lg shadow-lg">
        Loading challenge...
      </div>
    );
  }

  const wordBlanks = "_ ".repeat(currentWord.length);

  return (
    <div className="relative text-center bg-white bg-opacity-75 p-8 rounded-lg shadow-lg w-full max-w-xl">
      <div className="absolute top-2 right-2 flex gap-4">
        <div className="bg-yellow-200 text-yellow-800 font-bold px-3 py-1 rounded-full">
          XP: {xp}
        </div>
        <div className="bg-purple-200 text-purple-800 font-bold px-3 py-1 rounded-full">
          Hints: {hintCharges}
        </div>
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Spell the word:</h2>
      <div
        className="text-5xl font-mono tracking-[.5em] mb-4 text-gray-900"
        aria-label={`Word has ${currentWord.length} letters`}
      >
        {wordBlanks}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          className="text-4xl p-2 border-2 border-gray-300 rounded-md w-full max-w-sm text-center font-mono tracking-widest"
          aria-label="Enter your spelling"
          autoFocus
          autoComplete="off"
          autoCapitalize="off"
        />

        {message && (
          <p className="mt-4 text-2xl text-gray-800 h-8">{message}</p>
        )}

        {message.startsWith("Correct") ? (
          <button
            type="button"
            onClick={handleNextWord}
            className="mt-4 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg text-xl hover:bg-blue-700"
          >
            Next Word
          </button>
        ) : (
          <Controls
            onSubmit={() => handleSubmit()}
            onHint={handleHint}
            onRepeat={handleRepeat}
            // --- THIS LINE IS FIXED ---
            hintDisabled={
              hintCharges <= 0 ||
              !currentWord ||
              currentInput.length >= currentWord.length
            }
          />
        )}
      </form>
    </div>
  );
}
