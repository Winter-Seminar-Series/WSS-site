import { CalendarDays, Clock, LayoutGrid } from 'lucide-react';

import { durationInMinutes, formatClock, formatEventDate, formatMonthDay, toIsoDateTime } from '@/lib/dates';

interface SessionMetaProps {
  date: string;
  startTime: string;
  endTime: string;
  className?: string;
}

const ROW = 'flex flex-wrap items-center gap-x-4 gap-y-1.5 font-semibold text-muted';
const ITEM = 'flex items-center gap-1.5';

/** "Thu, April 10, 9:00 AM" and "90 minutes" */
export function SessionMeta({ date, startTime, endTime, className = '' }: SessionMetaProps) {
  return (
    <div className={`${ROW} ${className}`}>
      <span className={ITEM}>
        <CalendarDays className="size-4 shrink-0 text-brand" aria-hidden />
        <time dateTime={toIsoDateTime(date, startTime)}>
          {formatEventDate(date)}, {formatClock(startTime)}
        </time>
      </span>
      <span className={ITEM}>
        <Clock className="size-4 shrink-0 text-brand" aria-hidden />
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

/** "April 10th – April 11th" and "3 modules" */
export function WorkshopMeta({ startDate, endDate, modules, className = '' }: WorkshopMetaProps) {
  return (
    <div className={`${ROW} ${className}`}>
      {startDate && (
        <span className={ITEM}>
          <CalendarDays className="size-4 shrink-0 text-brand" aria-hidden />
          {formatMonthDay(startDate)}
          {endDate && endDate !== startDate && ` – ${formatMonthDay(endDate)}`}
        </span>
      )}
      <span className={ITEM}>
        <LayoutGrid className="size-4 shrink-0 text-brand" aria-hidden />
        {modules} {modules === 1 ? 'module' : 'modules'}
      </span>
    </div>
  );
}
