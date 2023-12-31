import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button, buttonVariants } from "./ui/button";
import { ArrowUpAzIcon, ChevronDown, Folder, List } from "lucide-react";
import IconButton from "./IconButton";
import FormList from "./FormList";

function RecentForms() {
  return (
    <section className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <p className="font-medium">Recent forms</p>

        <div className="flex items-center gap-x-12">
          <Select defaultValue="anyone">
            <SelectTrigger
              className={buttonVariants({
                variant: "ghost",
                className: "outline-none border-none gap-x-2 text-neutral-600",
              })}
            >
              <SelectValue placeholder="Owned by anyone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="anyone">Owned by anyone</SelectItem>
              <SelectItem value="me">Owned by me</SelectItem>
              <SelectItem value="not-me">Not owned by me</SelectItem>
            </SelectContent>
          </Select>

          <div className="hidden md:flex items-center gap-x-1">
            <IconButton Icon={List} />
            <IconButton Icon={ArrowUpAzIcon} />
            <IconButton Icon={Folder} />
          </div>
        </div>
      </div>

      <FormList />
    </section>
  );
}

export default RecentForms;
