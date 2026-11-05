import type { ReactNode } from 'react';

/**
 * Keeps a form's main action in reach at the bottom of the screen while the form scrolls: above the dashboard's
 * tab bar on phones, at the bottom edge on larger screens. It settles in place at the end of the form.
 */
export function StickyActionBar({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-[calc(var(--tabbar-height)+0.75rem)] z-30 md:bottom-6">
      <div className="flex items-center gap-4 rounded-3xl bg-surface/90 p-2.5 shadow-lift ring-1 ring-line-soft backdrop-blur-xl backdrop-saturate-150 md:p-3">
        {children}
      </div>
    </div>
  );
}
