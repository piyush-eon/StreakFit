import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StreakFit | Workout Consistency Tracker",
  description: "Track your workout streaks and stay consistent with StreakFit!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-tr from-green-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-blue-900 min-h-screen`}
      >
        <header className="w-full flex items-center justify-between px-6 py-4 shadow-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
          <span className="text-2xl font-bold tracking-tight text-green-600 dark:text-green-400">
            StreakFit
          </span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Track your workout consistency
          </span>
        </header>
        <main className="flex flex-col flex-1 items-center justify-center w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
