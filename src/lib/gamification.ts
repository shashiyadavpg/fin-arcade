import { UserProgress, UserLevel, LEVEL_THRESHOLDS, LEVEL_NAMES } from '@/types/user';
import { XPEvent, XP_REWARDS } from '@/types/gamification';
import { storage } from './storage';

export function getLevelFromXP(xp: number): UserLevel {
  if (xp >= LEVEL_THRESHOLDS.expert) return 'expert';
  if (xp >= LEVEL_THRESHOLDS.advanced) return 'advanced';
  if (xp >= LEVEL_THRESHOLDS.intermediate) return 'intermediate';
  return 'beginner';
}

export function getXPForNextLevel(xp: number): number {
  const currentLevel = getLevelFromXP(xp);
  const levels: UserLevel[] = ['beginner', 'intermediate', 'advanced', 'expert'];
  const currentIndex = levels.indexOf(currentLevel);
  
  if (currentIndex === levels.length - 1) {
    return 0; // Already at max level
  }
  
  const nextLevel = levels[currentIndex + 1];
  return LEVEL_THRESHOLDS[nextLevel] - xp;
}

export function getProgressToNextLevel(xp: number): number {
  const currentLevel = getLevelFromXP(xp);
  const currentThreshold = LEVEL_THRESHOLDS[currentLevel];
  const nextThreshold = currentLevel === 'expert' 
    ? LEVEL_THRESHOLDS.expert + 1000 
    : LEVEL_THRESHOLDS[getLevelFromXP(xp + 1) as UserLevel];
  
  const progress = xp - currentThreshold;
  const range = nextThreshold - currentThreshold;
  
  return Math.min(100, Math.max(0, (progress / range) * 100));
}

export function addXP(amount: number, type: XPEvent['type'], description: string): UserProgress {
  const current = storage.getUserProgress() || getDefaultProgress();
  const newXP = current.xp + amount;
  const newLevel = getLevelFromXP(newXP);
  
  const updated: UserProgress = {
    ...current,
    xp: newXP,
    level: newLevel,
    lastActive: new Date().toISOString(),
  };
  
  // Check for level up
  if (newLevel !== current.level) {
    // Level up bonus
    updated.xp += 50;
  }
  
  storage.saveUserProgress(updated);
  return updated;
}

export function updateStreak(): UserProgress {
  const current = storage.getUserProgress() || getDefaultProgress();
  const now = new Date();
  const lastActive = new Date(current.lastActive);
  
  // Check if streak should continue
  const daysDiff = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
  
  let newStreak = current.streak;
  if (daysDiff === 1) {
    // Continue streak
    newStreak += 1;
    addXP(XP_REWARDS.dailyStreak, 'streak', `Daily streak: ${newStreak} days`);
  } else if (daysDiff > 1) {
    // Streak broken
    newStreak = 1;
  }
  
  const updated: UserProgress = {
    ...current,
    streak: newStreak,
    lastActive: now.toISOString(),
  };
  
  storage.saveUserProgress(updated);
  return updated;
}

export function getDefaultProgress(): UserProgress {
  return {
    userId: 'user-' + Date.now(),
    level: 'beginner',
    xp: 0,
    streak: 0,
    badges: [],
    completedModules: [],
    quizScores: {},
    weakAreas: [],
    lastActive: new Date().toISOString(),
    totalTimeSpent: 0,
  };
}

export function initializeProgress(): UserProgress {
  const existing = storage.getUserProgress();
  if (existing) {
    // Update streak on load
    return updateStreak();
  }
  
  const defaultProgress = getDefaultProgress();
  storage.saveUserProgress(defaultProgress);
  return defaultProgress;
}

