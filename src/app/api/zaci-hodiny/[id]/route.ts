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
      'SELECT * FROM zaci_hodiny WHERE id_hodiny = ?',
      [params.id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Hodina nenalezena' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0] as ZaciHodina);
  } catch (error) {
    console.error('Error fetching student hour:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { datum, zacatek_hodiny, konec_hodiny, poznamka } = await request.json();

    const [result] = await pool.execute(
      'UPDATE zaci_hodiny SET datum = ?, zacatek_hodiny = ?, konec_hodiny = ?, poznamka = ? WHERE id_hodiny = ?',
      [datum, zacatek_hodiny, konec_hodiny, poznamka, params.id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: 'Hodina nenalezena' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating student hour:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [result] = await pool.execute(
      'DELETE FROM zaci_hodiny WHERE id_hodiny = ?',
      [params.id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: 'Hodina nenalezena' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting student hour:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
} 