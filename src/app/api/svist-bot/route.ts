import { NextResponse } from 'next/server';
import pool from '@/lib/db';

function zkratka_mesice(offset: number): string {
  const mesice = ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'];
  const dnes = new Date();
  dnes.setMonth(dnes.getMonth() + offset);
  return mesice[dnes.getMonth()];
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (!type) {
      return NextResponse.json(
        { error: 'Chybí parametr type' },
        { status: 400 }
      );
    }

    const curYear = new Date().getFullYear();
    const mesice = Array.from({ length: 10 }, (_, i) => zkratka_mesice(-i));

    const [rows] = await pool.execute(
      `SELECT month, SUM(qty) AS total_qty
       FROM svist_bot
       WHERE type = ? AND year = ? AND month IN (?)
       GROUP BY month
       ORDER BY FIELD(month, ?)`,
      [type, curYear, mesice, mesice]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching Svist bot statistics:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { msg, resMsg } = await request.json();
    const month = zkratka_mesice(0);
    const curYear = new Date().getFullYear();

    const msgQty = msg.length;
    const resMsgQty = resMsg.length;

    // Insert input message quantity
    await pool.execute(
      'INSERT INTO svist_bot (type, qty, month, year) VALUES (?, ?, ?, ?)',
      ['input', msgQty, month, curYear]
    );

    // Insert output message quantity
    await pool.execute(
      'INSERT INTO svist_bot (type, qty, month, year) VALUES (?, ?, ?, ?)',
      ['output', resMsgQty, month, curYear]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding Svist bot statistics:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
} 