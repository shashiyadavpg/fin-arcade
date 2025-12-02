'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

const INCOME_STATEMENT = [
    { label: 'Revenue', value: 1000000, type: 'base' },
    { label: 'Cost of Goods Sold', value: 600000, type: 'expense' },
    { label: 'Gross Profit', value: 400000, type: 'subtotal' },
    { label: 'R&D Expenses', value: 150000, type: 'expense' },
    { label: 'SG&A Expenses', value: 100000, type: 'expense' },
    { label: 'Operating Income', value: 150000, type: 'subtotal' },
    { label: 'Interest & Taxes', value: 50000, type: 'expense' },
    { label: 'Net Income', value: 100000, type: 'total' },
];

export function VerticalHeatmap() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const revenue = INCOME_STATEMENT[0].value;

    const getIntensityColor = (percentage: number, type: string) => {
        if (type === 'base') return 'bg-slate-700';
        if (type === 'subtotal' || type === 'total') return 'bg-slate-800';

        // Heatmap logic: Higher % of revenue = "Hotter" (Red/Orange) for expenses
        // Lower % = "Cooler" (Green/Blue)
        if (percentage > 50) return 'bg-rose-600';
        if (percentage > 25) return 'bg-orange-500';
        if (percentage > 10) return 'bg-yellow-500';
        return 'bg-emerald-500';
    };

    return (
        <Card className="border-[var(--electric-blue)]/20 bg-slate-900/80 p-6 backdrop-blur-xl">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-white">Vertical Analysis Heatmap 🔥</h3>
                <p className="text-sm text-slate-400">Visualizing expenses as a percentage of Revenue</p>
            </div>

            <div className="space-y-2">
                {INCOME_STATEMENT.map((item, index) => {
                    const percentage = (item.value / revenue) * 100;
                    const isHovered = hoveredIndex === index;
                    const colorClass = getIntensityColor(percentage, item.type);

                    return (
                        <motion.div
                            key={item.label}
                            onHoverStart={() => setHoveredIndex(index)}
                            onHoverEnd={() => setHoveredIndex(null)}
                            className="relative overflow-hidden rounded-lg bg-slate-950/50 p-3"
                        >
                            {/* Background Heatmap Bar */}
                            <motion.div
                                className={`absolute inset-y-0 left-0 opacity-20 ${colorClass}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />

                            <div className="relative z-10 flex items-center justify-between">
                                <span className={`font-medium ${item.type === 'total' ? 'text-xl text-white' : 'text-slate-300'}`}>
                                    {item.label}
                                </span>

                                <div className="flex items-center gap-4">
                                    <span className="text-slate-400">${(item.value / 1000).toFixed(0)}k</span>
                                    <motion.span
                                        className={`w-16 text-right font-bold ${item.type === 'expense' ? 'text-rose-400' : 'text-emerald-400'
                                            }`}
                                        animate={{ scale: isHovered ? 1.1 : 1 }}
                                    >
                                        {percentage.toFixed(1)}%
                                    </motion.span>
                                </div>
                            </div>

                            {/* Glow Ripple on Hover */}
                            {isHovered && (
                                <motion.div
                                    layoutId="glow"
                                    className="absolute inset-0 z-0 bg-white/5"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>

            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-emerald-500"></div> &lt;10%</div>
                <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-yellow-500"></div> 10-25%</div>
                <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-orange-500"></div> 25-50%</div>
                <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-rose-600"></div> &gt;50%</div>
            </div>
        </Card>
    );
}
