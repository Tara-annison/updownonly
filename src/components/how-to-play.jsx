import React from 'react';
import { X, TrendingUp, TrendingDown, Timer, Trophy, Target } from 'lucide-react';

const HowToPlay = ({ onClose }) => {
  const rules = [
    {
      icon: <Target className="w-6 h-6 text-blue-400" />,
      title: "Goal",
      description: "Guess whether the next cryptocurrency's price will be higher or lower than the current one."
    },
    {
      icon: <Timer className="w-6 h-6 text-green-400" />,
      title: "Time",
      description: "You have 10 seconds to make each guess. Choose quickly!"
    },
    {
      icon: <Trophy className="w-6 h-6 text-yellow-400" />,
      title: "Scoring",
      description: "Each correct guess adds 1 point to your score. The game continues until you make a wrong guess or run out of time."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-400" />,
      title: "ATH (All-Time High)",
      description: "Your highest score is saved as your ATH. Try to beat it!"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-lg max-w-lg w-full p-6 relative shadow-xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 pixel-text">How to Play</h2>

        <div className="space-y-6">
          {rules.map((rule, index) => (
            <div 
              key={index} 
              className="flex items-start space-x-4 text-gray-300 transition-all hover:text-white"
            >
              <div className="flex-shrink-0 mt-1">{rule.icon}</div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-white pixel-text">{rule.title}</h3>
                <p className="leading-relaxed text-xs pixel-text">{rule.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-gray-300 pixel-text text-xs">Higher</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingDown className="w-5 h-5 text-red-400" />
              <span className="text-gray-300 pixel-text text-xs">Lower</span>
            </div>
          </div>
        </div>

        <style jsx>{`
          .pixel-text {
            font-family: 'Press Start 2P', cursive;
            text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.5);
          }
        `}</style>
      </div>
    </div>
  );
};

export default HowToPlay;