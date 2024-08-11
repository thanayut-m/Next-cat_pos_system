
import Link from 'next/link';

export default function Navber() {
    return (
        <nav className="bg-[#acabab]  p-2">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    Cat-POS-System
                </div>
                <Link href="../auth/signin" className='text-white hover:text-gray-200'>เข้าสู่ระบบ</Link>
            </div>
        </nav>
    );
}
