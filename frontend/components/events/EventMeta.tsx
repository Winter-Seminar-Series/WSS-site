import { CalendarDays, Clock, LayoutGrid } from 'lucide-react';

import { durationInMinutes, formatClock, formatEventDate, formatMonthDay, toIsoDateTime } from '@/lib/dates';

interface SessionMetaProps {
  date: string;
  startTime: string;
  endTime: string;
  className?: string;
}

/** "Thu, April 10, 9:00 AM · 90 minutes" */
export function SessionMeta({ date, startTime, endTime, className = '' }: SessionMetaProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-1 font-medium tracking-wide text-muted uppercase ${className}`}
    >
      <span className="flex items-center gap-1.5">
        <CalendarDays className="size-5 shrink-0" aria-hidden />
        <time dateTime={toIsoDateTime(date, startTime)}>
          {formatEventDate(date)}, {formatClock(startTime)}
        </time>
      </span>
      <span className="flex items-center gap-1.5">
        <Clock className="size-5 shrink-0" aria-hidden />
        {durationInMinutes(startTime, endTime)} minutes
      </span>
    </div>
  );
}

interface WorkshopMetaProps {
  startDate: string | null;
  endDate: string | null;
  modules: number;
  className?: string;
}

/** "April 10th – April 11th · 3 modules" */
export function WorkshopMeta({ startDate, endDate, modules, className = '' }: WorkshopMetaProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-1 font-medium tracking-wide text-muted uppercase ${className}`}
    >
      {startDate && (
        <span className="flex items-center gap-1.5">
          <CalendarDays className="size-5 shrink-0" aria-hidden />
          {formatMonthDay(startDate)}
          {endDate && endDate !== startDate && ` – ${formatMonthDay(endDate)}`}
        </span>
      )}
      <span className="flex items-center gap-1.5">
        <LayoutGrid className="size-5 shrink-0" aria-hidden />
        {modules} {modules === 1 ? 'module' : 'modules'}
      </span>
    </div>
  );
}
