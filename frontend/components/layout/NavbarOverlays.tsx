'use client';

import { Check, X } from 'lucide-react';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'motion/react';
import Link from 'next/link';

import { Logo } from '@/components/brand/Logo';
import type { EditionLink } from '@/lib/edition-switch';
import type { NavLink } from '@/lib/site';

/*
 * The navbar's animated overlays. Loaded with next/dynamic on first open, so `motion` never ships with the
 * initial page JS — most visitors never open either of them.
 */

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
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute end-0 mt-2 w-48 overflow-hidden rounded-md bg-surface py-1 text-ink shadow-lg ring-1 ring-line-soft"
          >
            {editions.map(({ href, label, current }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={onSelect}
                  aria-current={current ? 'true' : undefined}
                  className="flex items-center justify-between px-4 py-2.5 text-sm font-medium hover:bg-brand-soft aria-[current=true]:text-brand"
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

interface MobileDrawerProps {
  open: boolean;
  pathname: string;
  home: NavLink;
  links: NavLink[];
  editions: EditionLink[];
  onClose: () => void;
}

export function MobileDrawer({ open, pathname, home, links, editions, onClose }: MobileDrawerProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-60 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
            <m.div
              className="absolute inset-0 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <m.aside
              className="absolute inset-y-0 start-0 flex w-3/4 max-w-xs flex-col overflow-y-auto overscroll-contain bg-surface shadow-2xl"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.2 }}
            >
              <div className="flex h-(--navbar-height) items-center justify-between px-4">
                <Logo className="w-10 text-ink" />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="flex min-h-11 min-w-11 items-center justify-center"
                >
                  <X className="size-6" aria-hidden />
                </button>
              </div>
              <ul className="divide-y divide-line-soft border-y border-line-soft font-medium">
                {[home, ...links].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={onClose}
                      aria-current={pathname === href ? 'page' : undefined}
                      className="block px-5 py-3.5 aria-[current=page]:text-brand"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="px-5 pt-6 pb-2 text-xs font-semibold tracking-wide text-muted uppercase">Editions</p>
              <ul className="pb-6">
                {editions.map(({ href, label, current }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      onClick={onClose}
                      aria-current={current ? 'true' : undefined}
                      className="block px-5 py-2.5 text-sm aria-[current=true]:font-semibold aria-[current=true]:text-brand"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </m.aside>
          </div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
