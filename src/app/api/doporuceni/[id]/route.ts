import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Referal } from '@/lib/models';
import { TypedRowDataPacket } from '@/lib/types/mysql';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [rows] = await pool.execute<TypedRowDataPacket[]>(
      'SELECT * FROM doporuceni WHERE id_doporuceni = ?',
      [params.id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Doporučení nenalezeno' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0] as Referal);
  } catch (error) {
    console.error('Error fetching referral:', error);
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
    const { jmeno, prijmeni, email, telefon, poznamka, stav } = await request.json();

    const [result] = await pool.execute(
      'UPDATE doporuceni SET jmeno = ?, prijmeni = ?, email = ?, telefon = ?, poznamka = ?, stav = ? WHERE id_doporuceni = ?',
      [jmeno, prijmeni, email, telefon, poznamka, stav, params.id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: 'Doporučení nenalezeno' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating referral:', error);
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
      'DELETE FROM doporuceni WHERE id_doporuceni = ?',
      [params.id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: 'Doporučení nenalezeno' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting referral:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
} 