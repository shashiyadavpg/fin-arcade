'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getQuiz } from '@/data/quizzes';
import { Quiz, Question, QuizResult } from '@/types/quiz';
import { submitQuiz, checkAnswer } from '@/lib/quiz-engine';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params?.id as string | undefined;
  const quiz = quizId ? getQuiz(quizId) : undefined;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | number>('');
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    if (!quiz) return;
    
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [quiz]);

  if (!quizId || !quiz) {
    return (
      <main className="mx-auto min-h-screen max-w-4xl px-6 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Quiz not found</h1>
        </div>
      </main>
    );
  }

  if (!quiz) {
    return (
      <main className="mx-auto min-h-screen max-w-4xl px-6 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Quiz not found</h1>
        </div>
      </main>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  const handleAnswer = (answer: string | number) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (!quiz || !question) return;
    const newAnswers = { ...answers, [question.id]: selectedAnswer };
    setAnswers(newAnswers);

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      // Quiz complete
      const result = submitQuiz(quiz, newAnswers);
      setQuizResult(result);
      setShowResult(true);
    }
  };

  const handleSubmit = () => {
    if (!quiz || !question) return;
    const finalAnswers = { ...answers, [question.id]: selectedAnswer };
    const result = submitQuiz(quiz, finalAnswers);
    setQuizResult(result);
    setShowResult(true);
  };

  if (showResult && quizResult) {
    const passed = quizResult.score >= quiz.passingScore;
    
    return (
      <main className="mx-auto min-h-screen max-w-4xl px-6 py-8">
        <Card>
          <div className="text-center">
            <div className={`mb-4 text-6xl ${passed ? 'text-emerald-400' : 'text-red-400'}`}>
              {passed ? '🎉' : '📚'}
            </div>
            <h1 className="mb-2 text-2xl font-bold">
              {passed ? 'Quiz Passed!' : 'Keep Learning'}
            </h1>
            <p className="mb-6 text-slate-400">
              You scored {quizResult.score.toFixed(0)}% ({quizResult.correctAnswers} / {quizResult.totalQuestions})
            </p>

            <ProgressBar
              value={quizResult.score}
              color={passed ? 'emerald' : 'cyan'}
              label="Your Score"
            />

            {quizResult.mistakes.length > 0 && (
              <div className="mt-8 text-left">
                <h2 className="mb-4 text-lg font-semibold">Review Your Mistakes</h2>
                <div className="space-y-4">
                  {quizResult.mistakes.map((mistakeId) => {
                    const mistakeQuestion = quiz.questions.find(q => q.id === mistakeId);
                    if (!mistakeQuestion) return null;

                    return (
                      <div key={mistakeId} className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                        <p className="mb-2 font-semibold text-red-400">{mistakeQuestion.question}</p>
                        <p className="text-sm text-slate-300">
                          <strong>Correct Answer:</strong> {mistakeQuestion.correctAnswer}
                        </p>
                        <p className="mt-2 text-sm text-slate-400">{mistakeQuestion.explanation}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-8 flex gap-4 justify-center">
              <button
                onClick={() => router.push(`/modules/${quiz.moduleId}`)}
                className="rounded-lg bg-emerald-500 px-6 py-2 font-medium text-slate-950 hover:bg-emerald-400"
              >
                Back to Module
              </button>
              {quizResult.mistakes.length > 0 && (
                <button
                  onClick={() => {
                    setShowResult(false);
                    setCurrentQuestion(0);
                    setAnswers({});
                    setSelectedAnswer('');
                    setTimeSpent(0);
                  }}
                  className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-6 py-2 font-medium text-cyan-400 hover:bg-cyan-500/20"
                >
                  Retake Quiz
                </button>
              )}
            </div>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-8">
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold">{quiz.title}</h1>
        <ProgressBar value={progress} label={`Question ${currentQuestion + 1} of ${quiz.questions.length}`} />
      </div>

      <Card>
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-slate-400">Question {currentQuestion + 1}</span>
            <span className="text-slate-400">{question.points} points</span>
          </div>
          <h2 className="mb-4 text-lg font-semibold">{question.question}</h2>
        </div>

        <div className="space-y-3">
          {question.type === 'multiple-choice' && question.options && (
            question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className={`w-full rounded-lg border p-4 text-left transition-colors ${
                  selectedAnswer === option
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                    : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                }`}
              >
                {option}
              </button>
            ))
          )}

          {question.type === 'calculation' && (
            <input
              type="number"
              value={selectedAnswer || ''}
              onChange={(e) => handleAnswer(Number(e.target.value))}
              placeholder="Enter your answer"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-slate-50"
            />
          )}

          {question.type === 'true-false' && question.options && (
            <div className="grid grid-cols-2 gap-3">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className={`rounded-lg border p-4 text-center transition-colors ${
                    selectedAnswer === option
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                      : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => {
              if (currentQuestion > 0) {
                setCurrentQuestion(currentQuestion - 1);
                setSelectedAnswer(answers[quiz.questions[currentQuestion - 1].id] || '');
              }
            }}
            disabled={currentQuestion === 0}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-400 disabled:opacity-50"
          >
            ← Previous
          </button>
          <button
            onClick={currentQuestion === quiz.questions.length - 1 ? handleSubmit : handleNext}
            disabled={!selectedAnswer}
            className="rounded-lg bg-emerald-500 px-6 py-2 font-medium text-slate-950 disabled:opacity-50 hover:bg-emerald-400"
          >
            {currentQuestion === quiz.questions.length - 1 ? 'Submit Quiz' : 'Next →'}
          </button>
        </div>
      </Card>
    </main>
  );
}

