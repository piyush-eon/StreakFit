"use client";

import { useCallback, useEffect, useState } from "react";
import type { WorkoutData, WorkoutEntry } from "@/types/workout";
import { getTodayISO, calculateStreaks } from "@/lib/dateUtils";

const STORAGE_KEY = "streakfit-data";

function getInitialData(): WorkoutData {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {}
    }
  }
  return { workouts: [], currentStreak: 0, longestStreak: 0 };
}

export function useWorkoutData() {
  const [data, setData] = useState<WorkoutData>(getInitialData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data]);

  const markTodayComplete = useCallback(() => {
    setData((prev) => {
      const today = getTodayISO();
      const exists = prev.workouts.find((w) => w.date === today);
      let workouts: WorkoutEntry[];
      if (exists) {
        workouts = prev.workouts.map((w) =>
          w.date === today ? { ...w, completed: true } : w
        );
      } else {
        workouts = [...prev.workouts, { date: today, completed: true }];
      }
      const { currentStreak, longestStreak } = calculateStreaks(workouts);
      return { workouts, currentStreak, longestStreak };
    });
  }, []);

  return {
    data,
    markTodayComplete,
    setData,
  };
}
