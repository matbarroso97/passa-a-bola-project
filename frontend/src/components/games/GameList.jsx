import React from 'react';
import GameCard from './GameCard';
import EmptyState from '../ui/EmptyState';

export default function GameList({ games, onGameClick }) {
  if (games.length === 0) {
    return (
      <ul className="bg-white" role="list">
        <li>
          <EmptyState
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="Nenhum jogo encontrado"
            message="Os jogos serão exibidos quando disponíveis."
          />
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

