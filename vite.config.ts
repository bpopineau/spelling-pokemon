// File: vite.config.ts
//
// Vite configuration for Spelling Adventure.
// • React fast-refresh + TSX support
// • Automatic path-aliases pulled from tsconfig (keeps “@/*” in sync)
// • SVG import as React components via ?react
//

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  // 👇👇👇 This is CRUCIAL for GitHub Pages!
  base: "/spelling-pokemon/",

  plugins: [
    react(), // React 18 Fast Refresh + JSX transform
    tsconfigPaths(), // Keeps @/ alias (and others) synced with tsconfig.json
    svgr(), // Import SVGs:  import { ReactComponent as Logo } from './logo.svg?react'
  ],

  server: {
    port: 5173,
    open: true,
  },

  build: {
    target: "es2020",
    sourcemap: false,
  },
});
