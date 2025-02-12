import React, { useState } from 'react';
import HomePage from './components/home-page';
import GameContainer from './components/game-container';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen">
      {isPlaying ? (
        <GameContainer onHome={() => setIsPlaying(false)} />
      ) : (
        <HomePage onStartGame={() => setIsPlaying(true)} />
      )}
    </div>
  );
}

export default App;