import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import RetroButton from './retro-buttons';
import HowToPlay from './how-to-play';
import Footer from './footer';

const Planet = ({ className = "" }) => (
  <div className={`inline-block align-middle mr-1 ${className}`} style={{ width: 28, height: 28 }}>
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(30, 50, 50)">
        {/* Back half of ring */}
        <path 
          d="M 15 50 A 35 8 0 0 1 85 50"
          fill="none" 
          stroke="rgba(255,255,255,0.6)" 
          strokeWidth="2.5" 
        />
        
        {/* Planet body */}
        <circle 
          cx="50" 
          cy="50" 
          r="18" 
          fill="#9F7AEA" 
        />

        {/* Front half of ring */}
        <path 
          d="M 15 50 A 35 8 0 0 0 85 50"
          fill="none" 
          stroke="rgba(255,255,255,0.6)" 
          strokeWidth="2.5" 
        />
      </g>
    </svg>
  </div>
);

const Comet = () => (
  <div className="fixed top-8 animate-comet" style={{ width: 40, height: 40 }}>
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Comet tail - multiple segments for better fade effect */}
      <path 
        d="M 38 50 L 5 50"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path 
        d="M 38 50 L 15 50"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path 
        d="M 38 50 L 25 50"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Comet body with glow */}
      <circle 
        cx="50" 
        cy="50" 
        r="12" 
        fill="#9F7AEA" 
      />
      <circle 
        cx="50" 
        cy="50" 
        r="11" 
        fill="white" 
        fillOpacity="0.2" 
      />
    </svg>
  </div>
);

const HomePage = ({ onStartGame }) => {
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  
  // Generate stars once when component mounts
  const stars = React.useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 4 + 3
    }));
  }, []);

  // Generate single shooting star that changes direction
  const shootingStar = React.useMemo(() => ({
    directions: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']
  }), []);

  return (
    <>
      <div className="min-h-screen w-full relative text-white p-4 bg-[#0a1128]">
        {/* Stars Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Regular stars */}
          {stars.map((star) => (
            <div 
              key={star.id} 
              className="absolute bg-white rounded-full animate-twinkle"
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDuration: `${star.duration}s`
              }} 
            />
          ))}
          
          {/* Single Shooting Star */}
          <div
            className="absolute shooting-star"
            style={{
              width: '150px',
              height: '2px'
            }}
          >
            <div className="absolute w-full h-full bg-gradient-to-r from-transparent via-white to-transparent" />
          </div>
        </div>

        {/* Menu Button */}
        <RetroButton
          onClick={() => setIsHowToPlayOpen(true)}
          size="small"
          className="absolute top-4 left-4 z-10"
        >
          <Menu size={20} />
        </RetroButton>

        {/* Main Content - split into two sections */}
        <div className="relative z-10 px-4">
          {/* Title - slightly lower than menu */}
          <div className="pt-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold pixel-text relative">
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent pixel-text [text-shadow:0_0_20px_rgba(255,255,255,0.8),0_0_40px_rgba(255,255,255,0.6),0_0_60px_rgba(255,255,255,0.4)]">
                UpDownOnly
              </span>
            </h1>
          </div>

          {/* Description and Buttons - with tighter spacing */}
          <div className="max-w-2xl mx-auto mt-48 md:mt-64 space-y-8 md:space-y-12 text-center">
            {/* Description Card */}
            <div className="bg-gray-800/80 p-4 md:p-6 rounded-lg border-2 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] backdrop-blur-sm max-w-lg mx-auto">
              <p className="text-sm md:text-base pixel-text leading-relaxed text-white/90">
                Do you know the price of crypto assets? Build up your score by guessing whether each price is higher or lower than the next
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-4 flex flex-col items-center">
              <RetroButton
                variant="home"
                size="large"
                onClick={onStartGame}
                className="w-full max-w-[20rem] text-xl md:text-2xl py-4 md:py-5"
              >
                Play
              </RetroButton>
              
              <div className="h-2" />
              
              <RetroButton
                variant="playAgain"
                size="small"
                onClick={() => setIsHowToPlayOpen(true)}
                className="w-full max-w-[8rem] text-sm py-2"
              >
                How to Play
              </RetroButton>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-4 w-full text-center text-white/60 text-[10px] pixel-text">
          <Planet className="translate-y-[2px]" /> Built by Tara Annison
        </footer>
      </div>

      {/* How to Play Modal */}
      {isHowToPlayOpen && (
        <HowToPlay onClose={() => setIsHowToPlayOpen(false)} />
      )}

      <style jsx>{`
        .pixel-text {
          font-family: 'Press Start 2P', cursive;
          text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.5);
        }
        
        @keyframes twinkle {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        
        .animate-twinkle {
          animation: twinkle var(--duration, 3s) infinite;
        }

        @keyframes comet {
          0% {
            transform: translateX(-100%) translateY(100%);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% {
            transform: translateX(100vw) translateY(-100%);
            opacity: 0;
          }
        }

        .animate-comet {
          animation: comet 8s linear infinite;
        }

        .shooting-star {
          animation: shootingStar 15s linear infinite;
        }

        @keyframes shootingStar {
          /* Single shooting star with 15s gap */
          0% { transform: translate(-100%, -100%) rotate(45deg); opacity: 0; top: 0; left: 0; }
          2% { opacity: 1; }
          8% { transform: translate(100vw, 100vh) rotate(45deg); opacity: 0; }
          100% { transform: translate(100vw, 100vh) rotate(45deg); opacity: 0; }
        }

        /* Additional animations for other directions */
        @keyframes fromTopRight {
          0% { transform: translate(100%, -100%) rotate(-45deg); opacity: 0; top: 0; right: 0; }
          2% { opacity: 1; }
          8% { transform: translate(-100vw, 100vh) rotate(-45deg); opacity: 0; }
          100% { transform: translate(-100vw, 100vh) rotate(-45deg); opacity: 0; }
        }

        @keyframes fromBottomLeft {
          0% { transform: translate(-100%, 100%) rotate(-45deg); opacity: 0; bottom: 0; left: 0; }
          2% { opacity: 1; }
          8% { transform: translate(100vw, -100vh) rotate(-45deg); opacity: 0; }
          100% { transform: translate(100vw, -100vh) rotate(-45deg); opacity: 0; }
        }

        @keyframes fromBottomRight {
          0% { transform: translate(100%, 100%) rotate(45deg); opacity: 0; bottom: 0; right: 0; }
          2% { opacity: 1; }
          8% { transform: translate(-100vw, -100vh) rotate(45deg); opacity: 0; }
          100% { transform: translate(-100vw, -100vh) rotate(45deg); opacity: 0; }
        }
      `}</style>

      {/* Script to change shooting star direction */}
      <script dangerouslySetInnerHTML={{
        __html: `
          setInterval(() => {
            const star = document.querySelector('.shooting-star');
            const directions = ['shootingStar', 'fromTopRight', 'fromBottomLeft', 'fromBottomRight'];
            const randomDirection = directions[Math.floor(Math.random() * directions.length)];
            star.style.animation = 'none';
            star.offsetHeight; // Trigger reflow
            star.style.animation = randomDirection + ' 15s linear';
          }, 15000);
        `
      }} />
    </>
  );
};

export default HomePage; 