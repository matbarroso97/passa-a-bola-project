import React from 'react';
import NewsCard from './NewsCard';
import Loading from '../ui/Loading';

export default function NewsSection({ featuredNews, otherNews, loading = false }) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-50 p-5 sm:p-6 lg:p-7 max-w-2xl hover:shadow transition-all duration-300">
      <div className="mb-4 sm:mb-6 pb-3 border-b border-gray-200">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Principais Notícias</h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">Últimas notícias do futebol feminino</p>
      </div>
      
      {/* Loading State */}
      {loading && !featuredNews && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loading size="lg" text="Carregando notícias..." />
        </div>
      )}
      
      {/* Notícia em Destaque */}
      {featuredNews && (
        <div className="mb-6">
          <article className="border-2 border-purple-600 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
            {featuredNews.image ? (
              <div className="h-48 sm:h-56 relative overflow-hidden">
                <img 
                  src={featuredNews.image} 
                  alt={featuredNews.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = e.target.parentElement.querySelector('.image-fallback');
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                {/* Fallback se a imagem falhar */}
                <div className="image-fallback hidden absolute inset-0 bg-brand-gradient-horizontal items-center justify-center">
                  <span className="text-white text-lg font-bold">⚽</span>
                </div>
                <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  DESTAQUE
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-5">
                  <time className="text-xs text-white/80 mb-2 block">{featuredNews.timeAgo}</time>
                  <h4 className="font-bold text-white text-base sm:text-lg mb-2 line-clamp-2">
                    {featuredNews.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/90 line-clamp-2">
                    {featuredNews.excerpt}
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-48 sm:h-56 relative bg-brand-gradient-horizontal flex items-center justify-center">
                <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  DESTAQUE
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-5">
                  <time className="text-xs text-white/80 mb-2 block">{featuredNews.timeAgo}</time>
                  <h4 className="font-bold text-white text-base sm:text-lg mb-2 line-clamp-2">
                    {featuredNews.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/90 line-clamp-2">
                    {featuredNews.excerpt}
                  </p>
                </div>
              </div>
            )}
          </article>
        </div>
      )}

      {/* Grid de outras notícias - 2 colunas */}
      {otherNews.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {otherNews.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      )}

      <div className="mt-6 text-right">
        <a href="/noticias" className="text-purple-600 font-semibold hover:underline text-sm">
          Ver todas as notícias →
        </a>
      </div>
    </section>
  );
}

