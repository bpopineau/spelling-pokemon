/**
 * Tailwind CSS configuration.
 * It tells Tailwind to scan our HTML and TS files for class names.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
