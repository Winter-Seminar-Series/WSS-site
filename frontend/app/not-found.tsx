import type { Metadata } from 'next';

import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { PageHero } from '@/components/layout/PageHero';
import { editionNav } from '@/lib/edition-nav';
import { LinkButton } from '@/ui/Button';

export const metadata: Metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <>
      <Navbar variant="overlay" nav={editionNav()} />
      <main id="main" className="pb-16">
        <PageHero overline="404" title="Page not found">
          <p className="mt-6 text-lg text-muted">The page you are looking for does not exist or has been moved.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/">Back to home</LinkButton>
            <LinkButton href="/seminars" variant="soft">
              Browse seminars
            </LinkButton>
          </div>
        </PageHero>
      </main>
      <Footer />
    </>
  );
}
