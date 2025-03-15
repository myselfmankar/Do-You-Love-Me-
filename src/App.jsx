import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ConfessionPage from './components/ConfessionPage';
import ResultPage from './components/ResultPage';
import NotFoundPage from './components/NotFoundPage';
import ThemeContext from './context/ThemeContext';
import Layout from './components/Layout';
import './styles/App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [userName, setUserName] = useState('');
  const [noAttempts, setNoAttempts] = useState(0);
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ConfessionPage 
              setUserName={setUserName} 
              noAttempts={noAttempts}
              setNoAttempts={setNoAttempts}
            />} />
            <Route path="result" element={
              <ResultPage userName={userName} noAttempts={noAttempts} />
            } />
            <Route path="404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;