import React from 'react';
import { Lock, Calendar, User } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  isUnlocked: boolean;
  onUnlock: (article: Article) => void;
  onClick: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  isUnlocked, 
  onUnlock, 
  onClick 
}) => {
  const handleCardClick = () => {
    if (!article.isLocked || isUnlocked) {
      onClick(article);
    }
  };

  const handleUnlockClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUnlock(article);
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer ${
        article.isLocked && !isUnlocked ? 'relative' : ''
      }`}
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={article.imageUrl}
          alt={article.title}
          className={`w-full h-48 object-cover ${
            article.isLocked && !isUnlocked ? 'filter blur-sm' : ''
          }`}
        />
        
        {article.isLocked && !isUnlocked && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <Lock className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm font-medium">Premium Article</p>
            </div>
          </div>
        )}

        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {article.category}
          </span>
        </div>

        {!article.isLocked && (
          <div className="absolute top-3 right-3">
            <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              FREE
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className={`text-xl font-bold text-gray-900 mb-2 ${
          article.isLocked && !isUnlocked ? 'filter blur-sm' : ''
        }`}>
          {article.title}
        </h3>
        
        <p className={`text-gray-600 mb-4 line-clamp-3 ${
          article.isLocked && !isUnlocked ? 'filter blur-sm' : ''
        }`}>
          {article.excerpt}
        </p>

        <div className={`flex items-center justify-between text-sm text-gray-500 mb-4 ${
          article.isLocked && !isUnlocked ? 'filter blur-sm' : ''
        }`}>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {article.isLocked && !isUnlocked ? (
          <button
            onClick={handleUnlockClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Lock className="h-4 w-4" />
            <span>Unlock for ₹{article.priceInr} / {article.priceEth} ETH</span>
          </button>
        ) : (
          <button
            onClick={handleCardClick}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-3 rounded-lg font-medium transition-colors"
          >
            {isUnlocked ? 'Read Article' : 'Read Free Article'}
          </button>
        )}
      </div>
    </div>
  );
};