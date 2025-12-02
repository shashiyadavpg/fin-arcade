'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';

type OptionType = 'call' | 'put';
type Position = 'long' | 'short';

export function OptionPayoff() {
  const [spotPrice, setSpotPrice] = useState(100);
  const [strikePrice, setStrikePrice] = useState(100);
  const [premium, setPremium] = useState(5);
  const [optionType, setOptionType] = useState<OptionType>('call');
  const [position, setPosition] = useState<Position>('long');

  const calculateProfit = (price: number) => {
    let intrinsicValue = 0;
    if (optionType === 'call') {
      intrinsicValue = Math.max(0, price - strikePrice);
    } else {
      intrinsicValue = Math.max(0, strikePrice - price);
    }

    if (position === 'long') {
      return intrinsicValue - premium;
    } else {
      return premium - intrinsicValue;
    }
  };

  const payoffData = useMemo(() => {
    const points = [];
    const range = 50;
    const start = Math.max(0, strikePrice - range);
    const end = strikePrice + range;

    for (let p = start; p <= end; p += 2) {
      points.push({ price: p, profit: calculateProfit(p) });
    }
    return points;
  }, [strikePrice, premium, optionType, position]);

  const currentProfit = calculateProfit(spotPrice);
  const maxProfit = Math.max(...payoffData.map(p => Math.abs(p.profit)));

  return (
    <Card className="overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur-sm">
      <div className="p-6">
        <h3 className="mb-6 text-xl font-bold text-slate-100">Option Strategy Visualizer</h3>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Controls */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex rounded-lg bg-slate-800 p-1">
                <button
                  onClick={() => setPosition('long')}
                  className={`rounded px-4 py-1 text-sm font-medium transition-colors ${position === 'long' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                  Long (Buy)
                </button>
                <button
                  onClick={() => setPosition('short')}
                  className={`rounded px-4 py-1 text-sm font-medium transition-colors ${position === 'short' ? 'bg-rose-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                  Short (Sell)
                </button>
              </div>

              <div className="flex rounded-lg bg-slate-800 p-1">
                <button
                  onClick={() => setOptionType('call')}
                  className={`rounded px-4 py-1 text-sm font-medium transition-colors ${optionType === 'call' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                  Call
                </button>
                <button
                  onClick={() => setOptionType('put')}
                  className={`rounded px-4 py-1 text-sm font-medium transition-colors ${optionType === 'put' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                  Put
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 flex justify-between text-sm font-medium text-slate-400">
                Strike Price
                <span className="text-slate-200">${strikePrice}</span>
              </label>
              <input
                type="range"
                min="50"
                max="150"
                value={strikePrice}
                onChange={(e) => setStrikePrice(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 flex justify-between text-sm font-medium text-slate-400">
                Option Premium
                <span className="text-slate-200">${premium}</span>
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={premium}
                onChange={(e) => setPremium(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 flex justify-between text-sm font-medium text-slate-400">
                Current Spot Price
                <span className="text-slate-200">${spotPrice}</span>
              </label>
              <input
                type="range"
                min="50"
                max="150"
                value={spotPrice}
                onChange={(e) => setSpotPrice(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-sky-500"
              />
            </div>
          </div>

          {/* Visualization */}
          <div className="flex flex-col rounded-xl bg-slate-950/50 p-6">
            <div className="mb-6 text-center">
              <p className="text-sm font-medium text-slate-400">P&L at Spot Price</p>
              <motion.div
                key={currentProfit}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className={`text-4xl font-bold ${currentProfit > 0 ? 'text-emerald-400' :
                    currentProfit < 0 ? 'text-rose-400' : 'text-slate-200'
                  }`}
              >
                {currentProfit > 0 ? '+' : ''}${currentProfit}
              </motion.div>
            </div>

            {/* Payoff Chart */}
            <div className="relative flex h-40 w-full items-center justify-center border-b border-slate-800">
              {/* Zero Line */}
              <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-700" />

              {/* Chart Bars */}
              <div className="flex h-full w-full items-center justify-between gap-0.5">
                {payoffData.map((point) => {
                  const height = Math.min(100, (Math.abs(point.profit) / maxProfit) * 45);
                  const isProfit = point.profit > 0;
                  const isSpot = Math.abs(point.price - spotPrice) < 1;

                  return (
                    <div
                      key={point.price}
                      className="group relative flex h-full w-full flex-col justify-center"
                    >
                      <div
                        className={`w-full transition-all ${isSpot ? 'bg-white z-10' :
                            isProfit ? 'bg-emerald-500/50' : 'bg-rose-500/50'
                          }`}
                        style={{
                          height: `${height}%`,
                          transform: point.profit >= 0 ? 'translateY(-50%)' : 'translateY(50%)'
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-slate-500">
              <span>${payoffData[0].price}</span>
              <span>Price</span>
              <span>${payoffData[payoffData.length - 1].price}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
