import { useEffect } from 'react';
import { playBackgroundMusic, stopBackgroundMusic } from '@/services/audioService';

/**
 * A custom React hook to manage background music for a component.
 * It will play the specified music source when the component mounts
 * and stop it when the component unmounts.
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