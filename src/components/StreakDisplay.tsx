"use client";

import { useWorkoutData } from "@/lib/useWorkoutData";

export default function StreakDisplay() {
  const { data } = useWorkoutData();
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2 text-3xl font-bold text-orange-500">
        {data.currentStreak}
        <span className="text-base text-gray-600 dark:text-gray-300 font-normal ml-2">
          day streak
        </span>
      </div>
      <div className="w-40 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-orange-400 transition-all"
          style={{ width: `${Math.min(data.currentStreak, 30) * (100 / 30)}%` }}
        />
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        Longest: {data.longestStreak} days
      </div>
    </div>
  );
}
