// File: src/components/SceneView.tsx

import { FC, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import scenesData from "@/data/scenes.json";
import SpellingChallenge from "./SpellingChallenge";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import Icon from "./Icon"; // adjust path as needed

interface Scene {
  id: number;
  name: string;
  background: string;
  word_start: number;
  word_end: number;
}

const SceneView: FC = () => {
  const { sceneId } = useParams<{ sceneId: string }>();
  const navigate = useNavigate();

  // Unconditionally call the hook
  const scene = useMemo<Scene | undefined>(() => {
    const id = Number(sceneId);
    return scenesData.find((s) => s.id === id);
  }, [sceneId]);

  // Early return if invalid
  if (!scene) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Scene Not Found
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Back to Map
        </Button>
      </Box>
    );
  }

  // Simple string concat—no hook needed
  const backgroundPath = `/assets/images/backgrounds/${scene.background}`;

  return (
    <Box sx={{ bgcolor: "grey.100", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        <Paper
          elevation={4}
          sx={{ position: "relative", mb: 4, overflow: "hidden" }}
        >
          <Box
            component="header"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0))",
            }}
          >
            <Button
              variant="contained"
              size="small"
              startIcon={<Icon name="backspace_icon" size={16} />}
              onClick={() => navigate("/")}
            >
              Back to Map
            </Button>
            <Typography
              variant="h5"
              component="h1"
              sx={{
                color: "white",
                fontWeight: "bold",
                textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
              }}
            >
              {scene.name}
            </Typography>
            <Box sx={{ width: 150 }} />
          </Box>

          <Box
            component="img"
            src={backgroundPath}
            alt={scene.name}
            loading="lazy"
            sx={{ width: "100%", display: "block" }}
          />
        </Paper>

        <Box component="main">
          <SpellingChallenge
            wordStart={scene.word_start}
            wordEnd={scene.word_end}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default SceneView;
