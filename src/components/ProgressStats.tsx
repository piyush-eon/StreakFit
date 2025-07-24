"use client";

import { useWorkoutData } from "@/lib/useWorkoutData";
import { getWeekDates, getMonthDates } from "@/lib/dateUtils";

function calcConsistency(
  dates: string[],
  workouts: { date: string; completed: boolean }[]
) {
  const set = new Set(workouts.filter((w) => w.completed).map((w) => w.date));
  const completed = dates.filter((d) => set.has(d)).length;
  return Math.round((completed / dates.length) * 100);
}

export default function ProgressStats() {
  const { data } = useWorkoutData();
  const week = getWeekDates();
  const month = getMonthDates();
  const weekPct = calcConsistency(week, data.workouts);
  const monthPct = calcConsistency(month, data.workouts);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-6">
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold text-green-600 dark:text-green-400">
            {weekPct}%
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            This week
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {monthPct}%
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            This month
          </span>
        </div>
      </div>
    </div>
  );
}
