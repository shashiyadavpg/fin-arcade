'use client';

import { UserProgress } from '@/types/user';

interface StreakDisplayProps {
  streak: number;
}

export function StreakDisplay({ streak }: StreakDisplayProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
        <span className="text-xl">🔥</span>
      </div>
      <div>
        <p className="text-xs text-emerald-300">Daily Streak</p>
        <p className="text-lg font-semibold text-slate-50">
          {streak} {streak === 1 ? 'day' : 'days'}
        </p>
      </div>
    </div>
  );
}

