import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 antialiased`}
      >
        <Suspense fallback={<nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur h-16" />}>
          <Navigation />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
