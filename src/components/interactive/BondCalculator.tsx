'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';

export function BondCalculator() {
  const [faceValue, setFaceValue] = useState(1000);
  const [couponRate, setCouponRate] = useState(5);
  const [ytm, setYtm] = useState(5);
  const [years, setYears] = useState(10);

  const result = useMemo(() => {
    const couponPayment = faceValue * (couponRate / 100);
    let price = 0;

    // PV of Coupons
    for (let t = 1; t <= years; t++) {
      price += couponPayment / Math.pow(1 + ytm / 100, t);
    }

    // PV of Face Value
    price += faceValue / Math.pow(1 + ytm / 100, years);

    const duration = 0; // Simplified for now, could add Macaulay Duration later

    return {
      price,
      couponPayment,
      isDiscount: price < faceValue,
      isPremium: price > faceValue,
    };
  }, [faceValue, couponRate, ytm, years]);

  // Generate data for Price-Yield Curve
  const yieldCurve = useMemo(() => {
    const points = [];
    for (let r = 0; r <= 15; r += 1) {
      let p = 0;
      const c = faceValue * (couponRate / 100);
      for (let t = 1; t <= years; t++) {
        p += c / Math.pow(1 + r / 100, t);
      }
      p += faceValue / Math.pow(1 + r / 100, years);
      points.push({ yield: r, price: p });
    }
    return points;
  }, [faceValue, couponRate, years]);

  const maxPrice = Math.max(...yieldCurve.map(p => p.price));

  return (
    <Card className="overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur-sm">
      <div className="p-6">
        <h3 className="mb-6 text-xl font-bold text-slate-100">Bond Pricing & Yields</h3>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Controls */}
          <div className="space-y-6">
            <div>
              <label className="mb-2 flex justify-between text-sm font-medium text-slate-400">
                Face Value
                <span className="text-slate-200">${faceValue}</span>
              </label>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={faceValue}
                onChange={(e) => setFaceValue(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 flex justify-between text-sm font-medium text-slate-400">
                Coupon Rate
                <span className="text-slate-200">{couponRate}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="15"
                step="0.5"
                value={couponRate}
                onChange={(e) => setCouponRate(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 flex justify-between text-sm font-medium text-slate-400">
                Yield to Maturity (YTM)
                <span className="text-slate-200">{ytm}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="15"
                step="0.5"
                value={ytm}
                onChange={(e) => setYtm(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 flex justify-between text-sm font-medium text-slate-400">
                Years to Maturity
                <span className="text-slate-200">{years} Years</span>
              </label>
              <input
                type="range"
                min="1"
                max="30"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-sky-500"
              />
            </div>
          </div>

          {/* Visualization */}
          <div className="flex flex-col rounded-xl bg-slate-950/50 p-6">
            <div className="mb-6 text-center">
              <p className="text-sm font-medium text-slate-400">Bond Price</p>
              <motion.div
                key={result.price}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className={`text-4xl font-bold ${result.isPremium ? 'text-emerald-400' :
                    result.isDiscount ? 'text-rose-400' : 'text-slate-200'
                  }`}
              >
                ${result.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </motion.div>
              <p className="mt-2 text-sm text-slate-500">
                Trading at {result.isPremium ? 'Premium' : result.isDiscount ? 'Discount' : 'Par'}
              </p>
            </div>

            {/* Price-Yield Curve Visualization */}
            <div className="relative flex h-40 w-full items-end justify-between gap-1 px-4">
              {yieldCurve.map((point) => (
                <div
                  key={point.yield}
                  className="group relative flex w-full flex-col justify-end"
                >
                  <div
                    className={`w-full rounded-t transition-all ${point.yield === ytm ? 'bg-sky-400' : 'bg-slate-800 hover:bg-slate-700'
                      }`}
                    style={{ height: `${(point.price / maxPrice) * 100}%` }}
                  />
                  {point.yield % 5 === 0 && (
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-500">
                      {point.yield}%
                    </span>
                  )}
                </div>
              ))}
              <div className="absolute -bottom-6 left-0 right-0 text-center text-xs font-medium text-slate-600">
                Yield (%)
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
