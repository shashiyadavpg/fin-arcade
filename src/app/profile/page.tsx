'use client';

import { useEffect, useState } from 'react';
import { UserProgress } from '@/types/user';
import { initializeProgress } from '@/lib/gamification';
import { XPDisplay } from '@/components/gamification/XPDisplay';
import { StreakDisplay } from '@/components/gamification/StreakDisplay';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { modules } from '@/data/modules';

export default function ProfilePage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const userProgress = initializeProgress();
    setProgress(userProgress);
  }, []);

  if (!progress) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  const completedModules = modules.filter(m => progress.completedModules.includes(m.id));

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Your Profile</h1>
        <p className="text-slate-400">Track your learning journey</p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <Card>
          <XPDisplay progress={progress} />
        </Card>
        <Card>
          <StreakDisplay streak={progress.streak} />
        </Card>
      </div>

      <Card className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Statistics</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <p className="text-sm text-slate-400">Total XP</p>
            <p className="text-2xl font-bold">{progress.xp.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Modules Completed</p>
            <p className="text-2xl font-bold">{completedModules.length}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Quizzes Taken</p>
            <p className="text-2xl font-bold">{Object.keys(progress.quizScores).length}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Time Spent</p>
            <p className="text-2xl font-bold">{progress.totalTimeSpent}m</p>
          </div>
        </div>
      </Card>

      {completedModules.length > 0 && (
        <Card className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Completed Modules</h2>
          <div className="space-y-2">
            {completedModules.map((module) => (
              <div key={module.id} className="flex items-center justify-between rounded-lg bg-slate-800/50 p-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{module.icon}</span>
                  <span className="font-medium">{module.title}</span>
                </div>
                <span className="text-sm text-emerald-400">✓ Complete</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <h2 className="mb-4 text-lg font-semibold">Badges</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Badge name="Ratio Master" icon="📊" color="emerald" earned={progress.badges.includes('ratio-master')} />
          <Badge name="DCF Wizard" icon="💼" color="cyan" earned={progress.badges.includes('dcf-wizard')} />
          <Badge name="Derivatives Ninja" icon="📈" color="sky" earned={progress.badges.includes('derivatives-ninja')} />
          <Badge name="Streak Champion" icon="🔥" color="fuchsia" earned={progress.streak >= 30} />
        </div>
      </Card>
    </main>
  );
}

