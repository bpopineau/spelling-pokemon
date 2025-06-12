import { useParams, useNavigate } from 'react-router-dom';
import scenes from '../data/scenes.json';
import SpellingChallenge from './SpellingChallenge';

export default function SceneView() {
  const { sceneId } = useParams();
  const navigate = useNavigate();

  const scene = scenes.find(s => s.id === Number(sceneId));

  if (!scene) {
    return (
      <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4">Scene Not Found</h1>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Back to Map
        </button>
      </div>
    );
  }

  const backgroundPath = `/assets/images/backgrounds/${scene.background}`;

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col p-4"
      style={{ backgroundImage: `url(${backgroundPath})` }}
    >
      {/* Header Area */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-4 mx-auto shrink-0">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-gray-800 bg-opacity-75 text-white rounded hover:bg-gray-700 z-10"
        >
          Back to Map
        </button>
        <h1 className="text-4xl font-bold text-white bg-gray-800 bg-opacity-75 px-6 py-3 rounded-lg">
          {scene.name}
        </h1>
        {/* This empty div helps balance the header so the title stays centered */}
        <div className="w-32"></div>
      </header>

      {/* Main Content Area to center the challenge */}
      <main className="flex-grow flex items-center justify-center w-full">
        <SpellingChallenge wordStart={scene.word_start} wordEnd={scene.word_end} />
      </main>
    </div>
  );
}