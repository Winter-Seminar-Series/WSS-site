'use client';

import { Ellipsis, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

import { logoutAction } from '@/actions/auth.actions';
import { DASHBOARD_TABS } from '@/lib/dashboard';
import type { DashboardTab } from '@/lib/dashboard';

const TAB_BAR_ITEM =
  'group flex h-full flex-col items-center justify-center gap-1 text-[0.6875rem] font-semibold text-muted transition-colors aria-[current=page]:text-brand-strong';
const TAB_BAR_ICON =
  'flex h-7 w-12 items-center justify-center rounded-full transition-[background-color,transform] duration-300 ease-snap group-active:scale-90 group-aria-[current=page]:bg-brand-soft';

/** Hidden tabs stay reachable by URL; while one is open, it shows up so the visitor can see where they are. */
function useTabs(): { tabs: DashboardTab[]; current: DashboardTab | undefined } {
  const pathname = usePathname();
  const current = DASHBOARD_TABS.find((tab) => pathname === tab.href || pathname.startsWith(`${tab.href}/`));
  return { tabs: DASHBOARD_TABS.filter((tab) => tab.visible || tab === current), current };
}

/** The tab's name and what it is for: the page's <h1>. */
export function DashboardTitle() {
  const { current } = useTabs();
  return (
    <div className="min-w-0">
      <h1 className="text-3xl font-extrabold tracking-[-0.04em] text-ink md:text-4xl">
        {current?.label ?? 'Dashboard'}
      </h1>
      {current && <p className="mt-1.5 text-[0.9375rem] text-muted">{current.description}</p>}
    </div>
  );
}

/** Tablets and up: a column of tabs beside the content, with logging out at the end. */
export function DashboardSidebar() {
  const { tabs, current } = useTabs();

  return (
    <nav aria-label="Dashboard" className="sticky top-[calc(var(--navbar-height)+2.5rem)] flex flex-col gap-1">
      <ul className="flex flex-col gap-1">
        {tabs.map((tab) => {
          const { href, label, Icon } = tab;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={tab === current ? 'page' : undefined}
                className="group flex min-h-12 items-center gap-3 rounded-2xl px-3 text-[0.9375rem] font-semibold text-ink/75 transition-colors hover:bg-surface hover:text-ink aria-[current=page]:bg-surface aria-[current=page]:text-ink aria-[current=page]:shadow-card"
              >
                <span className="flex size-9 items-center justify-center rounded-xl text-muted transition-colors group-hover:text-brand group-aria-[current=page]:bg-brand group-aria-[current=page]:text-white">
                  <Icon className="size-5" aria-hidden />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
      <form action={logoutAction} className="mt-4 border-t border-line pt-4">
        <button
          type="submit"
          className="group flex min-h-12 w-full items-center gap-3 rounded-2xl px-3 text-[0.9375rem] font-semibold text-muted transition-colors hover:bg-danger-soft hover:text-danger"
        >
          <span className="flex size-9 items-center justify-center">
            <LogOut className="size-5" aria-hidden />
          </span>
          Log out
        </button>
      </form>
    </nav>
  );
}

const MORE_SHEET_ID = 'dashboard-more';

/**
 * Phones: an app-style bar fixed to the bottom of the screen, in reach of the thumb. It holds the main tabs plus
 * "More", which opens a bottom sheet with the rest and logging out. The sheet is a native popover: it closes on Escape
 * and on a tap outside, and animates in CSS, with no script of its own.
 */
export function DashboardTabBar() {
  const { tabs, current } = useTabs();
  const sheetRef = useRef<HTMLDivElement>(null);
  const barTabs = tabs.filter((tab) => tab.phone === 'bar');
  const sheetTabs = tabs.filter((tab) => tab.phone === 'more');
  const moreActive = current !== undefined && sheetTabs.includes(current);
  // Client navigation keeps the page, so a link inside the popover has to close it.
  const closeSheet = () => sheetRef.current?.hidePopover();

  return (
    <>
      <nav
        aria-label="Dashboard"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line-soft bg-surface/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl backdrop-saturate-150 md:hidden"
      >
        <ul
          className="mx-auto grid h-16 max-w-lg"
          style={{ gridTemplateColumns: `repeat(${barTabs.length + 1}, minmax(0, 1fr))` }}
        >
          {barTabs.map((tab) => {
            const { href, label, shortLabel, Icon } = tab;
            return (
              <li key={href}>
                <Link href={href} aria-current={tab === current ? 'page' : undefined} className={TAB_BAR_ITEM}>
                  <span className={TAB_BAR_ICON}>
                    <Icon className="size-5" aria-hidden />
                  </span>
                  {shortLabel ?? label}
                </Link>
              </li>
            );
          })}
          {/* Always there, even with no tab in the sheet: logging out lives in it. */}
          <li>
            <button
              type="button"
              popoverTarget={MORE_SHEET_ID}
              aria-current={moreActive ? 'page' : undefined}
              className={`${TAB_BAR_ITEM} w-full`}
            >
              <span className={TAB_BAR_ICON}>
                <Ellipsis className="size-5" aria-hidden />
              </span>
              More
            </button>
          </li>
        </ul>
      </nav>

      <div
        ref={sheetRef}
        id={MORE_SHEET_ID}
        popover="auto"
        aria-label="More"
        className="inset-x-0 top-auto bottom-0 m-0 w-full max-w-none translate-y-full rounded-t-3xl border-0 bg-surface p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] text-ink shadow-lift transition-[translate,overlay,display] transition-discrete duration-300 ease-snap backdrop:bg-ink-deep/40 backdrop:backdrop-blur-sm open:translate-y-0 md:hidden starting:open:translate-y-full"
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line" aria-hidden />
        {sheetTabs.length > 0 && (
          <ul className="mb-2 flex flex-col gap-1 border-b border-line-soft pb-2">
            {sheetTabs.map((tab) => {
              const { href, label, description, Icon } = tab;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={closeSheet}
                    aria-current={tab === current ? 'page' : undefined}
                    className="flex min-h-16 items-center gap-4 rounded-2xl px-3 transition-colors hover:bg-canvas aria-[current=page]:bg-brand-soft"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-canvas text-brand">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-bold">{label}</span>
                      <span className="block truncate text-sm text-muted">{description}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex min-h-14 w-full items-center gap-4 rounded-2xl px-3 font-bold text-danger transition-colors hover:bg-danger-soft"
          >
            <span className="flex size-11 items-center justify-center">
              <LogOut className="size-5" aria-hidden />
            </span>
            Log out
          </button>
        </form>
      </div>
    </>
  );
}
