'use client';

import { motion } from 'framer-motion';

interface XPBarProps {
    currentXP: number;
    nextLevelXP: number;
    level: number;
    className?: string;
}

export function XPBar({ currentXP, nextLevelXP, level, className = '' }: XPBarProps) {
    const progress = Math.min(100, (currentXP / nextLevelXP) * 100);

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-[var(--electric-blue)]">LVL {level}</span>
                <span className="text-[10px] text-slate-400">{currentXP}/{nextLevelXP} XP</span>
            </div>

            <div className="relative h-2 w-32 overflow-hidden rounded-full bg-slate-800">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-purple)]"
                />
                {/* Glow effect */}
                <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
            </div>
        </div>
    );
}
