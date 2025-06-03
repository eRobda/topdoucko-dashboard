// src/app/page.tsx

import { getUsers } from '@/lib/db';
import { User } from '@/lib/models/user';

export default async function Home() {
  // Server‐side: načteme všechny uživatele
  const users: User[] = await getUsers();

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Seznam uživatelů</h1>

      {users.length === 0 ? (
        <p>Žádní uživatelé nenalezeni.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map((user) => (
            <li
              key={user.id}
              style={{
                marginBottom: '1rem',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            >
              <p>
                <strong>ID:</strong> {user.id}
              </p>
              <p>
                <strong>Jméno:</strong> {user.username}
              </p>
              <p>
                <strong>E‐mail:</strong> {user.email}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
