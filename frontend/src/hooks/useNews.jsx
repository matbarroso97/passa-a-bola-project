import { useNewsContext } from '../contexts/NewsContext';

// Hook customizado para facilitar o uso do contexto de notícias
export const useNews = () => {
  const newsContext = useNewsContext();
  
  return newsContext;
};




