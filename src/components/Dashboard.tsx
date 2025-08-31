import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Bot } from 'lucide-react';
import { useTradingContext } from '../context/TradingContext';

export function Dashboard() {
  const { portfolio, marketData } = useTradingContext();

  const portfolioValue = portfolio.reduce((total, holding) => {
    const currentPrice = marketData.find(asset => asset.symbol === holding.symbol)?.price || holding.avgCost;
    return total + (holding.quantity * currentPrice);
  }, 0);

  const totalInvested = portfolio.reduce((total, holding) => total + (holding.quantity * holding.avgCost), 0);
  const totalGainLoss = portfolioValue - totalInvested;
  const gainLossPercentage = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-6 h-6 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">Portfolio Value</h3>
          </div>
          <p className="text-3xl font-bold text-white mb-2">
            ${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className={`text-sm font-medium ${gainLossPercentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {gainLossPercentage >= 0 ? '+' : ''}{gainLossPercentage.toFixed(2)}% today
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Bot className="w-6 h-6 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">Active Strategies</h3>
          </div>
          <p className="text-3xl font-bold text-white mb-2">3</p>
          <p className="text-sm text-green-400 font-medium">2 profitable</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">Win Rate</h3>
          </div>
          <p className="text-3xl font-bold text-white mb-2">73.2%</p>
          <p className="text-sm text-green-400 font-medium">+2.1% this week</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-6">Market Overview</h3>
          <div className="space-y-4">
            {marketData.slice(0, 6).map((asset) => (
              <div key={asset.symbol} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{asset.symbol.slice(0, 2)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{asset.symbol}</p>
                    <p className="text-sm text-gray-400">{asset.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">${asset.price.toFixed(2)}</p>
                  <div className={`flex items-center gap-1 text-sm ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {asset.change >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-6">Portfolio Holdings</h3>
          <div className="space-y-4">
            {portfolio.map((holding) => {
              const currentPrice = marketData.find(asset => asset.symbol === holding.symbol)?.price || holding.avgCost;
              const currentValue = holding.quantity * currentPrice;
              const totalCost = holding.quantity * holding.avgCost;
              const pnl = currentValue - totalCost;
              const pnlPercentage = totalCost > 0 ? (pnl / totalCost) * 100 : 0;

              return (
                <div key={holding.symbol} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{holding.symbol}</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{holding.symbol}</p>
                      <p className="text-sm text-gray-400">{holding.quantity} shares</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">${currentValue.toFixed(2)}</p>
                    <div className={`text-sm ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      <span>{pnl >= 0 ? '+' : ''}${pnl.toFixed(2)} ({pnlPercentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}