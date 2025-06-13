// Entry point of the React application.
// This file finds the root div in index.html and tells React
// to draw our game there.
import { StrictMode } from "react";
// createRoot lets us control how React is attached to the page
import { createRoot } from "react-dom/client";
// BrowserRouter keeps the URL in sync with the game screens
import { BrowserRouter } from "react-router-dom";
// Global Tailwind styles
import "./index.css";
// The main App component that holds all screens
import App from "./App.tsx";

// Find the #root div and tell React to draw inside it
createRoot(document.getElementById("root")!).render(
  // StrictMode helps spot potential problems while developing
  <StrictMode>
    {/* BrowserRouter enables page navigation */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
