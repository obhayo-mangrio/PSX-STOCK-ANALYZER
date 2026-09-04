import React, { useState } from 'react';
import InputForm from './components/InputForm';
import Dashboard from './components/Dashboard';
import { FinancialInput, AnalysisResult } from './types';
import { analyzeStock } from './services/analysisService';
import { LayoutDashboard } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'input' | 'dashboard'>('input');
  const [financialData, setFinancialData] = useState<FinancialInput | null>(null);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null);

  const handleAnalyze = (data: FinancialInput) => {
    const results = analyzeStock(data);
    setFinancialData(data);
    setAnalysisResults(results);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setCurrentView('input');
    setAnalysisResults(null);
  };

  const populateDemoData = () => {
    // Example Data: Lucky Cement (Approximate Historical Data for Demo)
    const demoData: FinancialInput = {
      ticker: "LUCK.PSX",
      price: 850.50,
      eps: 145.20,
      bookValue: 600.00,
      revenue: 350000000000,
      netProfit: 55000000000,
      equity: 200000000000,
      totalDebt: 30000000000,
      totalAssets: 450000000000,
      totalLiabilities: 150000000000,
      currentAssets: 120000000000,
      currentLiabilities: 80000000000,
      inventory: 30000000000,
      dividendPerShare: 50.00,
      epsGrowthRate: 12.5
    };
    // We pass this to a handler in InputForm ideally, but for simplicity we can trigger analysis directly or populate a state passed down.
    // For this architecture, let's just analyze immediately for the demo experience.
    handleAnalyze(demoData);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
               <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">PSX Analyzer</h1>
              <p className="text-xs text-gray-500">Fundamental Investment Tool</p>
            </div>
          </div>
          {currentView === 'dashboard' && (
             <div className="hidden md:block text-sm text-gray-500">
               {financialData?.ticker}
             </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'input' ? (
          <div className="max-w-3xl mx-auto">
             <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Analyze Any PSX Stock</h2>
                <p className="text-gray-600">Enter financial report data to get an instant professional-grade fundamental scorecard.</p>
             </div>
             <InputForm onAnalyze={handleAnalyze} onPopulateDemo={populateDemoData} />
          </div>
        ) : (
          financialData && analysisResults && (
            <Dashboard 
              inputData={financialData} 
              results={analysisResults} 
              onReset={handleReset} 
            />
          )
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12 py-8 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} PSX Fundamental Analyzer. For educational purposes only. Not investment advice.</p>
      </footer>
    </div>
  );
};

export default App;
