// The main application component. It defines all the different
// screens you can visit and which component shows on each one.
import { Routes, Route } from "react-router-dom";
// Map screen showing the world
import GameMap from "./components/GameMap";
// Scene screen where spelling challenges happen
import SceneView from "./components/SceneView";
// A simple list of Pokémon the player has caught
import Pokedex from "./components/Pokedex";
// Stats about the player's progress
import ProgressTracker from "./components/ProgressTracker";
// Layout that provides the shared header
import MainLayout from "./components/MainLayout";

// App holds the routes for the entire game
function App() {
  return (
    // Define the URLs and which screen they show
    <Routes>
      {/* Routes that share the header */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<GameMap />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/progress" element={<ProgressTracker />} />
      </Route>

      {/* This screen hides the header so the scene fills the page */}
      <Route path="/scene/:sceneId" element={<SceneView />} />
    </Routes>
  );
}

// Let other files import the App component
export default App;
