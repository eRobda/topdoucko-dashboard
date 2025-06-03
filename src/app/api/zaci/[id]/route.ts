import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Zak } from '@/lib/models';
import { TypedRowDataPacket } from '@/lib/types/mysql';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [rows] = await pool.execute<TypedRowDataPacket[]>(
      'SELECT * FROM zaci WHERE id_zaka = ?',
      [params.id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Žák nenalezen' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0] as Zak);
  } catch (error) {
    console.error('Error fetching student:', error);
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
    const { jmeno, prijmeni, email, telefon, cena_za_hodinu, poznamka } = await request.json();

    const [result] = await pool.execute(
      'UPDATE zaci SET jmeno = ?, prijmeni = ?, email = ?, telefon = ?, cena_za_hodinu = ?, poznamka = ? WHERE id_zaka = ?',
      [jmeno, prijmeni, email, telefon, cena_za_hodinu, poznamka, params.id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: 'Žák nenalezen' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating student:', error);
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
      'DELETE FROM zaci WHERE id_zaka = ?',
      [params.id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: 'Žák nenalezen' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting student:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
} 