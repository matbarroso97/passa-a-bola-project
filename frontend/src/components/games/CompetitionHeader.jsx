import React from 'react';

export default function CompetitionHeader({ icon, name, round, subtitle }) {
  return (
    <>
      <div className="mb-4">
        <div className="flex items-center space-x-3 sm:space-x-4">
          {icon && (
            <img 
              src={icon} 
              alt={name}
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
          )}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">{name}</h3>
            {subtitle && <p className="text-xs sm:text-sm text-gray-600">{subtitle}</p>}
            {round && <p className="text-xs sm:text-sm text-gray-600">Jornada {round}</p>}
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-purple-800 mb-4"></div>
    </>
  );
}







