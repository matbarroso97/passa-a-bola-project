import React from 'react';

export default function StatisticsComparison() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Comparar estatísticas</h3>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Digite o nome da equipe ou da atleta"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
        />
        <div className="w-full h-px bg-purple-800"></div>
        <input
          type="text"
          placeholder="Digite o nome da equipe ou da atleta"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
        />
        <button className="w-full btn-brand py-2 rounded-lg transition-colors font-semibold shadow-md hover:shadow-lg">
          Comparar
        </button>
      </div>
    </div>
  );
}





