import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { GamificationOverlay } from "@/components/gamification/GamificationOverlay";
import { SoundProvider } from "@/context/SoundContext";
import { SoundToggle } from "@/components/ui/SoundToggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fin Arcade - Gamified Finance Learning",
  description: "Learn finance through interactive games, quizzes, and challenges. Master financial statements, corporate finance, and markets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="min-h-screen bg-[var(--deep-space)] text-white antialiased selection:bg-[var(--electric-blue)] selection:text-black overflow-x-hidden">
        <SoundProvider>
          {/* Background Atmosphere */}
          <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0A0F1F] to-[#050810]" />
          <div className="fixed inset-0 z-[-1] bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

          <Suspense fallback={<nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur h-16" />}>
            <Navigation />
          </Suspense>

          <main className="relative z-10">
            {children}
          </main>

          <GamificationOverlay />
          <SoundToggle />

          {/* Version Indicator - Temporary for Debugging */}
          <div className="fixed bottom-2 right-2 z-50 rounded bg-slate-900/80 px-2 py-1 text-[10px] text-slate-500 backdrop-blur">
            v8.5.1 - FSA Update
          </div>
        </SoundProvider>
      </body>
    </html>
  );
}
