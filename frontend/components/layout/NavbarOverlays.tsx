'use client';

import { ArrowUpRight, Check, X } from 'lucide-react';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'motion/react';
import type { Variants } from 'motion/react';
import Link from 'next/link';
import { useEffect } from 'react';

import { Logo } from '@/components/brand/Logo';
import type { EditionLink } from '@/lib/edition-switch';
import type { NavLink } from '@/lib/site';
import { LinkButton } from '@/ui/Button';

/*
 * The navbar's animated overlays. Loaded with next/dynamic on first open, so `motion` never ships with the
 * initial page JS — most visitors never open either of them.
 */

const EASE = [0.2, 0.8, 0.2, 1] as const;

interface EditionsPanelProps {
  open: boolean;
  editions: EditionLink[];
  onSelect: () => void;
}

export function EditionsPanel({ open, editions, onSelect }: EditionsPanelProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {open && (
          <m.ul
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="absolute end-0 mt-2 w-52 origin-top-right overflow-hidden rounded-2xl bg-surface p-1.5 text-ink shadow-lift ring-1 ring-line-soft"
          >
            {editions.map(({ href, label, current }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={onSelect}
                  aria-current={current ? 'true' : undefined}
                  className="flex min-h-10 items-center justify-between rounded-xl px-3 text-sm font-semibold transition-colors hover:bg-canvas aria-[current=true]:bg-brand-soft aria-[current=true]:text-brand-strong"
                >
                  {label}
                  {current && <Check className="size-4" aria-hidden />}
                </Link>
              </li>
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}

const LIST: Variants = {
  open: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } },
  closed: {},
};

const ITEM: Variants = {
  open: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
  closed: { opacity: 0, x: 24 },
};

interface MobileDrawerProps {
  open: boolean;
  pathname: string;
  home: NavLink;
  links: NavLink[];
  editions: EditionLink[];
  /** What the account buttons show; `null` on an archived edition, which has no accounts. */
  account: 'signed-in' | 'signed-out' | null;
  onClose: () => void;
}

export function MobileDrawer({ open, pathname, home, links, editions, account, onClose }: MobileDrawerProps) {
  // Escape closes it and the page behind stops scrolling while it is open: document-level side effects.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-60 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
            <m.div
              className="absolute inset-0 bg-ink-deep/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={onClose}
            />
            <m.aside
              className="absolute inset-y-0 end-0 flex w-full max-w-sm flex-col overflow-y-auto overscroll-contain bg-surface text-ink shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div className="flex h-(--navbar-height) shrink-0 items-center justify-between px-4">
                <Logo className="w-10" />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="-me-2 flex size-11 items-center justify-center rounded-full transition-colors hover:bg-canvas"
                  autoFocus
                >
                  <X className="size-6" aria-hidden />
                </button>
              </div>

              <m.ul className="flex flex-col px-3 pt-2" variants={LIST} initial="closed" animate="open">
                {[home, ...links].map(({ href, label }) => (
                  <m.li key={href} variants={ITEM}>
                    <Link
                      href={href}
                      onClick={onClose}
                      aria-current={pathname === href ? 'page' : undefined}
                      className="flex min-h-14 items-center rounded-2xl px-3 text-2xl font-bold tracking-tight transition-colors hover:bg-canvas aria-[current=page]:text-brand"
                    >
                      {label}
                    </Link>
                  </m.li>
                ))}
              </m.ul>

              <div className="mt-auto flex flex-col gap-6 px-6 pt-8 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
                <div>
                  <p className="text-sm font-semibold text-muted">Editions</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {editions.map(({ href, label, current }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          onClick={onClose}
                          aria-current={current ? 'true' : undefined}
                          className="flex min-h-10 items-center gap-1 rounded-full border border-line px-3.5 text-sm font-semibold transition-colors hover:bg-canvas aria-[current=true]:border-brand aria-[current=true]:bg-brand-soft aria-[current=true]:text-brand-strong"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {account === 'signed-in' && (
                  <LinkButton href="/dashboard/profile" onClick={onClose} size="lg">
                    Go to your dashboard
                    <ArrowUpRight className="size-5" aria-hidden />
                  </LinkButton>
                )}
                {account === 'signed-out' && (
                  <div className="grid grid-cols-2 gap-3">
                    <LinkButton href="/login" onClick={onClose} variant="outline" size="lg">
                      Log in
                    </LinkButton>
                    <LinkButton href="/signup" onClick={onClose} size="lg">
                      Sign up
                    </LinkButton>
                  </div>
                )}
              </div>
            </m.aside>
          </div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
