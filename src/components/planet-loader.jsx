import React from 'react';

const PlanetLoader = ({ size = 48, className = '' }) => (
  <div className={`relative ${className}`} style={{ width: size, height: size }}>
    <div className="orbit-container">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g className="planet">
          {/* Planet body */}
          <circle 
            cx="50" 
            cy="50" 
            r="20" 
            fill="#9F7AEA" 
          />
          
          {/* Planet ring */}
          <ellipse 
            cx="50" 
            cy="50" 
            rx="30" 
            ry="6" 
            fill="none" 
            stroke="rgba(255,255,255,0.8)" 
            strokeWidth="2" 
            transform="rotate(-15)" 
          />
        </g>
      </svg>
    </div>

    <style jsx>{`
      .orbit-container {
        position: absolute;
        width: 100%;
        height: 100%;
      }

      @keyframes orbit {
        0% { transform: rotate(0deg) translateX(60px) rotate(0deg); }
        100% { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
      }
      
      .planet {
        animation: orbit 8s linear infinite;
        transform-origin: center;
      }
    `}</style>
  </div>
);

export default PlanetLoader;