import React from 'react';
import DateNavigation from './DateNavigation';
import CompetitionHeader from './CompetitionHeader';
import GameList from './GameList';

export default function GamesSection({ games, onGameClick }) {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-50 p-5 sm:p-6 lg:p-7 hover:shadow transition-all duration-300">
      <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 border-b border-gray-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Jogos</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Ao vivo, próximos e finalizados</p>
        </div>
        <DateNavigation currentDate="Hoje" compact={true} />
      </div>
      
      <CompetitionHeader
        icon="/assets/icons/brasileiraofem.png"
        name="Brasileirão Feminino"
        round={13}
      />

      {games.length > 0 ? (
        <GameList 
          games={games} 
          onGameClick={onGameClick}
        />
      ) : (
        <p className="text-gray-500 text-center py-8">Nenhum outro jogo hoje</p>
      )}
      
      <div className="w-full h-px bg-purple-800 mt-4"></div>

      <div className="mt-6 text-right">
        <a href="/jogos" className="text-purple-600 font-semibold hover:underline">
          Ver todos os jogos →
        </a>
      </div>
    </article>
  );
}

