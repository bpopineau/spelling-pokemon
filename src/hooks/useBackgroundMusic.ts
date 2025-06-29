// ---------------------------------------------------------------------------
// useBackgroundMusic Hook (src/hooks/useBackgroundMusic.ts)
// ---------------------------------------------------------------------------
// Small React hook that starts playing a background music track when a
// component mounts and stops it again when the component unmounts. By central
// izing this logic we ensure that only one audio element is active at a time and
// that pages clean up after themselves when users navigate.
import { useEffect } from 'react';
import { playBackgroundMusic, stopBackgroundMusic } from '@/services/audioService';
//
// Development Plan:
// - Add a dependency on user settings (e.g., mute or volume level) so the hook
//   respects preferences stored in `settings.json`.
// - Provide a way to fade music in and out rather than starting/stopping
//   abruptly. This could reuse the Web Audio API for smoother transitions.
// - Document how to supply custom music tracks in assets.md so composers know
//   the expected file format and location.
// - Explore adding a "no music" option for accessibility or classroom use.

/**
 * A custom React hook to manage background music for a component.
 * Keeping the audio logic here prevents duplication across pages and ensures
 * that only one track is playing at a time.
 * @param src The path to the audio file to play. Can be null to play nothing.
 */
const useBackgroundMusic = (src: string | null) => {
    useEffect(() => {
        // If a music source is provided, play it.
        if (src) {
            playBackgroundMusic(src);
        }

        // This is a cleanup function that React runs when the component unmounts.
        // This is crucial for stopping the music when navigating to a new page.
        return () => {
            stopBackgroundMusic();
        };
    }, [src]); // This effect will re-run if the music source changes.
};

export default useBackgroundMusic;