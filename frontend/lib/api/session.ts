import type { SessionOptions } from 'iron-session';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

type SessionData = {
  isLoggedIn: boolean;
  accessToken?: string;
  refreshToken?: string;
};

const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'winter-seminar-series',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  return session;
}
