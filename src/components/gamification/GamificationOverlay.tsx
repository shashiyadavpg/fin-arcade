'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'xp' | 'level-up' | 'badge';
}

export function GamificationOverlay() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    // This would typically subscribe to a global event bus or context
    // For now, we'll expose a global function for demo purposes
    useEffect(() => {
        (window as any).showNotification = (title: string, message: string, type: 'xp' | 'level-up' | 'badge' = 'xp') => {
            const id = Date.now().toString();
            setNotifications(prev => [...prev, { id, title, message, type }]);

            setTimeout(() => {
                setNotifications(prev => prev.filter(n => n.id !== id));
            }, 3000);
        };
    }, []);

    return (
        <div className="pointer-events-none fixed bottom-8 right-8 z-50 flex flex-col gap-2">
            <AnimatePresence>
                {notifications.map((n) => (
                    <motion.div
                        key={n.id}
                        initial={{ opacity: 0, x: 50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.8 }}
                        className={`pointer-events-auto flex w-80 items-center gap-4 rounded-xl border p-4 shadow-lg backdrop-blur-md ${n.type === 'level-up'
                                ? 'border-fuchsia-500/50 bg-fuchsia-900/80 text-white'
                                : n.type === 'badge'
                                    ? 'border-amber-500/50 bg-amber-900/80 text-white'
                                    : 'border-emerald-500/50 bg-slate-900/80 text-slate-100'
                            }`}
                    >
                        <div className="text-2xl">
                            {n.type === 'level-up' ? '🎉' : n.type === 'badge' ? '🏆' : '✨'}
                        </div>
                        <div>
                            <h4 className="font-bold">{n.title}</h4>
                            <p className="text-sm opacity-90">{n.message}</p>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
