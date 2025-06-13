// SceneView shows a single scene background and the spelling challenge.
//
// The URL for this component includes the numeric ID of the scene to display.
// Based on that ID we look up the scene details (name, background image and
// word range) from `scenes.json`. The corresponding `SpellingChallenge`
// component is then rendered to handle the actual gameplay for that scene.
import { useParams, useNavigate } from "react-router-dom";
import scenes from "../data/scenes.json"; // scene details such as background
import SpellingChallenge from "./SpellingChallenge";

// Displays the chosen scene and its spelling challenge
export default function SceneView() {
  // Extract the scene ID from the URL parameters
  const { sceneId } = useParams();

  // Navigation utility from React Router used for the "Back to Map" button
  const navigate = useNavigate();

  // Look up the matching scene data from the scenes JSON using the ID from the
  // URL. `Number(sceneId)` safely converts the param from string to number.
  const scene = scenes.find((s) => s.id === Number(sceneId));

  // If the scene doesn't exist show an error screen
  if (!scene) {
    return (
      <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4">Scene Not Found</h1>
        {/* TODO: Replace this HTML button with a shadcn/ui Button for a
            consistent look across the app.
            See https://ui.shadcn.com/docs/components/button */}
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Back to Map
        </button>
      </div>
    );
  }

  // Build the path to the scene background image from the file name stored in
  // the scenes JSON. The actual image lives in `public/assets/images/backgrounds`.
  // See `assets.md` for the full list of provided backgrounds.
  const backgroundPath = `/assets/images/backgrounds/${scene.background}`;
  // TODO: show a fallback UI if the background image is missing

  // TODO: Play the background music for this scene using `scene.music`.
  // The music files (e.g. `bg_forest.ogg`) are located in
  // `public/assets/sounds/` as documented in `assets.md`. A simple
  // `<audio>` element or custom hook can start playback when the component
  // mounts and stop it on unmount.

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col p-4"
      style={{ backgroundImage: `url(${backgroundPath})` }}
    >
      {/* Top bar with the back button and scene name */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-4 mx-auto shrink-0">
        {/* TODO: Use a shadcn/ui Button here as well so navigation controls
            share a common style. */}
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-800 bg-opacity-75 text-white rounded hover:bg-gray-700 z-10"
        >
          Back to Map
        </button>
        <h1 className="text-4xl font-bold text-white bg-gray-800 bg-opacity-75 px-6 py-3 rounded-lg">
          {scene.name}
        </h1>
        {/* This empty div keeps the title centered by taking up space */}
        <div className="w-32"></div>
      </header>

      {/* Main content where the spelling challenge appears. The word range
          (start and end indexes) comes from the scene data. */}
      <main className="flex-grow flex items-center justify-center w-full">
        <SpellingChallenge
          wordStart={scene.word_start}
          wordEnd={scene.word_end}
        />
      </main>
    </div>
  );
}
