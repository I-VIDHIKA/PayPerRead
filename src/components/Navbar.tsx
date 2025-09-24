import React from 'react';
import { Wallet, LogOut, User } from 'lucide-react';
import { AuthState } from '../types';

interface NavbarProps {
  authState: AuthState;
  onAuthClick: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ authState, onAuthClick, onLogout }) => {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">PayPerRead</h1>
            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
              BETA
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {authState.isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                    <Wallet className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">
                      ₹{authState.wallet.balance}
                    </span>
                    {authState.wallet.isConnected && (
                      <span className="text-xs text-green-600">
                        • {authState.wallet.ethBalance.toFixed(3)} ETH
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-700">
                      {authState.user?.walletAddress 
                        ? formatAddress(authState.user.walletAddress)
                        : authState.user?.name
                      }
                    </span>
                  </div>

                  <button
                    onClick={onLogout}
                    className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};