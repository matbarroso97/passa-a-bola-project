import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchFeminineFootballNews } from '../services/newsService';

const NewsContext = createContext();

export const useNewsContext = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNewsContext deve ser usado dentro de NewsProvider');
  }
  return context;
};

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  // Cache de 5 minutos - só recarrega se passou mais de 5 minutos desde a última busca
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos em milissegundos

  // Função para carregar notícias
  const loadNews = useCallback(async (forceRefresh = false) => {
    // Se já tem notícias e não é refresh forçado, verifica se precisa atualizar
    if (!forceRefresh && news.length > 0) {
      const now = Date.now();
      if (lastFetchTime && (now - lastFetchTime) < CACHE_DURATION) {
        // Ainda dentro do tempo de cache, não recarrega
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);
      
      // O service já retorna fallback automaticamente se der erro
      const newsData = await fetchFeminineFootballNews();
      setNews(newsData);
      setLastFetchTime(Date.now());
    } catch (err) {
      // Se o service lançar erro (não deveria, pois retorna fallback), trata aqui
      setError('Erro ao carregar notícias');
      
      // Se não tem notícias ainda e deu erro, mantém vazio para não quebrar a UI
      if (news.length === 0) {
        setNews([]);
      }
    } finally {
      setLoading(false);
    }
  }, [news.length, lastFetchTime]);

  // Carrega notícias automaticamente ao montar o provider se ainda não tiver
  useEffect(() => {
    if (news.length === 0 && !loading) {
      loadNews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    news,
    loading,
    error,
    loadNews,
    refreshNews: () => loadNews(true),
  };

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
};

export default NewsContext;

