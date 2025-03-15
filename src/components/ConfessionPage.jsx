import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/ConfessionPage.css';

const ConfessionPage = ({ setUserName, noAttempts, setNoAttempts }) => {
  const [name, setName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [difficulty, setDifficulty] = useState(1);
  const navigate = useNavigate();
  const noButtonRef = useRef(null);
  
  useEffect(() => {
    setIsValid(name.trim().length > 0);
  }, [name]);
  
  const handleYesClick = () => {
    if (isValid) {
      setUserName(name);
      navigate('/result');
    }
  };
  
  const handleNoHover = () => {
    if (!noButtonRef.current) return;
    
    // Increase difficulty with each attempt
    if (difficulty < 5) {
      setDifficulty(prev => Math.min(prev + 0.2, 5));
    }
    
    setNoAttempts(prev => prev + 1);
    
    // Calculate new position
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 60;
    
    // More unpredictable movement at higher difficulties
    const randomFactor = difficulty * 50;
    const moveDirectionX = Math.random() < 0.5 ? -1 : 1;
    const moveDirectionY = Math.random() < 0.5 ? -1 : 1;
    
    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);
    
    // Add some physics-like movement at higher difficulties
    if (difficulty > 2) {
      const curX = parseInt(noButtonRef.current.style.left) || 0;
      const curY = parseInt(noButtonRef.current.style.top) || 0;
      
      randomX = Math.max(0, Math.min(maxX, curX + moveDirectionX * randomFactor));
      randomY = Math.max(0, Math.min(maxY, curY + moveDirectionY * randomFactor));
    }
    
    // Apply position
    noButtonRef.current.style.position = 'absolute';
    noButtonRef.current.style.left = `${randomX}px`;
    noButtonRef.current.style.top = `${randomY}px`;
    
    // Add a slight rotation for fun
    const rotation = Math.random() * 20 - 10;
    noButtonRef.current.style.transform = `rotate(${rotation}deg)`;
  };
  
  return (
    <div className="confession-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Do you love me?</h1>
        
        <div className="name-input">
          <input 
            type="text" 
            placeholder="Your name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            aria-label="Your name"
          />
        </div>
        
        <div className="buttons-container">
          <motion.button 
            className="yes-btn"
            onClick={handleYesClick}
            disabled={!isValid}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Yes
          </motion.button>
          
          <motion.button 
            className="no-btn"
            ref={noButtonRef}
            onMouseOver={handleNoHover}
            whileHover={{ scale: difficulty > 3 ? 0.8 : 1.05 }}
            animate={{ opacity: difficulty > 4 ? 0.8 : 1 }}
          >
            No
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfessionPage;