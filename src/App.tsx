import { Routes, Route, useLocation } from 'react-router-dom';
import GameMap from './components/GameMap';
import SceneView from './components/SceneView';
import Pokedex from './components/Pokedex';
import Header from './components/Header';

function App() {
  const location = useLocation();
  // We will only show the main header on the map and pokedex pages,
  // not inside an active game scene.
  const showHeader = !location.pathname.startsWith('/scene/');

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<GameMap />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/scene/:sceneId" element={<SceneView />} />
      </Routes>
    </>
  );
}

export default App;