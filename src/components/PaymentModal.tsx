import React, { useState } from 'react';
import { X, Wallet, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';
import { Article, WalletState } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  article: Article | null;
  wallet: WalletState;
  onClose: () => void;
  onPayment: (article: Article, useWallet: boolean) => Promise<boolean>;
  onTopUp: (amount: number) => Promise<boolean>;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  article,
  wallet,
  onClose,
  onPayment,
  onTopUp
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState(100);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen || !article) return null;

  const hasEnoughBalance = wallet.balance >= article.priceInr;

  const handleWalletPayment = async () => {
    if (!hasEnoughBalance) {
      setError('Insufficient wallet balance');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const success = await onPayment(article, true);
      if (success) {
        setSuccess('Article unlocked successfully!');
        setTimeout(() => {
          onClose();
          setSuccess('');
        }, 1500);
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (err) {
      setError('Payment processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMetaMaskPayment = async () => {
    setIsProcessing(true);
    setError('');

    try {
      const success = await onPayment(article, false);
      if (success) {
        setSuccess('Article unlocked successfully!');
        setTimeout(() => {
          onClose();
          setSuccess('');
        }, 1500);
      } else {
        setError('MetaMask payment failed');
      }
    } catch (err) {
      setError('MetaMask payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTopUp = async () => {
    setIsProcessing(true);
    setError('');

    try {
      const success = await onTopUp(topUpAmount);
      if (success) {
        setSuccess(`Wallet topped up with ₹${topUpAmount}!`);
        setShowTopUp(false);
        setTimeout(() => setSuccess(''), 2000);
      } else {
        setError('Top-up failed');
      }
    } catch (err) {
      setError('Top-up processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unlock Article</h2>
          <h3 className="text-lg font-medium text-gray-700 mb-2">{article.title}</h3>
          <div className="text-gray-600">
            <p>Price: ₹{article.priceInr} / {article.priceEth} ETH</p>
            <p>Current wallet balance: ₹{wallet.balance}</p>
          </div>
        </div>

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800">{success}</span>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-red-800">{error}</span>
          </div>
        )}

        {!showTopUp ? (
          <div className="space-y-4">
            {/* Wallet Payment */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Wallet className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Pay from Wallet</span>
                </div>
                <span className="text-sm text-gray-500">₹{article.priceInr}</span>
              </div>
              
              {hasEnoughBalance ? (
                <button
                  onClick={handleWalletPayment}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  {isProcessing ? 'Processing...' : 'Pay from Wallet'}
                </button>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-red-600">Insufficient balance</p>
                  <button
                    onClick={() => setShowTopUp(true)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Top Up Wallet
                  </button>
                </div>
              )}
            </div>

            {/* MetaMask Payment */}
            {wallet.isConnected && (
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-orange-500" />
                    <span className="font-medium">Pay with MetaMask</span>
                  </div>
                  <span className="text-sm text-gray-500">{article.priceEth} ETH</span>
                </div>
                
                <button
                  onClick={handleMetaMaskPayment}
                  disabled={isProcessing}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  {isProcessing ? 'Processing...' : 'Pay with MetaMask'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Top Up Wallet</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(Number(e.target.value))}
                  min="10"
                  max="10000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-2">
                {[50, 100, 200, 500].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setTopUpAmount(amount)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowTopUp(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleTopUp}
                disabled={isProcessing || topUpAmount < 10}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white py-3 rounded-lg font-medium transition-colors"
              >
                {isProcessing ? 'Processing...' : `Top Up ₹${topUpAmount}`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};