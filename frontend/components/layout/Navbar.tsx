'use client';

import { ChevronDown, Menu } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

import { Logo } from '@/components/brand/Logo';
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
    () => window.scrollY > 10,
    () => false,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Mount (and so download) the drawer on first open only; it then stays mounted to animate closing.
  const [drawerRequested, setDrawerRequested] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Close the drawer on navigation without an effect: compare against the path it was opened on.
  if (drawerOpen && openedAt !== pathname) setDrawerOpen(false);

  const transparent = variant === 'overlay' && !scrolled && !drawerOpen;
  const tone = transparent ? 'text-white' : 'text-ink';
  // The same section in every other edition, so switching keeps the visitor where they are.
  const editions: EditionLink[] = nav.editions.map((target) => ({
    label: target.label,
    href: switchEditionHref(pathname, nav.edition, target),
    current: target.slug === nav.edition.slug,
  }));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
          transparent ? 'bg-transparent' : 'border-b border-line-soft bg-surface/95 backdrop-blur'
        }`}
      >
        <nav
          aria-label="Main"
          className={`mx-auto flex h-(--navbar-height) max-w-300 items-center justify-between gap-4 px-4 md:px-6 ${tone}`}
        >
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              className="-ms-2 flex min-h-11 min-w-11 items-center justify-center md:hidden"
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
            <Link
              href={nav.edition.homeHref}
              className="flex min-h-11 items-center"
              aria-label={`${nav.edition.label} — home`}
            >
              <Logo className="w-10 lg:w-14" />
            </Link>
          </div>

          <ul className="hidden items-center gap-1 md:flex lg:gap-4">
            {nav.links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(pathname, href) ? 'page' : undefined}
                  className="relative block px-3 py-3 font-medium after:absolute after:inset-x-3 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:bg-current after:transition-transform hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/* Accounts belong to the current edition; archives are read-only, like the old edition sites. */}
            {!nav.isCurrent ? null : isSignedIn ? (
              <LinkButton href="/dashboard/profile" variant={transparent ? 'light' : 'primary'} size="sm">
                Dashboard
              </LinkButton>
            ) : (
              <>
                <LinkButton href="/signup" variant={transparent ? 'light' : 'primary'} size="sm">
                  Sign Up
                </LinkButton>
                <LinkButton href="/login" variant={transparent ? 'outline-light' : 'ghost'} size="sm">
                  Login
                </LinkButton>
              </>
            )}
            <EditionsMenu label={nav.edition.label} editions={editions} transparent={transparent} />
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

  // Outside clicks and Escape are document-level events — an external system.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative hidden sm:block">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`Edition: ${label}. Switch edition`}
        onClick={() => {
          setRequested(true);
          setOpen((value) => !value);
        }}
        className={`flex min-h-9 items-center gap-1 rounded-md px-3 text-sm font-semibold transition-colors ${
          transparent ? 'hover:bg-white/10' : 'hover:bg-brand-soft'
        }`}
      >
        {label}
        <ChevronDown className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      {requested && <EditionsPanel open={open} editions={editions} onSelect={() => setOpen(false)} />}
    </div>
  );
}
