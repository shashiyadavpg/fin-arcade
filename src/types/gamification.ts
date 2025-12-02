export interface XPEvent {
  type: 'lesson' | 'quiz' | 'challenge' | 'streak' | 'activity' | 'perfect-score';
  amount: number;
  description: string;
  timestamp: string;
}

export interface StreakData {
  current: number;
  longest: number;
  lastActive: string;
}

export const XP_REWARDS = {
  lesson: 50,
  quizCorrect: 25,
  perfectQuiz: 100,
  dailyStreak: 10,
  challenge: 200,
  activity: 75,
} as const;

