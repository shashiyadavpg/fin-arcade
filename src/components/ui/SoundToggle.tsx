'use client';

import { useSound } from '@/context/SoundContext';
import { motion } from 'framer-motion';

export function SoundToggle() {
    const { soundEnabled, toggleSound } = useSound();

    return (
        <button
            onClick={toggleSound}
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-white backdrop-blur-md transition-all hover:scale-110 hover:border-[var(--electric-blue)] hover:shadow-[0_0_15px_var(--electric-blue)]"
            aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
        >
            <motion.div
                key={soundEnabled ? 'on' : 'off'}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
            >
                {soundEnabled ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <line x1="23" y1="9" x2="17" y2="15"></line>
                        <line x1="17" y1="9" x2="23" y2="15"></line>
                    </svg>
                )}
            </motion.div>
        </button>
    );
}
