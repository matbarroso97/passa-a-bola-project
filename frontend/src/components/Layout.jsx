import React from "react";
import Topbar from "./Topbar.jsx";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Topbar />

      <main className="p-6 flex-1 max-w-6xl mx-auto w-full">
        {children}
      </main>

      <footer className="header-brand text-white py-2 mt-8">
        <div className="max-w-5xl mx-auto px-6">
          {/* Seções principais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-2">
            
            <div className="flex flex-col items-center">
              <img 
                src="/assets/icons/passabolafooter.png" 
                alt="Passa a Bola"
                className="w-48 h-48 object-contain"
              />
              <div className="mt-4">
                <p className="mb-3 text-sm text-center">Conheça as redes sociais do passa a bola:</p>
                <div className="flex justify-center space-x-3">
                  <a href="https://www.youtube.com/@passabola" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity" aria-label="YouTube do Passa a Bola">
                    <img
                      src="/assets/icons/social/youtube.png"
                      alt="YouTube"
                      className="w-8 h-8"
                    />
                  </a>
                  <a href="https://www.instagram.com/passaabola/" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Instagram do Passa a Bola">
                    <img
                      src="/assets/icons/social/instagram.png"
                      alt="Instagram"
                      className="w-8 h-8"
                    />
                  </a>
                  <a href="https://www.tiktok.com/@passabola" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity flex items-center" aria-label="TikTok do Passa a Bola">
                    <img
                      src="/assets/icons/social/tiktok.png"
                      alt="TikTok"
                      className="w-10 h-10 -mt-1"
                    />
                  </a>
                  <a href="https://www.facebook.com/oficialpassaabola/" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Facebook do Passa a Bola">
                    <img
                      src="/assets/icons/social/facebook.png"
                      alt="Facebook"
                      className="w-8 h-8"
                    />
                  </a>
                </div>
              </div>
            </div>

            
            <div className="flex flex-col items-center text-center mt-12">
              <h4 className="font-bold text-base mb-3">Páginas</h4>
              <ul className="space-y-1">
                <li><a href="/" className="hover:underline text-sm">Home</a></li>
                <li><a href="/jogos" className="hover:underline text-sm">Jogos</a></li>
                <li><a href="/noticias" className="hover:underline text-sm">Notícias</a></li>
                <li><a href="/fantasy" className="hover:underline text-sm">Fantasy</a></li>
              </ul>
            </div>

            
            <div className="flex flex-col items-center text-center mt-12">
              <h4 className="font-bold text-base mb-3">Ligas</h4>
              <ul className="space-y-1">
                <li><a href="#" className="hover:underline text-sm">UEFA Women's Champions League</a></li>
                <li><a href="#" className="hover:underline text-sm">Libertadores Feminina</a></li>
                <li><a href="#" className="hover:underline text-sm">Brasileirão Feminino</a></li>
                <li><a href="#" className="hover:underline text-sm">FA Women's Super League</a></li>
                <li><a href="#" className="hover:underline text-sm">Primera División Femenina</a></li>
                <li><a href="#" className="hover:underline text-sm">Division 1 Féminine</a></li>
              </ul>
            </div>

            
            <div className="flex flex-col items-center text-center mt-12">
              <h4 className="font-bold text-base mb-3">Fantasy</h4>
              <p className="text-sm">
                Acesse o Fantasy para transformar o seu conhecimento em resultado
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
