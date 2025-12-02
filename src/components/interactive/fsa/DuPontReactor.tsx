'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { useSound } from '@/context/SoundContext';

export function DuPontReactor() {
    const [margin, setMargin] = useState(10); // Net Profit Margin %
    const [turnover, setTurnover] = useState(1.5); // Asset Turnover (times)
    const [leverage, setLeverage] = useState(2.0); // Financial Leverage (multiplier)
    const { playSound } = useSound();

    const roe = margin * turnover * leverage;

    // Gear Animation Component
    const Gear = ({ speed, size, color, label, value, suffix = '' }: any) => (
        <div className="flex flex-col items-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10 / speed, ease: "linear" }}
                className={`relative flex items-center justify-center rounded-full border-4 border-dashed ${color} ${size}`}
            >
                <div className="absolute h-2 w-2 rounded-full bg-white"></div>
            </motion.div>
            <div className="mt-2 text-center">
                <div className={`text-lg font-bold ${color.replace('border-', 'text-')}`}>
                    {value}{suffix}
                </div>
                <div className="text-xs text-slate-400">{label}</div>
            </div>
        </div>
    );

    const handleSliderChange = (setter: any, val: number) => {
        setter(val);
        // Play sound only occasionally or it gets annoying, maybe on mouse up?
        // For now, just silent or very subtle tick could work, but let's leave it clean.
    };

    return (
        <Card className="border-[var(--electric-blue)]/20 bg-slate-900/80 p-6 backdrop-blur-xl">
            <div className="mb-8">
                <h3 className="text-xl font-bold text-white">DuPont ROE Reactor ☢️</h3>
                <p className="text-sm text-slate-400">Adjust the levers to see how ROE is generated</p>
            </div>

            {/* The Reactor Core (Visuals) */}
            <div className="mb-8 flex items-center justify-center gap-4 md:gap-8">
                <Gear
                    speed={margin / 5}
                    size="h-20 w-20"
                    color="border-emerald-500"
                    label="Profit Margin"
                    value={margin}
                    suffix="%"
                />
                <div className="text-2xl text-slate-600">×</div>
                <Gear
                    speed={turnover}
                    size="h-20 w-20"
                    color="border-cyan-500"
                    label="Asset Turnover"
                    value={turnover}
                    suffix="x"
                />
                <div className="text-2xl text-slate-600">×</div>
                <Gear
                    speed={leverage}
                    size="h-24 w-24"
                    color="border-rose-500"
                    label="Fin. Leverage"
                    value={leverage}
                    suffix="x"
                />
                <div className="text-2xl text-slate-600">=</div>

                {/* ROE Output */}
                <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full border-4 border-[var(--neon-purple)] bg-[var(--neon-purple)]/10 shadow-[0_0_30px_var(--neon-purple)]">
                    <motion.div
                        key={roe}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-3xl font-bold text-white"
                    >
                        {roe.toFixed(1)}%
                    </motion.div>
                    <div className="text-xs font-bold text-[var(--neon-purple)]">ROE</div>

                    {/* Steam/Particle Effect (Simple CSS animation for now) */}
                    <motion.div
                        animate={{ opacity: [0, 0.5, 0], y: -20 }}
                        transition={{ repeat: Infinity, duration: 2 - (roe / 50) }} // Faster steam for higher ROE
                        className="absolute -top-4 h-8 w-8 rounded-full bg-white/20 blur-xl"
                    />
                </div>
            </div>

            {/* Controls */}
            <div className="space-y-6 rounded-xl bg-slate-950/50 p-6">
                <div>
                    <div className="mb-2 flex justify-between text-sm">
                        <span className="text-emerald-400">Net Profit Margin</span>
                        <span className="text-white">{margin}%</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="30"
                        step="0.5"
                        value={margin}
                        onChange={(e) => handleSliderChange(setMargin, Number(e.target.value))}
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-emerald-500"
                    />
                </div>

                <div>
                    <div className="mb-2 flex justify-between text-sm">
                        <span className="text-cyan-400">Asset Turnover</span>
                        <span className="text-white">{turnover}x</span>
                    </div>
                    <input
                        type="range"
                        min="0.1"
                        max="5"
                        step="0.1"
                        value={turnover}
                        onChange={(e) => handleSliderChange(setTurnover, Number(e.target.value))}
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-cyan-500"
                    />
                </div>

                <div>
                    <div className="mb-2 flex justify-between text-sm">
                        <span className="text-rose-400">Financial Leverage (Multiplier)</span>
                        <span className="text-white">{leverage}x</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        step="0.1"
                        value={leverage}
                        onChange={(e) => handleSliderChange(setLeverage, Number(e.target.value))}
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-rose-500"
                    />
                    <p className="mt-1 text-xs text-slate-500">
                        Warning: Higher leverage increases risk!
                    </p>
                </div>
            </div>
        </Card>
    );
}
