'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';

export function OptionPayoff() {
  const [optionType, setOptionType] = useState<'call' | 'put'>('call');
  const [strike, setStrike] = useState(100);
  const [premium, setPremium] = useState(5);
  const [currentPrice, setCurrentPrice] = useState(100);

  const calculatePayoff = (stockPrice: number): number => {
    if (optionType === 'call') {
      return Math.max(0, stockPrice - strike) - premium;
    } else {
      return Math.max(0, strike - stockPrice) - premium;
    }
  };

  const prices = Array.from({ length: 201 }, (_, i) => i);
  const payoffs = prices.map(p => calculatePayoff(p));

  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold">Option Payoff Calculator</h3>
      
      <div className="mb-6 space-y-4">
        <div>
          <label className="mb-2 block text-sm text-slate-300">Option Type</label>
          <div className="flex gap-2">
            <button
              onClick={() => setOptionType('call')}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                optionType === 'call'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Call Option
            </button>
            <button
              onClick={() => setOptionType('put')}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                optionType === 'put'
                  ? 'bg-fuchsia-500 text-slate-950'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Put Option
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Strike Price: ${strike}
          </label>
          <input
            type="range"
            min="50"
            max="150"
            value={strike}
            onChange={(e) => setStrike(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Premium Paid: ${premium}
          </label>
          <input
            type="range"
            min="0"
            max="20"
            value={premium}
            onChange={(e) => setPremium(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Current Stock Price: ${currentPrice}
          </label>
          <input
            type="range"
            min="50"
            max="150"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Simple Payoff Visualization */}
      <div className="space-y-4">
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-slate-400">Current Payoff</span>
            <span className={`font-semibold ${
              calculatePayoff(currentPrice) >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}>
              ${calculatePayoff(currentPrice).toFixed(2)}
            </span>
          </div>
          <div className="h-32 relative border-t border-l border-slate-700">
            {/* X-axis */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-700" />
            {/* Y-axis */}
            <div className="absolute bottom-0 left-0 top-0 w-px bg-slate-700" />
            {/* Zero line */}
            <div className="absolute bottom-1/2 left-0 right-0 h-px bg-slate-600 opacity-50" />
            {/* Payoff line */}
            <svg className="absolute inset-0 h-full w-full">
              <polyline
                points={prices.map((p, i) => `${(i / prices.length) * 100}% ${50 - (payoffs[i] / Math.max(...payoffs.map(Math.abs), 1)) * 40}%`).join(', ')}
                fill="none"
                stroke={optionType === 'call' ? '#34d399' : '#f472b6'}
                strokeWidth="2"
              />
            </svg>
            {/* Current price marker */}
            <div
              className="absolute bottom-0 top-0 w-1 bg-white"
              style={{ left: `${((currentPrice - 50) / 100) * 100}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-slate-500">
            <span>$50</span>
            <span>${strike}</span>
            <span>$150</span>
          </div>
        </div>

        <div className="rounded-lg bg-slate-900/50 p-3 text-xs text-slate-400">
          <p>
            <strong className="text-slate-300">Formula:</strong> Profit = Max(0, {optionType === 'call' ? 'Stock Price - Strike' : 'Strike - Stock Price'}) - Premium
          </p>
        </div>
      </div>
    </Card>
  );
}

