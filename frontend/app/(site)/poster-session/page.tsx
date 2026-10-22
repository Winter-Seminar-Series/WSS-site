import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { RegisterCta } from '@/components/countdown/RegisterCta';
import { PageHero } from '@/components/layout/PageHero';
import { markdownToHtml } from '@/lib/markdown';
import { pageMetadata } from '@/lib/metadata';
import { RichText } from '@/ui/RichText';

export const metadata: Metadata = pageMetadata(
  'Poster Session',
  'Present your research at the Winter Seminar Series poster session: format, judging, awards and submission requirements.',
  '/poster-session',
);

export default async function PosterSessionPage() {
  // Read at build time: this page is fully static.
  const markdown = await readFile(path.join(process.cwd(), 'content', 'poster-session.md'), 'utf8');
  const html = await markdownToHtml(markdown);

  return (
    <>
      <PageHero overline="Join our competition" title="Poster Session">
        <hr className="my-8 border-line-soft" />
        <RichText html={html} className="prose-lg" />
      </PageHero>
      <div className="h-16" />
      <RegisterCta />
    </>
  );
}
