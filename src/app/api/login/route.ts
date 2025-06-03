import { NextRequest, NextResponse } from 'next/server';
import { AuthenticationService } from '@/services/AuthenticationService';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'tajny_klic_mel_byt_env'; // v produkci použij .env

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, password } = body;

  if (!username || !password) {
    return NextResponse.json({ error: 'Chybí přihlašovací údaje' }, { status: 400 });
  }

  const user = await AuthenticationService.login(username, password);

  if (!user) {
    return NextResponse.json({ error: 'Neplatné jméno nebo heslo' }, { status: 401 });
  }

  // Vytvoření JWT tokenu
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  const response = NextResponse.json({ message: 'Přihlášení úspěšné' });

  // Nastavení HttpOnly cookie
  response.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
