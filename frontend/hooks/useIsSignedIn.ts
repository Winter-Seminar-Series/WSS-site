'use client';

import { useSyncExternalStore } from 'react';

import { hasAuthHint } from '@/lib/auth-hint';

function subscribe(): () => void {
  // The hint only changes across navigations (login/logout redirect), so there is nothing to listen to.
  return () => {};
}

/** Whether the visitor looks signed in. Always false on the server, so prerendered HTML stays shared. */
export function useIsSignedIn(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => hasAuthHint(document.cookie),
    () => false,
  );
}
