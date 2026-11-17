import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { Logo } from '@/components/brand/Logo';
import { formatDateRange } from '@/lib/dates';
import { editionColors } from '@/lib/edition-theme';
import { EDITIONS, findEdition } from '@/lib/editions';
import { VENUE } from '@/lib/site';
import { SOCIAL_IMAGE_SIZE } from '@/lib/social-image';

/*
 * The Open Graph / X card of each edition: its own photo, colours, title and dates. Rendered at build for every
 * edition (force-static), so crawlers get a plain cached PNG and nothing is drawn per request. The photo is the
 * edition's own hero from public/ (JPEG, which Satori can decode, unlike WebP; pages get AVIF from next/image
 * anyway). The fonts are in assets/fonts. Both are traced into the standalone output by `outputFileTracingIncludes`
 * in next.config.ts.
 */

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams(): { edition: string }[] {
  return EDITIONS.map((edition) => ({ edition: edition.slug }));
}

const ROOT = process.cwd();

async function jpegDataUrl(publicPath: string): Promise<string> {
  return `data:image/jpeg;base64,${(await readFile(path.join(ROOT, 'public', publicPath))).toString('base64')}`;
}

export async function GET(_request: Request, { params }: RouteContext<'/og/[edition]'>): Promise<Response> {
  const edition = findEdition((await params).edition);
  if (!edition) return new Response('Not found', { status: 404 });

  const [ordinal, ...title] = edition.title.split(' ');
  const { brand, inkDeep } = editionColors(edition);
  const [background, semibold, extrabold] = await Promise.all([
    jpegDataUrl(edition.socialImage ?? edition.heroImage),
    readFile(path.join(ROOT, 'assets/fonts/manrope-600.ttf')),
    readFile(path.join(ROOT, 'assets/fonts/manrope-800.ttf')),
  ]);

  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative', fontFamily: 'Manrope' }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> only. */}
      <img src={background} alt="" width={1200} height={630} style={{ position: 'absolute', objectFit: 'cover' }} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundImage: `linear-gradient(90deg, ${inkDeep}f2 0%, ${inkDeep}cc 55%, ${inkDeep}33 100%)`,
        }}
      />
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          padding: '64px 72px 68px',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', fontSize: 92, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>
              {ordinal}
            </div>
            <Logo width={84} height={56} style={{ color: 'white' }} />
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 8,
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: -2,
              whiteSpace: 'nowrap',
            }}
          >
            {title.join(' ')}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 22,
              fontSize: 28,
              fontWeight: 600,
              lineHeight: 1.35,
              whiteSpace: 'nowrap',
              opacity: 0.9,
            }}
          >
            {edition.tagline}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 14,
            fontSize: 26,
            fontWeight: 600,
            lineHeight: 1.3,
            whiteSpace: 'nowrap',
          }}
        >
          <div style={{ display: 'flex', color: 'white' }}>{formatDateRange(edition.startDate, edition.endDate)}</div>
          <div style={{ display: 'flex', opacity: 0.85 }}>{VENUE.name}</div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 12,
          display: 'flex',
          backgroundColor: brand,
        }}
      />
    </div>,
    {
      ...SOCIAL_IMAGE_SIZE,
      fonts: [
        { name: 'Manrope', data: semibold, weight: 600, style: 'normal' },
        { name: 'Manrope', data: extrabold, weight: 800, style: 'normal' },
      ],
      headers: { 'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800' },
    },
  );
}
