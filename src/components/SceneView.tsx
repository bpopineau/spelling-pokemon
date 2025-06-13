// SceneView shows a single scene background and the spelling challenge.
import { useParams, useNavigate } from "react-router-dom";
import scenes from "@/data/scenes.json";
import SpellingChallenge from "./SpellingChallenge";
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Displays the chosen scene and its spelling challenge
export default function SceneView() {
  const { sceneId } = useParams();
  const navigate = useNavigate();
  const scene = scenes.find((s) => s.id === Number(sceneId));

  if (!scene) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Scene Not Found</Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Back to Map
        </Button>
      </Box>
    );
  }

  const backgroundPath = `/assets/images/backgrounds/${scene.background}`;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${backgroundPath})`,
        p: 2,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Top bar with the back button and scene name */}
      <Box
        component="header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          mx: 'auto',
          width: '100%',
          maxWidth: 'lg'
        }}
      >
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
        >
          Back to Map
        </Button>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: "white",
            bgcolor: "rgba(0, 0, 0, 0.6)",
            px: 3,
            py: 1,
            borderRadius: 2,
          }}
        >
          {scene.name}
        </Typography>
        {/* Empty div for spacing to keep title centered */}
        <Box sx={{ width: 150 }} />
      </Box>

      {/* Main content where the spelling challenge appears */}
      <Container
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SpellingChallenge
          wordStart={scene.word_start}
          wordEnd={scene.word_end}
        />
      </Container>
    </Box>
  );
}