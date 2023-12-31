import logo from "@/public/logo.png";
import { Grip, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import IconButton from "./IconButton";
import Search from "./Search";
import SearchMobile from "./SearchMobile";
import { UserButton } from "@clerk/nextjs";
import { fetchAllForms } from "@/lib/data";
import Sidebar from "./Sidebar";

async function Header() {
  const forms = await fetchAllForms();

  return (
    <header className="sticky top-0 flex justify-between px-4 py-2.5 bg-white z-50">
      <div className="flex items-center space-x-2">
        <Sidebar />
        <Link href={"/"} className="flex items-center space-x-1">
          <Image src={logo} alt="Logo" className="w-10 h-10" />
          <p className="text-xl text-neutral-500">Forms</p>
        </Link>
      </div>

      <Search forms={forms} />

      <div className="flex items-center">
        <SearchMobile />
        <IconButton Icon={Grip} className="mr-3" />
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}

export default Header;
