export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16 md:flex-row md:justify-between md:gap-16">
        <section className="space-y-8 text-center md:text-left">
          <p className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/60 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-300">
            Fin Arcade
          </p>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Turn finance into a{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
                game you can win
              </span>
              .
            </h1>
            <p className="max-w-xl text-base text-slate-300 md:text-lg">
              Learn money skills by playing bite‑sized challenges. Build habits,
              level up your financial IQ, and compete with friends on real‑world
              goals.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <button className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-7 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300">
              Start playing now
            </button>
            <button className="inline-flex items-center justify-center rounded-full border border-slate-700 px-7 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-900/60">
              Watch how it works
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 md:justify-start">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Daily XP streaks & quests
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Simulated portfolios
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
              Peer leaderboards
            </div>
          </div>
        </section>

        <section className="mt-12 w-full max-w-md md:mt-0">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-[0_22px_60px_rgba(15,23,42,0.9)] backdrop-blur">
            <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Today&apos;s arcade run
              </span>
              <span>Level 3 · Money Basics</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>XP Progress</span>
                  <span>720 / 1000</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3">
                  <p className="text-[0.65rem] text-emerald-300">Daily Quest</p>
                  <p className="mt-1 font-semibold text-slate-50">
                    Build a 50/30/20 budget
                  </p>
                  <p className="mt-2 text-[0.65rem] text-slate-300">+250 XP</p>
                </div>
                <div className="rounded-2xl border border-sky-500/20 bg-sky-500/10 p-3">
                  <p className="text-[0.65rem] text-sky-300">Skill Track</p>
                  <p className="mt-1 font-semibold text-slate-50">
                    Emergency fund ladder
                  </p>
                  <p className="mt-2 text-[0.65rem] text-slate-300">+120 XP</p>
                </div>
                <div className="rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/10 p-3">
                  <p className="text-[0.65rem] text-fuchsia-300">
                    Challenge
                  </p>
                  <p className="mt-1 font-semibold text-slate-50">
                    Beat your friends&apos; streak
                  </p>
                  <p className="mt-2 text-[0.65rem] text-slate-300">+75 XP</p>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-3 text-xs">
                <div className="space-y-1">
                  <p className="text-slate-300">Weekly time invested</p>
                  <p className="text-sm font-semibold text-slate-50">
                    27 minutes
                  </p>
                </div>
                <div className="text-right text-[0.7rem] text-slate-400">
                  <p>+3.2× improvement</p>
                  <p>vs. last week</p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500 md:text-left">
            No real money, no jargon — just interactive runs that make personal
            finance finally click.
          </p>
        </section>
      </main>
    </div>
  );
}
