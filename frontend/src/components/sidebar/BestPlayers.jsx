import React from 'react';
import { getTeamImage } from '../../config/teamImages';

const players = [
  { 
    id: 1, 
    name: 'Cristiane Rozeira', 
    photo: '/assets/icons/cristianeflamengo.png',
    team: 'Flamengo',
    position: 'Atacante',
    rating: 8.9 
  },
  { 
    id: 2, 
    name: 'Amanda Gutierres', 
    photo: '/assets/icons/amandapalmeiras.png',
    team: 'Palmeiras',
    position: 'Atacante',
    rating: 8.7 
  },
  { 
    id: 3, 
    name: 'Letícia Ferreira', 
    photo: '/assets/icons/leticiacruzeiro.png',
    team: 'Cruzeiro',
    position: 'Atacante',
    rating: 8.7 
  },
  { 
    id: 4, 
    name: 'Gabi Zanotti', 
    photo: '/assets/icons/gabicorinthians.png',
    team: 'Corinthians',
    position: 'Meio-campo',
    rating: 8.5 
  },
];

export default function BestPlayers() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Melhores Jogadoras</h3>
      <div className="space-y-3">
        {players.map((player, index) => (
          <React.Fragment key={player.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img 
                  src={player.photo} 
                  alt={player.name}
                  className="w-8 h-8 object-contain rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{player.name}</span>
                  <div className="flex items-center space-x-1 mt-0.5">
                    {getTeamImage(player.team) && (
                      <img 
                        src={getTeamImage(player.team)} 
                        alt={player.team}
                        className="w-3 h-3 object-contain"
                      />
                    )}
                    <span className="text-xs text-gray-500">{player.position}</span>
                  </div>
                </div>
              </div>
              <span className="text-purple-600 font-bold">{player.rating}</span>
            </div>
            {index < players.length - 1 && <div className="w-full h-px bg-purple-800"></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

