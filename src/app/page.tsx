'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { UserProgress } from '@/types/user';
import { initializeProgress } from '@/lib/gamification';
import { XPDisplay } from '@/components/gamification/XPDisplay';
import { StreakDisplay } from '@/components/gamification/StreakDisplay';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { modules } from '@/data/modules';

export default function Dashboard() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const userProgress = initializeProgress();
    setProgress(userProgress);
  }, []);

  if (!progress) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  const completedModules = modules.filter(m => progress.completedModules.includes(m.id));
  const inProgressModules = modules.filter(m => 
    !progress.completedModules.includes(m.id) && 
    (!m.prerequisites || m.prerequisites.every(p => progress.completedModules.includes(p)))
  );

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Welcome back!</h1>
        <p className="text-slate-400">Continue your finance learning journey</p>
      </div>

      {/* Stats Overview */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card>
          <XPDisplay progress={progress} />
        </Card>
        
        <Card>
          <StreakDisplay streak={progress.streak} />
        </Card>

        <Card>
          <div className="space-y-2">
            <p className="text-sm text-slate-300">Modules Completed</p>
            <p className="text-3xl font-bold">
              {completedModules.length} / {modules.length}
            </p>
            <ProgressBar
              value={(completedModules.length / modules.length) * 100}
              color="cyan"
              showValue={false}
            />
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Continue Learning</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {inProgressModules.slice(0, 3).map((module) => (
            <Link key={module.id} href={`/modules/${module.id}`}>
              <Card hover glow className="h-full">
                <div className="mb-3 text-3xl">{module.icon}</div>
                <h3 className="mb-2 text-lg font-semibold">{module.title}</h3>
                <p className="mb-4 text-sm text-slate-400">{module.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{module.difficulty}</span>
                  <span>{module.estimatedTime} min</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* All Modules */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">All Modules</h2>
          <Link
            href="/modules"
            className="text-sm text-emerald-400 hover:text-emerald-300"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => {
            const isCompleted = progress.completedModules.includes(module.id);
            const isLocked = module.prerequisites?.some(
              p => !progress.completedModules.includes(p)
            );

            return (
              <Link key={module.id} href={isLocked ? '#' : `/modules/${module.id}`}>
                <Card hover className={`h-full ${isLocked ? 'opacity-50' : ''}`}>
                  <div className="mb-3 flex items-start justify-between">
                    <span className="text-3xl">{module.icon}</span>
                    {isCompleted && (
                      <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-400">
                        ✓ Complete
                      </span>
                    )}
                    {isLocked && (
                      <span className="rounded-full bg-slate-700 px-2 py-1 text-xs text-slate-400">
                        🔒 Locked
                      </span>
                    )}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{module.title}</h3>
                  <p className="mb-4 text-sm text-slate-400 line-clamp-2">
                    {module.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`capitalize ${
                      module.difficulty === 'beginner' ? 'text-emerald-400' :
                      module.difficulty === 'intermediate' ? 'text-cyan-400' :
                      'text-sky-400'
                    }`}>
                      {module.difficulty}
                    </span>
                    <span className="text-slate-500">{module.estimatedTime} min</span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Weak Areas */}
      {progress.weakAreas.length > 0 && (
        <Card>
          <h3 className="mb-4 text-lg font-semibold">Recommended Practice</h3>
          <p className="mb-2 text-sm text-slate-400">
            Focus on these topics to improve your understanding:
          </p>
          <div className="flex flex-wrap gap-2">
            {progress.weakAreas.slice(0, 5).map((area, idx) => (
              <span
                key={idx}
                className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
              >
                {area}
              </span>
            ))}
          </div>
        </Card>
      )}
    </main>
  );
}
