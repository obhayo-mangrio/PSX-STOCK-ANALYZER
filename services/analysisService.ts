import { FinancialInput, AnalysisResult, RatioResult, CategoryScore, ZScoreResult } from '../types';

const calculateScore = (value: number, thresholds: number[], scores: number[], type: 'ascending' | 'descending' | 'range'): number => {
  if (type === 'ascending') {
    // Higher is better (e.g., ROE)
    for (let i = 0; i < thresholds.length; i++) {
      if (value >= thresholds[i]) return scores[i];
    }
    return scores[scores.length - 1];
  } else if (type === 'descending') {
    // Lower is better (e.g., P/E)
    for (let i = 0; i < thresholds.length; i++) {
      if (value <= thresholds[i]) return scores[i];
    }
    return scores[scores.length - 1];
  }
  return 50;
};

const getRating = (score: number): 'Excellent' | 'Good' | 'Fair' | 'Poor' => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Poor';
};

export const calculateAltmanZScore = (data: FinancialInput): ZScoreResult => {
  const assets = data.totalAssets || 1;
  const liabilities = data.totalLiabilities || (data.totalAssets - data.equity) || 1;
  const equity = data.equity || 1;
  const currentAssets = data.currentAssets || 0;
  const currentLiabilities = data.currentLiabilities || 1;
  const revenue = data.revenue || 0;
  const netProfit = data.netProfit || 0;
  const price = data.price || 0;
  const bookValue = data.bookValue || (equity / (data.eps ? (netProfit / data.eps) : 1)) || 1;

  // Market capitalization estimate
  const marketCap = bookValue > 0 ? (price / bookValue) * equity : price * (data.eps > 0 ? netProfit / data.eps : 1);

  // 1. X1: Working Capital / Total Assets (Liquidity)
  const workingCapital = currentAssets - currentLiabilities;
  const x1Val = workingCapital / assets;
  const x1Weight = 1.2;
  const x1Contribution = x1Val * x1Weight;

  // 2. X2: Retained Earnings / Total Assets (Cumulative profitability)
  // Using equity / assets as a standardized balance sheet metric
  const x2Val = equity / assets;
  const x2Weight = 1.4;
  const x2Contribution = x2Val * x2Weight;

  // 3. X3: Operating Profit (EBIT) / Total Assets (Productivity)
  // Approximated from net profit
  const x3Val = netProfit / assets;
  const x3Weight = 3.3;
  const x3Contribution = x3Val * x3Weight;

  // 4. X4: Market Value of Equity / Total Liabilities (Solvency)
  const x4Val = marketCap / liabilities;
  const x4Weight = 0.6;
  const x4Contribution = x4Val * x4Weight;

  // 5. X5: Sales / Total Assets (Asset Turnover)
  const x5Val = revenue / assets;
  const x5Weight = 0.999;
  const x5Contribution = x5Val * x5Weight;

  const rawZScore = x1Contribution + x2Contribution + x3Contribution + x4Contribution + x5Contribution;
  const finalZScore = Number(rawZScore.toFixed(2));

  let zone: 'Safe' | 'Grey' | 'Distress' = 'Grey';
  let riskLevel: 'Low Risk' | 'Moderate Risk' | 'High Risk' = 'Moderate Risk';
  let statusText = 'Grey Zone (Caution)';
  let interpretation = 'The company exhibits moderate financial stability. Continued monitoring of working capital and debt leverage is recommended.';

  if (finalZScore >= 2.99) {
    zone = 'Safe';
    riskLevel = 'Low Risk';
    statusText = 'Safe Zone (Low Risk)';
    interpretation = 'Strong financial health with minimal risk of bankruptcy within the next 24 months. Robust liquidity, equity cushion, and asset turnover.';
  } else if (finalZScore < 1.81) {
    zone = 'Distress';
    riskLevel = 'High Risk';
    statusText = 'Distress Zone (High Risk)';
    interpretation = 'High probability of financial distress within 2 years. Negative or low working capital, heavy debt burden, or insufficient asset returns.';
  }

  return {
    score: finalZScore,
    zone,
    riskLevel,
    statusText,
    interpretation,
    components: {
      x1: {
        label: 'Working Capital / Total Assets',
        formula: '(Current Assets - Current Liabilities) / Total Assets',
        value: Number(x1Val.toFixed(3)),
        weight: x1Weight,
        contribution: Number(x1Contribution.toFixed(2)),
        description: 'Short-term balance sheet liquidity'
      },
      x2: {
        label: 'Retained Earnings / Total Assets',
        formula: 'Total Equity / Total Assets',
        value: Number(x2Val.toFixed(3)),
        weight: x2Weight,
        contribution: Number(x2Contribution.toFixed(2)),
        description: 'Cumulative profitability and retained equity'
      },
      x3: {
        label: 'EBIT / Total Assets',
        formula: 'Net Operating Earnings / Total Assets',
        value: Number(x3Val.toFixed(3)),
        weight: x3Weight,
        contribution: Number(x3Contribution.toFixed(2)),
        description: 'Productivity of assets before tax & leverage'
      },
      x4: {
        label: 'Market Cap / Total Liabilities',
        formula: 'Market Value of Equity / Total Liabilities',
        value: Number(x4Val.toFixed(3)),
        weight: x4Weight,
        contribution: Number(x4Contribution.toFixed(2)),
        description: 'Solvency cushion against asset decline'
      },
      x5: {
        label: 'Sales / Total Assets',
        formula: 'Revenue / Total Assets',
        value: Number(x5Val.toFixed(3)),
        weight: x5Weight,
        contribution: Number(x5Contribution.toFixed(2)),
        description: 'Asset efficiency in generating revenue'
      }
    }
  };
};

export const analyzeStock = (data: FinancialInput): AnalysisResult => {
  // 1. Calculate Ratios
  const peValue = data.price / (data.eps || 0.001); // Avoid div by zero
  const pbValue = data.price / (data.bookValue || 0.001);
  const pegValue = peValue / (data.epsGrowthRate || 0.001);
  const roeValue = (data.netProfit / (data.equity || 0.001)) * 100;
  const profitMarginValue = (data.netProfit / (data.revenue || 0.001)) * 100;
  const debtToEquityValue = data.totalDebt / (data.equity || 0.001);
  const currentRatioValue = data.currentAssets / (data.currentLiabilities || 0.001);
  const quickRatioValue = (data.currentAssets - (data.inventory || 0)) / (data.currentLiabilities || 0.001);
  const dividendYieldValue = (data.dividendPerShare / (data.price || 0.001)) * 100;

  // 2. Score Ratios (0-100)
  
  // Valuation
  const peScore = calculateScore(peValue, [8, 15, 25], [100, 75, 50, 25], 'descending');
  const pbScore = calculateScore(pbValue, [1.0, 1.5, 3.0], [100, 75, 50, 25], 'descending');
  const pegScore = calculateScore(pegValue, [1, 1.5, 2], [100, 75, 50, 25], 'descending'); // PEG < 1 is great

  // Profitability
  const roeScore = calculateScore(roeValue, [20, 15, 10], [100, 75, 50, 25], 'ascending');
  const marginScore = calculateScore(profitMarginValue, [20, 10, 5], [100, 75, 50, 25], 'ascending');

  // Health
  const deScore = calculateScore(debtToEquityValue, [0.5, 1.0, 2.0], [100, 75, 50, 0], 'descending');
  const currentScore = calculateScore(currentRatioValue, [2.0, 1.5, 1.0], [100, 75, 50, 25], 'ascending'); // Typically 1.5-2 is good, <1 bad
  const quickScore = calculateScore(quickRatioValue, [1.0, 0.8, 0.5], [100, 75, 50, 25], 'ascending');

  // Dividends
  const divScore = calculateScore(dividendYieldValue, [10, 5, 2], [100, 75, 50, 25], 'ascending');

  // Growth (using PEG score as part of growth, or EPS growth raw score)
  // Let's score EPS Growth raw: > 20%, 15%, 10%
  const growthScoreRaw = calculateScore(data.epsGrowthRate, [20, 15, 5], [100, 75, 50, 25], 'ascending');

  // 3. Category Aggregation
  const valuationScore = (peScore * 0.4) + (pbScore * 0.4) + (pegScore * 0.2);
  const profitabilityScore = (roeScore * 0.6) + (marginScore * 0.4);
  const growthScore = growthScoreRaw; // Or combine with Revenue growth if we had it
  const healthScore = (deScore * 0.4) + (currentScore * 0.3) + (quickScore * 0.3);
  const dividendScore = divScore;

  // 4. Final Weighted Score
  // Valuation: 30%, Profitability: 25%, Growth: 20%, Health: 15%, Dividends: 10%
  const totalScore = (
    (valuationScore * 0.30) +
    (profitabilityScore * 0.25) +
    (growthScore * 0.20) +
    (healthScore * 0.15) +
    (dividendScore * 0.10)
  );

  // 5. Classification
  let classification = "High Risk / Value Trap";
  if (totalScore >= 80) classification = "Strongly Undervalued";
  else if (totalScore >= 60) classification = "Fair Value";
  else if (totalScore >= 40) classification = "Weak Fundamentals";

  // 6. Outlook
  let outlook: 'Positive' | 'Neutral' | 'Negative' = 'Neutral';
  if (totalScore >= 65 && data.epsGrowthRate > 0) outlook = 'Positive';
  else if (totalScore < 45 || data.epsGrowthRate < 0) outlook = 'Negative';

  const zScore = calculateAltmanZScore(data);

  return {
    ratios: {
      pe: { value: peValue, score: peScore, formatted: peValue.toFixed(2), label: "P/E Ratio", rating: getRating(peScore) },
      pb: { value: pbValue, score: pbScore, formatted: pbValue.toFixed(2), label: "P/B Ratio", rating: getRating(pbScore) },
      peg: { value: pegValue, score: pegScore, formatted: pegValue.toFixed(2), label: "PEG Ratio", rating: getRating(pegScore) },
      roe: { value: roeValue, score: roeScore, formatted: roeValue.toFixed(2) + "%", label: "ROE", rating: getRating(roeScore) },
      profitMargin: { value: profitMarginValue, score: marginScore, formatted: profitMarginValue.toFixed(2) + "%", label: "Net Margin", rating: getRating(marginScore) },
      debtToEquity: { value: debtToEquityValue, score: deScore, formatted: debtToEquityValue.toFixed(2), label: "Debt/Equity", rating: getRating(deScore) },
      currentRatio: { value: currentRatioValue, score: currentScore, formatted: currentRatioValue.toFixed(2), label: "Current Ratio", rating: getRating(currentScore) },
      quickRatio: { value: quickRatioValue, score: quickScore, formatted: quickRatioValue.toFixed(2), label: "Quick Ratio", rating: getRating(quickScore) },
      dividendYield: { value: dividendYieldValue, score: divScore, formatted: dividendYieldValue.toFixed(2) + "%", label: "Div Yield", rating: getRating(divScore) },
    },
    categoryScores: {
      valuation: { name: 'Valuation', score: valuationScore, weight: 0.30 },
      profitability: { name: 'Profitability', score: profitabilityScore, weight: 0.25 },
      growth: { name: 'Growth', score: growthScore, weight: 0.20 },
      health: { name: 'Health', score: healthScore, weight: 0.15 },
      dividends: { name: 'Dividends', score: dividendScore, weight: 0.10 },
    },
    totalScore: Math.round(totalScore),
    classification,
    outlook,
    zScore
  };
};
