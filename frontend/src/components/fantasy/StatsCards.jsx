import React from 'react';

export default function StatsCards({ stats }) {
  const cards = [
    { label: 'Participantes', value: stats.totalParticipants.toLocaleString(), borderColor: 'border-l-purple-600' },
    { label: 'Prêmio Total', value: `R$ ${stats.totalPrize}`, borderColor: 'border-l-green-600' },
    { label: 'Sua Posição', value: stats.myPosition ? `#${stats.myPosition}` : 'N/A', borderColor: 'border-l-blue-600' },
    { label: 'Seus Pontos', value: stats.myPoints.toLocaleString(), borderColor: 'border-l-yellow-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div key={index} className={`bg-white rounded-lg shadow-sm p-4 border-l-4 ${card.borderColor}`}>
          <div className="text-sm text-gray-600 mb-1">{card.label}</div>
          <div className="text-2xl font-bold text-gray-900">{card.value}</div>
        </div>
      ))}
    </div>
  );
}




