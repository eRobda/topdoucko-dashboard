import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.execute(
      'SELECT r.*, u.id as user_id, u.username, u.email FROM referal r JOIN users u ON r.user_id = u.id'
    );
    return NextResponse.json(rows);
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
    const { userId, referalUrl, isActive } = await request.json();

    const [result] = await pool.execute(
      'INSERT INTO referal (user_id, referal_url, is_active) VALUES (?, ?, ?)',
      [userId, referalUrl, isActive]
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