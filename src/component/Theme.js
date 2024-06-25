import React, { useEffect, useState } from 'react';

const Theme = () => {
    const [theme, setTheme] = useState(sessionStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(theme);
        sessionStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
        setTheme(newTheme);

        // console.log(document.documentElement.classList);
        // console.log(theme);
    };

    return (
        <label className="swap swap-rotate text-xl bg-slate-100 dark:bg-slate-700 w-8 h-8 rounded-full">
            <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
            <i className="swap-on ri-sun-line"></i>
            <i className="swap-off ri-moon-line"></i>
        </label>
    );
}

export default Theme;
