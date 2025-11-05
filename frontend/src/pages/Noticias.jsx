import React, { useEffect } from "react";
import { useNews } from "../hooks/useNews";

export default function Noticias() {
  const { news, loading, error, loadNews, refreshNews } = useNews();

  useEffect(() => {
    // Carrega notícias usando o contexto (já tem cache, não recarrega se já tiver)
    loadNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = async () => {
    // Para "carregar mais", recarrega as notícias (pode trazer novas)
    await refreshNews();
  };

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
              {news.map((article) => (
                <article key={article.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback com imagem temática baseada na categoria
                        const fallbackImages = {
                          'corinthians': 'https://via.placeholder.com/600x400/8620AD/ffffff?text=Corinthians',
                          'copa do brasil feminina': 'https://via.placeholder.com/600x400/8620AD/ffffff?text=Copa+do+Brasil',
                          'libertadores feminina': 'https://via.placeholder.com/600x400/8620AD/ffffff?text=Libertadores',
                          'brasileiro feminino': 'https://via.placeholder.com/600x400/8620AD/ffffff?text=Brasileirão',
                          'futebol feminino': 'https://via.placeholder.com/600x400/8620AD/ffffff?text=Futebol+Feminino'
                        };
                        e.target.src = fallbackImages[article.category] || `https://via.placeholder.com/300x200/8620AD/ffffff?text=${encodeURIComponent(article.category)}`;
                      }}
                    />
                    <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-medium">
                      {article.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-gray-500 mb-2">{article.timeAgo}</div>
                    <h2 className="font-bold text-gray-900 text-lg mb-2 leading-tight">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{article.timeAgo}</span>
                      <span className="capitalize">{article.category}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-8">
              <button 
                onClick={handleLoadMore}
                disabled={loading}
                className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Carregando...' : 'Carregar Mais Notícias'}
              </button>
            </div>
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