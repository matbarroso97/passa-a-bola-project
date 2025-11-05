import React from 'react';

export default function FantasyBanner() {
  return (
    <div className="bg-brand text-white rounded-lg p-3 shadow-md border border-purple-700/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="/assets/icons/trofeu.png" 
            alt="Troféu"
            className="w-5 h-5 mr-2 object-contain"
          />
          <span className="text-sm font-medium">Faça o Fantasy da sua competição favorita</span>
        </div>
        <a href="/fantasy" className="text-xs hover:underline">→</a>
      </div>
    </div>
  );
}
