import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Vydaj } from '@/lib/models';
import { TypedRowDataPacket } from '@/lib/types/mysql';

export async function GET() {
  try {
    const [rows] = await pool.execute<TypedRowDataPacket[]>('SELECT * FROM vydaje ORDER BY datum_zaplaceni DESC');
    return NextResponse.json(rows as Vydaj[]);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { nazev, castka, datum, kategorie, popis } = await request.json();

    const [result] = await pool.execute(
      'INSERT INTO vydaje (nazev, cena, datum_zaplaceni, typ, popis) VALUES (?, ?, ?, ?, ?)',
      [nazev, castka, datum, kategorie, popis]
    );

    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error) {
    console.error('Error adding expense:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
} 