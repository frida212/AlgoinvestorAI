import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { StrategyBuilder } from './components/StrategyBuilder';
import { TradingProvider } from './context/TradingContext';

export type NavigationTab = 'dashboard' | 'strategy-builder';

function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('strategy-builder');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'strategy-builder':
        return <StrategyBuilder />;
      default:
        return <StrategyBuilder />;
    }
  };

  return (
    <TradingProvider>
      <div className="min-h-screen bg-gray-900">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="container mx-auto px-6 py-8">
          {renderContent()}
        </main>
      </div>
    </TradingProvider>
  );
}

export default App;