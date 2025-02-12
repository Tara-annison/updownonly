import { useState, useEffect, useCallback } from 'react';

export const useGameState = (initialTime = 10) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [score, setScore] = useState(0);
  const [ath, setAth] = useState(() => {
    const savedAth = localStorage.getItem('cryptoGameAth');
    return savedAth ? parseInt(savedAth, 10) : 0;
  });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isNewAth, setIsNewAth] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !isGameOver && !isPaused) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeRemaining === 0 && !isGameOver) {
      handleGameOver();
    }
  }, [timeRemaining, isGameOver, isPaused]);

  // Handle game over
  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    // Check if current score is a new ATH
    if (score > ath) {
      setAth(score);
      setIsNewAth(true);
      localStorage.setItem('cryptoGameAth', score.toString());
    }
  }, [score, ath]);

  // Handle correct guess
  const handleCorrectGuess = useCallback(() => {
    setScore(prev => prev + 1);
    setTimeRemaining(initialTime); // Reset timer
  }, [initialTime]);

  // Handle incorrect guess
  const handleIncorrectGuess = useCallback(() => {
    handleGameOver();
  }, [handleGameOver]);

  // Start new game
  const startNewGame = useCallback(() => {
    setScore(0);
    setTimeRemaining(initialTime);
    setIsGameOver(false);
    setIsNewAth(false);
    setIsPaused(false);
  }, [initialTime]);

  // Pause/Resume game
  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  return {
    timeRemaining,
    score,
    ath,
    isGameOver,
    isNewAth,
    isPaused,
    handleCorrectGuess,
    handleIncorrectGuess,
    startNewGame,
    togglePause
  };
};

export const useAudioEffects = () => {
  const [isMuted, setIsMuted] = useState(() => {
    const savedMuted = localStorage.getItem('cryptoGameMuted');
    return savedMuted ? JSON.parse(savedMuted) : false;
  });

  const playSound = useCallback((type) => {
    if (isMuted) return;

    const sounds = {
      correct: new Audio('/sounds/correct.mp3'),
      wrong: new Audio('/sounds/wrong.mp3'),
      click: new Audio('/sounds/click.mp3'),
      gameOver: new Audio('/sounds/game-over.mp3')
    };

    const sound = sounds[type];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(err => console.error('Error playing sound:', err));
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newValue = !prev;
      localStorage.setItem('cryptoGameMuted', JSON.stringify(newValue));
      return newValue;
    });
  }, []);

  return { isMuted, toggleMute, playSound };
};