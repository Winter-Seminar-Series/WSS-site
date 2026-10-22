import { redirect } from 'next/navigation';

import { isHttpError } from '@/services/http';

/**
 * Runs an authenticated data load for a dashboard page. A rejected session sends the visitor to log in;
 * anything else is unexpected and bubbles to the error boundary.
 */
export async function withAuth<T>(load: () => Promise<T>, returnTo: string): Promise<T> {
  try {
    return await load();
  } catch (error) {
    if (isHttpError(error, 401)) redirect(`/login?next=${encodeURIComponent(returnTo)}`);
    throw error;
  }
}
