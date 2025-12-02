'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { useSound } from '@/context/SoundContext';

export function EPSVisualizer() {
    const [netIncome, setNetIncome] = useState(1000000);
    const [shares, setShares] = useState(100000);
    const [convertibleBonds, setConvertibleBonds] = useState(0); // Potential new shares
    const { playSound } = useSound();

    const basicEPS = netIncome / shares;
    const dilutedShares = shares + convertibleBonds;
    const dilutedEPS = netIncome / dilutedShares;

    const handleAddDilution = () => {
        playSound('click');
        setConvertibleBonds(prev => prev + 10000);
    };

    const handleReset = () => {
        playSound('click');
        setConvertibleBonds(0);
    };

    // Visual representation of shares (simplified as dots)
    const shareDots = Array.from({ length: Math.min(50, Math.ceil(dilutedShares / 5000)) });

    return (
        <Card className="border-[var(--electric-blue)]/20 bg-slate-900/80 p-6 backdrop-blur-xl">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-white">EPS & Dilution Visualizer 🍕</h3>
                <p className="text-sm text-slate-400">See how new shares dilute the value of existing ones</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Visuals */}
                <div className="flex flex-col items-center justify-center rounded-xl bg-slate-950/50 p-6">
                    <div className="relative flex h-48 w-48 flex-wrap content-center items-center justify-center gap-1 overflow-hidden rounded-full bg-slate-900 p-4 shadow-inner">
                        <AnimatePresence>
                            {shareDots.map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className={`h-3 w-3 rounded-full ${i < (shares / 5000) ? 'bg-[var(--electric-blue)]' : 'bg-rose-500'
                                        }`}
                                />
                            ))}
                        </AnimatePresence>

                        {/* Central EPS Value */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="rounded-xl bg-slate-900/90 px-4 py-2 text-center backdrop-blur-md">
                                <div className="text-xs text-slate-400">Diluted EPS</div>
                                <motion.div
                                    key={dilutedEPS}
                                    initial={{ scale: 1.5, color: '#fff' }}
                                    animate={{ scale: 1, color: dilutedEPS < basicEPS ? '#fb7185' : '#fff' }}
                                    className="text-2xl font-bold"
                                >
                                    ${dilutedEPS.toFixed(2)}
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex gap-4 text-xs">
                        <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-[var(--electric-blue)]"></div>
                            <span>Basic Shares</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                            <span>Dilutive Securities</span>
                        </div>
                    </div>
                </div>

                {/* Controls & Data */}
                <div className="space-y-6">
                    <div>
                        <div className="mb-2 flex justify-between text-sm">
                            <span className="text-slate-400">Net Income</span>
                            <span className="font-bold text-white">${(netIncome / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-800">
                            <div className="h-full w-full rounded-full bg-emerald-500"></div>
                        </div>
                    </div>

                    <div>
                        <div className="mb-2 flex justify-between text-sm">
                            <span className="text-slate-400">Basic Shares Outstanding</span>
                            <span className="font-bold text-white">{(shares / 1000).toFixed(0)}k</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-800">
                            <div className="h-full w-3/4 rounded-full bg-[var(--electric-blue)]"></div>
                        </div>
                    </div>

                    <div className="rounded-lg bg-rose-500/10 p-4 border border-rose-500/20">
                        <div className="mb-2 flex justify-between text-sm">
                            <span className="text-rose-300">Potential Dilution (Options/Bonds)</span>
                            <span className="font-bold text-rose-400">{(convertibleBonds / 1000).toFixed(0)}k</span>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleAddDilution}
                                className="flex-1 rounded-lg bg-rose-500 px-3 py-2 text-sm font-bold text-white hover:bg-rose-600 active:scale-95"
                            >
                                + Issue Options
                            </button>
                            <button
                                onClick={handleReset}
                                className="rounded-lg bg-slate-700 px-3 py-2 text-sm font-bold text-white hover:bg-slate-600"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between border-t border-slate-800 pt-4">
                        <div>
                            <div className="text-xs text-slate-500">Basic EPS</div>
                            <div className="text-xl font-bold text-emerald-400">${basicEPS.toFixed(2)}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-slate-500">Diluted EPS</div>
                            <div className="text-xl font-bold text-rose-400">${dilutedEPS.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
