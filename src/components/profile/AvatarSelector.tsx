'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/context/SoundContext';

const AVATARS = ['👨‍💻', '👩‍💻', '🚀', '🦁', '🤖', '🦊', '🦉', '💎'];

interface AvatarSelectorProps {
    currentAvatar?: string;
    onSelect: (avatar: string) => void;
}

export function AvatarSelector({ currentAvatar = '👨‍💻', onSelect }: AvatarSelectorProps) {
    const [selected, setSelected] = useState(currentAvatar);
    const { playSound } = useSound();

    const handleSelect = (avatar: string) => {
        setSelected(avatar);
        onSelect(avatar);
        playSound('click');
    };

    return (
        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm">
            <h3 className="mb-4 text-lg font-bold text-white">Choose Avatar</h3>
            <div className="grid grid-cols-4 gap-4">
                {AVATARS.map((avatar) => (
                    <motion.button
                        key={avatar}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleSelect(avatar)}
                        className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl transition-all ${selected === avatar
                                ? 'bg-[var(--electric-blue)] shadow-[0_0_15px_var(--electric-blue)]'
                                : 'bg-slate-800 hover:bg-slate-700'
                            }`}
                    >
                        {avatar}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
