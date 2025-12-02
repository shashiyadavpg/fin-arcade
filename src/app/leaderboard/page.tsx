'use client';

import { Card } from '@/components/ui/Card';

import { motion } from 'framer-motion';

export default function LeaderboardPage() {
  // Placeholder data - would come from backend in production
  const leaderboard = [
    { rank: 1, name: 'FinanceMaster', xp: 12500, level: 'expert', streak: 45 },
    { rank: 2, name: 'RatioWizard', xp: 9800, level: 'advanced', streak: 32 },
    { rank: 3, name: 'DCFPro', xp: 8700, level: 'advanced', streak: 28 },
    { rank: 4, name: 'You', xp: 2500, level: 'intermediate', streak: 5 },
  ];

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="mb-2 text-3xl font-bold text-slate-100"><span className="neon-text">Leaderboard</span></h1>
        <p className="text-slate-400">Top performers this month</p>
      </motion.div>

      <div className="space-y-4">
        {leaderboard.map((entry, index) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`transition-all hover:scale-[1.01] ${entry.name === 'You' ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-slate-800 bg-slate-900/50'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full font-bold text-lg ${entry.rank === 1 ? 'bg-yellow-500/20 text-yellow-400 shadow-[0_0_15px_-5px_var(--color-yellow-500)]' :
                    entry.rank === 2 ? 'bg-slate-400/20 text-slate-300' :
                      entry.rank === 3 ? 'bg-orange-500/20 text-orange-400' :
                        'bg-slate-800 text-slate-500'
                    }`}>
                    {entry.rank === 1 ? '👑' : entry.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className={`font-bold ${entry.name === 'You' ? 'text-emerald-400' : 'text-slate-200'}`}>
                        {entry.name}
                      </p>
                      {entry.name === 'You' && (
                        <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400">
                          YOU
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 capitalize">{entry.level}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-400">{entry.xp.toLocaleString()} XP</p>
                  <p className="text-sm text-slate-500">🔥 {entry.streak} day streak</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <Card className="border-slate-800 bg-slate-900/30">
          <p className="text-center text-sm text-slate-400">
            Leaderboard updates in real-time. Keep learning to climb the ranks! 🚀
          </p>
        </Card>
      </motion.div>
    </main>
  );
}

