'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { UserProgress } from '@/types/user';
import { initializeProgress } from '@/lib/gamification';
import { modules } from '@/data/modules';
import { Card } from '@/components/ui/Card';

export default function ModulesPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const userProgress = initializeProgress();
    setProgress(userProgress);
  }, []);

  if (!progress) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Learning Modules</h1>
        <p className="text-slate-400">
          Master finance from basics to advanced concepts
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => {
          const isCompleted = progress.completedModules.includes(module.id);
          const isLocked = module.prerequisites?.some(
            p => !progress.completedModules.includes(p)
          );

          return (
            <Link
              key={module.id}
              href={isLocked ? '#' : `/modules/${module.id}`}
            >
              <Card hover glow className={`h-full ${isLocked ? 'opacity-60' : ''}`}>
                <div className="mb-4 flex items-start justify-between">
                  <span className="text-4xl">{module.icon}</span>
                  {isCompleted && (
                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
                      ✓ Complete
                    </span>
                  )}
                  {isLocked && (
                    <span className="rounded-full bg-slate-700 px-3 py-1 text-xs font-medium text-slate-400">
                      🔒 Locked
                    </span>
                  )}
                </div>

                <h2 className="mb-2 text-xl font-semibold">{module.title}</h2>
                <p className="mb-4 text-sm text-slate-400">{module.description}</p>

                <div className="mb-4 flex items-center gap-4 text-xs">
                  <span className={`rounded-full px-3 py-1 capitalize ${
                    module.difficulty === 'beginner' ? 'bg-emerald-500/20 text-emerald-400' :
                    module.difficulty === 'intermediate' ? 'bg-cyan-500/20 text-cyan-400' :
                    'bg-sky-500/20 text-sky-400'
                  }`}>
                    {module.difficulty}
                  </span>
                  <span className="text-slate-500">
                    {module.lessons.length} lessons
                  </span>
                  <span className="text-slate-500">
                    {module.estimatedTime} min
                  </span>
                </div>

                {module.prerequisites && module.prerequisites.length > 0 && (
                  <div className="border-t border-slate-800 pt-3 text-xs text-slate-500">
                    Requires: {module.prerequisites.map(p => {
                      const prereq = modules.find(m => m.id === p);
                      return prereq?.title;
                    }).filter(Boolean).join(', ')}
                  </div>
                )}
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

