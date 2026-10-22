/*
 * The session cookie is httpOnly and encrypted, so pages that are prerendered (everything public) cannot know who is
 * signed in. Alongside it we set this readable, value-less flag: the navbar reads it after hydration to swap
 * "Sign Up / Login" for "Dashboard". It grants nothing — every authenticated request still goes through the session.
 */
export const AUTH_HINT_COOKIE = 'wss-signed-in';

export function hasAuthHint(cookieHeader: string): boolean {
  return cookieHeader.split(';').some((cookie) => cookie.trim().startsWith(`${AUTH_HINT_COOKIE}=`));
}
