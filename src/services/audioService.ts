import settings from '@/data/settings.json';

// This single audio element will be shared across the entire application.
let audio: HTMLAudioElement | null = null;
let currentSrc: string | null = null;

const getAudioElement = (): HTMLAudioElement => {
    if (!audio) {
        audio = new Audio();
        audio.loop = true; // Ensure the music loops
        if (settings.audio) {
            // Volume is a value between 0 and 1, settings use 0-100.
            audio.volume = (settings.music_volume || 80) / 100;
        } else {
            audio.volume = 0; // Muted if audio is disabled
        }
    }
    return audio;
};

/**
 * Plays a background music track.
 * @param src The path to the audio file.
 */
export const playBackgroundMusic = (src: string) => {
    const audioElement = getAudioElement();

    // If the same music is already playing, do nothing.
    if (currentSrc === src && !audioElement.paused) {
        return;
    }

    // If a different track is playing, or it's paused, start the new one.
    audioElement.src = src;
    currentSrc = src;
    audioElement.play().catch(error => console.error("Audio play failed:", error));
};

/**
 * Stops the currently playing background music.
 */
export const stopBackgroundMusic = () => {
    const audioElement = getAudioElement();
    if (!audioElement.paused) {
        audioElement.pause();
        currentSrc = null; // Clear the current source
    }
};