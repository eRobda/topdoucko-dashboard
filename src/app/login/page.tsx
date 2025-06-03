'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Sour_Gummy } from 'next/font/google';

const sourGummy = Sour_Gummy({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setErrorMsg(data.error || 'Nastala chyba při přihlášení.');
                return;
            }

            const resMe = await fetch('/api/me');
            if (!resMe.ok) {
                setErrorMsg('Chyba při ověřování tokenu.');
                return;
            }

            router.push("dashboard/");
        } catch (error) {
            setErrorMsg('Nastala neočekávaná chyba.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h1 className={`${sourGummy.className} font-bold text-3xl text-white`}>TopDoučko</h1>
                    <p className="text-[#767676] mt-2">Přihlaste se do systému</p>
                </div>

                <div className="ring ring-1 ring-[#383939] text-white p-7 rounded-2xl bg-[#181818] flex flex-col gap-5">
                    {errorMsg && (
                        <div className="bg-red-900/30 text-red-300 p-3 rounded-xl">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="username" className="text-[#767676]">Uživatelské jméno</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-[#0a0a0a] text-white p-3 rounded-xl ring ring-1 ring-[#383939] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-[#767676]">Heslo</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-[#0a0a0a] text-white p-3 rounded-xl ring ring-1 ring-[#383939] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 transition mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Probíhá přihlášení...
                                </span>
                            ) : (
                                'Přihlásit se'
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-5">
                    <p className="text-[#767676] text-sm">© 2025 TopDoučko. Všechna práva vyhrazena.</p>
                </div>
            </div>
        </div>
    );
}
