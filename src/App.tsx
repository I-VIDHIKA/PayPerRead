import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { ArticleCard } from './components/ArticleCard';
import { PaymentModal } from './components/PaymentModal';
import { ArticleModal } from './components/ArticleModal';
import { useAuth } from './hooks/useAuth';
import { mockArticles } from './data/mockArticles';
import { Article } from './types';

function App() {
  const auth = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [unlockedArticles, setUnlockedArticles] = useState<Set<string>>(new Set());

  const handleAuthSubmit = async (email: string, password: string, isSignup = false, name?: string) => {
    if (isSignup && name) {
      return await auth.signupWithEmail(email, password, name);
    }
    return await auth.loginWithEmail(email, password);
  };

  const handleArticleUnlock = (article: Article) => {
    if (!auth.isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    setSelectedArticle(article);
    setShowPaymentModal(true);
  };

  const handlePayment = async (article: Article, useWallet: boolean): Promise<boolean> => {
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (useWallet) {
        // Deduct from wallet
        const success = auth.deductFromWallet(article.priceInr);
        if (success) {
          setUnlockedArticles(prev => new Set(prev).add(article.id));
          return true;
        }
        return false;
      } else {
        // Mock MetaMask payment
        // In a real app, this would integrate with MetaMask
        const success = Math.random() > 0.1; // 90% success rate for demo
        if (success) {
          setUnlockedArticles(prev => new Set(prev).add(article.id));
          return true;
        }
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const handleArticleClick = (article: Article) => {
    if (article.isLocked && !unlockedArticles.has(article.id)) {
      handleArticleUnlock(article);
      return;
    }
    
    setSelectedArticle(article);
    setShowArticleModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        authState={auth}
        onAuthClick={() => setShowAuthModal(true)}
        onLogout={auth.logout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Premium Articles
          </h1>
          <p className="text-xl text-gray-600">
            Discover high-quality content. Pay per article or unlock with your wallet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              isUnlocked={unlockedArticles.has(article.id)}
              onUnlock={handleArticleUnlock}
              onClick={handleArticleClick}
            />
          ))}
        </div>

        {!auth.isAuthenticated && (
          <div className="mt-12 text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                Join PayPerRead Today
              </h3>
              <p className="text-blue-700 mb-4">
                Create an account to unlock premium articles and manage your reading wallet.
              </p>
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </main>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onEmailAuth={handleAuthSubmit}
        onMetaMaskConnect={auth.connectMetaMask}
      />

      <PaymentModal
        isOpen={showPaymentModal}
        article={selectedArticle}
        wallet={auth.wallet}
        onClose={() => setShowPaymentModal(false)}
        onPayment={handlePayment}
        onTopUp={auth.topUpWallet}
      />

      <ArticleModal
        isOpen={showArticleModal}
        article={selectedArticle}
        onClose={() => setShowArticleModal(false)}
      />
    </div>
  );
}

export default App;