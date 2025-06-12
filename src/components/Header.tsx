import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
    const linkStyle = "px-4 py-2 rounded-md text-lg font-semibold";
    const activeLinkStyle = "bg-blue-500 text-white";
    const inactiveLinkStyle = "bg-gray-200 text-gray-800 hover:bg-gray-300";

    return (
        <header className="bg-white shadow-md p-4 mb-8">
            <nav className="flex justify-center items-center gap-4">
                <NavLink
                    to="/"
                    className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}
                >
                    Map
                </NavLink>
                <NavLink
                    to="/pokedex"
                    className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}
                >
                    Pokédex
                </NavLink>
            </nav>
        </header>
    );
}