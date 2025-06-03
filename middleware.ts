import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'tajny_klic_mel_byt_env';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  try {
    jwt.verify(token || '', JWT_SECRET);
    return NextResponse.next(); // povolit přístup
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/protected/:path*', '/dashboard/:path*'], // přidat chráněné routy
};
