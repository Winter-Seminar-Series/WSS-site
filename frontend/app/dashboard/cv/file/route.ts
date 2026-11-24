import { NextResponse } from 'next/server';

import { getCvFileUrl } from '@/api/cv.api';
import { CURRENT_EDITION } from '@/lib/editions';
import { SITE_URL } from '@/lib/site';
import { isHttpError } from '@/services/http';

// Only send the visitor to our own bucket, whatever the API returns (as app/files/[id] does).
const TRUSTED_FILE_HOST = 's3.ir-thr-at1.arvanstorage.ir';

/**
 * Opens the participant's CV for the current edition. The API's signed URL expires, so it is fetched on every click
 * instead of being baked into the page, which may have been open for hours.
 */
export async function GET() {
  let fileUrl: string | null;
  try {
    fileUrl = await getCvFileUrl(CURRENT_EDITION.eventId);
  } catch (error) {
    // Behind nginx the request URL carries the internal host; redirects use the public origin.
    if (isHttpError(error, 401)) return NextResponse.redirect(new URL('/login?next=%2Fdashboard%2Fcv', SITE_URL));
    return NextResponse.json({ error: 'The CV is not available right now.' }, { status: 502 });
  }

  let url: URL;
  try {
    url = new URL(fileUrl ?? '');
  } catch {
    return NextResponse.json({ error: 'No CV has been uploaded.' }, { status: 404 });
  }
  if (url.protocol !== 'https:' || url.hostname !== TRUSTED_FILE_HOST) {
    return NextResponse.json({ error: 'No CV has been uploaded.' }, { status: 404 });
  }

  const response = NextResponse.redirect(url, 303);
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('X-Robots-Tag', 'noindex');
  return response;
}
