'use client';

import { ChevronDown, Menu } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

import { Logo } from '@/components/brand/Logo';
import { PendingHint } from '@/components/navigation/PendingHint';
import { useIsSignedIn } from '@/hooks/useIsSignedIn';
import { switchEditionHref } from '@/lib/edition-switch';
import type { EditionLink, EditionNav } from '@/lib/edition-switch';
import { LinkButton } from '@/ui/Button';

const MobileDrawer = dynamic(() => import('@/components/layout/NavbarOverlays').then((mod) => mod.MobileDrawer), {
  ssr: false,
});
const EditionsPanel = dynamic(() => import('@/components/layout/NavbarOverlays').then((mod) => mod.EditionsPanel), {
  ssr: false,
});

interface Props {
  /** `overlay` starts transparent over a dark hero and turns solid on scroll. */
  variant?: 'overlay' | 'solid';
  /** The edition being browsed: its menu, and the editions to switch to (lib/edition-nav.ts). */
  nav: EditionNav;
}

function subscribeToScroll(onChange: () => void): () => void {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar({ variant = 'overlay', nav }: Props) {
  const pathname = usePathname();
  const isSignedIn = useIsSignedIn();
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 24,
    () => false,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Mount (and so download) the drawer on first open only; it then stays mounted to animate closing.
  const [drawerRequested, setDrawerRequested] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Close the drawer on navigation without an effect: compare against the path it was opened on.
  if (drawerOpen && openedAt !== pathname) setDrawerOpen(false);

  const transparent = variant === 'overlay' && !scrolled;
  // The same section in every other edition, so switching keeps the visitor where they are.
  const editions: EditionLink[] = nav.editions.map((target) => ({
    label: target.label,
    href: switchEditionHref(pathname, nav.edition, target),
    current: target.slug === nav.edition.slug,
  }));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300 ${
          transparent
            ? 'bg-linear-to-b from-black/35 to-transparent text-white'
            : 'bg-surface/85 text-ink shadow-[0_1px_0] shadow-line-soft backdrop-blur-xl backdrop-saturate-150'
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-(--navbar-height) max-w-300 items-center justify-between gap-4 px-4 md:px-6"
        >
          <Link
            href={nav.edition.homeHref}
            className="flex min-h-11 shrink-0 items-center gap-3"
            aria-label={`${nav.edition.label} — home`}
          >
            <Logo className="w-10 lg:w-12" />
            {/* One line wherever it fits: beside the menu button below lg, and beside the full menu from xl. */}
            <span className="hidden text-sm font-bold whitespace-nowrap sm:block lg:hidden xl:block">
              Winter Seminar Series
            </span>
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {nav.links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(pathname, href) ? 'page' : undefined}
                  className={`relative flex min-h-11 items-center rounded-full px-3.5 text-[0.9375rem] font-semibold whitespace-nowrap transition-colors lg:px-4 ${
                    transparent
                      ? 'text-white/85 hover:bg-white/12 hover:text-white aria-[current=page]:bg-white/18 aria-[current=page]:text-white'
                      : 'text-ink/75 hover:bg-canvas hover:text-ink aria-[current=page]:bg-brand-soft aria-[current=page]:text-brand-strong'
                  }`}
                >
                  {label}
                  <PendingHint />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Accounts belong to the current edition; archives are read-only, like the old edition sites. */}
            {nav.isCurrent &&
              (isSignedIn ? (
                // Inside the dashboard the sidebar or tab bar already is the way around.
                !pathname.startsWith('/dashboard') && (
                  <LinkButton href="/dashboard/profile" variant={transparent ? 'light' : 'primary'} size="sm">
                    Dashboard
                  </LinkButton>
                )
              ) : (
                <>
                  <LinkButton
                    href="/login"
                    variant={transparent ? 'outline-light' : 'ghost'}
                    size="sm"
                    className="max-sm:hidden"
                  >
                    Log in
                  </LinkButton>
                  <LinkButton href="/signup" variant={transparent ? 'light' : 'primary'} size="sm">
                    Sign up
                  </LinkButton>
                </>
              ))}
            <EditionsMenu label={nav.edition.label} editions={editions} transparent={transparent} />
            <button
              type="button"
              className={`-me-2 flex size-11 items-center justify-center rounded-full transition-colors lg:hidden ${
                transparent ? 'hover:bg-white/12' : 'hover:bg-canvas'
              }`}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => {
                setOpenedAt(pathname);
                setDrawerRequested(true);
                setDrawerOpen(true);
              }}
            >
              <Menu className="size-6" aria-hidden />
            </button>
          </div>
        </nav>
      </header>

      {drawerRequested && (
        <MobileDrawer
          open={drawerOpen}
          pathname={pathname}
          home={{ href: nav.edition.homeHref, label: 'Home' }}
          links={nav.links}
          editions={editions}
          account={nav.isCurrent ? (isSignedIn ? 'signed-in' : 'signed-out') : null}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </>
  );
}

interface EditionsMenuProps {
  label: string;
  editions: EditionLink[];
  transparent: boolean;
}

function EditionsMenu({ label, editions, transparent }: EditionsMenuProps) {
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load the panel's code on intent (hover or focus), so it opens without a delay. Its links then prefetch their
  // pages themselves as they appear, which is in time: prefetching every edition on hover measured no faster.
  const warmUp = () => setRequested(true);

  // Outside clicks and Escape are document-level events — an external system.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        containerRef.current?.querySelector('button')?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative hidden md:block">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`Edition: ${label}. Switch edition`}
        onPointerEnter={warmUp}
        onFocus={warmUp}
        onClick={() => {
          setRequested(true);
          setOpen((value) => !value);
        }}
        className={`flex min-h-11 items-center gap-1 rounded-full px-3 text-sm font-semibold transition-colors ${
          transparent ? 'hover:bg-white/12' : 'hover:bg-canvas'
        }`}
      >
        {label}
        <ChevronDown
          className={`size-4 transition-transform duration-300 ease-snap ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      {requested && <EditionsPanel open={open} editions={editions} onSelect={() => setOpen(false)} />}
    </div>
  );
}
