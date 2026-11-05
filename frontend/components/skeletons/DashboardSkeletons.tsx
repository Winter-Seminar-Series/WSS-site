import { LoadingRegion, Skeleton } from '@/ui/Skeleton';

/*
 * Loading states of the dashboard tabs. The dashboard shell (navbar, sidebar or tab bar, title) is already on screen;
 * these fill only the tab's content area, shaped like the cards it will show.
 */

const CARD = 'rounded-3xl bg-surface p-5 ring-1 ring-line-soft md:p-8';

function CardHeading() {
  return (
    <div className="mb-6 flex flex-col gap-2">
      <Skeleton className="h-7 w-48" />
      <Skeleton className="h-4 w-full max-w-sm" />
    </div>
  );
}

/** Cards of labelled fields, then the sticky save bar (profile). */
export function FormSkeleton({ label, fields = 8 }: { label: string; fields?: number }) {
  return (
    <LoadingRegion label={label} className="flex flex-col gap-5 md:gap-6">
      <div aria-hidden className={CARD}>
        <CardHeading />
        <div className="grid gap-5 lg:grid-cols-2">
          {Array.from({ length: fields }, (_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>
      <Skeleton className="h-16 w-full rounded-3xl" />
    </LoadingRegion>
  );
}

/** Cards with a title and actions (stream sessions, certificates, video licences). */
export function RowListSkeleton({ label, rows = 3 }: { label: string; rows?: number }) {
  return (
    <LoadingRegion label={label}>
      <ul aria-hidden className="flex flex-col gap-3">
        {Array.from({ length: rows }, (_, index) => (
          <li
            key={index}
            className="flex flex-col gap-4 rounded-3xl bg-surface p-5 ring-1 ring-line-soft sm:flex-row sm:items-center"
          >
            <div className="flex grow flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-full max-w-md" />
            </div>
            <Skeleton className="h-11 w-full rounded-full sm:w-28" />
          </li>
        ))}
      </ul>
    </LoadingRegion>
  );
}

/** Attendance cards, workshops, then the total bar (registration). */
export function PlanPickerSkeleton() {
  return (
    <LoadingRegion label="Loading the registration options" className="flex flex-col gap-5 md:gap-6">
      <div aria-hidden className={CARD}>
        <CardHeading />
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 2 }, (_, index) => (
            <Skeleton key={index} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      </div>
      <div aria-hidden className={CARD}>
        <CardHeading />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton key={index} className="h-72 w-full rounded-2xl" />
          ))}
        </div>
      </div>
      <Skeleton className="h-18 w-full rounded-3xl" />
    </LoadingRegion>
  );
}

/** The poster upload card. */
export function UploadSkeleton() {
  return (
    <LoadingRegion label="Loading your poster submission">
      <div aria-hidden className={CARD}>
        <CardHeading />
        <Skeleton className="h-52 w-full rounded-2xl" />
        <Skeleton className="mt-5 h-11 w-36 rounded-full" />
      </div>
    </LoadingRegion>
  );
}

/** The registration pill in the dashboard header. */
export function RegistrationBadgeSkeleton() {
  return (
    <LoadingRegion label="Loading your registration">
      <Skeleton className="h-10 w-52 rounded-full" />
    </LoadingRegion>
  );
}
