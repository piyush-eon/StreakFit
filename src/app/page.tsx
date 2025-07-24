"use client";

import Image from "next/image";
import DailyCheckIn from "@/components/DailyCheckIn";
import StreakDisplay from "@/components/StreakDisplay";
import ConsistencyGrid from "@/components/ConsistencyGrid";
import ProgressStats from "@/components/ProgressStats";

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center w-full py-20 px-4 text-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/streakfit-logo.svg"
            alt="StreakFit Logo"
            width={80}
            height={80}
            className="mb-2 drop-shadow-lg"
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-green-700 dark:text-green-400 mb-2">
            Build Your Workout Streak
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 max-w-2xl">
            StreakFit helps you stay consistent with your workouts. Track your
            daily exercise, visualize your streaks, and build healthy habits for
            life. Start your fitness journey today!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button
            onClick={() => {
              /* Add navigation logic */
            }}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-colors text-lg"
          >
            Get Started
          </button>
          <a
            href="#learn-more"
            className="bg-white/80 dark:bg-gray-800/80 border border-green-600 dark:border-green-400 text-green-700 dark:text-green-300 font-semibold py-3 px-8 rounded-full shadow-md transition-colors text-lg hover:bg-green-50 dark:hover:bg-gray-900"
          >
            Learn More
          </a>
        </div>
      </section>
      <section className="w-full max-w-2xl mx-auto flex flex-col gap-8 items-center justify-center py-8 px-2">
        <StreakDisplay />
        <DailyCheckIn />
        <ConsistencyGrid />
        <ProgressStats />
      </section>
    </>
  );
}
