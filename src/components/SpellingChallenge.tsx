// SpellingChallenge presents one word at a time for the player to spell.
// It also handles giving XP, catching Pokémon and using hints.
import { useState, useEffect } from "react";
import words from "../data/words.json"; // list of all spelling words
import pokemon from "../data/pokemon.json"; // which Pokémon appear in scenes
import scenes from "../data/scenes.json"; // scene definitions
import Controls from "./Controls"; // buttons like hint and submit
import OnScreenKeyboard from "./OnScreenKeyboard"; // clickable keyboard
import { speak } from "../services/ttsService"; // helper for text-to-speech
import { useGameStore } from "../services/gameState"; // global game state

// Props tell the component which words it should use
interface SpellingChallengeProps {
  wordStart: number;
  wordEnd: number;
}

// The main component that runs the spelling logic
export default function SpellingChallenge({
  wordStart,
  wordEnd,
}: SpellingChallengeProps) {
  // Words for this scene and which one the player is on
  const [sceneWords, setSceneWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // What the player has typed so far
  const [currentInput, setCurrentInput] = useState("");
  // Feedback shown under the input box
  const [message, setMessage] = useState("");
  const [lastCaughtPokemon, setLastCaughtPokemon] = useState<{
    name: string;
    sprite: string;
  } | null>(null);

  const {
    xp,
    level,
    xpToNextLevel,
    hintCharges,
    collectedPokemonIds,
    spendHint,
    addXp,
    catchPokemon,
    incrementWordsMastered,
    completeScene,
  } = useGameStore(); // read and update the global game progress

  // Figure out which scene these words belong to
  const scene = scenes.find(
    (s) => s.word_start === wordStart && s.word_end === wordEnd,
  );
  const sceneId = scene?.id;
  const currentWord = sceneWords[currentWordIndex];

  // --- Progress Bar Calculation ---
  // These numbers help us show how close the player is to the next level
  const xpForLastLevel = (level - 1) * 100;
  const xpGainedThisLevel = xp - xpForLastLevel;
  const xpNeededForThisLevel = xpToNextLevel - xpForLastLevel;
  const progressPercentage = Math.max(
    0,
    Math.min(100, (xpGainedThisLevel / xpNeededForThisLevel) * 100),
  );

  // When the scene changes, load the right words and reset state
  useEffect(() => {
    const wordsForScene = words.slice(wordStart, wordEnd + 1);
    setSceneWords(wordsForScene);
    setCurrentWordIndex(0);
    setCurrentInput("");
    setMessage("");
    setLastCaughtPokemon(null);
  }, [wordStart, wordEnd]);

  // Read the word aloud each time it changes
  useEffect(() => {
    if (currentWord) {
      speak(currentWord);
    }
  }, [currentWord]);

  // Called when the player types in the input box
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newV = event.target.value.replace(/[^a-zA-Z]/g, "").toLowerCase();
    if (currentWord && newV.length > currentWord.length) {
      return;
    }
    setCurrentInput(newV);
  };

  // Called when the on-screen keyboard is used
  const handleKeyboardInput = (char: string) => {
    if (currentWord && currentInput.length < currentWord.length) {
      setCurrentInput((prev) => (prev + char).slice(0, currentWord.length));
    }
  };

  // Remove the last letter from the input
  const handleBackspace = () => {
    setCurrentInput((prev) => prev.slice(0, -1));
  };

  // Speak the current word again
  const handleRepeat = () => {
    if (currentWord) {
      speak(currentWord);
    }
  };

  // Check if the spelling is correct when the form is submitted
  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!currentInput) return;

    if (currentInput.toLowerCase() === currentWord?.toLowerCase()) {
      addXp(10);
      incrementWordsMastered();

      const scenePokemon = pokemon.filter((p) => p.scene_id === sceneId);
      const nextPokemonToCatch = scenePokemon.find(
        (p) => !collectedPokemonIds.includes(p.id),
      );

      if (nextPokemonToCatch) {
        catchPokemon(nextPokemonToCatch.id);
        setLastCaughtPokemon({
          name: nextPokemonToCatch.name,
          sprite: nextPokemonToCatch.sprite,
        });
        setMessage(`Correct! You caught ${nextPokemonToCatch.name}!`);
      } else {
        setMessage("Correct! 🎉");
      }
    } else {
      setMessage("Try again! 🤔");
    }
  };

  // Move on to the next word in the list
  const handleNextWord = () => {
    if (currentWordIndex < sceneWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setMessage("You have completed all the words in this scene! 🏆");
      if (sceneId) {
        completeScene(sceneId);
      }
    }
    setCurrentInput("");
    setMessage("");
    setLastCaughtPokemon(null);
  };

  // Fill in the next letter if the player has hints left
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
    spendHint();
  };

  // Wait until a word is ready
  if (!currentWord) {
    return (
      <div className="text-center bg-white bg-opacity-75 p-8 rounded-lg shadow-lg">
        Loading challenge...
      </div>
    );
  }

  const wordBlanks = "_ ".repeat(currentWord.length);
  // Example: if the word has 5 letters we show "_ _ _ _ _"

  return (
    // Main container with a solid background and border
    <div className="bg-white border-4 border-slate-300/70 p-6 rounded-xl shadow-2xl w-full max-w-lg text-gray-800">
      {/* --- Status Bar --- */}
      <div className="grid grid-cols-3 divide-x divide-slate-300 bg-slate-100 rounded-lg p-2 mb-6 border border-slate-300">
        {/* Level */}
        <div className="flex flex-col items-center justify-center px-2">
          <span className="text-sm font-bold text-slate-600">LEVEL</span>
          <span className="text-4xl font-bold text-sky-600">{level}</span>
        </div>

        {/* XP / Progress */}
        <div className="flex flex-col items-center justify-center px-4">
          <span className="text-sm font-bold text-slate-600">PROGRESS</span>
          <div className="w-full bg-slate-300 rounded-full h-5 mt-1 border border-slate-400/50 shadow-inner">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span className="text-sm font-semibold text-slate-600 mt-1">
            {xpGainedThisLevel} / {xpNeededForThisLevel} XP
          </span>
        </div>

        {/* Hints */}
        <div className="flex flex-col items-center justify-center px-2">
          <span className="text-sm font-bold text-slate-600">HINTS</span>
          <span className="text-4xl font-bold text-purple-600">
            {hintCharges}
          </span>
        </div>
      </div>

      {/* --- Spelling Area --- */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 text-slate-800">
          Spell the word:
        </h2>
        <div
          className="text-6xl font-bold font-mono tracking-widest mb-4 text-slate-800 py-2"
          aria-label={`Word has ${currentWord.length} letters`}
        >
          {wordBlanks}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full"
        >
          <input
            type="text"
            value={currentInput}
            onChange={handleInputChange}
            className="text-4xl p-2 border-2 border-gray-300 rounded-md w-full max-w-xs text-center font-mono tracking-widest focus:border-blue-500 focus:ring-blue-500"
            aria-label="Enter your spelling"
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
          />

          <OnScreenKeyboard
            onKey={handleKeyboardInput}
            onBackspace={handleBackspace}
          />

          <div className="h-24 my-2 flex flex-col justify-center items-center">
            {message && <p className="text-2xl">{message}</p>}
            {lastCaughtPokemon && message.startsWith("Correct") && (
              <img
                src={`/assets/images/sprites/${lastCaughtPokemon.sprite}`}
                alt={lastCaughtPokemon.name}
                className="w-16 h-16 mt-2"
              />
            )}
          </div>

          {message.startsWith("Correct") ? (
            <button
              type="button"
              onClick={handleNextWord}
              className="w-full max-w-xs px-6 py-3 bg-blue-500 text-white font-bold rounded-lg text-xl hover:bg-blue-700"
            >
              Next Word
            </button>
          ) : (
            <div className="w-full max-w-xs">
              <Controls
                onSubmit={() => handleSubmit()}
                onHint={handleHint}
                onRepeat={handleRepeat}
                hintDisabled={
                  hintCharges <= 0 ||
                  !currentWord ||
                  currentInput.length >= currentWord.length
                }
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
