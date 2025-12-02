import { UserProgress } from '@/types/user';

const STORAGE_KEYS = {
  USER_PROGRESS: 'fin-arcade-user-progress',
  QUIZ_RESULTS: 'fin-arcade-quiz-results',
  SETTINGS: 'fin-arcade-settings',
} as const;

export const storage = {
  getUserProgress(): UserProgress | null {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    return data ? JSON.parse(data) : null;
  },

  saveUserProgress(progress: UserProgress): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
  },

  getQuizResults(): Record<string, any> {
    if (typeof window === 'undefined') return {};
    const data = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS);
    return data ? JSON.parse(data) : {};
  },

  saveQuizResult(quizId: string, result: any): void {
    if (typeof window === 'undefined') return;
    const results = this.getQuizResults();
    results[quizId] = result;
    localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(results));
  },

  getSettings(): Record<string, any> {
    if (typeof window === 'undefined') return {};
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : {};
  },

  saveSettings(settings: Record<string, any>): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },
};

