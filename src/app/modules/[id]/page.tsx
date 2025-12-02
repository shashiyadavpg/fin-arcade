'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getModule } from '@/data/modules';
import { UserProgress } from '@/types/user';
import { initializeProgress } from '@/lib/gamification';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { motion } from 'framer-motion';

export default function ModulePage() {
  const params = useParams();
  const moduleId = params?.id as string | undefined;
  const module = moduleId ? getModule(moduleId) : undefined;
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    if (!moduleId) return;

    const userProgress = initializeProgress();
    setProgress(userProgress);

    const saved = localStorage.getItem(`module-${moduleId}-lessons`);
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, [moduleId]);

  if (!moduleId || !module) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Module not found</h1>
          <Link href="/modules" className="text-emerald-400 hover:text-emerald-300">
            ← Back to modules
          </Link>
        </div>
      </main>
    );
  }

  const progressPercent = (completedLessons.length / module.lessons.length) * 100;

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-8">
      <Link href="/modules" className="mb-6 inline-flex items-center text-sm text-slate-400 hover:text-slate-200 transition-colors">
        ← Back to modules
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className={`flex h-24 w-24 items-center justify-center rounded-2xl text-5xl bg-${module.color}-500/10 text-${module.color}-400 border border-${module.color}-500/20 shadow-[0_0_30px_-10px_var(--color-${module.color}-500)]`}
            >
              {module.icon}
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl font-bold tracking-tight text-slate-100"
              >
                {module.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 text-xl text-slate-400 max-w-2xl"
              >
                {module.description}
              </motion.p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8 flex items-center gap-6 text-sm"
        >
          <span className={`rounded-full px-3 py-1 capitalize font-medium border ${module.difficulty === 'beginner' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
            module.difficulty === 'intermediate' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
              'bg-sky-500/10 text-sky-400 border-sky-500/20'
            }`}>
            {module.difficulty}
          </span>
          <span className="flex items-center gap-2 text-slate-400">
            🕒 {module.estimatedTime} mins
          </span>
          <span className="flex items-center gap-2 text-slate-400">
            📚 {module.lessons.length} lessons
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
            <div className="mb-2 flex justify-between text-sm font-medium">
              <span className="text-slate-300">Module Progress</span>
              <span className={`text-${module.color}-400`}>{Math.round(progressPercent)}%</span>
            </div>
            <ProgressBar
              value={progressPercent}
              color={module.color as any}
            />
          </Card>
        </motion.div>
      </motion.div>

      <div className="space-y-12">
        <section>
          <h2 className="mb-6 text-2xl font-bold text-slate-100">Learning Path</h2>
          <div className="space-y-4">
            {module.lessons.map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson.id);
              // const isLocked = index > 0 && !completedLessons.includes(module.lessons[index - 1].id);
              const isLocked = false; // UNLOCKED FOR TESTING

              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Link
                    href={isLocked ? '#' : `/modules/${moduleId}/${lesson.id}`}
                    className={isLocked ? 'cursor-not-allowed' : ''}
                  >
                    <motion.div
                      whileHover={!isLocked ? { scale: 1.02, x: 10, backgroundColor: "rgba(15, 23, 42, 0.8)" } : {}}
                      className={`group relative flex items-center gap-6 rounded-xl border p-6 transition-all ${isLocked
                        ? 'border-slate-800 bg-slate-950/30 opacity-50'
                        : 'border-slate-800 bg-slate-900/40 backdrop-blur-sm hover:border-slate-600 hover:shadow-lg hover:shadow-slate-900/50'
                        }`}
                    >
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 font-bold transition-all ${isCompleted
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_-5px_var(--color-emerald-500)]'
                        : isLocked
                          ? 'border-slate-800 bg-slate-900 text-slate-600'
                          : `border-${module.color}-500/50 text-${module.color}-400 group-hover:border-${module.color}-400 group-hover:shadow-[0_0_15px_-5px_var(--color-${module.color}-500)]`
                        }`}>
                        {isCompleted ? '✓' : index + 1}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">
                            {lesson.title}
                          </h3>
                          {lesson.interactive && (
                            <span className="rounded-full bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 text-xs font-medium text-cyan-400 shadow-[0_0_10px_-5px_var(--color-cyan-500)]">
                              Interactive
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-400 mt-1">{lesson.estimatedTime} mins</p>
                      </div>

                      {!isLocked && (
                        <div className="text-slate-600 transition-all group-hover:text-emerald-400 group-hover:translate-x-2">
                          →
                        </div>
                      )}
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {module.quizzes.length > 0 && (
          <section>
            <h2 className="mb-6 text-2xl font-bold text-slate-100">Assessments</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {module.quizzes.map((quizId, idx) => (
                <motion.div
                  key={quizId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + idx * 0.1 }}
                >
                  <Link href={`/quiz/${quizId}`}>
                    <Card hover glow className="group border-slate-800 bg-slate-900/40 p-8 backdrop-blur-sm transition-all hover:border-fuchsia-500/50 hover:bg-slate-900/60">
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-fuchsia-500/10 text-3xl border border-fuchsia-500/20 group-hover:shadow-[0_0_20px_-5px_var(--color-fuchsia-500)] transition-all">
                        🎯
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-slate-200 group-hover:text-fuchsia-400 transition-colors">
                        {quizId.split('-').slice(1).join(' ').toUpperCase()}
                      </h3>
                      <p className="text-sm text-slate-400 group-hover:text-slate-300">
                        Test your mastery of this module's concepts.
                      </p>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

