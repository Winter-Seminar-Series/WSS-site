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
      <main id="main">
        <PageHero
          context="Error 404"
          title="This page is not here"
          lead="It may have moved, or the link has a typo. The talks and the home page are a click away."
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/" variant="light" size="lg">
              Back to home
            </LinkButton>
            <LinkButton href="/seminars" variant="outline-light" size="lg">
              Browse seminars
            </LinkButton>
          </div>
        </PageHero>
        <div className="h-16" />
      </main>
      <Footer />
    </>
  );
}
