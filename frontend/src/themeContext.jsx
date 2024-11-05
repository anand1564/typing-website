import React, { createContext, useState } from 'react';
     import { themes } from './themes';

     export const ThemeContext = createContext(null);

     export const ThemeProvider = ({ children }) => {
       const [theme, setTheme] = useState('light');

       const toggleTheme = () => {
         setTheme((prevTheme) =>
           prevTheme === 'light' ? 'dark' : prevTheme === 'dark' ? 'terminal' : 'light'
         );
       };

       return (
         <ThemeContext.Provider value={{ theme, toggleTheme, themes }}>
           {children}
         </ThemeContext.Provider>
       );
     };