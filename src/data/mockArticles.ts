import { Article } from '../types';

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of Blockchain Technology',
    excerpt: 'Exploring how blockchain will reshape industries in the next decade...',
    content: 'Blockchain technology is revolutionizing the way we think about data storage, transactions, and digital trust. From decentralized finance to supply chain management, the applications are endless. This comprehensive analysis explores the current state of blockchain adoption across various industries and predicts future trends that will shape the digital economy. We examine case studies from leading companies, regulatory challenges, and the technical innovations driving this transformation.',
    author: 'Sarah Chen',
    publishedAt: '2024-01-15',
    imageUrl: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg',
    isLocked: true,
    priceInr: 25,
    priceEth: 0.001,
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Free Article: Getting Started with Web3',
    excerpt: 'A beginner\'s guide to understanding Web3 concepts and terminology...',
    content: 'Web3 represents the next evolution of the internet, built on blockchain technology and decentralized principles. This introductory guide covers the fundamental concepts every developer should know, including smart contracts, DApps, and the decentralized web ecosystem. Learn about the key differences between Web2 and Web3, and discover how these technologies are creating new opportunities for innovation.',
    author: 'Mike Johnson',
    publishedAt: '2024-01-14',
    imageUrl: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
    isLocked: false,
    priceInr: 0,
    priceEth: 0,
    category: 'Education'
  },
  {
    id: '3',
    title: 'Advanced DeFi Strategies for 2024',
    excerpt: 'Deep dive into yield farming, liquidity mining, and risk management...',
    content: 'Decentralized Finance (DeFi) has matured significantly, offering sophisticated strategies for experienced investors. This article explores advanced concepts including yield farming protocols, liquidity provision strategies, and risk mitigation techniques. We analyze the most promising DeFi platforms, examine real-world case studies of successful strategies, and provide practical guidance for navigating the complex DeFi landscape while managing risks effectively.',
    author: 'Alex Rodriguez',
    publishedAt: '2024-01-13',
    imageUrl: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg',
    isLocked: true,
    priceInr: 50,
    priceEth: 0.002,
    category: 'Finance'
  },
  {
    id: '4',
    title: 'NFT Market Analysis: Trends and Predictions',
    excerpt: 'Understanding the current state and future of digital collectibles...',
    content: 'The NFT market has experienced dramatic highs and lows, but what does the data really tell us? This comprehensive analysis examines trading volumes, price trends, and emerging use cases beyond digital art. We explore the evolution of NFT utility, from gaming assets to membership tokens, and analyze which projects are building sustainable value in the space.',
    author: 'Emily Wang',
    publishedAt: '2024-01-12',
    imageUrl: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg',
    isLocked: true,
    priceInr: 35,
    priceEth: 0.0015,
    category: 'Markets'
  },
  {
    id: '5',
    title: 'Free Guide: Setting Up Your First Wallet',
    excerpt: 'Step-by-step instructions for creating and securing your crypto wallet...',
    content: 'Setting up your first cryptocurrency wallet can seem daunting, but this step-by-step guide makes it simple. We cover different types of wallets, security best practices, and how to make your first transaction. Whether you choose a hardware wallet, software wallet, or browser extension, this guide ensures you start your crypto journey safely and securely.',
    author: 'David Kim',
    publishedAt: '2024-01-11',
    imageUrl: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg',
    isLocked: false,
    priceInr: 0,
    priceEth: 0,
    category: 'Tutorial'
  },
  {
    id: '6',
    title: 'Institutional Adoption of Cryptocurrency',
    excerpt: 'How major corporations are integrating digital assets...',
    content: 'The landscape of institutional cryptocurrency adoption has changed dramatically over the past few years. Major corporations, banks, and investment funds are now embracing digital assets as part of their financial strategies. This in-depth analysis examines the driving factors behind institutional adoption, regulatory considerations, and the impact on traditional financial markets.',
    author: 'Jennifer Liu',
    publishedAt: '2024-01-10',
    imageUrl: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg',
    isLocked: true,
    priceInr: 40,
    priceEth: 0.0018,
    category: 'Business'
  }
];