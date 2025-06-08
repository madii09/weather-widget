import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
	const [isDark, setIsDark] = useState(() => {
		return localStorage.getItem('theme') === 'dark';
	});

	useEffect(() => {
		document.body.className = isDark ? 'dark' : 'light';
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	}, [isDark]);

	const toggleTheme = () => setIsDark(prev => !prev);

	return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
};
