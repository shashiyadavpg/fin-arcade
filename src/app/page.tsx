'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { UserProgress } from '@/types/user';
import { initializeProgress } from '@/lib/gamification';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { modules } from '@/data/modules';
import { motion } from 'framer-motion';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import { useSound } from '@/context/SoundContext';

export default function Dashboard() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const { playSound } = useSound();

  useEffect(() => {
    const userProgress = initializeProgress();
    setProgress(userProgress);
  }, []);

  if (!progress) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-[var(--electric-blue)]"></div>
      </div>
    );
  }

  const completedModules = modules.filter(m => progress.completedModules.includes(m.id));
  const inProgressModules = modules.filter(m =>
    !progress.completedModules.includes(m.id) &&
    (!m.prerequisites || m.prerequisites.every(p => progress.completedModules.includes(p)))
  );

  const nextModule = inProgressModules[0];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <MotionWrapper className="mx-auto min-h-screen max-w-7xl px-6 py-12">
      {/* Hero Section */}
      <div className="mb-16 grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 inline-flex items-center rounded-full border border-[var(--electric-blue)]/30 bg-[var(--electric-blue)]/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="mr-2 flex h-2 w-2">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[var(--electric-blue)] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--electric-blue)]"></span>
            </span>
            <span className="text-sm font-medium text-[var(--electric-blue)]">
              {progress.streak} Day Streak 🔥
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl">
            Learn Finance <br />
            <span className="neon-text">Like a Game</span>
          </h1>

          <p className="mb-8 text-lg text-slate-400 md:text-xl">
            Master financial statements, valuation, and markets through interactive challenges.
            Level {progress.level} • {progress.xp} XP
          </p>

          {nextModule && (
            <Link href={`/modules/${nextModule.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => playSound('hover')}
                onClick={() => playSound('click')}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-[var(--electric-blue)] px-8 py-4 font-bold text-slate-950 transition-all hover:shadow-[0_0_30px_-5px_var(--electric-blue)]"
              >
                <span className="mr-2 text-lg">Continue Learning</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </motion.button>
            </Link>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          {/* Abstract 3D-like composition */}
          <div className="relative z-10 grid grid-cols-2 gap-4">
            <Card className="translate-y-12 border-[var(--neon-purple)]/30 bg-slate-900/80 backdrop-blur-xl">
              <div className="mb-2 text-4xl">📊</div>
              <div className="h-2 w-24 rounded-full bg-slate-800 mb-2">
                <div className="h-full w-3/4 rounded-full bg-[var(--neon-purple)]"></div>
              </div>
              <div className="h-2 w-16 rounded-full bg-slate-800"></div>
            </Card>
            <Card className="translate-x-4 border-[var(--electric-blue)]/30 bg-slate-900/80 backdrop-blur-xl">
              <div className="mb-2 text-4xl">🚀</div>
              <div className="text-2xl font-bold text-white">+250 XP</div>
              <div className="text-sm text-slate-400">Level Up!</div>
            </Card>
            <Card className="-translate-y-8 translate-x-8 border-[var(--laser-pink)]/30 bg-slate-900/80 backdrop-blur-xl">
              <div className="mb-2 text-4xl">💎</div>
              <div className="text-lg font-bold text-white">Diamond Hands</div>
              <div className="text-xs text-slate-400">Achievement Unlocked</div>
            </Card>
          </div>

          {/* Glow effects */}
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--electric-blue)] opacity-20 blur-[100px]"></div>
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-[var(--neon-purple)] opacity-20 blur-[80px]"></div>
        </motion.div>
      </div>

      {/* Learning Path */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">Learning Path</h2>
            <p className="text-slate-400">Your journey to financial mastery</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[var(--electric-blue)]">
              {Math.round((completedModules.length / modules.length) * 100)}%
            </div>
            <div className="text-sm text-slate-500">Complete</div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => {
            const isCompleted = progress.completedModules.includes(module.id);
            const isLocked = module.prerequisites?.some(
              p => !progress.completedModules.includes(p)
            );

            // Determine border color based on state
            let borderColor = 'border-white/5';
            if (isCompleted) borderColor = 'border-emerald-500/30';
            else if (!isLocked) borderColor = 'border-[var(--electric-blue)]/30';

            return (
              <motion.div key={module.id} variants={item}>
                <Link href={isLocked ? '#' : `/modules/${module.id}`}>
                  <Card
                    hover={!isLocked}
                    className={`group h-full transition-all ${borderColor} ${isLocked ? 'opacity-50 grayscale' : 'hover:bg-slate-900/80'
                      }`}
                  >
                    <div className="mb-6 flex items-start justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition-transform group-hover:scale-110 ${isLocked ? 'bg-slate-800' : 'bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg'
                        }`}>
                        {module.icon}
                      </div>
                      {isCompleted ? (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                      ) : isLocked ? (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                          </svg>
                        </div>
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--electric-blue)]/20 text-[var(--electric-blue)]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </div>
                      )}
                    </div>

                    <h3 className={`mb-2 text-xl font-bold transition-colors ${!isLocked && !isCompleted ? 'group-hover:text-[var(--electric-blue)]' : 'text-slate-200'
                      }`}>
                      {module.title}
                    </h3>

                    <p className="mb-6 text-sm text-slate-400 line-clamp-2">
                      {module.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                        <span className="uppercase tracking-wider">{module.difficulty}</span>
                        <span>{module.estimatedTime} MIN</span>
                      </div>

                      {/* Progress Bar for Module (Mockup for now, could be real if we tracked lesson progress) */}
                      <ProgressBar
                        value={isCompleted ? 100 : 0}
                        color={isCompleted ? 'emerald' : 'cyan'}
                        showValue={false}
                        className="h-1.5"
                      />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </MotionWrapper>
  );
}
