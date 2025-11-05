import React from 'react';

export default function CompetitionCard({ competition, isSelected, onSelect }) {
  const bgColorClass = competition.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700'
    : competition.color === 'yellow' ? 'bg-yellow-600 hover:bg-yellow-700'
    : 'bg-blue-600 hover:bg-blue-700';
  
  const borderColorClass = isSelected 
    ? competition.color === 'purple' ? 'border-purple-600'
      : competition.color === 'yellow' ? 'border-yellow-600'
      : 'border-blue-600'
    : 'border-transparent';

  // Mapeamento de ícones por competição
  const competitionIcons = {
    'brasileirao': '/assets/icons/brasileiraofem.png',
    'libertadores': '/assets/icons/libertadores.png',
    'champions': '/assets/icons/uefawomen.png'
  };

  const iconSrc = competitionIcons[competition.id] || competitionIcons['brasileirao'];

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border-2 ${borderColorClass}`}
    >
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <img 
            src={iconSrc} 
            alt={competition.name}
            className="w-full h-full object-contain"
          />
        </div>
        <h4 className="text-xl font-bold text-gray-900 mb-2">{competition.name}</h4>
        <div className="text-sm text-gray-500 mb-4">
          <div>👥 {competition.participants.toLocaleString()} participantes</div>
          <div>🏆 Prêmio: R$ {competition.prize}</div>
        </div>
        <button 
          className={`w-full ${bgColorClass} text-white py-2 rounded-lg transition-colors font-semibold`}
          onClick={onSelect}
        >
          {isSelected ? 'Selecionado' : 'Participar'}
        </button>
      </div>
    </div>
  );
}

