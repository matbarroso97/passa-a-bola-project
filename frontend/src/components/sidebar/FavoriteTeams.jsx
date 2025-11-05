import React from 'react';
import EmptyState from '../ui/EmptyState';

const competitionNames = {
  brasileirao: 'Brasileirão Feminino',
  libertadores: 'Libertadores Feminina',
  uefa: 'UEFA Women\'s Champions League',
  fa: 'FA Women\'s Super League'
};

export default function FavoriteTeams({ teams, onAdd, onRemove, isAuthenticated, onLoginClick }) {
  // Se não estiver autenticado, mostra mensagem de login
  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Meus Times Favoritos</h3>
        <EmptyState
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
          title="Login necessário"
          message="Faça login para adicionar e gerenciar seus times favoritos"
          action={onLoginClick}
          actionLabel="Fazer Login"
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4 gap-2 sm:gap-0 sm:flex-nowrap">
        <h3 className="text-lg font-bold text-gray-900 whitespace-nowrap">Meus Times Favoritos</h3>
        <button
          onClick={onAdd}
          className="px-2 sm:px-1 py-2 btn-brand rounded-lg transition-colors text-xs sm:text-sm font-semibold flex-shrink-0 shadow-sm hover:shadow-md"
          aria-label="Adicionar time favorito"
        >
          + Adicionar
        </button>
      </div>
      {teams.length === 0 ? (
        <EmptyState
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          }
          title="Nenhum time favorito"
          message="Clique em 'Adicionar' para adicionar seus times favoritos"
        />
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

