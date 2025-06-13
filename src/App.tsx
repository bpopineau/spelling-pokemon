import { Routes, Route } from "react-router-dom";
import GameMap from "./components/GameMap";
import SceneView from "./components/SceneView";
import Pokedex from "./components/Pokedex";
import ProgressTracker from "./components/ProgressTracker";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Routes>
      {/* Routes that should have the main header */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<GameMap />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/progress" element={<ProgressTracker />} />
      </Route>

      {/* Route without the header */}
      <Route path="/scene/:sceneId" element={<SceneView />} />
    </Routes>
  );
}

export default App;
