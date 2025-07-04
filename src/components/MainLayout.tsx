// ---------------------------------------------------------------------------
// MainLayout Component (src/components/MainLayout.tsx)
// ---------------------------------------------------------------------------
// Provides the shared page chrome used by most routes. At the moment this is
// just a header, but additional global UI (footers, modal containers, etc.)
// should also be registered here. Using a layout component keeps our routing
// tree small and ensures the same elements appear on every screen without
// repetition.
//
// React Router allows routes to nest. `MainLayout` is used as a wrapper for
// most pages so that they all display the same header component. The `<Outlet>`
// represents where the child route's element should be rendered.
import { Outlet } from "react-router-dom";
import Header from "./Header";
//
// Development Plan:
// - Introduce a Footer component for additional navigation or legal links.
// - If modal dialogs become common, add a shared placeholder here so pages can
//   open modals without rendering them individually.
// - Consider wrapping the layout in an error boundary to gracefully handle
//   unexpected issues in nested routes.
// - Document the expected layout structure in docs/DEVELOPMENT_NOTES.md so new pages
//   follow the same conventions.

// Wrapping pages with `MainLayout` ensures a consistent header. Additional
// shared UI elements (like a footer or global modals) should be added here so
// they appear across all pages.
export default function MainLayout() {
  // This component simply arranges the shared header and whatever page
  // component is currently active. React Router injects that page via
  // the `<Outlet>` element below.
  return (
    <>
      {/* Shared header */}
      <Header />
      <main>
        {/* The nested page content goes here */}
        <Outlet />
      </main>
      {/* TODO: support an optional footer component when more pages need it */}
    </>
  );
}