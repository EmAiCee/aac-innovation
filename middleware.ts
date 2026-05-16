import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('adminToken')?.value;
  const { pathname } = request.nextUrl;
  
  // Allow access to login page and API routes
  if (pathname === '/admin/login' || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }
  
  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    // Just check if token exists (don't verify in middleware)
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    // Token exists, allow access
    // Actual verification happens in API routes
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};