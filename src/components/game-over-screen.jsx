import React from 'react';
import { Twitter, Linkedin } from 'lucide-react';
import RetroButton from './retro-buttons';
import '../styles/starfield.css';

const GameOverScreen = ({ 
  score, 
  isNewAth, 
  onPlayAgain, 
  onHome
}) => {
  return (
    <div className="h-screen flex flex-col items-center p-4 text-white bg-[#0a1128] relative overflow-hidden">
      {/* Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => {
          const size = Math.random() * 2 + 1; // Single size value for both width and height
          return (
            <div 
              key={i} 
              className="absolute bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${size}px`,      // Same size for width
                height: `${size}px`,     // Same size for height
                animation: `twinkle ${Math.random() * 4 + 3}s infinite`,
                opacity: Math.random() * 0.7 + 0.3
              }} 
            />
          );
        })}
      </div>

      {/* Title and Score - aligned with where menu button would be */}
      <div className="w-full max-w-4xl flex items-start relative z-10 h-[15vh]">
        {/* Spacer for menu button alignment */}
        <div className="w-[40px]" />
        
        <div className="flex-1 text-center">
          <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent pixel-text [text-shadow:0_0_20px_rgba(255,255,255,0.8),0_0_40px_rgba(255,255,255,0.6),0_0_60px_rgba(255,255,255,0.4)]">
            UpDownOnly
          </h1>
          <div className="text-xl md:text-3xl font-bold pixel-text">Score: {score}</div>
          <div className="text-sm md:text-xl text-yellow-500 flex items-center justify-center gap-2 pixel-text">
            ATH: {score} <div className="pixel-trophy">🏆</div>
          </div>
        </div>
        
        {/* Spacer to balance layout */}
        <div className="w-[40px]" />
      </div>

      {/* Game Over Content */}
      <div className="flex-1 flex flex-col items-center justify-evenly relative z-10">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 pixel-text relative">
            {/* First glow layer */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-white blur-[40px] opacity-75"></div>
              <div className="absolute inset-0 bg-white blur-[80px] opacity-50"></div>
              <div className="absolute inset-0 bg-white blur-[120px] opacity-25"></div>
            </div>
            
            {/* Text content */}
            <span className="relative z-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent !important">
              Game Over!
            </span>
            
            {/* Second glow layer */}
            <div className="absolute inset-0 mix-blend-overlay">
              <div className="absolute inset-0 bg-white blur-[20px] opacity-50"></div>
            </div>
          </h2>
          {isNewAth && (
            <p className="text-xl md:text-3xl text-yellow-500 mt-4 pixel-text [text-shadow:2px_2px_0px_rgba(0,0,0,0.5)]">New All-Time High!</p>
          )}
        </div>
        
        {/* Main Buttons with aggressive overrides */}
        <div className="space-y-4">
          {/* Primary Action - Play Again */}
          <div className="w-48 md:w-64 mx-auto">
            <RetroButton
              onClick={onPlayAgain}
              variant="playAgain"
              size="medium"
              className="w-full"
            >
              Play Again
            </RetroButton>
          </div>
          
          {/* Secondary Actions - Menu and Social */}
          <div className="space-y-4">
            {/* Menu Button */}
            <div className="w-48 md:w-64 mx-auto">
              <RetroButton
                onClick={onHome}
                variant="home"
                size="medium"
                className="w-full"
              >
                Menu
              </RetroButton>
            </div>

            {/* Debug div */}
            <div className="w-48 md:w-64 mx-auto bg-red-500 p-4 text-white">
              Debug: This should be visible
            </div>

            {/* Test Share Button */}
            <div className="w-48 md:w-64 mx-auto">
              <RetroButton
                variant="share"
                size="medium"
                className="w-full"
                onClick={() => console.log('Share clicked')}
              >
                Test Share
              </RetroButton>
            </div>
          </div>
        </div>

        {/* Social share moved closer */}
        <div className="space-y-4">
          {/* Social content */}
        </div>
      </div>

      {/* Footer with fixed bottom spacing */}
      <div className="h-[10vh] flex items-end">
        <Footer />
      </div>

      <style jsx="true">{`