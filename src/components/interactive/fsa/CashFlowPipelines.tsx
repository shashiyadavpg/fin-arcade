'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

export function CashFlowPipelines() {
    // Mock Data
    const flows = {
        operating: 150000,
        investing: -80000,
        financing: -30000,
    };

    const netChange = flows.operating + flows.investing + flows.financing;

    const Pipeline = ({ label, value, color }: { label: string, value: number, color: string }) => {
        const isPositive = value >= 0;

        return (
            <div className="relative mb-4 flex items-center gap-4">
                <div className="w-32 text-right text-sm font-medium text-slate-300">
                    {label}
                </div>

                {/* The Pipe */}
                <div className="relative h-12 flex-1 overflow-hidden rounded-xl bg-slate-900 border border-slate-800">
                    {/* Flow Animation */}
                    <motion.div
                        className={`absolute inset-0 opacity-30 ${color}`}
                        animate={{ x: isPositive ? ['-100%', '100%'] : ['100%', '-100%'] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    >
                        {/* Particles */}
                        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 border-t-2 border-dashed border-white/50"></div>
                    </motion.div>

                    {/* Value Label */}
                    <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-white">
                        {value > 0 ? '+' : ''}{value.toLocaleString()}
                    </div>
                </div>

                {/* Direction Indicator */}
                <div className={`text-2xl ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isPositive ? '→' : '←'}
                </div>
            </div>
        );
    };

    return (
        <Card className="border-[var(--electric-blue)]/20 bg-slate-900/80 p-6 backdrop-blur-xl">
            <div className="mb-8">
                <h3 className="text-xl font-bold text-white">Cash Flow Pipelines 🚰</h3>
                <p className="text-sm text-slate-400">Follow the money: Inflows vs Outflows</p>
            </div>

            <div className="space-y-2">
                <Pipeline
                    label="Operating Activities"
                    value={flows.operating}
                    color="bg-emerald-500"
                />
                <Pipeline
                    label="Investing Activities"
                    value={flows.investing}
                    color="bg-blue-500"
                />
                <Pipeline
                    label="Financing Activities"
                    value={flows.financing}
                    color="bg-purple-500"
                />
            </div>

            {/* Net Change Tank */}
            <div className="mt-8 flex justify-end">
                <div className="relative flex h-32 w-48 flex-col items-center justify-end overflow-hidden rounded-xl border-2 border-slate-700 bg-slate-900">
                    {/* Liquid Level */}
                    <motion.div
                        initial={{ height: '0%' }}
                        animate={{ height: '60%' }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className={`w-full ${netChange >= 0 ? 'bg-emerald-500/50' : 'bg-rose-500/50'}`}
                    >
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            className="absolute top-0 h-2 w-full bg-white/20"
                        />
                    </motion.div>

                    <div className="absolute bottom-4 text-center">
                        <div className="text-xs font-bold text-slate-300">Net Change in Cash</div>
                        <div className={`text-xl font-bold ${netChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {netChange > 0 ? '+' : ''}{netChange.toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
