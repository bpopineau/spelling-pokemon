// File: src/components/MainLayout.tsx
//
// Wraps every page in the shared application chrome. It renders the global
// <Header> and delegates nested routes to React Router’s <Outlet>.
//
// If you decide to create a custom MUI theme later, you can wrap the layout
// in <ThemeProvider> here—but for now, no dark/light mode toggling is included.

import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout: FC = () => (
  <>
    {/* Global header */}
    <Header />

    {/* Routed page content */}
    <main role="main" style={{ minHeight: "calc(100vh - 64px)" }}>
      <Outlet />
    </main>

    {/* Placeholder for a future footer if needed */}
  </>
);

export default MainLayout;
