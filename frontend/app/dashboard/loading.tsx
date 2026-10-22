import { RowListSkeleton } from '@/components/skeletons/DashboardSkeletons';

/** Fallback for tabs without a loading state of their own. */
export default function Loading() {
  return <RowListSkeleton label="Loading" />;
}
