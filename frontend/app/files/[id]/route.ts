import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getFileUrl } from '@/api/participation.api';

// Only stream files from our own bucket, whatever the API returns.
const TRUSTED_FILE_HOST = 's3.ir-thr-at1.arvanstorage.ir';

/** Shareable certificate link: `/files/<id>` streams the file under our own domain. */
export async function GET(_request: NextRequest, { params }: RouteContext<'/files/[id]'>) {
  const { id } = await params;

  let fileUrl: URL;
  try {
    fileUrl = new URL(await getFileUrl(id));
  } catch {
    return NextResponse.json({ error: 'File not found.' }, { status: 404 });
  }
  if (fileUrl.protocol !== 'https:' || fileUrl.hostname !== TRUSTED_FILE_HOST) {
    return NextResponse.json({ error: 'File not found.' }, { status: 404 });
  }

  const file = await fetch(fileUrl, { cache: 'no-store' });
  if (!file.ok || !file.body) return NextResponse.json({ error: 'File not available.' }, { status: 502 });

  return new NextResponse(file.body, {
    headers: {
      'Content-Type': file.headers.get('Content-Type') ?? 'application/octet-stream',
      'Content-Disposition': file.headers.get('Content-Disposition') ?? `inline; filename="wss-certificate.pdf"`,
      'Cache-Control': 'private, max-age=3600',
      'X-Robots-Tag': 'noindex',
    },
  });
}
