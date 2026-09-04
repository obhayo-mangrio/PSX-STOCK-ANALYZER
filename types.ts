export interface FinancialInput {
  ticker: string;
  price: number;
  eps: number;
  bookValue: number;
  revenue: number;
  netProfit: number;
  equity: number;
  totalDebt: number;
  totalAssets: number;
  totalLiabilities: number;
  currentAssets: number;
  currentLiabilities: number;
  inventory: number; // Added for Quick Ratio
  dividendPerShare: number;
  epsGrowthRate: number; // Percentage
}

export interface RatioResult {
  value: number;
  score: number; // 0-100
  label: string;
  formatted: string;
  rating: 'Excellent' | 'Good' | 'Fair' | 'Poor';
}

export interface CategoryScore {
  name: string;
  score: number;
  weight: number;
}

export interface ZScoreComponent {
  label: string;
  formula: string;
  value: number;
  weight: number;
  contribution: number;
  description: string;
}

export interface ZScoreResult {
  score: number;
  zone: 'Safe' | 'Grey' | 'Distress';
  riskLevel: 'Low Risk' | 'Moderate Risk' | 'High Risk';
  statusText: string;
  interpretation: string;
  components: {
    x1: ZScoreComponent; // Working Capital / Total Assets
    x2: ZScoreComponent; // Retained Earnings / Total Assets
    x3: ZScoreComponent; // EBIT / Total Assets
    x4: ZScoreComponent; // Market Cap / Total Liabilities
    x5: ZScoreComponent; // Sales / Total Assets
  };
}

export interface AnalysisResult {
  ratios: {
    pe: RatioResult;
    pb: RatioResult;
    peg: RatioResult;
    roe: RatioResult;
    profitMargin: RatioResult;
    debtToEquity: RatioResult;
    currentRatio: RatioResult;
    quickRatio: RatioResult;
    dividendYield: RatioResult;
  };
  categoryScores: {
    valuation: CategoryScore;
    profitability: CategoryScore;
    growth: CategoryScore;
    health: CategoryScore;
    dividends: CategoryScore;
  };
  totalScore: number;
  classification: string; // Undervalued, Fair, etc.
  outlook: 'Positive' | 'Neutral' | 'Negative';
  zScore: ZScoreResult;
}
