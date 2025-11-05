import React from 'react';

export default function FantasyBanner({ onStart }) {
  return (
    <article className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-xl p-6 sm:p-8 text-center">
      <div className="mb-4 sm:mb-6">
        <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Crie sua Equipe Fantasy</h2>
        <p className="text-base sm:text-lg opacity-90 mb-4 sm:mb-6">
          Escolha suas jogadoras favoritas e monte a equipe dos sonhos
        </p>
        <button 
          onClick={onStart}
          className="bg-white text-purple-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
        >
          Começar Agora
        </button>
      </div>
    </article>
  );
}





