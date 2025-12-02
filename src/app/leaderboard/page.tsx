'use client';

import { Card } from '@/components/ui/Card';

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
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Leaderboard</h1>
        <p className="text-slate-400">Top performers this month</p>
      </div>

      <div className="space-y-3">
        {leaderboard.map((entry) => (
          <Card key={entry.rank} className={entry.name === 'You' ? 'border-emerald-500/30 bg-emerald-500/5' : ''}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full font-bold ${
                  entry.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                  entry.rank === 2 ? 'bg-slate-500/20 text-slate-400' :
                  entry.rank === 3 ? 'bg-orange-500/20 text-orange-400' :
                  'bg-slate-800 text-slate-400'
                }`}>
                  {entry.rank}
                </div>
                <div>
                  <p className="font-semibold">{entry.name}</p>
                  <p className="text-sm text-slate-400 capitalize">{entry.level}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-emerald-400">{entry.xp.toLocaleString()} XP</p>
                <p className="text-sm text-slate-400">🔥 {entry.streak} day streak</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <p className="text-center text-sm text-slate-400">
          Leaderboard updates in real-time. Keep learning to climb the ranks! 🚀
        </p>
      </Card>
    </main>
  );
}

