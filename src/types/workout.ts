export type WorkoutEntry = {
  date: string; // ISO date string (YYYY-MM-DD)
  completed: boolean;
};

export type WorkoutData = {
  workouts: WorkoutEntry[];
  currentStreak: number;
  longestStreak: number;
};
