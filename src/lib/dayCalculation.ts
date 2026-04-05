export function calculateDayNumber(startDate: string): number {
  const start = new Date(startDate + "T00:00:00");
  const now = new Date();
  const startLocal = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );
  const nowLocal = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  return (
    Math.floor((nowLocal.getTime() - startLocal.getTime()) / 86400000) + 1
  );
}

export function getLevelForDay(day: number): 1 | 2 | 3 | 4 | 5 {
  if (day <= 100) return 1;
  if (day <= 200) return 2;
  if (day <= 300) return 3;
  if (day <= 400) return 4;
  return 5;
}

export function formatLocalDate(date: Date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function isToday(dateString: string): boolean {
  return dateString === formatLocalDate();
}

export function isYesterday(dateString: string): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateString === formatLocalDate(yesterday);
}
