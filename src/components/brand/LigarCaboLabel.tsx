import caboWordmark from "@/assets/cabo-wordmark.png";
import { cn } from "@/lib/utils";

interface LigarCaboLabelProps {
  className?: string;
  tone?: "light" | "dark";
}

export function LigarCaboLabel({ className, tone = "light" }: LigarCaboLabelProps) {
  const isDark = tone === "dark";
  return (
    <span className={cn("relative z-10 inline-flex items-baseline leading-none", className)}>
      <span className={isDark ? "text-brand-green-deep" : "text-white"}>LIGAR</span>
      <img
        src={caboWordmark}
        alt="CABO"
        className={cn(
          "ml-2 inline-block h-[0.85em] w-auto translate-y-[0.08em] select-none",
          isDark && "[filter:brightness(0)_saturate(100%)_invert(13%)_sepia(45%)_saturate(1200%)_hue-rotate(110deg)]"
        )}
        draggable={false}
      />
    </span>
  );
}
