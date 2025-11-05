import React from 'react';

export default function Loading({ 
  size = 'md', 
  text = 'Carregando...',
  fullScreen = false 
}) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-b-2',
    lg: 'h-12 w-12 border-b-2'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50'
    : 'flex flex-col items-center justify-center py-12';

  return (
    <div className={containerClasses}>
      <div className={`inline-block animate-spin rounded-full border-purple-600 ${sizeClasses[size]}`} 
           role="status" 
           aria-label="Carregando">
        <span className="sr-only">Carregando...</span>
      </div>
      {text && (
        <p className="text-sm text-gray-500 mt-4">{text}</p>
      )}
    </div>
  );
}

