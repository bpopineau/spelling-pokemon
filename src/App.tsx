// ---------------------------------------------------------------------------
// Application Root (src/App.tsx)
// ---------------------------------------------------------------------------
// This file contains the central routing table for the entire application. It
// imports each high level screen component and assigns it to a URL using React
// Router. Navigation should always originate from here so contributors have a
// single place to check when adding new pages.
//
// Philosophy:
//  - Keep this file small: it should only describe *what* routes exist, not
//    the heavy business logic of those screens.
//  - All navigation should work via links as well as by manually entering a URL
//    in the browser. Deep linking is critical for sharing progress or scenes.
//  - Because this component renders immediately on page load it must remain
//    lightweight. Expensive code should be split into the individual screens
//    and lazily loaded if necessary.
import { Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
//
// Development Plan:
// - Enhance the 404 page with custom artwork or tips once assets are ready.
// - When more regions are introduced consider code-splitting heavy screens with
//   React.lazy to keep the initial bundle small.
// - Evaluate whether nested routing would simplify future sub-pages (e.g., a
//   settings menu) and restructure if needed.
// - Document all routes in README.md to keep navigation flows obvious for new
//   developers.
// - Provide sample unit tests for each top-level route component so behavior can
//   be validated during refactors.
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
      {/* Catch-all route for unknown URLs */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// Let other files import the App component
export default App;
