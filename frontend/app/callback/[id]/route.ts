import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { verifyPayment } from '@/api/payment.api';
import { parseId } from '@/lib/metadata';
import { SITE_URL } from '@/lib/site';
import { isHttpError } from '@/services/http';

/** The payment gateway sends the participant back here; confirm the payment, then show their registration. */
export async function GET(request: NextRequest, { params }: RouteContext<'/callback/[id]'>) {
  const paymentId = parseId((await params).id);
  // Next's request URL can contain the container's bind address behind the reverse proxy.
  const destination = new URL('/dashboard/register', SITE_URL);
  if (!paymentId) return NextResponse.redirect(destination);

  try {
    await verifyPayment(paymentId);
  } catch (error) {
    if (isHttpError(error, 401)) {
      return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(request.nextUrl.pathname)}`, SITE_URL));
    }
    destination.searchParams.set('payment', 'failed');
  }

  revalidatePath('/dashboard', 'layout');
  return NextResponse.redirect(destination);
}
