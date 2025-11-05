import React from 'react';
import { getTeamImage } from '../../config/teamImages';

export default function GameCard({ game, onClick }) {
  const [homeScore, awayScore] = game.score ? game.score.split(' x ') : ['-', '-'];

  return (
    <li 
      className="p-3 sm:p-4 border-b border-purple-800 last:border-b-0 relative cursor-pointer hover:bg-purple-50/50 transition-all duration-200 hover:pl-5 focus-within:ring-2 focus-within:ring-purple-500 focus-within:ring-offset-2"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`Jogo: ${game.home} vs ${game.away}`}
    >
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex-1 flex min-w-0">
          <div className="flex-1 min-w-0">
            {/* Time da casa */}
            <div className="flex items-center py-1 sm:py-2">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                {getTeamImage(game.home) ? (
                  <img 
                    src={getTeamImage(game.home)} 
                    alt={game.home}
                    className="w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
                  />
                ) : (
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {game.home.charAt(0)}
                  </div>
                )}
                <span className="font-semibold text-gray-900 text-sm sm:text-base truncate">{game.home}</span>
              </div>
            </div>

            {/* Time visitante */}
            <div className="flex items-center py-1 sm:py-2">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                {getTeamImage(game.away) ? (
                  <img 
                    src={getTeamImage(game.away)} 
                    alt={game.away}
                    className="w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
                  />
                ) : (
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {game.away.charAt(0)}
                  </div>
                )}
                <span className="font-semibold text-gray-900 text-sm sm:text-base truncate">{game.away}</span>
              </div>
            </div>
          </div>
          
          {/* Gols */}
          <div className="flex flex-col justify-center mx-2 sm:mx-4">
            <span className="text-xl sm:text-2xl font-bold text-gray-900 py-1 sm:py-2">{homeScore}</span>
            <span className="text-xl sm:text-2xl font-bold text-gray-900 py-1 sm:py-2">{awayScore}</span>
          </div>
          
          {/* Linha vertical */}
          <div className="w-px bg-purple-800 hidden sm:block"></div>
        </div>
        <div className="ml-2 sm:ml-4">
          <div className="text-xs text-red-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full font-medium">FT</div>
        </div>
      </div>
    </li>
  );
}




