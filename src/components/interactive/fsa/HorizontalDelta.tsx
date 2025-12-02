'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { useSound } from '@/context/SoundContext';

interface YearData {
    revenue: number;
    cogs: number;
    opex: number;
    netIncome: number;
}

const BASE_YEAR: YearData = {
    revenue: 1000000,
    cogs: 600000,
    opex: 250000,
    netIncome: 150000,
};

export function HorizontalDelta() {
    const [currentYear, setCurrentYear] = useState<YearData>({ ...BASE_YEAR });
    const [isShocked, setIsShocked] = useState(false);
    const { playSound } = useSound();

    const handleShock = () => {
        playSound('click');
        setIsShocked(true);

        // Randomize current year data to simulate a shock (positive or negative)
        const shockFactor = () => 0.7 + Math.random() * 0.6; // 0.7x to 1.3x

        setCurrentYear({
            revenue: Math.round(BASE_YEAR.revenue * shockFactor()),
            cogs: Math.round(BASE_YEAR.cogs * shockFactor()),
            opex: Math.round(BASE_YEAR.opex * shockFactor()),
            netIncome: 0, // Recalculated below
        });

        // Recalc net income after shock
        setTimeout(() => {
            setCurrentYear(prev => ({
                ...prev,
                netIncome: prev.revenue - prev.cogs - prev.opex
            }));
        }, 100);

        // Reset shock state after animation
        setTimeout(() => setIsShocked(false), 500);
    };

    const handleReset = () => {
        playSound('click');
        setCurrentYear({ ...BASE_YEAR });
    };

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

    const DeltaRow = ({ label, base, current }: { label: string, base: number, current: number }) => {
        const delta = current - base;
        const percentChange = ((delta / base) * 100).toFixed(1);
        const isPositive = delta >= 0;

        return (
            <div className="mb-6">
                <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-400">{label}</span>
                    <div className="flex gap-4">
                        <span className="text-slate-500">{formatCurrency(base)}</span>
                        <span className="text-white">→</span>
                        <span className="font-bold text-white">{formatCurrency(current)}</span>
                    </div>
                </div>

                <div className="relative flex h-10 items-center rounded-lg bg-slate-900/50 px-4">
                    {/* Center Line */}
                    <div className="absolute left-1/2 h-full w-px bg-slate-700"></div>

                    {/* Delta Bar */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{
                            width: `${Math.min(45, Math.abs(Number(percentChange)))}%`,
                            x: isPositive ? 0 : '-100%',
                            left: '50%'
                        }}
                        transition={{ type: "spring", stiffness: 120, damping: 12 }}
                        className={`absolute h-6 rounded ${isPositive
                                ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                                : 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                            }`}
                    >
                        {/* Vibration effect for negative deltas */}
                        {!isPositive && (
                            <motion.div
                                animate={{ x: [-2, 2, -2, 2, 0] }}
                                transition={{ duration: 0.4, repeat: isShocked ? 2 : 0 }}
                                className="h-full w-full"
                            />
                        )}
                    </motion.div>

                    {/* Label on top of bar */}
                    <motion.span
                        className={`absolute z-10 text-xs font-bold ${isPositive ? 'left-[52%] text-emerald-400' : 'right-[52%] text-rose-400'
                            }`}
                    >
                        {delta > 0 ? '+' : ''}{percentChange}%
                    </motion.span>
                </div>
            </div>
        );
    };

    return (
        <Card className="border-[var(--electric-blue)]/20 bg-slate-900/80 p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Horizontal Analysis ↔️</h3>
                <div className="flex gap-2">
                    <button
                        onClick={handleShock}
                        className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${isShocked
                                ? 'bg-rose-500 text-white scale-95'
                                : 'bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white'
                            }`}
                    >
                        ⚡ Shock Market
                    </button>
                    <button
                        onClick={handleReset}
                        className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-bold text-slate-400 hover:bg-slate-700 hover:text-white"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                <div className="text-right pr-8">Base Year (2023)</div>
                <div className="pl-8">Current Year (2024)</div>
            </div>

            <DeltaRow label="Revenue" base={BASE_YEAR.revenue} current={currentYear.revenue} />
            <DeltaRow label="Cost of Goods Sold" base={BASE_YEAR.cogs} current={currentYear.cogs} />
            <DeltaRow label="Operating Expenses" base={BASE_YEAR.opex} current={currentYear.opex} />
            <DeltaRow label="Net Income" base={BASE_YEAR.netIncome} current={currentYear.netIncome} />

            <div className="mt-4 text-center text-sm text-slate-500">
                Horizontal analysis compares financial data over time to identify trends and growth patterns.
            </div>
        </Card>
    );
}
