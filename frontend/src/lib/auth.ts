import { getSession } from './api/session';

export async function isAuthenticated() {
  const now = Date.now();
  const session = await getSession();
  return session.isLoggedIn && session.expiresAt > now;
}

export function parseJWT(token: string): {
  exp: number;
} {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
