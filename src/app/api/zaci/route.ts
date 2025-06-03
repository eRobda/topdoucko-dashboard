import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Zak } from '@/lib/models';
import { TypedRowDataPacket } from '@/lib/types/mysql';

export async function GET() {
  try {
    const [rows] = await pool.execute<TypedRowDataPacket[]>(
      'SELECT * FROM zaci ORDER BY jmeno, prijmeni'
    );
    return NextResponse.json(rows as Zak[]);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { jmeno, prijmeni, email, telefon, cena_za_hodinu, poznamka } = await request.json();

    const [result] = await pool.execute(
      'INSERT INTO zaci (jmeno, prijmeni, email, telefon, cena_za_hodinu, poznamka) VALUES (?, ?, ?, ?, ?, ?)',
      [jmeno, prijmeni, email, telefon, cena_za_hodinu, poznamka]
    );

    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error) {
    console.error('Error adding student:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
} 