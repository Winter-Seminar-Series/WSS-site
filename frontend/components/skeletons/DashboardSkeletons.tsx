import { LoadingRegion, Skeleton } from '@/ui/Skeleton';

/*
 * Loading states of the dashboard tabs. The dashboard layout (hero, tabs) is already on screen; these fill only the
 * tab's content area, shaped like what it will show.
 */

/** Labelled fields in a two-column form, then the submit button (profile). */
export function FormSkeleton({ label, fields = 8 }: { label: string; fields?: number }) {
  return (
    <LoadingRegion label={label} className="flex flex-col gap-8">
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: fields }, (_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
      <Skeleton className="h-11 w-40 self-end" />
    </LoadingRegion>
  );
}

/** Rows with a title and actions on the right (stream sessions, certificates, video licences). */
export function RowListSkeleton({ label, rows = 4 }: { label: string; rows?: number }) {
  return (
    <LoadingRegion label={label}>
      <ul aria-hidden className="flex flex-col gap-3">
        {Array.from({ length: rows }, (_, index) => (
          <li
            key={index}
            className="flex flex-col gap-3 rounded-md border border-line-soft p-4 md:flex-row md:items-center"
          >
            <Skeleton className="h-5 grow md:max-w-md" />
            <div className="flex gap-2">
              <Skeleton className="h-11 w-32" />
              <Skeleton className="h-11 w-11" />
            </div>
          </li>
        ))}
      </ul>
    </LoadingRegion>
  );
}

/** Selectable plan cards, then the price summary (registration). */
export function PlanPickerSkeleton() {
  return (
    <LoadingRegion label="Loading the registration options" className="flex flex-col gap-8">
      <Skeleton className="h-7 w-56" />
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} className="h-28 w-full rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-7 w-48" />
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-20 w-full rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-24 w-full rounded-lg" />
    </LoadingRegion>
  );
}

/** The poster upload box. */
export function UploadSkeleton() {
  return (
    <LoadingRegion label="Loading your poster submission" className="flex flex-col gap-4">
      <SkeletonLines />
      <Skeleton className="h-40 w-full rounded-lg" />
      <Skeleton className="h-11 w-40" />
    </LoadingRegion>
  );
}

function SkeletonLines() {
  return (
    <div aria-hidden className="flex flex-col gap-3">
      <Skeleton className="h-4 w-full max-w-xl" />
      <Skeleton className="h-4 w-2/3 max-w-md" />
    </div>
  );
}

/** The "Registered: …" badge in the dashboard hero. */
export function RegistrationBadgeSkeleton() {
  return (
    <LoadingRegion label="Loading your registration">
      <Skeleton className="h-10 w-44 md:h-14 md:w-56" />
    </LoadingRegion>
  );
}
