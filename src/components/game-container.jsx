import React, { useState, useEffect } from 'react';
import GameUI from './game-ui';
import LoadingScreen from './loading-screen';
import CryptoService from './crypto-service';

const GAME_DURATION = 10; // seconds per round

const GameContainer = ({ onHome }) => {
  const [score, setScore] = useState(0);
  const [ath, setAth] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isNewAth, setIsNewAth] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(GAME_DURATION);
  const [currentCrypto, setCurrentCrypto] = useState(null);
  const [nextCrypto, setNextCrypto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usedCryptos, setUsedCryptos] = useState(new Set());

  const getRandomCrypto = (marketData, excludeIds, currentPrice = null) => {
    const availableCryptos = marketData.filter(crypto => 
      // Exclude used IDs, bitcoin, and any crypto with the same price
      !excludeIds.has(crypto.id) && 
      crypto.id !== 'bitcoin' && 
      (currentPrice === null || parseFloat(crypto.price) !== parseFloat(currentPrice))
    );

    if (availableCryptos.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * availableCryptos.length);
    return availableCryptos[randomIndex];
  };

  const initializeGame = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const marketData = await CryptoService.getInitialCryptos();
      
      if (!marketData || marketData.length < 2) {
        throw new Error('Not enough crypto data available');
      }

      // Reset used cryptos
      setUsedCryptos(new Set());

      // Always start with Bitcoin
      const bitcoin = marketData.find(crypto => crypto.id === 'bitcoin');
      if (!bitcoin) {
        throw new Error('Bitcoin data not available');
      }

      // Get a random crypto for the second one
      const secondCrypto = getRandomCrypto(marketData, new Set([bitcoin.id]), bitcoin.price);

      if (!secondCrypto) {
        throw new Error('Could not get initial cryptos');
      }

      setCurrentCrypto(bitcoin);
      setNextCrypto(secondCrypto);
      setUsedCryptos(new Set([bitcoin.id, secondCrypto.id]));
      setTimeRemaining(GAME_DURATION);
      setScore(0);
      setIsGameOver(false);
      setIsNewAth(false);
    } catch (error) {
      console.error('Failed to initialize game:', error);
      setError(error.message || 'Failed to load game data');
      setIsGameOver(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (!isGameOver && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isGameOver, timeRemaining]);

  const handleGuess = async (isHigher) => {
    if (!currentCrypto || !nextCrypto) return;

    const currentPrice = parseFloat(currentCrypto.price);
    const nextPrice = parseFloat(nextCrypto.price);
    
    console.log('Comparing prices:', {
      current: `${currentCrypto.name}: $${currentPrice}`,
      next: `${nextCrypto.name}: $${nextPrice}`,
      guess: isHigher ? 'Higher' : 'Lower'
    });

    const isCorrect = isHigher ? 
      nextPrice > currentPrice :
      nextPrice < currentPrice;

    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      
      if (newScore > ath) {
        setAth(newScore);
        setIsNewAth(true);
      }

      setTimeRemaining(GAME_DURATION);

      try {
        const marketData = await CryptoService.getInitialCryptos();
        
        // Update current crypto to next crypto
        setCurrentCrypto(nextCrypto);
        
        // Get a new next crypto that hasn't been used and has a different price
        const newNextCrypto = getRandomCrypto(
          marketData, 
          usedCryptos, 
          nextCrypto.price // Pass the new current crypto's price
        );

        if (!newNextCrypto) {
          throw new Error('No more unique cryptos available');
        }

        setNextCrypto(newNextCrypto);
        setUsedCryptos(prev => new Set([...prev, newNextCrypto.id]));
      } catch (error) {
        console.error('Failed to get next crypto:', error);
        setIsGameOver(true);
      }
    } else {
      setIsGameOver(true);
    }
  };

  if (isLoading) {
    return <LoadingScreen error={error} />;
  }

  return (
    <GameUI
      onHigher={() => handleGuess(true)}
      onLower={() => handleGuess(false)}
      onHome={onHome}
      onPlayAgain={initializeGame}
      timeRemaining={timeRemaining}
      score={score}
      ath={ath}
      isGameOver={isGameOver}
      isNewAth={isNewAth}
      currentCrypto={currentCrypto}
      nextCrypto={nextCrypto}
    />
  );
};

export default GameContainer;