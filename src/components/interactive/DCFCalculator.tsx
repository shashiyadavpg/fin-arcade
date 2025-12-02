'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';

export function DCFCalculator() {
  const [cashFlow, setCashFlow] = useState(100000);
  const [growthRate, setGrowthRate] = useState(5);
  const [discountRate, setDiscountRate] = useState(10);
  const [years, setYears] = useState(5);
  const [terminalGrowth, setTerminalGrowth] = useState(3);

  const calculatePV = (cf: number, year: number) => {
    return cf / Math.pow(1 + discountRate / 100, year);
  };

  const calculateDCF = () => {
    let totalPV = 0;
    let currentCF = cashFlow;

    // Projected cash flows
    for (let i = 1; i <= years; i++) {
      currentCF = currentCF * (1 + growthRate / 100);
      totalPV += calculatePV(currentCF, i);
    }

    // Terminal value
    const terminalCF = currentCF * (1 + terminalGrowth / 100);
    const terminalValue = terminalCF / ((discountRate / 100) - (terminalGrowth / 100));
    const terminalPV = calculatePV(terminalValue, years);

    return {
      projectedPV: totalPV,
      terminalPV,
      totalValue: totalPV + terminalPV,
      finalCF: currentCF,
    };
  };

  const result = calculateDCF();

  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold">DCF Valuation Calculator</h3>
      
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Initial Cash Flow ($)
          </label>
          <input
            type="number"
            value={cashFlow}
            onChange={(e) => setCashFlow(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-50"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Growth Rate (%): {growthRate}%
          </label>
          <input
            type="range"
            min="0"
            max="20"
            value={growthRate}
            onChange={(e) => setGrowthRate(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Discount Rate (%): {discountRate}%
          </label>
          <input
            type="range"
            min="5"
            max="20"
            value={discountRate}
            onChange={(e) => setDiscountRate(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Projection Period (years): {years}
          </label>
          <input
            type="range"
            min="3"
            max="10"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Terminal Growth Rate (%): {terminalGrowth}%
          </label>
          <input
            type="range"
            min="0"
            max="5"
            value={terminalGrowth}
            onChange={(e) => setTerminalGrowth(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="mt-6 space-y-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
          <div className="flex justify-between text-sm">
            <span className="text-slate-300">Projected Cash Flows PV:</span>
            <span className="font-semibold text-emerald-400">
              ${result.projectedPV.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-300">Terminal Value PV:</span>
            <span className="font-semibold text-emerald-400">
              ${result.terminalPV.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="border-t border-emerald-500/30 pt-2 flex justify-between">
            <span className="font-semibold text-slate-50">Total Enterprise Value:</span>
            <span className="text-lg font-bold text-emerald-400">
              ${result.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

