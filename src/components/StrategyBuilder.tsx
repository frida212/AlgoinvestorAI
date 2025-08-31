import React, { useState } from 'react';
import { Bot } from 'lucide-react';

export function StrategyBuilder() {
  const [formData, setFormData] = useState({
    asset: 'Bitcoin (BTC)',
    riskLevel: 'Medium',
    initialInvestment: '10000',
    strategy: 'A simple trend-following strategy using moving averages on daily charts.'
  });

  const [aiPlan, setAiPlan] = useState({
    entryCondition: 'Daily 20-period Simple Moving Average (SMA) crosses above 50-period SMA',
    exitCondition: 'Daily 20-period SMA crosses below 50-period SMA',
    stopLoss: '7%',
    takeProfit: '12%'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateAIPlan = () => {
    // Simulate AI generation with different plans based on inputs
    const plans = [
      {
        entryCondition: 'RSI below 30 and price above 200-day moving average',
        exitCondition: 'RSI above 70 or price breaks below 200-day MA',
        stopLoss: '5%',
        takeProfit: '15%'
      },
      {
        entryCondition: 'MACD line crosses above signal line with volume confirmation',
        exitCondition: 'MACD line crosses below signal line',
        stopLoss: '8%',
        takeProfit: '10%'
      },
      {
        entryCondition: 'Daily 20-period Simple Moving Average (SMA) crosses above 50-period SMA',
        exitCondition: 'Daily 20-period SMA crosses below 50-period SMA',
        stopLoss: '7%',
        takeProfit: '12%'
      }
    ];
    
    const randomPlan = plans[Math.floor(Math.random() * plans.length)];
    setAiPlan(randomPlan);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Configure Your Bot */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-6">Configure Your Bot</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Asset
            </label>
            <select
              value={formData.asset}
              onChange={(e) => handleInputChange('asset', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            >
              <option value="Bitcoin (BTC)">Bitcoin (BTC)</option>
              <option value="Ethereum (ETH)">Ethereum (ETH)</option>
              <option value="Apple (AAPL)">Apple (AAPL)</option>
              <option value="Tesla (TSLA)">Tesla (TSLA)</option>
              <option value="NVIDIA (NVDA)">NVIDIA (NVDA)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Risk Level
            </label>
            <select
              value={formData.riskLevel}
              onChange={(e) => handleInputChange('riskLevel', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Initial Investment
            </label>
            <input
              type="number"
              value={formData.initialInvestment}
              onChange={(e) => handleInputChange('initialInvestment', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Describe Your Strategy
            </label>
            <textarea
              value={formData.strategy}
              onChange={(e) => handleInputChange('strategy', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none"
              placeholder="Describe your trading strategy..."
            />
          </div>

          <button
            onClick={generateAIPlan}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Bot className="w-5 h-5" />
            Generate with AI
          </button>
        </div>
      </div>

      {/* AI Generated Plan */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-6">AI Generated Plan</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-cyan-400 mb-3">Entry Condition</h3>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-300 text-sm font-mono leading-relaxed">
                {aiPlan.entryCondition}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-cyan-400 mb-3">Exit Condition</h3>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-300 text-sm font-mono leading-relaxed">
                {aiPlan.exitCondition}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-red-400 mb-3">Stop Loss</h3>
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-red-300 text-lg font-bold">{aiPlan.stopLoss}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-green-400 mb-3">Take Profit</h3>
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-green-300 text-lg font-bold">{aiPlan.takeProfit}</p>
              </div>
            </div>
          </div>

          <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
            Activate & Run Simulation
          </button>
        </div>
      </div>
    </div>
  );
}