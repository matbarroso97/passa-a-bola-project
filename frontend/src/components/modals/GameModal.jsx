import React from 'react';
import { getTeamImage } from '../../config/teamImages';

export default function GameModal({ game, isOpen, onClose }) {
  if (!isOpen || !game) return null;

  const [homeScore, awayScore] = game.score ? game.score.split(' x ') : ['-', '-'];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-white rounded-lg max-w-2xl w-full p-4 sm:p-6 shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center mb-4 sm:mb-6">
          <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-gray-900">Detalhes do Jogo</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Fechar modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Time da Casa */}
          <div className="text-center">
            {getTeamImage(game.home) ? (
              <img 
                src={getTeamImage(game.home)} 
                alt={game.home}
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain mx-auto mb-3"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold mx-auto mb-3">
                {game.home.charAt(0)}
              </div>
            )}
            <h4 className="text-lg sm:text-xl font-bold text-gray-900">{game.home}</h4>
            <div className="text-3xl sm:text-4xl font-bold text-purple-600 mt-2">
              {homeScore}
            </div>
          </div>

          {/* VS */}
          <div className="flex items-center justify-center">
            <span className="text-xl sm:text-2xl font-bold text-gray-400">VS</span>
          </div>

          {/* Time Visitante */}
          <div className="text-center">
            {getTeamImage(game.away) ? (
              <img 
                src={getTeamImage(game.away)} 
                alt={game.away}
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain mx-auto mb-3"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold mx-auto mb-3">
                {game.away.charAt(0)}
              </div>
            )}
            <h4 className="text-lg sm:text-xl font-bold text-gray-900">{game.away}</h4>
            <div className="text-3xl sm:text-4xl font-bold text-purple-600 mt-2">
              {awayScore}
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="text-sm text-gray-600 block mb-1">Status:</span>
              {(() => {
                if (!game.score || game.score === '0 x 0') {
                  const gameDate = game.date ? new Date(game.date) : null;
                  const now = new Date();
                  if (gameDate && gameDate > now) {
                    return <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-medium">Agendado</span>;
                  }
                  return <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full font-medium">Não iniciado</span>;
                }
                return <span className="text-sm text-red-500 bg-red-100 px-3 py-1 rounded-full font-medium">Finalizado</span>;
              })()}
            </div>
            {game.date && (
              <div>
                <span className="text-sm text-gray-600 block mb-1">Data:</span>
                <span className="text-sm text-gray-900">
                  {new Date(game.date).toLocaleDateString('pt-BR', { 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            )}
          </div>

          {/* Timeline de Eventos do Jogo */}
          {game.events && game.events.length > 0 && (
            <div className="border-t pt-4">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Cronologia do Jogo</h4>
              <div className="relative">
                {/* Linha central da timeline */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform -translate-x-1/2"></div>
                
                <div className="space-y-3 relative">
                  {game.events
                    .sort((a, b) => a.minute - b.minute)
                    .map((event, index) => {
                      const isHomeTeam = event.team === game.home;
                      
                      return (
                        <div 
                          key={index} 
                          className="flex items-center relative"
                        >
                          {/* Time da Casa - Esquerda */}
                          <div className={`flex-1 flex items-center gap-2 ${isHomeTeam ? 'justify-end pr-4' : 'justify-start pl-4'}`}>
                            {isHomeTeam && (
                              <>
                                <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200">
                                  {getTeamImage(game.home) && (
                                    <img 
                                      src={getTeamImage(game.home)} 
                                      alt={game.home}
                                      className="w-5 h-5 object-contain"
                                    />
                                  )}
                                  <span className="text-xs font-medium text-gray-700">{event.player}</span>
                                  
                                  {/* Ícone do Evento */}
                                  {event.type === 'goal' && (
                                    <span className="text-lg">⚽</span>
                                  )}
                                  {event.type === 'yellow_card' && (
                                    <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
                                  )}
                                  {event.type === 'red_card' && (
                                    <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                          
                          {/* Minuto no centro */}
                          <div className="absolute left-1/2 transform -translate-x-1/2 z-10 bg-white px-2 py-1 rounded-full border-2 border-purple-600 shadow-md">
                            <span className="text-xs font-bold text-purple-600">{event.minute}'</span>
                          </div>

                          {/* Time Visitante - Direita */}
                          <div className={`flex-1 flex items-center gap-2 ${!isHomeTeam ? 'justify-start pl-4' : 'justify-end pr-4'}`}>
                            {!isHomeTeam && (
                              <>
                                <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200">
                                  {event.type === 'goal' && (
                                    <span className="text-lg">⚽</span>
                                  )}
                                  {event.type === 'yellow_card' && (
                                    <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
                                  )}
                                  {event.type === 'red_card' && (
                                    <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
                                  )}
                                  <span className="text-xs font-medium text-gray-700">{event.player}</span>
                                  {getTeamImage(game.away) && (
                                    <img 
                                      src={getTeamImage(game.away)} 
                                      alt={game.away}
                                      className="w-5 h-5 object-contain"
                                    />
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {/* Mensagem quando não há eventos */}
          {(!game.events || game.events.length === 0) && game.score && game.score !== '0 x 0' && (
            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 text-center">Nenhum evento registrado para este jogo</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


