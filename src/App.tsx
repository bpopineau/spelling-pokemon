// File: src/App.tsx
//
// Top-level routing table for Spelling Adventure.
// Maps URL paths to page components. Shared layout (header) is supplied
// by <MainLayout>. Scene pages render fullscreen without the header.
//

import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import GameMap from "./components/GameMap";
import SceneView from "./components/SceneView";
import Pokedex from "./components/Pokedex";
import ProgressTracker from "./components/ProgressTracker";
import MainLayout from "./components/MainLayout";

// Simple fallback page for unmatched routes
const NotFound: FC = () => (
  <main style={{ padding: "4rem", textAlign: "center" }}>
    <h1>404 – Page Not Found</h1>
    <p>Oops! That page doesn’t exist.</p>
  </main>
);

const App: FC = () => (
  <Routes>
    {/* Routes that include the global header via MainLayout */}
    <Route element={<MainLayout />}>
      <Route path="/" element={<GameMap />} />
      <Route path="/pokedex" element={<Pokedex />} />
      <Route path="/progress" element={<ProgressTracker />} />
    </Route>

    {/* Fullscreen scene view (no header) */}
    <Route path="/scene/:sceneId" element={<SceneView />} />

    {/* Catch-all 404 route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
