import React from 'react';

const GalaxyGraphic = ({ size = 300, className = '' }) => (
  <div className={`relative ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Background glow */}
      <ellipse
        cx="50"
        cy="50"
        rx="45"
        ry="35"
        fill="url(#galaxyBg)"
        opacity="0.3"
      />

      {/* Core glow */}
      <circle
        cx="50"
        cy="50"
        r="8"
        fill="url(#coreGlow)"
        className="animate-pulse"
      />

      {/* Spiral arms using curved paths */}
      <path
        d="M 50 50
           C 55 45, 60 40, 65 35
           S 75 25, 80 20
           S 85 15, 90 10
           M 50 50
           C 45 55, 40 60, 35 65
           S 25 75, 20 80
           S 15 85, 10 90"
        fill="none"
        stroke="url(#armGradient1)"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.8"
      />

      <path
        d="M 50 50
           C 55 55, 60 60, 65 65
           S 75 75, 80 80
           S 85 85, 90 90
           M 50 50
           C 45 45, 40 40, 35 35
           S 25 25, 20 20
           S 15 15, 10 10"
        fill="none"
        stroke="url(#armGradient2)"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Stars following spiral pattern */}
      {[...Array(50)].map((_, i) => {
        const angle = (i * Math.PI) / 6;
        const radius = 5 + (i * 0.8);
        return (
          <circle
            key={i}
            cx={50 + Math.cos(angle) * radius}
            cy={50 + Math.sin(angle) * radius}
            r={0.5}
            fill="white"
            opacity={0.6 + Math.random() * 0.4}
            className="animate-twinkle"
          />
        );
      })}

      {/* Gradients */}
      <defs>
        <radialGradient id="galaxyBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDF4FF" stopOpacity="1" />
          <stop offset="50%" stopColor="#EC4899" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="armGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
        </linearGradient>

        <linearGradient id="armGradient2" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#EC4899" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>

    <style jsx>{`
      @keyframes twinkle {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      
      .animate-twinkle {
        animation: twinkle 3s ease-in-out infinite;
        animation-delay: calc(var(--tw-translate-x) * 0.1s);
      }
    `}</style>
  </div>
);

export default GalaxyGraphic; 