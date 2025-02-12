import React from 'react';

export const RetroButton = ({ 
  children, 
  variant = 'default', 
  size = 'medium', 
  onClick,
  className = '',
  disabled = false,
  hideIcon = false
}) => {
  const baseStyles = `
    relative 
    font-mono 
    inline-block 
    text-white 
    border-4
    transition-all 
    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
    outline-none
    image-rendering-pixelated
    pixel-text
    ${hideIcon ? 'before:hidden after:hidden' : ''}
  `;
  
  const variants = {
    higher: "bg-green-500 hover:bg-green-600 active:bg-green-700",
    lower: "bg-red-500 hover:bg-red-600 active:bg-red-700",
    home: "bg-pink-500 hover:bg-pink-600 active:bg-pink-700",
    playAgain: "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700",
    share: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
    default: "bg-gray-500 hover:bg-gray-600 active:bg-gray-700"
  };

  const sizes = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg"
  };

  const disabledStyles = disabled ? 
    "opacity-50 cursor-not-allowed" : 
    "hover:-translate-y-[1px] hover:translate-x-[1px] active:translate-y-[2px] active:translate-x-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant] || variants.default}
        ${sizes[size]}
        ${disabledStyles}
        ${className}
        before:content-['']
        before:absolute
        before:inset-0
        before:border-t-[1px]
        before:border-l-[1px]
        before:border-b-[1px]
        before:border-r-[1px]
        before:border-t-white/30
        before:border-l-white/30
        before:border-b-black/30
        before:border-r-black/30
        after:content-['']
        after:absolute
        after:inset-[-4px]
        after:border-4
        after:border-black
        [image-rendering:pixelated]
        [text-shadow:1px_1px_0px_rgba(0,0,0,0.8)]
      `}
    >
      {children}
    </button>
  );
};

// Preset button configurations
export const HigherButton = (props) => (
  <RetroButton variant="higher" {...props} />
);

export const LowerButton = (props) => (
  <RetroButton variant="lower" {...props} />
);

export const HomeButton = (props) => (
  <RetroButton variant="home" {...props} />
);

export const PlayAgainButton = (props) => (
  <RetroButton variant="playAgain" {...props} />
);

export const ShareButton = (props) => (
  <RetroButton variant="share" {...props} />
);

// Only export RetroButton as default
export default RetroButton;