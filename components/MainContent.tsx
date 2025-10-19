import React from 'react';
import type { Article } from '../types';

interface MainContentProps {
  mainArticle: Article;
  leftArticle: Article;
  rightArticles: Article[];
}

const Headline: React.FC<{ text: string }> = ({ text }) => (
    <span className="inline-block border-b-4 border-gray-300 pb-2 mr-4">{text}</span>
);

const MainContent: React.FC<MainContentProps> = ({ mainArticle, leftArticle, rightArticles }) => {
  
  const renderMainTitle = (title: string) => {
    return title.split(' ').map((word, index) => <Headline key={index} text={word} />);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Left Column */}
      <div className="lg:col-span-1 space-y-4">
        <a href={leftArticle.link} target="_blank" rel="noopener noreferrer" className="block hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-sm">
          <h2 className="text-2xl font-bold leading-tight">
              {leftArticle.title}
          </h2>
        </a>
        {leftArticle.description && (
            <p className="text-sm text-gray-700">
                <span className="text-xl mr-2 align-middle">&bull;</span>
                {leftArticle.description}
            </p>
        )}
        <a href={leftArticle.link} target="_blank" rel="noopener noreferrer" aria-label={`Read full article: ${leftArticle.title}`}>
          <img src={leftArticle.image_url!} alt={leftArticle.title} className="w-full h-auto object-cover" />
        </a>
      </div>

      {/* Center Column */}
      <div className="lg:col-span-2 space-y-4">
        <a href={mainArticle.link} target="_blank" rel="noopener noreferrer" className="block hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-sm">
            <h1 
                className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-none tracking-tight"
                aria-label={`Read article: ${mainArticle.title}`}
            >
                {renderMainTitle(mainArticle.title)}
            </h1>
        </a>
        <a href={mainArticle.link} target="_blank" rel="noopener noreferrer" aria-label={`Read full article: ${mainArticle.title}`}>
            <img src={mainArticle.image_url!} alt={mainArticle.title} className="w-full h-auto object-cover" />
        </a>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-1 space-y-8">
        {rightArticles.map((article) => (
          <div key={article.article_id} className="space-y-2">
            <a href={article.link} target="_blank" rel="noopener noreferrer" aria-label={`Read full article: ${article.title}`}>
                <img src={article.image_url!} alt={article.title} className="w-full h-auto object-cover" />
            </a>
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="block hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-sm">
                <h3 className="text-xl font-bold leading-tight">
                {article.title}
                </h3>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
