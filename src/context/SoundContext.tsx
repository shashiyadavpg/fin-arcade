'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type SoundType = 'hover' | 'click' | 'success' | 'error' | 'level-up';

interface SoundContextType {
    soundEnabled: boolean;
    toggleSound: () => void;
    playSound: (type: SoundType) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
    const [soundEnabled, setSoundEnabled] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('fin-arcade-sound');
        if (stored !== null) {
            setSoundEnabled(stored === 'true');
        }
    }, []);

    const toggleSound = useCallback(() => {
        setSoundEnabled(prev => {
            const newValue = !prev;
            localStorage.setItem('fin-arcade-sound', String(newValue));
            return newValue;
        });
    }, []);

    const playSound = useCallback((type: SoundType) => {
        if (!soundEnabled) return;

        // In a real app, we would play actual audio files here.
        // For now, we'll use the Web Audio API for simple synthesized sounds
        // to avoid needing external assets immediately.
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;

            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            const now = ctx.currentTime;

            switch (type) {
                case 'hover':
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(400, now);
                    osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);
                    gain.gain.setValueAtTime(0.05, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                    osc.start(now);
                    osc.stop(now + 0.05);
                    break;

                case 'click':
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(600, now);
                    osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
                    gain.gain.setValueAtTime(0.1, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                    osc.start(now);
                    osc.stop(now + 0.1);
                    break;

                case 'success':
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(500, now);
                    osc.frequency.setValueAtTime(800, now + 0.1);
                    gain.gain.setValueAtTime(0.1, now);
                    gain.gain.linearRampToValueAtTime(0, now + 0.3);
                    osc.start(now);
                    osc.stop(now + 0.3);
                    break;

                case 'level-up':
                    // Arpeggio
                    [440, 554, 659, 880].forEach((freq, i) => {
                        const osc2 = ctx.createOscillator();
                        const gain2 = ctx.createGain();
                        osc2.connect(gain2);
                        gain2.connect(ctx.destination);

                        const start = now + i * 0.1;
                        osc2.frequency.value = freq;
                        gain2.gain.setValueAtTime(0.1, start);
                        gain2.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
                        osc2.start(start);
                        osc2.stop(start + 0.3);
                    });
                    break;
            }
        } catch (e) {
            console.error('Audio playback failed', e);
        }
    }, [soundEnabled]);

    return (
        <SoundContext.Provider value={{ soundEnabled, toggleSound, playSound }}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSound() {
    const context = useContext(SoundContext);
    if (context === undefined) {
        throw new Error('useSound must be used within a SoundProvider');
    }
    return context;
}
