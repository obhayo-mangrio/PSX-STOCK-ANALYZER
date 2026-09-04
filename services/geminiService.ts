import { GoogleGenAI } from "@google/genai";
import { FinancialInput, AnalysisResult } from "../types";
import { findCompany } from "../data/companies";

const getGeminiClient = () => {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export interface FetchDataResult {
  data: Partial<FinancialInput>;
  sources: { title: string; uri: string }[];
  companyName?: string;
  ticker?: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const generateWithRetry = async (ai: GoogleGenAI, prompt: string, retries = 2): Promise<{ data: any; sources: { title: string; uri: string }[] }> => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: 'application/json'
        }
      });

      const text = response.text;
      if (!text) throw new Error("Empty response from AI");

      // Try parsing JSON
      const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const data = JSON.parse(cleanText);

      // Extract sources
      let sources: { title: string; uri: string }[] = [];
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      
      if (groundingChunks) {
        groundingChunks.forEach((chunk: any) => {
          if (chunk.web) {
            sources.push({
              title: chunk.web.title || 'Source',
              uri: chunk.web.uri
            });
          }
        });
      }

      return { data, sources };
    } catch (error) {
      console.warn(`Attempt ${attempt + 1} failed:`, error);
      if (attempt === retries) throw error;
      await delay(1000 * (attempt + 1)); // Exponential backoff
    }
  }
  throw new Error("All retry attempts failed");
};

export const fetchCompanyData = async (query: string): Promise<FetchDataResult | null> => {
  if (!query || !query.trim()) return null;

  // Check if we have preloaded profile in our companies database
  const matchedProfile = findCompany(query);
  const ticker = matchedProfile ? matchedProfile.ticker : query.trim().toUpperCase().replace(/\.PSX$/, '');
  const companyName = matchedProfile ? matchedProfile.name : query.trim();

  try {
    const ai = getGeminiClient();
    const prompt = `
      You are a financial data assistant specializing in the Pakistan Stock Exchange (PSX).
      Task: Find the most recent fundamental financial data for "${companyName}" (Ticker: "${ticker}") listed on PSX.
      
      Search Strategy:
      1. Search for "${ticker} PSX financial ratios dps.psx.com.pk".
      2. Search for "${companyName} ${ticker} financial highlights annual report".
      3. Look for the latest available reports (2024 or 2025).
      
      Extract the following fields into a JSON object.
      CRITICAL: PSX reports often quote figures in "Thousands" ('000) or "Millions". 
      You MUST convert them to the actual full number. (e.g., if Assets = 5,000,000 and unit is '000, the value is 5,000,000,000).

      Required Fields:
      - price: Current market price in PKR.
      - eps: Earnings Per Share (TTM).
      - bookValue: Break-up value / Book Value per share.
      - revenue: Total Sales/Revenue (Annual).
      - netProfit: Profit After Tax (Annual).
      - equity: Total Shareholder Equity.
      - totalDebt: Long term debt + Current portion + Short term borrowings.
      - totalAssets: Total Assets.
      - totalLiabilities: Total Liabilities.
      - currentAssets: Current Assets.
      - currentLiabilities: Current Liabilities.
      - inventory: Stock-in-trade.
      - dividendPerShare: Total cash dividend per share in the last year.
      - epsGrowthRate: 3-5 year EPS Compound Annual Growth Rate (%). Estimate if necessary.

      If a specific value is not found, use 0.
      
      Return ONLY the JSON object.
    `;

    // Initial Fetch with Retry
    const { data: parsedData, sources } = await generateWithRetry(ai, prompt, 1);

    // Merge with benchmark if any key is 0 and we have preloaded dataset
    if (matchedProfile?.financials) {
      Object.entries(matchedProfile.financials).forEach(([key, val]) => {
        const k = key as keyof FinancialInput;
        if (!parsedData[k] || parsedData[k] === 0) {
          parsedData[k] = val;
        }
      });
    }

    return {
      data: parsedData,
      sources: sources.length > 0 ? sources : [
        { title: 'PSX Data Portal (dps.psx.com.pk)', uri: 'https://dps.psx.com.pk/' }
      ],
      companyName,
      ticker
    };
  } catch (error) {
    console.warn("Gemini Live Search encountered error, falling back to reference PSX database:", error);
    
    // If we have matched preloaded dataset, return it!
    if (matchedProfile?.financials) {
      return {
        data: matchedProfile.financials,
        sources: [
          { title: `${matchedProfile.name} - Annual Financial Reference Database`, uri: 'https://dps.psx.com.pk/' }
        ],
        companyName: matchedProfile.name,
        ticker: matchedProfile.ticker
      };
    }
    
    return null;
  }
};

export const generateInvestmentMemo = async (
  input: FinancialInput,
  results: AnalysisResult
): Promise<string> => {
  try {
    const ai = getGeminiClient();
    
    const prompt = `
    You are a professional financial analyst specializing in the Pakistan Stock Exchange (PSX).
    
    Review the following fundamental data and analysis for ticker "${input.ticker}".
    
    **Input Data:**
    - Price: PKR ${input.price}
    - EPS: PKR ${input.eps}
    - Book Value: PKR ${input.bookValue}
    - Debt/Equity: ${(input.totalDebt / (input.equity || 1)).toFixed(2)}
    - Net Margin: ${((input.netProfit / (input.revenue || 1)) * 100).toFixed(2)}%
    - EPS Growth (3-5yr): ${input.epsGrowthRate}%
    
    **Calculated Analysis:**
    - Overall Fundamental Score: ${results.totalScore}/100
    - Classification: ${results.classification}
    - Altman Z-Score: ${results.zScore.score.toFixed(2)} (${results.zScore.statusText} - ${results.zScore.riskLevel})
    - Valuation Score: ${results.categoryScores.valuation.score.toFixed(0)}/100
    - Profitability Score: ${results.categoryScores.profitability.score.toFixed(0)}/100
    - Financial Health Score: ${results.categoryScores.health.score.toFixed(0)}/100
    
    **Task:**
    Write a concise "Investment Memo" (approx 150-200 words).
    1. Highlight the strongest and weakest areas including insolvency/bankruptcy risk assessment from the Altman Z-score (${results.zScore.score.toFixed(2)}).
    2. Provide a nuanced interpretation of the score (e.g., is it a value trap? is it a high-growth gem?).
    3. Mention specific risks based on the debt, liquidity or margin profile in Pakistan's macro environment.
    4. Conclude with a clear analytical opinion for a long-term investor.

    Format nicely with Markdown.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
    });

    return response.text || "Could not generate analysis.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating AI insight. Please ensure your API key is configured correctly.";
  }
};

