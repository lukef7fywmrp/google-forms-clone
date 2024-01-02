import { fetchMenuItems } from "@/lib/data";
import docs from "@/public/icons/docs.png";
import forms from "@/public/icons/forms.png";
import sheets from "@/public/icons/sheets.png";
import slides from "@/public/icons/slides.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const iconMap = {
  Docs: docs,
  Forms: forms,
  Sheets: sheets,
  Slides: slides,
};

async function MenuItems() {
  const menuItems = await fetchMenuItems("sidebar");

  return (
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
                iconMap[page.localizeInfos.menuTitle as keyof typeof iconMap]
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
  );
}

export default MenuItems;
