'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getModule } from '@/data/modules';
import { UserProgress } from '@/types/user';
import { initializeProgress, addXP } from '@/lib/gamification';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { DCFCalculator } from '@/components/interactive/DCFCalculator';
import { OptionPayoff } from '@/components/interactive/OptionPayoff';
import { RatioBuilder } from '@/components/interactive/RatioBuilder';
import { BondCalculator } from '@/components/interactive/BondCalculator';

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
    
    // Load completed lessons from storage
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

  const handleLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      const updated = [...completedLessons, lessonId];
      setCompletedLessons(updated);
      localStorage.setItem(`module-${moduleId}-lessons`, JSON.stringify(updated));
      
      if (progress) {
        const newProgress = addXP(50, 'lesson', `Completed: ${module.lessons.find(l => l.id === lessonId)?.title}`);
        setProgress(newProgress);
      }
    }
  };

  const progressPercent = (completedLessons.length / module.lessons.length) * 100;

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-8">
      <Link href="/modules" className="mb-6 inline-flex items-center text-sm text-slate-400 hover:text-slate-200">
        ← Back to modules
      </Link>

      <div className="mb-8">
        <div className="mb-4 flex items-center gap-4">
          <span className="text-5xl">{module.icon}</span>
          <div>
            <h1 className="text-3xl font-bold">{module.title}</h1>
            <p className="mt-1 text-slate-400">{module.description}</p>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-4 text-sm">
          <span className={`rounded-full px-3 py-1 capitalize ${
            module.difficulty === 'beginner' ? 'bg-emerald-500/20 text-emerald-400' :
            module.difficulty === 'intermediate' ? 'bg-cyan-500/20 text-cyan-400' :
            'bg-sky-500/20 text-sky-400'
          }`}>
            {module.difficulty}
          </span>
          <span className="text-slate-400">{module.estimatedTime} minutes</span>
          <span className="text-slate-400">{module.lessons.length} lessons</span>
        </div>

        <ProgressBar
          value={progressPercent}
          label={`${completedLessons.length} of ${module.lessons.length} lessons completed`}
          color="emerald"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Lessons</h2>
        {module.lessons.map((lesson, index) => {
          const isCompleted = completedLessons.includes(lesson.id);

          return (
            <Card key={lesson.id} className={isCompleted ? 'border-emerald-500/30' : ''}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold">
                      {index + 1}
                    </span>
                    <h3 className="text-lg font-semibold">{lesson.title}</h3>
                    {isCompleted && (
                      <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-400">
                        ✓ Complete
                      </span>
                    )}
                    {lesson.interactive && (
                      <span className="rounded-full bg-cyan-500/20 px-2 py-1 text-xs text-cyan-400">
                        Interactive
                      </span>
                    )}
                  </div>
                  <p className="mb-4 text-slate-300">{lesson.content}</p>

                  {lesson.examples.length > 0 && (
                    <div className="mb-4 space-y-3">
                      {lesson.examples.map((example, exIdx) => (
                        <div key={exIdx} className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                          <h4 className="mb-1 font-semibold text-emerald-400">{example.title}</h4>
                          <p className="mb-2 text-sm text-slate-300">{example.description}</p>
                          {example.calculation && (
                            <code className="block rounded bg-slate-950 p-2 text-xs text-cyan-300">
                              {example.calculation}
                            </code>
                          )}
                          {example.result && (
                            <p className="mt-2 text-sm font-medium text-slate-200">{example.result}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLessonComplete(lesson.id)}
                      disabled={isCompleted}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400 cursor-not-allowed'
                          : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                      }`}
                    >
                      {isCompleted ? 'Completed' : 'Mark as Complete'}
                    </button>
                    {lesson.interactive && (
                      <button
                        onClick={() => {
                          const interactiveId = `interactive-${lesson.id}`;
                          const element = document.getElementById(interactiveId);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 hover:bg-cyan-500/20"
                      >
                        Try Interactive →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Interactive Components */}
      <div className="mt-8 space-y-6">
        {module.id === 'financial-statements' && (
          <div id="interactive-ratio-analysis">
            <h2 className="mb-4 text-xl font-semibold">Interactive: Ratio Builder</h2>
            <RatioBuilder />
          </div>
        )}
        {module.id === 'corporate-finance' && (
          <>
            <div id="interactive-npv-irr">
              <h2 className="mb-4 text-xl font-semibold">Interactive: DCF Calculator</h2>
              <DCFCalculator />
            </div>
          </>
        )}
        {module.id === 'markets' && (
          <>
            <div id="interactive-derivatives">
              <h2 className="mb-4 text-xl font-semibold">Interactive: Option Payoff Calculator</h2>
              <OptionPayoff />
            </div>
            <div id="interactive-bonds">
              <h2 className="mb-4 text-xl font-semibold">Interactive: Bond Calculator</h2>
              <BondCalculator />
            </div>
          </>
        )}
      </div>

      {module.quizzes.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Quizzes</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {module.quizzes.map((quizId) => (
              <Link key={quizId} href={`/quiz/${quizId}`}>
                <Card hover>
                  <h3 className="mb-2 font-semibold">Quiz: {quizId}</h3>
                  <p className="text-sm text-slate-400">Test your knowledge</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

