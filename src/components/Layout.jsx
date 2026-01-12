import React, { useState, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import ParticleBackground from './ParticleBackground';
import ChatBot from './ChatBot';


const Layout = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useLayoutEffect(() => {
        // Remove both and add current to ensure clean slate
        document.body.classList.remove('light-mode', 'dark-mode');
        document.body.classList.add(`${theme}-mode`);
        localStorage.setItem('theme', theme);

        // Listen for storage changes from other tabs/components
        const handleStorage = () => {
            const currentTheme = localStorage.getItem('theme');
            if (currentTheme && currentTheme !== theme) {
                setTheme(currentTheme);
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [theme]);

    const location = useLocation();
    const hideNavbarRoutes = ['/login', '/signup', '/forgot-password'];
    const showNavbar = !hideNavbarRoutes.includes(location.pathname) && !location.pathname.startsWith('/voyage');

    return (
        <>
            {theme === 'dark' && <ParticleBackground />}
            {showNavbar && <Navbar />}
            <div className="layout-content" style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>
              {/* Global Chatbot */}
            <ChatBot />
        </>
    );
};

export default Layout;
