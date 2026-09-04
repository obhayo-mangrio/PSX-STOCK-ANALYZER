export interface CompanyProfile {
  ticker: string;
  name: string;
  sector?: string;
  financials?: {
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
    inventory: number;
    dividendPerShare: number;
    epsGrowthRate: number;
  };
}

export const companies: CompanyProfile[] = [
  {
    ticker: "LUCK",
    name: "Lucky Cement Limited",
    sector: "Cement",
    financials: {
      price: 920.50,
      eps: 152.40,
      bookValue: 620.00,
      revenue: 380000000000,
      netProfit: 59000000000,
      equity: 215000000000,
      totalDebt: 28000000000,
      totalAssets: 470000000000,
      totalLiabilities: 155000000000,
      currentAssets: 130000000000,
      currentLiabilities: 85000000000,
      inventory: 32000000000,
      dividendPerShare: 55.00,
      epsGrowthRate: 14.2
    }
  },
  {
    ticker: "OGDC",
    name: "Oil & Gas Development Company Limited",
    sector: "Oil & Gas Exploration",
    financials: {
      price: 158.20,
      eps: 48.60,
      bookValue: 245.00,
      revenue: 460000000000,
      netProfit: 208000000000,
      equity: 1050000000000,
      totalDebt: 0,
      totalAssets: 1380000000000,
      totalLiabilities: 330000000000,
      currentAssets: 550000000000,
      currentLiabilities: 180000000000,
      inventory: 35000000000,
      dividendPerShare: 16.50,
      epsGrowthRate: 8.5
    }
  },
  {
    ticker: "ENGRO",
    name: "Engro Corporation Limited",
    sector: "Fertilizer / Conglomerate",
    financials: {
      price: 335.00,
      eps: 42.10,
      bookValue: 290.00,
      revenue: 490000000000,
      netProfit: 36000000000,
      equity: 250000000000,
      totalDebt: 110000000000,
      totalAssets: 680000000000,
      totalLiabilities: 430000000000,
      currentAssets: 210000000000,
      currentLiabilities: 190000000000,
      inventory: 45000000000,
      dividendPerShare: 32.00,
      epsGrowthRate: 11.0
    }
  },
  {
    ticker: "MEBL",
    name: "Meezan Bank Limited",
    sector: "Commercial Banks (Islamic)",
    financials: {
      price: 240.00,
      eps: 48.20,
      bookValue: 125.00,
      revenue: 430000000000,
      netProfit: 86000000000,
      equity: 225000000000,
      totalDebt: 80000000000,
      totalAssets: 3100000000000,
      totalLiabilities: 2875000000000,
      currentAssets: 1200000000000,
      currentLiabilities: 1100000000000,
      inventory: 0,
      dividendPerShare: 28.00,
      epsGrowthRate: 26.5
    }
  },
  {
    ticker: "HUBC",
    name: "The Hub Power Company Limited",
    sector: "Power Generation & Distribution",
    financials: {
      price: 138.50,
      eps: 46.80,
      bookValue: 88.00,
      revenue: 120000000000,
      netProfit: 61000000000,
      equity: 115000000000,
      totalDebt: 55000000000,
      totalAssets: 240000000000,
      totalLiabilities: 125000000000,
      currentAssets: 75000000000,
      currentLiabilities: 60000000000,
      inventory: 8000000000,
      dividendPerShare: 20.00,
      epsGrowthRate: 15.8
    }
  },
  {
    ticker: "SYS",
    name: "Systems Limited",
    sector: "Technology & Communication",
    financials: {
      price: 465.00,
      eps: 32.50,
      bookValue: 145.00,
      revenue: 55000000000,
      netProfit: 9500000000,
      equity: 42000000000,
      totalDebt: 4500000000,
      totalAssets: 62000000000,
      totalLiabilities: 20000000000,
      currentAssets: 38000000000,
      currentLiabilities: 15000000000,
      inventory: 0,
      dividendPerShare: 8.00,
      epsGrowthRate: 28.0
    }
  },
  {
    ticker: "FFC",
    name: "Fauji Fertilizer Company Limited",
    sector: "Fertilizer",
    financials: {
      price: 215.00,
      eps: 34.20,
      bookValue: 82.00,
      revenue: 175000000000,
      netProfit: 43000000000,
      equity: 105000000000,
      totalDebt: 22000000000,
      totalAssets: 210000000000,
      totalLiabilities: 105000000000,
      currentAssets: 95000000000,
      currentLiabilities: 70000000000,
      inventory: 18000000000,
      dividendPerShare: 25.50,
      epsGrowthRate: 16.5
    }
  },
  {
    ticker: "EFERT",
    name: "Engro Fertilizers Limited",
    sector: "Fertilizer",
    financials: {
      price: 182.00,
      eps: 22.80,
      bookValue: 56.00,
      revenue: 220000000000,
      netProfit: 30000000000,
      equity: 75000000000,
      totalDebt: 25000000000,
      totalAssets: 165000000000,
      totalLiabilities: 90000000000,
      currentAssets: 70000000000,
      currentLiabilities: 55000000000,
      inventory: 16000000000,
      dividendPerShare: 21.00,
      epsGrowthRate: 13.0
    }
  },
  {
    ticker: "PPL",
    name: "Pakistan Petroleum Limited",
    sector: "Oil & Gas Exploration",
    financials: {
      price: 128.00,
      eps: 35.40,
      bookValue: 210.00,
      revenue: 290000000000,
      netProfit: 96000000000,
      equity: 570000000000,
      totalDebt: 0,
      totalAssets: 740000000000,
      totalLiabilities: 170000000000,
      currentAssets: 340000000000,
      currentLiabilities: 110000000000,
      inventory: 12000000000,
      dividendPerShare: 11.50,
      epsGrowthRate: 7.2
    }
  },
  {
    ticker: "MARI",
    name: "Mari Petroleum Company Limited",
    sector: "Oil & Gas Exploration",
    financials: {
      price: 2550.00,
      eps: 440.00,
      bookValue: 1420.00,
      revenue: 185000000000,
      netProfit: 58000000000,
      equity: 190000000000,
      totalDebt: 0,
      totalAssets: 275000000000,
      totalLiabilities: 85000000000,
      currentAssets: 140000000000,
      currentLiabilities: 50000000000,
      inventory: 9000000000,
      dividendPerShare: 155.00,
      epsGrowthRate: 18.5
    }
  },
  {
    ticker: "POL",
    name: "Pakistan Oilfields Limited",
    sector: "Oil & Gas Exploration",
    financials: {
      price: 495.00,
      eps: 98.50,
      bookValue: 310.00,
      revenue: 68000000000,
      netProfit: 28000000000,
      equity: 88000000000,
      totalDebt: 0,
      totalAssets: 120000000000,
      totalLiabilities: 32000000000,
      currentAssets: 75000000000,
      currentLiabilities: 24000000000,
      inventory: 3500000000,
      dividendPerShare: 80.00,
      epsGrowthRate: 9.0
    }
  },
  {
    ticker: "MCB",
    name: "MCB Bank Limited",
    sector: "Commercial Banks",
    financials: {
      price: 248.00,
      eps: 55.20,
      bookValue: 185.00,
      revenue: 310000000000,
      netProfit: 65000000000,
      equity: 220000000000,
      totalDebt: 50000000000,
      totalAssets: 2450000000000,
      totalLiabilities: 2230000000000,
      currentAssets: 950000000000,
      currentLiabilities: 880000000000,
      inventory: 0,
      dividendPerShare: 36.00,
      epsGrowthRate: 19.5
    }
  },
  {
    ticker: "UBL",
    name: "United Bank Limited",
    sector: "Commercial Banks",
    financials: {
      price: 285.00,
      eps: 46.50,
      bookValue: 195.00,
      revenue: 350000000000,
      netProfit: 57000000000,
      equity: 240000000000,
      totalDebt: 65000000000,
      totalAssets: 3200000000000,
      totalLiabilities: 2960000000000,
      currentAssets: 1150000000000,
      currentLiabilities: 1080000000000,
      inventory: 0,
      dividendPerShare: 44.00,
      epsGrowthRate: 15.2
    }
  },
  {
    ticker: "HBL",
    name: "Habib Bank Limited",
    sector: "Commercial Banks",
    financials: {
      price: 135.00,
      eps: 38.00,
      bookValue: 215.00,
      revenue: 420000000000,
      netProfit: 56000000000,
      equity: 315000000000,
      totalDebt: 90000000000,
      totalAssets: 5200000000000,
      totalLiabilities: 4885000000000,
      currentAssets: 1800000000000,
      currentLiabilities: 1720000000000,
      inventory: 0,
      dividendPerShare: 14.00,
      epsGrowthRate: 12.0
    }
  },
  {
    ticker: "PSO",
    name: "Pakistan State Oil Company Limited",
    sector: "Oil & Gas Marketing",
    financials: {
      price: 245.00,
      eps: 34.00,
      bookValue: 530.00,
      revenue: 3400000000000,
      netProfit: 16000000000,
      equity: 250000000000,
      totalDebt: 320000000000,
      totalAssets: 1100000000000,
      totalLiabilities: 850000000000,
      currentAssets: 780000000000,
      currentLiabilities: 720000000000,
      inventory: 145000000000,
      dividendPerShare: 10.00,
      epsGrowthRate: 6.5
    }
  },
  {
    ticker: "MLCF",
    name: "Maple Leaf Cement Factory Limited",
    sector: "Cement",
    financials: {
      price: 42.50,
      eps: 6.40,
      bookValue: 45.00,
      revenue: 68000000000,
      netProfit: 6900000000,
      equity: 48000000000,
      totalDebt: 18000000000,
      totalAssets: 92000000000,
      totalLiabilities: 44000000000,
      currentAssets: 26000000000,
      currentLiabilities: 21000000000,
      inventory: 8500000000,
      dividendPerShare: 2.00,
      epsGrowthRate: 10.5
    }
  },
  {
    ticker: "DGKC",
    name: "D.G. Khan Cement Company Limited",
    sector: "Cement",
    financials: {
      price: 88.00,
      eps: 8.90,
      bookValue: 145.00,
      revenue: 72000000000,
      netProfit: 3900000000,
      equity: 64000000000,
      totalDebt: 34000000000,
      totalAssets: 135000000000,
      totalLiabilities: 71000000000,
      currentAssets: 32000000000,
      currentLiabilities: 28000000000,
      inventory: 9800000000,
      dividendPerShare: 2.50,
      epsGrowthRate: 7.0
    }
  },
  {
    ticker: "CHCC",
    name: "Cherat Cement Company Limited",
    sector: "Cement",
    financials: {
      price: 198.00,
      eps: 28.50,
      bookValue: 120.00,
      revenue: 41000000000,
      netProfit: 5500000000,
      equity: 23500000000,
      totalDebt: 9500000000,
      totalAssets: 48000000000,
      totalLiabilities: 24500000000,
      currentAssets: 14500000000,
      currentLiabilities: 11000000000,
      inventory: 4800000000,
      dividendPerShare: 5.00,
      epsGrowthRate: 13.5
    }
  },
  {
    ticker: "SEARL",
    name: "The Searle Company Limited",
    sector: "Pharmaceuticals",
    financials: {
      price: 74.50,
      eps: 6.80,
      bookValue: 68.00,
      revenue: 36000000000,
      netProfit: 2900000000,
      equity: 28000000000,
      totalDebt: 15000000000,
      totalAssets: 55000000000,
      totalLiabilities: 27000000000,
      currentAssets: 26000000000,
      currentLiabilities: 18000000000,
      inventory: 8200000000,
      dividendPerShare: 2.00,
      epsGrowthRate: 9.5
    }
  },
  {
    ticker: "INDU",
    name: "Indus Motor Company Limited",
    sector: "Automobile Assembler",
    financials: {
      price: 1850.00,
      eps: 190.00,
      bookValue: 780.00,
      revenue: 165000000000,
      netProfit: 15000000000,
      equity: 61000000000,
      totalDebt: 0,
      totalAssets: 135000000000,
      totalLiabilities: 74000000000,
      currentAssets: 110000000000,
      currentLiabilities: 69000000000,
      inventory: 22000000000,
      dividendPerShare: 112.00,
      epsGrowthRate: 11.5
    }
  },
  {
    ticker: "MTL",
    name: "Millat Tractors Limited",
    sector: "Automobile Assembler",
    financials: {
      price: 610.00,
      eps: 58.00,
      bookValue: 110.00,
      revenue: 72000000000,
      netProfit: 11000000000,
      equity: 21000000000,
      totalDebt: 3500000000,
      totalAssets: 39000000000,
      totalLiabilities: 18000000000,
      currentAssets: 28000000000,
      currentLiabilities: 15000000000,
      inventory: 10500000000,
      dividendPerShare: 45.00,
      epsGrowthRate: 14.0
    }
  },
  {
    ticker: "TRG",
    name: "TRG Pakistan Limited",
    sector: "Technology & Communication",
    financials: {
      price: 54.00,
      eps: 5.20,
      bookValue: 84.00,
      revenue: 22000000000,
      netProfit: 2800000000,
      equity: 46000000000,
      totalDebt: 8000000000,
      totalAssets: 62000000000,
      totalLiabilities: 16000000000,
      currentAssets: 18000000000,
      currentLiabilities: 10000000000,
      inventory: 0,
      dividendPerShare: 0.00,
      epsGrowthRate: 8.0
    }
  },
  {
    ticker: "BAHL",
    name: "Bank AL Habib Limited",
    sector: "Commercial Banks",
    financials: {
      price: 122.00,
      eps: 32.00,
      bookValue: 115.00,
      revenue: 280000000000,
      netProfit: 35500000000,
      equity: 128000000000,
      totalDebt: 35000000000,
      totalAssets: 2300000000000,
      totalLiabilities: 2172000000000,
      currentAssets: 900000000000,
      currentLiabilities: 850000000000,
      inventory: 0,
      dividendPerShare: 14.00,
      epsGrowthRate: 17.5
    }
  },
  {
    ticker: "BAFL",
    name: "Bank Alfalah Limited",
    sector: "Commercial Banks",
    financials: {
      price: 68.00,
      eps: 23.50,
      bookValue: 75.00,
      revenue: 240000000000,
      netProfit: 37000000000,
      equity: 118000000000,
      totalDebt: 30000000000,
      totalAssets: 2150000000000,
      totalLiabilities: 2032000000000,
      currentAssets: 820000000000,
      currentLiabilities: 780000000000,
      inventory: 0,
      dividendPerShare: 8.00,
      epsGrowthRate: 18.0
    }
  },
  {
    ticker: "DAWH",
    name: "Dawood Hercules Corporation Limited",
    sector: "Investment Bank / Holding",
    financials: {
      price: 162.00,
      eps: 24.50,
      bookValue: 178.00,
      revenue: 32000000000,
      netProfit: 11800000000,
      equity: 86000000000,
      totalDebt: 12000000000,
      totalAssets: 112000000000,
      totalLiabilities: 26000000000,
      currentAssets: 24000000000,
      currentLiabilities: 12000000000,
      inventory: 0,
      dividendPerShare: 15.00,
      epsGrowthRate: 12.0
    }
  },
  {
    ticker: "FATIMA",
    name: "Fatima Fertilizer Company Limited",
    sector: "Fertilizer",
    financials: {
      price: 62.00,
      eps: 11.20,
      bookValue: 58.00,
      revenue: 165000000000,
      netProfit: 23500000000,
      equity: 122000000000,
      totalDebt: 35000000000,
      totalAssets: 225000000000,
      totalLiabilities: 103000000000,
      currentAssets: 88000000000,
      currentLiabilities: 62000000000,
      inventory: 22000000000,
      dividendPerShare: 4.50,
      epsGrowthRate: 14.5
    }
  },
  {
    ticker: "FFBL",
    name: "Fauji Fertilizer Bin Qasim Limited",
    sector: "Fertilizer",
    financials: {
      price: 52.00,
      eps: 8.40,
      bookValue: 28.00,
      revenue: 145000000000,
      netProfit: 11000000000,
      equity: 36000000000,
      totalDebt: 28000000000,
      totalAssets: 115000000000,
      totalLiabilities: 79000000000,
      currentAssets: 52000000000,
      currentLiabilities: 44000000000,
      inventory: 14000000000,
      dividendPerShare: 3.00,
      epsGrowthRate: 16.0
    }
  },
  {
    ticker: "NBP",
    name: "National Bank of Pakistan",
    sector: "Commercial Banks",
    financials: {
      price: 64.00,
      eps: 24.80,
      bookValue: 165.00,
      revenue: 380000000000,
      netProfit: 52500000000,
      equity: 350000000000,
      totalDebt: 85000000000,
      totalAssets: 5600000000000,
      totalLiabilities: 5250000000000,
      currentAssets: 2100000000000,
      currentLiabilities: 2020000000000,
      inventory: 0,
      dividendPerShare: 0.00,
      epsGrowthRate: 13.0
    }
  },
  {
    ticker: "KOHC",
    name: "Kohat Cement Company Limited",
    sector: "Cement",
    financials: {
      price: 295.00,
      eps: 44.00,
      bookValue: 240.00,
      revenue: 44000000000,
      netProfit: 8800000000,
      equity: 48000000000,
      totalDebt: 8500000000,
      totalAssets: 72000000000,
      totalLiabilities: 24000000000,
      currentAssets: 26000000000,
      currentLiabilities: 14000000000,
      inventory: 6500000000,
      dividendPerShare: 12.00,
      epsGrowthRate: 12.5
    }
  },
  {
    ticker: "FCCL",
    name: "Fauji Cement Company Limited",
    sector: "Cement",
    financials: {
      price: 24.50,
      eps: 3.40,
      bookValue: 28.50,
      revenue: 80000000000,
      netProfit: 8200000000,
      equity: 69000000000,
      totalDebt: 32000000000,
      totalAssets: 135000000000,
      totalLiabilities: 66000000000,
      currentAssets: 31000000000,
      currentLiabilities: 26000000000,
      inventory: 9000000000,
      dividendPerShare: 1.25,
      epsGrowthRate: 9.8
    }
  },
  {
    ticker: "PIOC",
    name: "Pioneer Cement Limited",
    sector: "Cement",
    financials: {
      price: 175.00,
      eps: 26.00,
      bookValue: 110.00,
      revenue: 38000000000,
      netProfit: 5900000000,
      equity: 25000000000,
      totalDebt: 16000000000,
      totalAssets: 56000000000,
      totalLiabilities: 31000000000,
      currentAssets: 16000000000,
      currentLiabilities: 13000000000,
      inventory: 5400000000,
      dividendPerShare: 5.00,
      epsGrowthRate: 11.0
    }
  },
  {
    ticker: "ACPL",
    name: "Attock Cement Pakistan Limited",
    sector: "Cement",
    financials: {
      price: 115.00,
      eps: 16.50,
      bookValue: 155.00,
      revenue: 32000000000,
      netProfit: 2300000000,
      equity: 21500000000,
      totalDebt: 6500000000,
      totalAssets: 38000000000,
      totalLiabilities: 16500000000,
      currentAssets: 13500000000,
      currentLiabilities: 9500000000,
      inventory: 4200000000,
      dividendPerShare: 6.00,
      epsGrowthRate: 8.5
    }
  },
  {
    ticker: "PAEL",
    name: "Pak Elektron Limited",
    sector: "Electrical Goods",
    financials: {
      price: 28.50,
      eps: 3.10,
      bookValue: 39.00,
      revenue: 55000000000,
      netProfit: 2600000000,
      equity: 33000000000,
      totalDebt: 22000000000,
      totalAssets: 74000000000,
      totalLiabilities: 41000000000,
      currentAssets: 48000000000,
      currentLiabilities: 32000000000,
      inventory: 18000000000,
      dividendPerShare: 0.00,
      epsGrowthRate: 10.0
    }
  },
  {
    ticker: "AGP",
    name: "AGP Limited",
    sector: "Pharmaceuticals",
    financials: {
      price: 142.00,
      eps: 12.80,
      bookValue: 48.00,
      revenue: 19000000000,
      netProfit: 3600000000,
      equity: 13500000000,
      totalDebt: 4500000000,
      totalAssets: 24000000000,
      totalLiabilities: 10500000000,
      currentAssets: 11000000000,
      currentLiabilities: 7000000000,
      inventory: 3800000000,
      dividendPerShare: 6.00,
      epsGrowthRate: 15.0
    }
  },
  {
    ticker: "HINOON",
    name: "Highnoon Laboratories Limited",
    sector: "Pharmaceuticals",
    financials: {
      price: 680.00,
      eps: 52.00,
      bookValue: 210.00,
      revenue: 21000000000,
      netProfit: 2800000000,
      equity: 11200000000,
      totalDebt: 1200000000,
      totalAssets: 16500000000,
      totalLiabilities: 5300000000,
      currentAssets: 10500000000,
      currentLiabilities: 4200000000,
      inventory: 4100000000,
      dividendPerShare: 32.00,
      epsGrowthRate: 17.0
    }
  },
  {
    ticker: "ABOT",
    name: "Abbott Laboratories (Pakistan) Limited",
    sector: "Pharmaceuticals",
    financials: {
      price: 890.00,
      eps: 68.00,
      bookValue: 240.00,
      revenue: 56000000000,
      netProfit: 6650000000,
      equity: 23500000000,
      totalDebt: 0,
      totalAssets: 41000000000,
      totalLiabilities: 17500000000,
      currentAssets: 27000000000,
      currentLiabilities: 14500000000,
      inventory: 11500000000,
      dividendPerShare: 40.00,
      epsGrowthRate: 14.5
    }
  },
  {
    ticker: "GLAXO",
    name: "GlaxoSmithKline Pakistan Limited",
    sector: "Pharmaceuticals",
    financials: {
      price: 215.00,
      eps: 15.20,
      bookValue: 88.00,
      revenue: 48000000000,
      netProfit: 4800000000,
      equity: 28000000000,
      totalDebt: 0,
      totalAssets: 46000000000,
      totalLiabilities: 18000000000,
      currentAssets: 29000000000,
      currentLiabilities: 16000000000,
      inventory: 12000000000,
      dividendPerShare: 7.00,
      epsGrowthRate: 8.5
    }
  },
  {
    ticker: "HCAR",
    name: "Honda Atlas Cars (Pakistan) Limited",
    sector: "Automobile Assembler",
    financials: {
      price: 285.00,
      eps: 18.50,
      bookValue: 125.00,
      revenue: 62000000000,
      netProfit: 2600000000,
      equity: 17800000000,
      totalDebt: 4500000000,
      totalAssets: 42000000000,
      totalLiabilities: 24200000000,
      currentAssets: 29000000000,
      currentLiabilities: 21000000000,
      inventory: 8500000000,
      dividendPerShare: 6.00,
      epsGrowthRate: 7.5
    }
  },
  {
    ticker: "PSMC",
    name: "Pak Suzuki Motor Company Limited",
    sector: "Automobile Assembler",
    financials: {
      price: 520.00,
      eps: 42.00,
      bookValue: 240.00,
      revenue: 125000000000,
      netProfit: 3450000000,
      equity: 19800000000,
      totalDebt: 8500000000,
      totalAssets: 68000000000,
      totalLiabilities: 48200000000,
      currentAssets: 42000000000,
      currentLiabilities: 39000000000,
      inventory: 14000000000,
      dividendPerShare: 10.00,
      epsGrowthRate: 8.0
    }
  },
  {
    ticker: "THALL",
    name: "Thal Limited",
    sector: "Automobile Parts",
    financials: {
      price: 440.00,
      eps: 55.00,
      bookValue: 395.00,
      revenue: 35000000000,
      netProfit: 4450000000,
      equity: 32000000000,
      totalDebt: 1200000000,
      totalAssets: 42000000000,
      totalLiabilities: 10000000000,
      currentAssets: 23000000000,
      currentLiabilities: 7800000000,
      inventory: 6500000000,
      dividendPerShare: 25.00,
      epsGrowthRate: 11.5
    }
  },
  {
    ticker: "KEL",
    name: "K-Electric Limited",
    sector: "Power Generation & Distribution",
    financials: {
      price: 4.85,
      eps: 0.42,
      bookValue: 7.90,
      revenue: 520000000000,
      netProfit: 11600000000,
      equity: 218000000000,
      totalDebt: 220000000000,
      totalAssets: 1050000000000,
      totalLiabilities: 832000000000,
      currentAssets: 380000000000,
      currentLiabilities: 410000000000,
      inventory: 22000000000,
      dividendPerShare: 0.00,
      epsGrowthRate: 5.5
    }
  },
  {
    ticker: "KAPCO",
    name: "Kot Addu Power Company Limited",
    sector: "Power Generation & Distribution",
    financials: {
      price: 36.50,
      eps: 5.80,
      bookValue: 48.00,
      revenue: 28000000000,
      netProfit: 5100000000,
      equity: 42000000000,
      totalDebt: 0,
      totalAssets: 75000000000,
      totalLiabilities: 33000000000,
      currentAssets: 62000000000,
      currentLiabilities: 29000000000,
      inventory: 4500000000,
      dividendPerShare: 6.00,
      epsGrowthRate: 4.0
    }
  },
  {
    ticker: "EPCL",
    name: "Engro Polymer & Chemicals Limited",
    sector: "Chemicals",
    financials: {
      price: 38.00,
      eps: 4.20,
      bookValue: 31.00,
      revenue: 72000000000,
      netProfit: 3800000000,
      equity: 28000000000,
      totalDebt: 24000000000,
      totalAssets: 78000000000,
      totalLiabilities: 50000000000,
      currentAssets: 28000000000,
      currentLiabilities: 25000000000,
      inventory: 8200000000,
      dividendPerShare: 3.50,
      epsGrowthRate: 7.0
    }
  },
  {
    ticker: "ATRL",
    name: "Attock Refinery Limited",
    sector: "Refinery",
    financials: {
      price: 430.00,
      eps: 145.00,
      bookValue: 620.00,
      revenue: 410000000000,
      netProfit: 15400000000,
      equity: 66000000000,
      totalDebt: 0,
      totalAssets: 155000000000,
      totalLiabilities: 89000000000,
      currentAssets: 105000000000,
      currentLiabilities: 78000000000,
      inventory: 24000000000,
      dividendPerShare: 20.00,
      epsGrowthRate: 15.0
    }
  },
  {
    ticker: "NRL",
    name: "National Refinery Limited",
    sector: "Refinery",
    financials: {
      price: 260.00,
      eps: 22.00,
      bookValue: 380.00,
      revenue: 290000000000,
      netProfit: 1750000000,
      equity: 30000000000,
      totalDebt: 32000000000,
      totalAssets: 110000000000,
      totalLiabilities: 80000000000,
      currentAssets: 68000000000,
      currentLiabilities: 62000000000,
      inventory: 19000000000,
      dividendPerShare: 0.00,
      epsGrowthRate: 6.0
    }
  },
  {
    ticker: "PRL",
    name: "Pakistan Refinery Limited",
    sector: "Refinery",
    financials: {
      price: 28.50,
      eps: 6.50,
      bookValue: 34.00,
      revenue: 360000000000,
      netProfit: 4100000000,
      equity: 21500000000,
      totalDebt: 18000000000,
      totalAssets: 95000000000,
      totalLiabilities: 73500000000,
      currentAssets: 55000000000,
      currentLiabilities: 49000000000,
      inventory: 17500000000,
      dividendPerShare: 0.00,
      epsGrowthRate: 11.0
    }
  },
  {
    ticker: "ILP",
    name: "Interloop Limited",
    sector: "Textile Composite",
    financials: {
      price: 78.50,
      eps: 12.40,
      bookValue: 38.00,
      revenue: 145000000000,
      netProfit: 17400000000,
      equity: 53000000000,
      totalDebt: 58000000000,
      totalAssets: 142000000000,
      totalLiabilities: 89000000000,
      currentAssets: 76000000000,
      currentLiabilities: 58000000000,
      inventory: 28000000000,
      dividendPerShare: 5.00,
      epsGrowthRate: 16.5
    }
  },
  {
    ticker: "NML",
    name: "Nishat Mills Limited",
    sector: "Textile Composite",
    financials: {
      price: 84.00,
      eps: 28.00,
      bookValue: 340.00,
      revenue: 180000000000,
      netProfit: 9800000000,
      equity: 120000000000,
      totalDebt: 65000000000,
      totalAssets: 235000000000,
      totalLiabilities: 115000000000,
      currentAssets: 110000000000,
      currentLiabilities: 78000000000,
      inventory: 39000000000,
      dividendPerShare: 5.00,
      epsGrowthRate: 9.0
    }
  },
  {
    ticker: "GATM",
    name: "Gul Ahmed Textile Mills Limited",
    sector: "Textile Composite",
    financials: {
      price: 22.00,
      eps: 2.80,
      bookValue: 35.00,
      revenue: 135000000000,
      netProfit: 2100000000,
      equity: 26000000000,
      totalDebt: 52000000000,
      totalAssets: 108000000000,
      totalLiabilities: 82000000000,
      currentAssets: 62000000000,
      currentLiabilities: 55000000000,
      inventory: 24000000000,
      dividendPerShare: 0.00,
      epsGrowthRate: 6.0
    }
  },
  {
    ticker: "AVN",
    name: "Avanceon Limited",
    sector: "Technology & Communication",
    financials: {
      price: 62.50,
      eps: 5.60,
      bookValue: 36.00,
      revenue: 14000000000,
      netProfit: 2100000000,
      equity: 13500000000,
      totalDebt: 2800000000,
      totalAssets: 22000000000,
      totalLiabilities: 8500000000,
      currentAssets: 15500000000,
      currentLiabilities: 6800000000,
      inventory: 1200000000,
      dividendPerShare: 2.50,
      epsGrowthRate: 15.0
    }
  },
  {
    ticker: "AIRLINK",
    name: "Air Link Communication Limited",
    sector: "Technology & Communication",
    financials: {
      price: 135.00,
      eps: 13.50,
      bookValue: 42.00,
      revenue: 78000000000,
      netProfit: 5300000000,
      equity: 16500000000,
      totalDebt: 12000000000,
      totalAssets: 38000000000,
      totalLiabilities: 21500000000,
      currentAssets: 29000000000,
      currentLiabilities: 18000000000,
      inventory: 9500000000,
      dividendPerShare: 4.00,
      epsGrowthRate: 22.0
    }
  },
  {
    ticker: "PTC",
    name: "Pakistan Telecommunication Company Limited",
    sector: "Technology & Communication",
    financials: {
      price: 15.20,
      eps: 1.80,
      bookValue: 24.00,
      revenue: 195000000000,
      netProfit: 9100000000,
      equity: 122000000000,
      totalDebt: 95000000000,
      totalAssets: 420000000000,
      totalLiabilities: 298000000000,
      currentAssets: 95000000000,
      currentLiabilities: 110000000000,
      inventory: 3500000000,
      dividendPerShare: 0.00,
      epsGrowthRate: 6.5
    }
  },
  {
    ticker: "UNITY",
    name: "Unity Foods Limited",
    sector: "Food & Personal Care",
    financials: {
      price: 24.00,
      eps: 2.90,
      bookValue: 21.00,
      revenue: 95000000000,
      netProfit: 3500000000,
      equity: 25000000000,
      totalDebt: 18000000000,
      totalAssets: 56000000000,
      totalLiabilities: 31000000000,
      currentAssets: 36000000000,
      currentLiabilities: 26000000000,
      inventory: 14000000000,
      dividendPerShare: 0.00,
      epsGrowthRate: 12.0
    }
  },
  {
    ticker: "NESTLE",
    name: "Nestlé Pakistan Limited",
    sector: "Food & Personal Care",
    financials: {
      price: 7200.00,
      eps: 410.00,
      bookValue: 290.00,
      revenue: 210000000000,
      netProfit: 18600000000,
      equity: 13200000000,
      totalDebt: 14000000000,
      totalAssets: 68000000000,
      totalLiabilities: 54800000000,
      currentAssets: 34000000000,
      currentLiabilities: 45000000000,
      inventory: 16500000000,
      dividendPerShare: 360.00,
      epsGrowthRate: 14.0
    }
  },
  {
    ticker: "FCEPL",
    name: "FrieslandCampina Engro Pakistan Limited",
    sector: "Food & Personal Care",
    financials: {
      price: 88.00,
      eps: 4.80,
      bookValue: 22.00,
      revenue: 105000000000,
      netProfit: 3700000000,
      equity: 16800000000,
      totalDebt: 12000000000,
      totalAssets: 48000000000,
      totalLiabilities: 31200000000,
      currentAssets: 21000000000,
      currentLiabilities: 24000000000,
      inventory: 9200000000,
      dividendPerShare: 2.50,
      epsGrowthRate: 11.5
    }
  },
  {
    ticker: "SNGP",
    name: "Sui Northern Gas Pipelines Limited",
    sector: "Gas Utilities",
    financials: {
      price: 68.50,
      eps: 16.40,
      bookValue: 88.00,
      revenue: 1450000000000,
      netProfit: 10400000000,
      equity: 56000000000,
      totalDebt: 145000000000,
      totalAssets: 820000000000,
      totalLiabilities: 764000000000,
      currentAssets: 520000000000,
      currentLiabilities: 560000000000,
      inventory: 15000000000,
      dividendPerShare: 5.00,
      epsGrowthRate: 7.0
    }
  },
  {
    ticker: "SSGC",
    name: "Sui Southern Gas Company Limited",
    sector: "Gas Utilities",
    financials: {
      price: 14.50,
      eps: 1.20,
      bookValue: 18.00,
      revenue: 520000000000,
      netProfit: 1050000000,
      equity: 15800000000,
      totalDebt: 85000000000,
      totalAssets: 480000000000,
      totalLiabilities: 464200000000,
      currentAssets: 290000000000,
      currentLiabilities: 315000000000,
      inventory: 9000000000,
      dividendPerShare: 0.00,
      epsGrowthRate: 3.5
    }
  },
  {
    ticker: "ISL",
    name: "International Steels Limited",
    sector: "Engineering / Steel",
    financials: {
      price: 78.00,
      eps: 12.50,
      bookValue: 48.00,
      revenue: 85000000000,
      netProfit: 5450000000,
      equity: 21000000000,
      totalDebt: 18000000000,
      totalAssets: 54000000000,
      totalLiabilities: 33000000000,
      currentAssets: 34000000000,
      currentLiabilities: 26000000000,
      inventory: 14500000000,
      dividendPerShare: 5.50,
      epsGrowthRate: 9.5
    }
  },
  {
    ticker: "MUGHAL",
    name: "Mughal Iron & Steel Industries Limited",
    sector: "Engineering / Steel",
    financials: {
      price: 94.00,
      eps: 15.80,
      bookValue: 62.00,
      revenue: 92000000000,
      netProfit: 5300000000,
      equity: 20800000000,
      totalDebt: 28000000000,
      totalAssets: 64000000000,
      totalLiabilities: 43200000000,
      currentAssets: 41000000000,
      currentLiabilities: 32000000000,
      inventory: 18500000000,
      dividendPerShare: 4.00,
      epsGrowthRate: 14.0
    }
  },
  {
    ticker: "TGL",
    name: "Tariq Glass Industries Limited",
    sector: "Glass & Ceramics",
    financials: {
      price: 112.00,
      eps: 24.50,
      bookValue: 88.00,
      revenue: 35000000000,
      netProfit: 4900000000,
      equity: 17500000000,
      totalDebt: 6500000000,
      totalAssets: 31000000000,
      totalLiabilities: 13500000000,
      currentAssets: 14500000000,
      currentLiabilities: 9500000000,
      inventory: 4800000000,
      dividendPerShare: 9.00,
      epsGrowthRate: 15.5
    }
  },
  {
    ticker: "COLG",
    name: "Colgate-Palmolive (Pakistan) Limited",
    sector: "Personal Care",
    financials: {
      price: 1480.00,
      eps: 110.00,
      bookValue: 245.00,
      revenue: 125000000000,
      netProfit: 16500000000,
      equity: 36500000000,
      totalDebt: 0,
      totalAssets: 62000000000,
      totalLiabilities: 25500000000,
      currentAssets: 45000000000,
      currentLiabilities: 22000000000,
      inventory: 16500000000,
      dividendPerShare: 75.00,
      epsGrowthRate: 18.0
    }
  },
  {
    ticker: "ICI",
    name: "Lucky Core Industries Limited (ICI)",
    sector: "Chemicals",
    financials: {
      price: 920.00,
      eps: 112.00,
      bookValue: 480.00,
      revenue: 140000000000,
      netProfit: 10300000000,
      equity: 44500000000,
      totalDebt: 24000000000,
      totalAssets: 98000000000,
      totalLiabilities: 53500000000,
      currentAssets: 48000000000,
      currentLiabilities: 38000000000,
      inventory: 19500000000,
      dividendPerShare: 55.00,
      epsGrowthRate: 13.0
    }
  }
];

/**
 * Helper to look up a company by ticker, ticker.PSX, or company name query
 */
export const findCompany = (query: string): CompanyProfile | undefined => {
  if (!query || !query.trim()) return undefined;
  const clean = query.trim().toUpperCase().replace(/\.PSX$/, '');
  
  // 1. Exact ticker match
  const exactTicker = companies.find(c => c.ticker.toUpperCase() === clean);
  if (exactTicker) return exactTicker;

  // 2. Exact name match
  const exactName = companies.find(c => c.name.toUpperCase() === clean);
  if (exactName) return exactName;

  // 3. Name contains query
  const partialName = companies.find(c => c.name.toUpperCase().includes(clean));
  if (partialName) return partialName;

  // 4. Query contains ticker
  const tickerInQuery = companies.find(c => clean.includes(c.ticker.toUpperCase()));
  if (tickerInQuery) return tickerInQuery;

  // 5. Word boundary fuzzy check
  const words = clean.split(/\s+/);
  const firstWordMatch = companies.find(c => 
    words.some(w => w.length > 2 && (c.ticker.toUpperCase() === w || c.name.toUpperCase().includes(w)))
  );
  return firstWordMatch;
};
