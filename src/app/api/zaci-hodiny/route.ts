import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ZaciHodina } from '@/lib/models';
import { TypedRowDataPacket } from '@/lib/types/mysql';

export async function GET() {
  try {
    const [rows] = await pool.execute<TypedRowDataPacket[]>(
      'SELECT * FROM zaci_hodiny ORDER BY datum DESC, zacatek_hodiny DESC'
    );
    return NextResponse.json(rows as ZaciHodina[]);
  } catch (error) {
    console.error('Error fetching student hours:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { id_zaka, datum, zacatek_hodiny, konec_hodiny, poznamka } = await request.json();

    const [result] = await pool.execute(
      'INSERT INTO zaci_hodiny (id_zaka, datum, zacatek_hodiny, konec_hodiny, poznamka) VALUES (?, ?, ?, ?, ?)',
      [id_zaka, datum, zacatek_hodiny, konec_hodiny, poznamka]
    );

    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error) {
    console.error('Error adding student hour:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
} 