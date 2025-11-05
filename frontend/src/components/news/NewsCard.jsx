import React from 'react';

export default function NewsCard({ article }) {
  const handleImageError = (e) => {
    e.target.style.display = 'none';
  };

  return (
    <article className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col bg-white">
      {article.image && (
        <div className="h-28 sm:h-32 relative flex-shrink-0 overflow-hidden">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={handleImageError}
          />
          <div className="absolute top-1.5 left-1.5 bg-black/70 text-white px-1.5 py-0.5 rounded text-[10px] font-medium z-10">
            {article.category}
          </div>
        </div>
      )}
      {!article.image && (
        <div className="h-20 bg-brand-gradient-horizontal flex items-center justify-center relative">
          <div className="absolute top-1.5 left-1.5 bg-black/70 text-white px-1.5 py-0.5 rounded text-[10px] font-medium">
            {article.category}
          </div>
          <span className="text-white text-xs font-bold">⚽ {article.category}</span>
        </div>
      )}
      <div className="p-2 sm:p-3 flex-1 flex flex-col">
        <time className="text-[10px] sm:text-xs text-gray-500 mb-1">{article.timeAgo}</time>
        <h4 className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight mb-1.5 line-clamp-2 flex-1">
          {article.title}
        </h4>
        <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>
      </div>
    </article>
  );
}
