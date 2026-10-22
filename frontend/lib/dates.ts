/*
 * The API sends calendar dates (`YYYY-MM-DD`) and wall-clock times (`HH:MM:SS`) in Tehran local time.
 * They are formatted as-is — never turned into a `Date` in the server's own timezone — so static pages
 * render identically wherever they are built.
 */

const TEHRAN_OFFSET = '+03:30';
const TEHRAN_TZ = 'Asia/Tehran';

const ORDINAL_SUFFIX: Record<Intl.LDMLPluralRule, string> = {
  one: 'st',
  two: 'nd',
  few: 'rd',
  other: 'th',
  zero: 'th',
  many: 'th',
};
const ordinalRules = new Intl.PluralRules('en-US', { type: 'ordinal' });

const weekdayDayFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});
const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC' });
const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  timeZone: TEHRAN_TZ,
});
const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

function calendarDate(date: string): Date {
  return new Date(`${date}T00:00:00Z`);
}

function minutesOfDay(time: string): number {
  const [hours = '0', minutes = '0'] = time.split(':');
  return Number(hours) * 60 + Number(minutes);
}

export function ordinal(value: number): string {
  return `${value}${ORDINAL_SUFFIX[ordinalRules.select(value)]}`;
}

/** `2025-04-10` → `Thu, April 10` */
export function formatEventDate(date: string): string {
  return weekdayDayFormatter.format(calendarDate(date));
}

/** `2025-04-10` → `April 10th` */
export function formatMonthDay(date: string): string {
  const day = calendarDate(date);
  return `${monthFormatter.format(day)} ${ordinal(day.getUTCDate())}`;
}

/** `2025-04-10` → `Apr 10, 2025` */
export function formatShortDate(date: string): string {
  return shortDateFormatter.format(calendarDate(date));
}

/** `14:30:00` → `2:30 PM` */
export function formatClock(time: string): string {
  const total = minutesOfDay(time);
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
}

/** An ISO timestamp, shown in Tehran time. */
export function formatDateTime(iso: string): string {
  return dateTimeFormatter.format(new Date(iso));
}

export function durationInMinutes(startTime: string, endTime: string): number {
  return minutesOfDay(endTime) - minutesOfDay(startTime);
}

/** Combines a Tehran-local date and time into an ISO-8601 timestamp (for JSON-LD and `<time>`). */
export function toIsoDateTime(date: string, time: string): string {
  return `${date}T${time.slice(0, 8)}${TEHRAN_OFFSET}`;
}
