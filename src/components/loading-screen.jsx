import React from 'react';
import PlanetLoader from './planet-loader';

const LoadingScreen = ({ error = null }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white bg-[#0a1128]">
      <div className="text-center space-y-6">
        <PlanetLoader size={80} className="mx-auto" />
        
        {error ? (
          <div className="text-red-400 pixel-text mt-8">
            {error}
          </div>
        ) : (
          <div className="pixel-text mt-8">
            Loading...
          </div>
        )}
      </div>

      <style jsx>{`
        .pixel-text {
          font-family: 'Press Start 2P', cursive;
          text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen; 