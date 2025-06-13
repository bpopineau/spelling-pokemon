// File: src/main.tsx
//
// React application bootstrap.
// - Attaches React 18 root to #root element
// - Wraps app in <BrowserRouter> for routing
// - Uses <StrictMode> for dev-time warnings
//

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css"; // Global Tailwind / MUI baseline styles
import App from "./App";

const container = document.getElementById("root");

if (!container) {
  // Fail fast: root element must exist for React to mount
  throw new Error("#root element not found in index.html");
}

// React 18 createRoot API
createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
