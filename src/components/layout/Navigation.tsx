'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/', label: 'Dashboard', icon: '🏠' },
  { href: '/modules', label: 'Modules', icon: '📚' },
  { href: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
  { href: '/profile', label: 'Profile', icon: '👤' },
];

export function Navigation() {
  const pathname = usePathname() || '/';
  // In a real app, this would come from a global store or context
  // For now, we'll just mock it or read from localStorage if we were client-side only without hydration issues
  // But to keep it simple and safe for SSR, we'll just show a static state or minimal version
  // Actually, let's use a client-side effect to load it to avoid hydration mismatch

  // For this demo, we'll just hardcode a "preview" state or use a safe default
  // Ideally, we'd use a UserContext.

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0A0F1F]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2 text-xl font-bold">
          <span className="bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-purple)] bg-clip-text text-transparent transition-all group-hover:neon-glow">
            Fin Arcade
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/' && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative"
              >
                <div className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isActive
                  ? 'text-[var(--electric-blue)]'
                  : 'text-slate-400 hover:text-white'
                  }`}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-white/5"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button (Placeholder) */}
        <div className="md:hidden text-white">
          ☰
        </div>
      </div>
    </nav>
  );
}

