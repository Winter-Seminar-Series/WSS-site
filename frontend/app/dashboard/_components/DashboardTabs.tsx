'use client';

import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { logoutAction } from '@/actions/auth.actions';
import { DASHBOARD_TABS } from '@/lib/dashboard';

export function DashboardTabs() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Dashboard"
      className="-mx-6 flex items-center justify-between gap-2 overflow-x-auto overscroll-x-contain border-b border-line md:mx-0"
    >
      <ul className="flex">
        {DASHBOARD_TABS.filter((tab) => tab.visible || tab.href === pathname).map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`-mb-px flex min-h-11 items-center gap-2 border-b-2 px-4 py-4 font-semibold whitespace-nowrap md:px-6 md:text-lg ${
                  active ? 'border-accent text-accent' : 'border-transparent text-ink hover:text-accent'
                }`}
              >
                <Icon className="size-5" aria-hidden />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
      <form action={logoutAction}>
        <button
          type="submit"
          className="flex min-h-11 items-center gap-2 px-4 font-semibold whitespace-nowrap text-danger md:px-6 md:text-lg"
        >
          <LogOut className="size-5" aria-hidden />
          Log out
        </button>
      </form>
    </nav>
  );
}
