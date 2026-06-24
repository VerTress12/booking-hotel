import Link from "next/link";
import Image from "next/image";
import Navlink from "@/components/navbar/navlink";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full bg-white shadow-sm z-20">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">
            <Link href="/">
            <Image src="/logoh.png" width={128} height={32} alt="logo" priority />
            </Link>
            <Navlink/>
      </div>
    </div>
  )
}

export default Navbar;