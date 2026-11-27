import type { Metadata } from 'next';

import { PasswordForm } from '@/app/dashboard/password/_components/PasswordForm';

export const metadata: Metadata = { title: 'Password' };

// Signed-out visitors never get here: proxy.ts sends them to /login, and the action itself needs the session.
export default function PasswordPage() {
  return <PasswordForm />;
}
