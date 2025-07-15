import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Paths that don't require authentication
const publicPaths = [
  '/',
  '/login',
  '/signup',
  '/api/login',
  '/api/signup',
  '/api/logout',
  '/api/auth',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  // Check for auth token using NextAuth.js
  const token = await getToken({ req: request });
  
  if (!token) {
    // Redirect to login if no token
    const url = new URL('/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }
    
    // Token is valid, continue
    return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 