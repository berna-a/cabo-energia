import caboWordmark from "@/assets/cabo-wordmark.png";
import { cn } from "@/lib/utils";

interface LigarCaboLabelProps {
  className?: string;
}

export function LigarCaboLabel({ className }: LigarCaboLabelProps) {
  return (
    <span className={cn("relative z-10 inline-flex items-baseline leading-none", className)}>
      <span className="text-white">LIGAR</span>
      <img
        src={caboWordmark}
        alt="CABO"
        className="ml-2 inline-block h-[0.85em] w-auto translate-y-[0.08em] select-none"
        draggable={false}
      />
    </span>
  );
}
