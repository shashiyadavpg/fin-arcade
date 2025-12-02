'use client';

import { Card } from '@/components/ui/Card';

interface BadgeDisplayProps {
    earnedBadgeIds: string[];
    className?: string;
}

export function BadgeDisplay({ earnedBadgeIds, className = '' }: BadgeDisplayProps) {
    const allBadges = [
        { id: 'ratio-master', icon: '🏆', name: 'Ratio Master', description: 'Complete all ratio analysis lessons' },
        { id: 'dcf-wizard', icon: '🧙‍♂️', name: 'DCF Wizard', description: 'Master DCF valuation' },
        { id: 'derivatives-ninja', icon: '🥷', name: 'Derivatives Ninja', description: 'Ace derivatives module' },
        { id: 'streak-champion', icon: '🔥', name: 'Streak Champion', description: '30-day streak' },
        { id: 'perfect-score', icon: '⭐', name: 'Perfect Score', description: '100% on advanced quiz' },
    ];

    return (
        <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 ${className}`}>
            {allBadges.map((badgeTemplate) => {
                const isEarned = earnedBadgeIds.includes(badgeTemplate.id);

                return (
                    <Card
                        key={badgeTemplate.id}
                        className={`flex flex-col items-center p-4 text-center transition-all ${isEarned
                            ? 'border-fuchsia-500/50 bg-fuchsia-500/10'
                            : 'border-slate-800 bg-slate-900/30 opacity-50 grayscale'
                            }`}
                    >
                        <div className="mb-2 text-3xl">{badgeTemplate.icon}</div>
                        <h4 className={`text-sm font-bold ${isEarned ? 'text-fuchsia-400' : 'text-slate-500'}`}>
                            {badgeTemplate.name}
                        </h4>
                        <p className="mt-1 text-xs text-slate-500">{badgeTemplate.description}</p>
                        {isEarned && (
                            <span className="mt-2 text-[10px] text-fuchsia-500/70">
                                Unlocked
                            </span>
                        )}
                    </Card>
                );
            })}
        </div>
    );
}
