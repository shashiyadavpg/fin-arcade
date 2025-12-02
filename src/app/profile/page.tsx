'use client';

import { useEffect, useState } from 'react';
import { UserProgress } from '@/types/user';
import { initializeProgress } from '@/lib/gamification';
import { XPDisplay } from '@/components/gamification/XPDisplay';
import { StreakDisplay } from '@/components/gamification/StreakDisplay';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { modules } from '@/data/modules';

import { motion } from 'framer-motion';

import { AvatarSelector } from '@/components/profile/AvatarSelector';

export default function ProfilePage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [avatar, setAvatar] = useState('👨‍💻');

  useEffect(() => {
    const userProgress = initializeProgress();
    setProgress(userProgress);
    // Load avatar from local storage if we had it
    const storedAvatar = localStorage.getItem('fin-arcade-avatar');
    if (storedAvatar) setAvatar(storedAvatar);
  }, []);

  const handleAvatarSelect = (newAvatar: string) => {
    setAvatar(newAvatar);
    localStorage.setItem('fin-arcade-avatar', newAvatar);
  };

  if (!progress) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--electric-blue)] border-t-transparent"></div>
      </div>
    );
  }

  const completedModules = modules.filter(m => progress.completedModules.includes(m.id));

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between"
      >
        <div>
          <h1 className="mb-2 text-3xl font-bold text-slate-100"><span className="neon-text">Your Profile</span></h1>
          <p className="text-slate-400">Track your learning journey</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[var(--electric-blue)] to-[var(--neon-purple)] text-6xl shadow-[0_0_30px_-5px_var(--electric-blue)]">
            {avatar}
          </div>
          <AvatarSelector currentAvatar={avatar} onSelect={handleAvatarSelect} />
        </div>
      </motion.div>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
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
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="mb-8 border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <h2 className="mb-6 text-xl font-bold text-slate-100">Statistics</h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <p className="text-sm font-medium text-slate-400">Total XP</p>
              <p className="mt-1 text-3xl font-bold text-emerald-400">{progress.xp.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">Modules Completed</p>
              <p className="mt-1 text-3xl font-bold text-cyan-400">{completedModules.length}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">Quizzes Taken</p>
              <p className="mt-1 text-3xl font-bold text-fuchsia-400">{Object.keys(progress.quizScores).length}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">Time Spent</p>
              <p className="mt-1 text-3xl font-bold text-amber-400">{progress.totalTimeSpent}m</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {completedModules.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="mb-8 border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <h2 className="mb-6 text-xl font-bold text-slate-100">Completed Modules</h2>
            <div className="space-y-3">
              {completedModules.map((module, idx) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition-colors hover:border-emerald-500/30 hover:bg-slate-900"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{module.icon}</span>
                    <span className="font-bold text-slate-200">{module.title}</span>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20">
                    ✓ Complete
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <h2 className="mb-6 text-xl font-bold text-slate-100">Badges</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Badge name="Ratio Master" icon="📊" color="emerald" earned={progress.badges.includes('ratio-master')} />
            <Badge name="DCF Wizard" icon="💼" color="cyan" earned={progress.badges.includes('dcf-wizard')} />
            <Badge name="Derivatives Ninja" icon="📈" color="sky" earned={progress.badges.includes('derivatives-ninja')} />
            <Badge name="Streak Champion" icon="🔥" color="fuchsia" earned={progress.streak >= 30} />
          </div>
        </Card>
      </motion.div>
    </main>
  );
}

