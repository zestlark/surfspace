import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, saveTheme } from '../app/reducers/appSettingReducer';

const Theme = () => {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.appSetting.theme);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        dispatch(setTheme(newTheme));
        dispatch(saveTheme(newTheme));
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
