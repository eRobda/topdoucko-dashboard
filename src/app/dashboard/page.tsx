// src/app/page.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';

export default function DashboardPage() {
    return (
        <div className="bg-[#0a0a0a] min-h-screen">
            <Sidebar />

            {/* Main Content */}
            <div className="w-full flex justify-center">
                <h1 className="text-white p-5 font-semibold">Domov</h1>
            </div>

            {/* Widgets */}
            <div className="w-full flex justify-center mt-5 gap-10 flex-wrap px-32">
                {/* Widget: Žáci */}
                <div className="ring ring-1 ring-[#383939] text-white p-7 rounded-2xl bg-[#181818] w-[30%] min-w-[300px] flex flex-col gap-5 mb-10">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">Žáci</h2>
                        <Link href="/zaci" className="text-[#767676] hover:text-white transition">Vše</Link>
                    </div>
                    <div className="bg-[#383939] w-full h-[1px]"></div>

                    <div className="grid grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                            <span className="text-[#767676]">Počet žáků:</span>
                            <span className="font-semibold text-2xl">0</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-[#767676]">Noví žáci:</span>
                            <span className="font-semibold text-2xl">0</span>
                        </div>
                    </div>

                    <div className="bg-[#383939] w-full h-[1px] mt-5"></div>

                    <div className="grid grid-cols-1 gap-5">
                        <Link href="/zaci/tridnice"
                            className="ring ring-1 ring-[#383939] text-white p-5 rounded-xl bg-[#0a0a0a] flex items-center gap-5 cursor-pointer transition hover:scale-[1.02]">
                            <div>
                                <Image 
                                    className="h-8"
                                    src="/media/icons/person_24dp_FFFFFF_FILL1_wght700_GRAD0_opsz24.png"
                                    alt="Třídnice"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <div>
                                <div className="font-bold">Třídnice</div>
                                <p className="text-sm text-[#767676]">Seznam všech doučovaných žáků.</p>
                            </div>
                        </Link>
                        <Link href="/zaci/novi-zaci"
                            className="ring ring-1 ring-[#383939] text-white p-5 rounded-xl bg-[#0a0a0a] flex items-center gap-5 cursor-pointer transition hover:scale-[1.02]">
                            <div>
                                <Image 
                                    className="h-8"
                                    src="/media/icons/person_add_24dp_FFFFFF_FILL1_wght700_GRAD0_opsz24.png"
                                    alt="Noví žáci"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <div>
                                <div className="font-bold">Noví žáci</div>
                                <p className="text-sm text-[#767676]">Seznam nových žáků z formuláře.</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Widget: Hodiny */}
                <div className="ring ring-1 ring-[#383939] text-white p-7 rounded-2xl bg-[#181818] w-[30%] min-w-[300px] flex flex-col gap-5 mb-10">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">Hodiny</h2>
                        <Link href="/zaci/tridnice" className="text-[#767676] hover:text-white transition">Vše</Link>
                    </div>
                    <div className="bg-[#383939] w-full h-[1px]"></div>

                    <div className="grid grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                            <span className="text-[#767676]">Tento měsíc:</span>
                            <span className="font-semibold text-2xl">0</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-[#767676]">Minulý měsíc:</span>
                            <span className="font-semibold text-2xl">0</span>
                        </div>
                    </div>

                    <div className="bg-[#383939] w-full h-[1px] mt-5"></div>

                    <div className="grid grid-cols-1 gap-5">
                        <Link href="/zaci/tridnice/add_hodina"
                            className="ring ring-1 ring-[#383939] text-white p-5 rounded-xl bg-[#0a0a0a] flex items-center gap-5 cursor-pointer transition hover:scale-[1.02]">
                            <div>
                                <div className="font-bold">Přidat hodinu</div>
                                <p className="text-sm text-[#767676]">Zapsat novou hodinu pro žáka.</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Widget: Systém */}
                <div className="ring ring-1 ring-[#383939] text-white p-7 rounded-2xl bg-[#181818] w-[30%] min-w-[300px] flex flex-col gap-5 mb-10">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">Systém</h2>
                        <Link href="#" className="text-[#767676] hover:text-white transition">Nastavení</Link>
                    </div>
                    <div className="bg-[#383939] w-full h-[1px]"></div>

                    <div className="grid grid-cols-1 gap-5">
                        <div className="ring ring-1 ring-[#383939] text-white p-5 rounded-xl bg-[#0a0a0a] flex items-center gap-5 cursor-pointer transition hover:scale-[1.02]">
                            <div>
                                <div className="font-bold">Nastavení</div>
                                <p className="text-sm text-[#767676]">Správa uživatelů a oprávnění.</p>
                            </div>
                        </div>
                        <div className="ring ring-1 ring-[#383939] text-white p-5 rounded-xl bg-[#0a0a0a] flex items-center gap-5 cursor-pointer transition hover:scale-[1.02]">
                            <div>
                                <div className="font-bold">Zálohování</div>
                                <p className="text-sm text-[#767676]">Správa záloh databáze.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#383939] w-full h-[1px] mt-5"></div>

                    <h3 className="text-lg font-semibold">Poslední aktualizace</h3>
                    <div className="bg-[#0a0a0a] p-5 rounded-xl ring ring-1 ring-[#383939]">
                        Žádná aktualizace
                    </div>
                </div>

                {/* Widget: Výdělek */}
                <div className="ring ring-1 ring-[#383939] text-white p-7 rounded-2xl bg-[#181818] w-[30%] min-w-[300px] flex flex-col gap-5 mb-10">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">Výdělek</h2>
                    </div>
                    <div className="bg-[#383939] w-full h-[1px]"></div>

                    <div className="grid grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                            <span className="text-[#767676]">Tento měsíc:</span>
                            <span className="font-semibold text-2xl">0 Kč</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-[#767676]">Poslední půrok:</span>
                            <span className="font-semibold text-2xl">0 Kč</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
