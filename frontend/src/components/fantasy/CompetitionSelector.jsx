import React from 'react';

export default function CompetitionSelector({ competitions, selectedCompetition, onSelect }) {
  // Mapeamento de ícones por competição
  const competitionIcons = {
    'brasileirao': '/assets/icons/brasileiraofem.png',
    'libertadores': '/assets/icons/libertadores.png',
    'champions': '/assets/icons/uefawomen.png'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">Selecione a Competição:</label>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {competitions.map((comp) => {
          const isSelected = selectedCompetition === comp.id;
          const bgColorClass = isSelected 
            ? comp.color === 'purple' ? 'bg-purple-600' 
              : comp.color === 'yellow' ? 'bg-yellow-600'
              : 'bg-blue-600'
            : 'bg-gray-100';
          const iconSrc = competitionIcons[comp.id] || competitionIcons['brasileirao'];
          
          return (
            <button
              key={comp.id}
              onClick={() => onSelect(comp.id)}
              className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base flex items-center gap-2 ${
                isSelected ? `${bgColorClass} text-white shadow-md` : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <img 
                src={iconSrc} 
                alt={comp.name}
                className="w-4 h-4 object-contain"
              />
              {comp.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

