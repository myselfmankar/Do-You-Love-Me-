// components/Layout.jsx
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import '../styles/Layout.css';

const Layout = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={`app ${theme}`}>
      <ThemeToggle />
      <Outlet />
      <footer>
        <p>Made by Xenon</p>
      </footer>
    </div>
  );
};

export default Layout;