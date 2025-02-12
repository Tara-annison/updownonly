import React from 'react';
import { Coins } from 'lucide-react';

const CryptoCard = ({ crypto, showPrice = false, isQuestion = false }) => {
  if (!crypto) return null;

  // Calculate text size class based on name length
  const getTextSizeClass = (textLength) => {
    if (textLength > 25) return 'text-lg md:text-xl';
    if (textLength > 20) return 'text-xl md:text-2xl';
    return 'text-2xl md:text-3xl';
  };

  const nameLength = `${crypto.name} (${crypto.symbol?.toUpperCase()})`.length;
  const textSizeClass = getTextSizeClass(nameLength);

  return (
    <div className="bg-gray-800/80 rounded-lg p-6 shadow-[0_0_20px_rgba(147,51,234,0.5)] border border-purple-500">
      {isQuestion && (
        <div className="text-center pixel-text mb-4">
          <p className="text-lg md:text-2xl">Is the price of</p>
        </div>
      )}
      
      <div className="flex items-center justify-center mb-4 flex-wrap">
        {crypto.image ? (
          <img 
            src={crypto.image} 
            alt={crypto.name}
            className="w-12 h-12 rounded mr-4 shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded mr-4 bg-gray-700 flex items-center justify-center shrink-0">
            <Coins size={24} />
          </div>
        )}
        <h2 className={`pixel-text ${textSizeClass} text-center break-words`}>
          {crypto.name} ({crypto.symbol?.toUpperCase()})
        </h2>
      </div>
      
      {showPrice && (
        <div className="text-4xl text-center pixel-text text-green-400">
          ${Number(crypto.price).toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default CryptoCard; 