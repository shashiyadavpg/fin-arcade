import { Quiz, Question, QuizResult } from '@/types/quiz';
import { storage } from './storage';
import { addXP, XP_REWARDS } from './gamification';

export function calculateScore(quiz: Quiz, answers: Record<string, string | number>): QuizResult {
  let correct = 0;
  const mistakes: string[] = [];
  
  quiz.questions.forEach((question) => {
    const userAnswer = answers[question.id];
    const isCorrect = checkAnswer(question, userAnswer);
    
    if (isCorrect) {
      correct++;
    } else {
      mistakes.push(question.id);
    }
  });
  
  const score = (correct / quiz.questions.length) * 100;
  const timeSpent = 0; // Would be tracked during quiz
  
  return {
    quizId: quiz.id,
    score,
    correctAnswers: correct,
    totalQuestions: quiz.questions.length,
    timeSpent,
    answers,
    mistakes,
    completedAt: new Date().toISOString(),
  };
}

export function checkAnswer(question: Question, userAnswer: string | number): boolean {
  if (typeof question.correctAnswer === 'number' && typeof userAnswer === 'number') {
    // Allow small tolerance for floating point calculations
    return Math.abs(question.correctAnswer - userAnswer) < 0.01;
  }
  
  return String(question.correctAnswer).toLowerCase().trim() === 
         String(userAnswer).toLowerCase().trim();
}

export function submitQuiz(quiz: Quiz, answers: Record<string, string | number>): QuizResult {
  const result = calculateScore(quiz, answers);
  
  // Save result
  storage.saveQuizResult(quiz.id, result);
  
  // Award XP
  const correctXP = result.correctAnswers * XP_REWARDS.quizCorrect;
  addXP(correctXP, 'quiz', `Quiz: ${quiz.title}`);
  
  // Perfect score bonus
  if (result.score === 100) {
    addXP(XP_REWARDS.perfectQuiz, 'perfect-score', `Perfect score on ${quiz.title}`);
  }
  
  // Update weak areas
  if (result.mistakes.length > 0) {
    const weakTopics = result.mistakes
      .map(id => quiz.questions.find(q => q.id === id)?.topic)
      .filter(Boolean) as string[];
    
    const current = storage.getUserProgress();
    if (current) {
      const updatedWeakAreas = [...new Set([...current.weakAreas, ...weakTopics])];
      storage.saveUserProgress({
        ...current,
        weakAreas: updatedWeakAreas,
        quizScores: {
          ...current.quizScores,
          [quiz.id]: result.score,
        },
      });
    }
  }
  
  return result;
}

export function getMistakeReplayQuestions(quiz: Quiz, mistakes: string[]): Question[] {
  return quiz.questions.filter(q => mistakes.includes(q.id));
}

