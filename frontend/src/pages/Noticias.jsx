import React, { useEffect, useState } from "react";
import { useNews } from "../hooks/useNews";

export default function Noticias() {
  const { news, loading, error, loadNews, refreshNews } = useNews();
  const [displayedCount, setDisplayedCount] = useState(6);

  useEffect(() => {
    // Carrega notícias usando o contexto (já tem cache, não recarrega se já tiver)
    loadNews();
  }, []);

  const handleLoadMore = () => {
    // Mostra mais uma notícia (até o total disponível)
    setDisplayedCount(prev => Math.min(prev + 1, news.length));
  };

  const displayedNews = news.slice(0, displayedCount);
  const hasMore = displayedCount < news.length;

  if (loading && news.length === 0) {
    return (
      <main className="min-h-screen" style={{backgroundColor: 'var(--page-bg)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <header>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Notícias</h1>
          </header>
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p className="text-gray-500 mt-4">Carregando notícias...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen" style={{backgroundColor: 'var(--page-bg)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <header>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Notícias</h1>
          </header>
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-purple-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{backgroundColor: 'var(--page-bg)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <header>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Notícias</h1>
        </header>
        
        {news.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedNews.map((article) => (
                <article key={article.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  {article.image ? (
                    <div className="h-48 relative flex-shrink-0 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="absolute top-3 left-3 bg-black/70 text-white px-2.5 py-1 rounded text-xs font-medium z-10 capitalize">
                        {article.category}
                      </div>
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center relative flex-shrink-0">
                      <div className="absolute top-3 left-3 bg-black/70 text-white px-2.5 py-1 rounded text-xs font-medium capitalize">
                        {article.category}
                      </div>
                      <span className="text-white text-2xl font-bold">⚽</span>
                    </div>
                  )}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <time className="text-xs text-gray-500 mb-3 block">{article.timeAgo}</time>
                    <h2 className="font-bold text-gray-900 text-lg mb-3 leading-tight line-clamp-2 flex-shrink-0">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <a 
                        href={article.url || "#"} 
                        className="text-purple-600 hover:text-purple-700 font-semibold text-sm inline-flex items-center gap-1.5 transition-colors"
                      >
                        Ler matéria
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-8">
                <button 
                  onClick={handleLoadMore}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                >
                  Carregar Mais Notícias
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhuma notícia encontrada.</p>
          </div>
        )}
      </div>
    </main>
  );
}