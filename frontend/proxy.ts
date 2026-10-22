import { sealData, unsealData } from 'iron-session';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { AUTH_HINT_COOKIE } from '@/lib/auth-hint';
import { jwtExpiresAt } from '@/lib/jwt';
import { API_BASE_URL } from '@/services/http';
import { SESSION_COOKIE, sessionPassword } from '@/services/session';
import type { SessionData } from '@/services/session';
import type { TokenPairResponse } from '@/types/participant.api.type';

/*
 * Keeps the dashboard's access token fresh. Server Components cannot write cookies, so the 2-hour access token is
 * rotated here — before rendering — and the new session is forwarded to the page and to the browser in one go.
 */

// Refresh slightly early so a token never expires between this check and the API call it authorises.
const ACCESS_TOKEN_LEEWAY_MS = 60_000;
// iron-session's default TTL (14 days) minus its 60s clock-skew margin.
const SESSION_MAX_AGE_SECONDS = 14 * 24 * 3600 - 60;

async function readSession(request: NextRequest): Promise<SessionData> {
  const sealed = request.cookies.get(SESSION_COOKIE)?.value;
  if (!sealed) return {};
  try {
    return await unsealData<SessionData>(sealed, { password: sessionPassword() });
  } catch {
    return {};
  }
}

async function refreshTokens(refresh: string): Promise<Partial<TokenPairResponse> | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/sign-in/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ refresh }),
      cache: 'no-store',
    });
    if (!response.ok) return null;
    return (await response.json()) as Partial<TokenPairResponse>;
  } catch {
    return null;
  }
}

function signedOut(request: NextRequest): NextResponse {
  const isPageView = request.method === 'GET' && request.nextUrl.pathname.startsWith('/dashboard');
  const response = isPageView
    ? NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(request.nextUrl.pathname)}`, request.url))
    : NextResponse.next();
  response.cookies.delete(SESSION_COOKIE);
  response.cookies.delete(AUTH_HINT_COOKIE);
  return response;
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const session = await readSession(request);
  const now = Date.now();

  if (!session.refreshToken || (session.expiresAt ?? 0) <= now) return signedOut(request);
  if (jwtExpiresAt(session.accessToken ?? '') - ACCESS_TOKEN_LEEWAY_MS > now) return NextResponse.next();

  const tokens = await refreshTokens(session.refreshToken);
  if (!tokens?.access) return signedOut(request);

  // ROTATE_REFRESH_TOKENS is on in Django, but fall back to the old refresh token if it ever is not.
  const refreshToken = tokens.refresh ?? session.refreshToken;
  const next: SessionData = {
    accessToken: tokens.access,
    refreshToken,
    expiresAt: tokens.refresh ? jwtExpiresAt(tokens.refresh) : session.expiresAt,
  };
  const sealed = await sealData(next, { password: sessionPassword() });

  // Forward the fresh session to this render, then hand it to the browser.
  request.cookies.set(SESSION_COOKIE, sealed);
  const response = NextResponse.next({ request: { headers: request.headers } });
  response.cookies.set(SESSION_COOKIE, sealed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/callback/:path*'],
};
