import React from 'react';

export default function NewsCard({ article }) {
  const fallbackImages = {
    'corinthians': 'https://s2.glbimg.com/example-corinthians-ct-real.jpg',
    'copa do brasil feminina': 'https://s2.glbimg.com/example-copa-brasil-real.jpg',
    'libertadores feminina': 'https://s2.glbimg.com/example-libertadores-real.jpg',
    'brasileiro feminino': 'https://s2.glbimg.com/example-artilheiras-real.jpg',
    'futebol feminino': 'https://s2.glbimg.com/example-feminine-football-real.jpg'
  };

  const handleImageError = (e) => {
    e.target.src = fallbackImages[article.category] || 
      `https://via.placeholder.com/300x200/8620AD/ffffff?text=${encodeURIComponent(article.category)}`;
  };

  return (
    <article className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="h-28 sm:h-32 relative flex-shrink-0">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={handleImageError}
        />
        <div className="absolute top-1.5 left-1.5 bg-black/70 text-white px-1.5 py-0.5 rounded text-[10px] font-medium">
          {article.category}
        </div>
      </div>
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


