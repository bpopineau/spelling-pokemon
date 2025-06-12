import { Routes, Route } from 'react-router-dom';
import GameMap from './components/GameMap';
import SceneView from './components/SceneView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<GameMap />} />
      <Route path="/scene/:sceneId" element={<SceneView />} />
    </Routes>
  );
}

export default App;