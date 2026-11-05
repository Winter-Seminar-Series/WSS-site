import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { RegisterCta } from '@/components/countdown/RegisterCta';
import { PageBody, PageHero } from '@/components/layout/PageHero';
import { editionStaticParams, resolveEdition } from '@/lib/edition-route';
import { markdownToHtml } from '@/lib/markdown';
import { editionPageMetadata } from '@/lib/metadata';
import { RichText } from '@/ui/RichText';

export const generateStaticParams = editionStaticParams();

export async function generateMetadata({ params }: PageProps<'/[edition]/poster-session'>): Promise<Metadata> {
  return editionPageMetadata(
    await resolveEdition(params, 'poster-session'),
    'Poster Session',
    'Present your research at the Winter Seminar Series poster session: format, judging, awards and submission requirements.',
    '/poster-session',
  );
}

export default async function PosterSessionPage({ params }: PageProps<'/[edition]/poster-session'>) {
  const edition = await resolveEdition(params, 'poster-session');
  // Read at build time: this page is fully static.
  const markdown = await readFile(path.join(process.cwd(), 'content', 'poster-session.md'), 'utf8');
  const html = await markdownToHtml(markdown);

  return (
    <>
      <PageHero
        image={edition.heroImage}
        context={edition.title}
        title="Poster session"
        lead="Present your research, get feedback from the judges and compete for the awards."
      />
      <PageBody>
        <RichText
          html={html}
          className="prose-lg max-w-3xl prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-ink"
        />
      </PageBody>
      <RegisterCta edition={edition} />
    </>
  );
}
