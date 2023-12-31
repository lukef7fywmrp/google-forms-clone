import { LucideIcon } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";

type Props = Partial<ButtonProps> & {
  Icon: LucideIcon;
  className?: string;
};

function IconButton({ className, Icon, ...props }: Props) {
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className={cn("text-neutral-600", className)}
      {...props}
    >
      <Icon className="w-5 h-5" />
    </Button>
  );
}

export default IconButton;
