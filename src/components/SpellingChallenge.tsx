import { useState, useEffect } from "react";
import words from "@/data/words.json";
import pokemon from "@/data/pokemon.json";
import scenes from "@/data/scenes.json";
import Controls from "./Controls";
import OnScreenKeyboard from "./OnScreenKeyboard";
import ProgressBar from "./ProgressBar";
import { speak } from "@/services/ttsService";
import { useGameStore } from "@/services/gameState";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Divider,
} from "@mui/material";

// Define the shape of our new word object
interface WordEntry {
  word: string;
  pronunciation?: string;
}

// Define the shake animation keyframes
const shakeAnimation = `
  @keyframes shake {
    10%, 90% { transform: translate3d(-1px, 0, 0); }
    20%, 80% { transform: translate3d(2px, 0, 0); }
    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
    40%, 60% { transform: translate3d(4px, 0, 0); }
  }
`;

interface SpellingChallengeProps {
  wordStart: number;
  wordEnd: number;
}

export default function SpellingChallenge({
  wordStart,
  wordEnd,
}: SpellingChallengeProps) {
  const [sceneWords, setSceneWords] = useState<WordEntry[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [message, setMessage] = useState("");
  const [lastCaughtPokemon, setLastCaughtPokemon] = useState<{
    id: number;
    name: string;
    sprite: string;
  } | null>(null);
  const [isCatchDialogOpen, setCatchDialogOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false); // State for shake animation
  const [isAnswered, setIsAnswered] = useState(false); // State to disable form

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
  } = useGameStore();

  const scene = scenes.find(
    (s) => s.word_start === wordStart && s.word_end === wordEnd,
  );
  const sceneId = scene?.id;
  const currentWordObject = sceneWords[currentWordIndex];
  const currentWord = currentWordObject?.word;

  const xpForLastLevel = (level - 1) * 100;
  const xpGainedThisLevel = xp - xpForLastLevel;
  const xpNeededForThisLevel = xpToNextLevel - xpForLastLevel;

  useEffect(() => {
    // FIX: Convert the string array from words.json into an array of WordEntry objects.
    const slicedWords: string[] = words.slice(wordStart, wordEnd + 1);
    const wordsForScene: WordEntry[] = slicedWords.map(word => ({
      word: word,
      // Default the pronunciation to the word itself.
      // If you update words.json later, this will be replaced.
      pronunciation: word
    }));
    setSceneWords(wordsForScene);
    setCurrentWordIndex(0);
    setCurrentInput("");
    setMessage("");
    setLastCaughtPokemon(null);
    setIsAnswered(false); // Reset on new scene
  }, [wordStart, wordEnd]);

  useEffect(() => {
    if (currentWordObject) {
      speak(currentWordObject.pronunciation || currentWordObject.word);
    }
  }, [currentWordObject]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^a-zA-Z]/g, "").toLowerCase();
    if (currentWord && newValue.length > currentWord.length) {
      return;
    }
    setCurrentInput(newValue);
  };

  const handleKeyboardInput = (char: string) => {
    if (currentWord && currentInput.length < currentWord.length) {
      setCurrentInput((prev) => (prev + char).slice(0, currentWord.length));
    }
  };

  const handleBackspace = () => {
    setCurrentInput((prev) => prev.slice(0, -1));
  };

  const handleRepeat = () => {
    if (currentWordObject) {
      speak(currentWordObject.pronunciation || currentWordObject.word);
    }
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!currentInput || isAnswered) return; // Prevent submission if already answered

    if (currentInput.toLowerCase() === currentWord?.toLowerCase()) {
      setIsAnswered(true); // Disable form
      addXp(10);
      incrementWordsMastered();

      const scenePokemon = pokemon.filter((p) => p.scene_id === sceneId);
      const nextPokemonToCatch = scenePokemon.find(
        (p) => !collectedPokemonIds.includes(p.id),
      );

      if (nextPokemonToCatch) {
        catchPokemon(nextPokemonToCatch.id);
        setLastCaughtPokemon({
          id: nextPokemonToCatch.id,
          name: nextPokemonToCatch.name,
          sprite: nextPokemonToCatch.sprite,
        });
        setCatchDialogOpen(true);
      } else {
        setMessage("Correct! 🎉");
      }
    } else {
      setMessage("Try again!");
      setIsShaking(true); // Trigger shake animation
      setTimeout(() => setIsShaking(false), 820); // Reset shake after animation
    }
  };

  const handleNextWord = () => {
    if (currentWordIndex < sceneWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setCurrentInput("");
      setMessage("");
      setLastCaughtPokemon(null);
      setIsAnswered(false); // Re-enable form for next word
    } else {
      setMessage("You have completed all the words in this scene! 🏆");
      if (sceneId) {
        completeScene(sceneId);
      }
      setCurrentInput("");
      setLastCaughtPokemon(null);
      setIsAnswered(true); // Keep form disabled at the end
    }
  };

  const handleCloseCatchDialog = () => {
    setCatchDialogOpen(false);
    handleNextWord();
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
    spendHint();
  };

  if (!currentWordObject || !currentWord) {
    return <Typography>Loading challenge...</Typography>;
  }

  const wordBlanks = currentWord.split("").map((_, index) => (
    <span key={index}>
      {currentInput[index] ? currentInput[index].toUpperCase() : "_"}
    </span>
  ));

  return (
    <>
      <style>{shakeAnimation}</style> {/* Inject keyframes into the document */}
      <Card>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          {/* Status Bar, etc. */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="caption" color="text.secondary">
                LEVEL
              </Typography>
              <Typography variant="h5" component="div">
                {level}
              </Typography>
            </Box>
            <Box sx={{ width: "40%" }}>
              <ProgressBar
                current={xpGainedThisLevel}
                total={xpNeededForThisLevel}
              />
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="caption" color="text.secondary">
                HINTS
              </Typography>
              <Typography variant="h5" component="div">
                {hintCharges}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />
          {/* Spelling Area */}
          <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Spell the word:
            </Typography>

            <Typography
              variant="h4"
              component="div"
              sx={{
                fontFamily: "monospace",
                letterSpacing: { xs: "0.5em", sm: "1em" },
                my: 3,
                fontSize: { xs: "1.5rem", sm: "2.125rem" },
              }}
            >
              {wordBlanks}
            </Typography>

            <TextField
              value={currentInput.toUpperCase()}
              onChange={handleInputChange}
              autoFocus
              autoComplete="off"
              variant="outlined"
              disabled={isAnswered} // Disable based on state
              sx={{ // Apply animation conditionally
                mb: 2,
                width: "100%",
                maxWidth: "300px",
                animation: isShaking ? "shake 0.82s" : "none",
              }}
              inputProps={{
                style: {
                  textAlign: "center",
                  fontSize: "2rem",
                  letterSpacing: "0.2em",
                  padding: "10px",
                },
                maxLength: currentWord.length,
              }}
            />

            <OnScreenKeyboard
              onKey={handleKeyboardInput}
              onBackspace={handleBackspace}
            />

            {/* Feedback Message */}
            <Box
              sx={{
                height: 90,
                mt: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {message && !message.startsWith("Correct") && (
                <Alert
                  severity={message.includes("completed") ? "success" : "info"}
                >
                  {message}
                </Alert>
              )}
            </Box>

            {/* Action Buttons */}
            {isAnswered && !isCatchDialogOpen ? (
              <Button
                variant="contained"
                onClick={handleNextWord}
                sx={{ width: "100%", maxWidth: "300px" }}
              >
                Next Word
              </Button>
            ) : (
              <Controls
                onSubmit={handleSubmit}
                onHint={handleHint}
                onRepeat={handleRepeat}
                hintDisabled={hintCharges <= 0 || isAnswered}
                submitDisabled={isAnswered}
              />
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Pokémon Caught Dialog */}
      <Dialog open={isCatchDialogOpen} onClose={handleCloseCatchDialog}>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          You caught a {lastCaughtPokemon?.name}!
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <img
            src={`/assets/images/pokemon/${String(lastCaughtPokemon?.id).padStart(3, "0")}.png`}
            alt={lastCaughtPokemon?.name}
            style={{
              width: "100%",
              maxWidth: "250px",
              margin: "auto",
            }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button onClick={handleCloseCatchDialog} variant="contained" autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}