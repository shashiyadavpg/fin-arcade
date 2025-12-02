export type UserLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface UserProgress {
  userId: string;
  level: UserLevel;
  xp: number;
  streak: number;
  badges: string[];
  completedModules: string[];
  quizScores: Record<string, number>;
  weakAreas: string[];
  lastActive: string;
  totalTimeSpent: number; // minutes
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  requirement: string;
}

export const LEVEL_THRESHOLDS: Record<UserLevel, number> = {
  beginner: 0,
  intermediate: 1000,
  advanced: 3000,
  expert: 7000,
};

export const LEVEL_NAMES: Record<UserLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
};

