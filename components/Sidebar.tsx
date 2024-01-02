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
import docs from "@/public/icons/docs.png";
import forms from "@/public/icons/forms.png";
import sheets from "@/public/icons/sheets.png";
import slides from "@/public/icons/slides.png";
import Image from "next/image";

const iconMap = {
  Docs: docs,
  Forms: forms,
  Sheets: sheets,
  Slides: slides,
};

async function Sidebar() {
  const menuItems = await fetchMenuItems("sidebar");

  console.log(menuItems.pages[0].localizeInfos);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <IconButton Icon={Menu} />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="sm:max-w-xs flex flex-col justify-between px-0"
      >
        <SheetHeader>
          <Logo className="px-5 pb-3 text-lg md:text-xl" />

          <div className="flex flex-col border-y py-2">
            {menuItems.pages.map((page) => (
              <Button
                asChild
                variant={"ghost"}
                key={page.id}
                className="justify-start px-6 w-[95%] gap-x-3 rounded-r-full"
              >
                <Link href={`/dashboard/${page.pageUrl}`}>
                  <Image
                    src={
                      iconMap[
                        page.localizeInfos.menuTitle as keyof typeof iconMap
                      ]
                    }
                    alt={page.localizeInfos.menuTitle}
                    width={15}
                    height={15}
                  />
                  <p>{page.localizeInfos.menuTitle}</p>
                </Link>
              </Button>
            ))}
          </div>
        </SheetHeader>
        <SheetFooter className="text-xs flex items-center justify-center sm:justify-center text-muted-foreground">
          <Link href="#">Privacy Policy</Link>
          <span>⋅</span>
          <Link href="#">Terms of Service</Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Sidebar;
