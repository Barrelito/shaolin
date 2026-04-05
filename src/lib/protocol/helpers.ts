import type { Exercise } from "../types";

export function ex(
  id: string,
  name: string,
  reps: string,
  rest: string,
  focus: string,
  timer_seconds?: number
): Exercise {
  return {
    id,
    name,
    reps,
    rest,
    focus,
    ...(timer_seconds !== undefined ? { timer_seconds } : {}),
  };
}
