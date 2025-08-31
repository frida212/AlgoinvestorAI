import React, { createContext, useContext, useState, useEffect } from 'react';

interface Asset {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

interface PortfolioHolding {
  symbol: string;
  quantity: number;
  avgCost: number;
}

interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  pnl: number;
  time: string;
}

interface Strategy {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'paused' | 'stopped';
  performance: number;
  trades: number;
  winRate: number;
}

interface TradingContextType {
  marketData: Asset[];
  portfolio: PortfolioHolding[];
  recentTrades: Trade[];
  strategies: Strategy[];
  toggleStrategy: (id: string) => void;
}

const TradingContext = createContext<TradingContextType | undefined>(undefined);

export function TradingProvider({ children }: { children: React.ReactNode }) {
  const [marketData, setMarketData] = useState<Asset[]>([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 182.52, change: 2.1 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 138.45, change: -0.8 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.85, change: 1.5 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.75, change: -3.2 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 478.23, change: 4.7 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 145.86, change: 0.9 },
    { symbol: 'META', name: 'Meta Platforms', price: 312.94, change: -1.1 },
    { symbol: 'NFLX', name: 'Netflix Inc.', price: 402.15, change: 2.8 }
  ]);

  const [portfolio] = useState<PortfolioHolding[]>([
    { symbol: 'AAPL', quantity: 50, avgCost: 175.25 },
    { symbol: 'GOOGL', quantity: 25, avgCost: 142.80 },
    { symbol: 'MSFT', quantity: 30, avgCost: 365.90 },
    { symbol: 'TSLA', quantity: 15, avgCost: 275.45 },
    { symbol: 'NVDA', quantity: 20, avgCost: 425.60 }
  ]);

  const [recentTrades] = useState<Trade[]>([
    {
      id: '1',
      symbol: 'AAPL',
      type: 'buy',
      quantity: 10,
      price: 182.52,
      pnl: 73.20,
      time: '2 min ago'
    },
    {
      id: '2',
      symbol: 'NVDA',
      type: 'sell',
      quantity: 5,
      price: 478.23,
      pnl: 263.15,
      time: '15 min ago'
    },
    {
      id: '3',
      symbol: 'TSLA',
      type: 'sell',
      quantity: 8,
      price: 248.75,
      pnl: -213.60,
      time: '1 hour ago'
    },
    {
      id: '4',
      symbol: 'MSFT',
      type: 'buy',
      quantity: 12,
      price: 378.85,
      pnl: 154.80,
      time: '2 hours ago'
    }
  ]);

  const [strategies, setStrategies] = useState<Strategy[]>([
    {
      id: '1',
      name: 'Momentum Trader',
      type: 'Technical Analysis',
      status: 'active',
      performance: 24.7,
      trades: 89,
      winRate: 78.5
    },
    {
      id: '2',
      name: 'Mean Reversion',
      type: 'Statistical Arbitrage',
      status: 'active',
      performance: 18.3,
      trades: 156,
      winRate: 65.4
    },
    {
      id: '3',
      name: 'Sentiment Analysis',
      type: 'AI/ML Strategy',
      status: 'paused',
      performance: 31.2,
      trades: 67,
      winRate: 82.1
    },
    {
      id: '4',
      name: 'Pairs Trading',
      type: 'Market Neutral',
      status: 'active',
      performance: 12.9,
      trades: 234,
      winRate: 71.8
    }
  ]);

  const toggleStrategy = (id: string) => {
    setStrategies(prev => prev.map(strategy => 
      strategy.id === id 
        ? { ...strategy, status: strategy.status === 'active' ? 'paused' : 'active' }
        : strategy
    ));
  };

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => prev.map(asset => ({
        ...asset,
        price: asset.price * (1 + (Math.random() - 0.5) * 0.02),
        change: asset.change + (Math.random() - 0.5) * 0.5
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TradingContext.Provider value={{
      marketData,
      portfolio,
      recentTrades,
      strategies,
      toggleStrategy
    }}>
      {children}
    </TradingContext.Provider>
  );
}

export function useTradingContext() {
  const context = useContext(TradingContext);
  if (context === undefined) {
    throw new Error('useTradingContext must be used within a TradingProvider');
  }
  return context;
}