import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const reqMethod = req.method;

  // Protect GET and DELETE on /api/leads — require valid session
  if (pathname === '/api/leads' && (reqMethod === 'GET' || reqMethod === 'DELETE')) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // Protect all dashboard routes except the login page
  if (pathname.startsWith('/dashboard') && pathname !== '/dashboard/login') {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.redirect(new URL('/dashboard/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/leads',
    '/dashboard/:path*',
  ],
};
