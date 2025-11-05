import React, { useRef, useEffect } from 'react';

export default function HeroBanner() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay bloqueado pelo navegador - silencioso
      });
    }
  }, []);

  return (
    <section className="mb-0 -mx-4 sm:-mx-6 lg:-mx-16 xl:-mx-24 2xl:-mx-32 -mt-2 sm:-mt-4">
      {/* Desktop Hero com Vídeo */}
      <div className="hidden sm:block relative rounded-xl overflow-hidden shadow-2xl group">
        {/* Vídeo de Background */}
        <div className="relative w-full h-[450px] sm:h-[600px] lg:h-[600px] overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            aria-label="Vídeo de fundo do Passa a Bola"
          >
            <source src="/assets/hero.mp4" type="video/mp4" />
            {/* Fallback caso o vídeo não carregue */}
            <img 
              src="/assets/images/passaabolabanner.png" 
              alt="Passa a Bola"
              className="w-full h-full object-cover"
            />
          </video>
          
          {/* Overlay roxo leve com gradiente */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 via-purple-800/50 to-purple-900/40 group-hover:from-purple-900/55 group-hover:via-purple-800/45 group-hover:to-purple-900/35 transition-all duration-500"></div>
          
          {/* Texto no topo */}
          <div className="absolute top-1 sm:top-2 lg:top-3 left-6 sm:left-12 lg:left-16 right-6 sm:right-12 lg:right-16">
            <p className="text-base sm:text-lg md:text-xl font-medium text-white/95 leading-relaxed drop-shadow-2xl animate-fadeIn" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)', animationDelay: '0.2s' }}>
              Sua plataforma completa de futebol feminino
            </p>
          </div>

          {/* Botões na parte inferior */}
          <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-6 sm:left-12 lg:left-16">
            <div className="flex flex-wrap gap-3 sm:gap-4 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              {/* CTA Primário - Fantasy */}
              <a 
                href="/fantasy" 
                className="group/btn bg-purple-600/80 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold hover:bg-purple-600/90 transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl min-h-[44px] flex items-center justify-center backdrop-blur-md"
                aria-label="Jogar Fantasy - CTA principal"
              >
                Jogar Fantasy
              </a>
              {/* CTA Secundário - Ver Jogos */}
              <a 
                href="/jogos" 
                className="bg-white/70 text-purple-600 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-medium hover:bg-white/80 transition-all duration-300 text-sm sm:text-base shadow-lg border border-white/40 hover:border-white/50 min-h-[44px] flex items-center justify-center backdrop-blur-md"
                aria-label="Ver Jogos"
              >
                Ver Jogos
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Hero com Vídeo */}
      <div className="sm:hidden relative rounded-xl overflow-hidden shadow-2xl">
        {/* Vídeo de Background */}
        <div className="relative w-full h-[320px] overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            aria-label="Vídeo de fundo do Passa a Bola"
          >
            <source src="/assets/hero.mp4" type="video/mp4" />
            {/* Fallback caso o vídeo não carregue */}
            <img 
              src="/assets/images/bannermobile.png" 
              alt="Passa a Bola"
              className="w-full h-full object-cover object-bottom"
            />
          </video>
          
          {/* Overlay roxo leve */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/65 to-purple-800/55"></div>
          
          {/* Texto no topo */}
          <div className="absolute top-1 left-4 right-4">
            <p className="text-xs sm:text-sm font-medium text-white/95 leading-relaxed text-center drop-shadow-2xl animate-fadeIn" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)', animationDelay: '0.2s' }}>
              Sua plataforma completa de futebol feminino
            </p>
          </div>

          {/* Botões na parte inferior */}
          <div className="absolute bottom-2 left-4 right-4">
            <div className="flex flex-col gap-2.5 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              {/* CTA Primário - Fantasy */}
              <a 
                href="/fantasy" 
                className="bg-purple-600/80 text-white px-5 py-3 rounded-xl font-semibold hover:bg-purple-600/90 transition-all duration-300 text-sm text-center shadow-lg min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-300/50 backdrop-blur-md"
                aria-label="Jogar Fantasy - CTA principal"
              >
                Jogar Fantasy
              </a>
              {/* CTA Secundário - Ver Jogos */}
              <a 
                href="/jogos" 
                className="bg-white/70 text-purple-600 px-5 py-3 rounded-xl font-medium hover:bg-white/80 transition-all duration-300 text-sm text-center shadow-lg border border-white/40 hover:border-white/50 min-h-[44px] flex items-center justify-center backdrop-blur-md"
                aria-label="Ver Jogos"
              >
                Ver Jogos
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

