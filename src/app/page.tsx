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
import { motion } from 'framer-motion';

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-slate-100">
          Welcome back, <span className="neon-text">Trader</span>
        </h1>
        <p className="text-lg text-slate-400">Continue your finance learning journey</p>
      </motion.div>

      {/* Stats Overview */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="h-full border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <XPDisplay progress={progress} />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <StreakDisplay streak={progress.streak} />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-400">Modules Completed</p>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-slate-100">
                  {completedModules.length}
                </p>
                <p className="mb-1 text-sm text-slate-500">/ {modules.length}</p>
              </div>
              <ProgressBar
                value={(completedModules.length / modules.length) * 100}
                color="cyan"
                showValue={false}
              />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-100">Continue Learning</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {inProgressModules.slice(0, 3).map((module, idx) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
            >
              <Link href={`/modules/${module.id}`}>
                <Card hover glow className="group h-full border-slate-800 bg-slate-900/50 transition-all hover:border-emerald-500/50 hover:bg-slate-900/80">
                  <div className="mb-4 text-4xl transition-transform group-hover:scale-110">{module.icon}</div>
                  <h3 className="mb-2 text-xl font-bold text-slate-100 group-hover:text-emerald-400">{module.title}</h3>
                  <p className="mb-4 text-sm text-slate-400">{module.description}</p>
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                    <span className="uppercase tracking-wider">{module.difficulty}</span>
                    <span>{module.estimatedTime} MIN</span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* All Modules */}
      <div className="mb-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-100">All Modules</h2>
          <Link
            href="/modules"
            className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module, idx) => {
            const isCompleted = progress.completedModules.includes(module.id);
            const isLocked = module.prerequisites?.some(
              p => !progress.completedModules.includes(p)
            );

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + idx * 0.05 }}
              >
                <Link href={isLocked ? '#' : `/modules/${module.id}`}>
                  <Card
                    hover={!isLocked}
                    className={`h-full border-slate-800 bg-slate-900/30 transition-all ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:border-slate-600 hover:bg-slate-900/60'
                      }`}
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <span className="text-3xl">{module.icon}</span>
                      {isCompleted && (
                        <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20">
                          ✓ Complete
                        </span>
                      )}
                      {isLocked && (
                        <span className="rounded-full bg-slate-800 px-2 py-1 text-xs font-medium text-slate-400 border border-slate-700">
                          🔒 Locked
                        </span>
                      )}
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-slate-200">{module.title}</h3>
                    <p className="mb-4 text-sm text-slate-400 line-clamp-2">
                      {module.description}
                    </p>
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className={`uppercase tracking-wider ${module.difficulty === 'beginner' ? 'text-emerald-400' :
                        module.difficulty === 'intermediate' ? 'text-cyan-400' :
                          'text-sky-400'
                        }`}>
                        {module.difficulty}
                      </span>
                      <span className="text-slate-500">{module.estimatedTime} MIN</span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Weak Areas */}
      {progress.weakAreas.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Card className="border-rose-900/30 bg-rose-950/10">
            <h3 className="mb-4 text-lg font-bold text-rose-200">Recommended Practice</h3>
            <p className="mb-4 text-sm text-rose-300/70">
              Focus on these topics to improve your understanding:
            </p>
            <div className="flex flex-wrap gap-2">
              {progress.weakAreas.slice(0, 5).map((area, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-rose-950/50 border border-rose-900/50 px-3 py-1 text-xs text-rose-200"
                >
                  {area}
                </span>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </main>
  );
}
