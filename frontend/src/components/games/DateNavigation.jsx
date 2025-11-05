import React from 'react';

export default function DateNavigation({ dates = [], currentDate = 'Hoje', onPrevious, onNext, compact = false }) {
  const defaultDates = ['Qui 12/06', 'Ontem', 'Hoje', 'Amanhã', 'Ter 16/06'];
  const datesToShow = dates.length > 0 ? dates : defaultDates;
  
  const currentIndex = datesToShow.findIndex(date => date === currentDate);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < datesToShow.length - 1;

  const handlePrevious = () => {
    if (hasPrevious && onPrevious) {
      onPrevious();
    }
  };

  const handleNext = () => {
    if (hasNext && onNext) {
      onNext();
    }
  };

  // Se compact, mostra apenas o dia atual com setas (mobile e desktop)
  if (compact) {
    return (
      <nav className="flex items-center justify-between mb-4 bg-white rounded-lg p-2 sm:p-3 overflow-hidden">
        <div className="flex items-center justify-between w-full">
          <button 
            className={`p-2 rounded flex-shrink-0 transition-colors ${
              hasPrevious 
                ? 'hover:bg-gray-100 text-gray-600' 
                : 'text-gray-300 cursor-not-allowed'
            }`}
            aria-label="Data anterior"
            onClick={handlePrevious}
            disabled={!hasPrevious}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <span className="text-sm sm:text-base font-medium px-4 sm:px-6 py-2 bg-green-500 text-white rounded whitespace-nowrap">
            {currentDate}
          </span>
          
          <button 
            className={`p-2 rounded flex-shrink-0 transition-colors ${
              hasNext 
                ? 'hover:bg-gray-100 text-gray-600' 
                : 'text-gray-300 cursor-not-allowed'
            }`}
            aria-label="Próxima data"
            onClick={handleNext}
            disabled={!hasNext}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </nav>
    );
  }

  // Comportamento original: Mobile com setas, Desktop com todos os dias visíveis
  return (
    <nav className="flex items-center justify-between mb-4 bg-white rounded-lg p-2 sm:p-3 sm:overflow-x-auto">
      {/* Mobile: Apenas o dia atual centralizado com setas */}
      <div className="flex items-center justify-between w-full sm:hidden overflow-hidden">
        <button 
          className={`p-2 rounded flex-shrink-0 transition-colors ${
            hasPrevious 
              ? 'hover:bg-gray-100 text-gray-600' 
              : 'text-gray-300 cursor-not-allowed'
          }`}
          aria-label="Data anterior"
          onClick={handlePrevious}
          disabled={!hasPrevious}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <span className="text-sm font-medium px-4 py-2 bg-green-500 text-white rounded whitespace-nowrap">
          {currentDate}
        </span>
        
        <button 
          className={`p-2 rounded flex-shrink-0 transition-colors ${
            hasNext 
              ? 'hover:bg-gray-100 text-gray-600' 
              : 'text-gray-300 cursor-not-allowed'
          }`}
          aria-label="Próxima data"
          onClick={handleNext}
          disabled={!hasNext}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Desktop: Todos os dias visíveis */}
      <div className="hidden sm:flex items-center justify-between w-full">
        <button 
          className={`p-2 rounded flex-shrink-0 transition-colors ${
            hasPrevious 
              ? 'hover:bg-gray-100 text-gray-600' 
              : 'text-gray-300 cursor-not-allowed'
          }`}
          aria-label="Data anterior"
          onClick={handlePrevious}
          disabled={!hasPrevious}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex space-x-2 md:space-x-4 lg:space-x-8 mx-2 md:mx-4 overflow-x-auto flex-1 justify-center">
          {datesToShow.map((date, index) => (
            <span
              key={index}
              className={`text-sm whitespace-nowrap px-2 sm:px-3 py-1 rounded transition-colors ${
                date === currentDate
                  ? 'bg-green-500 text-white font-medium'
                  : 'text-gray-600 hover:bg-gray-100 cursor-pointer'
              }`}
            >
              {date}
            </span>
          ))}
        </div>
        
        <button 
          className={`p-2 rounded flex-shrink-0 transition-colors ${
            hasNext 
              ? 'hover:bg-gray-100 text-gray-600' 
              : 'text-gray-300 cursor-not-allowed'
          }`}
          aria-label="Próxima data"
          onClick={handleNext}
          disabled={!hasNext}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </nav>
  );
}