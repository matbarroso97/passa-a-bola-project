import React from 'react';

const competitions = [
  { id: 'uefa', name: "UEFA Women's Champions League", icon: '/assets/icons/uefawomen.png', isFavorite: false },
  { id: 'libertadores', name: 'Libertadores Feminina', icon: '/assets/icons/libertadores.png', isFavorite: false },
  { id: 'brasileirao', name: 'Brasileirão Feminino', icon: '/assets/icons/brasileirao.png', isFavorite: true },
  { id: 'fa', name: "FA Women's Super League", icon: '/assets/icons/fawomen.png', isFavorite: false },
  { id: 'primera', name: 'Primera División Femenina', icon: '/assets/icons/primeradivision.png', isFavorite: false },
  { id: 'division1', name: 'Division 1 Féminine', icon: '/assets/icons/division1fem.png', isFavorite: false },
];

export default function CompetitionsList() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Competições</h3>
      <div className="w-full h-px bg-purple-800 mb-4"></div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Pesquisar por Competições"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
      <div className="space-y-3">
        {competitions.map((comp) => (
          <div key={comp.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
            <div className="flex items-center space-x-3">
              <img 
                src={comp.icon} 
                alt={comp.name}
                className="w-6 h-6 object-contain"
              />
              <span className="text-sm font-medium">{comp.name}</span>
            </div>
            <svg 
              className={`w-4 h-4 ${comp.isFavorite ? 'text-yellow-500' : 'text-gray-400'}`} 
              fill={comp.isFavorite ? 'currentColor' : 'none'} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
              />
            </svg>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <a href="#" className="text-purple-600 text-sm hover:underline">Mostrar Mais ↓</a>
      </div>
    </div>
  );
}




