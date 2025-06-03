import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { TypedRowDataPacket } from '@/lib/types/mysql';

export async function GET() {
  try {
    const [celkemZaku] = await pool.execute<TypedRowDataPacket[]>(
      'SELECT COUNT(*) as pocet FROM zaci'
    );
    const [celkemNovychZaku] = await pool.execute<TypedRowDataPacket[]>(
      'SELECT COUNT(*) as pocet FROM novi_zaci'
    );
    const [celkemHodin] = await pool.execute<TypedRowDataPacket[]>(
      'SELECT COUNT(*) as pocet FROM zaci_hodiny'
    );
    const [celkemVydelek] = await pool.execute<TypedRowDataPacket[]>(
      'SELECT SUM(cena) as celkem FROM prijmy'
    );

    return NextResponse.json({
      celkemZaku: celkemZaku[0].pocet || 0,
      celkemNovychZaku: celkemNovychZaku[0].pocet || 0,
      celkemHodin: celkemHodin[0].pocet || 0,
      celkemVydelek: celkemVydelek[0].celkem || 0
    });
  } catch (error) {
    console.error('Error fetching Svist statistics:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
} 