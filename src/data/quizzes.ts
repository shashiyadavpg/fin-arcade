import { Quiz } from '@/types/quiz';

export const quizzes: Quiz[] = [
  {
    id: 'fs-quiz-1',
    moduleId: 'financial-statements',
    title: 'Financial Statements Basics',
    description: 'Test your understanding of financial statement analysis fundamentals',
    difficulty: 'beginner',
    passingScore: 70,
    questions: [
      {
        id: 'fs-q1',
        type: 'multiple-choice',
        question: 'What does the Current Ratio measure?',
        options: [
          'Long-term solvency',
          'Short-term liquidity',
          'Profitability',
          'Efficiency',
        ],
        correctAnswer: 'Short-term liquidity',
        explanation: 'The Current Ratio (Current Assets / Current Liabilities) measures a company\'s ability to pay short-term obligations.',
        topic: 'Ratio Analysis',
        difficulty: 'beginner',
        points: 25,
      },
      {
        id: 'fs-q2',
        type: 'calculation',
        question: 'If a company has Current Assets of $500,000 and Current Liabilities of $250,000, what is the Current Ratio?',
        correctAnswer: 2,
        explanation: 'Current Ratio = Current Assets / Current Liabilities = $500,000 / $250,000 = 2.0',
        topic: 'Ratio Analysis',
        difficulty: 'beginner',
        points: 25,
      },
      {
        id: 'fs-q3',
        type: 'multiple-choice',
        question: 'What is the primary purpose of trend analysis?',
        options: [
          'Compare companies in the same industry',
          'Identify patterns over multiple periods',
          'Calculate financial ratios',
          'Determine market value',
        ],
        correctAnswer: 'Identify patterns over multiple periods',
        explanation: 'Trend analysis examines financial data over time to identify patterns, growth rates, and potential issues.',
        topic: 'Trend Analysis',
        difficulty: 'beginner',
        points: 25,
      },
      {
        id: 'fs-q4',
        type: 'true-false',
        question: 'A higher Current Ratio always indicates better financial health.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'While a ratio above 1 is generally good, an excessively high Current Ratio might indicate inefficient use of assets.',
        topic: 'Ratio Analysis',
        difficulty: 'intermediate',
        points: 25,
      },
    ],
  },
  {
    id: 'cf-quiz-1',
    moduleId: 'corporate-finance',
    title: 'NPV & Capital Budgeting',
    description: 'Test your knowledge of NPV, IRR, and capital budgeting decisions',
    difficulty: 'intermediate',
    passingScore: 75,
    questions: [
      {
        id: 'cf-q1',
        type: 'multiple-choice',
        question: 'What does a positive NPV indicate?',
        options: [
          'The project should be rejected',
          'The project adds value and should be accepted',
          'The project breaks even',
          'The discount rate is too high',
        ],
        correctAnswer: 'The project adds value and should be accepted',
        explanation: 'A positive NPV means the project\'s cash flows, discounted at the required rate, exceed the initial investment.',
        topic: 'NPV',
        difficulty: 'intermediate',
        points: 25,
      },
      {
        id: 'cf-q2',
        type: 'calculation',
        question: 'A project requires a $1,000 investment and generates $300 per year for 5 years. If the discount rate is 10%, what is the approximate NPV? (Round to nearest dollar)',
        correctAnswer: 137,
        explanation: 'NPV = -1000 + 300/(1.1) + 300/(1.1)² + 300/(1.1)³ + 300/(1.1)⁴ + 300/(1.1)⁵ ≈ $137',
        topic: 'NPV',
        difficulty: 'intermediate',
        points: 50,
      },
    ],
  },
];

export function getQuiz(id: string): Quiz | undefined {
  return quizzes.find(q => q.id === id);
}

export function getQuizzesByModule(moduleId: string): Quiz[] {
  return quizzes.filter(q => q.moduleId === moduleId);
}

