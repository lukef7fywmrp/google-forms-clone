import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";

function CTAButtons({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 min-[400px]:flex-row justify-center",
        className
      )}
    >
      <Button asChild>
        <Link href={"/dashboard"}>Get Started</Link>
      </Button>
      <Button variant="outline" asChild>
        <Link href={"/learn-more"}>Learn More</Link>
      </Button>
    </div>
  );
}

export default CTAButtons;
