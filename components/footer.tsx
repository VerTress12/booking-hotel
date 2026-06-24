import Link from "next/link";
import Image from "next/image";

const footer = () => {
    return (
        <footer className="bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 w-full py-10 md:py-16" >
                <div className="grid md:grid-cols-3 gap-7">
                    <div>
                        <Link href="/" className="mb-10 block">
                            <Image src="/logoh.png" alt="Logo" width={128} height={49} />
                        </Link>
                        <p className="text-gray-400">
                            Selamat Datang di Hotel Kami, tempat di mana kenyamanan dan pelayanan terbaik bertemu untuk menciptakan pengalaman menginap yang tak terlupakan. Kami berkomitmen untuk memberikan layanan yang ramah, fasilitas modern, dan suasana yang hangat untuk memastikan setiap tamu merasa seperti di rumah sendiri. Apakah Anda sedang mencari tempat untuk bersantai, bekerja, atau menjelajahi kota, kami siap menyambut Anda dengan senyuman dan pelayanan yang luar biasa.   
                        </p>
                    </div>
                    <div className="flex gap-20">
                        <div className="flex-1 md:flex-none "> 
                            <h4 className="mb-8 text-xl font-semibold text-white">Links</h4>
                            <ul className="list-item space-y-5 text-gray-400"> 
                                <li>
                                    <Link href="/" >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/room" >
                                        Rooms
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                         <div className="flex-1 md:flex-none "> 
                            <h4 className="mb-8 text-xl font-semibold text-white">Legal</h4>
                            <ul className="list-item space-y-5 text-gray-400"> 
                                <li>
                                    <Link href="#" >
                                        Legal
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" >
                                        Term & conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" >
                                        Payment Method
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" >
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-8 text-xl font-semibold text-white">Newsletter</h4>
                        <p className=" text-gray-400">
                            Subscribe to our newsletter to get the latest updates and offers.
                        </p>
                        <form action="" className="mt-5">
                            <div className="mb-5">
                                <input type="text" name="email" className="w-full p-3 rounded-sm bg-white" placeholder="asethimsi@gmail.com" />
                            </div>
                            <button  className="bg-blue-600 p-3 font-bold text-white w-full text-center rounded-sm hover:bg-blue-700">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 border-t border-gray-500 py-8 text-center text-gray-500" >
                &copy; bykelompok PDW 2026
            </div>
        </footer>
    )
}

export default footer
