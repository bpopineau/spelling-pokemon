// Vite configuration file. This tells Vite how to build the project.
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//
// Development Plan:
// - Configure a base path (`base` option) once the game is deployed under a
//   subdirectory so asset URLs resolve correctly.
// - Evaluate integrating the PWA plugin to enable offline caching when the
//   gameplay loop is finalized.
// - Add additional aliases for shared libraries if the project grows beyond the
//   current small structure.
// - Document common build commands in README.md so new contributors know how to
//   create production bundles.
// - Provide an example of enabling source maps in production for easier
//   debugging of deployed builds.
// https://vite.dev/config/
export default defineConfig({
    // Enable React support
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
