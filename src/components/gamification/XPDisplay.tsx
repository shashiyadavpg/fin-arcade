'use client';

import { UserProgress } from '@/types/user';
import { getXPForNextLevel, getProgressToNextLevel } from '@/lib/gamification';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface XPDisplayProps {
  progress: UserProgress;
  showDetails?: boolean;
}

export function XPDisplay({ progress, showDetails = true }: XPDisplayProps) {
  const xpToNext = getXPForNextLevel(progress.xp);
  const progressPercent = getProgressToNextLevel(progress.xp);

  return (
    <div className="space-y-3">
      {showDetails && (
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="text-slate-300">Level {progress.level}</p>
            <p className="text-xs text-slate-400">
              {progress.xp.toLocaleString()} XP
            </p>
          </div>
          {xpToNext > 0 && (
            <div className="text-right">
              <p className="text-xs text-slate-400">Next level in</p>
              <p className="text-sm font-semibold text-emerald-400">
                {xpToNext.toLocaleString()} XP
              </p>
            </div>
          )}
        </div>
      )}
      <ProgressBar
        value={progressPercent}
        color="emerald"
        showValue={false}
      />
    </div>
  );
}

