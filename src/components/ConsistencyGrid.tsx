"use client";

import { useWorkoutData } from "@/lib/useWorkoutData";
import { getPastDates } from "@/lib/dateUtils";

const GRID_DAYS = 35;
export default function ConsistencyGrid() {
  const { data } = useWorkoutData();
  const dates = getPastDates(GRID_DAYS);
  const workoutMap = Object.fromEntries(
    data.workouts.map((w) => [w.date, w.completed])
  );

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="grid grid-cols-7 gap-1">
        {dates.map((date) => (
          <div
            key={date}
            title={date}
            className={`w-4 h-4 rounded-sm border border-gray-200 dark:border-gray-700 transition-colors
              ${
                workoutMap[date]
                  ? "bg-green-500"
                  : "bg-gray-200 dark:bg-gray-800"
              }`}
          />
        ))}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        Last 5 weeks
      </div>
    </div>
  );
}
