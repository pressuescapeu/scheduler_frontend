import { format, parse, differenceInMinutes } from 'date-fns';

export const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
  '20:00', '21:00', '22:00', '23:00'
];

export const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const DAY_ABBREVIATIONS: Record<string, string> = {
  Monday: 'M',
  Tuesday: 'T',
  Wednesday: 'W',
  Thursday: 'R',
  Friday: 'F',
  Saturday: 'S',
};

/**
 * Convert time string to grid row number
 * @param time - Time string like "10:00:00" or "10:00"
 * @returns Grid row number (1-based)
 */
export const timeToGridRow = (time: string): number => {
  const baseTime = parse('08:00', 'HH:mm', new Date());
  const targetTime = parse(time.substring(0, 5), 'HH:mm', new Date());
  const minutesSinceStart = differenceInMinutes(targetTime, baseTime);
  
  return Math.floor(minutesSinceStart / 30) + 1;
};

/**
 * Calculate grid span based on start and end times
 * @param startTime - Start time string
 * @param endTime - End time string
 * @returns Number of grid rows to span
 */
export const calculateGridSpan = (startTime: string, endTime: string): number => {
  const start = parse(startTime.substring(0, 5), 'HH:mm', new Date());
  const end = parse(endTime.substring(0, 5), 'HH:mm', new Date());
  const durationMinutes = differenceInMinutes(end, start);
  
  return Math.ceil(durationMinutes / 30);
};

/**
 * Format time for display
 * @param time - Time string like "10:00:00"
 * @returns Formatted time like "10:00"
 */
export const formatTime = (time: string): string => {
  const parsed = parse(time.substring(0, 5), 'HH:mm', new Date());
  return format(parsed, 'HH:mm');
};

/**
 * Get day column number (1-6)
 * @param day - Day name (e.g., "Monday")
 * @returns Column number
 */
export const dayToColumn = (day: string): number => {
  return DAYS.indexOf(day) + 1;
};
