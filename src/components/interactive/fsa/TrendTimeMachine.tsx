'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { useSound } from '@/context/SoundContext';

// Mock Historical Data
const HISTORY = [
    { year: 2018, revenue: 800000, netIncome: 100000, margin: 12.5 },
    { year: 2019, revenue: 950000, netIncome: 140000, margin: 14.7 },
    { year: 2020, revenue: 850000, netIncome: 90000, margin: 10.5 }, // Dip
    { year: 2021, revenue: 1100000, netIncome: 180000, margin: 16.3 }, // Recovery
    { year: 2022, revenue: 1300000, netIncome: 220000, margin: 16.9 },
    { year: 2023, revenue: 1450000, netIncome: 250000, margin: 17.2 },
    { year: 2024, revenue: 1600000, netIncome: 280000, margin: 17.5 },
];

export function TrendTimeMachine() {
    const [selectedYear, setSelectedYear] = useState(2024);
    const { playSound } = useSound();

    const currentIndex = HISTORY.findIndex(h => h.year === selectedYear);
    const currentData = HISTORY[currentIndex];

    // Calculate growth from previous year
    const prevData = currentIndex > 0 ? HISTORY[currentIndex - 1] : null;
    const growth = prevData
        ? ((currentData.revenue - prevData.revenue) / prevData.revenue) * 100
        : 0;

    const handleYearChange = (year: number) => {
        setSelectedYear(year);
        playSound('hover'); // Subtle click sound on slide
    };

    const maxRevenue = Math.max(...HISTORY.map(h => h.revenue));

    return (
        <Card className="border-[var(--electric-blue)]/20 bg-slate-900/80 p-6 backdrop-blur-xl">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-white">Trend Time Machine ⏳</h3>
                    <p className="text-sm text-slate-400">Scrub through time to see performance evolution</p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold text-[var(--electric-blue)]">{selectedYear}</div>
                    <motion.div
                        key={selectedYear}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-sm font-bold ${growth >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}
                    >
                        {growth > 0 ? '+' : ''}{growth.toFixed(1)}% YoY
                    </motion.div>
                </div>
            </div>

            {/* Chart Area */}
            <div className="relative mb-8 h-64 w-full rounded-xl bg-slate-950/50 p-4">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-10">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-px w-full bg-white"></div>
                    ))}
                </div>

                {/* The Line Chart (SVG) */}
                <svg className="h-full w-full overflow-visible" preserveAspectRatio="none">
                    {/* Revenue Line */}
                    <motion.path
                        d={`M ${HISTORY.map((d, i) => {
                            const x = (i / (HISTORY.length - 1)) * 100;
                            const y = 100 - (d.revenue / maxRevenue) * 100;
                            return `${x}% ${y}%`;
                        }).join(' L ')}`}
                        fill="none"
                        stroke="var(--electric-blue)"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />

                    {/* Net Income Line (Scaled up for visibility) */}
                    <motion.path
                        d={`M ${HISTORY.map((d, i) => {
                            const x = (i / (HISTORY.length - 1)) * 100;
                            const y = 100 - (d.netIncome / (maxRevenue * 0.25)) * 100; // Scale factor
                            return `${x}% ${y}%`;
                        }).join(' L ')}`}
                        fill="none"
                        stroke="var(--neon-purple)"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                    />

                    {/* Active Year Point Indicator */}
                    {HISTORY.map((d, i) => {
                        const isSelected = d.year === selectedYear;
                        const x = (i / (HISTORY.length - 1)) * 100;
                        const y = 100 - (d.revenue / maxRevenue) * 100;

                        return (
                            <g key={d.year}>
                                {isSelected && (
                                    <motion.circle
                                        cx={`${x}%`}
                                        cy={`${y}%`}
                                        r="6"
                                        fill="var(--electric-blue)"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [1, 1.5, 1] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    />
                                )}
                                <circle
                                    cx={`${x}%`}
                                    cy={`${y}%`}
                                    r="4"
                                    fill={isSelected ? "white" : "var(--electric-blue)"}
                                    className="cursor-pointer transition-colors hover:fill-white"
                                    onClick={() => handleYearChange(d.year)}
                                />
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* Timeline Slider */}
            <div className="relative px-2">
                <input
                    type="range"
                    min="2018"
                    max="2024"
                    step="1"
                    value={selectedYear}
                    onChange={(e) => handleYearChange(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-[var(--electric-blue)]"
                />
                <div className="mt-2 flex justify-between text-xs text-slate-500">
                    {HISTORY.map(h => (
                        <span
                            key={h.year}
                            className={`cursor-pointer transition-colors ${h.year === selectedYear ? 'font-bold text-white' : 'hover:text-slate-300'}`}
                            onClick={() => handleYearChange(h.year)}
                        >
                            {h.year}
                        </span>
                    ))}
                </div>
            </div>

            {/* Data Cards for Selected Year */}
            <div className="mt-8 grid grid-cols-3 gap-4">
                <motion.div
                    key={`rev-${selectedYear}`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="rounded-xl bg-[var(--electric-blue)]/10 p-4 border border-[var(--electric-blue)]/20"
                >
                    <div className="text-xs text-[var(--electric-blue)]">Revenue</div>
                    <div className="text-xl font-bold text-white">${(currentData.revenue / 1000).toFixed(0)}k</div>
                </motion.div>

                <motion.div
                    key={`ni-${selectedYear}`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-xl bg-[var(--neon-purple)]/10 p-4 border border-[var(--neon-purple)]/20"
                >
                    <div className="text-xs text-[var(--neon-purple)]">Net Income</div>
                    <div className="text-xl font-bold text-white">${(currentData.netIncome / 1000).toFixed(0)}k</div>
                </motion.div>

                <motion.div
                    key={`mar-${selectedYear}`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-xl bg-[var(--laser-pink)]/10 p-4 border border-[var(--laser-pink)]/20"
                >
                    <div className="text-xs text-[var(--laser-pink)]">Net Margin</div>
                    <div className="text-xl font-bold text-white">{currentData.margin}%</div>
                </motion.div>
            </div>
        </Card>
    );
}
