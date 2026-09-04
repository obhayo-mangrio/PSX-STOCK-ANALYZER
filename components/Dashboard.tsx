import React, { useState } from 'react';
import { AnalysisResult, FinancialInput, CategoryScore, RatioResult } from '../types';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle, BrainCircuit, Loader2, Calendar, ArrowUpRight, TrendingDown } from 'lucide-react';
import { generateInvestmentMemo } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import ZScoreGauge from './ZScoreGauge';

interface DashboardProps {
  inputData: FinancialInput;
  results: AnalysisResult;
  onReset: () => void;
}

const ScoreGauge: React.FC<{ score: number }> = ({ score }) => {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];
  let color = '#ef4444'; // red
  if (score >= 40) color = '#eab308'; // yellow
  if (score >= 60) color = '#22c55e'; // green
  if (score >= 80) color = '#15803d'; // dark green

  return (
    <div className="relative h-48 w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            <Cell fill={color} />
            <Cell fill="#e2e8f0" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="text-4xl font-bold text-gray-800">{score}</span>
        <span className="block text-xs text-gray-500 uppercase tracking-wide">Score</span>
      </div>
    </div>
  );
};

interface CustomGrowthTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { year: string; eps: number; cumulativeGrowth: number; yearIndex: number } }>;
}

const GrowthTooltip: React.FC<CustomGrowthTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isBase = data.yearIndex === 0;
    return (
      <div className="bg-gray-900 text-white p-3 rounded-xl shadow-xl text-xs border border-gray-700 min-w-[170px]">
        <div className="flex items-center justify-between border-b border-gray-700 pb-1.5 mb-2">
          <span className="font-semibold text-gray-200">{data.year}</span>
          <span className="text-[10px] text-indigo-300 font-mono">
            {isBase ? 'Baseline' : `Y+${data.yearIndex}`}
          </span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center gap-4">
            <span className="text-gray-400">Projected EPS:</span>
            <span className="font-bold text-indigo-300">PKR {data.eps.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-gray-400">Cumulative Growth:</span>
            <span className={`font-semibold ${data.cumulativeGrowth >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {data.cumulativeGrowth >= 0 ? '+' : ''}{data.cumulativeGrowth}%
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const Dashboard: React.FC<DashboardProps> = ({ inputData, results, onReset }) => {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMemo, setAiMemo] = useState<string | null>(null);

  const radarData = (Object.values(results.categoryScores) as CategoryScore[]).map(cat => ({
    subject: cat.name,
    A: cat.score,
    fullMark: 100,
  }));

  // 5-Year Projected EPS Growth calculations
  const growthRate = inputData.epsGrowthRate || 0;
  const baseEPS = inputData.eps || 0;

  const projectionData = Array.from({ length: 6 }, (_, i) => {
    const factor = Math.pow(1 + growthRate / 100, i);
    const projectedEPS = Number((baseEPS * factor).toFixed(2));
    const cumulativeGrowth = Number(((factor - 1) * 100).toFixed(1));
    const prevEPS = i === 0 ? baseEPS : Number((baseEPS * Math.pow(1 + growthRate / 100, i - 1)).toFixed(2));
    const yoyChange = Number((projectedEPS - prevEPS).toFixed(2));

    return {
      year: i === 0 ? 'Current (Y0)' : `Year ${i}`,
      shortLabel: i === 0 ? 'Base' : `Y+${i}`,
      yearIndex: i,
      eps: projectedEPS,
      cumulativeGrowth,
      yoyChange,
    };
  });

  const finalYearEPS = projectionData[5].eps;
  const totalCumulativeGrowth = projectionData[5].cumulativeGrowth;
  const netEPSDelta = Number((finalYearEPS - baseEPS).toFixed(2));

  const handleGenerateAI = async () => {
    setAiLoading(true);
    const memo = await generateInvestmentMemo(inputData, results);
    setAiMemo(memo);
    setAiLoading(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-3xl font-bold text-gray-800">{inputData.ticker} <span className="text-gray-400 font-normal">Analysis</span></h2>
           <p className="text-gray-500 mt-1">Price: PKR {inputData.price.toFixed(2)} | EPS: {inputData.eps.toFixed(2)}</p>
        </div>
        <button onClick={onReset} className="text-sm text-gray-500 hover:text-gray-800 underline">
          Analyze Another
        </button>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Score Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Fundamental Strength</h3>
          <ScoreGauge score={results.totalScore} />
          <div className="text-center mt-[-20px]">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold 
              ${results.classification.includes('Strong') ? 'bg-green-100 text-green-800' : 
                results.classification.includes('Fair') ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'}`}>
              {results.classification}
            </span>
          </div>
        </div>

        {/* Outlook Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col justify-center items-center text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Outlook Indicator</h3>
          {results.outlook === 'Positive' ? (
             <TrendingUp className="w-16 h-16 text-green-500 mb-4" />
          ) : results.outlook === 'Negative' ? (
             <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
          ) : (
             <CheckCircle className="w-16 h-16 text-yellow-500 mb-4" />
          )}
          <p className="text-xl font-medium text-gray-800">{results.outlook}</p>
          <p className="text-sm text-gray-500 mt-2">
            Based on growth consistency and valuation safety.
          </p>
        </div>

        {/* Radar Chart */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2">
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
              <Radar
                name="Score"
                dataKey="A"
                stroke="#4f46e5"
                fill="#4f46e5"
                fillOpacity={0.4}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Metrics Grid */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-700">Ratio Breakdown</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 divide-x divide-y divide-gray-100">
          {(Object.entries(results.ratios) as [string, RatioResult][]).map(([key, ratio]) => (
            <div key={key} className="p-4 flex flex-col items-center text-center hover:bg-gray-50 transition-colors">
              <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">{ratio.label}</span>
              <span className="text-lg font-bold text-gray-900">{ratio.formatted}</span>
              <span className={`text-xs mt-2 px-2 py-0.5 rounded-full ${
                ratio.rating === 'Excellent' ? 'bg-green-100 text-green-700' :
                ratio.rating === 'Good' ? 'bg-blue-100 text-blue-700' :
                ratio.rating === 'Fair' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {ratio.rating}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Altman Z-Score Bankruptcy Risk Gauge Section */}
      <div id="zscore-bankruptcy-risk-section">
        <ZScoreGauge zScoreData={results.zScore} ticker={inputData.ticker} />
      </div>

      {/* 5-Year Projected Growth Trend Section */}
      <div id="eps-projected-growth-card" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">5-Year Projected Growth Trend</h3>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Compounded trajectory based on the provided EPS annual growth rate of <span className="font-semibold text-indigo-600">{growthRate >= 0 ? '+' : ''}{growthRate}%</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-gray-50 px-3.5 py-2 rounded-xl border border-gray-100 text-right">
              <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Base EPS</span>
              <span className="text-sm font-bold text-gray-800">PKR {baseEPS.toFixed(2)}</span>
            </div>
            <div className="bg-indigo-50 px-3.5 py-2 rounded-xl border border-indigo-100 text-right">
              <span className="block text-[11px] font-semibold text-indigo-500 uppercase tracking-wider">Year 5 Target</span>
              <span className="text-sm font-bold text-indigo-900">PKR {finalYearEPS.toFixed(2)}</span>
            </div>
            <div className={`px-3.5 py-2 rounded-xl border text-right ${
              totalCumulativeGrowth >= 0 
                ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                : 'bg-rose-50 border-rose-100 text-rose-800'
            }`}>
              <span className="block text-[11px] font-semibold opacity-75 uppercase tracking-wider flex items-center justify-end gap-1">
                {totalCumulativeGrowth >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                5Y Cumulative
              </span>
              <span className="text-sm font-bold">
                {totalCumulativeGrowth >= 0 ? '+' : ''}{totalCumulativeGrowth}%
              </span>
            </div>
          </div>
        </div>

        {/* Recharts Area Chart */}
        <div className="w-full h-72 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={projectionData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="epsGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 12, fill: '#64748b' }} 
                axisLine={{ stroke: '#e2e8f0' }} 
                tickLine={false} 
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#64748b' }} 
                axisLine={{ stroke: '#e2e8f0' }} 
                tickLine={false} 
                tickFormatter={(val) => `PKR ${val}`}
              />
              <Tooltip content={<GrowthTooltip />} />
              <Area 
                type="monotone" 
                dataKey="eps" 
                stroke="#4f46e5" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#epsGrowthGradient)" 
                activeDot={{ r: 6, fill: '#4f46e5', stroke: '#ffffff', strokeWidth: 2 }} 
                name="Projected EPS" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Year-by-Year Step Breakdown Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {projectionData.map((item) => (
            <div 
              key={item.yearIndex}
              className={`p-3 rounded-xl border text-center transition-all ${
                item.yearIndex === 0 
                  ? 'bg-gray-50 border-gray-200' 
                  : item.yearIndex === 5 
                  ? 'bg-indigo-50/70 border-indigo-200 shadow-sm ring-1 ring-indigo-200' 
                  : 'bg-white border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                {item.shortLabel}
              </div>
              <div className="text-base font-bold text-gray-900 mt-1">
                PKR {item.eps.toFixed(2)}
              </div>
              <div className="mt-1">
                {item.yearIndex === 0 ? (
                  <span className="text-[10px] font-medium text-gray-400">Baseline</span>
                ) : (
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    item.cumulativeGrowth >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {item.cumulativeGrowth >= 0 ? '+' : ''}{item.cumulativeGrowth}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="bg-indigo-900 rounded-2xl shadow-xl overflow-hidden text-white">
        <div className="p-6 border-b border-indigo-800 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <BrainCircuit className="w-6 h-6 text-indigo-300" />
                <h3 className="text-xl font-bold">AI Analyst Insight</h3>
            </div>
             {!aiMemo && !aiLoading && (
                <button 
                    onClick={handleGenerateAI}
                    className="bg-white text-indigo-900 hover:bg-indigo-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                >
                    Generate Memo
                </button>
            )}
        </div>
        <div className="p-8 min-h-[150px]">
            {aiLoading ? (
                <div className="flex flex-col items-center justify-center h-full py-8 text-indigo-300">
                    <Loader2 className="w-8 h-8 animate-spin mb-3" />
                    <p>Analyzing financial reports...</p>
                </div>
            ) : aiMemo ? (
                <div className="prose prose-invert max-w-none prose-p:text-indigo-100 prose-strong:text-white prose-li:text-indigo-100">
                    <ReactMarkdown>{aiMemo}</ReactMarkdown>
                </div>
            ) : (
                <div className="text-indigo-300 text-center py-4">
                    <p>Click "Generate Memo" to get a qualitative analysis powered by Gemini 2.0 Flash.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;