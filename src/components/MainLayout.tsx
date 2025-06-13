// Layout wrapper that adds the header on top of pages
import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function MainLayout() {
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