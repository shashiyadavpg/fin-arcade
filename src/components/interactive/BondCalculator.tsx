'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';

export function BondCalculator() {
  const [faceValue, setFaceValue] = useState(1000);
  const [couponRate, setCouponRate] = useState(5);
  const [yearsToMaturity, setYearsToMaturity] = useState(10);
  const [marketRate, setMarketRate] = useState(5);
  const [couponFrequency, setCouponFrequency] = useState(2); // semiannual

  const couponPayment = (faceValue * couponRate) / 100 / couponFrequency;
  const periods = yearsToMaturity * couponFrequency;
  const periodRate = marketRate / 100 / couponFrequency;

  const calculateBondPrice = () => {
    // Present value of coupon payments
    let pvCoupons = 0;
    for (let i = 1; i <= periods; i++) {
      pvCoupons += couponPayment / Math.pow(1 + periodRate, i);
    }

    // Present value of face value
    const pvFace = faceValue / Math.pow(1 + periodRate, periods);

    return pvCoupons + pvFace;
  };

  const bondPrice = calculateBondPrice();
  const ytm = marketRate; // Simplified - actual YTM calculation is iterative
  const duration = yearsToMaturity; // Simplified duration

  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold">Bond Price & Yield Calculator</h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-300">Bond Parameters</h4>
          
          <div>
            <label className="mb-2 block text-sm text-slate-400">Face Value ($)</label>
            <input
              type="number"
              value={faceValue}
              onChange={(e) => setFaceValue(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-50"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Coupon Rate (%): {couponRate}%
            </label>
            <input
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={couponRate}
              onChange={(e) => setCouponRate(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Years to Maturity: {yearsToMaturity}
            </label>
            <input
              type="range"
              min="1"
              max="30"
              value={yearsToMaturity}
              onChange={(e) => setYearsToMaturity(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Market Interest Rate (%): {marketRate}%
            </label>
            <input
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={marketRate}
              onChange={(e) => setMarketRate(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-400">Coupon Frequency</label>
            <select
              value={couponFrequency}
              onChange={(e) => setCouponFrequency(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-50"
            >
              <option value={1}>Annual</option>
              <option value={2}>Semiannual</option>
              <option value={4}>Quarterly</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-slate-300">Bond Valuation</h4>
          
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
            <p className="mb-1 text-sm text-emerald-300">Bond Price</p>
            <p className="text-2xl font-bold">${bondPrice.toFixed(2)}</p>
            <p className="mt-2 text-xs text-slate-400">
              {bondPrice > faceValue ? 'Premium bond (rate < market)' :
               bondPrice < faceValue ? 'Discount bond (rate > market)' :
               'Par bond (rate = market)'}
            </p>
          </div>

          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-4">
            <p className="mb-1 text-sm text-cyan-300">Yield to Maturity (YTM)</p>
            <p className="text-2xl font-bold">{ytm.toFixed(2)}%</p>
            <p className="mt-1 text-xs text-slate-400">Approximate YTM</p>
          </div>

          <div className="rounded-lg border border-sky-500/30 bg-sky-500/10 p-4">
            <p className="mb-1 text-sm text-sky-300">Annual Coupon Payment</p>
            <p className="text-2xl font-bold">${(couponPayment * couponFrequency).toFixed(2)}</p>
            <p className="mt-1 text-xs text-slate-400">
              ${couponPayment.toFixed(2)} per period
            </p>
          </div>

          <div className="rounded-lg border border-fuchsia-500/30 bg-fuchsia-500/10 p-4">
            <p className="mb-1 text-sm text-fuchsia-300">Duration</p>
            <p className="text-2xl font-bold">{duration.toFixed(1)} years</p>
            <p className="mt-1 text-xs text-slate-400">Simplified Macaulay duration</p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-slate-900/50 p-4 text-xs text-slate-400">
        <p className="mb-2 font-semibold text-slate-300">Price-Yield Relationship:</p>
        <p>When market rate &gt; coupon rate: Bond trades at discount</p>
        <p>When market rate &lt; coupon rate: Bond trades at premium</p>
        <p>When market rate = coupon rate: Bond trades at par</p>
      </div>
    </Card>
  );
}

