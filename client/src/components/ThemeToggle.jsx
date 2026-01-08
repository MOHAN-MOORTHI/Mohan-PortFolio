import { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'light') {
            root.classList.add('light');
        } else {
            root.classList.remove('light');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors hover:bg-white/10 light:hover:bg-black/10 text-yellow-400 light:text-orange-500"
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} className="text-slate-700" />}
        </button>
    );
};

export default ThemeToggle;
