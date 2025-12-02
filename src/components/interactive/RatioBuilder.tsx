'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';

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
    <Card className="overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur-sm">
      <div className="p-6">
        <h3 className="mb-6 text-xl font-bold text-slate-100">Financial Ratio Builder</h3>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <h4 className="font-semibold text-slate-300">Input Values</h4>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">Current Assets</label>
                <input
                  type="number"
                  value={currentAssets}
                  onChange={(e) => setCurrentAssets(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">Current Liabilities</label>
                <input
                  type="number"
                  value={currentLiabilities}
                  onChange={(e) => setCurrentLiabilities(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">Total Debt</label>
                <input
                  type="number"
                  value={totalDebt}
                  onChange={(e) => setTotalDebt(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">Equity</label>
                <input
                  type="number"
                  value={equity}
                  onChange={(e) => setEquity(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">Revenue</label>
                <input
                  type="number"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">Net Income</label>
                <input
                  type="number"
                  value={netIncome}
                  onChange={(e) => setNetIncome(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-semibold text-slate-300">Calculated Ratios</h4>

            <div className="grid gap-4 sm:grid-cols-2">
              <motion.div
                layout
                className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 transition-all hover:border-emerald-500/40"
              >
                <p className="mb-1 text-xs font-medium text-emerald-400">Current Ratio</p>
                <motion.p
                  key={currentRatio}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-slate-100"
                >
                  {currentRatio.toFixed(2)}
                </motion.p>
                <p className="mt-2 text-[10px] text-slate-400">
                  {currentRatio > 1.5 ? '✓ Healthy' : currentRatio > 1 ? '⚠ Adequate' : '⚠ Low Liquidity'}
                </p>
              </motion.div>

              <motion.div
                layout
                className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4 transition-all hover:border-cyan-500/40"
              >
                <p className="mb-1 text-xs font-medium text-cyan-400">Debt-to-Equity</p>
                <motion.p
                  key={debtToEquity}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-slate-100"
                >
                  {debtToEquity.toFixed(2)}
                </motion.p>
                <p className="mt-2 text-[10px] text-slate-400">
                  {debtToEquity < 1 ? '✓ Conservative' : '⚠ High Leverage'}
                </p>
              </motion.div>

              <motion.div
                layout
                className="rounded-xl border border-sky-500/20 bg-sky-500/10 p-4 transition-all hover:border-sky-500/40"
              >
                <p className="mb-1 text-xs font-medium text-sky-400">ROE</p>
                <motion.p
                  key={roe}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-slate-100"
                >
                  {roe.toFixed(1)}%
                </motion.p>
                <p className="mt-2 text-[10px] text-slate-400">
                  {roe > 15 ? '✓ Strong' : 'Needs Improvement'}
                </p>
              </motion.div>

              <motion.div
                layout
                className="rounded-xl border border-fuchsia-500/20 bg-fuchsia-500/10 p-4 transition-all hover:border-fuchsia-500/40"
              >
                <p className="mb-1 text-xs font-medium text-fuchsia-400">Profit Margin</p>
                <motion.p
                  key={profitMargin}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-slate-100"
                >
                  {profitMargin.toFixed(1)}%
                </motion.p>
                <p className="mt-2 text-[10px] text-slate-400">
                  {profitMargin > 10 ? '✓ Healthy' : 'Low Margin'}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

