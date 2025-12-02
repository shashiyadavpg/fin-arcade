'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';

export function DCFCalculator() {
  const [cashFlow, setCashFlow] = useState(100);
  const [growthRate, setGrowthRate] = useState(5);
  const [discountRate, setDiscountRate] = useState(10);
  const [years, setYears] = useState(5);
  const [terminalGrowth, setTerminalGrowth] = useState(3);

  const result = useMemo(() => {
    let totalPV = 0;
    let currentCF = cashFlow;
    const yearlyPVs = [];

    // Projected cash flows
    for (let i = 1; i <= years; i++) {
      currentCF = currentCF * (1 + growthRate / 100);
      const pv = currentCF / Math.pow(1 + discountRate / 100, i);
      totalPV += pv;
      yearlyPVs.push({ year: i, cf: currentCF, pv });
    }

    // Terminal value
    const terminalCF = currentCF * (1 + terminalGrowth / 100);
    const terminalValue = terminalCF / ((discountRate / 100) - (terminalGrowth / 100));
    const terminalPV = terminalValue / Math.pow(1 + discountRate / 100, years);

    return {
      projectedPV: totalPV,
      terminalPV,
      totalValue: totalPV + terminalPV,
      yearlyPVs,
      terminalValue,
    };
  }, [cashFlow, growthRate, discountRate, years, terminalGrowth]);

  const maxBarValue = Math.max(...result.yearlyPVs.map(y => y.pv), result.terminalPV);

  return (
    <Card className="overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur-sm">
      <div className="p-6">
        <h3 className="mb-6 text-xl font-bold text-slate-100">DCF Valuation Model</h3>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Controls */}
          <div className="space-y-6">
            <div>
              <label className="mb-2 flex justify-between text-sm font-medium text-slate-400">
                Initial Free Cash Flow
                <span className="text-slate-200">${cashFlow}M</span>
              </label>
              <input
                type="range"
                min="10"
                max="1000"
                value={cashFlow}
                onChange={(e) => setCashFlow(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-cyan-500"
              />
            </div>

            <div>
              <label className="mb-2 flex justify-between text-sm font-medium text-slate-400">
                Growth Rate (Next {years} yrs)
                <span className="text-slate-200">{growthRate}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="20"
                value={growthRate}
                onChange={(e) => setGrowthRate(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-cyan-500"
              />
            </div>

            <div>
              <label className="mb-2 flex justify-between text-sm font-medium text-slate-400">
                Discount Rate (WACC)
                <span className="text-slate-200">{discountRate}%</span>
              </label>
              <input
                type="range"
                min="5"
                max="20"
                step="0.5"
                value={discountRate}
                onChange={(e) => setDiscountRate(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-cyan-500"
              />
            </div>

            <div>
              <label className="mb-2 flex justify-between text-sm font-medium text-slate-400">
                Terminal Growth Rate
                <span className="text-slate-200">{terminalGrowth}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={terminalGrowth}
                onChange={(e) => setTerminalGrowth(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-cyan-500"
              />
            </div>
          </div>

          {/* Visualization */}
          <div className="flex flex-col rounded-xl bg-slate-950/50 p-6">
            <div className="mb-8 text-center">
              <p className="text-sm font-medium text-slate-400">Intrinsic Value</p>
              <motion.div
                key={result.totalValue}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-4xl font-bold text-cyan-400"
              >
                ${result.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}M
              </motion.div>
              <div className="mt-2 flex justify-center gap-4 text-xs text-slate-500">
                <span>Projected PV: ${result.projectedPV.toLocaleString(undefined, { maximumFractionDigits: 0 })}M</span>
                <span>•</span>
                <span>Terminal PV: ${result.terminalPV.toLocaleString(undefined, { maximumFractionDigits: 0 })}M</span>
              </div>
            </div>

            <div className="flex flex-1 items-end justify-between gap-2">
              {result.yearlyPVs.map((y) => (
                <div key={y.year} className="group relative flex w-full flex-col justify-end">
                  <div
                    className="w-full rounded-t bg-cyan-500/60 transition-all hover:bg-cyan-500"
                    style={{ height: `${(y.pv / maxBarValue) * 100}%` }}
                  />
                  <span className="mt-2 text-center text-[10px] text-slate-500">Yr {y.year}</span>
                  <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white group-hover:block">
                    PV: ${Math.round(y.pv)}M
                  </div>
                </div>
              ))}

              {/* Terminal Value Bar */}
              <div className="group relative flex w-full flex-col justify-end">
                <div
                  className="w-full rounded-t bg-emerald-500/60 transition-all hover:bg-emerald-500"
                  style={{ height: `${(result.terminalPV / maxBarValue) * 100}%` }}
                />
                <span className="mt-2 text-center text-[10px] text-slate-500">TV</span>
                <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white group-hover:block">
                  PV: ${Math.round(result.terminalPV)}M
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

