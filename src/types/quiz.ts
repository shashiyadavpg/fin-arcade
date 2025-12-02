export type QuestionType = 'multiple-choice' | 'calculation' | 'interactive' | 'true-false';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  topic: string;
  difficulty: Difficulty;
  points: number;
}

export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  questions: Question[];
  difficulty: Difficulty;
  timeLimit?: number; // seconds
  passingScore: number; // percentage
}

export interface QuizResult {
  quizId: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  answers: Record<string, string | number>;
  mistakes: string[]; // question IDs
  completedAt: string;
}

