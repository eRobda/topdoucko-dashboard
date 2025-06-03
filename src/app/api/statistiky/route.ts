import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { TypedRowDataPacket } from '@/lib/types/mysql';

export async function GET() {
  try {
    const [prijmy] = await pool.execute<TypedRowDataPacket[]>(
      'SELECT SUM(cena) as celkem FROM prijmy'
    );
    const [vydaje] = await pool.execute<TypedRowDataPacket[]>(
      'SELECT SUM(cena) as celkem FROM vydaje'
    );
    const [zaci] = await pool.execute<TypedRowDataPacket[]>(
      'SELECT COUNT(*) as pocet FROM zaci'
    );
    const [noviZaci] = await pool.execute<TypedRowDataPacket[]>(
      'SELECT COUNT(*) as pocet FROM novi_zaci'
    );

    return NextResponse.json({
      prijmy: prijmy[0].celkem || 0,
      vydaje: vydaje[0].celkem || 0,
      zaci: zaci[0].pocet || 0,
      noviZaci: noviZaci[0].pocet || 0
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
} 