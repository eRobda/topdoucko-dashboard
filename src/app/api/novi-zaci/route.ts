import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { NovyZak } from '@/lib/models';
import { TypedRowDataPacket } from '@/lib/types/mysql';

export async function GET() {
  try {
    const [rows] = await pool.execute<TypedRowDataPacket[]>('SELECT * FROM novi_zaci');
    
    const zaci = rows.map(zak => ({
      ...zak,
      predmety: JSON.parse(zak.predmety || '[]')
    })) as NovyZak[];

    return NextResponse.json(zaci);
  } catch (error) {
    console.error('Error fetching new students:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { jmeno, prijmeni, email, predmety, balicek, termin } = await request.json();

    const [result] = await pool.execute(
      'INSERT INTO novi_zaci (jmeno_rodice, prijmeni_rodice, email, balicek, predmety, termin_prvni_hodiny) VALUES (?, ?, ?, ?, ?, ?)',
      [jmeno, prijmeni, email, balicek, JSON.stringify(predmety), termin]
    );

    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error) {
    console.error('Error adding new student:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
} 