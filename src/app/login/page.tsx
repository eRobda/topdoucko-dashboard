'use client';

import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);

        // 1) Nejprve pošleme username+password na /api/login
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            // Pokud login skončil chybou (např. 401), zobrazíme error
            setErrorMsg(data.error || 'Nastala chyba při přihlášení.');
            return;
        }

        // 2) Pokud příjem tokenu proběhl v pořádku, načteme uživatelská data:
        //    voláme /api/me, které vrací uživatele z JWT cookie
        const resMe = await fetch('/api/me');
        if (!resMe.ok) {
            setErrorMsg('Chyba při ověřování tokenu.');
            return;
        }
        const meData = await resMe.json();

        router.push("dashboard/")
    }

    return (
        <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>Přihlášení</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Uživatelské jméno:</label>
                    <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Heslo:</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem' }}>
                    {loading ? 'Probíhá přihlášení...' : 'Přihlásit se'}
                </button>
            </form>
        </main>
    );
}
