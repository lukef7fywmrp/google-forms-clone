"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useCommandDialogStore } from "@/store/store";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import IconButton from "./IconButton";
import { IFormsEntity } from "oneentry/dist/forms/formsInterfaces";

function Search({ forms }: { forms: IFormsEntity[] }) {
  const router = useRouter();
  const { close, isOpen, open } = useCommandDialogStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        open();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: () => unknown) => {
    close();
    command();
  }, []);

  return (
    <>
      <div
        className="hidden md:flex flex-1 items-center justify-between w-full lg:w-auto max-w-xl lg:min-w-[270px] py-3 px-4 gap-x-6 rounded-md cursor-pointer bg-gray-100 transition-colors"
        onClick={open}
      >
        <div className="flex items-center gap-x-3">
          <SearchIcon className="w-6 h-6 text-neutral-500" />
          <p className="text-neutral-500 font-light">Search</p>
        </div>
      </div>
      <CommandDialog open={isOpen} onOpenChange={close}>
        <CommandInput placeholder="Search all the forms" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {forms.map((form) => (
              <CommandItem
                value={form.identifier}
                key={form.id}
                onSelect={() =>
                  runCommand(() =>
                    router.push(`/dashboard/forms/${form.identifier}`)
                  )
                }
              >
                {form.localizeInfos.en_US.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default Search;
