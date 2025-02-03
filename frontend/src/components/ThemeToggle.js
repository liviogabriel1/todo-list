import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="theme-toggle"
            aria-label="Toggle Dark Mode"
        >
            {darkMode ? (
                <FiSun className="w-5 h-5" />
            ) : (
                <FiMoon className="w-5 h-5" />
            )}
        </button>
    );
};

export default ThemeToggle;