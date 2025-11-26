import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Returns years and months elapsed between two dates, with a readable label
export function getYearsMonthsSince(
  start: Date,
  end: Date = new Date()
) {
  const startY = start.getFullYear();
  const startM = start.getMonth();
  const startD = start.getDate();

  const endY = end.getFullYear();
  const endM = end.getMonth();
  const endD = end.getDate();

  let totalMonths = (endY - startY) * 12 + (endM - startM);
  if (endD < startD) totalMonths -= 1; // handle partial month

  const years = Math.floor(totalMonths / 12);
  const months = Math.max(0, totalMonths % 12);

  const yearLabel = `${years} ${years === 1 ? "year" : "years"}`;
  const monthLabel = `${months} ${months === 1 ? "month" : "months"}`;
  const label = months > 0 ? `${yearLabel} ${monthLabel}` : yearLabel;

  return { years, months, label };
}
