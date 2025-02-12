import React from 'react';
import { Menu, RotateCcw, Twitter, Linkedin } from 'lucide-react';
import RetroButton from './retro-buttons';
import CryptoCard from './crypto-card';
import Footer from './footer';

const GameUI = ({
  onHigher,
  onLower,
  onHome,
  onPlayAgain,
  timeRemaining,
  score,
  ath,
  isGameOver,
  isNewAth,
  currentCrypto,
  nextCrypto
}) => {
  // Generate static stars once when component mounts
  const staticStars = React.useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3
    }));
  }, []); // Empty dependency array means this only runs once

  return (
    <div className="min-h-screen flex flex-col items-center p-4 text-white bg-[#0a1128] relative overflow-hidden">
      {/* Stars Background - truly static */}
      <div className="absolute inset-0 overflow-hidden">
        {staticStars.map((star) => (
          <div 
            key={star.id} 
            className="absolute bg-white rounded-full"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity
            }} 
          />
        ))}
      </div>

      {/* Header with Menu Button and Title/Score aligned */}
      <div className="w-full max-w-4xl flex items-start relative z-10">
        <RetroButton onClick={onHome} size="small">
          <Menu size={20} />
        </RetroButton>
        
        {/* Title and Score - centered and aligned with menu button */}
        <div className="flex-1 text-center">
          <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent pixel-text [text-shadow:0_0_20px_rgba(255,255,255,0.8),0_0_40px_rgba(255,255,255,0.6),0_0_60px_rgba(255,255,255,0.4)]">
            UpDownOnly
          </h1>
          <div className="text-xl md:text-3xl font-bold pixel-text">Score: {score}</div>
          <div className="text-sm md:text-xl text-yellow-500 flex items-center justify-center gap-2 pixel-text">
            ATH: {ath} <div className="pixel-trophy">🏆</div>
          </div>
        </div>
        
        {/* Spacer to balance menu button */}
        <div className="w-[40px]" />
      </div>

      {/* Game Content */}
      <div className="flex-1 w-full max-w-4xl flex flex-col items-center justify-center relative z-10 mt-8">
        {!isGameOver ? (
          <>
            {/* Timer - simplified, no decorative elements */}
            <div className="mb-4 md:mb-8 text-xl md:text-3xl pixel-text">
              Time: {timeRemaining}s
            </div>

            {/* Crypto Cards */}
            <div className="space-y-6 md:space-y-12 w-full">
              {currentCrypto && <CryptoCard crypto={currentCrypto} showPrice={true} />}
              {nextCrypto && (
                <>
                  <CryptoCard 
                    crypto={nextCrypto} 
                    showPrice={false} 
                    isQuestion={true}
                  />
                  <div className="flex justify-center space-x-4 md:space-x-8">
                    <RetroButton onClick={onHigher} variant="higher" size="large" className="px-4 md:px-8">
                      Higher
                    </RetroButton>
                    <RetroButton onClick={onLower} variant="lower" size="large" className="px-4 md:px-8">
                      Lower
                    </RetroButton>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          /* Game Over Screen - simplified */
          <div className="text-center space-y-6 md:space-y-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-4 pixel-text">Game Over!</h2>
              <p className="text-xl md:text-3xl opacity-80 pixel-text">Final Score: {score}</p>
              {isNewAth && (
                <p className="text-xl md:text-3xl text-yellow-400 mt-4 pixel-text">New All-Time High!</p>
              )}
            </div>
            
            {/* Main buttons */}
            <div className="space-y-4 md:space-y-6">
              <RetroButton
                onClick={onPlayAgain}
                variant="playAgain"
                size="medium"
                className="w-48 md:w-64 whitespace-nowrap h-[44px] md:h-[48px]"
              >
                <span className="hidden sm:inline">Play Again</span>
                <span className="sm:hidden">Play</span>
              </RetroButton>
              
              <RetroButton
                onClick={onHome}
                variant="home"
                size="medium"
                className="w-48 md:w-64 h-[44px] md:h-[48px]"
              >
                Home
              </RetroButton>
            </div>

            {/* Social Share Section */}
            <div className="mt-48 md:mt-72">
              <p className="text-sm md:text-base pixel-text text-white/80 mb-4">Share your score and see if anyone can beat you</p>
              <div className="flex justify-center gap-4">
                <RetroButton
                  onClick={() => {
                    const url = window.location.href;
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`🎮 I just scored ${score} points in UpDownOnly! Can you beat my score? 🚀`)}&url=${encodeURIComponent(url)}`, '_blank');
                  }}
                  variant="share"
                  size="small"
                  className="w-[44px] h-[44px] flex items-center justify-center p-0"
                >
                  <Twitter size={20} className="text-white" />
                </RetroButton>
                
                <RetroButton
                  onClick={() => {
                    const url = window.location.href;
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(`I just scored ${score} on UpDownOnly 🚀`)}`, '_blank');
                  }}
                  variant="share"
                  size="small"
                  className="w-[44px] h-[44px] flex items-center justify-center p-0"
                >
                  <Linkedin size={20} className="text-white" />
                </RetroButton>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />

      <style jsx>{`
        .pixel-text {
          font-family: 'Press Start 2P', cursive;
          text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.5);
        }
        .pixel-trophy {
          image-rendering: pixelated;
          font-size: 0.9em;
          transform: translateY(-1px);
          filter: drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.5));
        }
      `}</style>
    </div>
  );
};

export default GameUI;