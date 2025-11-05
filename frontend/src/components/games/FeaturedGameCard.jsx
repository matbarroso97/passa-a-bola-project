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

  // Formata data e hora
  const formatDateTime = () => {
    if (!gameDate) return null;
    const dateStr = gameDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    const timeStr = gameDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return { date: dateStr, time: timeStr };
  };

  const dateTime = formatDateTime();

  // Informações da competição (pode vir do game ou usar padrão)
  const competition = game.competition || 'Brasileirão Feminino';
  const competitionIcon = game.competitionIcon || '/assets/icons/brasileiraofem.png';
  const round = game.round || 13;

  const getStatusBadge = () => {
    if (isLive) {
      return (
        <span className="bg-red-500 text-white px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold animate-pulse flex items-center gap-1.5">
          <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
          AO VIVO
        </span>
      );
    } else if (hasScore) {
      return (
        <span className="bg-gray-500/80 text-white px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium">
          Finalizado
        </span>
      );
    } else if (gameDate && gameDate > now) {
      return (
        <span className="bg-blue-500/80 text-white px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium">
          Agendado
        </span>
      );
    }
    return null;
  };

  return (
    <article className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-xl shadow-lg overflow-hidden border border-purple-500/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="p-4 sm:p-5 md:p-6">
        {/* Header com contexto */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-5 gap-3">
          <div className="flex items-center space-x-3">
            <img 
              src={competitionIcon} 
              alt={competition}
              className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
              loading="lazy"
            />
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold opacity-95">Jogo em Destaque</span>
              <span className="text-xs opacity-80">{competition} • Rodada {round}</span>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        {/* Data e hora */}
        {dateTime && (
          <div className="mb-4 pb-4 border-b border-white/20">
            <div className="flex items-center gap-2 text-sm opacity-90">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{dateTime.date}</span>
              {gameDate && gameDate > now && (
                <>
                  <span>•</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{dateTime.time}</span>
                </>
              )}
            </div>
          </div>
        )}
        <div 
          className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-[1.02]"
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

        {/* Link Ver Detalhes */}
        <div className="mt-4 sm:mt-5 pt-4 border-t border-white/20">
          <button
            onClick={() => onGameClick(game)}
            className="w-full sm:w-auto bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 min-h-[44px] focus:outline-none focus:ring-4 focus:ring-white/30"
            aria-label="Ver detalhes do jogo"
          >
            <span>Ver detalhes</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

