import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import '../styles/ResultPage.css';

const ResultPage = ({ userName, noAttempts }) => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if accessed directly without name
    if (!userName) {
      navigate('/');
      return;
    }
    
    // Launch confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    // Generate custom message based on attempts
    let customMessage = '';
    if (noAttempts === 0) {
      customMessage = "Wow, you didn't even try to say no! That's true love!";
    } else if (noAttempts < 5) {
      customMessage = "I knew you'd make the right choice eventually!";
    } else if (noAttempts < 10) {
      customMessage = "You were quite persistent with that 'No' button!";
    } else {
      customMessage = "After all that chasing, you finally said yes!";
    }
    
    setMessage(customMessage);
    
  }, [userName, noAttempts, navigate]);
  
  const handleReset = () => {
    navigate('/');
  };
  
  return (
    <div className="result-container">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>I knew it, {userName}! ❤️</h1>
        
        <div className="heart-container">
          <div className="heart"></div>
        </div>
        
        <p className="result-message">{message}</p>
        <p className="attempts-count">You tried to say "No" {noAttempts} times!</p>
        
        <motion.button 
          className="reset-btn"
          onClick={handleReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Over
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ResultPage;