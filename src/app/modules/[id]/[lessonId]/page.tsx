'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getModule } from '@/data/modules';
import { UserProgress } from '@/types/user';
import { initializeProgress, addXP } from '@/lib/gamification';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { DCFCalculator } from '@/components/interactive/DCFCalculator';
import { NPVCalculator } from '@/components/interactive/NPVCalculator';
import { OptionPayoff } from '@/components/interactive/OptionPayoff';
import { RatioBuilder } from '@/components/interactive/RatioBuilder';
import { BondCalculator } from '@/components/interactive/BondCalculator';
import { PortfolioSim } from '@/components/interactive/PortfolioSim';
import { motion } from 'framer-motion';

export default function LessonPage() {
    const params = useParams();
    const router = useRouter();
    const moduleId = params?.id as string;
    const lessonId = params?.lessonId as string;
    const module = getModule(moduleId);
    const lesson = module?.lessons.find(l => l.id === lessonId);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        if (!module || !lesson) return;

        const saved = localStorage.getItem(`module-${moduleId}-lessons`);
        if (saved) {
            const completed = JSON.parse(saved);
            if (completed.includes(lessonId)) {
                setIsCompleted(true);
            }
        }
    }, [moduleId, lessonId, module, lesson]);

    if (!module || !lesson) {
        return <div>Lesson not found</div>;
    }

    const handleComplete = () => {
        if (!isCompleted) {
            const saved = localStorage.getItem(`module-${moduleId}-lessons`);
            const completed = saved ? JSON.parse(saved) : [];
            const updated = [...completed, lessonId];
            localStorage.setItem(`module-${moduleId}-lessons`, JSON.stringify(updated));

            addXP(50, 'lesson', `Completed: ${lesson.title}`);
            setIsCompleted(true);
        }

        // Find next lesson
        const currentIndex = module.lessons.findIndex(l => l.id === lessonId);
        if (currentIndex < module.lessons.length - 1) {
            const nextLesson = module.lessons[currentIndex + 1];
            router.push(`/modules/${moduleId}/${nextLesson.id}`);
        } else {
            router.push(`/modules/${moduleId}`);
        }
    };

    const renderInteractiveComponent = () => {
        if (!lesson.interactive) return null;

        switch (lesson.id) {
            case 'ratio-analysis':
                return <RatioBuilder />;
            case 'capital-budgeting':
                return <NPVCalculator />;
            case 'dcf-valuation':
                return <DCFCalculator />;
            case 'derivatives':
                return <OptionPayoff />;
            case 'bonds':
                return <BondCalculator />;
            case 'etfs-vs-funds':
                return <PortfolioSim />;
            default:
                return null;
        }
    };

    return (
        <main className="mx-auto min-h-screen max-w-4xl px-6 py-8">
            <div className="mb-8 flex items-center justify-between">
                <Link
                    href={`/modules/${moduleId}`}
                    className="text-sm text-slate-400 hover:text-slate-200"
                >
                    ← Back to {module.title}
                </Link>
                <div className="text-sm text-slate-400">
                    Lesson {module.lessons.findIndex(l => l.id === lessonId) + 1} of {module.lessons.length}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="mb-6 text-4xl font-bold text-slate-100">{lesson.title}</h1>

                <Card className="mb-8 border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm">
                    <div className="prose prose-invert max-w-none">
                        <p className="text-lg leading-relaxed text-slate-300">{lesson.content}</p>

                        {lesson.examples.map((example, idx) => (
                            <div key={idx} className="my-8 rounded-xl border border-slate-800 bg-slate-950/50 p-6">
                                <h3 className="mb-2 text-lg font-semibold text-emerald-400">{example.title}</h3>
                                <p className="mb-4 text-slate-300">{example.description}</p>
                                {example.calculation && (
                                    <div className="rounded-lg bg-slate-900 p-4 font-mono text-sm text-cyan-300">
                                        {example.calculation}
                                    </div>
                                )}
                                {example.result && (
                                    <p className="mt-4 font-medium text-slate-200">Result: {example.result}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </Card>

                {lesson.interactive && (
                    <div className="mb-8">
                        <h2 className="mb-4 text-2xl font-bold text-slate-100">Interactive Practice</h2>
                        {renderInteractiveComponent()}
                    </div>
                )}

                <div className="flex justify-end">
                    <button
                        onClick={handleComplete}
                        className="group relative inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 font-semibold text-slate-950 transition-all hover:bg-emerald-400 hover:pr-10"
                    >
                        {isCompleted ? 'Next Lesson' : 'Complete & Continue'}
                        <span className="absolute right-4 opacity-0 transition-all group-hover:opacity-100">→</span>
                    </button>
                </div>
            </motion.div>
        </main>
    );
}
