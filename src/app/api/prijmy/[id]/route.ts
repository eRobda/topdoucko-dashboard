import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Prijem } from '@/lib/models';
import { TypedRowDataPacket } from '@/lib/types/mysql';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [rows] = await pool.execute<TypedRowDataPacket[]>(
      'SELECT * FROM prijmy WHERE id_prijmu = ?',
      [params.id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Příjem nenalezen' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0] as Prijem);
  } catch (error) {
    console.error('Error fetching income:', error);
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
    const { nazev, cena, datum_prijeti, typ, popis } = await request.json();

    const [result] = await pool.execute(
      'UPDATE prijmy SET nazev = ?, cena = ?, datum_prijeti = ?, typ = ?, popis = ? WHERE id_prijmu = ?',
      [nazev, cena, datum_prijeti, typ, popis, params.id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: 'Příjem nenalezen' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating income:', error);
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
      'DELETE FROM prijmy WHERE id_prijmu = ?',
      [params.id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: 'Příjem nenalezen' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting income:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
} 