// The persistent header that appears on most screens.
//
// It contains navigation links allowing the player to move between the world
// map, the Pokédex and the progress tracker. `NavLink` from React Router is used
// so that the active link can be styled differently.
import { NavLink } from "react-router-dom";

export default function Header() {
  // CSS class fragments used to style the navigation links. Keeping them in
  // variables makes the JSX below easier to read and maintain.
  const linkStyle = "px-4 py-2 rounded-md text-lg font-semibold";
  const activeLinkStyle = "bg-blue-500 text-white";
  const inactiveLinkStyle = "bg-gray-200 text-gray-800 hover:bg-gray-300";
  // TODO: move nav links into a shared array so new sections are easier to add
  // TODO: Consider using shadcn/ui's NavigationMenu for these links.
  // The NavLink components from react-router-dom could be wrapped by or used
  // with shadcn/ui's navigation components.
  // Specifically, NavigationMenuList, NavigationMenuItem, NavigationMenuLink,
  // and navigationMenuTriggerStyle from shadcn/ui could be relevant.

  return (
    <header className="bg-white shadow-md p-4 mb-8">
      {/* Navigation links */}
      {/* Consider using shadcn/ui's NavigationMenu here.
          See https://ui.shadcn.com/docs/components/navigation-menu */}
      <nav className="flex justify-center items-center gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`
          }
        >
          Map
        </NavLink>
        <NavLink
          to="/pokedex"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`
          }
        >
          Pokédex
        </NavLink>
        <NavLink
          to="/progress"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`
          }
        >
          Progress
        </NavLink>
      </nav>
    </header>
  );
}
