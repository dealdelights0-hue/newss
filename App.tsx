import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import LiveTVPage from './components/LiveTVPage';
import type { Article } from './types';

const API_KEY = 'pub_60289e31dc3147f484ad8f3f37b3db27';

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-96">
        <style>{`
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            .spinner {
                display: inline-block;
                width: 50px;
                height: 50px;
                border: 3px solid rgba(0,0,0,.3);
                border-radius: 50%;
                border-top-color: #000;
                animation: spin 1s ease-in-out infinite;
            }
        `}</style>
        <div className="spinner"></div>
    </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'live-tv'>('home');
  const [category, setCategory] = useState('top');
  const [mainArticle, setMainArticle] = useState<Article | null>(null);
  const [leftArticle, setLeftArticle] = useState<Article | null>(null);
  const [rightArticles, setRightArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      const API_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&language=en&category=${category}&image=1`;
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (data.status === 'success' && data.results) {
          const articlesWithImages = data.results.filter((article: any) => article.image_url);
          
          if (articlesWithImages.length >= 4) {
            setMainArticle(articlesWithImages[0]);
            setLeftArticle(articlesWithImages[1]);
            setRightArticles(articlesWithImages.slice(2, 4));
          } else {
             throw new Error('Not enough articles with images were found for this category.');
          }
        } else {
          throw new Error(data.message || 'Failed to fetch news');
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (currentPage === 'home') {
      fetchNews();
    }
  }, [category, currentPage]);

  const handleNavigateToHome = () => {
    setCurrentPage('home');
    setCategory('top');
  };
  const handleNavigateToLiveTV = () => setCurrentPage('live-tv');
  const handleCategoryChange = (newCategory: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
    }
    setCategory(newCategory);
  };

  const renderHomePage = () => {
    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-500 py-10">{`Error: ${error}`}</div>;
    if (mainArticle && leftArticle && rightArticles.length > 0) {
      return (
        <MainContent 
          mainArticle={mainArticle}
          leftArticle={leftArticle}
          rightArticles={rightArticles}
        />
      );
    }
    return <div className="text-center py-10">No articles found.</div>;
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Header 
        onNavigateToHome={handleNavigateToHome}
        onNavigateToLiveTV={handleNavigateToLiveTV}
        onSelectCategory={handleCategoryChange}
        activeCategory={category}
      />
      <main className="container mx-auto px-4 py-6">
        {currentPage === 'home' ? renderHomePage() : (
          <LiveTVPage onGoHome={handleNavigateToHome} />
        )}
      </main>
    </div>
  );
};

export default App;