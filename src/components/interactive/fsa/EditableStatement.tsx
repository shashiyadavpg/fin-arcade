'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { IncomeStatement } from '@/types/financial';
import { useSound } from '@/context/SoundContext';

interface EditableStatementProps {
    initialData: IncomeStatement;
    onUpdate: (data: IncomeStatement) => void;
}

export function EditableStatement({ initialData, onUpdate }: EditableStatementProps) {
    const [data, setData] = useState(initialData);
    const [activeField, setActiveField] = useState<keyof IncomeStatement | null>(null);
    const { playSound } = useSound();

    // Recalculate derived values when drivers change
    useEffect(() => {
        const grossProfit = data.revenue - data.cogs;
        const operatingIncome = grossProfit - data.operatingExpenses;
        const netIncome = operatingIncome - data.interestExpense - data.taxes;

        if (
            grossProfit !== data.grossProfit ||
            operatingIncome !== data.operatingIncome ||
            netIncome !== data.netIncome
        ) {
            const newData = {
                ...data,
                grossProfit,
                operatingIncome,
                netIncome,
            };
            setData(newData);
            onUpdate(newData);
        }
    }, [data.revenue, data.cogs, data.operatingExpenses, data.interestExpense, data.taxes]);

    const handleValueChange = (key: keyof IncomeStatement, value: number) => {
        setData(prev => ({ ...prev, [key]: value }));
        playSound('click');
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(val);
    };

    const LineItem = ({
        label,
        fieldKey,
        isTotal = false,
        indent = false
    }: {
        label: string;
        fieldKey: keyof IncomeStatement;
        isTotal?: boolean;
        indent?: boolean;
    }) => {
        const value = data[fieldKey];
        const isEditing = activeField === fieldKey;

        return (
            <motion.div
                layout
                className={`relative flex items-center justify-between py-3 ${isTotal ? 'border-t border-slate-700 font-bold' : 'border-b border-slate-800/50'
                    }`}
            >
                <span className={`${indent ? 'pl-6 text-slate-400' : 'text-slate-200'}`}>
                    {label}
                </span>

                <div className="flex items-center gap-4">
                    {/* Visual Bar Representation */}
                    <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-slate-800 sm:block">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, (value / data.revenue) * 100)}%` }}
                            transition={{ type: "spring", stiffness: 100, damping: 15 }}
                            className={`h-full ${isTotal ? 'bg-emerald-500' : 'bg-[var(--electric-blue)]'}`}
                        />
                    </div>

                    {/* Value Display / Input */}
                    {isEditing && !isTotal ? (
                        <input
                            type="number"
                            autoFocus
                            value={value}
                            onChange={(e) => handleValueChange(fieldKey, Number(e.target.value))}
                            onBlur={() => setActiveField(null)}
                            className="w-32 rounded bg-slate-800 px-2 py-1 text-right font-mono text-white outline-none ring-2 ring-[var(--electric-blue)]"
                        />
                    ) : (
                        <motion.button
                            key={value} // Trigger animation on value change
                            initial={{ scale: 1.1, color: '#fff' }}
                            animate={{ scale: 1, color: isTotal ? '#34d399' : '#94a3b8' }}
                            onClick={() => !isTotal && setActiveField(fieldKey)}
                            className={`w-32 text-right font-mono transition-colors ${!isTotal ? 'hover:text-[var(--electric-blue)] cursor-pointer' : ''
                                } ${isTotal ? 'text-emerald-400' : 'text-slate-400'}`}
                        >
                            {formatCurrency(value)}
                        </motion.button>
                    )}
                </div>
            </motion.div>
        );
    };

    return (
        <Card className="border-[var(--electric-blue)]/20 bg-slate-900/80 p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Income Statement <span className="text-xs font-normal text-slate-500">(Interactive)</span></h3>
                <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/20"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500/20"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500/20"></div>
                </div>
            </div>

            <div className="space-y-1">
                <LineItem label="Revenue" fieldKey="revenue" />
                <LineItem label="Cost of Goods Sold" fieldKey="cogs" indent />
                <LineItem label="Gross Profit" fieldKey="grossProfit" isTotal />

                <div className="h-4"></div>

                <LineItem label="Operating Expenses" fieldKey="operatingExpenses" indent />
                <LineItem label="Operating Income" fieldKey="operatingIncome" isTotal />

                <div className="h-4"></div>

                <LineItem label="Interest Expense" fieldKey="interestExpense" indent />
                <LineItem label="Taxes" fieldKey="taxes" indent />
                <LineItem label="Net Income" fieldKey="netIncome" isTotal />
            </div>

            <div className="mt-6 rounded-lg bg-[var(--electric-blue)]/10 p-4 text-center text-sm text-[var(--electric-blue)]">
                💡 Tip: Click on any non-bold number to edit it. Watch how the totals update instantly!
            </div>
        </Card>
    );
}
