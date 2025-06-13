// The main application component.
//
// This file wires together all of the high level screens in the game. React
// Router is used to map URLs to components so that navigation works both when
// clicking links and when a player reloads the page with a deep link.
import { Routes, Route } from "react-router-dom";
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
function App() {
  return (
    // Define the URL structure for the game. Each `<Route>` maps a path to the
    // component that should render when that path is active.
    <Routes>
      {/* Routes that share the header */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<GameMap />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/progress" element={<ProgressTracker />} />
      </Route>

      {/* This screen hides the header so the scene fills the page */}
      <Route path="/scene/:sceneId" element={<SceneView />} />
      {/* TODO: add a <Route> for unmatched URLs to show a 404 screen */}
    </Routes>
  );
}

// Let other files import the App component
export default App;
