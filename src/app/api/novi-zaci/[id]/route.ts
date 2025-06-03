import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { NovyZak } from '@/lib/models';
import { TypedRowDataPacket } from '@/lib/types/mysql';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [rows] = await pool.execute<TypedRowDataPacket[]>(
      'SELECT * FROM novi_zaci WHERE id_noveho_zaka = ?',
      [params.id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Nový žák nenalezen' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0] as NovyZak);
  } catch (error) {
    console.error('Error fetching new student:', error);
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
    const { jmeno, prijmeni, email, telefon, predmety, poznamka } = await request.json();

    const [result] = await pool.execute(
      'UPDATE novi_zaci SET jmeno = ?, prijmeni = ?, email = ?, telefon = ?, predmety = ?, poznamka = ? WHERE id_noveho_zaka = ?',
      [jmeno, prijmeni, email, telefon, JSON.stringify(predmety), poznamka, params.id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: 'Nový žák nenalezen' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating new student:', error);
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
      'DELETE FROM novi_zaci WHERE id_noveho_zaka = ?',
      [params.id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: 'Nový žák nenalezen' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting new student:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
} 