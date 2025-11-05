// Configuração da API - funciona em desenvolvimento e produção
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Helper para fazer chamadas à API
 * Em desenvolvimento: usa proxy do Vite (/api)
 * Em produção: usa URL completa da API (VITE_API_URL)
 */
export const apiUrl = (endpoint) => {
  // Remove barra inicial se houver
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  // Se tem VITE_API_URL configurado, usa URL completa
  if (API_BASE_URL) {
    return `${API_BASE_URL}/${cleanEndpoint}`;
  }
  
  // Senão, usa endpoint relativo (funciona com proxy em dev)
  return `/api/${cleanEndpoint}`;
};

/**
 * Faz uma requisição fetch para a API
 */
export const apiFetch = async (endpoint, options = {}) => {
  const url = apiUrl(endpoint);
  return fetch(url, options);
};

