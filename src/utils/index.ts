/**
 * made by gemini.google
 * @param date Date
 * @returns if day is today
 */
export function isDateToday(date: Date) {
  const today = new Date();

  // Set the hours, minutes, seconds, and milliseconds of both dates to 0
  // This ensures we only compare the year, month, and day
  date.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  // Compare the year, month, and day of both dates
  return date.getTime() === today.getTime();
}

/**
 * made by gemini.google
 * @param date Date
 * @returns if day is yesterday
 */
export function isDateYesterday(date: Date) {
  // Create a new Date object for today
  const today = new Date();

  // Subtract one day from today's date
  today.setHours(0, 0, 0, 0);
  today.setDate(today.getDate() - 1);

  // Set the hours, minutes, seconds, and milliseconds of both dates to 0
  date.setHours(0, 0, 0, 0);

  // Compare the year, month, and day of both dates
  return date.getTime() === today.getTime();
}
