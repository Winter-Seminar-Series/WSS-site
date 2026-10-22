import type { Viewport } from 'next';

import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { editionNav } from '@/lib/edition-nav';
import { resolveEdition } from '@/lib/edition-route';
import { editionThemeColor, editionThemeStyle } from '@/lib/edition-theme';

/*
 * Public pages of every edition. The current edition is served at the root through the rewrites in next.config.ts,
 * the others under their slug (`/8th/…`). The wrapper re-themes the whole subtree for the edition.
 */

export async function generateViewport({ params }: LayoutProps<'/[edition]'>): Promise<Viewport> {
  return { themeColor: editionThemeColor(await resolveEdition(params)) };
}

export default async function EditionLayout({ children, params }: LayoutProps<'/[edition]'>) {
  const edition = await resolveEdition(params);

  return (
    <div data-edition={edition.slug} style={editionThemeStyle(edition)}>
      <Navbar variant="overlay" nav={editionNav(edition)} />
      <main id="main">{children}</main>
      <Footer edition={edition} />
    </div>
  );
}
