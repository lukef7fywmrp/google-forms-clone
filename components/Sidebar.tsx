import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import IconButton from "./IconButton";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import { fetchMenuItems } from "@/lib/data";
import { Button } from "./ui/button";
import Link from "next/link";

async function Sidebar() {
  const menuItems = await fetchMenuItems("sidebar");

  console.log(menuItems.pages[0].localizeInfos);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <IconButton Icon={Menu} />
      </SheetTrigger>
      <SheetContent side={"left"} className="sm:max-w-xs">
        <SheetHeader>
          <Logo />

          <div className="flex flex-col border-y">
            {menuItems.pages.map((page) => (
              <Button variant={"ghost"} key={page.id} className="justify-start">
                {page.localizeInfos.menuTitle}
              </Button>
            ))}
          </div>
        </SheetHeader>
        <SheetFooter className="text-xs mt-auto">
          <Link href="#">Privacy Policy</Link> ⋅{" "}
          <Link href="#">Terms of Service</Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Sidebar;
