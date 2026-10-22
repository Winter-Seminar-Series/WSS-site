import { redirect } from 'next/navigation';

export default function DashboardIndex(): never {
  redirect('/dashboard/profile');
}
