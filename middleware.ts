import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Exclure les routes d'auth publiques
  if (pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }

  // Routes protégées
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('auth-token');

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const user = await verifyToken(token.value);
    if (!user || !user.isAdmin) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Routes API protégées
  if (pathname.startsWith('/api/admin')) {
    const token = request.cookies.get('auth-token');

    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const user = await verifyToken(token.value);
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/api/auth/:path*'],
};