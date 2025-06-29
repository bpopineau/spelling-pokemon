// ---------------------------------------------------------------------------
// SceneView Component (src/components/SceneView.tsx)
// ---------------------------------------------------------------------------
// Responsible for displaying a single scene, including its background art,
// music and the embedded SpellingChallenge component. Scenes are defined in the
// `scenes.json` data file so new areas can be added by writers without editing
// this code. The component uses React Router parameters to look up the scene by
// ID and then renders the appropriate assets.
import { useParams, useNavigate } from "react-router-dom";
// Scene definitions (background image, music track and word range) are stored in
// a JSON file so that new scenes can be created without touching React code.
import scenes from "@/data/scenes.json";
//
// Development Plan:
// - Provide graceful error handling if a scene ID is not found or the
//   background image fails to load so players aren't stuck on a blank screen.
// - Preload the next scene's assets while the current challenge is running to
//   reduce wait times during navigation.
// - Evaluate whether certain scene data (like background images) should be lazy
//   loaded via dynamic imports once the asset folder grows.
// - Document the data structure of scenes.json so writers can add new scenes
//   without touching TypeScript.
// - Add Cypress end-to-end tests that load each scene and verify that the
//   challenge component mounts correctly.
import SpellingChallenge from "./SpellingChallenge";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import Icon from "@/components/Icon";
import useBackgroundMusic from "@/hooks/useBackgroundMusic";

// Displays the chosen scene and its spelling challenge
export default function SceneView() {
  const { sceneId } = useParams();
  const navigate = useNavigate();
  const scene = scenes.find((s) => s.id === Number(sceneId));

  // Determine the music for this scene and play it using our hook.
  // The hook will handle starting and stopping the music automatically.
  const backgroundMusic = scene ? `/assets/sounds/${scene.music}` : null;
  useBackgroundMusic(backgroundMusic);

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

  // Construct the path to the scene's background image. All background assets
  // live under `public/assets/images/backgrounds/` as documented in assets.md.
  const backgroundPath = `/assets/images/backgrounds/${scene.background}`;

  return (
    <Box sx={{ bgcolor: "grey.100", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        {/* Top section with image and overlay header */}
        <Paper
          elevation={4}
          sx={{ position: "relative", mb: 4, overflow: "hidden" }}
        >
          {/* Header Bar */}
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
              sx={{ color: "white", fontWeight: "bold", textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
            >
              {scene.name}
            </Typography>
            {/* Empty div for spacing to keep title centered */}
            <Box sx={{ width: 150 }} />
          </Box>

          {/* Scene Image */}
          <img
            src={backgroundPath}
            alt={scene.name}
            style={{ width: "100%", display: "block" }}
          />
        </Paper>

        {/*
          The actual spelling gameplay is isolated in its own component. The
          word range passed here ties directly to the scene definition so adding
          a new scene is as simple as updating `scenes.json` with the correct
          indices.
        */}
        <Box component="main">
          <SpellingChallenge
            wordStart={scene.word_start}
            wordEnd={scene.word_end}
          />
        </Box>
      </Container>
    </Box>
  );
}