"use client";

import { useWorkoutData } from "@/lib/useWorkoutData";

export default function DailyCheckIn() {
  const { data, markTodayComplete } = useWorkoutData();
  const today = new Date().toISOString().slice(0, 10);
  const completed = data.workouts.some((w) => w.date === today && w.completed);

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={markTodayComplete}
        disabled={completed}
        className={`text-2xl font-bold px-8 py-6 rounded-full shadow-lg transition-colors w-full max-w-xs
          ${
            completed
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
      >
        {completed ? "Workout Complete!" : "Mark Workout Complete"}
      </button>
    </div>
  );
}
