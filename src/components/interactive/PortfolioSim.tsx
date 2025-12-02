'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';

export function PortfolioSim() {
    const [initialInvestment, setInitialInvestment] = useState(10000);
    const [monthlyContribution, setMonthlyContribution] = useState(500);
    const [years, setYears] = useState(20);
    const [returnRate, setReturnRate] = useState(8);
    const [etfFee, setEtfFee] = useState(0.08); // 0.08%
    const [fundFee, setFundFee] = useState(1.5); // 1.5%

    const result = useMemo(() => {
        let etfBalance = initialInvestment;
        let fundBalance = initialInvestment;
        const data = [];

        for (let y = 1; y <= years; y++) {
            // Add contributions and apply returns/fees annually (simplified)
            const contribution = monthlyContribution * 12;

            // ETF
            etfBalance += contribution;
            etfBalance = etfBalance * (1 + (returnRate - etfFee) / 100);

            // Mutual Fund
            fundBalance += contribution;
            fundBalance = fundBalance * (1 + (returnRate - fundFee) / 100);

            data.push({ year: y, etf: etfBalance, fund: fundBalance });
        }

        return {
            finalEtf: etfBalance,
            finalFund: fundBalance,
            difference: etfBalance - fundBalance,
            data,
        };
    }, [initialInvestment, monthlyContribution, years, returnRate, etfFee, fundFee]);

    const maxBalance = result.finalEtf;

    return (
        <Card className="overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <div className="p-6">
                <h3 className="mb-6 text-xl font-bold text-slate-100">The Cost of Fees: ETF vs Mutual Fund</h3>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Controls */}
                    <div className="space-y-6">
                        <div>
                            <label className="mb-2 flex justify-between text-sm font-medium text-slate-400">
                                Initial Investment
                                <span className="text-slate-200">${initialInvestment.toLocaleString()}</span>
                            </label>
                            <input
                                type="range"
                                min="1000"
                                max="100000"
                                step="1000"
                                value={initialInvestment}
                                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 flex justify-between text-sm font-medium text-slate-400">
                                Monthly Contribution
                                <span className="text-slate-200">${monthlyContribution}</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="5000"
                                step="100"
                                value={monthlyContribution}
                                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 flex justify-between text-sm font-medium text-slate-400">
                                Investment Period
                                <span className="text-slate-200">{years} Years</span>
                            </label>
                            <input
                                type="range"
                                min="5"
                                max="40"
                                value={years}
                                onChange={(e) => setYears(Number(e.target.value))}
                                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-emerald-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-400">
                                    ETF Fee (%)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={etfFee}
                                    onChange={(e) => setEtfFee(Number(e.target.value))}
                                    className="w-full rounded bg-slate-800 px-3 py-2 text-slate-200"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-400">
                                    Fund Fee (%)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={fundFee}
                                    onChange={(e) => setFundFee(Number(e.target.value))}
                                    className="w-full rounded bg-slate-800 px-3 py-2 text-slate-200"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Visualization */}
                    <div className="flex flex-col rounded-xl bg-slate-950/50 p-6">
                        <div className="mb-6 text-center">
                            <p className="text-sm font-medium text-slate-400">Lost to Fees</p>
                            <motion.div
                                key={result.difference}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className="text-4xl font-bold text-rose-400"
                            >
                                ${result.difference.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </motion.div>
                            <p className="mt-2 text-xs text-slate-500">
                                Difference in final portfolio value
                            </p>
                        </div>

                        <div className="flex flex-1 items-end justify-between gap-4 px-4">
                            {/* ETF Bar */}
                            <div className="group relative flex w-full flex-col justify-end">
                                <div
                                    className="w-full rounded-t bg-emerald-500 transition-all"
                                    style={{ height: '100%' }}
                                />
                                <span className="mt-2 text-center text-xs text-slate-500">ETF</span>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white">
                                    ${(result.finalEtf / 1000).toFixed(0)}k
                                </div>
                            </div>

                            {/* Fund Bar */}
                            <div className="group relative flex w-full flex-col justify-end">
                                <div
                                    className="w-full rounded-t bg-amber-500 transition-all"
                                    style={{ height: `${(result.finalFund / maxBalance) * 100}%` }}
                                />
                                <span className="mt-2 text-center text-xs text-slate-500">Mutual Fund</span>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white">
                                    ${(result.finalFund / 1000).toFixed(0)}k
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
