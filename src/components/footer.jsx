import React from 'react';

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

const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center text-white/60 text-[10px] md:text-xs pixel-text py-4">
      <div className="flex items-center">
        <Planet className="translate-y-[1px]" /> 
        <span>Built by Tara Annison</span>
      </div>
    </footer>
  );
};

export default Footer; 