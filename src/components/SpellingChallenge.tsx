import { useState, useEffect } from 'react';
import words from '../data/words.json';
import pokemon from '../data/pokemon.json';
import scenes from '../data/scenes.json'; // This line fixes the error
import Controls from './Controls';
import { speak } from '../services/ttsService';
import { useGameStore } from '../services/gameState';

interface SpellingChallengeProps {
  wordStart: number;
  wordEnd: number;
}

export default function SpellingChallenge({ wordStart, wordEnd }: SpellingChallengeProps) {
  const [sceneWords, setSceneWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [message, setMessage] = useState('');
  const [lastCaughtPokemon, setLastCaughtPokemon] = useState<{ name: string; sprite: string } | null>(null);

  const { xp, hintCharges, collectedPokemonIds, useHint, addXp, catchPokemon } = useGameStore();

  const scene = scenes.find(s => s.word_start === wordStart && s.word_end === wordEnd);
  const sceneId = scene?.id;
  const currentWord = sceneWords[currentWordIndex];

  useEffect(() => {
    const wordsForScene = words.slice(wordStart, wordEnd + 1);
    setSceneWords(wordsForScene);
    setCurrentWordIndex(0);
    setCurrentInput('');
    setMessage('');
    setLastCaughtPokemon(null);
  }, [wordStart, wordEnd]);

  useEffect(() => {
    if (currentWord) {
      speak(currentWord);
    }
  }, [currentWord]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newV = event.target.value.replace(/[^a-zA-Z]/g, '').toLowerCase();
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
      addXp(10);

      const scenePokemon = pokemon.filter(p => p.scene_id === sceneId);
      const nextPokemonToCatch = scenePokemon.find(p => !collectedPokemonIds.includes(p.id));

      if (nextPokemonToCatch) {
        catchPokemon(nextPokemonToCatch.id);
        setLastCaughtPokemon({ name: nextPokemonToCatch.name, sprite: nextPokemonToCatch.sprite });
        setMessage(`Correct! You caught ${nextPokemonToCatch.name}!`);
      } else {
        setMessage('Correct! 🎉');
      }

    } else {
      setMessage('Try again! 🤔');
    }
  };

  const handleNextWord = () => {
    if (currentWordIndex < sceneWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setMessage('You have completed all the words in this scene! 🏆');
    }
    setCurrentInput('');
    setMessage('');
    setLastCaughtPokemon(null);
  };

  const handleHint = () => {
    if (hintCharges <= 0 || !currentWord || currentInput.length >= currentWord.length) {
      return;
    }
    const nextChar = currentWord[currentInput.length];
    setCurrentInput(currentInput + nextChar);
    useHint();
  };

  if (!currentWord) {
    return <div className="text-center bg-white bg-opacity-75 p-8 rounded-lg shadow-lg">Loading challenge...</div>;
  }

  const wordBlanks = "_ ".repeat(currentWord.length);

  return (
    <div className="relative text-center bg-white bg-opacity-75 p-8 rounded-lg shadow-lg w-full max-w-xl">
      <div className="absolute top-4 right-4 flex gap-2">
        <div className="bg-yellow-200 text-yellow-800 font-bold px-3 py-1 rounded-full text-sm">
          XP: {xp}
        </div>
        <div className="bg-purple-200 text-purple-800 font-bold px-3 py-1 rounded-full text-sm">
          Hints: {hintCharges}
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-4">Spell the word:</h2>
      <div className="text-5xl font-mono tracking-[.5em] mb-4 text-gray-900" aria-label={`Word has ${currentWord.length} letters`}>
        {wordBlanks}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
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

        <div className="h-24 my-2 flex flex-col justify-center items-center">
          {message && <p className="text-2xl text-gray-800">{message}</p>}
          {lastCaughtPokemon && message.startsWith('Correct') && (
            <img
              src={`/assets/images/sprites/${lastCaughtPokemon.sprite}`}
              alt={lastCaughtPokemon.name}
              className="w-16 h-16 mt-2"
            />
          )}
        </div>

        {message.startsWith('Correct') ? (
          <button type="button" onClick={handleNextWord} className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg text-xl hover:bg-blue-700">
            Next Word
          </button>
        ) : (
          <Controls
            onSubmit={() => handleSubmit()}
            onHint={handleHint}
            onRepeat={handleRepeat}
            hintDisabled={hintCharges <= 0 || !currentWord || currentInput.length >= currentWord.length}
          />
        )}
      </form>
    </div>
  );
}