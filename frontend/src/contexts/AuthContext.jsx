import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiUrl } from '../config/api';

// Context para gerenciar estado de autenticação globalmente
const AuthContext = createContext();

// Hook para acessar o contexto de autenticação
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext deve ser usado dentro de AuthProvider');
  }
  return context;
};

// Provider que disponibiliza o contexto para todos os componentes filhos
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verifica se há sessão salva no localStorage e valida token no servidor
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        // Se encontrar token e dados do usuário, valida no servidor
        if (token && userData) {
          try {
            const parsedUser = JSON.parse(userData);
            // Valida se os dados do usuário são válidos localmente
            if (parsedUser && parsedUser.id && parsedUser.email) {
              // Valida token no servidor
              try {
                const response = await fetch(apiUrl('auth/verify'), {
                  method: 'GET',
                  headers: {
                    'Authorization': `Bearer ${token}`,
                  },
                });

                if (response.ok) {
                  const data = await response.json();
                  // Token válido, restaura sessão
                  setUser(data.user);
                } else {
                  // Token inválido ou expirado, limpa localStorage
                  localStorage.removeItem('authToken');
                  localStorage.removeItem('userData');
                  setUser(null);
                }
              } catch (verifyError) {
                // Erro ao validar token, limpa localStorage
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                setUser(null);
              }
            } else {
              // Dados inválidos, limpa o localStorage
              localStorage.removeItem('authToken');
              localStorage.removeItem('userData');
            }
          } catch (parseError) {
            // JSON inválido, limpa o localStorage
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
          }
        }
      } catch (err) {
        // Erro ao acessar localStorage, limpa dados
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Função de login que valida credenciais via API interna
  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      // Faz requisição para a API interna de autenticação
      const response = await fetch(apiUrl('auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Verifica se a resposta foi bem-sucedida antes de fazer parse
      if (!response.ok) {
        let errorMessage = 'Email ou senha incorretos';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // Se não conseguir fazer parse do erro, usa mensagem padrão
          errorMessage = response.status === 401 
            ? 'Email ou senha incorretos' 
            : 'Erro ao fazer login. Tente novamente.';
        }
        throw new Error(errorMessage);
      }

      // Parse da resposta de sucesso
      const data = await response.json();

      // Valida se a resposta contém os dados necessários
      if (!data.token || !data.user) {
        throw new Error('Resposta inválida do servidor');
      }

      // Salva token e dados do usuário retornados pela API
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));

      // Atualiza estado do usuário autenticado
      setUser(data.user);

      setLoading(false);
      return { success: true };

    } catch (err) {
      const errorMsg = err.message || 'Erro ao fazer login. Tente novamente.';
      setError(errorMsg);
      setLoading(false);
      throw err;
    }
  }, []);

  // Função de logout que limpa sessão no servidor e no localStorage
  const logout = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      // Tenta fazer logout no servidor se houver token
      if (token) {
        try {
          await fetch(apiUrl('auth/logout'), {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
        } catch (err) {
          // Ignora erro do servidor, continua com limpeza local
        }
      }

      // Limpa dados locais
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      setUser(null);
      setError(null);
    } catch (err) {
      // Erro silencioso no logout - força limpeza do estado mesmo com erro
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      setUser(null);
      setError(null);
    }
  }, []);

  // Verifica se o usuário está autenticado
  const isAuthenticated = !!user;

  // Função helper para fazer requisições autenticadas
  const authenticatedFetch = useCallback(async (url, options = {}) => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    };

    const response = await fetch(apiUrl(url), {
      ...options,
      headers,
    });

    // Se token expirou ou inválido, faz logout
    if (response.status === 401) {
      logout();
    }

    return response;
  }, [logout]);

  // Valores disponibilizados pelo contexto
  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    setError,
    authenticatedFetch
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

