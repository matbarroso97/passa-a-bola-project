import React from 'react';
import { getTeamImage } from '../../config/teamImages';

export default function FeaturedGameCard({ game, onGameClick }) {
  if (!game) return null;

  // Verifica se o jogo está ao vivo (tem score diferente de "0 x 0" e data é hoje)
  const hasScore = game.score && game.score !== '0 x 0';
  const gameDate = game.date ? new Date(game.date) : null;
  const now = new Date();
  const isToday = gameDate && gameDate.toDateString() === now.toDateString();
  const isLive = hasScore && isToday;

  const getStatusBadge = () => {
    if (isLive) {
      return (
        <span className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold animate-pulse">
          AO VIVO
        </span>
      );
    } else if (hasScore) {
      return (
        <span className="bg-gray-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold">
          FINALIZADO
        </span>
      );
    } else if (gameDate && gameDate > now) {
      return (
        <span className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold">
          AGENDADO
        </span>
      );
    }
    return null;
  };

  return (
    <article className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-3 sm:p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2">
          <div className="flex items-center space-x-2">
            <img 
              src="/assets/icons/brasileiraofem.png" 
              alt="Brasileirão Feminino"
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
            />
            <span className="text-xs sm:text-sm font-medium opacity-90">Jogo em Destaque</span>
          </div>
          {getStatusBadge()}
        </div>
        <div 
          className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-6 cursor-pointer hover:bg-white/20 transition-colors"
          onClick={() => onGameClick(game)}
        >
          {/* Mobile Layout */}
          <div className="sm:hidden space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-1">
                {getTeamImage(game.home) && (
                  <img 
                    src={getTeamImage(game.home)} 
                    alt={game.home}
                    className="w-8 h-8 object-contain"
                  />
                )}
                <span className="font-bold text-sm truncate">{game.home}</span>
              </div>
              <div className="text-xl font-bold mx-2">
                {game.score?.split(' x ')[0]}
              </div>
            </div>
            <div className="w-full h-px bg-white/30"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-1">
                {getTeamImage(game.away) && (
                  <img 
                    src={getTeamImage(game.away)} 
                    alt={game.away}
                    className="w-8 h-8 object-contain"
                  />
                )}
                <span className="font-bold text-sm truncate">{game.away}</span>
              </div>
              <div className="text-xl font-bold mx-2">
                {game.score?.split(' x ')[1]}
              </div>
            </div>
          </div>
          
          {/* Desktop Layout */}
          <div className="hidden sm:grid grid-cols-3 items-center gap-3 sm:gap-4">
            {/* Time da Casa */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {getTeamImage(game.home) && (
                <img 
                  src={getTeamImage(game.home)} 
                  alt={game.home}
                  className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
                />
              )}
              <span className="font-bold text-base sm:text-lg truncate">{game.home}</span>
            </div>
            
            {/* Placar Centralizado */}
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold">
                {game.score?.split(' x ')[0]} x {game.score?.split(' x ')[1]}
              </div>
            </div>
            
            {/* Time Visitante */}
            <div className="flex items-center space-x-2 sm:space-x-3 justify-end">
              <span className="font-bold text-base sm:text-lg truncate">{game.away}</span>
              {getTeamImage(game.away) && (
                <img 
                  src={getTeamImage(game.away)} 
                  alt={game.away}
                  className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

