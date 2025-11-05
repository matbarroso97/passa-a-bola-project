import React from 'react';

export default function Leaderboard({ leaderboard, competitionName }) {
  const medalColors = ['bg-yellow-500', 'bg-gray-400', 'bg-orange-500'];

  if (leaderboard.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <h4 className="text-xl font-semibold text-gray-700 mb-2">Em Breve...</h4>
        <p className="text-gray-500">
          O ranking para {competitionName || 'esta competição'} estará disponível em breve.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 sm:space-y-4">
        {leaderboard.map((entry, index) => (
          <div key={entry.id} className="relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            {/* Foto do usuário - elemento principal, maior */}
            {entry.photo ? (
              <div className="flex-shrink-0 relative">
                <img 
                  src={entry.photo} 
                  alt={entry.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-full border-2 border-white shadow-md"
                />
                {/* Badge de posição sobreposto na foto - canto superior direito */}
                <div className={`absolute -top-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 ${medalColors[index] || 'bg-gray-500'} text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shadow-lg border-2 border-white`}>
                  {index + 1}
                </div>
              </div>
            ) : (
              <div className="flex-shrink-0 relative w-14 h-14 sm:w-16 sm:h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-xs sm:text-sm font-medium">
                  {entry.name.charAt(0).toUpperCase()}
                </span>
                {/* Badge de posição quando não há foto */}
                <div className={`absolute -top-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 ${medalColors[index] || 'bg-gray-500'} text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shadow-lg border-2 border-white`}>
                  {index + 1}
                </div>
              </div>
            )}
            
            {/* Informações do usuário */}
            <div className="flex-1 min-w-0 pl-2 sm:pl-0">
              <div className="font-semibold text-sm sm:text-base text-gray-900 truncate">{entry.name}</div>
              <div className="text-xs sm:text-sm text-gray-600 truncate">{entry.team}</div>
            </div>
            
            {/* Pontos - ajustado para mobile */}
            <div className="flex-shrink-0 text-right">
              <div className="font-bold text-sm sm:text-base text-purple-600">{entry.points.toLocaleString()} pts</div>
              <div className="text-xs sm:text-sm text-gray-500 hidden sm:block">{competitionName}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-6">
        <button className="text-purple-600 font-semibold hover:underline">
          Ver Ranking Completo →
        </button>
      </div>
    </>
  );
}

