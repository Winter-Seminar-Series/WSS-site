import { FormSkeleton } from '@/components/skeletons/DashboardSkeletons';

export default function Loading() {
  return <FormSkeleton label="Loading your profile" fields={12} />;
}
