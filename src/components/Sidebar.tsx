import { Sour_Gummy } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';

const sourGummy = Sour_Gummy({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Sidebar() {
    return (
        <div className="fixed top-0 left-0 h-dvh p-5 flex flex-col justify-between">
            <div className={`${sourGummy.className} font-bold text-xl text-white`}>TopDoučko</div>
            <div className="flex flex-col items-start gap-3">
                <Link href="/dashboard">
                    <Image 
                        className="w-14 h-14 p-3 rounded-xl transition hover:bg-[#181818]"
                        src="/media/icons/home_24dp_FFFFFF_FILL1_wght700_GRAD0_opsz24.png"
                        alt="Domů"
                        width={56}
                        height={56}
                    />
                </Link>
                <Link href="/zaci">
                    <Image 
                        className="w-14 h-14 p-3 rounded-xl transition hover:bg-[#181818]"
                        src="/media/icons/groups_24dp_4D4D4D_FILL0_wght700_GRAD0_opsz24.png"
                        alt="Žáci"
                        width={56}
                        height={56}
                    />
                </Link>
                <Link href="/finance">
                    <Image 
                        className="w-14 h-14 p-3 rounded-xl transition hover:bg-[#181818]"
                        src="/media/icons/attach_money_24dp_4D4D4D_FILL0_wght700_GRAD0_opsz24.svg"
                        alt="Finance"
                        width={56}
                        height={56}
                    />
                </Link>
                <Link href="/zamestnanci">
                    <Image 
                        className="w-14 h-14 p-3 rounded-xl transition hover:bg-[#181818]"
                        src="/media/icons/engineering_24dp_4D4D4D_FILL0_wght700_GRAD0_opsz24.svg"
                        alt="Zaměstnanci"
                        width={56}
                        height={56}
                    />
                </Link>
            </div>
            <div className="flex flex-col items-start gap-3">
                <div className="text-white text-sm">Uživatel</div>
                <Link href="/logout" className="text-[#767676] hover:text-white transition text-sm">
                    Odhlásit se
                </Link>
            </div>
        </div>
    );
} 