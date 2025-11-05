import React from 'react';

export default function HeroBanner() {
  return (
    <section className="mb-4 sm:mb-8">
      {/* Desktop Banner - Original */}
      <div className="hidden sm:block relative rounded-lg overflow-hidden shadow-lg">
        <img 
          src="/assets/images/passaabolabanner.png" 
          alt="Passa a Bola - Sua plataforma completa de futebol feminino"
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 to-transparent flex items-center justify-start px-6 sm:px-12">
          <div className="text-white max-w-md">
            <p className="text-sm sm:text-base md:text-lg opacity-90 mb-4 sm:mb-6">
              Sua plataforma completa de futebol feminino
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a 
                href="/jogos" 
                className="bg-white text-purple-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
              >
                Ver Jogos
              </a>
              <a 
                href="/fantasy" 
                className="bg-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm sm:text-base"
              >
                Jogar Fantasy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Banner */}
      <div className="sm:hidden relative rounded-lg overflow-hidden shadow-lg max-h-[250px]">
        <img 
          src="/assets/images/bannermobile.png" 
          alt="Passa a Bola - Sua plataforma completa de futebol feminino"
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-white text-center w-full">
            <p className="text-xs opacity-90 mb-3 font-medium">
              Sua plataforma completa de futebol feminino
            </p>
            <div className="flex flex-col gap-2">
              <a 
                href="/jogos" 
                className="bg-white text-purple-600 px-4 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-xs text-center shadow-lg"
              >
                Ver Jogos
              </a>
              <a 
                href="/fantasy" 
                className="bg-purple-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-xs text-center shadow-lg border-2 border-white/30"
              >
                Jogar Fantasy
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

