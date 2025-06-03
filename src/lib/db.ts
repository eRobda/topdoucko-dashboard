import mysql from 'mysql2/promise';
import { User } from './models/user';

export async function getUsers() {
    const connection = await mysql.createConnection({
        host: '193.203.166.123',
        user: 'u498377835_td_admin',
        password: '0~eVc6Y7t',
        database: 'u498377835_topdoucko',
    });

    const [rows] = await connection.execute('SELECT * FROM users');
    await connection.end();
    return rows as User[];
}

export async function loginUser(username: string, password: string): Promise<User | null> {
  const connection = await mysql.createConnection({
    host: '193.203.166.123',
    user: 'u498377835_td_admin',
    password: '0~eVc6Y7t',
    database: 'u498377835_topdoucko',
  });

  // Poznámka: Heslo je v tomto příkladu uložené v plaintextu (což není bezpečné!)
  // Ideálně by mělo být hashované a ověřovat se pomocí bcrypt.compare()
  const [rows] = await connection.execute(
    'SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1',
    [username, password]
  );

  await connection.end();

  const users = rows as User[];
  if (users.length > 0) {
    return users[0];
  }
  return null;
}
