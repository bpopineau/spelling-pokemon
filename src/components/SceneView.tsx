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
            className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4"
            style={{ backgroundImage: `url(${backgroundPath})` }}
        >
            <div className="absolute top-4 left-4">
                <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 bg-gray-800 bg-opacity-75 text-white rounded hover:bg-gray-700"
                >
                    Back to Map
                </button>
            </div>
            <h1 className="text-4xl font-bold text-white bg-gray-800 bg-opacity-75 px-6 py-3 rounded-lg mb-8">
                {scene.name}
            </h1>

            <SpellingChallenge wordStart={scene.word_start} wordEnd={scene.word_end} />

        </div>
    );
}