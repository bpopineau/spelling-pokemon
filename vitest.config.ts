import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 👇 IMPORTANT: Set the correct base path
export default defineConfig({
  base: "/spelling-pokemon/", // Use your repo name here!
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
