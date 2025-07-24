// Date utility functions for StreakFit

export function getTodayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function isSameDay(date1: string, date2: string): boolean {
  return date1 === date2;
}

export function getPastDates(days: number): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates.reverse();
}

export function calculateStreaks(
  workouts: { date: string; completed: boolean }[]
): { currentStreak: number; longestStreak: number } {
  let currentStreak = 0;
  let longestStreak = 0;
  let streak = 0;
  const sorted = [...workouts]
    .filter((w) => w.completed)
    .sort((a, b) => b.date.localeCompare(a.date));
  for (let i = 0; i < sorted.length; i++) {
    if (i === 0) {
      streak = 1;
    } else {
      const prev = new Date(sorted[i - 1].date);
      const curr = new Date(sorted[i].date);
      const diff = (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        streak++;
      } else {
        streak = 1;
      }
    }
    if (i === 0 && isSameDay(sorted[i].date, getTodayISO())) {
      currentStreak = streak;
    }
    if (streak > longestStreak) longestStreak = streak;
  }
  return { currentStreak, longestStreak };
}

export function getWeekDates(): string[] {
  const today = new Date();
  const week: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    week.push(d.toISOString().slice(0, 10));
  }
  return week;
}

export function getMonthDates(): string[] {
  const today = new Date();
  const month: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    month.push(d.toISOString().slice(0, 10));
  }
  return month;
}
