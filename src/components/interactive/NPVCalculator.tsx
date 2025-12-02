'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';

export function NPVCalculator() {
    const [investment, setInvestment] = useState(1000);
    const [cashFlow, setCashFlow] = useState(300);
    const [rate, setRate] = useState(10);
    const [years, setYears] = useState(5);
    const [npv, setNpv] = useState(0);

    useEffect(() => {
        let totalPV = -investment;
        for (let t = 1; t <= years; t++) {
            totalPV += cashFlow / Math.pow(1 + rate / 100, t);
        }
        setNpv(totalPV);
    }, [investment, cashFlow, rate, years]);

    const isPositive = npv > 0;

    return (
        <Card className="overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-100">Project NPV Analyzer</h3>
                    <div className={`rounded-full px-4 py-1 text-sm font-bold ${isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                        {isPositive ? 'ACCEPT PROJECT' : 'REJECT PROJECT'}
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-6">
                        <div>
                            <label className="mb-2 flex justify-between text-sm font-medium text-slate-400">
                                Initial Investment
                                <span className="text-slate-200">${investment}</span>
                            </label>
                            <input
                                type="range"
                                min="500"
                                max="5000"
                                step="100"
                                value={investment}
                                onChange={(e) => setInvestment(Number(e.target.value))}
                                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 flex justify-between text-sm font-medium text-slate-400">
                                Annual Cash Flow
                                <span className="text-slate-200">${cashFlow}/yr</span>
                            </label>
                            <input
                                type="range"
                                min="100"
                                max="1000"
                                step="50"
                                value={cashFlow}
                                onChange={(e) => setCashFlow(Number(e.target.value))}
                                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 flex justify-between text-sm font-medium text-slate-400">
                                Discount Rate (WACC)
                                <span className="text-slate-200">{rate}%</span>
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="20"
                                step="0.5"
                                value={rate}
                                onChange={(e) => setRate(Number(e.target.value))}
                                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 flex justify-between text-sm font-medium text-slate-400">
                                Project Duration
                                <span className="text-slate-200">{years} Years</span>
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                step="1"
                                value={years}
                                onChange={(e) => setYears(Number(e.target.value))}
                                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-emerald-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-xl bg-slate-950/50 p-6">
                        <div className="text-center">
                            <p className="mb-2 text-sm font-medium text-slate-400">Net Present Value</p>
                            <motion.div
                                key={npv}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className={`text-4xl font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}
                            >
                                ${Math.abs(npv).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </motion.div>
                            <p className={`mt-2 text-sm ${isPositive ? 'text-emerald-500/70' : 'text-rose-500/70'}`}>
                                {isPositive ? 'Profit exceeds cost of capital' : 'Loss relative to cost of capital'}
                            </p>
                        </div>

                        <div className="mt-8 flex h-32 items-end space-x-2">
                            {/* Initial Outflow */}
                            <div className="group relative flex h-full flex-col justify-end">
                                <div
                                    className="w-8 rounded-t bg-rose-500/80 transition-all hover:bg-rose-500"
                                    style={{ height: '80%' }}
                                />
                                <span className="mt-2 text-xs text-slate-500">Yr 0</span>
                                <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded bg-slate-800 px-2 py-1 text-xs text-white group-hover:block">
                                    -${investment}
                                </div>
                            </div>

                            {/* Inflows */}
                            {Array.from({ length: years }).map((_, i) => {
                                const pv = cashFlow / Math.pow(1 + rate / 100, i + 1);
                                const heightPercentage = Math.min(100, (pv / investment) * 80);

                                return (
                                    <div key={i} className="group relative flex h-full flex-col justify-end">
                                        <div
                                            className="w-8 rounded-t bg-emerald-500/80 transition-all hover:bg-emerald-500"
                                            style={{ height: `${heightPercentage}%` }}
                                        />
                                        <span className="mt-2 text-xs text-slate-500">Yr {i + 1}</span>
                                        <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded bg-slate-800 px-2 py-1 text-xs text-white group-hover:block">
                                            +${Math.round(pv)} (PV)
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
