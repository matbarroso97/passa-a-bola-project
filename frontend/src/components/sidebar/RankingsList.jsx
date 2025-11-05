import React from 'react';

const rankings = [
  { id: 'fifa', name: 'FIFA Ranking FIFA', icon: '/assets/icons/fifa.png', hasImage: true },
  { id: 'uefa', name: 'Ranking UEFA', icon: '/assets/icons/uefawomen.png', hasImage: true },
  { id: 'cbf', name: 'Ranking CBF', icon: '/assets/icons/cbf.png', hasImage: true },
];

export default function RankingsList() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Rankings</h3>
      <div className="w-full h-px bg-purple-800 mb-4"></div>
      <div className="space-y-3">
        {rankings.map((ranking) => (
          <div key={ranking.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
            <div className="flex items-center space-x-3">
              {ranking.hasImage ? (
                <img 
                  src={ranking.icon} 
                  alt={ranking.name}
                  className="w-6 h-6 object-contain"
                />
              ) : (
                <div className={`w-6 h-6 ${ranking.color} rounded flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">{ranking.icon}</span>
                </div>
              )}
              <span className="text-sm font-medium">{ranking.name}</span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

