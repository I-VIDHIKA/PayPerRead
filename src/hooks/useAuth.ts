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
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const address = accounts[0];

      // Get ETH balance
      const balanceWei = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      });

      // Convert Wei to ETH
      const ethBalance = parseFloat(parseInt(balanceWei, 16) / Math.pow(10, 18));

      const mockUser: User = {
        id: 'wallet-user', 
        email: '',
        name: 'MetaMask User',
        walletAddress:0xbb98E9aD87398BFDd9e950aAaF06AD469C9F58Dd  
      }; 

      setAuthState({
        isAuthenticated: true,
        user: mockUser,
        wallet: {
          balance: 150, // Mock INR balance
          ethBalance: parseFloat(ethBalance.toFixed(6)), // Actual ETH balance
          isConnected: true,
          address: 0xbb98E9aD87398BFDd9e950aAaF06AD469C9F58Dd
        }
      });
      
      return true;
    } catch (error) {
      console.error('MetaMask connection failed:', error);
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
