// File: src/components/SpellingChallenge.tsx

import React, { FC, useState, useEffect, useMemo, FormEvent } from "react";
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

import Controls from "./Controls";
import OnScreenKeyboard from "./OnScreenKeyboard";
import ProgressBar from "./ProgressBar";
import { speak } from "@/services/ttsService";
import { useGameStore } from "@/services/gameState";

import words from "@/data/words.json";
import pokemonData from "@/data/pokemon.json";
import scenes from "@/data/scenes.json";

interface SpellingChallengeProps {
  wordStart: number;
  wordEnd: number;
}

/**
 * Core spelling challenge component.
 * Handles word progression, input, feedback, XP rewards, and Pokémon catching.
 * TODO: Extract spelling logic into a custom hook for unit testing and reuse.
 */
const SpellingChallenge: FC<SpellingChallengeProps> = ({
  wordStart,
  wordEnd,
}) => {
  // --- Global Game State ---
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

  // --- Local UI State ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [shaking, setShaking] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [lastCaught, setLastCaught] = useState<{
    id: number;
    name: string;
    sprite: string;
  } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // --- Derived Scene Data ---
  const scene = useMemo(
    () =>
      scenes.find((s) => s.word_start === wordStart && s.word_end === wordEnd),
    [wordStart, wordEnd],
  );
  // TODO: Handle missing scene (e.g., show error or fallback UI)

  const sceneWords = useMemo(
    () => words.slice(wordStart, wordEnd + 1),
    [wordStart, wordEnd],
  );
  const currentWord = sceneWords[currentIndex] || "";

  // --- Level & XP Calculations ---
  const { xpCurrent, xpTotal } = useMemo(() => {
    const xpForPrevLevel = (level - 1) * 100;
    return {
      xpCurrent: xp - xpForPrevLevel,
      xpTotal: xpToNextLevel - xpForPrevLevel,
    };
  }, [xp, level, xpToNextLevel]);

  // --- Reset on Scene Change ---
  useEffect(() => {
    setCurrentIndex(0);
    setInputValue("");
    setFeedbackMsg("");
    setLastCaught(null);
    setAnswered(false);
  }, [wordStart, wordEnd]);

  // --- Text-to-Speech on Word Change ---
  useEffect(() => {
    if (currentWord) speak(currentWord);
  }, [currentWord]);

  // --- Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = e.target.value.replace(/[^a-zA-Z]/g, "").toLowerCase();
    if (sanitized.length <= currentWord.length) {
      setInputValue(sanitized);
    }
  };

  const handleKeyboardInput = (char: string) => {
    if (!answered && inputValue.length < currentWord.length) {
      setInputValue((prev) => (prev + char).slice(0, currentWord.length));
    }
  };

  const handleBackspace = () => {
    setInputValue((prev) => prev.slice(0, -1));
  };

  const handleRepeat = () => {
    if (currentWord) speak(currentWord);
  };

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!currentWord || answered) return;

    if (inputValue.toLowerCase() === currentWord.toLowerCase()) {
      // Correct answer
      setAnswered(true);
      addXp(10);
      incrementWordsMastered();

      // Catch next available Pokémon
      const candidates = pokemonData.filter((p) => p.scene_id === scene?.id);
      const nextPoke = candidates.find(
        (p) => !collectedPokemonIds.includes(p.id),
      );

      if (nextPoke) {
        catchPokemon(nextPoke.id);
        setLastCaught(nextPoke);
        setDialogOpen(true);
      } else {
        setFeedbackMsg("Correct! 🎉");
      }
    } else {
      // Incorrect answer
      setFeedbackMsg("Try again!");
      setShaking(true);
      setTimeout(() => setShaking(false), 820); // TODO: Move duration constant to config
    }
  };

  const handleNext = () => {
    if (currentIndex < sceneWords.length - 1) {
      setCurrentIndex((idx) => idx + 1);
      setInputValue("");
      setFeedbackMsg("");
      setLastCaught(null);
      setAnswered(false);
    } else {
      // Scene complete
      setFeedbackMsg("You completed this scene! 🏆");
      if (scene) completeScene(scene.id);
      setAnswered(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    handleNext();
  };

  const handleHint = () => {
    if (
      hintCharges > 0 &&
      !answered &&
      inputValue.length < currentWord.length
    ) {
      const nextChar = currentWord[inputValue.length];
      setInputValue((prev) => prev + nextChar);
      spendHint();
    }
  };

  // --- Render ---
  if (!scene || !currentWord) {
    return <Typography>Loading challenge...</Typography>;
  }

  // Construct blanks display
  const blanks = currentWord
    .split("")
    .map((_, i) => <span key={i}>{inputValue[i]?.toUpperCase() || "_"}</span>);

  return (
    <>
      {/* TODO: Move keyframes into CSS/Emotion/styled component */}
      <style>{`
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>

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
              <Typography variant="h5">{level}</Typography>
            </Box>

            <Box sx={{ width: "40%" }}>
              <ProgressBar current={xpCurrent} total={xpTotal} />
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="caption" color="text.secondary">
                HINTS
              </Typography>
              <Typography variant="h5">{hintCharges}</Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Spelling Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ textAlign: "center" }}
          >
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
              }}
            >
              {blanks}
            </Typography>

            <TextField
              value={inputValue.toUpperCase()}
              onChange={handleInputChange}
              autoFocus
              autoComplete="off"
              variant="outlined"
              disabled={answered}
              sx={{
                mb: 2,
                width: "100%",
                maxWidth: 300,
                animation: shaking ? "shake 0.82s" : "none",
              }}
              inputProps={{
                style: {
                  textAlign: "center",
                  fontSize: 24,
                  letterSpacing: "0.2em",
                  padding: 10,
                },
                maxLength: currentWord.length,
              }}
            />

            <OnScreenKeyboard
              onKey={handleKeyboardInput}
              onBackspace={handleBackspace}
            />

            {/* Feedback */}
            <Box
              sx={{
                height: 90,
                mt: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {feedbackMsg && !feedbackMsg.startsWith("Correct") && (
                <Alert
                  severity={
                    feedbackMsg.includes("completed") ? "success" : "info"
                  }
                >
                  {feedbackMsg}
                </Alert>
              )}
            </Box>

            {/* Actions */}
            {answered && !dialogOpen ? (
              <Button
                fullWidth
                sx={{ maxWidth: 300 }}
                variant="contained"
                onClick={handleNext}
              >
                Next Word
              </Button>
            ) : (
              <Controls
                onSubmit={handleSubmit}
                onHint={handleHint}
                onRepeat={handleRepeat}
                hintDisabled={hintCharges <= 0 || answered}
                submitDisabled={answered}
              />
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Catch Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          You caught a {lastCaught?.name}!
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <img
            src={`/assets/images/pokemon/${String(lastCaught?.id).padStart(3, "0")}.png`}
            alt={lastCaught?.name}
            style={{ width: "100%", maxWidth: 250, margin: "auto" }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button variant="contained" onClick={handleCloseDialog} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SpellingChallenge;
