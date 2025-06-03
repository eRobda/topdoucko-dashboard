import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ZaciHodina } from '@/lib/models';
import { TypedRowDataPacket } from '@/lib/types/mysql';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [rows] = await pool.execute<TypedRowDataPacket[]>(
      'SELECT * FROM zaci_hodiny WHERE id_zaka = ? ORDER BY datum DESC, zacatek_hodiny DESC',
      [params.id]
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

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { idLektora, predmet, zacatekHodiny, konecHodiny, datum, typhodiny, temaHodiny, poznamkaHodiny } = await request.json();

    const [result] = await pool.execute(
      `INSERT INTO zaci_hodiny (
        id_zaka, id_lektora, predmet, zacatek_hodiny, konec_hodiny, 
        datum, typ_hodiny, tema_hodiny, poznamka_hodiny
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [params.id, idLektora, predmet, zacatekHodiny, konecHodiny, datum, typhodiny, temaHodiny, poznamkaHodiny]
    );

    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error) {
    console.error('Error adding hour:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
} 