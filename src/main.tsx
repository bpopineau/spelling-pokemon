// ---------------------------------------------------------------------------
// Application Bootstrap (src/main.tsx)
// ---------------------------------------------------------------------------
// This file is the first code that runs in the browser. Its job is to mount the
// React application into the DOM and configure any global providers. Vite points
// to this module as the main entry when bundling the project.
//
// By isolating the bootstrapping logic here we can easily swap out rendering
// strategies (for example switching to server-side rendering or adding an error
// boundary) without having to refactor the rest of the codebase.
import { StrictMode } from "react";
//
// Development Plan:
// - Introduce an error boundary component around <App> so unexpected runtime
//   errors show a friendly message rather than a blank screen.
// - Consider lazy loading larger screens with React.lazy and <Suspense> once
//   routing becomes more complex.
// - This is also the ideal place to initialize service worker registration when
//   offline support becomes a goal.
// - Document environment variables used by Vite (e.g., API endpoints) so they
//   are easy to configure in different deployments.
// - Provide a small example of how to mount additional providers (theme,
//   internationalization) to guide contributors adding new frameworks.
// `createRoot` gives us full control over how React attaches to the DOM. This is
// the modern replacement for `ReactDOM.render` and enables React 18 features
// such as concurrent rendering.
import { createRoot } from "react-dom/client";
// `BrowserRouter` manages navigation and keeps the URL in sync with the current
// screen. It enables deep links (e.g. `/pokedex`) to work correctly.
import { BrowserRouter } from "react-router-dom";
// Global styles
import "./index.css";
// The main App component that holds all screens
import App from "./App.tsx";

// Tip for future developers: if we ever introduce client side persistence
// libraries (e.g. React Query or a global state sync), this is the ideal file
// to initialize those providers so the entire app can access them.

// Locate the `#root` element and render our React application into it. The
// `StrictMode` wrapper enables additional checks and warnings in development
// builds which help catch subtle bugs.
createRoot(document.getElementById("root")!).render(
  // StrictMode helps spot potential problems while developing
  <StrictMode>
    {/*
      BrowserRouter provides the routing context so that components like
      `<Link>` and `<Route>` work. Without it the app would not know how to
      respond to URL changes.
      If service workers or additional providers are needed they can also be
      mounted inside this wrapper.
    */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);