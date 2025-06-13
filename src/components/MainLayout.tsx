// Layout wrapper that adds the header on top of pages.
//
// React Router allows routes to nest. `MainLayout` is used as a wrapper for
// most pages so that they all display the same header component. The `<Outlet>`
// represents where the child route's element should be rendered.
import { Outlet } from "react-router-dom";
import Header from "./Header";

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
    </>
  );
}
