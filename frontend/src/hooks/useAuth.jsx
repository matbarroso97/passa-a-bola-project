import { useAuthContext } from '../contexts/AuthContext';

/**
 * Hook customizado para facilitar o uso do contexto de autenticação
 * 
 * @returns {Object} Objeto contendo:
 * - user: dados do usuário autenticado
 * - loading: estado de carregamento
 * - error: mensagem de erro (se houver)
 * - isAuthenticated: boolean indicando se está autenticado
 * - login: função para fazer login
 * - logout: função para fazer logout
 * - setError: função para definir erro manualmente
 * - canAccess: função para verificar permissões baseadas em role (opcional)
 */
export const useAuth = () => {
  const authContext = useAuthContext();
  
  return {
    ...authContext,
    /**
     * Verifica se o usuário tem permissão baseada no role
     * Útil para proteger rotas ou funcionalidades baseadas em permissões
     * 
     * @param {string|null} requiredRole - Role requerido ('admin', 'user', etc). 
     *                                    Se null, retorna true se autenticado
     * @returns {boolean} true se o usuário tem permissão, false caso contrário
     * 
     * @example
     * // Verificar se é admin
     * if (canAccess('admin')) { ... }
     * 
     * // Verificar se está autenticado (qualquer role)
     * if (canAccess()) { ... }
     */
    canAccess: (requiredRole = null) => {
      if (!authContext.isAuthenticated) return false;
      if (!requiredRole) return true;
      return authContext.user?.role === requiredRole;
    }
  };
};

