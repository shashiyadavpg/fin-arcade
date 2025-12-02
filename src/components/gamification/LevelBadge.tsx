'use client';

import { motion } from 'framer-motion';

interface LevelBadgeProps {
    level: number;
    size?: 'sm' | 'md' | 'lg';
}

export function LevelBadge({ level, size = 'md' }: LevelBadgeProps) {
    const sizeClasses = {
        sm: 'h-8 w-8 text-xs',
        md: 'h-12 w-12 text-lg',
        lg: 'h-16 w-16 text-2xl',
    };

    return (
        <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-[var(--electric-blue)] to-[var(--neon-purple)] font-bold text-white shadow-[0_0_15px_var(--electric-blue)] ${sizeClasses[size]}`}
        >
            <span className="relative z-10">{level}</span>

            {/* Rings */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-white/50"
            />
        </motion.div>
    );
}
