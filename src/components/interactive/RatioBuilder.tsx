'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';

export function RatioBuilder() {
  const [currentAssets, setCurrentAssets] = useState(500000);
  const [currentLiabilities, setCurrentLiabilities] = useState(250000);
  const [totalAssets, setTotalAssets] = useState(1000000);
  const [totalDebt, setTotalDebt] = useState(400000);
  const [revenue, setRevenue] = useState(2000000);
  const [netIncome, setNetIncome] = useState(200000);
  const [equity, setEquity] = useState(600000);

  const currentRatio = currentAssets / currentLiabilities;
  const debtToEquity = totalDebt / equity;
  const roe = (netIncome / equity) * 100;
  const profitMargin = (netIncome / revenue) * 100;

  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold">Financial Ratio Builder</h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-300">Input Values</h4>
          
          <div>
            <label className="mb-2 block text-sm text-slate-400">Current Assets</label>
            <input
              type="number"
              value={currentAssets}
              onChange={(e) => setCurrentAssets(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-50"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-400">Current Liabilities</label>
            <input
              type="number"
              value={currentLiabilities}
              onChange={(e) => setCurrentLiabilities(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-50"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-400">Total Debt</label>
            <input
              type="number"
              value={totalDebt}
              onChange={(e) => setTotalDebt(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-50"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-400">Equity</label>
            <input
              type="number"
              value={equity}
              onChange={(e) => setEquity(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-50"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-400">Revenue</label>
            <input
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-50"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-400">Net Income</label>
            <input
              type="number"
              value={netIncome}
              onChange={(e) => setNetIncome(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-50"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-slate-300">Calculated Ratios</h4>
          
          <div className="space-y-3">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
              <p className="mb-1 text-sm text-emerald-300">Current Ratio</p>
              <p className="text-2xl font-bold">{currentRatio.toFixed(2)}</p>
              <p className="mt-1 text-xs text-slate-400">
                {currentRatio > 1 ? '✓ Good liquidity' : '⚠ Low liquidity'}
              </p>
            </div>

            <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-4">
              <p className="mb-1 text-sm text-cyan-300">Debt-to-Equity</p>
              <p className="text-2xl font-bold">{debtToEquity.toFixed(2)}</p>
              <p className="mt-1 text-xs text-slate-400">
                {debtToEquity < 1 ? '✓ Conservative' : '⚠ High leverage'}
              </p>
            </div>

            <div className="rounded-lg border border-sky-500/30 bg-sky-500/10 p-4">
              <p className="mb-1 text-sm text-sky-300">Return on Equity (ROE)</p>
              <p className="text-2xl font-bold">{roe.toFixed(2)}%</p>
              <p className="mt-1 text-xs text-slate-400">
                {roe > 15 ? '✓ Strong performance' : 'Needs improvement'}
              </p>
            </div>

            <div className="rounded-lg border border-fuchsia-500/30 bg-fuchsia-500/10 p-4">
              <p className="mb-1 text-sm text-fuchsia-300">Profit Margin</p>
              <p className="text-2xl font-bold">{profitMargin.toFixed(2)}%</p>
              <p className="mt-1 text-xs text-slate-400">
                {profitMargin > 10 ? '✓ Healthy margin' : 'Low margin'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

