import { useState, useEffect } from 'react';
import { AuthState, User, WalletState } from '../types';

const initialWalletState: WalletState = {
  balance: 0,
  ethBalance: 0,
  isConnected: false,
  address: undefined
};

const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  wallet: initialWalletState
};

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  // Mock MetaMask connection
  const connectMetaMask = async (): Promise<boolean> => {
    try {
      // Simulate MetaMask connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockAddress = '0x742d35Cc6634C0532925a3b8D05A3C7e6638e04E';
      const mockUser: User = {
        id: 'wallet-user',
        email: '',
        name: 'MetaMask User',
        walletAddress: mockAddress
      };

      setAuthState({
        isAuthenticated: true,
        user: mockUser,
        wallet: {
          balance: 150, // Mock INR balance
          ethBalance: 0.05, // Mock ETH balance
          isConnected: true,
          address: mockAddress
        }
      });
      
      return true;
    } catch (error) {
      return false;
    }
  };

  // Mock email/password login
  const loginWithEmail = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (email && password.length >= 6) {
        const mockUser: User = {
          id: 'email-user',
          email,
          name: email.split('@')[0],
        };

        setAuthState({
          isAuthenticated: true,
          user: mockUser,
          wallet: {
            balance: 75, // Mock INR balance
            ethBalance: 0,
            isConnected: false
          }
        });
        
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  // Mock signup
  const signupWithEmail = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (email && password.length >= 6 && name) {
        const mockUser: User = {
          id: 'new-user',
          email,
          name,
        };

        setAuthState({
          isAuthenticated: true,
          user: mockUser,
          wallet: {
            balance: 0, // New users start with 0 balance
            ethBalance: 0,
            isConnected: false
          }
        });
        
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setAuthState(initialAuthState);
  };

  // Mock wallet top-up
  const topUpWallet = async (amountInr: number): Promise<boolean> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAuthState(prev => ({
        ...prev,
        wallet: {
          ...prev.wallet,
          balance: prev.wallet.balance + amountInr
        }
      }));
      
      return true;
    } catch (error) {
      return false;
    }
  };

  // Deduct from wallet
  const deductFromWallet = (amount: number): boolean => {
    if (authState.wallet.balance >= amount) {
      setAuthState(prev => ({
        ...prev,
        wallet: {
          ...prev.wallet,
          balance: prev.wallet.balance - amount
        }
      }));
      return true;
    }
    return false;
  };

  return {
    ...authState,
    connectMetaMask,
    loginWithEmail,
    signupWithEmail,
    logout,
    topUpWallet,
    deductFromWallet
  };
};