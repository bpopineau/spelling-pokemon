// The main application component.
//
// This file wires together all of the high level screens in the game. React
// Router is used to map URLs to components so that navigation works both when
// clicking links and when a player reloads the page with a deep link.
import { Routes, Route } from "react-router-dom";
//
// Development Plan:
// - Add a dedicated 404/NotFound component and route so unmatched URLs redirect
//   players back to the map with a helpful message.
// - When more regions are introduced consider code-splitting heavy screens with
//   React.lazy to keep the initial bundle small.
// - Evaluate whether nested routing would simplify future sub-pages (e.g., a
//   settings menu) and restructure if needed.
// Screen that displays the overworld map where scenes can be selected
import GameMap from "./components/GameMap";
// Screen where the actual spelling challenge for a scene takes place
import SceneView from "./components/SceneView";
// Shows a list of all Pokémon that the player has caught so far
import Pokedex from "./components/Pokedex";
// Displays current XP, level and badges the player has earned
import ProgressTracker from "./components/ProgressTracker";
// Wrapper component that injects the persistent header into certain routes
import MainLayout from "./components/MainLayout";

// `App` only contains the routing table. The heavy lifting for game logic lives
// inside the individual components listed here.
// The router is intentionally kept flat and simple. If new screens are added
// later they should be registered here so navigation remains consistent across
// the entire app.
function App() {
  return (
    // Define the URL structure for the game. Each `<Route>` maps a path to the
    // component that should render when that path is active.
    <Routes>
      {/* Routes that share the header */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<GameMap />} />
        {/* The Pokédex and progress screens both reuse the global header */}
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/progress" element={<ProgressTracker />} />
      </Route>

      {/*
        Scene pages do not include the persistent header so the challenge fills
        the viewport. The sceneId parameter corresponds to an entry in
        `scenes.json` which defines the background, music track and word range
        for that scene.
      */}
      <Route path="/scene/:sceneId" element={<SceneView />} />
      {
        /*
          TODO: Add a catch-all <Route> for unknown URLs. This ensures broken
          links gracefully lead the player back to the main map. The 404 page
          could reuse components from `shadcn/ui` to stay consistent with the
          rest of the design.
        */
      }
    </Routes>
  );
}

// Let other files import the App component
export default App;
