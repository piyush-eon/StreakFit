"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { WorkoutData, WorkoutEntry } from "@/types/workout";
import {
  getTodayISO,
  calculateStreaks,
  getWeekDates,
  getMonthDates,
  isSameDay,
} from "@/lib/dateUtils";

const STORAGE_KEY = "streakfit-data";

function normalizeDate(date: string | Date): string {
  // Always return YYYY-MM-DD in local time
  if (typeof date === "string") {
    return date.slice(0, 10);
  }
  return date.toISOString().slice(0, 10);
}

function getInitialData(): WorkoutData {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        // Defensive: ensure structure
        if (
          parsed &&
          Array.isArray(parsed.workouts) &&
          typeof parsed.currentStreak === "number" &&
          typeof parsed.longestStreak === "number"
        ) {
          return parsed;
        }
      } catch {}
    }
  }
  return { workouts: [], currentStreak: 0, longestStreak: 0 };
}

export function useWorkoutData() {
  const [data, setData] = useState<WorkoutData>(getInitialData);

  // Data persistence
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data]);

  // Add a workout for a specific date
  const addWorkout = useCallback((date: string | Date) => {
    setData((prev) => {
      const normDate = normalizeDate(date);
      // Prevent duplicates
      const exists = prev.workouts.find((w) => w.date === normDate);
      let workouts: WorkoutEntry[];
      if (exists) {
        workouts = prev.workouts.map((w) =>
          w.date === normDate ? { ...w, completed: true } : w
        );
      } else {
        workouts = [...prev.workouts, { date: normDate, completed: true }];
      }
      const { currentStreak, longestStreak } = calculateStreaks(workouts);
      return { workouts, currentStreak, longestStreak };
    });
  }, []);

  // Mark today's workout complete
  const markTodayComplete = useCallback(() => {
    addWorkout(getTodayISO());
  }, [addWorkout]);

  // Get all workouts (sorted by date ascending)
  const getWorkouts = useCallback(() => {
    return [...data.workouts].sort((a, b) => a.date.localeCompare(b.date));
  }, [data.workouts]);

  // Calculate current streak
  const calculateCurrentStreak = useCallback(() => {
    return data.currentStreak;
  }, [data.currentStreak]);

  // Calculate longest streak
  const calculateLongestStreak = useCallback(() => {
    return data.longestStreak;
  }, [data.longestStreak]);

  // Get consistency percentage for a period
  const getConsistencyPercentage = useCallback(
    (period: "week" | "month") => {
      let dates: string[] = [];
      if (period === "week") dates = getWeekDates();
      else if (period === "month") dates = getMonthDates();
      const completedSet = new Set(
        data.workouts.filter((w) => w.completed).map((w) => w.date)
      );
      const completed = dates.filter((d) => completedSet.has(d)).length;
      return Math.round((completed / dates.length) * 100);
    },
    [data.workouts]
  );

  // Today's workout status
  const today = getTodayISO();
  const todayStatus = useMemo(
    () => data.workouts.some((w) => isSameDay(w.date, today) && w.completed),
    [data.workouts, today]
  );

  // Edge case: handle first-time users, missing data, and timezone
  useEffect(() => {
    if (!data || !Array.isArray(data.workouts)) {
      setData({ workouts: [], currentStreak: 0, longestStreak: 0 });
    }
  }, [data]);

  return {
    data,
    setData,
    addWorkout,
    getWorkouts,
    calculateCurrentStreak,
    calculateLongestStreak,
    getConsistencyPercentage,
    markTodayComplete,
    todayStatus,
  };
}
