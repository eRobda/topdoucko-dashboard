import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Prijem } from '@/lib/models';
import { TypedRowDataPacket } from '@/lib/types/mysql';

export async function GET() {
  try {
    const [rows] = await pool.execute<TypedRowDataPacket[]>('SELECT * FROM prijmy ORDER BY datum_prijeti DESC');
    return NextResponse.json(rows as Prijem[]);
  } catch (error) {
    console.error('Error fetching income:', error);
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
      'INSERT INTO prijmy (nazev, cena, datum_prijeti, typ, popis) VALUES (?, ?, ?, ?, ?)',
      [nazev, castka, datum, kategorie, popis]
    );

    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error) {
    console.error('Error adding income:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
} 