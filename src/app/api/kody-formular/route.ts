import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const { idNovehoZaka } = await request.json();
    const kod = uuidv4();
    const heslo = Math.random().toString(36).substring(2, 8);

    const [result] = await pool.execute(
      'INSERT INTO kody_doplnujici_formular (kod, id_noveho_zaka, heslo) VALUES (?, ?, ?)',
      [kod, idNovehoZaka, heslo]
    );

    return NextResponse.json({ success: true, kod });
  } catch (error) {
    console.error('Error adding form code:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const kod = searchParams.get('kod');
    const idNovehoZaka = searchParams.get('idNovehoZaka');

    if (kod) {
      const [rows] = await pool.execute(
        'SELECT nz.* FROM novi_zaci nz JOIN kody_doplnujici_formular kdf ON nz.id = kdf.id_noveho_zaka WHERE kdf.kod = ? AND kdf.pouzito = 0 LIMIT 1',
        [kod]
      );

      const zak = (rows as any[])[0];
      if (zak) {
        zak.predmety = JSON.parse(zak.predmety || '[]');
      }

      return NextResponse.json(zak || null);
    }

    if (idNovehoZaka) {
      const [rows] = await pool.execute(
        'SELECT kod, pouzito FROM kody_doplnujici_formular WHERE id_noveho_zaka = ? LIMIT 1',
        [idNovehoZaka]
      );

      return NextResponse.json((rows as any[])[0] || null);
    }

    return NextResponse.json(
      { error: 'Chybí parametr kod nebo idNovehoZaka' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error fetching form code:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idNovehoZaka = searchParams.get('idNovehoZaka');

    if (!idNovehoZaka) {
      return NextResponse.json(
        { error: 'Chybí parametr idNovehoZaka' },
        { status: 400 }
      );
    }

    await pool.execute(
      'DELETE FROM kody_doplnujici_formular WHERE id_noveho_zaka = ?',
      [idNovehoZaka]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting form code:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
} 