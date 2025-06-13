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
  plugins: [
    react(),             // React 18 Fast Refresh + JSX transform
    tsconfigPaths(),     // Keeps @/ alias (and others) synced with tsconfig.json
    svgr(),              // Import SVGs:  import { ReactComponent as Logo } from './logo.svg?react'
  ],

  // Optional: customize the dev server
  server: {
    port: 5173,
    open: true,
  },

  // Build tweaks (Tree-shaking already handled by default)
  build: {
    target: "es2020",
    sourcemap: false,
  },
});
