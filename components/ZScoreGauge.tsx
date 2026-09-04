import React from 'react';
import { ZScoreResult } from '../types';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ShieldAlert, ShieldCheck, AlertCircle, Info, Calculator, ArrowRight } from 'lucide-react';

interface ZScoreGaugeProps {
  zScoreData: ZScoreResult;
  ticker?: string;
}

const GAUGE_ZONES = [
  { name: 'Distress Zone (High Risk < 1.81)', value: 1.81, color: '#ef4444', bgColor: '#fee2e2' },
  { name: 'Grey Zone (Caution 1.81 - 2.99)', value: 1.18, color: '#f59e0b', bgColor: '#fef3c7' },
  { name: 'Safe Zone (Low Risk ≥ 2.99)', value: 2.01, color: '#10b981', bgColor: '#d1fae5' },
];

export const ZScoreGauge: React.FC<ZScoreGaugeProps> = ({ zScoreData, ticker }) => {
  const { score, zone, riskLevel, statusText, interpretation, components } = zScoreData;

  // Clamp score for needle position (range 0 to 5 for visual display)
  const clampedScore = Math.max(0, Math.min(5, score));
  // 180 degrees is left (0), 0 degrees is right (5)
  // angle in degrees: 180 - (clampedScore / 5) * 180
  const needleAngle = 180 - (clampedScore / 5) * 180;
  const needleRad = (needleAngle * Math.PI) / 180;

  // Needle coordinates based on gauge center (cx: 140, cy: 130, radius: 90)
  const cx = 150;
  const cy = 135;
  const needleLength = 70;
  const needleX = cx + needleLength * Math.cos(needleRad);
  const needleY = cy - needleLength * Math.sin(needleRad);

  const zoneColor =
    zone === 'Safe' ? '#10b981' :
    zone === 'Grey' ? '#f59e0b' : '#ef4444';

  const zoneBg =
    zone === 'Safe' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
    zone === 'Grey' ? 'bg-amber-50 text-amber-800 border-amber-200' :
    'bg-rose-50 text-rose-800 border-rose-200';

  const ZoneIcon =
    zone === 'Safe' ? ShieldCheck :
    zone === 'Grey' ? AlertCircle : ShieldAlert;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100 mb-6">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl ${zone === 'Safe' ? 'bg-emerald-100 text-emerald-700' : zone === 'Grey' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
            <ZoneIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              Altman Z-Score Bankruptcy Risk
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Quantitative 2-year insolvency probability model for {ticker || 'selected company'}
            </p>
          </div>
        </div>

        <div className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold inline-flex items-center gap-1.5 self-start sm:self-auto ${zoneBg}`}>
          <ZoneIcon className="w-4 h-4" />
          <span>{statusText}</span>
        </div>
      </div>

      {/* Main Grid: Gauge Chart & Interpretation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-6">
        {/* Left: Recharts Gauge Meter */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-gray-50/50 rounded-2xl border border-gray-100 relative">
          <div className="w-full max-w-[300px] h-[175px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <Pie
                  data={GAUGE_ZONES}
                  cx="50%"
                  cy="85%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="#ffffff"
                  strokeWidth={2}
                >
                  {GAUGE_ZONES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(_, name) => [name, 'Altman Range']}
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Custom SVG Needle and Pivot overlaid accurately */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              viewBox="0 0 300 175"
            >
              <defs>
                <filter id="needleShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
                </filter>
              </defs>
              
              {/* Needle Line */}
              <line
                x1={cx}
                y1={cy}
                x2={needleX}
                y2={needleY}
                stroke="#1e293b"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#needleShadow)"
              />
              
              {/* Center Pivot circles */}
              <circle cx={cx} cy={cy} r="9" fill="#1e293b" />
              <circle cx={cx} cy={cy} r="4" fill={zoneColor} />
            </svg>
          </div>

          {/* Value Display */}
          <div className="text-center mt-[-10px] pb-2">
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="text-3xl font-black tracking-tight" style={{ color: zoneColor }}>
                {score.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-gray-400">Z-Score</span>
            </div>
            <p className="text-xs font-medium text-gray-500 mt-0.5">
              Risk Level: <strong className="text-gray-800">{riskLevel}</strong>
            </p>
          </div>

          {/* Scale Legend */}
          <div className="w-full flex items-center justify-between text-[10px] font-semibold text-gray-500 px-3 pt-2 border-t border-gray-200/60 mt-1">
            <span className="flex items-center gap-1 text-rose-600">
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
              &lt; 1.81 Distress
            </span>
            <span className="flex items-center gap-1 text-amber-600">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
              1.81 - 2.99 Grey
            </span>
            <span className="flex items-center gap-1 text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              &gt; 2.99 Safe
            </span>
          </div>
        </div>

        {/* Right: Analytical Commentary & Model Interpretation */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              <Info className="w-4 h-4 text-indigo-600" />
              Risk Analysis & Outlook
            </div>
            <p className="text-sm text-gray-700 leading-relaxed font-normal">
              {interpretation}
            </p>
          </div>

          {/* Formula summary */}
          <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-indigo-600" />
                Altman Z-Score Formula
              </span>
              <span className="text-[11px] font-mono text-indigo-700 font-semibold">
                Z = 1.2X₁ + 1.4X₂ + 3.3X₃ + 0.6X₄ + 1.0X₅
              </span>
            </div>
            <p className="text-xs text-indigo-900/80 leading-normal">
              Calculates financial distress probability by combining liquidity, cumulative retained earnings, operating asset efficiency, market leverage cushion, and revenue turnover.
            </p>
          </div>
        </div>
      </div>

      {/* 5-Component Contribution Breakdown Grid */}
      <div className="border-t border-gray-100 pt-5">
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3.5 flex items-center justify-between">
          <span>Component Breakdown & Factor Weights</span>
          <span className="text-[11px] font-normal text-gray-400">Sum of contributions = {score.toFixed(2)}</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {Object.entries(components).map(([key, comp]) => {
            const compPercent = score > 0 ? Math.max(0, Math.min(100, (comp.contribution / score) * 100)) : 0;
            return (
              <div 
                key={key} 
                className="bg-gray-50/60 hover:bg-gray-50 p-3.5 rounded-xl border border-gray-200/80 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded text-[11px]">
                      {key.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-semibold text-gray-400">
                      Weight: {comp.weight}x
                    </span>
                  </div>
                  <div className="text-xs font-bold text-gray-800 truncate" title={comp.label}>
                    {comp.label}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5 font-mono truncate" title={comp.formula}>
                    {comp.formula}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-gray-200/60">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] text-gray-500 font-medium">Value:</span>
                    <span className="text-xs font-mono font-bold text-gray-800">{comp.value.toFixed(3)}</span>
                  </div>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-[11px] text-indigo-600 font-semibold">Contribution:</span>
                    <span className="text-sm font-mono font-bold text-indigo-700">+{comp.contribution.toFixed(2)}</span>
                  </div>

                  {/* Progress / Contribution bar */}
                  <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-full rounded-full transition-all" 
                      style={{ width: `${Math.min(100, Math.max(5, compPercent))}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ZScoreGauge;
