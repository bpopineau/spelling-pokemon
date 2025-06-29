// ---------------------------------------------------------------------------
// audioService (src/services/audioService.ts)
// ---------------------------------------------------------------------------
// Minimal helper functions for managing background music playback. All logic
// funnels through a single `<audio>` element so that only one track plays at a
// time even when navigating between pages. Volume settings are read from
// `settings.json` but in the future should come from the persistent game store
// to allow in-game adjustments.
import settings from '@/data/settings.json';
//
// Development Plan:
// - Wrap this logic in a more robust audio manager that can handle overlapping
//   sound effects in addition to background music.
// - Read volume and mute settings from the Zustand store so changes persist
//   across sessions.
// - When Service Workers are added, consider caching audio files for offline
//   support.
// - Document where audio assets live and recommended formats in assets.md so
//   replacement or additional tracks follow the same conventions.
// - Investigate adding fade-in/out helpers here so multiple components don't
//   reimplement that logic.

// A very small wrapper around the HTMLAudioElement used for background music.
// By reusing a single audio element we avoid overlapping tracks when the user
// navigates between pages.

// This single audio element will be shared across the entire application.
let audio: HTMLAudioElement | null = null;
let currentSrc: string | null = null;

const getAudioElement = (): HTMLAudioElement => {
    // Lazily create the audio element the first time we need it. All further
    // calls reuse this element so multiple tracks don't stack up.
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