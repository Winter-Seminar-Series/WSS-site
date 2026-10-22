import { getIronSession } from 'iron-session';
import type { SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';

import { AUTH_HINT_COOKIE } from '@/lib/auth-hint';
import { jwtExpiresAt } from '@/lib/jwt';
import type { TokenPairResponse } from '@/types/participant.api.type';

export const SESSION_COOKIE = 'winter-seminar-series';

export interface SessionData {
  accessToken?: string;
  refreshToken?: string;
  /** Refresh-token expiry, epoch ms. */
  expiresAt?: number;
}

export function sessionPassword(): string {
  const password = process.env.SECRET_COOKIE_PASSWORD;
  if (!password || password.length < 32) {
    throw new Error('SECRET_COOKIE_PASSWORD must be set to at least 32 characters.');
  }
  return password;
}

function sessionOptions(): SessionOptions {
  return {
    password: sessionPassword(),
    cookieName: SESSION_COOKIE,
    cookieOptions: { secure: process.env.NODE_ENV === 'production', sameSite: 'lax' },
  };
}

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions());
}

export async function isSignedIn(): Promise<boolean> {
  const session = await getSession();
  return Boolean(session.refreshToken && (session.expiresAt ?? 0) > Date.now());
}

export async function getAccessToken(): Promise<string | undefined> {
  return (await getSession()).accessToken;
}

/** Only callable where cookies are writable: Server Actions and Route Handlers. */
export async function saveTokens(tokens: TokenPairResponse): Promise<void> {
  const expiresAt = jwtExpiresAt(tokens.refresh);
  const session = await getSession();
  session.accessToken = tokens.access;
  session.refreshToken = tokens.refresh;
  session.expiresAt = expiresAt;
  await session.save();

  (await cookies()).set(AUTH_HINT_COOKIE, '1', {
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(expiresAt),
  });
}

export async function clearSession(): Promise<void> {
  (await getSession()).destroy();
  (await cookies()).delete(AUTH_HINT_COOKIE);
}
