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
  TextField,
  Typography,
  Divider,
} from "@mui/material";

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
  } = useGameStore();

  const scene = scenes.find(
    (s) => s.word_start === wordStart && s.word_end === wordEnd,
  );
  const sceneId = scene?.id;
  const currentWord = sceneWords[currentWordIndex];

  const xpForLastLevel = (level - 1) * 100;
  const xpGainedThisLevel = xp - xpForLastLevel;
  const xpNeededForThisLevel = xpToNextLevel - xpForLastLevel;

  useEffect(() => {
    const wordsForScene = words.slice(wordStart, wordEnd + 1);
    setSceneWords(wordsForScene);
    setCurrentWordIndex(0);
    setCurrentInput("");
    setMessage("");
    setLastCaughtPokemon(null);
  }, [wordStart, wordEnd]);

  useEffect(() => {
    if (currentWord) {
      speak(currentWord);
    }
  }, [currentWord]);

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
    if (currentWord) {
      speak(currentWord);
    }
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!currentInput) return;

    if (currentInput.toLowerCase() === currentWord?.toLowerCase()) {
      addXp(10);
      incrementWordsMastered();
      setMessage("Correct!");

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
      }
    } else {
      setMessage("Try again!");
    }
  };

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

  if (!currentWord) {
    return <Typography>Loading challenge...</Typography>;
  }

  // Create placeholders with dashes
  const wordBlanks = currentWord.split('').map((_, index) => (
    <span key={index}>
      {currentInput[index] ? currentInput[index].toUpperCase() : '_'}
    </span>
  ));

  return (
    <Card>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Status Bar */}
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
              letterSpacing: { xs: "0.25em", sm: "0.5em" }, // Less spacing on small screens
              my: 3,
              fontSize: { xs: '1.5rem', sm: '2.125rem' } // Smaller font on small screens
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
            inputProps={{
              style: {
                textAlign: "center",
                fontSize: "2rem",
                letterSpacing: "0.2em",
                padding: "10px",
              },
              maxLength: currentWord.length,
            }}
            sx={{ mb: 2, width: "100%", maxWidth: "300px" }}
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
            {message && (
              <Alert
                severity={message.startsWith("Correct") ? "success" : "info"}
              >
                {message}
                {lastCaughtPokemon && message.startsWith("Correct") && (
                  <img
                    src={`/assets/images/sprites/${lastCaughtPokemon.sprite}`}
                    alt={lastCaughtPokemon.name}
                    style={{
                      width: "48px",
                      height: "48px",
                      marginTop: "8px",
                      imageRendering: "pixelated",
                    }}
                  />
                )}
              </Alert>
            )}
          </Box>

          {/* Action Buttons */}
          {message.startsWith("Correct") ? (
            <Button
              variant="contained"
              onClick={handleNextWord}
              sx={{ width: "100%", maxWidth: "300px" }}
            >
              Next Word
            </Button>
          ) : (
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
          )}
        </Box>
      </CardContent>
    </Card>
  );
}