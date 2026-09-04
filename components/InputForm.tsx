import React, { useState, useRef, useEffect } from 'react';
import { FinancialInput } from '../types';
import { Upload, FileText, Play, Search, Loader2, ExternalLink, AlertCircle, Building2, CheckCircle2, X, Sparkles } from 'lucide-react';
import { fetchCompanyData } from '../services/geminiService';
import { companies, findCompany, CompanyProfile } from '../data/companies';

interface InputFormProps {
  onAnalyze: (data: FinancialInput) => void;
  onPopulateDemo: () => void;
}

const QUICK_COMPANIES = ["LUCK", "OGDC", "ENGRO", "MEBL", "HUBC", "SYS", "FFC", "MARI", "PSO"];

const InputForm: React.FC<InputFormProps> = ({ onAnalyze, onPopulateDemo }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedSources, setFetchedSources] = useState<{ title: string; uri: string }[]>([]);
  const [selectedCompanyInfo, setSelectedCompanyInfo] = useState<{ name: string; ticker: string; sector?: string } | null>(null);
  const [statusNotification, setStatusNotification] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FinancialInput>({
    ticker: '',
    price: 0,
    eps: 0,
    bookValue: 0,
    revenue: 0,
    netProfit: 0,
    equity: 0,
    totalDebt: 0,
    totalAssets: 0,
    totalLiabilities: 0,
    currentAssets: 0,
    currentLiabilities: 0,
    inventory: 0,
    dividendPerShare: 0,
    epsGrowthRate: 0,
  });

  // Filter companies based on search query
  const filteredCompanies = companies.filter(c => {
    if (!searchQuery.trim()) return false;
    const query = searchQuery.toLowerCase().trim();
    return (
      c.ticker.toLowerCase().includes(query) ||
      c.name.toLowerCase().includes(query) ||
      (c.sector && c.sector.toLowerCase().includes(query))
    );
  }).slice(0, 8);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectCompany = (company: CompanyProfile, triggerAiFetch = false) => {
    const tickerWithPsx = `${company.ticker}.PSX`;
    setSearchQuery(`${company.ticker} - ${company.name}`);
    setShowDropdown(false);
    setSelectedCompanyInfo({
      name: company.name,
      ticker: company.ticker,
      sector: company.sector
    });
    setErrors({});

    if (company.financials) {
      setFormData({
        ticker: tickerWithPsx,
        ...company.financials
      });
      setStatusNotification({
        type: 'success',
        message: `Loaded financial dataset for ${company.name} (${company.ticker})`
      });
    } else {
      setFormData(prev => ({
        ...prev,
        ticker: tickerWithPsx
      }));
    }

    if (triggerAiFetch) {
      performFetch(company.ticker);
    }
  };

  const performFetch = async (query: string) => {
    if (!query || !query.trim()) {
      setErrors(prev => ({ ...prev, ticker: "Please enter a company name or ticker." }));
      return;
    }
    
    setIsFetching(true);
    setFetchedSources([]);
    setErrors({});
    setStatusNotification({
      type: 'info',
      message: `Fetching latest financial metrics for ${query}...`
    });

    try {
      // First check local company database for quick fill
      const matched = findCompany(query);
      if (matched) {
        setSelectedCompanyInfo({
          name: matched.name,
          ticker: matched.ticker,
          sector: matched.sector
        });
        if (matched.financials) {
          setFormData({
            ticker: `${matched.ticker}.PSX`,
            ...matched.financials
          });
        }
      }

      const result = await fetchCompanyData(query);
      if (result && result.data) {
        const resolvedTicker = result.ticker ? `${result.ticker}.PSX` : (matched ? `${matched.ticker}.PSX` : query.toUpperCase());
        setFormData(prev => ({
          ...prev,
          ...result.data,
          ticker: resolvedTicker
        }));
        setFetchedSources(result.sources || []);
        setStatusNotification({
          type: 'success',
          message: `Successfully updated financial data for ${result.companyName || matched?.name || query}`
        });
      } else if (matched?.financials) {
        setStatusNotification({
          type: 'success',
          message: `Loaded reference financials for ${matched.name} (${matched.ticker})`
        });
      } else {
        setStatusNotification({
          type: 'error',
          message: `Could not auto-fetch data for "${query}". You can enter the metrics manually.`
        });
      }
    } catch (e) {
      console.error(e);
      setStatusNotification({
        type: 'error',
        message: `Could not complete auto-fetch. Please verify the numbers below.`
      });
    } finally {
      setIsFetching(false);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    setShowDropdown(true);

    // Update ticker in formData as user types
    setFormData(prev => ({
      ...prev,
      ticker: val
    }));

    if (errors.ticker) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.ticker;
        return next;
      });
    }

    // Auto-match exact ticker or company name
    const exact = findCompany(val);
    if (exact && val.trim().length >= 3 && val.toUpperCase() === exact.ticker) {
      selectCompany(exact, false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const matched = findCompany(searchQuery);
    if (matched) {
      selectCompany(matched, true);
    } else {
      performFetch(searchQuery);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = name === 'ticker' ? value : parseFloat(value) || 0;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue,
    }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.ticker.trim()) newErrors.ticker = "Ticker or company name is required.";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0.";
    if (formData.revenue < 0) newErrors.revenue = "Revenue cannot be negative.";
    if (formData.totalAssets <= 0) newErrors.totalAssets = "Total Assets must be greater than 0.";
    if (formData.totalLiabilities < 0) newErrors.totalLiabilities = "Liabilities cannot be negative.";
    if (formData.equity === 0) newErrors.equity = "Total Equity is required.";
    if (formData.currentAssets < 0) newErrors.currentAssets = "Current Assets cannot be negative.";
    if (formData.currentLiabilities < 0) newErrors.currentLiabilities = "Current Liabilities cannot be negative.";
    if (formData.inventory < 0) newErrors.inventory = "Inventory cannot be negative.";
    if (formData.dividendPerShare < 0) newErrors.dividendPerShare = "Dividend cannot be negative.";
    if (formData.totalDebt < 0) newErrors.totalDebt = "Debt cannot be negative.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAnalyze(formData);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      alert("CSV Upload is a placeholder. Please select a company from the list, use Search, or enter values manually.");
    };
    reader.readAsText(file);
  };

  const renderInput = (label: string, name: keyof FinancialInput, placeholder = "0.00", type = "number", step = "0.01") => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">{label}</label>
      <div className="relative">
        <input 
          type={type} 
          name={name} 
          value={formData[name] === 0 && name !== 'totalDebt' && name !== 'dividendPerShare' ? '' : formData[name]} 
          onChange={handleChange} 
          className={`w-full px-3.5 py-2.5 bg-gray-50/50 border rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none
            ${errors[name] ? 'border-red-500 bg-red-50 pr-10' : 'border-gray-200 hover:border-gray-300'}`}
          placeholder={placeholder} 
          step={step}
        />
        {errors[name] && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
        )}
      </div>
      {errors[name] && <p className="text-red-500 text-xs mt-1 font-medium">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            Company & Financial Input
          </h2>
          <p className="text-xs text-gray-500 mt-1">Search any PSX company name or ticker to auto-fill financial metrics instantly.</p>
        </div>
        <button 
          type="button"
          onClick={() => {
            const luck = companies.find(c => c.ticker === 'LUCK');
            if (luck) selectCompany(luck, false);
            else onPopulateDemo();
          }}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Load Demo (Lucky Cement)
        </button>
      </div>

      {/* Quick Select Chips */}
      <div className="mb-6">
        <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Popular PSX Companies (Instant 1-Click Load)
        </span>
        <div className="flex flex-wrap gap-2">
          {QUICK_COMPANIES.map(ticker => {
            const comp = companies.find(c => c.ticker === ticker);
            if (!comp) return null;
            const isSelected = selectedCompanyInfo?.ticker === ticker;
            return (
              <button
                key={ticker}
                type="button"
                onClick={() => selectCompany(comp, false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  isSelected 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200'
                }`}
              >
                <span className="font-bold">{comp.ticker}</span> - {comp.name.replace(/ Limited| Corporation/gi, '')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Company Name / Ticker Search Section */}
      <div className="mb-6 relative" ref={dropdownRef}>
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
          Select or Search Company Name / PSX Ticker
        </label>
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Building2 className="w-4 h-4" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={handleSearchInputChange}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearchSubmit(e);
                }
              }}
              className={`w-full pl-10 pr-10 py-3 bg-gray-50/70 border rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none
                ${errors.ticker ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}
              placeholder="Type company name (e.g. Lucky Cement, Meezan Bank, Engro) or Ticker (LUCK, OGDC)" 
              autoComplete="off"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCompanyInfo(null);
                  setFormData(prev => ({ ...prev, ticker: '' }));
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button 
            type="button"
            onClick={handleSearchSubmit}
            disabled={isFetching || !searchQuery.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            title="Auto-fetch latest live data via AI search"
          >
            {isFetching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>{isFetching ? 'Fetching...' : 'Search & Fetch'}</span>
          </button>
        </div>

        {errors.ticker && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.ticker}</p>}

        {/* Dropdown Suggestions */}
        {showDropdown && filteredCompanies.length > 0 && (
          <div className="absolute z-30 left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden max-h-64 overflow-y-auto">
            <div className="p-2 bg-gray-50 border-b border-gray-100 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              Matching PSX Listed Companies
            </div>
            {filteredCompanies.map(company => (
              <button
                key={company.ticker}
                type="button"
                onClick={() => selectCompany(company, false)}
                className="w-full px-4 py-2.5 text-left hover:bg-indigo-50/70 border-b border-gray-50 last:border-0 flex items-center justify-between group transition-colors"
              >
                <div>
                  <span className="font-bold text-indigo-600 group-hover:text-indigo-700 text-sm">
                    {company.ticker}
                  </span>
                  <span className="text-gray-900 text-sm ml-2 font-medium">
                    {company.name}
                  </span>
                </div>
                {company.sector && (
                  <span className="text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-normal">
                    {company.sector}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Selected Company Badge / Status Notification */}
        {selectedCompanyInfo && (
          <div className="mt-3 flex items-center justify-between bg-indigo-50/80 border border-indigo-100 rounded-xl px-4 py-2.5 text-xs text-indigo-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <div>
                <span className="font-bold">{selectedCompanyInfo.name}</span>
                <span className="ml-1.5 px-2 py-0.5 bg-indigo-200/60 rounded text-[11px] font-mono font-semibold text-indigo-800">
                  {selectedCompanyInfo.ticker}.PSX
                </span>
                {selectedCompanyInfo.sector && (
                  <span className="ml-2 text-indigo-600 font-medium">
                    • {selectedCompanyInfo.sector}
                  </span>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => performFetch(selectedCompanyInfo.ticker)}
              disabled={isFetching}
              className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 underline flex items-center gap-1 ml-2"
            >
              {isFetching ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
              Live AI Refresh
            </button>
          </div>
        )}

        {statusNotification && (
          <div className={`mt-2 text-xs px-3 py-1.5 rounded-lg ${
            statusNotification.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' :
            statusNotification.type === 'error' ? 'bg-rose-50 text-rose-800 border border-rose-100' :
            'bg-blue-50 text-blue-800 border border-blue-100'
          }`}>
            {statusNotification.message}
          </div>
        )}

        {fetchedSources.length > 0 && (
          <div className="mt-2 text-[11px] text-gray-500">
            <span className="font-semibold block mb-1">Sources verified:</span>
            <div className="flex flex-wrap gap-2">
              {fetchedSources.slice(0, 3).map((source, idx) => (
                <a 
                  key={idx} 
                  href={source.uri} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1 text-indigo-600 hover:underline truncate max-w-[200px]"
                >
                  {source.title} <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Core Stock Price & Valuation Metrics */}
        <div className="bg-gray-50/40 p-4 rounded-xl border border-gray-100">
          <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
            Market Price & Earnings
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderInput("Current Market Price (PKR)", "price", "e.g. 850.50")}
            {renderInput("Earnings Per Share - EPS TTM (PKR)", "eps", "e.g. 145.20")}
            {renderInput("Book Value Per Share (PKR)", "bookValue", "e.g. 600.00")}
          </div>
        </div>

        {/* Profitability & Growth */}
        <div className="bg-gray-50/40 p-4 rounded-xl border border-gray-100">
          <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
            Profitability, Dividends & Growth
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {renderInput("Annual Revenue (PKR)", "revenue", "e.g. 350000000000")}
            {renderInput("Annual Net Profit (PKR)", "netProfit", "e.g. 55000000000")}
            {renderInput("EPS Growth % (3-5yr CAGR)", "epsGrowthRate", "e.g. 12.5", "number", "0.1")}
            {renderInput("Dividend Per Share (PKR)", "dividendPerShare", "e.g. 50.00")}
          </div>
        </div>

        {/* Balance Sheet & Financial Health */}
        <div className="bg-gray-50/40 p-4 rounded-xl border border-gray-100">
          <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
            Balance Sheet & Solvency (PKR)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {renderInput("Total Assets", "totalAssets", "e.g. 450000000000")}
            {renderInput("Total Liabilities", "totalLiabilities", "e.g. 150000000000")}
            {renderInput("Total Shareholder Equity", "equity", "e.g. 200000000000")}
            {renderInput("Total Debt (Long & Short)", "totalDebt", "e.g. 30000000000")}
            {renderInput("Current Assets", "currentAssets", "e.g. 120000000000")}
            {renderInput("Current Liabilities", "currentLiabilities", "e.g. 80000000000")}
            {renderInput("Inventory (Stock-in-trade)", "inventory", "e.g. 30000000000")}
          </div>
        </div>
        
        {/* Actions bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative">
            <input type="file" id="csvInput" className="hidden" onChange={handleFileUpload} accept=".csv" />
            <label htmlFor="csvInput" className="cursor-pointer inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 text-xs font-semibold py-2 px-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <Upload className="w-4 h-4" />
              Upload Financial CSV
            </label>
          </div>

          <button 
            type="submit"
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-8 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-indigo-200 hover:-translate-y-0.5"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Generate Fundamental Analysis</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
