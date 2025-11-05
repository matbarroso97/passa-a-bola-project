import React from 'react';

const competitionNames = {
  brasileirao: 'Brasileirão Feminino',
  libertadores: 'Libertadores Feminina',
  uefa: 'UEFA Women\'s Champions League',
  fa: 'FA Women\'s Super League'
};

export default function FavoriteTeams({ teams, onAdd, onRemove }) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4 gap-2 sm:gap-0 sm:flex-nowrap">
        <h3 className="text-lg font-bold text-gray-900 whitespace-nowrap">Meus Times Favoritos</h3>
        <button
          onClick={onAdd}
          className="px-2 sm:px-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-xs sm:text-sm font-semibold flex-shrink-0"
        >
          + Adicionar
        </button>
      </div>
      {teams.length === 0 ? (
        <div className="text-sm text-gray-500 text-center py-4">
          Clique em "Adicionar" para adicionar seus times favoritos
        </div>
      ) : (
        <div className="space-y-2">
          {teams.map((team) => (
            <div key={team.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 truncate">{team.name}</div>
                <div className="text-xs text-gray-600">
                  {competitionNames[team.competition] || team.competition}
                </div>
                {team.notes && (
                  <div className="text-xs text-gray-500 mt-1 truncate">{team.notes}</div>
                )}
              </div>
              <button
                onClick={() => onRemove(team.id)}
                className="ml-2 text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                title="Remover"
                aria-label={`Remover ${team.name}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

