import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Topbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const linkClass = ({ isActive }) =>
    `px-3 py-1 rounded text-sm font-medium ${
      isActive
        ? "bg-white/20 text-white"
        : "text-gray-200 hover:bg-white/10"
    }`;

  return (
    <header className="w-full header-brand text-white p-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        {/* Marca */}
        <div className="font-bold text-lg whitespace-nowrap flex items-center justify-between">
          <span>PASSA A BOLA</span>

          {/* Botão mobile menu */}
          <button
            className="sm:hidden ml-2 p-2 hover:bg-white/10 rounded"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Navegação - Desktop original */}
        <nav
          className={`hidden sm:flex sm:flex-row sm:gap-6`}
        >
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/jogos" className={linkClass}>
            Jogos
          </NavLink>
          <NavLink to="/tabela" className={linkClass}>
            Tabela
          </NavLink>
          <NavLink to="/noticias" className={linkClass}>
            Notícias
          </NavLink>
          <NavLink to="/fantasy" className={linkClass}>
            Fantasy
          </NavLink>
        </nav>

        {/* Barra de pesquisa e ícones - Desktop original */}
        <div className="hidden sm:flex items-center space-x-4">
          {/* Barra de pesquisa */}
          <div className="w-full sm:flex-1 max-w-md">
            <input
              type="text"
              placeholder="Pesquisar por Times, Atletas e mais"
              className="w-full px-3 py-1 rounded bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>

          {/* Botão de Login/Logout */}
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-200">
                  Olá, {user?.name || 'Usuário'}
                </span>
                <button 
                  onClick={handleLogout}
                  className="p-2 hover:bg-white/10 rounded flex items-center space-x-1"
                  title="Sair"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="text-sm">Sair</span>
                </button>
              </div>
            ) : (
              <NavLink 
                to="/login" 
                className="flex items-center space-x-1 px-3 py-2 bg-white/20 hover:bg-white/30 rounded text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Login</span>
              </NavLink>
            )}
          </div>
        </div>

        {/* Mobile Layout - Menu Lateral Moderno */}
        {isOpen && (
          <>
            {/* Overlay escuro */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 sm:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Lateral */}
            <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-purple-700 to-indigo-800 shadow-2xl z-50 sm:hidden transform transition-transform duration-300 ease-out">
              <div className="flex flex-col h-full">
                {/* Header do Menu */}
                <div className="flex items-center justify-between p-4 border-b border-white/20">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">⚽</span>
                    </div>
                    <span className="text-white font-bold text-lg">Passa a Bola</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Fechar menu"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navegação */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                  <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-white/20 text-white shadow-lg transform scale-105' 
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="font-medium">Home</span>
                  </NavLink>
                  
                  <NavLink 
                    to="/jogos" 
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-white/20 text-white shadow-lg transform scale-105' 
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Jogos</span>
                  </NavLink>
                  
                  <NavLink 
                    to="/tabela" 
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-white/20 text-white shadow-lg transform scale-105' 
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="font-medium">Tabela</span>
                  </NavLink>
                  
                  <NavLink 
                    to="/noticias" 
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-white/20 text-white shadow-lg transform scale-105' 
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    <span className="font-medium">Notícias</span>
                  </NavLink>
                  
                  <NavLink 
                    to="/fantasy" 
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-white/20 text-white shadow-lg transform scale-105' 
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span className="font-medium">Fantasy</span>
                  </NavLink>
                </nav>

                {/* Pesquisa Mobile */}
                <div className="p-4 border-t border-white/20">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Pesquisar..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition-all"
                    />
                  </div>
                </div>
                
                {/* Login Mobile */}
                <div className="p-4 border-t border-white/20">
                  {isAuthenticated ? (
                    <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{user?.name || 'Usuário'}</p>
                          <p className="text-white/60 text-xs">Online</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        title="Sair"
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <NavLink 
                      to="/login" 
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-medium transition-all duration-200 shadow-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Entrar</span>
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
