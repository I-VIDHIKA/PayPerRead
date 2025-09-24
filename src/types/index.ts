export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  isLocked: boolean;
  priceInr: number;
  priceEth: number;
  category: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  walletAddress?: string;
}

export interface WalletState {
  balance: number; // in INR equivalent
  ethBalance: number;
  isConnected: boolean;
  address?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  wallet: WalletState;
}