import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { isAuthenticated } from './lib/auth';

export async function middleware(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
