// SceneView shows a single scene background and the spelling challenge.
import { useParams, useNavigate } from "react-router-dom";
import scenes from "@/data/scenes.json";
import SpellingChallenge from "./SpellingChallenge";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import Icon from "@/components/Icon";

// Displays the chosen scene and its spelling challenge
export default function SceneView() {
  const { sceneId } = useParams();
  const navigate = useNavigate();
  const scene = scenes.find((s) => s.id === Number(sceneId));

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

        {/* Spelling Challenge Component */}
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