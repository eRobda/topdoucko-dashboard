import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Referal } from '@/lib/models';
import { TypedRowDataPacket } from '@/lib/types/mysql';

export async function GET() {
  try {
    const [rows] = await pool.execute<TypedRowDataPacket[]>(
      'SELECT * FROM doporuceni ORDER BY datum_vytvoreni DESC'
    );
    return NextResponse.json(rows as Referal[]);
  } catch (error) {
    console.error('Error fetching referrals:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { jmeno, prijmeni, email, telefon, poznamka, stav } = await request.json();

    const [result] = await pool.execute(
      'INSERT INTO doporuceni (jmeno, prijmeni, email, telefon, poznamka, stav) VALUES (?, ?, ?, ?, ?, ?)',
      [jmeno, prijmeni, email, telefon, poznamka, stav]
    );

    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error) {
    console.error('Error adding referral:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
} 