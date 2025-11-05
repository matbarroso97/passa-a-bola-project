import React from 'react';
import GameCard from './GameCard';

export default function GameList({ games, onGameClick }) {
  if (games.length === 0) {
    return (
      <ul className="bg-white" role="list">
        <li className="text-center py-8 text-gray-500">
          <p>Nenhum jogo encontrado no momento.</p>
          <p className="text-sm mt-2">Os jogos serão exibidos quando disponíveis.</p>
        </li>
      </ul>
    );
  }

  return (
    <ul className="bg-white" role="list">
      {games.map((game) => (
        <GameCard 
          key={game.id} 
          game={game} 
          onClick={() => onGameClick?.(game)}
        />
      ))}
    </ul>
  );
}




