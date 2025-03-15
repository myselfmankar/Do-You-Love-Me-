// context/ThemeContext.js
import { createContext } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

export default ThemeContext;